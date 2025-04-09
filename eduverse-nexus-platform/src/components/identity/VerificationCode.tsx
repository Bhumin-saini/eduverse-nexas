
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, LoaderCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToken } from '../../context/TokenContext';

const VerificationCode = () => {
  const { isConnected, walletAddress, balance, studentSummary, isLoading } = useToken();
  const [lastAccess, setLastAccess] = useState<string>('');
  
  useEffect(() => {
    // Set a "last access" timestamp when component mounts
    setLastAccess(new Date().toISOString());
  }, []);

  if (!isConnected) {
    return (
      <Card className="bg-gray-100 p-4 rounded-lg mt-6">
        <h5 className="font-medium mb-2">On-Chain Verification</h5>
        <div className="bg-gray-800 text-yellow-400 p-3 rounded text-xs font-mono overflow-x-auto">
          <p>// Wallet not connected</p>
          <p>Verification: PENDING</p>
          <p>Status: Please connect your wallet to view on-chain verification</p>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="bg-gray-100 p-4 rounded-lg mt-6">
        <h5 className="font-medium mb-2">On-Chain Verification</h5>
        <div className="flex justify-center p-6">
          <LoaderCircle className="h-8 w-8 animate-spin text-eduverse-primary" />
        </div>
      </Card>
    );
  }

  const isVerified = Boolean(studentSummary?.isRegistered);
  const contractAddress = '0x8A21F743u29e39D84b3F2a132'; // Example address - should match the one in contractUtils

  return (
    <Card className="bg-gray-100 p-4 rounded-lg mt-6">
      <h5 className="font-medium mb-2 flex items-center">
        On-Chain Verification
        {isVerified ? 
          <CheckCircle className="h-4 w-4 ml-2 text-green-500" /> : 
          <XCircle className="h-4 w-4 ml-2 text-red-500" />
        }
      </h5>
      <div className="bg-gray-800 text-green-400 p-3 rounded text-xs font-mono overflow-x-auto">
        <p>// Verification data stored on EDUChain Layer 3</p>
        <p>Wallet: {walletAddress ? walletAddress : 'Not connected'}</p>
        <p>Verification: {isVerified ? 'VALID' : 'INVALID'}</p>
        <p>Last Access: {lastAccess}</p>
        <p>Location: {isVerified ? 'Engineering Building' : 'Unknown'}</p>
        <p>TokenBalance: {balance || '0'} EDU</p>
        <p>Contract: {contractAddress}</p>
      </div>
    </Card>
  );
};

export default VerificationCode;
