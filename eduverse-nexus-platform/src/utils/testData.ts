
/**
 * Test data utility for simulating blockchain interactions
 * This allows testing the UI without an actual wallet connection
 */

// Sample student data
export const sampleStudentData = {
  address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
  isRegistered: true,
  balance: '250.0',
  totalPointsEarned: '325.0',
  totalPointsSpent: '75.0',
  stakedPoints: '50.0',
  achievementCount: 5
};

// Sample unregistered student
export const unregisteredStudentData = {
  address: '0x2546BcD3c84621e976D8185a91A922aE77ECEc30',
  isRegistered: false,
  balance: '0',
  totalPointsEarned: '0',
  totalPointsSpent: '0',
  stakedPoints: '0',
  achievementCount: 0
};

// Sample campus offers
export const campusOffers = [
  {
    id: 0,
    name: '10% Cafeteria Discount',
    pointsCost: '100',
    isActive: true
  },
  {
    id: 1,
    name: 'Bookstore Coupon',
    pointsCost: '200',
    isActive: true
  },
  {
    id: 2,
    name: 'Printing Credits',
    pointsCost: '50',
    isActive: true
  },
  {
    id: 3,
    name: 'Early Course Registration',
    pointsCost: '300',
    isActive: false
  },
  {
    id: 4,
    name: 'Study Room Reservation',
    pointsCost: '75',
    isActive: true
  }
];

// Sample achievements
export const studentAchievements = [
  {
    id: 0,
    achievementType: 'ACADEMIC',
    pointsAwarded: '50',
    achievementName: 'Dean\'s List Spring 2025',
    timestamp: new Date('2025-01-15')
  },
  {
    id: 1,
    achievementType: 'SKILLS',
    pointsAwarded: '75',
    achievementName: 'Blockchain Development Certificate',
    timestamp: new Date('2025-02-03')
  },
  {
    id: 2,
    achievementType: 'LEADERSHIP',
    pointsAwarded: '100',
    achievementName: 'Student Council President',
    timestamp: new Date('2025-02-27')
  },
  {
    id: 3,
    achievementType: 'COMMUNITY',
    pointsAwarded: '50',
    achievementName: 'Campus Cleanup Volunteer',
    timestamp: new Date('2025-03-15')
  },
  {
    id: 4,
    achievementType: 'ACADEMIC',
    pointsAwarded: '50',
    achievementName: 'Perfect Attendance',
    timestamp: new Date('2025-04-01')
  }
];

// Different staking scenarios
export const stakingOptions = [
  {
    duration: 1, // 1 month
    rate: '5%',
    pointsStaked: '50',
    potentialReward: '2.5'
  },
  {
    duration: 3, // 3 months
    rate: '10%',
    pointsStaked: '100',
    potentialReward: '10'
  },
  {
    duration: 9, // academic year
    rate: '15%',
    pointsStaked: '200',
    potentialReward: '30'
  }
];

// Transaction history
export const transactionHistory = [
  {
    type: 'EARN',
    amount: '50',
    description: 'Dean\'s List Spring 2025',
    timestamp: new Date('2025-01-15')
  },
  {
    type: 'STAKE',
    amount: '50',
    description: 'Staked for 1 month',
    timestamp: new Date('2025-02-01')
  },
  {
    type: 'SPEND',
    amount: '75',
    description: 'Study Room Reservation',
    timestamp: new Date('2025-02-20')
  },
  {
    type: 'EARN',
    amount: '100',
    description: 'Student Council President',
    timestamp: new Date('2025-02-27')
  },
  {
    type: 'UNSTAKE',
    amount: '52.5',
    description: 'Unstaked with rewards',
    timestamp: new Date('2025-03-01')
  }
];

// Test wallet states
export const walletStates = {
  notInstalled: {
    isInstalled: false,
    isConnected: false,
    address: null,
    error: "MetaMask or compatible wallet not found."
  },
  notConnected: {
    isInstalled: true,
    isConnected: false,
    address: null,
    error: null
  },
  connected: {
    isInstalled: true,
    isConnected: true,
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    error: null
  },
  wrongNetwork: {
    isInstalled: true,
    isConnected: true,
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    error: "You're not connected to Arbitrum L3. Please switch networks."
  },
  connectionRejected: {
    isInstalled: true,
    isConnected: false,
    address: null,
    error: "Connection request was rejected. Please approve the connection in your wallet."
  }
};

// Simulate mock response functions
export const mockGetStudentSummary = (address: string) => {
  // Return different data based on the address
  if (address === sampleStudentData.address) {
    return {
      isRegistered: sampleStudentData.isRegistered,
      totalPointsEarned: sampleStudentData.totalPointsEarned,
      totalPointsSpent: sampleStudentData.totalPointsSpent,
      currentBalance: sampleStudentData.balance,
      stakedPoints: sampleStudentData.stakedPoints,
      achievementCount: sampleStudentData.achievementCount
    };
  } else {
    return {
      isRegistered: unregisteredStudentData.isRegistered,
      totalPointsEarned: unregisteredStudentData.totalPointsEarned,
      totalPointsSpent: unregisteredStudentData.totalPointsSpent,
      currentBalance: unregisteredStudentData.balance,
      stakedPoints: unregisteredStudentData.stakedPoints,
      achievementCount: unregisteredStudentData.achievementCount
    };
  }
};

export const mockGetStudentAchievement = (address: string, achievementId: number) => {
  if (address === sampleStudentData.address && achievementId < studentAchievements.length) {
    const achievement = studentAchievements[achievementId];
    return {
      achievementType: achievement.achievementType,
      pointsAwarded: achievement.pointsAwarded,
      achievementName: achievement.achievementName,
      timestamp: achievement.timestamp
    };
  } else {
    throw new Error("Achievement not found");
  }
};

// Helper to simulate async responses with optional delay and failure chance
export const simulateAsyncResponse = (data: any, options?: { 
  delayMs?: number, 
  failureChance?: number,
  errorMessage?: string
}) => {
  const delay = options?.delayMs || 500;
  const failureChance = options?.failureChance || 0;
  const errorMessage = options?.errorMessage || "Transaction failed";
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failureChance) {
        reject(new Error(errorMessage));
      } else {
        resolve(data);
      }
    }, delay);
  });
};

// Mock contract interaction functions
export const mockContractFunctions = {
  // Mock function to simulate getting balance
  getEduPointsBalance: async (address: string) => {
    if (address === sampleStudentData.address) {
      return simulateAsyncResponse(sampleStudentData.balance);
    } else {
      return simulateAsyncResponse('0');
    }
  },
  
  // Mock function to simulate staking points
  stakeEduPoints: async (amount: string, durationMonths: number) => {
    // You could implement validation logic here
    if (parseFloat(amount) <= 0) {
      return simulateAsyncResponse(null, { 
        failureChance: 1, 
        errorMessage: "Amount must be greater than 0" 
      });
    }
    
    return simulateAsyncResponse({
      transactionHash: '0x' + Math.random().toString(16).substr(2, 40)
    });
  },
  
  // Mock function to simulate unstaking points
  unstakeEduPoints: async () => {
    return simulateAsyncResponse({
      transactionHash: '0x' + Math.random().toString(16).substr(2, 40)
    });
  },
  
  // Mock function to simulate redeeming an offer
  redeemOffer: async (offerId: number) => {
    const offer = campusOffers.find(o => o.id === offerId);
    
    if (!offer) {
      return simulateAsyncResponse(null, { 
        failureChance: 1, 
        errorMessage: "Offer not found" 
      });
    }
    
    if (!offer.isActive) {
      return simulateAsyncResponse(null, { 
        failureChance: 1, 
        errorMessage: "Offer is not active" 
      });
    }
    
    return simulateAsyncResponse({
      transactionHash: '0x' + Math.random().toString(16).substr(2, 40),
      offer
    });
  },
  
  // Mock function to check if wallet is installed
  isWalletInstalled: () => {
    return true; // Change to test different scenarios
  },
  
  // Mock function to check network
  checkNetwork: async () => {
    return true; // Change to test different scenarios
  }
};

/**
 * Function to help simulate different scenarios
 * This can be used in development to test UI in different situations
 */
export const useTestMode = (scenarioName?: string) => {
  // Scenarios to test different wallet states
  let scenario = scenarioName || 'default';
  
  const scenarios = {
    default: {
      wallet: walletStates.connected,
      student: sampleStudentData,
      transactions: transactionHistory,
      offers: campusOffers
    },
    notInstalled: {
      wallet: walletStates.notInstalled,
      student: null,
      transactions: [],
      offers: campusOffers
    },
    notConnected: {
      wallet: walletStates.notConnected,
      student: null,
      transactions: [],
      offers: campusOffers
    },
    wrongNetwork: {
      wallet: walletStates.wrongNetwork,
      student: sampleStudentData,
      transactions: transactionHistory,
      offers: campusOffers
    },
    unregistered: {
      wallet: walletStates.connected,
      student: unregisteredStudentData,
      transactions: [],
      offers: campusOffers
    },
    connectionRejected: {
      wallet: walletStates.connectionRejected,
      student: null,
      transactions: [],
      offers: campusOffers
    }
  };
  
  const activeScenario = scenarios[scenario as keyof typeof scenarios] || scenarios.default;
  
  return {
    ...activeScenario,
    // Helper method to switch scenarios
    switchScenario: (newScenario: string) => {
      scenario = newScenario;
      return scenarios[newScenario as keyof typeof scenarios] || scenarios.default;
    },
    // Helper to get current scenario name
    getCurrentScenario: () => scenario
  };
};
