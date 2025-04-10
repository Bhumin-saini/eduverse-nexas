import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useToast } from "@/hooks/use-toast";
import { 
  getProviderAndSigner, 
  getEduPointsBalance,
  getStudentSummary,
  redeemOffer as redeemOfferContract,
  stakeEduPoints,
  unstakeEduPoints,
  isWalletInstalled,
  checkNetwork,
  registerStudentOnChain
} from '../utils/contractUtils';

// Add this at the top of the file
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (params: any) => void) => void;
      removeListener: (event: string, callback: (params: any) => void) => void;
    };
    hasAutoConnected?: boolean; // Add this flag to prevent multiple auto-connections
  }
}

interface StudentSummary {
  totalPointsEarned: number;
  totalPointsSpent: number;
  currentBalance: number;
  stakedPoints: number;
  researchPoints: number;
  walletAddress: string;
  isWalletRegistered: boolean;
  isRegistered: boolean;
  achievementCount: number;
  name?: string;
  email?: string;
  studentId?: string;
  department?: string;
}

interface TokenContextType {
  balance: string;
  studentSummary: StudentSummary | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  registerWallet: (email: string, password: string) => Promise<void>;
  registerStudent: (name: string, email: string, studentId: string, department: string) => Promise<void>;
  stakePoints: (amount: string, duration: number) => Promise<void>;
  unstakePoints: () => Promise<void>;
  redeemOffer: (offerId: number) => Promise<void>;
  isConnected: boolean;
  isRegistered: boolean;
  isLoading: boolean;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState('0');
  const [studentSummary, setStudentSummary] = useState<StudentSummary | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Check if wallet is already registered and connected
  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        // Prevent multiple auto-connections during page navigation
        if (typeof window !== 'undefined' && window.hasAutoConnected) {
          return;
        }
        
        // First check if wallet is installed
        if (!isWalletInstalled()) return;
        
        // Check if ethereum is connected
        const { provider } = await getProviderAndSigner();
        const accounts = await provider.listAccounts();
        
        if (accounts && accounts.length > 0) {
          // Set the auto-connection flag
          if (typeof window !== 'undefined') {
            window.hasAutoConnected = true;
          }
          
          const address = accounts[0];
          
          // Check if wallet is registered
          const storedWallet = localStorage.getItem('registeredWallet');
          if (storedWallet) {
            const { address: storedAddress, isRegistered } = JSON.parse(storedWallet);
            
            // Only reconnect if the current account matches the stored one
            if (address.toLowerCase() === storedAddress.toLowerCase()) {
              setIsRegistered(isRegistered);
              setIsConnected(true);
              
              // Set student summary
              setStudentSummary(prev => {
                return {
                  ...prev || {
                    totalPointsEarned: 0,
                    totalPointsSpent: 0,
                    currentBalance: 0,
                    stakedPoints: 0,
                    researchPoints: 0,
                    isWalletRegistered: false,
                    isRegistered: false,
                    achievementCount: 0
                  },
                  walletAddress: address,
                  isWalletRegistered: true
                };
              });
              
              // Refresh balance
              setTimeout(refreshBalance, 500);
            }
          } else {
            // Wallet is connected but not registered
            setIsConnected(true);
            setStudentSummary(prev => {
              return {
                ...prev || {
                  totalPointsEarned: 0,
                  totalPointsSpent: 0,
                  currentBalance: 0,
                  stakedPoints: 0,
                  researchPoints: 0,
                  isWalletRegistered: false,
                  isRegistered: false,
                  achievementCount: 0
                },
                walletAddress: address,
                isWalletRegistered: true
              };
            });
          }
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };
    
    checkWalletConnection();
    
    // Listen for account changes
    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet();
        // Reset the auto-connection flag
        if (typeof window !== 'undefined') {
          window.hasAutoConnected = false;
        }
      } else if (isConnected && studentSummary?.walletAddress && accounts[0] !== studentSummary.walletAddress) {
        // User switched accounts
        toast({
          title: "Account Changed",
          description: "Wallet account has changed. Please reconnect.",
          variant: "destructive",
        });
        disconnectWallet();
        // Reset the auto-connection flag
        if (typeof window !== 'undefined') {
          window.hasAutoConnected = false;
        }
      }
    };
    
    // Add listener for account changes
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }
    
    // Cleanup listener
    return () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      
      if (!isWalletInstalled()) {
        throw new Error('MetaMask is not installed');
      }

      await checkNetwork();
      
      const { provider } = await getProviderAndSigner();
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const address = accounts[0];
      const storedWallet = localStorage.getItem('registeredWallet');
      
      if (storedWallet) {
        const { address: storedAddress, isRegistered } = JSON.parse(storedWallet);
        if (address.toLowerCase() !== storedAddress.toLowerCase()) {
          throw new Error('This wallet is not registered');
        }
        setIsRegistered(isRegistered);
      }

      setIsConnected(true);
      
      // Initialize studentSummary if null
      setStudentSummary(prev => {
        const initialData = prev || {
          totalPointsEarned: 0,
          totalPointsSpent: 0,
          currentBalance: 0,
          stakedPoints: 0,
          researchPoints: 0,
          walletAddress: '',
          isWalletRegistered: false,
          isRegistered: false,
          achievementCount: 0
        };
        
        return {
          ...initialData,
          walletAddress: address,
          isWalletRegistered: true
        };
      });

      // Refresh balance after connecting
      setTimeout(() => refreshBalance(), 500);

      toast({
        title: "Wallet Connected",
        description: "Successfully connected to your wallet",
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Failed",
        description: error instanceof Error ? error.message : "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const registerWallet = async (email: string, password: string) => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const address = accounts[0];

      // Check if wallet is already registered
      const response = await fetch('/api/wallet/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        throw new Error('Failed to check wallet registration');
      }

      const { isRegistered } = await response.json();
      if (isRegistered) {
        throw new Error('This wallet is already registered');
      }

      // Register the wallet
      const registerResponse = await fetch('/api/wallet/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, email, password }),
      });

      if (!registerResponse.ok) {
        throw new Error('Failed to register wallet');
      }

      // Store registration info locally
      localStorage.setItem('registeredWallet', JSON.stringify({
        address,
        isRegistered: true
      }));

      setIsRegistered(true);
      setIsConnected(true);
      setStudentSummary(prev => ({
        ...prev!,
        walletAddress: address,
        isWalletRegistered: true
      }));

      toast({
        title: "Wallet Registered",
        description: "Successfully registered your wallet",
      });
    } catch (error) {
      console.error('Error registering wallet:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Failed to register wallet",
        variant: "destructive",
      });
    }
  };

  const registerStudent = async (name: string, email: string, studentId: string, department: string) => {
    try {
      setIsLoading(true);
      
      // Check if wallet is connected
      if (!isConnected) {
        await connectWallet();
      }
      
      // Register student on-chain
      await registerStudentOnChain(name, email, studentId, department);
      
      // Store registration info locally
      localStorage.setItem('registeredWallet', JSON.stringify({
        address: studentSummary?.walletAddress,
        isRegistered: true,
        studentDetails: {
          name,
          email,
          studentId,
          department
        }
      }));

      // Update studentSummary with the new information
      setStudentSummary(prev => {
        if (!prev) return null;
        return {
          ...prev,
          isRegistered: true,
          name,
          email,
          studentId,
          department
        };
      });

      setIsRegistered(true);
      
      toast({
        title: "Registration Successful",
        description: "Your student details have been registered on the blockchain",
      });
      
      // Refresh balance to get updated data
      await refreshBalance();
      
    } catch (error: any) {
      console.error('Error registering student:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to register student on blockchain",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stakePoints = async (amount: string, duration: number) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await stakeEduPoints(amount, duration);
      await refreshBalance();
      toast({
        title: "Points Staked",
        description: `Successfully staked ${amount} EduPoints for ${duration} months`,
      });
    } catch (err: any) {
      console.error("Error staking points:", err);
      toast({
        title: "Transaction Failed",
        description: err.message || "Failed to stake points",
        variant: "destructive",
      });
    }
  };

  const unstakePoints = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await unstakeEduPoints();
      await refreshBalance();
      toast({
        title: "Points Unstaked",
        description: "Successfully unstaked your EduPoints",
      });
    } catch (err: any) {
      console.error("Error unstaking points:", err);
      toast({
        title: "Transaction Failed",
        description: err.message || "Failed to unstake points",
        variant: "destructive",
      });
    }
  };

  const redeemOffer = async (offerId: number) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await redeemOfferContract(offerId);
      await refreshBalance();
      toast({
        title: "Offer Redeemed",
        description: "Successfully redeemed the offer",
      });
    } catch (err: any) {
      console.error("Error redeeming offer:", err);
      toast({
        title: "Transaction Failed",
        description: err.message || "Failed to redeem offer",
        variant: "destructive",
      });
    }
  };

  const refreshBalance = async () => {
    if (!isConnected) return;
    
    try {
      // Get current wallet address if studentSummary is null
      let walletAddress = studentSummary?.walletAddress;
      
      if (!walletAddress) {
        try {
          const { signer } = await getProviderAndSigner();
          walletAddress = await signer.getAddress();
        } catch (err) {
          console.error("Could not get wallet address:", err);
          return;
        }
      }
      
      // Get token balance
      const tokenBalance = await getEduPointsBalance(walletAddress);
      setBalance(tokenBalance);
      
      // Get student summary
      try {
        const summary = await getStudentSummary(walletAddress);
        setStudentSummary({
          researchPoints: 0, // Default value since it's not in the contract
          walletAddress: walletAddress,
          isWalletRegistered: true,
          isRegistered: summary.isRegistered,
          totalPointsEarned: Number(summary.totalPointsEarned),
          totalPointsSpent: Number(summary.totalPointsSpent),
          currentBalance: Number(summary.currentBalance),
          stakedPoints: Number(summary.stakedPoints),
          achievementCount: Number(summary.achievementCount)
        });
        setIsRegistered(summary.isRegistered);
      } catch (err) {
        // If there's an error getting the summary, student might not be registered
        setIsRegistered(false);
      }
    } catch (err: any) {
      console.error("Error refreshing balance:", err);
      toast({
        title: "Connection Failed",
        description: err.message || "Failed to refresh balance",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setStudentSummary(null);
    setBalance('0');
    // Don't clear isRegistered state as it's based on stored wallet info
    
    // Reset the auto-connection flag when manually disconnecting
    if (typeof window !== 'undefined') {
      window.hasAutoConnected = false;
    }
    
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected your wallet",
    });
  };

  return (
    <TokenContext.Provider
      value={{
        balance,
        studentSummary,
        connectWallet,
        disconnectWallet,
        registerWallet,
        registerStudent,
        stakePoints,
        unstakePoints,
        redeemOffer,
        isConnected,
        isRegistered,
        isLoading
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
