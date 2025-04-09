
import React from 'react';
import { Button } from "@/components/ui/button";
import { Fingerprint, QrCode } from 'lucide-react';

const IdentityHero = () => {
  return (
    <div className="bg-gradient-to-r from-eduverse-primary to-eduverse-secondary py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Digital Identity</h1>
            <p className="text-xl mb-8 text-blue-100">
              Secure, verifiable, and controlled digital identity for your academic and personal credentials.
            </p>
            <Button className="bg-white text-eduverse-primary hover:bg-blue-50">
              Create Your Digital ID
            </Button>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-lg blur-xl"></div>
              <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg w-72 overflow-hidden animate-float">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="font-bold text-xl">STUDENT ID</h3>
                      <p className="text-blue-100 text-sm">Blockchain verified</p>
                    </div>
                    <div className="bg-white/30 rounded-full p-2">
                      <Fingerprint className="h-6 w-6" />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="h-24 w-24 mx-auto bg-white/30 rounded-full flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold">JD</span>
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold text-lg">Jane Doe</h4>
                      <p className="text-blue-100">Computer Science</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-100">Student ID:</span>
                      <span className="font-semibold">EDU-9385721</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-100">Valid until:</span>
                      <span className="font-semibold">06/2026</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-eduverse-accent to-eduverse-secondary p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-blue-100">Verification:</p>
                      <p className="text-sm font-semibold truncate w-32">0x1a4b...7x9z</p>
                    </div>
                    <QrCode className="h-10 w-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityHero;
