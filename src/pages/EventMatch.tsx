
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { EventType } from '@/components/events/EventCard';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const EventMatch: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<EventType[]>([]);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [username, setUsername] = useState('');
  const [usernameSubmitted, setUsernameSubmitted] = useState(false);
  const [votedEvents, setVotedEvents] = useState<{[key: string]: boolean}>({});
  const [results, setResults] = useState<{[key: string]: number}>({});
  const [showResults, setShowResults] = useState(false);
  
  // Fetch events based on match ID
  useEffect(() => {
    // In a real app, this would come from an API based on the match ID
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
        }
      ];
      
      // Initialize results object
      const initialResults: {[key: string]: number} = {};
      mockEvents.forEach(event => {
        initialResults[event.id] = 0;
      });
      
      setEvents(mockEvents);
      setResults(initialResults);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleVote = (liked: boolean) => {
    if (currentEventIndex >= events.length) return;
    
    const eventId = events[currentEventIndex].id;
    
    // Update voted events
    setVotedEvents(prev => ({
      ...prev,
      [eventId]: liked
    }));
    
    // Update results
    if (liked) {
      setResults(prev => ({
        ...prev,
        [eventId]: prev[eventId] + 1
      }));
    }
    
    // Move to next event
    if (currentEventIndex < events.length - 1) {
      setCurrentEventIndex(prev => prev + 1);
    } else {
      // All events have been voted on
      setShowResults(true);
      toast({
        title: "Voting complete!",
        description: "You've voted on all events. Check out the results!"
      });
    }
  };
  
  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setUsernameSubmitted(true);
      toast({
        title: "Welcome to Event Tinder!",
        description: "Swipe right on events you'd like to attend with your friends."
      });
    }
  };
  
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  const getCurrentEvent = () => {
    return events[currentEventIndex];
  };
  
  // Get sorted results for display
  const getSortedResults = () => {
    return Object.entries(results)
      .sort(([, a], [, b]) => b - a)
      .map(([eventId]) => events.find(event => event.id === eventId));
  };
  
  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto flex items-center justify-center h-64">
          <div className="animate-neon-pulse neon-text text-xl">Loading events...</div>
        </div>
      </div>
    );
  }
  
  if (!usernameSubmitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-md">
          <div className="glass-effect p-8 rounded-lg">
            <h1 className="text-3xl font-bold mb-6 neon-text">Event Tinder</h1>
            <p className="text-muted-foreground mb-6">
              Your friend has invited you to help decide on an event to attend together. Enter your name to start voting!
            </p>
            
            <form onSubmit={handleUsernameSubmit} className="space-y-4">
              <div>
                <label htmlFor="username" className="block mb-2">Your Name</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-2 rounded-md bg-card border border-border"
                />
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-oasis-cyan to-oasis-magenta text-black font-bold"
              >
                Start Voting
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
  if (showResults) {
    const sortedEvents = getSortedResults();
    const topEvent = sortedEvents[0];
    
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2 neon-text">Results</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Based on everyone's votes, here are the top events
          </p>
          
          {topEvent && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Top Choice</h2>
              <div className="glass-effect p-6 rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-oasis-green px-4 py-2 rounded-bl-lg">
                  {results[topEvent.id]} votes
                </div>
                
                <div className="md:flex gap-6">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <img 
                      src={topEvent.image} 
                      alt={topEvent.title} 
                      className="w-full h-64 object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="md:w-2/3">
                    <div className="mb-4">
                      <span className="category-tag">{topEvent.category}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2">{topEvent.title}</h3>
                    <p className="text-muted-foreground mb-4">{topEvent.description}</p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-oasis-cyan">{formatDate(topEvent.date)}</span>
                      </div>
                      <div>
                        <span>{topEvent.location.venue}, {topEvent.location.city}, {topEvent.location.country}</span>
                      </div>
                      <div>
                        <span className="font-medium">Price: </span>
                        <span className="text-oasis-green">{topEvent.price.range === 'Free' ? 'Free' : `€${topEvent.price.value}`}</span>
                      </div>
                    </div>
                    
                    <Button className="bg-gradient-to-r from-oasis-cyan to-oasis-magenta text-black font-bold">
                      Share This Event
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {sortedEvents.slice(1).length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Other Choices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedEvents.slice(1).map(event => event && (
                  <div key={event.id} className="glass-effect p-4 rounded-lg relative">
                    <div className="absolute top-0 right-0 bg-oasis-cyan/20 px-2 py-1 rounded-bl-lg">
                      {results[event.id]} votes
                    </div>
                    
                    <div className="mb-2">
                      <span className="category-tag text-sm">{event.category}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{event.description}</p>
                    
                    <div className="text-sm">
                      <div>{formatDate(event.date)}</div>
                      <div>{event.location.city}, {event.location.country}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  const currentEvent = getCurrentEvent();
  
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-2 neon-text">Event Tinder</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Hi {username}! Swipe through events to help decide with your friends.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <div className="glass-effect p-6 rounded-lg">
              <div className="mb-4">
                <span className="category-tag">{currentEvent.category}</span>
                <span className="ml-2 text-sm text-muted-foreground">
                  Event {currentEventIndex + 1} of {events.length}
                </span>
              </div>
              
              <div className="mb-6">
                <img 
                  src={currentEvent.image} 
                  alt={currentEvent.title} 
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
                
                <h2 className="text-2xl font-bold mb-2">{currentEvent.title}</h2>
                <p className="text-muted-foreground mb-4">{currentEvent.description}</p>
              </div>
              
              <div className="space-y-2 mb-8">
                <div className="flex items-center gap-2">
                  <span className="text-oasis-cyan">{formatDate(currentEvent.date)}</span>
                </div>
                <div>
                  <span>{currentEvent.location.venue}, {currentEvent.location.city}, {currentEvent.location.country}</span>
                </div>
                <div>
                  <span className="font-medium">Price: </span>
                  <span className="text-oasis-green">{currentEvent.price.range === 'Free' ? 'Free' : `€${currentEvent.price.value}`}</span>
                </div>
              </div>
              
              <div className="flex justify-center gap-4">
                <Button 
                  onClick={() => handleVote(false)}
                  variant="outline"
                  size="lg"
                  className="bg-red-500/10 hover:bg-red-500/20 border-red-500/30 w-full max-w-xs"
                >
                  <ThumbsDown className="mr-2" />
                  Not Interested
                </Button>
                
                <Button 
                  onClick={() => handleVote(true)}
                  size="lg"
                  className="bg-oasis-green hover:bg-oasis-green/90 text-black w-full max-w-xs"
                >
                  <ThumbsUp className="mr-2" />
                  Interested
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventMatch;
