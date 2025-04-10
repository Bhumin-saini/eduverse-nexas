const { ethers } = require('ethers');
const EduPointsTokenABI = require('../contracts/EduPointsToken.json');
const logger = require('../utils/logger');

// Contract address from environment
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Admin wallet private key for transactions that need to be signed by an admin
const ADMIN_PRIVATE_KEY = process.env.PRIVATE_KEY;

// RPC URL for the network
const RPC_URL = process.env.RPC_URL;

/**
 * Get a provider and signer
 * @param {boolean} useAdmin - Whether to use admin private key for signer
 * @returns {Object} Provider and signer
 */
exports.getProviderAndSigner = async (useAdmin = false) => {
  try {
    // Initialize provider
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    
    // Initialize signer if needed
    let signer = null;
    if (useAdmin) {
      if (!ADMIN_PRIVATE_KEY) {
        throw new Error('Admin private key not configured');
      }
      signer = new ethers.Wallet(ADMIN_PRIVATE_KEY, provider);
    }
    
    return { provider, signer };
  } catch (error) {
    logger.error('Error initializing provider and signer:', error);
    throw new Error(`Failed to initialize provider: ${error.message}`);
  }
};

/**
 * Get the EduPoints contract instance
 * @param {boolean} useAdmin - Whether to use admin account for signing
 * @returns {ethers.Contract} Contract instance
 */
exports.getEduPointsContract = async (useAdmin = false) => {
  try {
    const { provider, signer } = await this.getProviderAndSigner(useAdmin);
    
    // Initialize contract with signer or provider
    return new ethers.Contract(
      CONTRACT_ADDRESS,
      EduPointsTokenABI.abi,
      signer || provider
    );
  } catch (error) {
    logger.error('Error initializing contract:', error);
    throw new Error(`Failed to initialize contract: ${error.message}`);
  }
};

/**
 * Get a student's EduPoints balance
 * @param {string} address - Wallet address
 * @returns {string} Balance in EduPoints
 */
exports.getEduPointsBalance = async (address) => {
  try {
    const contract = await this.getEduPointsContract();
    const balance = await contract.balanceOf(address);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    logger.error(`Error fetching balance for ${address}:`, error);
    throw new Error(`Failed to fetch balance: ${error.message}`);
  }
};

/**
 * Get a student's summary information from the blockchain
 * @param {string} address - Wallet address
 * @returns {Object} Student summary data
 */
exports.getStudentSummary = async (address) => {
  try {
    const contract = await this.getEduPointsContract();
    const summary = await contract.getStudentSummary(address);
    
    return {
      isRegistered: summary[0],
      totalPointsEarned: ethers.utils.formatEther(summary[1]),
      totalPointsSpent: ethers.utils.formatEther(summary[2]),
      currentBalance: ethers.utils.formatEther(summary[3]),
      stakedPoints: ethers.utils.formatEther(summary[4]),
      achievementCount: summary[5].toNumber(),
    };
  } catch (error) {
    logger.error(`Error fetching student summary for ${address}:`, error);
    throw new Error(`Failed to fetch student summary: ${error.message}`);
  }
};

/**
 * Register a student on the blockchain
 * @param {string} name - Student name
 * @param {string} email - Student email
 * @param {string} studentId - Student ID
 * @param {string} department - Department
 * @param {string} walletAddress - Wallet address of the student
 * @returns {Object} Transaction result
 */
exports.registerStudentOnChain = async (name, email, studentId, department, walletAddress) => {
  try {
    // This function requires admin privileges
    const contract = await this.getEduPointsContract(true);
    
    // Check if email is already registered
    const isEmailRegistered = await contract.isEmailRegistered(email);
    if (isEmailRegistered) {
      throw new Error('This email is already registered on blockchain');
    }
    
    // Check if student ID is already registered
    const isStudentIdRegistered = await contract.isStudentIdRegistered(studentId);
    if (isStudentIdRegistered) {
      throw new Error('This student ID is already registered on blockchain');
    }
    
    // Register student
    const tx = await contract.registerStudent(name, email, studentId, department, walletAddress);
    const receipt = await tx.wait();
    
    logger.info(`Registered student ${name} with ID ${studentId} on blockchain: ${receipt.transactionHash}`);
    
    return {
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      status: receipt.status
    };
  } catch (error) {
    logger.error(`Error registering student on blockchain:`, error);
    throw new Error(`Failed to register student on blockchain: ${error.message}`);
  }
};

/**
 * Award points to a student for an achievement
 * @param {string} studentAddress - Wallet address of the student
 * @param {string} points - Amount of points to award
 * @param {string} achievementName - Name of the achievement
 * @param {number} achievementType - Type of achievement (0=Academic, 1=Skills, 2=Leadership, 3=Community)
 * @returns {Object} Transaction result
 */
exports.awardPoints = async (studentAddress, points, achievementName, achievementType) => {
  try {
    // This function requires admin privileges
    const contract = await this.getEduPointsContract(true);
    
    // Convert points to wei
    const pointsWei = ethers.utils.parseEther(points.toString());
    
    // Award points
    const tx = await contract.awardPoints(studentAddress, pointsWei, achievementName, achievementType);
    const receipt = await tx.wait();
    
    logger.info(`Awarded ${points} points to ${studentAddress} for ${achievementName}: ${receipt.transactionHash}`);
    
    return {
      transactionHash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      status: receipt.status
    };
  } catch (error) {
    logger.error(`Error awarding points:`, error);
    throw new Error(`Failed to award points: ${error.message}`);
  }
};

/**
 * Stake EduPoints
 * @param {string} walletAddress - Wallet address
 * @param {string} amount - Amount to stake
 * @param {number} durationMonths - Duration in months (1, 3, or 9)
 * @returns {Object} Transaction result
 */
exports.stakePoints = async (walletAddress, amount, durationMonths) => {
  try {
    // This function must be called by the student, so we'll need their signature
    // For admin functions, we'll need a middleware that verifies message signatures
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    
    // We can't use the student's private key directly for security reasons
    // Instead, we'll need to have the frontend sign the transaction and send it directly
    // Here, we're just defining the interface that would be called
    
    // Convert points to wei
    const amountWei = ethers.utils.parseEther(amount.toString());
    
    logger.info(`Staking ${amount} points for ${walletAddress} for ${durationMonths} months`);
    
    return {
      amount: amount,
      durationMonths: durationMonths,
      walletAddress: walletAddress,
      // This is just a placeholder - actual implementation would require wallet signature from frontend
      message: `This operation must be performed from the frontend with user's wallet signature`
    };
  } catch (error) {
    logger.error(`Error staking points:`, error);
    throw new Error(`Failed to stake points: ${error.message}`);
  }
};

/**
 * Redeem an offer with EduPoints
 * @param {string} walletAddress - Wallet address
 * @param {number} offerId - ID of the offer to redeem
 * @returns {Object} Transaction result
 */
exports.redeemOffer = async (walletAddress, offerId) => {
  try {
    // Similar to staking, this needs to be signed by the user's wallet
    logger.info(`Redeeming offer ${offerId} for ${walletAddress}`);
    
    return {
      offerId: offerId,
      walletAddress: walletAddress,
      // This is just a placeholder - actual implementation would require wallet signature from frontend
      message: `This operation must be performed from the frontend with user's wallet signature`
    };
  } catch (error) {
    logger.error(`Error redeeming offer:`, error);
    throw new Error(`Failed to redeem offer: ${error.message}`);
  }
};

/**
 * Listen for blockchain events
 * @param {string} eventName - Name of the event to listen for
 * @param {Function} callback - Callback function to handle the event
 */
exports.listenForEvents = async (eventName, callback) => {
  try {
    const contract = await this.getEduPointsContract();
    
    // Listen for events
    contract.on(eventName, (...args) => {
      const event = args[args.length - 1];
      logger.info(`Event ${eventName} detected: ${event.transactionHash}`);
      callback(event);
    });
    
    logger.info(`Started listening for ${eventName} events`);
  } catch (error) {
    logger.error(`Error setting up event listener for ${eventName}:`, error);
    throw new Error(`Failed to listen for events: ${error.message}`);
  }
};

/**
 * Get current gas price on the network
 * @returns {string} Gas price in Gwei
 */
exports.getGasPrice = async () => {
  try {
    const { provider } = await this.getProviderAndSigner();
    const gasPrice = await provider.getGasPrice();
    return ethers.utils.formatUnits(gasPrice, 'gwei');
  } catch (error) {
    logger.error('Error fetching gas price:', error);
    throw new Error(`Failed to fetch gas price: ${error.message}`);
  }
};

/**
 * Get transaction details by hash
 * @param {string} txHash - Transaction hash
 * @returns {Object} Transaction details
 */
exports.getTransactionDetails = async (txHash) => {
  try {
    const { provider } = await this.getProviderAndSigner();
    
    // Get transaction
    const tx = await provider.getTransaction(txHash);
    if (!tx) {
      throw new Error('Transaction not found');
    }
    
    // Get transaction receipt
    const receipt = await provider.getTransactionReceipt(txHash);
    
    return {
      hash: tx.hash,
      from: tx.from,
      to: tx.to,
      value: ethers.utils.formatEther(tx.value),
      gas: tx.gasLimit.toString(),
      gasPrice: ethers.utils.formatUnits(tx.gasPrice, 'gwei'),
      nonce: tx.nonce,
      blockNumber: tx.blockNumber,
      blockHash: tx.blockHash,
      timestamp: tx.timestamp, // This might be undefined depending on the provider
      status: receipt ? (receipt.status === 1 ? 'success' : 'failed') : 'pending',
      gasUsed: receipt ? receipt.gasUsed.toString() : undefined,
    };
  } catch (error) {
    logger.error(`Error fetching transaction details for ${txHash}:`, error);
    throw new Error(`Failed to fetch transaction details: ${error.message}`);
  }
};

/**
 * Check if a wallet has a specific role (ADMIN, MINTER, etc.)
 * @param {string} address - Wallet address
 * @param {string} role - Role to check (e.g., "ADMIN_ROLE", "MINTER_ROLE")
 * @returns {boolean} Whether the wallet has the role
 */
exports.hasRole = async (address, role) => {
  try {
    const contract = await this.getEduPointsContract();
    
    // Convert role string to bytes32
    const roleHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(role));
    
    // Check role
    return await contract.hasRole(roleHash, address);
  } catch (error) {
    logger.error(`Error checking role for ${address}:`, error);
    throw new Error(`Failed to check role: ${error.message}`);
  }
}; 