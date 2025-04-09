
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Briefcase, BookOpen, Handshake, Gift, Award, BadgeCheck, MapPin, Calendar, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Alumni = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-eduverse-primary to-eduverse-secondary py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Alumni Network</h1>
                <p className="text-xl mb-8 text-blue-100">
                  Connect with graduates, find mentorship opportunities, and access exclusive career resources through our blockchain-powered alumni network.
                </p>
                <Button className="bg-white text-eduverse-primary hover:bg-blue-50">
                  Join Alumni Network
                </Button>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 rounded-lg blur-xl"></div>
                  <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-lg animate-float">
                    <div className="grid grid-cols-1 gap-2 p-6">
                      <div className="bg-white/20 rounded-lg p-4 flex items-center space-x-4">
                        <div className="bg-eduverse-primary/30 rounded-full h-12 w-12 flex items-center justify-center">
                          <Handshake className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Mentorship Network</h3>
                          <p className="text-sm text-blue-100">156 active mentors</p>
                        </div>
                      </div>
                      
                      <div className="bg-white/20 rounded-lg p-4 flex items-center space-x-4">
                        <div className="bg-eduverse-secondary/30 rounded-full h-12 w-12 flex items-center justify-center">
                          <Briefcase className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Job Opportunities</h3>
                          <p className="text-sm text-blue-100">48 new positions this week</p>
                        </div>
                      </div>
                      
                      <div className="bg-white/20 rounded-lg p-4 flex items-center space-x-4">
                        <div className="bg-eduverse-accent/30 rounded-full h-12 w-12 flex items-center justify-center">
                          <Gift className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Alumni Contributions</h3>
                          <p className="text-sm text-blue-100">875,000 EduPoints donated</p>
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
            <h2 className="text-3xl font-bold text-center mb-12">Alumni Network Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="card-hover">
                <CardHeader>
                  <Handshake className="h-10 w-10 text-eduverse-primary mb-2" />
                  <CardTitle>Mentorship Matching</CardTitle>
                  <CardDescription>Connect with experienced graduates</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Our AI algorithm matches current students with relevant alumni mentors based on career goals, academic background, and personal interests.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Find a Mentor</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <Briefcase className="h-10 w-10 text-eduverse-secondary mb-2" />
                  <CardTitle>Career Opportunities</CardTitle>
                  <CardDescription>Direct pipeline for jobs</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Access exclusive job postings, internships, and early career opportunities from alumni working at top companies worldwide.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Browse Opportunities</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-eduverse-accent mb-2" />
                  <CardTitle>Continued Learning</CardTitle>
                  <CardDescription>Lifelong educational access</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Alumni maintain access to educational resources, specializing courses, and can participate in continued professional development programs.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Explore Learning</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <Gift className="h-10 w-10 text-eduverse-info mb-2" />
                  <CardTitle>Giving Back</CardTitle>
                  <CardDescription>Support future generations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Alumni can contribute EduPoints, resources, and time to support scholarships, campus improvements, and special initiatives.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Contribute</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <Users className="h-10 w-10 text-green-600 mb-2" />
                  <CardTitle>Networking Events</CardTitle>
                  <CardDescription>Build valuable connections</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Attend virtual and physical networking events designed to connect students, recent graduates, and established alumni in various industries.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Events</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <BadgeCheck className="h-10 w-10 text-orange-600 mb-2" />
                  <CardTitle>Verified Alumni Status</CardTitle>
                  <CardDescription>Blockchain-verified credentials</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">All alumni profiles include blockchain-verified credentials, ensuring authentic connections and maintaining network integrity.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Verify Status</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {/* Mentorship Showcase */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Mentorship Program</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Connect with experienced alumni who can guide you through academic challenges and career decisions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-xl font-bold mb-4">How Mentorship Works</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-eduverse-primary/10 rounded-full p-3">
                      <Users className="h-6 w-6 text-eduverse-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">AI-Powered Matching</h4>
                      <p className="text-gray-600">Our algorithm analyzes your academic focus, career aspirations, and personal interests to suggest compatible mentors.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-eduverse-secondary/10 rounded-full p-3">
                      <MessageSquare className="h-6 w-6 text-eduverse-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Structured Engagement</h4>
                      <p className="text-gray-600">Follow guided milestones for effective mentorship or create your own custom development plan.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-eduverse-accent/10 rounded-full p-3">
                      <Award className="h-6 w-6 text-eduverse-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Reputation System</h4>
                      <p className="text-gray-600">Both mentors and mentees earn reputation scores and badges for successful mentorship experiences.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-eduverse-info/10 rounded-full p-3">
                      <Gift className="h-6 w-6 text-eduverse-info" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Token Rewards</h4>
                      <p className="text-gray-600">Mentors receive EduPoints for their contributions, which can fund scholarships or campus initiatives.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button className="edu-button-primary">Find Your Mentor</Button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
                <h3 className="text-xl font-bold mb-6 text-center">Featured Mentors</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center text-blue-600 font-bold">
                        JS
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold">Dr. Jennifer Smith</h4>
                        <p className="text-sm text-gray-600">Senior Researcher, Tech Innovations Inc.</p>
                      </div>
                      <div>
                        <div className="text-yellow-500">★★★★★</div>
                        <p className="text-xs text-gray-500">26 mentees</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">AI Research</span>
                        <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">Data Science</span>
                        <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">Career Growth</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center text-green-600 font-bold">
                        MR
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold">Marcus Reeves</h4>
                        <p className="text-sm text-gray-600">Investment Analyst, Global Finance Partners</p>
                      </div>
                      <div>
                        <div className="text-yellow-500">★★★★☆</div>
                        <p className="text-xs text-gray-500">18 mentees</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-yellow-50 text-yellow-700 text-xs px-2 py-1 rounded-full">Finance</span>
                        <span className="bg-red-50 text-red-700 text-xs px-2 py-1 rounded-full">Investment</span>
                        <span className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full">Internships</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="bg-purple-100 h-12 w-12 rounded-full flex items-center justify-center text-purple-600 font-bold">
                        LJ
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold">Lisa Jackson</h4>
                        <p className="text-sm text-gray-600">Chief Marketing Officer, Creative Solutions</p>
                      </div>
                      <div>
                        <div className="text-yellow-500">★★★★★</div>
                        <p className="text-xs text-gray-500">32 mentees</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-pink-50 text-pink-700 text-xs px-2 py-1 rounded-full">Marketing</span>
                        <span className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded-full">Design</span>
                        <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">Startups</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Career Opportunities */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Career Opportunities</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Exclusive job postings and internships from our network of alumni employers.
              </p>
            </div>
            
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {/* Job 1 */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="card-hover h-full">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>Software Engineer</CardTitle>
                          <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            Full-time
                          </div>
                        </div>
                        <CardDescription>TechNova Solutions</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>San Francisco, CA (Hybrid)</span>
                          </div>
                          <p className="text-gray-600">Join our innovative team developing next-generation AI solutions for enterprise clients. Looking for recent CS graduates with strong programming skills.</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">React</span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Python</span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Machine Learning</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="outline" className="w-full">View Details</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
                
                {/* Job 2 */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="card-hover h-full">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>Marketing Intern</CardTitle>
                          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Internship
                          </div>
                        </div>
                        <CardDescription>Global Brands Inc.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>New York, NY (Remote)</span>
                          </div>
                          <p className="text-gray-600">3-month paid internship working with our digital marketing team on social media campaigns and content strategy. Perfect for marketing students.</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Social Media</span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Content Creation</span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Analytics</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="outline" className="w-full">View Details</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
                
                {/* Job 3 */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="card-hover h-full">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>Research Assistant</CardTitle>
                          <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                            Part-time
                          </div>
                        </div>
                        <CardDescription>BioHealth Research Lab</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>Boston, MA (On-site)</span>
                          </div>
                          <p className="text-gray-600">Assist our research team with data collection and analysis for groundbreaking biomedical research. Seeking biology or chemistry students.</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Lab Experience</span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Data Analysis</span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Research</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="outline" className="w-full">View Details</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
                
                {/* Job 4 */}
                <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="card-hover h-full">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle>Financial Analyst</CardTitle>
                          <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            Full-time
                          </div>
                        </div>
                        <CardDescription>Summit Capital</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>Chicago, IL (Hybrid)</span>
                          </div>
                          <p className="text-gray-600">Entry-level position for finance graduates interested in investment analysis and portfolio management. Training provided.</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Finance</span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Excel</span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Analysis</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button variant="outline" className="w-full">View Details</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            
            <div className="mt-12 text-center">
              <Button className="edu-button-primary">Browse All Opportunities</Button>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Upcoming Alumni Events</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Connect with fellow alumni and current students at our networking events.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>Tech Industry Mixer</CardTitle>
                    <div className="bg-eduverse-primary text-white text-xs px-3 py-1 rounded-full">
                      In Person
                    </div>
                  </div>
                  <CardDescription>Networking event for tech professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-eduverse-primary" />
                      <span>May 15, 2023 • 6:30 PM - 9:00 PM</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-eduverse-primary" />
                      <span>Innovation Center, Main Campus</span>
                    </div>
                    <p className="text-gray-600">Connect with alumni working at leading tech companies. Perfect for computer science, engineering, and IT students seeking industry insights.</p>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between">
                  <span className="text-sm text-gray-500">42 attending</span>
                  <Button variant="outline">RSVP</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>Virtual Career Panel</CardTitle>
                    <div className="bg-eduverse-secondary text-white text-xs px-3 py-1 rounded-full">
                      Online
                    </div>
                  </div>
                  <CardDescription>Finance industry insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-eduverse-secondary" />
                      <span>June 3, 2023 • 12:00 PM - 1:30 PM</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-eduverse-secondary" />
                      <span>Zoom Webinar</span>
                    </div>
                    <p className="text-gray-600">Alumni from major financial institutions share career advice and industry insights. Live Q&A session included for all attendees.</p>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between">
                  <span className="text-sm text-gray-500">124 registered</span>
                  <Button variant="outline">Register</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>Homecoming Weekend</CardTitle>
                    <div className="bg-eduverse-accent text-white text-xs px-3 py-1 rounded-full">
                      In Person
                    </div>
                  </div>
                  <CardDescription>Annual alumni celebration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-eduverse-accent" />
                      <span>October 12-14, 2023</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-eduverse-accent" />
                      <span>University Campus</span>
                    </div>
                    <p className="text-gray-600">Our biggest alumni event of the year featuring reunions, networking sessions, workshops, and the annual alumni awards ceremony.</p>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 flex justify-between">
                  <span className="text-sm text-gray-500">357 attending</span>
                  <Button variant="outline">RSVP</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="mt-8 text-center">
              <Button className="edu-button-primary">View All Events</Button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 bg-gradient-to-r from-eduverse-primary to-eduverse-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Alumni Community</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
              Connect with fellow graduates, access exclusive benefits, and help shape the future of education at our institution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white text-eduverse-primary hover:bg-blue-50">
                Join the Network
              </Button>
              <Button variant="outline" className="border-white/20 bg-white/10 hover:bg-white/20">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Alumni;
