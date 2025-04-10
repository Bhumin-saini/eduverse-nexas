import React from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, LoaderCircle, ExternalLink, LogOut } from 'lucide-react';
import { useToken } from '../context/TokenContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define interface to extend Window with ethereum property
interface WindowWithEthereum extends Window {
  ethereum?: any;
}

type WalletConnectProps = {
  variant?: 'light' | 'dark';
};

const WalletConnect: React.FC<WalletConnectProps> = ({ variant = 'light' }) => {
  const { isConnected, isLoading, connectWallet, disconnectWallet, studentSummary } = useToken();

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const handleConnectClick = () => {
    console.log("Connect button clicked, attempting to connect wallet...");
    connectWallet();
  };

  const handleDisconnectClick = () => {
    console.log("Disconnect button clicked, disconnecting wallet...");
    disconnectWallet();
  };

  const handleInstallMetaMask = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

  // Determine if wallet is available
  const isWalletAvailable = typeof window !== 'undefined' && 
    Boolean((window as WindowWithEthereum).ethereum);

  const isDark = variant === 'dark';

  return (
    <div>
      {!isConnected ? (
        <>
          <Button 
            className={`${isDark 
              ? 'bg-eduverse-primary text-white hover:bg-eduverse-primary/90' 
              : 'bg-white text-eduverse-primary hover:bg-blue-50'
            } flex items-center gap-2 shadow-sm`}
            onClick={handleConnectClick}
            disabled={isLoading || !isWalletAvailable}
          >
            {isLoading ? (
              <LoaderCircle className={`h-5 w-5 animate-spin ${isDark ? 'text-white' : 'text-eduverse-primary'}`} />
            ) : (
              <Wallet className={`h-5 w-5 ${isDark ? 'text-white' : 'text-eduverse-primary'}`} />
            )}
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </Button>
          
          {!isWalletAvailable && (
            <Button 
              variant="link"
              className={`mt-2 flex items-center ${isDark ? 'text-blue-300 hover:text-blue-200' : 'text-blue-500 hover:text-blue-600'}`}
              onClick={handleInstallMetaMask}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Install MetaMask
            </Button>
          )}
        </>
      ) : (
        <div className="flex items-center gap-2">
          <Button 
            variant={isDark ? "default" : "outline"}
            className={`flex items-center gap-2 shadow-sm ${
              isDark 
                ? 'bg-eduverse-primary/90 text-white hover:bg-eduverse-primary border-0' 
                : 'border-2 border-white/30 text-white hover:bg-white/10'
            }`}
          >
            <Wallet className="h-5 w-5 text-green-400" />
            {studentSummary?.walletAddress ? truncateAddress(studentSummary.walletAddress) : 'Connected'}
          </Button>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`p-1 h-8 w-8 ${
                    isDark 
                      ? 'bg-red-500/20 hover:bg-red-500/30' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  onClick={handleDisconnectClick}
                >
                  <LogOut className={`h-4 w-4 ${isDark ? 'text-red-300' : 'text-red-400'}`} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-xs">Disconnect wallet</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;