
import React from 'react';
import LastMinuteDeals from '@/components/deals/LastMinuteDeals';

const Deals: React.FC = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          <span className="neon-text">Last Minute Deals</span>
        </h1>
        
        <p className="text-lg text-center mb-8 max-w-2xl mx-auto text-gray-300">
          Find special last-minute offers from venues and artists across the Baltics. 
          Great experiences at great prices!
        </p>
        
        <LastMinuteDeals />
      </div>
    </div>
  );
};

export default Deals;
