
import React from 'react';
import Hero from '@/components/landing/Hero';
import EventCard, { EventType } from '@/components/events/EventCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import LastMinuteDeals from '@/components/deals/LastMinuteDeals';

const Index = () => {
  // Sample featured events
  const featuredEvents: EventType[] = [
    {
      id: '1',
      title: 'Baltic Electronic Music Festival',
      description: 'Three days of cutting edge electronic music from around the Baltic region featuring top DJs and producers.',
      image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800',
      date: new Date(2025, 5, 15, 19, 0),
      location: {
        country: 'Latvia',
        city: 'Riga',
        venue: 'Palladium Concert Hall'
      },
      category: 'Music',
      price: {
        range: '25-50',
        value: 39.99
      }
    },
    {
      id: '2',
      title: 'Modern Baltic Cinema Exhibition',
      description: 'A curated selection of groundbreaking films from Estonia, Latvia and Lithuania, with director Q&As.',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800',
      date: new Date(2025, 5, 18, 17, 30),
      location: {
        country: 'Estonia',
        city: 'Tallinn',
        venue: 'Sõprus Cinema'
      },
      category: 'Film',
      price: {
        range: 'Free',
        value: 0
      }
    },
    {
      id: '3',
      title: 'Contemporary Dance Performance',
      description: 'Award-winning choreographers present innovative dance pieces exploring themes of identity and connection.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800',
      date: new Date(2025, 5, 20, 20, 0),
      location: {
        country: 'Lithuania',
        city: 'Vilnius',
        venue: 'Arts Printing House'
      },
      category: 'Dance',
      price: {
        range: '25-50',
        value: 28.50
      }
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Featured Events Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold neon-text">Featured Events</h2>
            <Button asChild variant="outline" className="neon-border">
              <Link to="/events">View All Events</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Last Minute Deals Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-oasis-cyan/5 via-oasis-magenta/5 to-oasis-green/5">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold neon-text">Last Minute Deals</h2>
            <Button asChild variant="outline" className="neon-border">
              <Link to="/deals">View All Deals</Link>
            </Button>
          </div>
          
          <LastMinuteDeals />
        </div>
      </section>

      {/* Slogan Banner */}
      <section className="py-20 px-4 bg-gradient-to-r from-oasis-cyan/20 via-oasis-magenta/20 to-oasis-green/20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Scroll less.</span>
            <span className="neon-text ml-2">Live more.</span>
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-gray-300">
            Find your next cultural experience in the Baltics.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-oasis-cyan to-oasis-magenta hover:opacity-90 text-black font-bold">
            <Link to="/events">Explore Events</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
