
import React from 'react';
import EventCalendar from '@/components/events/EventCalendar';

const Events = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-2 neon-text">Events Calendar</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Find and filter cultural events across the Baltics
        </p>
        <EventCalendar />
      </div>
    </div>
  );
};

export default Events;
