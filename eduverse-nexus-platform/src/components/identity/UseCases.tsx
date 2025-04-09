
import React from 'react';
import { BadgeCheck, Smartphone, Share2, QrCode, Shield, Plug, Lock, Wallet } from 'lucide-react';

const UseCases = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Digital Identity in Action</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how digital identity transforms everyday campus experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-eduverse-primary/10 p-6">
              <h3 className="text-xl font-bold text-eduverse-primary mb-2">Exam Check-in</h3>
              <div className="flex items-start">
                <div className="bg-eduverse-primary/20 rounded-full p-3 mr-4">
                  <BadgeCheck className="h-6 w-6 text-eduverse-primary" />
                </div>
                <p className="text-gray-600">No more ID cards or paper tickets. Simply scan your digital ID with biometric verification to check in for exams securely, preventing impersonation.</p>
              </div>
            </div>
            <div className="border-t border-gray-100 p-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Shield className="h-4 w-4 text-eduverse-primary" />
                <span>Biometric verification required</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-eduverse-secondary/10 p-6">
              <h3 className="text-xl font-bold text-eduverse-secondary mb-2">Building Access</h3>
              <div className="flex items-start">
                <div className="bg-eduverse-secondary/20 rounded-full p-3 mr-4">
                  <Smartphone className="h-6 w-6 text-eduverse-secondary" />
                </div>
                <p className="text-gray-600">Access campus facilities with a tap of your phone. The system checks your permissions and records entry for security purposes.</p>
              </div>
            </div>
            <div className="border-t border-gray-100 p-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Plug className="h-4 w-4 text-eduverse-secondary" />
                <span>NFC and Bluetooth enabled</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-eduverse-accent/10 p-6">
              <h3 className="text-xl font-bold text-eduverse-accent mb-2">Transcript Sharing</h3>
              <div className="flex items-start">
                <div className="bg-eduverse-accent/20 rounded-full p-3 mr-4">
                  <Share2 className="h-6 w-6 text-eduverse-accent" />
                </div>
                <p className="text-gray-600">Share verifiable academic records with potential employers or other institutions without waiting for official university processes.</p>
              </div>
            </div>
            <div className="border-t border-gray-100 p-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Lock className="h-4 w-4 text-eduverse-accent" />
                <span>Selective disclosure controls</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-eduverse-info/10 p-6">
              <h3 className="text-xl font-bold text-eduverse-info mb-2">Event Attendance</h3>
              <div className="flex items-start">
                <div className="bg-eduverse-info/20 rounded-full p-3 mr-4">
                  <QrCode className="h-6 w-6 text-eduverse-info" />
                </div>
                <p className="text-gray-600">Check in to campus events with a QR code that validates your identity and automatically awards participation EduPoints.</p>
              </div>
            </div>
            <div className="border-t border-gray-100 p-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Wallet className="h-4 w-4 text-eduverse-info" />
                <span>Automated token rewards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCases;
