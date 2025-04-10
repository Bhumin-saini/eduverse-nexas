import { useNavigate } from 'react-router-dom';
import { useToken } from '../context/TokenContext';
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Award, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Hero = () => {
  const navigate = useNavigate();
  const { connectWallet, isConnected, isRegistered } = useToken();
  const { toast } = useToast();

  const handleExplorePlatform = () => {
    navigate('/features/academics');
  };

  const handleLearnAboutChain = () => {
    navigate('/about#educhain');
  };

  const handlePreviewDashboard = () => {
    if (!isConnected) {
      connectWallet().then(() => {
        navigate('/dashboard');
      }).catch(() => {
        toast({
          title: "Connection Failed",
          description: "Please connect your wallet to preview the dashboard.",
          variant: "destructive",
        });
      });
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="hero-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Reimagine Education with Blockchain
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              EduVerse connects all aspects of college life into a unified platform, rewarding achievements and creating verifiable records through EDU Chain.
            </p>
            <div className="flex flex-wrap gap-4">
              {isConnected ? (
                <Button 
                  className="edu-button-secondary"
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  className="edu-button-secondary"
                  onClick={handleExplorePlatform}
                >
                  Explore Platform <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={handleLearnAboutChain}
              >
                Learn About EDU Chain
              </Button>
            </div>
            
            <div className="mt-8">
              {isConnected && !isRegistered && (
                <Button
                  variant="link"
                  className="text-blue-200 hover:text-blue-100 pl-0"
                  onClick={() => navigate('/register')}
                >
                  <span className="underline">Register as a student</span> to access all features →
                </Button>
              )}
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/features/academics')}>
                <BookOpen className="h-5 w-5 mr-2 text-blue-200" />
                <span className="text-blue-100">Academic Tracking</span>
              </div>
              <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/rewards')}>
                <Award className="h-5 w-5 mr-2 text-blue-200" />
                <span className="text-blue-100">Token Rewards</span>
              </div>
              <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate('/dao')}>
                <Users className="h-5 w-5 mr-2 text-blue-200" />
                <span className="text-blue-100">DAO Governance</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            {isConnected ? (
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-xl animate-float">
                <div className="absolute -top-4 -right-4 bg-eduverse-success text-white text-sm py-1 px-3 rounded-full">
                  Connected
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold">Student Dashboard</h3>
                  <p className="text-blue-100 text-sm">Your wallet is connected, access your dashboard and earn points</p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Course Completion</span>
                    <span className="text-eduverse-success">65%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2.5">
                    <div className="bg-eduverse-info h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">EduPoints Balance</span>
                    <span className="text-eduverse-success">2,450</span>
                  </div>
                  <div className="flex items-center justify-center p-2 bg-white/10 rounded-lg">
                    <div className="token-glow bg-gradient-to-r from-eduverse-primary to-eduverse-secondary p-3 rounded-full">
                      <span className="font-bold text-lg">EDU</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="w-full py-2.5 bg-eduverse-primary hover:bg-eduverse-primary/90 transition-colors duration-200 rounded-lg text-white font-medium"
                  onClick={() => navigate('/dashboard')}
                >
                  Access Dashboard
                </button>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow-xl animate-float">
                <div className="absolute -top-4 -right-4 bg-eduverse-primary text-white text-sm py-1 px-3 rounded-full">
                  Beta Access
                </div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold">Student Dashboard Preview</h3>
                  <p className="text-blue-100 text-sm">Connect your wallet to access your personalized dashboard</p>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Course Completion</span>
                    <span className="text-eduverse-success">65%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2.5">
                    <div className="bg-eduverse-info h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div className="bg-white/5 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">EduPoints Balance</span>
                    <span className="text-eduverse-success">2,450</span>
                  </div>
                  <div className="flex items-center justify-center p-2 bg-white/10 rounded-lg">
                    <div className="token-glow bg-gradient-to-r from-eduverse-primary to-eduverse-secondary p-3 rounded-full">
                      <span className="font-bold text-lg">EDU</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="w-full py-2.5 bg-white/10 hover:bg-white/20 transition-colors duration-200 rounded-lg text-white font-medium"
                  onClick={handlePreviewDashboard}
                >
                  Connect Wallet
                </button>
              </div>
            )}
            
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-eduverse-accent rounded-full opacity-30 blur-xl"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-eduverse-primary rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
