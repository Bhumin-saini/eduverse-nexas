
import React from 'react';
import WalletConnect from '../WalletConnect';
import { useToken } from '../../context/TokenContext';

const CallToActionSection = () => {
  const { isConnected, isRegistered } = useToken();

  return (
    <div className="py-16 bg-gradient-to-r from-eduverse-primary to-eduverse-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Earning EduPoints Today</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
          {isConnected 
            ? (isRegistered 
                ? "Your wallet is connected! Start earning EduPoints for your campus activities." 
                : "Your wallet is connected but you're not registered in the system. Please contact your campus administrator.")
            : "Connect your wallet to begin tracking your academic achievements and earning EduPoints for your campus activities."}
        </p>
        <WalletConnect />
      </div>
    </div>
  );
};

export default CallToActionSection;
