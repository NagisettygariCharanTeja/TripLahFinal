import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Floating travel elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-blue-300 opacity-30 animate-bounce">
          ✈️
        </div>
        <div className="absolute top-32 right-16 text-blue-300 opacity-30 animate-pulse">
          🗺️
        </div>
        <div className="absolute bottom-40 left-20 text-blue-300 opacity-30 animate-bounce delay-1000">
          📍
        </div>
        <div className="absolute bottom-60 right-12 text-blue-300 opacity-30 animate-pulse delay-500">
          🏛️
        </div>
      </div>

      {/* Main content */}
      <div className="text-center z-10">
        {/* Logo container */}
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto bg-blue-500 rounded-full flex items-center justify-center shadow-2xl">
            <img 
              src="/Untitled design.svg" 
              alt="TripLah Logo" 
              className="w-32 h-32"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-black mb-12">
          TripLah!
        </h1>

        {/* CTA Button */}
        <Button
          onClick={() => navigate('/login')}
          size="lg"
          className="px-12 py-4 text-xl shadow-lg"
        >
          Let's begin
        </Button>
      </div>
    </div>
  );
};

export default SplashScreen;