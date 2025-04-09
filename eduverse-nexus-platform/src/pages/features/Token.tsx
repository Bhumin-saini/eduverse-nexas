
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import TokenHeroSection from '../../components/token/TokenHeroSection';
import TokenDistributionSection from '../../components/token/TokenDistributionSection';
import EarningOpportunitiesSection from '../../components/token/EarningOpportunitiesSection';
import TokenUtilitySection from '../../components/token/TokenUtilitySection';
import CallToActionSection from '../../components/token/CallToActionSection';

const TokenEconomy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <TokenHeroSection />
        <TokenDistributionSection />
        <EarningOpportunitiesSection />
        <TokenUtilitySection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
};

export default TokenEconomy;
