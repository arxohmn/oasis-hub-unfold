
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Ticket, ArrowRight } from 'lucide-react';
import { EventType } from '@/components/events/EventCard';
import { Card, CardContent } from '@/components/ui/card';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call to get the event details
    const timer = setTimeout(() => {
      if (id === 'prata-vetra-mezaparks') {
        setEvent({
          id: 'prata-vetra-mezaparks',
          title: 'Prāta Vētra koncerts Mežaparkā',
          description: `Grupas "Prāta Vētra" koncerts Rīgas Mežaparka Lielajā estrādē. Jaunā albuma "Gads bez kalendāra" prezentācija un vislabākās dziesmas no visu laiku repertuāra.
          
          Prāta Vētra jeb Brainstorm ir viens no pazīstamākajiem Latvijas mūzikas eksportiem. Grupa dibināta 1989. gadā Jelgavā, un to veido Renārs Kaupers, Jānis Jubalts, Kaspars Roga un Māris Mihelsons.
          
          Koncertā skanēs gan jaunās dziesmas no albuma "Gads bez kalendāra", gan klausītāju iemīļotie hiti "Lidmašīnas", "Četri krasti", "Maybe", "Waterfall" un citas leģendārās dziesmas.
          
          Durvis tiks atvērtas 2 stundas pirms koncerta sākuma. Iesakām ierasties laicīgi, lai izvairītos no drūzmas un pilnībā izbaudītu koncerta pieredzi.`,
          image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200',
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
          ticketUrl: 'https://www.ekase.lv/lv/biletes/vietu-izvele/?performance=2915'
        });
      }
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto flex justify-center">
          <div className="animate-neon-pulse neon-text text-xl">Loading event details...</div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <Card className="glass-effect max-w-3xl mx-auto p-8">
            <CardContent className="text-center">
              <h2 className="text-2xl font-bold mb-4">Event Not Found</h2>
              <p className="mb-6">Sorry, we couldn't find the event you're looking for.</p>
              <Button asChild>
                <Link to="/events">Back to Events</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Event header */}
          <div className="mb-8">
            <Link to="/events" className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
              <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
              Back to Events
            </Link>
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <span className="category-tag mb-4">{event.category}</span>
          </div>

          {/* Event image */}
          <div className="relative rounded-lg overflow-hidden mb-8 h-[400px]">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Event details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="glass-effect mb-8">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">About this event</h2>
                  <div className="whitespace-pre-line">
                    {event.description}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-1">
              <Card className="glass-effect sticky top-24">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Calendar className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold">Date and time</h3>
                      <p>{formatDate(event.date)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-6">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-bold">Location</h3>
                      <p>{event.location.venue}</p>
                      <p>{event.location.city}, {event.location.country}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-bold mb-2">Price</h3>
                    <p className="text-2xl">€{event.price.value}</p>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-oasis-cyan to-oasis-magenta text-black font-bold flex items-center justify-center gap-2 mb-2"
                    onClick={() => window.open(event.ticketUrl, '_blank')}
                  >
                    <Ticket className="h-4 w-4" /> Buy Tickets
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
