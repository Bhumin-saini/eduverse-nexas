import { ethers } from 'ethers';

// ABI for the EduPointsToken contract - this would normally be generated from the compiled contract
// This is a simplified version for the main functions we'll use
const EduPointsABI = [
  // Read functions
  "function balanceOf(address account) view returns (uint256)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function getStudentSummary(address studentAddress) view returns (bool isRegistered, uint256 totalPointsEarned, uint256 totalPointsSpent, uint256 currentBalance, uint256 stakedPoints, uint256 achievementCount)",
  "function getStudentAchievement(address studentAddress, uint256 achievementId) view returns (uint8 achievementType, uint256 pointsAwarded, string memory achievementName, uint256 timestamp)",
  "function isEmailRegistered(string memory email) view returns (bool)",
  "function isStudentIdRegistered(string memory studentId) view returns (bool)",
  
  // Write functions
  "function registerStudent(string memory name, string memory email, string memory studentId, string memory department)",
  "function redeemOffer(uint256 offerId)",
  "function stakePoints(uint256 amount, uint256 durationMonths)",
  "function unstakePoints()",
  
  // Events
  "event StudentRegistered(address indexed studentAddress, string name, string studentId, string department, uint256 timestamp)",
  "event PointsEarned(address indexed student, uint256 amount, string achievementName, uint8 achievementType)",
  "event PointsRedeemed(address indexed student, uint256 amount, string offerName)",
  "event PointsStaked(address indexed student, uint256 amount, uint256 duration)",
  "event PointsUnstaked(address indexed student, uint256 amount, uint256 reward)"
];

// Contract address on Arbitrum Layer 3 - this would be the actual deployed address
const CONTRACT_ADDRESS = '0x8A21F743u29e39D84b3F2a132'; // Example address - replace with actual deployment

// Explicitly define the window interface with ethereum property
interface WindowWithEthereum extends Window {
  ethereum?: any;
}

/**
 * Get an ethers provider and signer
 */
export const getProviderAndSigner = async () => {
  const windowWithEthereum = window as WindowWithEthereum;
  
  if (!windowWithEthereum.ethereum) {
    // MetaMask or similar wallet extension not found
    throw new Error("No ethereum provider found. Please install MetaMask or another Web3 wallet.");
  }
  
  try {
    // Request account access explicitly to trigger the MetaMask popup
    await windowWithEthereum.ethereum.request({ method: 'eth_requestAccounts' });
    
    // Initialize provider after permission is granted
    const provider = new ethers.providers.Web3Provider(windowWithEthereum.ethereum);
    const signer = provider.getSigner();
    
    // Check if we actually got connected (sometimes MetaMask connects but doesn't return accounts)
    const accounts = await provider.listAccounts();
    if (accounts.length === 0) {
      throw new Error("No accounts found. Please unlock MetaMask and connect to this site.");
    }
    
    return { provider, signer };
  } catch (error: any) {
    // Properly handle user rejected connection
    if (error.code === 4001) {
      // User rejected the connection request
      throw new Error("Connection request was rejected. Please approve the connection in your wallet.");
    }
    
    console.error("Error connecting to wallet:", error);
    throw new Error(`Failed to connect to wallet: ${error.message || "Unknown error"}`);
  }
};

/**
 * Get the EduPoints contract instance
 */
export const getEduPointsContract = async () => {
  const { signer } = await getProviderAndSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, EduPointsABI, signer);
};

/**
 * Get the user's EduPoints balance
 */
export const getEduPointsBalance = async (address: string) => {
  try {
    const contract = await getEduPointsContract();
    const balance = await contract.balanceOf(address);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};

/**
 * Get a student's summary information
 */
export const getStudentSummary = async (address: string) => {
  const contract = await getEduPointsContract();
  const summary = await contract.getStudentSummary(address);
  
  return {
    isRegistered: summary[0],
    totalPointsEarned: ethers.utils.formatEther(summary[1]),
    totalPointsSpent: ethers.utils.formatEther(summary[2]),
    currentBalance: ethers.utils.formatEther(summary[3]),
    stakedPoints: ethers.utils.formatEther(summary[4]),
    achievementCount: summary[5].toNumber(),
  };
};

/**
 * Get a student's achievement details
 */
export const getStudentAchievement = async (address: string, achievementId: number) => {
  const contract = await getEduPointsContract();
  const achievement = await contract.getStudentAchievement(address, achievementId);
  
  const achievementTypes = ["ACADEMIC", "SKILLS", "LEADERSHIP", "COMMUNITY"];
  
  return {
    achievementType: achievementTypes[achievement[0]],
    pointsAwarded: ethers.utils.formatEther(achievement[1]),
    achievementName: achievement[2],
    timestamp: new Date(achievement[3].toNumber() * 1000), // Convert from unix timestamp
  };
};

/**
 * Redeem an offer with EduPoints
 */
export const redeemOffer = async (offerId: number) => {
  const contract = await getEduPointsContract();
  const tx = await contract.redeemOffer(offerId);
  return tx.wait();
};

/**
 * Stake EduPoints
 */
export const stakeEduPoints = async (amount: string, durationMonths: number) => {
  const contract = await getEduPointsContract();
  const amountWei = ethers.utils.parseEther(amount);
  const tx = await contract.stakePoints(amountWei, durationMonths);
  return tx.wait();
};

/**
 * Unstake EduPoints
 */
export const unstakeEduPoints = async () => {
  const contract = await getEduPointsContract();
  const tx = await contract.unstakePoints();
  return tx.wait();
};

/**
 * Check if MetaMask or another wallet is installed
 */
export const isWalletInstalled = () => {
  const windowWithEthereum = window as WindowWithEthereum;
  return Boolean(windowWithEthereum.ethereum);
};

/**
 * Check if wallet is on the correct network
 */
export const checkNetwork = async () => {
  const windowWithEthereum = window as WindowWithEthereum;
  
  if (!windowWithEthereum.ethereum) return false;
  
  try {
    const chainId = await windowWithEthereum.ethereum.request({ method: 'eth_chainId' });
    // Replace with your actual Arbitrum L3 chain ID
    const arbitrumL3ChainId = '0x66EEB'; // This is an example - use the actual chain ID
    
    return chainId === arbitrumL3ChainId;
  } catch (error) {
    console.error("Error checking network:", error);
    return false;
  }
};

/**
 * Check if an email is already registered
 */
export const isEmailRegistered = async (email: string) => {
  try {
    const contract = await getEduPointsContract();
    return await contract.isEmailRegistered(email);
  } catch (error) {
    console.error("Error checking email registration:", error);
    throw error;
  }
};

/**
 * Check if a student ID is already registered
 */
export const isStudentIdRegistered = async (studentId: string) => {
  try {
    const contract = await getEduPointsContract();
    return await contract.isStudentIdRegistered(studentId);
  } catch (error) {
    console.error("Error checking student ID registration:", error);
    throw error;
  }
};

/**
 * Register a student on the blockchain
 */
export const registerStudentOnChain = async (
  name: string,
  email: string, 
  studentId: string,
  department: string
) => {
  try {
    // First, check if the email or student ID is already registered
    const emailRegistered = await isEmailRegistered(email);
    if (emailRegistered) {
      throw new Error("This email is already registered");
    }
    
    const studentIdRegistered = await isStudentIdRegistered(studentId);
    if (studentIdRegistered) {
      throw new Error("This student ID is already registered");
    }
    
    // Proceed with registration
    const contract = await getEduPointsContract();
    const tx = await contract.registerStudent(name, email, studentId, department);
    await tx.wait();
    
    return {
      success: true,
      transaction: tx.hash
    };
  } catch (error: any) {
    console.error("Error registering student on chain:", error);
    throw new Error(error.message || "Failed to register student on blockchain");
  }
};
