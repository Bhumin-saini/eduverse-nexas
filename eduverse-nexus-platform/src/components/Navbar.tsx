
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import WalletConnect from './WalletConnect';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-eduverse-primary">Edu<span className="text-eduverse-secondary">Verse</span></span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/about" className="text-gray-600 hover:text-eduverse-primary px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <div className="relative group">
                <button className="text-gray-600 group-hover:text-eduverse-primary px-3 py-2 rounded-md text-sm font-medium flex items-center">
                  Features <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <Link to="/features/academics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Academic Dashboard</Link>
                  <Link to="/features/token" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">EduPoints Economy</Link>
                  <Link to="/features/identity" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Digital Identity</Link>
                  <Link to="/features/learning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Collaborative Learning</Link>
                </div>
              </div>
              <Link to="/dao" className="text-gray-600 hover:text-eduverse-primary px-3 py-2 rounded-md text-sm font-medium">DAO Governance</Link>
              <Link to="/alumni" className="text-gray-600 hover:text-eduverse-primary px-3 py-2 rounded-md text-sm font-medium">Alumni Network</Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <WalletConnect />
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2 rounded-md text-gray-600 hover:text-eduverse-primary focus:outline-none">
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-eduverse-primary">About</Link>
            <Link to="/features/academics" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-eduverse-primary">Academic Dashboard</Link>
            <Link to="/features/token" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-eduverse-primary">EduPoints Economy</Link>
            <Link to="/features/identity" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-eduverse-primary">Digital Identity</Link>
            <Link to="/features/learning" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-eduverse-primary">Collaborative Learning</Link>
            <Link to="/dao" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-eduverse-primary">DAO Governance</Link>
            <Link to="/alumni" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-eduverse-primary">Alumni Network</Link>
            <div className="mt-4">
              <WalletConnect />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
