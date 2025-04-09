
import React from 'react';
import { Fingerprint, FileLock, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Digital Identity Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your digital identity is more than just an ID card - it's a comprehensive system for managing your academic presence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection lines */}
          <div className="hidden md:block absolute top-1/2 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-eduverse-primary to-eduverse-secondary"></div>
          
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-4 rounded-full bg-eduverse-primary text-white w-8 h-8 flex items-center justify-center font-bold shadow-lg z-10">1</div>
            <Card className="mt-8 card-hover">
              <CardHeader>
                <CardTitle className="text-center">Identity Creation</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-blue-50 rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center mb-4">
                  <Fingerprint className="h-10 w-10 text-eduverse-primary" />
                </div>
                <p className="text-gray-600">Verify your identity through the university registration process. Biometric data is collected and securely stored.</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Step 2 */}
          <div className="relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-4 rounded-full bg-eduverse-secondary text-white w-8 h-8 flex items-center justify-center font-bold shadow-lg z-10">2</div>
            <Card className="mt-8 card-hover">
              <CardHeader>
                <CardTitle className="text-center">Blockchain Registration</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-purple-50 rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center mb-4">
                  <FileLock className="h-10 w-10 text-eduverse-secondary" />
                </div>
                <p className="text-gray-600">Your identity is registered on the blockchain with cryptographic security, linking to your official student records.</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Step 3 */}
          <div className="relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -mt-4 rounded-full bg-eduverse-accent text-white w-8 h-8 flex items-center justify-center font-bold shadow-lg z-10">3</div>
            <Card className="mt-8 card-hover">
              <CardHeader>
                <CardTitle className="text-center">Identity Management</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-pink-50 rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center mb-4">
                  <Settings className="h-10 w-10 text-eduverse-accent" />
                </div>
                <p className="text-gray-600">Control your identity through the EduVerse dashboard. Manage privacy settings and access controls.</p>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button className="edu-button-primary">Create Your Digital ID Now</Button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
