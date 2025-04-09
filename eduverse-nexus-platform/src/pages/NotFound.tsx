
import React from 'react';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16 bg-gray-50">
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-md">
          <h1 className="text-6xl font-bold text-eduverse-primary mb-4">404</h1>
          <p className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</p>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          <Button asChild className="edu-button-primary">
            <Link to="/">Return to Home</Link>
          </Button>
          
          <div className="mt-12 inline-block">
            <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow border border-gray-100">
              <div className="text-eduverse-primary font-bold mr-2">EDU</div>
              <div className="text-gray-600">
                <span className="text-xs">Lost? Earn 5 EduPoints for reporting this missing link</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
