import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Award, 
  BookOpen, 
  GraduationCap, 
  Backpack, 
  UserCheck, 
  Star, 
  Gift, 
  Coffee, 
  Ticket, 
  BarChart4, 
  Layers, 
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToken } from '@/context/TokenContext';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

const Rewards = () => {
  const { isConnected, connectWallet, studentSummary } = useToken();
  const navigate = useNavigate();
  
  const handleConnect = async () => {
    try {
      await connectWallet();
      // Redirect to dashboard after connecting
      navigate('/dashboard');
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-eduverse-primary to-eduverse-secondary py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">EduPoints Rewards</h1>
                <p className="text-xl mb-8 text-blue-100">
                  Earn tokens for your academic achievements and participation, then spend them on campus services, resources, and special opportunities.
                </p>
                {!isConnected ? (
                  <Button 
                    className="bg-white text-eduverse-primary hover:bg-blue-50"
                    onClick={handleConnect}
                  >
                    Connect Wallet to View Your Balance
                  </Button>
                ) : (
                  <Button 
                    className="bg-white text-eduverse-primary hover:bg-blue-50"
                    onClick={() => navigate('/dashboard')}
                  >
                    View Your EduPoints Dashboard
                  </Button>
                )}
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 rounded-lg blur-xl"></div>
                  <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg animate-float">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-xl">EduPoints Balance</h3>
                        <span className="text-2xl font-bold">{isConnected ? studentSummary?.currentBalance || "0" : "2,450"}</span>
                      </div>
                      
                      <div className="bg-white/20 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Award className="h-6 w-6" />
                          <div>
                            <h3 className="font-semibold">Academics</h3>
                            <p className="text-sm text-blue-100">+125 points this semester</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white/20 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <UserCheck className="h-6 w-6" />
                          <div>
                            <h3 className="font-semibold">Attendance</h3>
                            <p className="text-sm text-blue-100">+75 points this semester</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white/20 p-4 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Star className="h-6 w-6" />
                          <div>
                            <h3 className="font-semibold">Rewards Available</h3>
                            <p className="text-sm text-blue-100">12 items you can redeem</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Earn Points */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">How to Earn EduPoints</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="card-hover">
                <CardHeader>
                  <Award className="h-10 w-10 text-eduverse-primary mb-2" />
                  <CardTitle>Academic Achievement</CardTitle>
                  <CardDescription>Excel in your coursework</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Earn points for completing courses with high grades. The better your performance, the more points you'll receive.</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>A Grade</span>
                      <span className="font-semibold">100 points</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>B Grade</span>
                      <span className="font-semibold">75 points</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>C Grade</span>
                      <span className="font-semibold">50 points</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Your Courses</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <UserCheck className="h-10 w-10 text-eduverse-secondary mb-2" />
                  <CardTitle>Attendance & Participation</CardTitle>
                  <CardDescription>Be present and engaged</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Regular attendance and active participation in classes, study groups, and campus events earn you points.</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Perfect Monthly Attendance</span>
                      <span className="font-semibold">50 points</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Class Participation</span>
                      <span className="font-semibold">5-10 points/class</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Event Attendance</span>
                      <span className="font-semibold">25 points</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Check Attendance Record</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-eduverse-accent mb-2" />
                  <CardTitle>Content Creation</CardTitle>
                  <CardDescription>Share knowledge with peers</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Create and share high-quality study materials, notes, and resources with the community to earn points.</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Study Guide</span>
                      <span className="font-semibold">50-100 points</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tutorial Video</span>
                      <span className="font-semibold">75-150 points</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Lecture Notes</span>
                      <span className="font-semibold">25-50 points</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Upload Study Materials</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <Backpack className="h-10 w-10 text-eduverse-info mb-2" />
                  <CardTitle>Extracurricular Activities</CardTitle>
                  <CardDescription>Participate beyond academics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Join clubs, sports teams, and campus organizations to earn points for your involvement and contributions.</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Club Membership</span>
                      <span className="font-semibold">25 points/semester</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Club Leadership</span>
                      <span className="font-semibold">100 points/semester</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Event Organization</span>
                      <span className="font-semibold">50-200 points</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Explore Activities</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <GraduationCap className="h-10 w-10 text-green-600 mb-2" />
                  <CardTitle>Peer Mentorship</CardTitle>
                  <CardDescription>Help fellow students succeed</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Become a mentor, tutor, or teaching assistant to earn points while helping others succeed academically.</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tutoring Session</span>
                      <span className="font-semibold">20 points/hour</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Teaching Assistant</span>
                      <span className="font-semibold">150 points/month</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Mentorship Program</span>
                      <span className="font-semibold">200 points/semester</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Become a Mentor</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <Layers className="h-10 w-10 text-orange-600 mb-2" />
                  <CardTitle>DAO Participation</CardTitle>
                  <CardDescription>Shape campus governance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Participate in campus governance through the DAO, vote on proposals, and contribute to university decisions.</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Voting Participation</span>
                      <span className="font-semibold">10 points/vote</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Proposal Submission</span>
                      <span className="font-semibold">50-100 points</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Committee Membership</span>
                      <span className="font-semibold">75 points/semester</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Participate in DAO</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {/* Spending Your Points */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How to Spend Your EduPoints</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your earned EduPoints can be redeemed for various rewards and benefits across campus.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-xl font-bold mb-4">Popular Rewards</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-eduverse-primary/10 rounded-full p-3">
                      <Coffee className="h-6 w-6 text-eduverse-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Campus Services</h4>
                      <p className="text-gray-600 mb-2">Free coffee, printing credits, and dining vouchers</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">50-200 points</span>
                        <Button variant="ghost" size="sm" className="text-eduverse-primary">Redeem</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-eduverse-secondary/10 rounded-full p-3">
                      <Ticket className="h-6 w-6 text-eduverse-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Event Access</h4>
                      <p className="text-gray-600 mb-2">Priority tickets to campus events, concerts, and sports games</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">150-500 points</span>
                        <Button variant="ghost" size="sm" className="text-eduverse-secondary">Redeem</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-eduverse-accent/10 rounded-full p-3">
                      <BarChart4 className="h-6 w-6 text-eduverse-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Academic Perks</h4>
                      <p className="text-gray-600 mb-2">Extended library hours, premium database access, and study room reservations</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">100-300 points</span>
                        <Button variant="ghost" size="sm" className="text-eduverse-accent">Redeem</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-eduverse-info/10 rounded-full p-3">
                      <Gift className="h-6 w-6 text-eduverse-info" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Merchandise</h4>
                      <p className="text-gray-600 mb-2">University branded clothing, accessories, and limited edition items</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">250-1000 points</span>
                        <Button variant="ghost" size="sm" className="text-eduverse-info">Redeem</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button className="edu-button-primary">View All Rewards</Button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
                <h3 className="text-xl font-bold mb-6 text-center">Premium Opportunities</h3>
                <div className="space-y-4">
                  <Card className="border border-eduverse-primary/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-eduverse-primary">Study Abroad Priority</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600">Priority selection for limited study abroad opportunities</p>
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs">2,500 points required</span>
                          <span className="text-xs font-semibold">60% progress</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button size="sm" variant="outline" className="w-full text-eduverse-primary">Learn More</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="border border-eduverse-secondary/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-eduverse-secondary">Research Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600">Special access to faculty research projects and lab positions</p>
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs">3,000 points required</span>
                          <span className="text-xs font-semibold">40% progress</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button size="sm" variant="outline" className="w-full text-eduverse-secondary">Learn More</Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="border border-eduverse-accent/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-eduverse-accent">Industry Connections</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600">Exclusive networking events with industry leaders and alumni</p>
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs">5,000 points required</span>
                          <span className="text-xs font-semibold">25% progress</span>
                        </div>
                        <Progress value={25} className="h-2" />
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button size="sm" variant="outline" className="w-full text-eduverse-accent">Learn More</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blockchain Integration */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Blockchain-Powered Transparency</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                EduPoints are backed by blockchain technology, ensuring transparency, security, and portability.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="col-span-1 lg:col-span-3 mb-8">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-eduverse-primary/10 to-eduverse-secondary/10 p-6 rounded-lg text-center">
                      <h3 className="font-bold text-lg mb-2">Immutable Record</h3>
                      <p className="text-gray-600 text-sm">All point transactions are permanently recorded on the blockchain, creating an unalterable history of your achievements.</p>
                    </div>
                    <div className="bg-gradient-to-br from-eduverse-secondary/10 to-eduverse-accent/10 p-6 rounded-lg text-center">
                      <h3 className="font-bold text-lg mb-2">Portable Credentials</h3>
                      <p className="text-gray-600 text-sm">Your points and achievements remain with you even after graduation, serving as verified credentials for employers.</p>
                    </div>
                    <div className="bg-gradient-to-br from-eduverse-accent/10 to-eduverse-primary/10 p-6 rounded-lg text-center">
                      <h3 className="font-bold text-lg mb-2">Tokenized Value</h3>
                      <p className="text-gray-600 text-sm">EduPoints represent real-world value, with transparent exchange rates and potential for cross-institution recognition.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Technical Implementation</CardTitle>
                  <CardDescription>How our EduPoints are secured</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <ArrowRight className="h-4 w-4 text-eduverse-primary mt-0.5 flex-shrink-0" />
                      <span>ERC-20 token standard implementation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ArrowRight className="h-4 w-4 text-eduverse-primary mt-0.5 flex-shrink-0" />
                      <span>Smart contracts for automatic issuance and redemption</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ArrowRight className="h-4 w-4 text-eduverse-primary mt-0.5 flex-shrink-0" />
                      <span>Layer 2 scaling solution for low-cost transactions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <ArrowRight className="h-4 w-4 text-eduverse-primary mt-0.5 flex-shrink-0" />
                      <span>Multi-signature governance for protocol changes</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-white col-span-1 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Institutional Benefits</CardTitle>
                  <CardDescription>How EduPoints help universities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-gray-100 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-eduverse-primary">Increased Engagement</h4>
                      <p className="text-sm text-gray-600">Incentivize student participation across all campus activities and academic initiatives.</p>
                    </div>
                    
                    <div className="border border-gray-100 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-eduverse-secondary">Data-Driven Insights</h4>
                      <p className="text-sm text-gray-600">Gain valuable analytics on student engagement patterns and resource utilization.</p>
                    </div>
                    
                    <div className="border border-gray-100 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-eduverse-accent">Resource Optimization</h4>
                      <p className="text-sm text-gray-600">Allocate resources more effectively based on student preferences and token usage.</p>
                    </div>
                    
                    <div className="border border-gray-100 rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-green-600">Innovation Leadership</h4>
                      <p className="text-sm text-gray-600">Position the institution at the forefront of educational technology innovation.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 bg-gradient-to-r from-eduverse-primary to-eduverse-secondary text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Connect your wallet now to begin tracking your academic achievements and earning EduPoints.
            </p>
            {!isConnected ? (
              <Button
                className="bg-white text-eduverse-primary hover:bg-blue-50 px-8 py-6 text-lg"
                onClick={handleConnect}
              >
                Connect Wallet
              </Button>
            ) : (
              <Button
                className="bg-white text-eduverse-primary hover:bg-blue-50 px-8 py-6 text-lg"
                onClick={() => navigate('/dashboard')}
              >
                View Your Dashboard
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rewards;
