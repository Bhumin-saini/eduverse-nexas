
import React from 'react';
import { Fingerprint, Shield, QrCode, Calendar, MapPin, Building } from 'lucide-react';

const StudentIdCard = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-eduverse-primary/10 rounded-full -translate-y-20 translate-x-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-eduverse-secondary/10 rounded-full translate-y-16 -translate-x-16"></div>
      
      <div className="relative flex justify-between items-start mb-8">
        <div>
          <div className="text-sm text-gray-500 mb-1">Digital Student ID</div>
          <div className="text-2xl font-bold">Sarah J. Thompson</div>
          <div className="text-eduverse-secondary font-medium">Computer Science • Class of 2025</div>
        </div>
        <div className="bg-gradient-to-r from-eduverse-primary to-eduverse-secondary p-3 rounded-lg">
          <Fingerprint className="h-6 w-6 text-white" />
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6 relative z-10 flex justify-between">
        <div>
          <div className="text-sm text-gray-500">Student ID</div>
          <div className="font-medium">EDU-2023-8742</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Verification</div>
          <div className="font-medium text-green-600 flex items-center">
            <Shield className="h-4 w-4 mr-1" /> Verified
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-eduverse-primary mr-2" />
          <div>
            <div className="text-xs text-gray-500">Enrolled</div>
            <div className="text-sm">September 2023</div>
          </div>
        </div>
        <div className="flex items-center">
          <Building className="h-5 w-5 text-eduverse-primary mr-2" />
          <div>
            <div className="text-xs text-gray-500">Department</div>
            <div className="text-sm">Engineering</div>
          </div>
        </div>
        <div className="flex items-center">
          <MapPin className="h-5 w-5 text-eduverse-primary mr-2" />
          <div>
            <div className="text-xs text-gray-500">Campus</div>
            <div className="text-sm">Main Campus</div>
          </div>
        </div>
        <div className="flex items-center">
          <Shield className="h-5 w-5 text-eduverse-primary mr-2" />
          <div>
            <div className="text-xs text-gray-500">Access Level</div>
            <div className="text-sm">Full Student</div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mb-4">
        <div className="bg-white p-2 border border-gray-200 rounded-lg">
          <QrCode className="h-32 w-32 text-eduverse-primary" />
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500">
        Scan for identity verification or campus access
      </div>
    </div>
  );
};

export default StudentIdCard;
