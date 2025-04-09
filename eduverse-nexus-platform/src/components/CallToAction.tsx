
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  return (
    <div className="bg-gradient-to-r from-eduverse-primary to-eduverse-secondary py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Join the Educational Revolution</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
          Experience the future of education with blockchain technology, token incentives, and a vibrant learning community.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="bg-white text-eduverse-primary hover:bg-blue-50">
            Request Early Access <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" className="border-white/20 bg-white/10 hover:bg-white/20">
            Partner with Us
          </Button>
        </div>
        
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <div className="bg-white/10 px-4 py-2 rounded-lg">
            <span className="font-bold text-2xl">25+</span>
            <p className="text-sm text-blue-100">Partner Institutions</p>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-lg">
            <span className="font-bold text-2xl">50K+</span>
            <p className="text-sm text-blue-100">Student Users</p>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-lg">
            <span className="font-bold text-2xl">1.2M+</span>
            <p className="text-sm text-blue-100">Transactions</p>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-lg">
            <span className="font-bold text-2xl">Q3 2023</span>
            <p className="text-sm text-blue-100">Full Launch</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
