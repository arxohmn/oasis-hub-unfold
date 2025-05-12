
import React, { useState, useEffect } from 'react';
import EventFilters, { FiltersType } from './EventFilters';
import EventCard, { EventType } from './EventCard';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const EventCalendar: React.FC = () => {
  const [filters, setFilters] = useState<FiltersType>({
    category: 'All',
    dateRange: {},
    location: {
      country: 'Latvia',
      city: 'Riga'
    },
    priceRange: 'All'
  });
  
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGroupPlanningButton, setShowGroupPlanningButton] = useState(false);
  
  // Simulated event data - In a real app, this would come from an API
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      const mockEvents: EventType[] = [
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
        },
        {
          id: '4',
          title: 'Baltic Food Festival',
          description: 'Experience the best of Baltic cuisine with tastings, cooking demonstrations, and workshops.',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800',
          date: new Date(2025, 5, 22, 12, 0),
          location: {
            country: 'Latvia',
            city: 'Riga',
            venue: 'Central Market'
          },
          category: 'Food',
          price: {
            range: '<25',
            value: 15
          }
        },
        {
          id: '5',
          title: 'Digital Art Workshop',
          description: 'Learn cutting-edge digital art techniques from industry professionals in this hands-on workshop.',
          image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800',
          date: new Date(2025, 5, 25, 10, 0),
          location: {
            country: 'Latvia',
            city: 'Riga',
            venue: 'Creative Quarters'
          },
          category: 'Workshops',
          price: {
            range: '50-100',
            value: 75
          }
        },
        {
          id: '6',
          title: 'Stand-up Comedy Night',
          description: 'Laugh out loud with the best comedians from the Baltic states in this multilingual comedy show.',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800',
          date: new Date(2025, 5, 26, 21, 0),
          location: {
            country: 'Estonia',
            city: 'Tallinn',
            venue: 'Comedy Club'
          },
          category: 'Comedy',
          price: {
            range: '<25',
            value: 20
          }
        }
      ];
      
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Show group planning button when filters are applied
    const hasFilters = filters.category !== 'All' || 
                       !!filters.dateRange.from || 
                       filters.priceRange !== 'All';
    
    setShowGroupPlanningButton(hasFilters);
  }, [filters]);
  
  const filteredEvents = events.filter(event => {
    // Filter by category
    if (filters.category !== 'All' && event.category !== filters.category) {
      return false;
    }
    
    // Filter by date range
    if (filters.dateRange.from && filters.dateRange.to) {
      const eventDate = new Date(event.date);
      if (eventDate < filters.dateRange.from || eventDate > filters.dateRange.to) {
        return false;
      }
    }
    
    // Filter by location
    if (
      filters.location.country !== event.location.country ||
      filters.location.city !== event.location.city
    ) {
      return false;
    }
    
    // Filter by price range
    if (filters.priceRange !== 'All') {
      if (filters.priceRange === 'Free' && event.price.range !== 'Free') {
        return false;
      } else if (filters.priceRange === '<25' && (event.price.value && event.price.value >= 25)) {
        return false;
      } else if (filters.priceRange === '25-50' && (event.price.value && (event.price.value < 25 || event.price.value > 50))) {
        return false;
      } else if (filters.priceRange === '50-100' && (event.price.value && (event.price.value < 50 || event.price.value > 100))) {
        return false;
      } else if (filters.priceRange === '100-150' && (event.price.value && (event.price.value < 100 || event.price.value > 150))) {
        return false;
      } else if (filters.priceRange === '150+' && (event.price.value && event.price.value < 150)) {
        return false;
      }
    }
    
    return true;
  });
  
  const handleFiltersChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
  };
  
  const handleCreateGroupPlan = () => {
    if (filteredEvents.length === 0) {
      toast({
        title: "No events to share",
        description: "Adjust your filters to find events for group planning",
        variant: "destructive"
      });
      return;
    }
    
    // Generate a unique ID for the event match
    const matchId = `match-${Date.now()}`;
    
    // In a real app, we would save this data to the database
    // For now, we'll just show a success message with copy-to-clipboard functionality
    
    const shareableLink = `${window.location.origin}/event-match/${matchId}`;
    
    // Copy link to clipboard
    navigator.clipboard.writeText(shareableLink).then(() => {
      toast({
        title: "Group planning link created!",
        description: "Link copied to clipboard. Share with your friends to start voting on events.",
      });
    }).catch(() => {
      toast({
        title: "Group planning link created!",
        description: shareableLink,
      });
    });
  };
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <EventFilters onFiltersChange={handleFiltersChange} />
          
          {showGroupPlanningButton && (
            <div className="mt-6 glass-effect p-5 rounded-lg">
              <h3 className="text-lg font-bold mb-3 neon-text">Plan with Friends</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Share these events with friends and vote together to decide which one to attend.
              </p>
              <Button 
                onClick={handleCreateGroupPlan}
                className="w-full bg-gradient-to-r from-oasis-magenta to-oasis-green text-black"
              >
                Create Group Plan
              </Button>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-neon-pulse neon-text text-xl">Loading events...</div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="glass-effect rounded-lg p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No events found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to find events.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
