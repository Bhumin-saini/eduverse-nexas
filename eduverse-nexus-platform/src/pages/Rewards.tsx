import React, { useState } from 'react';
import { useToken } from '../context/TokenContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Award, 
  Coins, 
  Clock, 
  ArrowUpRight,
  ArrowDownRight,
  Wallet
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Rewards = () => {
  const { 
    balance, 
    studentSummary, 
    stakePoints, 
    unstakePoints,
    redeemOffer 
  } = useToken();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [stakingAmount, setStakingAmount] = useState('50');
  const [stakingDuration, setStakingDuration] = useState(1);

  // Mock offers data
  const offers = [
    {
      id: 1,
      name: 'Premium Course Access',
      pointsCost: 1000,
      description: 'Access to premium course materials for one month'
    },
    {
      id: 2,
      name: 'Mentorship Session',
      pointsCost: 500,
      description: 'One-on-one session with industry expert'
    },
    {
      id: 3,
      name: 'Research Grant',
      pointsCost: 2000,
      description: 'Funding for academic research project'
    }
  ];

  const handleStake = async () => {
    try {
      await stakePoints(stakingAmount, stakingDuration);
      toast({
        title: "Points Staked",
        description: `Successfully staked ${stakingAmount} EP for ${stakingDuration} months`,
      });
    } catch (error) {
      toast({
        title: "Staking Failed",
        description: "Failed to stake points. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUnstake = async () => {
    try {
      await unstakePoints();
      toast({
        title: "Points Unstaked",
        description: "Successfully unstaked your points",
      });
    } catch (error) {
      toast({
        title: "Unstaking Failed",
        description: "Failed to unstake points. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRedeem = async (offerId: number) => {
    try {
      await redeemOffer(offerId);
      toast({
        title: "Offer Redeemed",
        description: "Successfully redeemed the offer",
      });
    } catch (error) {
      toast({
        title: "Redemption Failed",
        description: "Failed to redeem offer. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Rewards & Staking</h1>
          <p className="mt-2 text-gray-600">
            Manage your EduPoints, stake for rewards, and redeem offers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Available Balance</h3>
                <p className="text-3xl font-bold mt-2">{balance || '0'} EP</p>
              </div>
              <Wallet className="h-8 w-8 text-eduverse-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Staked Points</h3>
                <p className="text-3xl font-bold mt-2">
                  {studentSummary?.stakedPoints || '0'} EP
                </p>
              </div>
              <Coins className="h-8 w-8 text-eduverse-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Total Earned</h3>
                <p className="text-3xl font-bold mt-2">
                  {studentSummary?.totalPointsEarned || '0'} EP
                </p>
              </div>
              <Award className="h-8 w-8 text-eduverse-primary" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Staking Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Stake Your Points</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount to Stake
                </label>
                <input
                  type="number"
                  value={stakingAmount}
                  onChange={(e) => setStakingAmount(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                  min="1"
                  max={balance}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (Months)
                </label>
                <select
                  value={stakingDuration}
                  onChange={(e) => setStakingDuration(Number(e.target.value))}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="1">1 month (5% APY)</option>
                  <option value="3">3 months (10% APY)</option>
                  <option value="6">6 months (15% APY)</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={handleStake}
                >
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Stake Points
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleUnstake}
                >
                  <ArrowDownRight className="h-4 w-4 mr-2" />
                  Unstake
                </Button>
              </div>
            </div>
          </Card>

          {/* Offers Section */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Available Offers</h2>
            <div className="space-y-4">
              {offers.map((offer) => (
                <div key={offer.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{offer.name}</h3>
                      <p className="text-sm text-gray-600">{offer.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-eduverse-primary">
                        {offer.pointsCost} EP
                      </p>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-3"
                    onClick={() => handleRedeem(offer.id)}
                  >
                    Redeem Offer
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Rewards; 