
import React from 'react';
import { Coins, LoaderCircle } from 'lucide-react';
import WalletConnect from '../WalletConnect';
import { useToken } from '../../context/TokenContext';

const TokenHeroSection = () => {
  const { isConnected, balance, isLoading } = useToken();

  return (
    <div className="bg-gradient-to-r from-eduverse-primary to-eduverse-secondary py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">EduPoints Economy</h1>
            <p className="text-xl mb-8 text-blue-100">
              Earn tokens for your academic and co-curricular achievements, and unlock exclusive benefits across campus.
            </p>
            <WalletConnect />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-xl"></div>
              <div className="relative bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-4 shadow-lg token-glow animate-pulse-glow">
                <div className="flex items-center justify-center h-48 w-48">
                  <div>
                    <div className="text-center">
                      <Coins className="h-12 w-12 mx-auto mb-2" />
                      <h3 className="font-semibold">Balance</h3>
                      {isLoading ? (
                        <LoaderCircle className="h-8 w-8 mx-auto animate-spin" />
                      ) : (
                        <>
                          <p className="text-3xl font-bold">{isConnected ? balance || "0" : "---"}</p>
                          <p className="text-sm">EduPoints</p>
                        </>
                      )}
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

export default TokenHeroSection;
