
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  getProviderAndSigner, 
  getEduPointsBalance,
  getStudentSummary,
  getStudentAchievement,
  redeemOffer,
  stakeEduPoints,
  unstakeEduPoints,
  isWalletInstalled,
  checkNetwork
} from '../utils/contractUtils';

// Define the interface for our context state
interface TokenContextState {
  isConnected: boolean;
  walletAddress: string | null;
  balance: string | null;
  isRegistered: boolean;
  studentSummary: StudentSummary | null;
  isLoading: boolean;
  error: string | null;
  connectWallet: () => Promise<void>;
  refreshBalance: () => Promise<void>;
  redeemOffer: (offerId: number) => Promise<void>;
  stakePoints: (amount: string, durationMonths: number) => Promise<void>;
  unstakePoints: () => Promise<void>;
}

interface StudentSummary {
  isRegistered: boolean;
  totalPointsEarned: string;
  totalPointsSpent: string;
  currentBalance: string;
  stakedPoints: string;
  achievementCount: number;
}

// Create the context with a default value
const TokenContext = createContext<TokenContextState | undefined>(undefined);

// Define props for the provider component
interface TokenProviderProps {
  children: ReactNode;
}

// Define the provider component
export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [studentSummary, setStudentSummary] = useState<StudentSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Connect wallet function
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Check if wallet is installed
      if (!isWalletInstalled()) {
        const errorMsg = "MetaMask or compatible wallet not found. Please install a Web3 wallet to continue.";
        setError(errorMsg);
        toast({
          title: "Wallet Not Found",
          description: errorMsg,
          variant: "destructive",
        });
        return;
      }
      
      const { signer } = await getProviderAndSigner();
      const address = await signer.getAddress();
      
      // Check if on correct network
      const isCorrectNetwork = await checkNetwork();
      if (!isCorrectNetwork) {
        toast({
          title: "Network Warning",
          description: "You're not connected to Arbitrum L3. Some features may not work correctly.",
          // Fix for the variant type error - using only valid variants
          variant: "destructive", 
        });
      }

      setWalletAddress(address);
      setIsConnected(true);
      
      // Get initial balance
      await refreshBalance();
      
      toast({
        title: "Wallet Connected",
        description: `Connected to address ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
      });
    } catch (err: any) {
      console.error("Error connecting wallet:", err);
      setError(err.message || "Failed to connect wallet");
      toast({
        title: "Connection Failed",
        description: err.message || "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh balance function
  const refreshBalance = async () => {
    if (!walletAddress) return;
    
    try {
      setIsLoading(true);
      
      // Get token balance
      const tokenBalance = await getEduPointsBalance(walletAddress);
      setBalance(tokenBalance);
      
      // Get student summary
      try {
        const summary = await getStudentSummary(walletAddress);
        setStudentSummary(summary);
        setIsRegistered(summary.isRegistered);
      } catch (err) {
        // If there's an error getting the summary, student might not be registered
        setIsRegistered(false);
      }
    } catch (err: any) {
      console.error("Error refreshing balance:", err);
      setError(err.message || "Failed to refresh balance");
    } finally {
      setIsLoading(false);
    }
  };

  // Redeem offer function
  const handleRedeemOffer = async (offerId: number) => {
    if (!walletAddress || !isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await redeemOffer(offerId);
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
    } finally {
      setIsLoading(false);
    }
  };

  // Stake points function
  const handleStakePoints = async (amount: string, durationMonths: number) => {
    if (!walletAddress || !isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      await stakeEduPoints(amount, durationMonths);
      await refreshBalance();
      toast({
        title: "Points Staked",
        description: `Successfully staked ${amount} EduPoints for ${durationMonths} months`,
      });
    } catch (err: any) {
      console.error("Error staking points:", err);
      toast({
        title: "Transaction Failed",
        description: err.message || "Failed to stake points",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Unstake points function
  const handleUnstakePoints = async () => {
    if (!walletAddress || !isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet first",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  // The context value that will be supplied to any descendants of this provider
  const contextValue: TokenContextState = {
    isConnected,
    walletAddress,
    balance,
    isRegistered,
    studentSummary,
    isLoading,
    error,
    connectWallet,
    refreshBalance,
    redeemOffer: handleRedeemOffer,
    stakePoints: handleStakePoints,
    unstakePoints: handleUnstakePoints,
  };

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
};

// Custom hook for using the token context
export const useToken = () => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
