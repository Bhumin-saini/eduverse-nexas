import { useToken } from '../context/TokenContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  Trophy, 
  Wallet, 
  Users, 
  BookOpen, 
  Clock 
} from 'lucide-react';

const DashboardPreview = () => {
  const { balance, studentSummary } = useToken();
  const navigate = useNavigate();

  const handleAccessDashboard = () => {
    if (!studentSummary?.isRegistered) {
      // If not registered, navigate to registration page
      navigate('/register');
    } else {
      // If registered, navigate to full dashboard
      navigate('/dashboard');
    }
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Academic Dashboard</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track your academic progress, manage your EduPoints, and connect with your peers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Points Balance Card */}
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/wallet')}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">EduPoints Balance</h3>
              <Wallet className="h-6 w-6 text-eduverse-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">
              {balance || '0'} EP
            </div>
            <div className="text-sm text-gray-500">
              Available for staking and rewards
            </div>
          </Card>

          {/* Academic Progress Card */}
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/achievements')}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Academic Progress</h3>
              <GraduationCap className="h-6 w-6 text-eduverse-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">
              {studentSummary?.achievementCount || '0'} Achievements
            </div>
            <div className="text-sm text-gray-500">
              Track your academic milestones
            </div>
          </Card>

          {/* Community Card */}
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/community')}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Community</h3>
              <Users className="h-6 w-6 text-eduverse-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">
              150+ Peers
            </div>
            <div className="text-sm text-gray-500">
              Connect with fellow students
            </div>
          </Card>

          {/* Learning Resources Card */}
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/courses')}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Learning Resources</h3>
              <BookOpen className="h-6 w-6 text-eduverse-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">
              25+ Courses
            </div>
            <div className="text-sm text-gray-500">
              Access educational materials
            </div>
          </Card>

          {/* Time Management Card */}
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/study-tracker')}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Time Management</h3>
              <Clock className="h-6 w-6 text-eduverse-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">
              48h Study Time
            </div>
            <div className="text-sm text-gray-500">
              Track your learning hours
            </div>
          </Card>

          {/* Achievements Card */}
          <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/achievements')}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Achievements</h3>
              <Trophy className="h-6 w-6 text-eduverse-primary" />
            </div>
            <div className="text-3xl font-bold mb-2">
              3 New Badges
            </div>
            <div className="text-sm text-gray-500">
              Earn rewards for your progress
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button 
            size="lg" 
            className="bg-eduverse-primary hover:bg-eduverse-primary/90"
            onClick={handleAccessDashboard}
          >
            {studentSummary?.isRegistered ? 'Access Full Dashboard' : 'Register Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview; 