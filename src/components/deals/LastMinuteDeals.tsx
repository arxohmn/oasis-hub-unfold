
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { Calendar, Ticket } from 'lucide-react';
import { CategoryType } from '../events/EventFilters';

interface DealType {
  id: string;
  title: string;
  description: string;
  venue: string;
  location: string;
  date: Date;
  price: string;
  originalPrice?: string;
  category: CategoryType;
  contactInfo: string;
}

const LastMinuteDeals: React.FC = () => {
  // Sample deals data - would come from API in a real app
  const [deals, setDeals] = useState<DealType[]>([
    {
      id: '1',
      title: 'Last 10 tickets - Baltic Jazz Night',
      description: 'Limited tickets available for tonight\'s jazz quartet performance. Special last-minute price!',
      venue: 'VEF Culture Palace',
      location: 'Riga, Latvia',
      date: new Date(2025, 5, 12, 20, 0),
      price: '€15',
      originalPrice: '€30',
      category: 'Music',
      contactInfo: 'tickets@vefpalace.lv'
    },
    {
      id: '2',
      title: 'Exhibition closing this weekend',
      description: 'Final days of our photography exhibition. Come see emerging Baltic photographers before it\'s gone!',
      venue: 'Fotografiska',
      location: 'Tallinn, Estonia',
      date: new Date(2025, 5, 14, 11, 0),
      price: '€8',
      category: 'Exhibitions',
      contactInfo: '+372 555 1234'
    },
    {
      id: '3',
      title: 'Contemporary Dance Workshop',
      description: 'Join our last-minute dance workshop with internationally acclaimed choreographer Maria Välbe. Perfect for beginners!',
      venue: 'Arts Printing House',
      location: 'Vilnius, Lithuania',
      date: new Date(2025, 5, 13, 18, 30),
      price: '€12',
      originalPrice: '€25',
      category: 'Dance',
      contactInfo: 'workshops@artsprinting.lt'
    }
  ]);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [venue, setVenue] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState<CategoryType>('Music');
  const [contactInfo, setContactInfo] = useState('');
  
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  const handleBuyTickets = (contactInfo: string) => {
    if (contactInfo.startsWith('http') || contactInfo.startsWith('www')) {
      window.open(contactInfo, '_blank');
    } else if (contactInfo.includes('@')) {
      window.location.href = `mailto:${contactInfo}`;
    } else if (/^\+?\d+$/.test(contactInfo.replace(/\s+/g, ''))) {
      window.location.href = `tel:${contactInfo.replace(/\s+/g, '')}`;
    } else {
      toast({
        title: "Contact Information",
        description: contactInfo,
      });
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title || !description || !venue || !date || !price || !category || !contactInfo) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Add new deal to the list
    const newDeal: DealType = {
      id: `${deals.length + 1}`,
      title,
      description,
      venue,
      location,
      date: new Date(date),
      price,
      originalPrice: originalPrice || undefined,
      category,
      contactInfo
    };
    
    setDeals([...deals, newDeal]);
    
    // Reset form
    setTitle('');
    setDescription('');
    setVenue('');
    setLocation('');
    setDate('');
    setPrice('');
    setOriginalPrice('');
    setCategory('Music');
    setContactInfo('');
    
    toast({
      title: "Deal added successfully",
      description: "Your last minute deal has been posted"
    });
  };
  
  const categories: CategoryType[] = [
    'Music', 'Film', 'Theatre', 'Dance', 'Exhibitions', 
    'Performances', 'Comedy', 'Kids & Youth', 'Workshops', 
    'Sports', 'Food'
  ];
  
  return (
    <div className="w-full">
      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-8">
          <TabsTrigger value="browse">Browse Deals</TabsTrigger>
          <TabsTrigger value="create">Post a Deal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse" className="focus-visible:outline-none focus-visible:ring-0">
          {deals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No last minute deals available right now.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.map(deal => (
                <div key={deal.id} className="glass-effect p-6 rounded-lg relative overflow-hidden group hover:scale-[1.01] transition-all">
                  {deal.originalPrice && (
                    <div className="absolute top-0 right-0 bg-oasis-magenta text-black font-bold px-4 py-1 rounded-bl-lg">
                      Save {deal.originalPrice}→{deal.price}
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <span className="category-tag">{deal.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
                  <p className="text-muted-foreground mb-4">{deal.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <span className="font-medium">Venue:</span>
                      <span>{deal.venue}, {deal.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-oasis-cyan" />
                      <span>{formatDate(deal.date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Price:</span>
                      <span className="text-oasis-green font-bold">{deal.price}</span>
                      {deal.originalPrice && (
                        <span className="text-muted-foreground line-through text-sm">{deal.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-gradient-to-r from-oasis-cyan to-oasis-magenta text-black font-bold"
                      onClick={() => handleBuyTickets(deal.contactInfo)}
                    >
                      <Ticket className="h-4 w-4 mr-2" /> Buy Tickets
                    </Button>
                    
                    <div className="text-sm text-center text-muted-foreground">
                      Contact: {deal.contactInfo}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="create" className="focus-visible:outline-none focus-visible:ring-0">
          <div className="glass-effect p-6 rounded-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Post a Last Minute Deal</h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Last 5 tickets for tonight's show" 
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide details about your offer" 
                  className="mt-1 h-24"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="venue">Venue *</Label>
                  <Input 
                    id="venue" 
                    value={venue} 
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="Venue name" 
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, Country" 
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date and Time *</Label>
                  <Input 
                    id="date" 
                    type="datetime-local" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full rounded-md border border-input bg-card px-3 py-2 mt-1"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Offer Price *</Label>
                  <Input 
                    id="price" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g., €15" 
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="originalPrice">Original Price (optional)</Label>
                  <Input 
                    id="originalPrice" 
                    value={originalPrice} 
                    onChange={(e) => setOriginalPrice(e.target.value)}
                    placeholder="e.g., €30" 
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="contactInfo">Contact Info *</Label>
                <Input 
                  id="contactInfo" 
                  value={contactInfo} 
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="Email, phone, or ticket link" 
                  className="mt-1"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-oasis-cyan to-oasis-magenta text-black font-bold"
              >
                Post Deal
              </Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LastMinuteDeals;
