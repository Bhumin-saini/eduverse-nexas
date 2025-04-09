
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, LineChart, Calendar, ClipboardCheck, Trophy, BookOpenCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Academics = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-eduverse-primary to-eduverse-secondary py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Academic Dashboard</h1>
                <p className="text-xl mb-8 text-blue-100">
                  Track your progress, visualize your achievements, and get personalized recommendations for your academic journey.
                </p>
                <Button className="bg-white text-eduverse-primary hover:bg-blue-50">
                  Connect Wallet to View Your Dashboard
                </Button>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 rounded-lg blur-xl"></div>
                  <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 shadow-lg animate-float">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/20 rounded-lg p-4">
                        <LineChart className="h-8 w-8 mb-2 text-blue-100" />
                        <h3 className="font-semibold">Credits</h3>
                        <p className="text-2xl font-bold">85/120</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4">
                        <Trophy className="h-8 w-8 mb-2 text-blue-100" />
                        <h3 className="font-semibold">GPA</h3>
                        <p className="text-2xl font-bold">3.8/4.0</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4">
                        <BookOpen className="h-8 w-8 mb-2 text-blue-100" />
                        <h3 className="font-semibold">Courses</h3>
                        <p className="text-2xl font-bold">24</p>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4">
                        <Calendar className="h-8 w-8 mb-2 text-blue-100" />
                        <h3 className="font-semibold">Semester</h3>
                        <p className="text-2xl font-bold">5/8</p>
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
            <h2 className="text-3xl font-bold text-center mb-12">Dashboard Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="card-hover">
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-eduverse-primary mb-2" />
                  <CardTitle>Degree Tracker</CardTitle>
                  <CardDescription>Real-time visualization of your academic journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Monitor completed credits and remaining requirements with interactive charts. Set milestones and track your progress toward graduation.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <ClipboardCheck className="h-10 w-10 text-eduverse-secondary mb-2" />
                  <CardTitle>Smart Prerequisites</CardTitle>
                  <CardDescription>Automated verification system</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Smart contracts automatically verify course prerequisites, ensuring you're eligible for advanced courses based on your blockchain-verified academic record.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Check Eligibility</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <Trophy className="h-10 w-10 text-eduverse-accent mb-2" />
                  <CardTitle>Skills Transcript</CardTitle>
                  <CardDescription>Verified record of competencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Blockchain-verified record of skills and competencies acquired throughout your academic journey, endorsed by faculty and verified through assessments.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Skills</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <BookOpenCheck className="h-10 w-10 text-eduverse-info mb-2" />
                  <CardTitle>Course Recommendations</CardTitle>
                  <CardDescription>AI-powered suggestions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Get personalized course recommendations based on your academic history, career goals, and learning preferences using our advanced AI system.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Get Recommendations</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <LineChart className="h-10 w-10 text-green-600 mb-2" />
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>In-depth performance insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Visualize your academic performance across courses, semesters, and subjects to identify strengths and areas for improvement.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Analytics</Button>
                </CardFooter>
              </Card>
              
              <Card className="card-hover">
                <CardHeader>
                  <Calendar className="h-10 w-10 text-orange-600 mb-2" />
                  <CardTitle>Academic Calendar</CardTitle>
                  <CardDescription>Smart scheduling assistant</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Integrated calendar with important academic dates, assignment deadlines, and exam schedules with smart notifications and reminders.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Open Calendar</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Interactive Degree Planner</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Map out your entire academic journey with our interactive degree planner.
              </p>
            </div>
            
            <div className="bg-gray-100 rounded-xl p-8 shadow-inner">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-bold text-eduverse-primary mb-2">Year 1</h3>
                  <div className="space-y-2">
                    <div className="border border-gray-200 rounded p-2 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                      <p className="font-semibold">CS 101</p>
                      <p className="text-sm text-gray-600">Intro to Programming</p>
                    </div>
                    <div className="border border-gray-200 rounded p-2 bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
                      <p className="font-semibold">MATH 120</p>
                      <p className="text-sm text-gray-600">Calculus I</p>
                    </div>
                    <div className="border border-gray-200 rounded p-2 bg-purple-50 hover:bg-purple-100 transition-colors cursor-pointer">
                      <p className="font-semibold">ENG 110</p>
                      <p className="text-sm text-gray-600">College Writing</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-bold text-eduverse-primary mb-2">Year 2</h3>
                  <div className="space-y-2">
                    <div className="border border-gray-200 rounded p-2 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                      <p className="font-semibold">CS 201</p>
                      <p className="text-sm text-gray-600">Data Structures</p>
                    </div>
                    <div className="border border-gray-200 rounded p-2 bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
                      <p className="font-semibold">MATH 220</p>
                      <p className="text-sm text-gray-600">Discrete Math</p>
                    </div>
                    <div className="border border-gray-200 rounded p-2 bg-orange-50 hover:bg-orange-100 transition-colors cursor-pointer">
                      <p className="font-semibold">PHYS 140</p>
                      <p className="text-sm text-gray-600">Physics I</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-bold text-eduverse-primary mb-2">Year 3</h3>
                  <div className="space-y-2">
                    <div className="border border-gray-200 rounded p-2 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                      <p className="font-semibold">CS 340</p>
                      <p className="text-sm text-gray-600">Algorithms</p>
                    </div>
                    <div className="border border-gray-200 rounded p-2 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                      <p className="font-semibold">CS 360</p>
                      <p className="text-sm text-gray-600">Database Systems</p>
                    </div>
                    <div className="border border-gray-200 rounded p-2 bg-pink-50 hover:bg-pink-100 transition-colors cursor-pointer">
                      <p className="font-semibold">BUS 210</p>
                      <p className="text-sm text-gray-600">Business Fundamentals</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-bold text-eduverse-primary mb-2">Year 4</h3>
                  <div className="space-y-2">
                    <div className="border border-gray-200 rounded p-2 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                      <p className="font-semibold">CS 490</p>
                      <p className="text-sm text-gray-600">Senior Project</p>
                    </div>
                    <div className="border border-gray-200 rounded p-2 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
                      <p className="font-semibold">CS 450</p>
                      <p className="text-sm text-gray-600">Machine Learning</p>
                    </div>
                    <div className="border border-gray-200 rounded p-2 bg-gray-50 hover:bg-gray-200 transition-colors cursor-pointer">
                      <p className="font-semibold">ELEC 400</p>
                      <p className="text-sm text-gray-600">Technical Elective</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button className="edu-button-primary">Generate My Degree Plan</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Academics;
