const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const db = require('../models/db');
const { ethers } = require('ethers');
const { validateEmail, validatePassword } = require('../utils/validation');
const { sendVerificationEmail } = require('../services/emailService');
const { getProviderAndSigner } = require('../services/blockchainService');

/**
 * Generate JWT token for a user
 * @param {Object} user - User object
 * @returns {String} JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    }, 
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  );
};

/**
 * Register a new user
 * @route POST /api/auth/register
 */
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character' 
      });
    }

    // Check if user already exists
    const existingUser = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ success: false, message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate verification token
    const verificationToken = uuidv4();

    // Insert user into database
    const result = await db.query(
      `INSERT INTO users 
        (email, password_hash, role, is_email_verified) 
       VALUES 
        ($1, $2, $3, $4) 
       RETURNING id, email, role, created_at`,
      [email, hashedPassword, 'user', false]
    );

    const user = result.rows[0];

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    // Generate auth token
    const token = generateToken(user);

    // Return success response
    return res.status(201).json({
      success: true,
      message: 'User registered successfully. Please verify your email.',
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          created_at: user.created_at
        },
        token
      }
    });
  } catch (error) {
    console.error('Error in register controller:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * Login user
 * @route POST /api/auth/login
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const result = await db.query(
      'SELECT id, email, password_hash, role, is_email_verified FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if email is verified
    if (!user.is_email_verified) {
      return res.status(403).json({ 
        success: false, 
        message: 'Email not verified. Please check your email for verification link.' 
      });
    }

    // Update last login time
    await db.query(
      'UPDATE users SET last_login = NOW() WHERE id = $1',
      [user.id]
    );

    // Generate token
    const token = generateToken(user);

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Error in login controller:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * Verify user email
 * @route GET /api/auth/verify-email/:token
 */
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // Find verification token
    const result = await db.query(
      'SELECT user_id FROM email_verifications WHERE token = $1 AND expires_at > NOW()',
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification token' });
    }

    const userId = result.rows[0].user_id;

    // Update user as verified
    await db.query(
      'UPDATE users SET is_email_verified = TRUE WHERE id = $1',
      [userId]
    );

    // Delete used token
    await db.query(
      'DELETE FROM email_verifications WHERE token = $1',
      [token]
    );

    return res.status(200).json({
      success: true,
      message: 'Email verified successfully. You can now log in.'
    });
  } catch (error) {
    console.error('Error in verifyEmail controller:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * Connect wallet to user account
 * @route POST /api/auth/connect-wallet
 */
exports.connectWallet = async (req, res) => {
  try {
    const { address, signature, message } = req.body;
    const userId = req.user.id; // From auth middleware

    // Verify signature
    const signerAddress = ethers.utils.verifyMessage(message, signature);
    
    if (signerAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ success: false, message: 'Invalid signature' });
    }

    // Check if wallet already connected to another user
    const existingWallet = await db.query(
      'SELECT user_id FROM wallets WHERE address = $1',
      [address]
    );

    if (existingWallet.rows.length > 0 && existingWallet.rows[0].user_id !== userId) {
      return res.status(409).json({ 
        success: false, 
        message: 'This wallet is already connected to another account' 
      });
    }

    // Connect wallet if not already connected
    if (existingWallet.rows.length === 0) {
      await db.query(
        `INSERT INTO wallets 
          (user_id, address, is_primary, is_verified, verification_timestamp) 
         VALUES 
          ($1, $2, $3, $4, NOW())`,
        [userId, address, true, true]
      );
    } else {
      // Update verification status
      await db.query(
        `UPDATE wallets 
         SET is_verified = TRUE, verification_timestamp = NOW() 
         WHERE address = $1`,
        [address]
      );
    }

    return res.status(200).json({
      success: true,
      message: 'Wallet connected successfully',
      data: { address }
    });
  } catch (error) {
    console.error('Error in connectWallet controller:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * Register student with blockchain identity
 * @route POST /api/auth/register-student
 */
exports.registerStudent = async (req, res) => {
  const client = await db.getClient();
  
  try {
    const { name, studentId, department } = req.body;
    const userId = req.user.id; // From auth middleware

    // Start transaction
    await client.query('BEGIN');

    // Check if user already has a student profile
    const existingStudent = await client.query(
      'SELECT id FROM students WHERE user_id = $1',
      [userId]
    );

    if (existingStudent.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({ 
        success: false, 
        message: 'User already has a student profile' 
      });
    }

    // Check if student ID is already registered
    const existingStudentId = await client.query(
      'SELECT id FROM students WHERE student_id = $1',
      [studentId]
    );

    if (existingStudentId.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({ 
        success: false, 
        message: 'This student ID is already registered' 
      });
    }

    // Get user email
    const userResult = await client.query(
      'SELECT email FROM users WHERE id = $1',
      [userId]
    );

    const userEmail = userResult.rows[0].email;

    // Get wallet address
    const walletResult = await client.query(
      'SELECT address FROM wallets WHERE user_id = $1 AND is_primary = TRUE',
      [userId]
    );

    if (walletResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ 
        success: false, 
        message: 'No connected wallet found. Please connect a wallet first.' 
      });
    }

    const walletAddress = walletResult.rows[0].address;

    // Register student on blockchain
    const blockchainService = require('../services/blockchainService');
    const txResult = await blockchainService.registerStudentOnChain(
      name, 
      userEmail, 
      studentId, 
      department,
      walletAddress
    );

    // Register student in database
    const studentResult = await client.query(
      `INSERT INTO students 
        (user_id, student_id, name, department, enrollment_date) 
       VALUES 
        ($1, $2, $3, $4, CURRENT_DATE) 
       RETURNING id`,
      [userId, studentId, name, department]
    );

    const studentId2 = studentResult.rows[0].id;

    // Insert blockchain reference
    await client.query(
      `INSERT INTO credentials 
        (student_id, credential_type, title, description, issuer, issue_date, verification_hash, blockchain_reference) 
       VALUES 
        ($1, $2, $3, $4, $5, CURRENT_DATE, $6, $7)`,
      [
        studentId2, 
        'STUDENT_REGISTRATION', 
        'Student Registration', 
        `Registered as a student in ${department}`, 
        'EduVerse Platform',
        txResult.transactionHash,
        JSON.stringify({ transaction: txResult.transactionHash, blockNumber: txResult.blockNumber })
      ]
    );

    // Commit transaction
    await client.query('COMMIT');

    return res.status(200).json({
      success: true,
      message: 'Student registered successfully on blockchain',
      data: {
        studentId: studentId2,
        transactionHash: txResult.transactionHash,
        blockNumber: txResult.blockNumber
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error in registerStudent controller:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  } finally {
    client.release();
  }
};

/**
 * Get current user profile and wallet info
 * @route GET /api/auth/me
 */
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware

    // Get user details
    const userResult = await db.query(
      `SELECT 
        u.id, u.email, u.role, u.created_at,
        s.id as student_id, s.student_id as student_number, s.name, s.department
       FROM 
        users u
       LEFT JOIN 
        students s ON u.id = s.user_id
       WHERE 
        u.id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user = userResult.rows[0];

    // Get user's wallets
    const walletsResult = await db.query(
      `SELECT 
        id, address, is_primary, is_verified, verification_timestamp, created_at
       FROM 
        wallets
       WHERE 
        user_id = $1
       ORDER BY 
        is_primary DESC, created_at DESC`,
      [userId]
    );

    // Format response
    const profile = {
      id: user.id,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
      student: user.student_id ? {
        id: user.student_id,
        student_number: user.student_number,
        name: user.name,
        department: user.department
      } : null,
      wallets: walletsResult.rows
    };

    return res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Error in getProfile controller:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * Request password reset
 * @route POST /api/auth/forgot-password
 */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const result = await db.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      // For security, don't reveal if email exists
      return res.status(200).json({ 
        success: true, 
        message: 'If your email is registered, you will receive a password reset link' 
      });
    }

    const userId = result.rows[0].id;

    // Generate reset token
    const resetToken = uuidv4();
    const resetExpires = new Date();
    resetExpires.setHours(resetExpires.getHours() + 1); // Token valid for 1 hour

    // Store reset token
    await db.query(
      `INSERT INTO password_resets 
        (user_id, token, expires_at) 
       VALUES 
        ($1, $2, $3)
       ON CONFLICT (user_id) 
       DO UPDATE SET token = $2, expires_at = $3`,
      [userId, resetToken, resetExpires]
    );

    // Send password reset email
    const emailService = require('../services/emailService');
    await emailService.sendPasswordResetEmail(email, resetToken);

    return res.status(200).json({
      success: true,
      message: 'If your email is registered, you will receive a password reset link'
    });
  } catch (error) {
    console.error('Error in forgotPassword controller:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * Reset password
 * @route POST /api/auth/reset-password/:token
 */
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Validate password
    if (!validatePassword(password)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character' 
      });
    }

    // Find reset token
    const result = await db.query(
      'SELECT user_id FROM password_resets WHERE token = $1 AND expires_at > NOW()',
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
    }

    const userId = result.rows[0].user_id;

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user password
    await db.query(
      'UPDATE users SET password_hash = $1 WHERE id = $2',
      [hashedPassword, userId]
    );

    // Delete used reset token
    await db.query(
      'DELETE FROM password_resets WHERE token = $1',
      [token]
    );

    return res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. You can now log in with your new password.'
    });
  } catch (error) {
    console.error('Error in resetPassword controller:', error);
    return res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}; 