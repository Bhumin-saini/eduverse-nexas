
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Award, TrendingUp, ShieldCheck, Gift } from 'lucide-react';

const EarningOpportunitiesSection = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">How to Earn EduPoints</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="card-hover">
            <CardHeader>
              <Award className="h-10 w-10 text-eduverse-primary mb-2" />
              <CardTitle>Academic Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Assignment completion: 5-20 points based on quality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>High grades: Bonus points for A/A+ work</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Course completion: 50-100 points per course</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Perfect attendance: 25 points per course</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-eduverse-secondary mb-2" />
              <CardTitle>Skills Development</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Workshop attendance: 15 points per event</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Certification completion: 50-200 points</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Peer tutoring: 10 points per hour</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Hackathon participation: 100 points</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <ShieldCheck className="h-10 w-10 text-eduverse-accent mb-2" />
              <CardTitle>Leadership</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Club leadership: 50 points per semester</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Event organization: 25-75 points per event</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Student government: 100 points per semester</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Mentoring new students: 20 points per month</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardHeader>
              <Gift className="h-10 w-10 text-eduverse-info mb-2" />
              <CardTitle>Community Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Volunteer work: 15 points per hour</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Campus cleanup: 20 points per event</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Community projects: 50-150 points</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Charity fundraising: 10 points per $100 raised</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EarningOpportunitiesSection;
