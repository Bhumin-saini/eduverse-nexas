import React from 'react';
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Award, Clock, Coffee, ShoppingBag } from 'lucide-react';
import WalletConnect from './WalletConnect';

const TokenEconomy = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">EduPoints Token Economy</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A blockchain-powered incentive system that rewards positive student behaviors and creates real utility on campus.
          </p>
          <div className="mt-8">
            <WalletConnect />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="p-8 bg-gradient-to-br from-eduverse-primary to-eduverse-secondary rounded-2xl text-white mb-8 animate-pulse-glow">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold">EduPoints</h3>
                  <p className="text-blue-100">The native token of EDU Chain L3 on Arbitrum</p>
                </div>
                <div className="token-glow bg-white/20 h-16 w-16 rounded-full flex items-center justify-center">
                  <span className="font-bold text-2xl">EDU</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-sm text-blue-100">Total Supply</p>
                  <p className="font-bold text-xl">100,000,000</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-sm text-blue-100">Circulating</p>
                  <p className="font-bold text-xl">24,500,000</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-sm text-blue-100">Student Pool</p>
                  <p className="font-bold text-xl">45,000,000</p>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-sm text-blue-100">DAO Treasury</p>
                  <p className="font-bold text-xl">30,500,000</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 border border-gray-100">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Award className="h-5 w-5 text-eduverse-primary" />
                  </div>
                  <h3 className="font-bold">Achievement</h3>
                </div>
                <p className="text-sm text-gray-600">Rewarded for academic excellence and course completions</p>
              </Card>
              
              <Card className="p-4 border border-gray-100">
                <div className="flex items-center mb-2">
                  <div className="bg-green-100 p-2 rounded-lg mr-3">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-bold">Attendance</h3>
                </div>
                <p className="text-sm text-gray-600">Earned through consistent class attendance and participation</p>
              </Card>
              
              <Card className="p-4 border border-gray-100">
                <div className="flex items-center mb-2">
                  <div className="bg-purple-100 p-2 rounded-lg mr-3">
                    <Users className="h-5 w-5 text-eduverse-secondary" />
                  </div>
                  <h3 className="font-bold">Leadership</h3>
                </div>
                <p className="text-sm text-gray-600">Gained through campus leadership roles and initiatives</p>
              </Card>
              
              <Card className="p-4 border border-gray-100">
                <div className="flex items-center mb-2">
                  <div className="bg-pink-100 p-2 rounded-lg mr-3">
                    <BookOpen className="h-5 w-5 text-eduverse-accent" />
                  </div>
                  <h3 className="font-bold">Contribution</h3>
                </div>
                <p className="text-sm text-gray-600">Rewarded for sharing knowledge and helping peers</p>
              </Card>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Token Utility on EDUChain L3</h3>
            <div className="space-y-6">
              <div className="flex">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Coffee className="h-6 w-6 text-eduverse-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Campus Services Discounts</h4>
                  <p className="text-gray-600">Use EduPoints for discounts at campus cafeterias, bookstore, and services</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <ShoppingBag className="h-6 w-6 text-eduverse-secondary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Priority Access</h4>
                  <p className="text-gray-600">Gain early registration for courses, exclusive events, and facility bookings</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="bg-green-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">Governance Voting</h4>
                  <p className="text-gray-600">Participate in DAO decisions affecting campus policies and fund allocations</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-8">
                <h4 className="text-lg font-bold mb-2">Smart Contract Integration</h4>
                <div className="relative h-32">
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="grid grid-cols-4 w-full">
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-eduverse-primary text-white p-2 rounded-lg text-sm">Earn</div>
                        <p className="text-xs mt-2">awardPoints()</p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-eduverse-secondary text-white p-2 rounded-lg text-sm">Store</div>
                        <p className="text-xs mt-2">stakePoints()</p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-eduverse-accent text-white p-2 rounded-lg text-sm">Spend</div>
                        <p className="text-xs mt-2">redeemOffer()</p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="bg-gray-700 text-white p-2 rounded-lg text-sm">Govern</div>
                        <p className="text-xs mt-2">DAO_ROLE</p>
                      </div>
                    </div>
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

export default TokenEconomy;
