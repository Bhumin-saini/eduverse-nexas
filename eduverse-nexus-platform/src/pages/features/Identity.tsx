
import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import IdentityHero from '../../components/identity/IdentityHero';
import IdentityFeatures from '../../components/identity/IdentityFeatures';
import HowItWorks from '../../components/identity/HowItWorks';
import UseCases from '../../components/identity/UseCases';
import IdentityCTA from '../../components/identity/IdentityCTA';

const IdentityDemo = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <IdentityHero />
        <IdentityFeatures />
        <HowItWorks />
        <UseCases />
        <IdentityCTA />
      </main>
      <Footer />
    </div>
  );
};

export default IdentityDemo;
