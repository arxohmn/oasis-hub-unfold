
import React, { useState, useEffect } from 'react';
import EventFilters, { FiltersType } from './EventFilters';
import EventCard, { EventType } from './EventCard';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const EventCalendar: React.FC = () => {
  const [filters, setFilters] = useState<FiltersType>({
    category: 'All',
    dateRange: {
      from: undefined,
      to: undefined
    },
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
          id: 'prata-vetra-mezaparks',
          title: 'Prāta Vētra koncerts Mežaparkā',
          description: 'Grupas "Prāta Vētra" koncerts Rīgas Mežaparka Lielajā estrādē. Jaunā albuma "Gads bez kalendāra" prezentācija un vislabākās dziesmas no visu laiku repertuāra.',
          image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800',
          date: new Date(2025, 6, 26, 19, 0),
          location: {
            country: 'Latvia',
            city: 'Riga',
            venue: 'Mežaparks Open-Air Stage'
          },
          category: 'Music',
          price: {
            range: '25-50',
            value: 35
          },
          friends: {
            interested: 8,
            going: 4
          },
          ticketUrl: 'https://www.ekase.lv/lv/biletes/vietu-izvele/?performance=2915',
          detailsUrl: '/events/prata-vetra-mezaparks'
        },
        // Three new events added for May 12 - May 31
        {
          id: 'baltic-jazz-festival',
          title: 'Baltic Jazz Festival',
          description: 'Annual jazz festival featuring the best jazz musicians from the Baltic states and international guests.',
          image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800',
          date: new Date(2025, 4, 15, 18, 0), // May 15, 2025
          location: {
            country: 'Estonia',
            city: 'Tallinn',
            venue: 'Telliskivi Creative City'
          },
          category: 'Music',
          price: {
            range: '25-50',
            value: 30
          },
          friends: {
            interested: 5,
            going: 2
          },
          ticketUrl: 'https://www.piletilevi.ee/est/piletid/',
          detailsUrl: '/events/baltic-jazz-festival'
        },
        {
          id: 'latvian-design-exhibition',
          title: 'Contemporary Latvian Design Exhibition',
          description: 'Showcasing the latest innovations in Latvian design, from furniture and household items to fashion and digital design.',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800',
          date: new Date(2025, 4, 20, 10, 0), // May 20, 2025
          location: {
            country: 'Latvia',
            city: 'Riga',
            venue: 'National Museum of Art'
          },
          category: 'Exhibitions',
          price: {
            range: '<25',
            value: 8
          },
          friends: {
            interested: 3,
            going: 1
          },
          ticketUrl: 'https://www.lnmm.lv/en/visit/tickets',
          detailsUrl: '/events/latvian-design-exhibition'
        },
        {
          id: 'vilnius-street-food-festival',
          title: 'Vilnius Street Food Festival',
          description: 'A weekend-long celebration of street food from around the world, with a special focus on Lithuanian and Baltic cuisine.',
          image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800',
          date: new Date(2025, 4, 28, 12, 0), // May 28, 2025
          location: {
            country: 'Lithuania',
            city: 'Vilnius',
            venue: 'Cathedral Square'
          },
          category: 'Food',
          price: {
            range: 'Free',
            value: 0
          },
          friends: {
            interested: 7,
            going: 3
          },
          detailsUrl: '/events/vilnius-street-food-festival'
        },
        {
          id: '1',
          title: 'Baltic Electronic Music Festival',
          description: 'Three days of cutting edge electronic music from around the Baltic region featuring top DJs and producers.',
          image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800',
          date: new Date(2025, 4, 14, 19, 0), // Updated from June to May 14
          location: {
            country: 'Latvia',
            city: 'Riga',
            venue: 'Palladium Concert Hall'
          },
          category: 'Music',
          price: {
            range: '25-50',
            value: 39.99
          },
          friends: {
            interested: 3,
            going: 2
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
          },
          friends: {
            interested: 1,
            going: 0
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
          title: 'Baltic Food Festival for Young People',
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
          },
          friends: {
            interested: 0,
            going: 4
          }
        },
        {
          id: '5',
          title: 'Digital Art Workshop',
          description: 'Learn cutting-edge digital art techniques from industry professionals in this hands-on workshop.',
          image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800',
          date: new Date(2025, 4, 25, 10, 0), // Updated from June to May 25
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
          },
          friends: {
            interested: 2,
            going: 1
          }
        },
        {
          id: '7',
          title: 'Classical Music Symphony',
          description: 'Experience the Baltic Philharmonic Orchestra performing masterpieces by Beethoven and local composers.',
          image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800',
          date: new Date(2025, 5, 28, 19, 0),
          location: {
            country: 'Lithuania',
            city: 'Vilnius',
            venue: 'National Philharmonic Hall'
          },
          category: 'Music',
          price: {
            range: '50-100',
            value: 65
          },
          friends: {
            interested: 1,
            going: 1
          }
        },
        {
          id: '8',
          title: 'Urban Photography Walk',
          description: 'Join professional photographers for a guided tour through historical districts capturing unique urban moments.',
          image: 'https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800',
          date: new Date(2025, 6, 2, 11, 0),
          location: {
            country: 'Latvia',
            city: 'Riga',
            venue: 'Old Town'
          },
          category: 'Workshops',
          price: {
            range: '<25',
            value: 15
          },
          friends: {
            interested: 5,
            going: 0
          }
        },
        {
          id: '9',
          title: 'Baltic Book Fair',
          description: 'The largest literary event in the region with author signings, readings, and panel discussions.',
          image: 'https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?auto=format&fit=crop&w=800',
          date: new Date(2025, 6, 5, 10, 0),
          location: {
            country: 'Estonia',
            city: 'Tallinn',
            venue: 'Culture Hub'
          },
          category: 'Workshops', // Changed from 'Education' to valid category
          price: {
            range: 'Free',
            value: 0
          }
        },
        {
          id: '10',
          title: 'Street Art Festival',
          description: 'International and local artists transform city walls with stunning murals and installations.',
          image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=800',
          date: new Date(2025, 6, 10, 9, 0),
          location: {
            country: 'Latvia',
            city: 'Riga',
            venue: 'Creative District'
          },
          category: 'Music', // Changed from 'Art' to valid category
          price: {
            range: 'Free',
            value: 0
          },
          friends: {
            interested: 6,
            going: 3
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
                       !!(filters.dateRange?.from) || 
                       filters.priceRange !== 'All';
    
    setShowGroupPlanningButton(hasFilters);
  }, [filters]);
  
  const filteredEvents = events.filter(event => {
    // Filter by category
    if (filters.category !== 'All' && event.category !== filters.category) {
      return false;
    }
    
    // Filter by date range - adding null checks
    if (filters.dateRange?.from && filters.dateRange?.to) {
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
        title: "Group matcher link created!",
        description: "Link copied to clipboard. Share with your friends to start voting on events.",
      });
    }).catch(() => {
      toast({
        title: "Group matcher link created!",
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
                Create Group Matcher
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
