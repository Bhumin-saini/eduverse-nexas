
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, LoaderCircle, ExternalLink, Info } from 'lucide-react';
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

const WalletConnect = () => {
  const { isConnected, walletAddress, isLoading, connectWallet, error } = useToken();

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const handleConnectClick = () => {
    // Add a console log to help debug
    console.log("Connect button clicked, attempting to connect wallet...");
    connectWallet();
  };

  const handleInstallMetaMask = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

  // Determine if wallet is available
  const isWalletAvailable = typeof window !== 'undefined' && 
    Boolean((window as WindowWithEthereum).ethereum);

  // Log connection status for debugging
  useEffect(() => {
    console.log("WalletConnect component state:", {
      isConnected,
      walletAddress,
      isLoading,
      error,
      isWalletAvailable
    });
  }, [isConnected, walletAddress, isLoading, error, isWalletAvailable]);

  return (
    <div>
      {!isConnected ? (
        <>
          <Button 
            className="bg-white text-eduverse-primary hover:bg-blue-50 flex items-center gap-2"
            onClick={handleConnectClick}
            disabled={isLoading || !isWalletAvailable}
          >
            {isLoading ? (
              <LoaderCircle className="h-5 w-5 animate-spin" />
            ) : (
              <Wallet className="h-5 w-5" />
            )}
            {isLoading ? 'Connecting...' : 'Connect Wallet to Access Tokens'}
          </Button>
          
          {!isWalletAvailable && (
            <Button 
              variant="link"
              className="mt-2 flex items-center"
              onClick={handleInstallMetaMask}
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              Install MetaMask
            </Button>
          )}
          
          {error && (
            <p className="text-sm text-red-500 mt-2">{error}</p>
          )}
        </>
      ) : (
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            className="border-2 border-white/30 text-white hover:bg-white/10 flex items-center gap-2"
            disabled={isLoading}
          >
            <Wallet className="h-5 w-5" />
            {walletAddress ? truncateAddress(walletAddress) : 'Connected'}
          </Button>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="p-0 h-8 w-8">
                  <Info className="h-4 w-4 text-white/70" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs" side="bottom">
                <p className="text-xs">Wallet connected to address {walletAddress}</p>
                <p className="text-xs text-muted-foreground">Click to view debugging info in console</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
