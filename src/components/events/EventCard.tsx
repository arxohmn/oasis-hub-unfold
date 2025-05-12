
import React from 'react';
import { Button } from '@/components/ui/button';
import { CategoryType, PriceRange } from './EventFilters';
import { Calendar, Users, Ticket } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

export interface EventType {
  id: string;
  title: string;
  description: string;
  image: string;
  date: Date;
  location: {
    country: string;
    city: string;
    venue: string;
  };
  category: CategoryType;
  price: {
    range: PriceRange;
    value?: number;
  };
  friends?: {
    interested: number;
    going: number;
  };
  ticketUrl?: string;
  detailsUrl?: string;
}

interface EventCardProps {
  event: EventType;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  const totalFriends = event.friends ? event.friends.interested + event.friends.going : 0;

  const handleViewDetails = () => {
    const url = event.detailsUrl || `/events/${event.id}`;
    console.log("Navigating to:", url);
    navigate(url);
  };

  const handleBuyTickets = () => {
    if (event.ticketUrl) {
      window.open(event.ticketUrl, '_blank');
    } else {
      toast({
        title: "Ticket link unavailable",
        description: "Ticket purchase link is not available for this event yet.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="group flex flex-col h-full overflow-hidden neon-border rounded-lg transition-all duration-300 hover:scale-[1.02]">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          <span className="price-tag">
            {event.price.range === 'Free' ? 'Free' : `€${event.price.value || event.price.range}`}
          </span>
        </div>
        
        {totalFriends > 0 && (
          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md flex items-center text-white text-sm">
            <Users className="h-3 w-3 mr-1 text-oasis-cyan" />
            <span>{totalFriends} friend{totalFriends !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 p-4 bg-card">
        <div className="flex justify-between items-start mb-3">
          <span className="category-tag">{event.category}</span>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(event.date)}
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{event.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{event.description}</p>
        
        <div className="text-sm text-muted-foreground mb-4">
          {event.location.venue}, {event.location.city}
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button 
            variant="default" 
            className="w-full bg-gradient-to-r from-oasis-cyan to-oasis-magenta text-black"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
          
          {event.price.range === 'Free' ? (
            <Button 
              variant="outline" 
              className="w-full neon-border"
              disabled
            >
              Free Event
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="w-full neon-border"
              onClick={handleBuyTickets}
            >
              <Ticket className="h-4 w-4 mr-2" /> Buy Tickets
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
