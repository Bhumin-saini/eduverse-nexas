const pool = require('../config/db');
const bcrypt = require('bcrypt');
const logger = require('../utils/logger');
const blockchainService = require('../services/blockchainService');
const { hashPassword, comparePassword } = require('../utils/auth');
const { validateWalletAddress } = require('../utils/blockchain');
const { registerWalletOnChain } = require('../services/blockchain');

/**
 * Get student profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const query = `
      SELECT 
        u.id, 
        u.username, 
        u.email,
        sp.first_name, 
        sp.last_name, 
        sp.bio, 
        sp.profile_image,
        sp.address, 
        sp.phone,
        sp.date_of_birth,
        d.name as department_name,
        sp.level,
        sp.wallet_address,
        sp.registration_date
      FROM users u
      LEFT JOIN student_profiles sp ON u.id = sp.user_id
      LEFT JOIN departments d ON sp.department_id = d.id
      WHERE u.id = $1 AND u.role = 'student'
    `;
    
    // Get basic profile
    const profileResult = await pool.query(query, [userId]);
    
    if (profileResult.rows.length === 0) {
      return res.status(404).json({ message: 'Student profile not found' });
    }
    
    // Get education history
    const educationQuery = `
      SELECT * FROM education_history
      WHERE user_id = $1
      ORDER BY end_date DESC
    `;
    
    const educationResult = await pool.query(educationQuery, [userId]);
    
    // Get enrollment stats
    const enrollmentStatsQuery = `
      SELECT 
        COUNT(*) as total_courses,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_courses,
        COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_courses
      FROM enrollments
      WHERE user_id = $1
    `;
    
    const enrollmentStats = await pool.query(enrollmentStatsQuery, [userId]);
    
    // Combine all data
    const studentProfile = {
      ...profileResult.rows[0],
      education_history: educationResult.rows,
      enrollment_stats: enrollmentStats.rows[0],
    };
    
    // Remove sensitive information
    delete studentProfile.password;
    
    return res.status(200).json({ 
      message: 'Student profile retrieved successfully',
      data: studentProfile
    });
    
  } catch (error) {
    logger.error(`Error retrieving student profile: ${error.message}`);
    return res.status(500).json({ 
      message: 'Failed to retrieve student profile',
      error: error.message 
    });
  }
};

/**
 * Update student profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const updateStudentProfile = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const userId = req.user.id;
    const { 
      first_name, 
      last_name, 
      bio, 
      profile_image, 
      address, 
      phone,
      date_of_birth,
      department_id,
      level
    } = req.body;
    
    // Start transaction
    await client.query('BEGIN');
    
    // Check if profile exists
    const checkQuery = `
      SELECT * FROM student_profiles
      WHERE user_id = $1
    `;
    
    const checkResult = await client.query(checkQuery, [userId]);
    
    let query;
    let params;
    
    if (checkResult.rows.length === 0) {
      // Create new profile
      query = `
        INSERT INTO student_profiles (
          user_id, 
          first_name, 
          last_name, 
          bio, 
          profile_image, 
          address, 
          phone,
          date_of_birth,
          department_id,
          level
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `;
      
      params = [
        userId, 
        first_name, 
        last_name, 
        bio, 
        profile_image, 
        address, 
        phone,
        date_of_birth,
        department_id,
        level
      ];
    } else {
      // Update existing profile
      query = `
        UPDATE student_profiles
        SET 
          first_name = COALESCE($2, first_name),
          last_name = COALESCE($3, last_name),
          bio = COALESCE($4, bio),
          profile_image = COALESCE($5, profile_image),
          address = COALESCE($6, address),
          phone = COALESCE($7, phone),
          date_of_birth = COALESCE($8, date_of_birth),
          department_id = COALESCE($9, department_id),
          level = COALESCE($10, level),
          updated_at = CURRENT_TIMESTAMP
        WHERE user_id = $1
        RETURNING *
      `;
      
      params = [
        userId,
        first_name,
        last_name,
        bio,
        profile_image,
        address,
        phone,
        date_of_birth,
        department_id,
        level
      ];
    }
    
    const result = await client.query(query, params);
    
    // Commit transaction
    await client.query('COMMIT');
    
    return res.status(200).json({
      message: 'Student profile updated successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    // Rollback transaction in case of error
    await client.query('ROLLBACK');
    logger.error(`Error updating student profile: ${error.message}`);
    return res.status(500).json({ 
      message: 'Failed to update student profile',
      error: error.message 
    });
  } finally {
    client.release();
  }
};

/**
 * Add education history
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const addEducationHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      institution, 
      degree, 
      field_of_study, 
      start_date, 
      end_date, 
      grade,
      description
    } = req.body;
    
    // Validate required fields
    if (!institution || !degree || !field_of_study || !start_date) {
      return res.status(400).json({ 
        message: 'Institution, degree, field of study, and start date are required'
      });
    }
    
    // Check if profile exists
    const checkQuery = `
      SELECT * FROM student_profiles
      WHERE user_id = $1
    `;
    
    const checkResult = await pool.query(checkQuery, [userId]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: 'Student profile not found' });
    }
    
    // Add education history
    const query = `
      INSERT INTO education_history (
        user_id,
        institution,
        degree,
        field_of_study,
        start_date,
        end_date,
        grade,
        description
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    
    const result = await pool.query(query, [
      userId,
      institution,
      degree,
      field_of_study,
      start_date,
      end_date,
      grade,
      description
    ]);
    
    return res.status(201).json({
      message: 'Education history added successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    logger.error(`Error adding education history: ${error.message}`);
    return res.status(500).json({ 
      message: 'Failed to add education history',
      error: error.message 
    });
  }
};

/**
 * Get academic performance
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAcademicPerformance = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get enrollment stats with grades
    const statsQuery = `
      SELECT 
        AVG(grade) as average_grade,
        COUNT(*) as total_courses,
        COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_courses,
        COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_courses,
        SUM(credits) as total_credits_earned
      FROM enrollments
      WHERE user_id = $1
    `;
    
    const statsResult = await pool.query(statsQuery, [userId]);
    
    // Get recent course submissions
    const submissionsQuery = `
      SELECT 
        s.id,
        s.submission_date,
        s.grade,
        s.feedback,
        a.title as assignment_title,
        c.title as course_title
      FROM submissions s
      JOIN assignments a ON s.assignment_id = a.id
      JOIN courses c ON a.course_id = c.id
      WHERE s.user_id = $1
      ORDER BY s.submission_date DESC
      LIMIT 5
    `;
    
    const submissionsResult = await pool.query(submissionsQuery, [userId]);
    
    // Combine results
    const academicPerformance = {
      stats: statsResult.rows[0],
      recent_submissions: submissionsResult.rows
    };
    
    return res.status(200).json({
      message: 'Academic performance retrieved successfully',
      data: academicPerformance
    });
    
  } catch (error) {
    logger.error(`Error retrieving academic performance: ${error.message}`);
    return res.status(500).json({ 
      message: 'Failed to retrieve academic performance',
      error: error.message 
    });
  }
};

/**
 * Get course progress
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;
    
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }
    
    // Check enrollment
    const enrollmentQuery = `
      SELECT * FROM enrollments
      WHERE user_id = $1 AND course_id = $2
    `;
    
    const enrollmentResult = await pool.query(enrollmentQuery, [userId, courseId]);
    
    if (enrollmentResult.rows.length === 0) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    
    // Get course details
    const courseQuery = `
      SELECT id, title, description FROM courses
      WHERE id = $1
    `;
    
    const courseResult = await pool.query(courseQuery, [courseId]);
    
    // Get course sections
    const sectionsQuery = `
      SELECT 
        id, 
        title, 
        description, 
        order_index
      FROM course_sections
      WHERE course_id = $1
      ORDER BY order_index
    `;
    
    const sectionsResult = await pool.query(sectionsQuery, [courseId]);
    
    // Get section completion status
    const progressQuery = `
      SELECT 
        section_id,
        completed
      FROM section_progress
      WHERE user_id = $1 AND course_id = $2
    `;
    
    const progressResult = await pool.query(progressQuery, [userId, courseId]);
    
    // Map progress to sections
    const sections = sectionsResult.rows.map(section => {
      const progress = progressResult.rows.find(p => p.section_id === section.id);
      return {
        ...section,
        completed: progress ? progress.completed : false
      };
    });
    
    // Get assignment completion
    const assignmentsQuery = `
      SELECT 
        a.id,
        a.title,
        a.due_date,
        s.id as submission_id,
        s.grade,
        s.status as submission_status
      FROM assignments a
      LEFT JOIN submissions s ON a.id = s.assignment_id AND s.user_id = $1
      WHERE a.course_id = $2
      ORDER BY a.due_date
    `;
    
    const assignmentsResult = await pool.query(assignmentsQuery, [userId, courseId]);
    
    // Calculate overall progress
    const totalSections = sections.length;
    const completedSections = sections.filter(s => s.completed).length;
    const progressPercentage = totalSections > 0 
      ? Math.round((completedSections / totalSections) * 100) 
      : 0;
    
    // Combine results
    const courseProgress = {
      course: courseResult.rows[0],
      enrollment: enrollmentResult.rows[0],
      progress_percentage: progressPercentage,
      sections,
      assignments: assignmentsResult.rows
    };
    
    return res.status(200).json({
      message: 'Course progress retrieved successfully',
      data: courseProgress
    });
    
  } catch (error) {
    logger.error(`Error retrieving course progress: ${error.message}`);
    return res.status(500).json({ 
      message: 'Failed to retrieve course progress',
      error: error.message 
    });
  }
};

/**
 * Register student
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const registerStudent = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { 
      username, 
      email, 
      password,
      first_name,
      last_name,
      department_id,
      wallet_address
    } = req.body;
    
    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: 'Username, email and password are required'
      });
    }
    
    // Start transaction
    await client.query('BEGIN');
    
    // Check if user exists
    const checkQuery = `
      SELECT * FROM users
      WHERE username = $1 OR email = $2
    `;
    
    const checkResult = await client.query(checkQuery, [username, email]);
    
    if (checkResult.rows.length > 0) {
      return res.status(409).json({ 
        message: 'Username or email already exists'
      });
    }
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const userQuery = `
      INSERT INTO users (username, email, password, role)
      VALUES ($1, $2, $3, 'student')
      RETURNING id, username, email, role
    `;
    
    const userResult = await client.query(userQuery, [
      username,
      email,
      hashedPassword
    ]);
    
    const userId = userResult.rows[0].id;
    
    // Create student profile
    const profileQuery = `
      INSERT INTO student_profiles (
        user_id,
        first_name,
        last_name,
        department_id,
        wallet_address,
        registration_date
      )
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
      RETURNING *
    `;
    
    const profileResult = await client.query(profileQuery, [
      userId,
      first_name,
      last_name,
      department_id,
      wallet_address
    ]);
    
    // Commit transaction
    await client.query('COMMIT');
    
    return res.status(201).json({
      message: 'Student registered successfully',
      data: {
        user: userResult.rows[0],
        profile: profileResult.rows[0]
      }
    });
    
  } catch (error) {
    // Rollback transaction in case of error
    await client.query('ROLLBACK');
    logger.error(`Error registering student: ${error.message}`);
    return res.status(500).json({ 
      message: 'Failed to register student',
      error: error.message 
    });
  } finally {
    client.release();
  }
};

/**
 * Connect wallet to student account
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const connectWallet = async (req, res) => {
  try {
    const userId = req.user.id;
    const { wallet_address } = req.body;
    
    if (!wallet_address) {
      return res.status(400).json({ message: 'Wallet address is required' });
    }
    
    // Validate wallet address format
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethAddressRegex.test(wallet_address)) {
      return res.status(400).json({ message: 'Invalid wallet address format' });
    }
    
    // Check if wallet is already connected to another account
    const checkQuery = `
      SELECT * FROM student_profiles
      WHERE wallet_address = $1 AND user_id != $2
    `;
    
    const checkResult = await pool.query(checkQuery, [wallet_address, userId]);
    
    if (checkResult.rows.length > 0) {
      return res.status(409).json({ 
        message: 'Wallet address is already connected to another account'
      });
    }
    
    // Update student profile with wallet address
    const updateQuery = `
      UPDATE student_profiles
      SET 
        wallet_address = $2,
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1
      RETURNING *
    `;
    
    const result = await pool.query(updateQuery, [userId, wallet_address]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Student profile not found' });
    }
    
    return res.status(200).json({
      message: 'Wallet connected successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    logger.error(`Error connecting wallet: ${error.message}`);
    return res.status(500).json({ 
      message: 'Failed to connect wallet',
      error: error.message 
    });
  }
};

module.exports = {
  getStudentProfile,
  updateStudentProfile,
  addEducationHistory,
  getAcademicPerformance,
  getCourseProgress,
  registerStudent,
  connectWallet
}; 