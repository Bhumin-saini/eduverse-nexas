
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Wallet, BookOpen, BookCheck, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-eduverse-primary to-eduverse-secondary py-16 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About EduVerse</h1>
              <p className="text-xl max-w-3xl mx-auto text-blue-100">
                Revolutionizing education through blockchain technology and decentralized infrastructure
              </p>
            </div>
          </div>
        </div>
        
        {/* Mission Statement */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                To empower students and educational institutions with transparent, portable, and verifiable academic credentials 
                while creating an incentivized ecosystem for academic achievement.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-eduverse-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Accessible Education</h3>
                <p className="text-gray-600">Breaking down barriers to educational resources and credentials verification</p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Token Economy</h3>
                <p className="text-gray-600">Incentivizing positive academic behaviors through EduPoints rewards</p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-purple-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookCheck className="h-8 w-8 text-eduverse-secondary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Verified Credentials</h3>
                <p className="text-gray-600">Ensuring academic achievements are securely stored and easily verifiable</p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-pink-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-eduverse-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2">Lifelong Learning</h3>
                <p className="text-gray-600">Supporting continuous education and skill development throughout life</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Technology Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Our Technology</h2>
                <p className="text-gray-600 mb-6">
                  EduVerse is built on cutting-edge blockchain technology, leveraging Arbitrum's Layer 3 solution for 
                  scalability and low transaction costs.
                </p>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-eduverse-primary text-white p-1 rounded-full mr-2 mt-1">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">ERC-20 token for the EduPoints ecosystem</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-eduverse-primary text-white p-1 rounded-full mr-2 mt-1">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Decentralized identity management for academic credentials</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-eduverse-primary text-white p-1 rounded-full mr-2 mt-1">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Smart contracts for automatic reward distribution and verification</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-eduverse-primary text-white p-1 rounded-full mr-2 mt-1">
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">DAO governance for community-driven decision making</span>
                  </li>
                </ul>
              </div>
              
              <div className="md:w-1/2">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <div className="bg-gray-200 h-full w-full rounded flex items-center justify-center">
                      <div className="text-center">
                        <div className="inline-block p-4 bg-eduverse-primary/10 rounded-full mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-eduverse-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <p className="text-gray-500">Blockchain Architecture Diagram</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-center">
                      <div className="bg-eduverse-primary/10 p-2 rounded">
                        <p className="font-semibold text-eduverse-primary">Student Layer</p>
                        <p className="text-gray-600">Wallets & Identity</p>
                      </div>
                      <div className="bg-eduverse-secondary/10 p-2 rounded">
                        <p className="font-semibold text-eduverse-secondary">Education Layer</p>
                        <p className="text-gray-600">Smart Contracts</p>
                      </div>
                      <div className="bg-eduverse-accent/10 p-2 rounded">
                        <p className="font-semibold text-eduverse-accent">Governance Layer</p>
                        <p className="text-gray-600">DAO Structure</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Section - Placeholder */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-12">
              A diverse group of educators, technologists, and blockchain experts working to transform education.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* Placeholder for team members */}
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="font-bold">Team Member {i+1}</h3>
                  <p className="text-gray-500 text-sm">Position Title</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
