
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Vote, Users, FileText, BarChart3, Settings, Award, LightbulbIcon, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const votingDistributionData = [
  { name: 'Approve', value: 65, color: '#4cc9f0' },
  { name: 'Reject', value: 25, color: '#f72585' },
  { name: 'Abstain', value: 10, color: '#adb5bd' },
];

const proposalStatusData = [
  { name: 'Proposal 1', For: 76, Against: 24 },
  { name: 'Proposal 2', For: 45, Against: 55 },
  { name: 'Proposal 3', For: 82, Against: 18 },
  { name: 'Proposal 4', For: 37, Against: 63 },
];

const DAOGovernance = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-eduverse-primary to-eduverse-secondary py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">DAO Governance</h1>
                <p className="text-xl mb-8 text-blue-100">
                  Shape the future of education by participating in our decentralized autonomous organization, where students and faculty decide together.
                </p>
                <Button className="bg-white text-eduverse-primary hover:bg-blue-50">
                  Join DAO Governance
                </Button>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 rounded-lg blur-xl"></div>
                  <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg animate-float">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/20 rounded-lg p-4">
                        <Vote className="h-8 w-8 mb-2 text-blue-100" />
                        <h3 className="font-semibold">Active Proposals</h3>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4">
                        <Users className="h-8 w-8 mb-2 text-blue-100" />
                        <h3 className="font-semibold">DAO Members</h3>
                        <p className="text-2xl font-bold">2,456</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4">
                        <FileText className="h-8 w-8 mb-2 text-blue-100" />
                        <h3 className="font-semibold">Proposals Passed</h3>
                        <p className="text-2xl font-bold">87</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4">
                        <Settings className="h-8 w-8 mb-2 text-blue-100" />
                        <h3 className="font-semibold">Treasury Size</h3>
                        <p className="text-2xl font-bold">150K</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Governance Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="card-hover">
                <CardHeader>
                  <LightbulbIcon className="h-10 w-10 text-eduverse-primary mb-2" />
                  <CardTitle>Proposal System</CardTitle>
                  <CardDescription>Submit ideas for improvement</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Any member can submit proposals for changes to the platform, new initiatives, or resource allocations. Proposals must meet minimum requirements to proceed to voting.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Create a Proposal</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <Vote className="h-10 w-10 text-eduverse-secondary mb-2" />
                  <CardTitle>Voting Mechanism</CardTitle>
                  <CardDescription>Reputation-weighted voting</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Voting power is determined by a combination of EduPoints balance and academic reputation. Quadratic voting ensures equitable representation of interests.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Active Votes</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <Users className="h-10 w-10 text-eduverse-accent mb-2" />
                  <CardTitle>Sub-DAOs</CardTitle>
                  <CardDescription>Specialized governance units</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Departmental sub-DAOs focus on specific academic areas, allowing targeted governance for departments, clubs, and initiatives with delegated budgetary authority.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Explore Sub-DAOs</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <BarChart3 className="h-10 w-10 text-eduverse-info mb-2" />
                  <CardTitle>Treasury Management</CardTitle>
                  <CardDescription>Resource allocation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Transparent management of DAO funds, with community voting on allocations for initiatives, events, scholarships, and other campus improvements.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Review Treasury</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <FileText className="h-10 w-10 text-green-600 mb-2" />
                  <CardTitle>Governance Records</CardTitle>
                  <CardDescription>Transparent decision history</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">All proposals, votes, and decisions are recorded on the blockchain, providing complete transparency and accountability for governance actions.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Records</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <Award className="h-10 w-10 text-orange-600 mb-2" />
                  <CardTitle>Governance Rewards</CardTitle>
                  <CardDescription>Incentives for participation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Active participants in governance earn special rewards, including EduPoints, badges, and increased voting power for consistent, quality contributions.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Claim Rewards</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {/* Voting Dashboard */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Active DAO Proposals</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Current governance proposals that are open for voting or under consideration.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Current Vote Distribution</CardTitle>
                    <CardDescription>Latest proposal vote breakdown</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center">
                    <div style={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={votingDistributionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            fill="#8884d8"
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {votingDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Recent Proposal Status</CardTitle>
                    <CardDescription>Results from recent governance votes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div style={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer>
                        <BarChart data={proposalStatusData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="For" fill="#4cc9f0" />
                          <Bar dataKey="Against" fill="#f72585" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Active Proposals */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Proposals</h2>
            
            {/* High Impact Proposal */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md mb-8">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-eduverse-primary/10 p-3 rounded-full">
                      <LightbulbIcon className="h-6 w-6 text-eduverse-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Extended Library Hours</h3>
                      <p className="text-gray-500 text-sm">High Impact Proposal • Ends in 3 days</p>
                    </div>
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Active Voting
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">
                  This proposal suggests extending library operating hours until 2:00 AM during weekdays to accommodate late-night study sessions. The proposal includes budget allocation for additional staff and security.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Proposer</p>
                    <p className="font-semibold">Student Council</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Budget Impact</p>
                    <p className="font-semibold">32,000 EduPoints</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Implementation Time</p>
                    <p className="font-semibold">Next Semester</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">Current Votes</p>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-eduverse-primary h-4 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <p>65% Approve</p>
                    <p>25% Reject</p>
                    <p>10% Abstain</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button className="w-full bg-eduverse-primary text-white">Vote Now</Button>
                  <Button variant="outline" className="w-full">View Details</Button>
                </div>
              </div>
            </div>
            
            {/* Proposal Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Proposal 1 */}
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      </div>
                      <CardTitle>Sustainable Campus Initiative</CardTitle>
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Passed
                    </div>
                  </div>
                  <CardDescription>Implementation in progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    A comprehensive plan to reduce campus carbon footprint by 30% through solar panel installation, composting systems, and reduced single-use plastics.
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <div>
                      <p className="font-semibold">Budget:</p>
                      <p>120,000 EduPoints</p>
                    </div>
                    <div>
                      <p className="font-semibold">Final Vote:</p>
                      <p>76% Approved</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full">View Implementation Status</Button>
                </CardFooter>
              </Card>
              
              {/* Proposal 2 */}
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-100 p-2 rounded-full">
                        <XCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <CardTitle>24/7 Computer Lab Access</CardTitle>
                    </div>
                    <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Rejected
                    </div>
                  </div>
                  <CardDescription>Security concerns cited</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    This proposal suggested round-the-clock access to computer labs for all students but was rejected due to security concerns and staffing limitations.
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <div>
                      <p className="font-semibold">Budget:</p>
                      <p>45,000 EduPoints</p>
                    </div>
                    <div>
                      <p className="font-semibold">Final Vote:</p>
                      <p>62% Rejected</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full">View Discussion</Button>
                </CardFooter>
              </Card>
              
              {/* Proposal 3 */}
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Vote className="h-5 w-5 text-blue-600" />
                      </div>
                      <CardTitle>Peer Tutoring Program</CardTitle>
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Active Voting
                    </div>
                  </div>
                  <CardDescription>Ends in 5 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Establish an incentivized peer tutoring program where advanced students can earn additional EduPoints by helping peers master difficult concepts.
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <div>
                      <p className="font-semibold">Budget:</p>
                      <p>35,000 EduPoints</p>
                    </div>
                    <div>
                      <p className="font-semibold">Current:</p>
                      <p>71% Approve</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full">Cast Your Vote</Button>
                </CardFooter>
              </Card>
              
              {/* Proposal 4 */}
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 p-2 rounded-full">
                        <LightbulbIcon className="h-5 w-5 text-purple-600" />
                      </div>
                      <CardTitle>Interdisciplinary Research Fund</CardTitle>
                    </div>
                    <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Draft
                    </div>
                  </div>
                  <CardDescription>Open for comments</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Create a special grant fund to support student-led interdisciplinary research projects that bridge multiple departments and faculties.
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <div>
                      <p className="font-semibold">Proposed Budget:</p>
                      <p>80,000 EduPoints</p>
                    </div>
                    <div>
                      <p className="font-semibold">Comments:</p>
                      <p>24</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" className="w-full">Provide Feedback</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-8 text-center">
              <Button className="edu-button-primary">
                View All Proposals <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* How DAO Works */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How the EduVerse DAO Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our DAO provides a transparent, equitable governance system for the entire educational community.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connection lines */}
              <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-eduverse-primary to-eduverse-secondary"></div>
              
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-4 rounded-full bg-eduverse-primary text-white w-8 h-8 flex items-center justify-center font-bold shadow-lg z-10">1</div>
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="text-center">Proposal Creation</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="bg-blue-50 rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center mb-4">
                      <LightbulbIcon className="h-10 w-10 text-eduverse-primary" />
                    </div>
                    <p className="text-gray-600">Any DAO member can create a proposal for improving the campus or academic experience. Proposals require detailed plans and budget estimates.</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-4 rounded-full bg-eduverse-secondary text-white w-8 h-8 flex items-center justify-center font-bold shadow-lg z-10">2</div>
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="text-center">Voting Process</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="bg-purple-50 rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center mb-4">
                      <Vote className="h-10 w-10 text-eduverse-secondary" />
                    </div>
                    <p className="text-gray-600">Members vote on proposals using their weighted voting power. Quadratic voting ensures that wealth doesn't dominate the decision-making process.</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-4 rounded-full bg-eduverse-accent text-white w-8 h-8 flex items-center justify-center font-bold shadow-lg z-10">3</div>
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="text-center">Implementation</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="bg-pink-50 rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center mb-4">
                      <Settings className="h-10 w-10 text-eduverse-accent" />
                    </div>
                    <p className="text-gray-600">Approved proposals automatically receive funding from the DAO treasury. Implementation teams are formed to execute the plans.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 bg-gradient-to-r from-eduverse-primary to-eduverse-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Have Your Say in Campus Governance</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
              Join the EduVerse DAO today to vote on proposals, suggest improvements, and help shape the future of campus life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white text-eduverse-primary hover:bg-blue-50">
                Join the DAO
              </Button>
              <Button variant="outline" className="border-white/20 bg-white/10 hover:bg-white/20">
                View Current Proposals
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DAOGovernance;
