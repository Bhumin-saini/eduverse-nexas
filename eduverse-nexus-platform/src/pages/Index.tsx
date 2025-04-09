
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import TokenEconomy from '../components/TokenEconomy';
import IdentityPreview from '../components/IdentityPreview';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <TokenEconomy />
        <IdentityPreview />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
