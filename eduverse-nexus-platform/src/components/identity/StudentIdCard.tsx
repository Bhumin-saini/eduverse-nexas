import React, { useState } from 'react';
import { useToken } from '../../context/TokenContext';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, Shield, QrCode, Calendar, MapPin, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const StudentIdCard = () => {
  const { studentSummary, connectWallet, isConnected } = useToken();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);

  // Format wallet address for display
  const formattedAddress = studentSummary?.walletAddress 
    ? `${studentSummary.walletAddress.substring(0, 6)}...${studentSummary.walletAddress.substring(studentSummary.walletAddress.length - 4)}`
    : 'Not Connected';

  const handleQRClick = async () => {
    if (!isConnected) {
      try {
        await connectWallet();
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been connected successfully.",
        });
      } catch (error) {
        toast({
          title: "Connection Failed",
          description: "Failed to connect wallet. Please try again.",
          variant: "destructive",
        });
      }
      return;
    }

    if (!studentSummary?.isRegistered) {
      navigate('/register');
      return;
    }

    setIsGeneratingQR(true);
    try {
      // Here you would typically generate a QR code with the student's verification data
      // For now, we'll just navigate to the verification page
      navigate('/verify');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingQR(false);
    }
  };

  const handleVerifyClick = () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    navigate('/verify');
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-eduverse-primary/10 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-eduverse-secondary/10 rounded-full translate-y-16 -translate-x-16"></div>
      
      <div className="relative flex justify-between items-start mb-8">
        <div>
          <div className="text-sm text-gray-500 mb-1">Digital Student ID</div>
          <div className="text-2xl font-bold">
            {studentSummary?.isRegistered ? 'Student Account' : (isConnected ? 'Guest Account' : 'Not Connected')}
          </div>
          <div className="text-eduverse-secondary font-medium">
            {studentSummary?.isRegistered 
              ? 'Verified Student' 
              : (isConnected ? 'Please Register' : 'Connect Wallet to Register')}
          </div>
        </div>
        <div 
          className="bg-gradient-to-r from-eduverse-primary to-eduverse-secondary p-3 rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
          onClick={handleVerifyClick}
        >
          <Fingerprint className="h-6 w-6 text-white" />
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6 relative z-10 flex justify-between">
        <div>
          <div className="text-sm text-gray-500">Wallet Address</div>
          <div className="font-medium">{formattedAddress}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Verification</div>
          <div className="font-medium text-green-600 flex items-center">
            <Shield className="h-4 w-4 mr-1" />
            {studentSummary?.isRegistered ? 'Verified' : 'Not Verified'}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-eduverse-primary mr-2" />
          <div>
            <div className="text-xs text-gray-500">Points Earned</div>
            <div className="text-sm">{studentSummary?.totalPointsEarned || '0'} EP</div>
          </div>
        </div>
        <div className="flex items-center">
          <Building className="h-5 w-5 text-eduverse-primary mr-2" />
          <div>
            <div className="text-xs text-gray-500">Points Spent</div>
            <div className="text-sm">{studentSummary?.totalPointsSpent || '0'} EP</div>
          </div>
        </div>
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-eduverse-primary mr-2" />
          <div>
            <div className="text-xs text-gray-500">Staked Points</div>
            <div className="text-sm">{studentSummary?.stakedPoints || '0'} EP</div>
          </div>
        </div>
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-eduverse-primary mr-2" />
          <div>
            <div className="text-xs text-gray-500">Achievements</div>
            <div className="text-sm">{studentSummary?.achievementCount || '0'}</div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mb-4">
        <div 
          className="bg-white p-2 border border-gray-200 rounded-lg cursor-pointer hover:border-eduverse-primary transition-colors"
          onClick={handleQRClick}
        >
          <QrCode className="h-32 w-32 text-eduverse-primary" />
        </div>
      </div>
      
      <div className="text-center">
        {!isConnected ? (
          <Button 
            className="w-full bg-eduverse-primary hover:bg-eduverse-primary/90"
            onClick={connectWallet}
          >
            Connect Wallet
          </Button>
        ) : !studentSummary?.isRegistered ? (
          <Button 
            className="w-full bg-eduverse-primary hover:bg-eduverse-primary/90"
            onClick={() => navigate('/register')}
          >
            Register as Student
          </Button>
        ) : (
          <div className="text-sm text-gray-500">
            Scan for identity verification or campus access
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentIdCard;
