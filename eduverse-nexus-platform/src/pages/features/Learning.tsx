
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, MessageSquare, FileText, BarChart, Calendar, Clock, UserCheck, Layers, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Learning = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-eduverse-primary to-eduverse-secondary py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Collaborative Learning</h1>
                <p className="text-xl mb-8 text-blue-100">
                  Exchange materials, form study groups, and participate in peer review systems to enhance your academic experience.
                </p>
                <Button className="bg-white text-eduverse-primary hover:bg-blue-50">
                  Explore Learning Features
                </Button>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 rounded-lg blur-xl"></div>
                  <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg animate-float">
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-3 bg-white/20 p-3 rounded-lg">
                        <Users className="h-6 w-6" />
                        <div>
                          <h3 className="font-semibold">Data Structures Study Group</h3>
                          <p className="text-sm text-blue-100">8 members • Meeting in 2 hours</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 bg-white/20 p-3 rounded-lg">
                        <FileText className="h-6 w-6" />
                        <div>
                          <h3 className="font-semibold">Shared Materials</h3>
                          <p className="text-sm text-blue-100">15 resources • 3 new this week</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 bg-white/20 p-3 rounded-lg">
                        <MessageSquare className="h-6 w-6" />
                        <div>
                          <h3 className="font-semibold">Peer Reviews</h3>
                          <p className="text-sm text-blue-100">2 pending • 5 completed</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 bg-eduverse-secondary/30 p-3 rounded-lg">
                        <BookOpen className="h-6 w-6" />
                        <div>
                          <h3 className="font-semibold">Current Goal</h3>
                          <p className="text-sm text-blue-100">Complete Algorithm Assignment</p>
                        </div>
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
            <h2 className="text-3xl font-bold text-center mb-12">Collaborative Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="card-hover">
                <CardHeader>
                  <FileText className="h-10 w-10 text-eduverse-primary mb-2" />
                  <CardTitle>Materials Marketplace</CardTitle>
                  <CardDescription>Share and access study materials</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Exchange notes, summaries, study guides, and other learning materials with peers. Quality materials earn EduPoints and recognition.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Browse Materials</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <Users className="h-10 w-10 text-eduverse-secondary mb-2" />
                  <CardTitle>Study Group Matching</CardTitle>
                  <CardDescription>Find your perfect study partners</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Our AI algorithm matches you with compatible study partners based on schedules, learning styles, and academic goals.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Find Study Groups</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <MessageSquare className="h-10 w-10 text-eduverse-accent mb-2" />
                  <CardTitle>Peer Review System</CardTitle>
                  <CardDescription>Get valuable feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Submit drafts for anonymous peer review before final submission. Give feedback to others and earn EduPoints while improving quality.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Access Peer Reviews</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <Calendar className="h-10 w-10 text-eduverse-info mb-2" />
                  <CardTitle>Smart Booking</CardTitle>
                  <CardDescription>Reserve study spaces efficiently</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Book study rooms, labs, and other learning spaces based on your group's availability and facility preferences.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Book a Space</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <BarChart className="h-10 w-10 text-green-600 mb-2" />
                  <CardTitle>Learning Analytics</CardTitle>
                  <CardDescription>Track your study patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Gain insights into your study habits, track progress, and receive personalized recommendations for improvement.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Analytics</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <Database className="h-10 w-10 text-orange-600 mb-2" />
                  <CardTitle>Knowledge Repository</CardTitle>
                  <CardDescription>Decentralized content storage</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Access a growing library of student-created learning resources, stored securely on IPFS with blockchain verification.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Explore Repository</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {/* Study Group Showcase */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Study Group Formation</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our AI algorithm creates optimized study groups based on multiple factors to maximize learning outcomes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-xl font-bold mb-4">How We Match Study Groups</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-eduverse-primary/10 rounded-full p-3">
                      <Clock className="h-6 w-6 text-eduverse-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Schedule Compatibility</h4>
                      <p className="text-gray-600">Our algorithm analyses everyone's availability to find the optimal meeting times without conflicts.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-eduverse-secondary/10 rounded-full p-3">
                      <Layers className="h-6 w-6 text-eduverse-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Learning Style</h4>
                      <p className="text-gray-600">We match visual, auditory, reading/writing, and kinesthetic learners to create balanced groups.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-eduverse-accent/10 rounded-full p-3">
                      <BookOpen className="h-6 w-6 text-eduverse-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Academic Goals</h4>
                      <p className="text-gray-600">Groups are formed based on similar academic objectives and target grades.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-eduverse-info/10 rounded-full p-3">
                      <UserCheck className="h-6 w-6 text-eduverse-info" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Skill Complementarity</h4>
                      <p className="text-gray-600">We balance strengths and weaknesses to ensure groups have diverse knowledge bases.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button className="edu-button-primary">Create or Join a Study Group</Button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
                <h3 className="text-xl font-bold mb-6 text-center">Example Study Group Card</h3>
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-bold text-lg text-eduverse-primary">AI & Machine Learning</h4>
                      <p className="text-sm text-gray-500">CS350 • Prof. Jenkins</p>
                    </div>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                      Active
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-700 mb-2">Meeting Schedule</h5>
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-eduverse-secondary" />
                      <span>Tuesdays & Thursdays</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-eduverse-secondary" />
                      <span>6:00 PM - 8:00 PM</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-700 mb-2">Members (6/8)</h5>
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">JD</div>
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">SM</div>
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">AK</div>
                      <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">PT</div>
                      <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">LR</div>
                      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">KW</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="font-semibold text-gray-700 mb-2">Current Focus</h5>
                    <div className="bg-blue-50 rounded-md p-2 text-sm">
                      <p>Neural Networks & Deep Learning Project</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" className="w-full">View Details</Button>
                    <Button size="sm" className="w-full bg-eduverse-primary text-white">Join Group</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Materials Marketplace */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Materials Marketplace</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Share your study materials and access quality resources from peers.
              </p>
            </div>
            
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {/* Study Material 1 */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>Linear Algebra Cheat Sheet</CardTitle>
                          <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            Mathematics
                          </div>
                        </div>
                        <CardDescription>Comprehensive review material</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-100 h-40 rounded-md flex items-center justify-center mb-4">
                          <FileText className="h-12 w-12 text-gray-400" />
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <UserCheck className="h-4 w-4 mr-1" />
                            <span>Sarah M.</span>
                          </div>
                          <div className="flex items-center">
                            <div className="text-yellow-500 flex">
                              ★★★★★
                            </div>
                            <span className="ml-1">(24)</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="outline" className="w-full">Download (15 EduPoints)</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
                
                {/* Study Material 2 */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>Database Systems Notes</CardTitle>
                          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Computer Science
                          </div>
                        </div>
                        <CardDescription>Complete semester notes</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-100 h-40 rounded-md flex items-center justify-center mb-4">
                          <FileText className="h-12 w-12 text-gray-400" />
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <UserCheck className="h-4 w-4 mr-1" />
                            <span>Alex K.</span>
                          </div>
                          <div className="flex items-center">
                            <div className="text-yellow-500 flex">
                              ★★★★☆
                            </div>
                            <span className="ml-1">(18)</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="outline" className="w-full">Download (20 EduPoints)</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
                
                {/* Study Material 3 */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>Organic Chemistry Guide</CardTitle>
                          <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                            Chemistry
                          </div>
                        </div>
                        <CardDescription>Reaction mechanisms explained</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-100 h-40 rounded-md flex items-center justify-center mb-4">
                          <FileText className="h-12 w-12 text-gray-400" />
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <UserCheck className="h-4 w-4 mr-1" />
                            <span>Jamie P.</span>
                          </div>
                          <div className="flex items-center">
                            <div className="text-yellow-500 flex">
                              ★★★★★
                            </div>
                            <span className="ml-1">(32)</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="outline" className="w-full">Download (25 EduPoints)</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
                
                {/* Study Material 4 */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="card-hover">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>Economics Case Studies</CardTitle>
                          <div className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                            Economics
                          </div>
                        </div>
                        <CardDescription>Market analysis examples</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-gray-100 h-40 rounded-md flex items-center justify-center mb-4">
                          <FileText className="h-12 w-12 text-gray-400" />
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <UserCheck className="h-4 w-4 mr-1" />
                            <span>Taylor R.</span>
                          </div>
                          <div className="flex items-center">
                            <div className="text-yellow-500 flex">
                              ★★★★☆
                            </div>
                            <span className="ml-1">(15)</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="outline" className="w-full">Download (18 EduPoints)</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            
            <div className="mt-12 text-center">
              <Button className="edu-button-primary">Upload Your Study Materials</Button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 bg-gradient-to-r from-eduverse-primary to-eduverse-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Collaborating Today</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
              Join our collaborative learning platform to share knowledge, form study groups, and enhance your academic performance together.
            </p>
            <Button className="bg-white text-eduverse-primary hover:bg-blue-50">
              Join the Community
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Learning;
