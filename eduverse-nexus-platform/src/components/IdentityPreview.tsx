
import React from 'react';
import StudentIdCard from './identity/StudentIdCard';
import SecurityFeatures from './identity/SecurityFeatures';

const IdentityPreview = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Secure Digital Identity</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Blockchain-verified digital identity that's portable, privacy-preserving, and fully under your control.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <StudentIdCard />
          </div>
          <div className="lg:w-1/2">
            <SecurityFeatures />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityPreview;
