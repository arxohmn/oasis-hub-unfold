
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center pb-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-oasis-dark-blue to-oasis-dark z-0"></div>
      <div className="absolute inset-0 bg-hero-pattern opacity-20 z-0"></div>
      
      {/* Animated circles */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-oasis-cyan/20 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 left-1/3 w-72 h-72 rounded-full bg-oasis-magenta/20 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 left-1/4 w-56 h-56 rounded-full bg-oasis-green/20 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 neon-text animate-neon-pulse">
          oasis.hub
        </h1>
        <p className="text-2xl md:text-3xl mb-8 max-w-2xl mx-auto">
          <span className="font-bold text-white">Scroll less.</span>
          <span className="font-bold ml-2 neon-text">Live more.</span>
        </p>
        <p className="mb-12 text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
          Discover events that match your interests, connect with like-minded people,
          and find your next cultural adventure.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="bg-gradient-to-r from-oasis-cyan to-oasis-magenta hover:opacity-90 text-black font-bold px-8 py-6 text-lg">
            <Link to="/events">Discover Events</Link>
          </Button>
          <Button variant="outline" asChild className="neon-border px-8 py-6 text-lg">
            <Link to="/deals">Browse Deals</Link>
          </Button>
        </div>
      </div>
      
      {/* Bottom tagline */}
      <div className="absolute bottom-8 w-full text-center">
        <p className="text-sm text-gray-400">Your cultural compass in the Baltics</p>
      </div>
    </div>
  );
};

export default Hero;
