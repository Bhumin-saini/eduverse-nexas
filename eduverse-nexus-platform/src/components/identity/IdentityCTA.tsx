
import React from 'react';
import { Button } from '@/components/ui/button';

const IdentityCTA = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-eduverse-primary to-eduverse-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Secure Your Digital Identity</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
          Take control of your academic identity today and experience seamless campus access, verifiable credentials, and enhanced privacy.
        </p>
        <Button className="bg-white text-eduverse-primary hover:bg-blue-50">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default IdentityCTA;
