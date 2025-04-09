import React, { useState } from 'react';
import { useToken } from '../context/TokenContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  campusOffers, 
  stakingOptions, 
  studentAchievements, 
  transactionHistory, 
  walletStates 
} from '../utils/testData';

/**
 * Testing Panel Component
 * This component provides a UI for testing various token and wallet functions
 * It is intended for development and testing purposes only
 */
const TestingPanel: React.FC = () => {
  const { 
    isConnected, 
    walletAddress, 
    balance, 
    isRegistered, 
    studentSummary,
    connectWallet, 
    refreshBalance, 
    redeemOffer, 
    stakePoints, 
    unstakePoints 
  } = useToken();
  
  const [testingExpanded, setTestingExpanded] = useState(false);
  const [stakingAmount, setStakingAmount] = useState('50');
  const [stakingDuration, setStakingDuration] = useState(1);

  // For demonstration purposes
  const toggleTestingPanel = () => {
    setTestingExpanded(!testingExpanded);
    refreshBalance();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        variant="outline" 
        className="mb-2" 
        onClick={toggleTestingPanel}
      >
        {testingExpanded ? 'Hide Testing Panel' : 'Show Testing Panel'}
      </Button>
      
      {testingExpanded && (
        <Card className="p-4 w-80 bg-white shadow-lg">
          <h3 className="font-bold text-lg mb-4">Testing Panel</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">Wallet Status</h4>
              <div className="text-sm">
                <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
                <p>Address: {walletAddress || 'Not connected'}</p>
                <p>Balance: {balance || '0'} EduPoints</p>
                <p>Registered: {isRegistered ? 'Yes' : 'No'}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button 
                size="sm" 
                variant="default" 
                onClick={connectWallet}
              >
                Test Connect Wallet
              </Button>
              
              <Button 
                size="sm" 
                variant="outline" 
                onClick={refreshBalance}
              >
                Refresh Balance
              </Button>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold mb-1">Test Redeem Offer</h4>
              <Select onValueChange={(value) => redeemOffer(Number(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an offer" />
                </SelectTrigger>
                <SelectContent>
                  {campusOffers.map(offer => (
                    <SelectItem key={offer.id} value={offer.id.toString()}>
                      {offer.name} ({offer.pointsCost} points)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold mb-1">Test Staking</h4>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  value={stakingAmount} 
                  onChange={(e) => setStakingAmount(e.target.value)}
                  className="w-20 border rounded px-2 py-1"
                />
                <Select 
                  value={stakingDuration.toString()}
                  onValueChange={(value) => setStakingDuration(Number(value))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 month (5%)</SelectItem>
                    <SelectItem value="3">3 months (10%)</SelectItem>
                    <SelectItem value="9">9 months (15%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="default" 
                  className="flex-1"
                  onClick={() => stakePoints(stakingAmount, stakingDuration)}
                >
                  Stake
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  className="flex-1"
                  onClick={unstakePoints}
                >
                  Unstake
                </Button>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 mt-2">
              This panel is for testing purposes only. It allows simulating wallet interactions
              without a real blockchain connection.
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TestingPanel;
