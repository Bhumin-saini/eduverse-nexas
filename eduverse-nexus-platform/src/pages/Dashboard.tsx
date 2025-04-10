import React, { useState } from 'react';
import { useToken } from '@/context/TokenContext';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  BellRing,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  User,
  AlertTriangle,
  BookOpen,
  ArrowUpRight,
  GraduationCap,
  BookOpenCheck,
  ClipboardCheck,
  LineChart,
  Layers
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data for the dashboard components
const mockNotices = [
  {
    id: 1,
    title: 'Upcoming Maintenance',
    content: 'The platform will be under maintenance from 2 AM to 4 AM tomorrow.',
    date: '2023-09-15',
    priority: 'medium'
  },
  {
    id: 2,
    title: 'New Course Registration Open',
    content: 'Registration for the next semester courses is now open.',
    date: '2023-09-10',
    priority: 'high'
  },
  {
    id: 3,
    title: 'Library Hours Extended',
    content: 'The library will be open until midnight during finals week.',
    date: '2023-09-05',
    priority: 'low'
  },
  {
    id: 4,
    title: 'Token Reward Program Update',
    content: 'New rewards have been added to the EduPoints marketplace.',
    date: '2023-09-01',
    priority: 'medium'
  }
];

const mockSchedule = [
  {
    id: 1,
    subject: 'Advanced Algorithms',
    time: '09:00 - 10:30',
    location: 'Room 202',
    instructor: 'Dr. Smith',
    day: 'Monday'
  },
  {
    id: 2,
    subject: 'Database Systems',
    time: '11:00 - 12:30',
    location: 'Room 305',
    instructor: 'Prof. Johnson',
    day: 'Monday'
  },
  {
    id: 3,
    subject: 'Blockchain Fundamentals',
    time: '14:00 - 15:30',
    location: 'Room 101',
    instructor: 'Dr. Williams',
    day: 'Monday'
  },
  {
    id: 4,
    subject: 'Web Development',
    time: '09:00 - 10:30',
    location: 'Lab 3',
    instructor: 'Prof. Davis',
    day: 'Tuesday'
  },
  {
    id: 5,
    subject: 'Machine Learning',
    time: '11:00 - 12:30',
    location: 'Room 405',
    instructor: 'Dr. Miller',
    day: 'Tuesday'
  }
];

const mockAssignments = [
  {
    id: 1,
    title: 'Algorithm Analysis Report',
    subject: 'Advanced Algorithms',
    dueDate: '2023-09-20',
    status: 'pending'
  },
  {
    id: 2,
    title: 'Database Design Project',
    subject: 'Database Systems',
    dueDate: '2023-09-25',
    status: 'pending'
  },
  {
    id: 3,
    title: 'Smart Contract Implementation',
    subject: 'Blockchain Fundamentals',
    dueDate: '2023-09-15',
    status: 'completed'
  },
  {
    id: 4,
    title: 'Responsive Website',
    subject: 'Web Development',
    dueDate: '2023-09-18',
    status: 'pending'
  },
  {
    id: 5,
    title: 'ML Model Training',
    subject: 'Machine Learning',
    dueDate: '2023-09-30',
    status: 'pending'
  }
];

const mockAttendance = [
  {
    subject: 'Advanced Algorithms',
    present: 12,
    total: 15,
    percentage: 80
  },
  {
    subject: 'Database Systems',
    present: 14,
    total: 15,
    percentage: 93
  },
  {
    subject: 'Blockchain Fundamentals',
    present: 10,
    total: 12,
    percentage: 83
  },
  {
    subject: 'Web Development',
    present: 8,
    total: 10,
    percentage: 80
  },
  {
    subject: 'Machine Learning',
    present: 9,
    total: 12,
    percentage: 75
  }
];

// Days of the week for the schedule tabs
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

// Helper function to format dates (defined directly in the file instead of importing)
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { isConnected, isRegistered, studentSummary, balance } = useToken();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [dashboardTab, setDashboardTab] = useState('overview');
  const today = new Date();
  const dayOfWeek = today.getDay();
  const currentDay = daysOfWeek[dayOfWeek > 5 ? 0 : dayOfWeek - 1];
  const todaySchedule = mockSchedule.filter(item => item.day === currentDay);

  // Redirect if not connected or registered
  React.useEffect(() => {
    if (!isConnected) {
      navigate('/');
    } else if (!isRegistered) {
      // For demonstration purposes, let's simulate registration
      // In a real app, we would redirect to the register page
      // navigate('/register');
      
      // Instead, let's mock the registration status for demo purposes
      console.log("User is connected but not registered - mocking registration for demo");
      
      // Note: In a real application, this would be handled through proper registration
      // This is just to make the demo work without requiring actual blockchain registration
    }
  }, [isConnected, isRegistered, navigate]);

  // Filter schedule based on the selected day
  const filteredSchedule = mockSchedule.filter(item => item.day === selectedDay);

  // Sort assignments by due date (closest first)
  const sortedAssignments = [...mockAssignments].sort((a, b) => 
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar />
      <div className="container py-8">
        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="mb-8" onValueChange={setDashboardTab}>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="academic">Academic Progress</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Student Profile Card */}
              <Card className="w-full md:w-1/3">
                <CardHeader>
                  <CardTitle>Student Profile</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/avatar-placeholder.png" alt="Student avatar" />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h3 className="text-xl font-medium">{studentSummary?.name || "Student Name"}</h3>
                    <p className="text-sm text-slate-500">ID: {studentSummary?.studentId || "12345678"}</p>
                    <p className="text-sm text-slate-500">Department: Computer Science</p>
                    <Badge className="mt-2" variant="outline">
                      EduPoints: {studentSummary?.currentBalance || 0}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Notice Board Card */}
              <Card className="w-full md:w-2/3">
                <CardHeader>
                  <CardTitle>Notice Board</CardTitle>
                  <CardDescription>Important announcements and updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockNotices.map((notice) => (
                    <div key={notice.id} className="border-l-4 p-4 rounded-md shadow-sm bg-white dark:bg-slate-800" 
                      style={{
                        borderLeftColor: 
                          notice.priority === "high" ? "rgb(220, 38, 38)" : 
                          notice.priority === "medium" ? "rgb(234, 179, 8)" : 
                          "rgb(34, 197, 94)"
                      }}>
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{notice.title}</h4>
                        <span className="text-xs text-slate-500">{formatDate(notice.date)}</span>
                      </div>
                      <p className="text-sm mt-1">{notice.content}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Daily Schedule Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Daily Schedule</CardTitle>
                  <CardDescription>Your class timetable</CardDescription>
                  <Tabs defaultValue={selectedDay}>
                    <TabsList className="mt-2">
                      {daysOfWeek.map((day) => (
                        <TabsTrigger 
                          key={day} 
                          value={day} 
                          onClick={() => setSelectedDay(day)}
                        >
                          {day}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredSchedule.length ? (
                      filteredSchedule.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 rounded-md bg-slate-100 dark:bg-slate-800">
                          <div>
                            <h4 className="font-medium">{item.subject}</h4>
                            <p className="text-sm text-slate-500">Room: {item.location}</p>
                          </div>
                          <span className="text-sm font-medium">{item.time}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-4 text-slate-500">No classes scheduled for {selectedDay}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Attendance Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Attendance</CardTitle>
                  <CardDescription>Your attendance records for all subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAttendance.map((record) => (
                      <div key={record.subject} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{record.subject}</span>
                          <span className="text-sm">{record.present}/{record.total} ({record.percentage}%)</span>
                        </div>
                        <Progress value={record.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Assignments Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Assignments</CardTitle>
                  <CardDescription>Your upcoming and completed assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="pending">
                    <TabsList className="mb-4">
                      <TabsTrigger value="pending">Pending</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="pending" className="space-y-4">
                      {sortedAssignments.filter(a => a.status === "pending").map((assignment) => (
                        <div key={assignment.id} className="border p-4 rounded-md">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold">{assignment.title}</h4>
                            <Badge>{formatDate(assignment.dueDate)}</Badge>
                          </div>
                          <p className="text-sm text-slate-500 mt-1">{assignment.subject}</p>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="completed" className="space-y-4">
                      {sortedAssignments.filter(a => a.status === "completed").map((assignment) => (
                        <div key={assignment.id} className="border p-4 rounded-md">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold">{assignment.title}</h4>
                            <Badge variant="outline">{formatDate(assignment.dueDate)}</Badge>
                          </div>
                          <p className="text-sm text-slate-500 mt-1">{assignment.subject}</p>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Today's Classes Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Classes</CardTitle>
                  <CardDescription>Classes scheduled for {currentDay}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaySchedule.length ? (
                      todaySchedule.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 rounded-md bg-slate-100 dark:bg-slate-800">
                          <div>
                            <h4 className="font-medium">{item.subject}</h4>
                            <p className="text-sm text-slate-500">Room: {item.location}</p>
                          </div>
                          <span className="text-sm font-medium">{item.time}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-4 text-slate-500">No classes scheduled for today</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => setDashboardTab('academic')}>View Academic Progress</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          {/* Academic Progress Tab Content */}
          <TabsContent value="academic" className="space-y-8">
            {/* Academic Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <BookOpen className="h-8 w-8 text-eduverse-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Credits</h3>
                    <p className="text-3xl font-bold mt-2">85/120</p>
                    <p className="text-sm text-gray-600 mt-1">70% Complete</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <GraduationCap className="h-8 w-8 text-green-700" />
                    </div>
                    <h3 className="text-xl font-bold">GPA</h3>
                    <p className="text-3xl font-bold mt-2">3.8/4.0</p>
                    <p className="text-sm text-gray-600 mt-1">Top 15%</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <BookOpenCheck className="h-8 w-8 text-eduverse-secondary" />
                    </div>
                    <h3 className="text-xl font-bold">Courses</h3>
                    <p className="text-3xl font-bold mt-2">24</p>
                    <p className="text-sm text-gray-600 mt-1">Completed</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-pink-50 border-pink-200">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-pink-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                      <Calendar className="h-8 w-8 text-eduverse-accent" />
                    </div>
                    <h3 className="text-xl font-bold">Semester</h3>
                    <p className="text-3xl font-bold mt-2">5/8</p>
                    <p className="text-sm text-gray-600 mt-1">Current Progress</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Academic Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            </div>
            
            {/* Interactive Degree Planner */}
            <Card>
              <CardHeader>
                <CardTitle>Interactive Degree Planner</CardTitle>
                <CardDescription>Your academic journey visualization</CardDescription>
              </CardHeader>
              <CardContent>
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
                    <Button className="bg-eduverse-primary text-white hover:bg-eduverse-primary/90">Generate My Degree Plan</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard; 