import React from 'react';
import { useToken } from '../context/TokenContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Award,
  ChevronRight
} from 'lucide-react';

const Academics = () => {
  const { studentSummary } = useToken();
  const navigate = useNavigate();

  // Mock course data - in a real app, this would come from an API
  const courses = [
    {
      id: 1,
      title: 'Blockchain Fundamentals',
      progress: 75,
      nextLesson: 'Smart Contracts',
      points: 500,
      instructor: 'Dr. Sarah Chen'
    },
    {
      id: 2,
      title: 'Web3 Development',
      progress: 45,
      nextLesson: 'DApp Architecture',
      points: 750,
      instructor: 'Prof. James Wilson'
    },
    {
      id: 3,
      title: 'Cryptography',
      progress: 30,
      nextLesson: 'Public Key Infrastructure',
      points: 600,
      instructor: 'Dr. Maria Rodriguez'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Academic Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Track your courses, progress, and academic achievements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Total Courses</h3>
                <p className="text-3xl font-bold mt-2">{courses.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-eduverse-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Average Progress</h3>
                <p className="text-3xl font-bold mt-2">
                  {Math.round(courses.reduce((acc, course) => acc + course.progress, 0) / courses.length)}%
                </p>
              </div>
              <Clock className="h-8 w-8 text-eduverse-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Total Points</h3>
                <p className="text-3xl font-bold mt-2">
                  {courses.reduce((acc, course) => acc + course.points, 0)}
                </p>
              </div>
              <Award className="h-8 w-8 text-eduverse-primary" />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {courses.map((course) => (
            <Card key={course.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className="text-gray-600 mt-1">Instructor: {course.instructor}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-eduverse-primary h-2.5 rounded-full" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Next Lesson</p>
                  <p className="font-medium">{course.nextLesson}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Points Available</p>
                  <p className="font-medium">{course.points} EP</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  Continue Learning
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate(`/course/${course.id}/resources`)}
                >
                  Resources
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Academics; 