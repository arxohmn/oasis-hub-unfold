
import React, { useState, useEffect } from 'react';
import NewsCard, { NewsType } from './NewsCard';
import { Button } from '@/components/ui/button';
import { CategoryType } from '../events/EventFilters';

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories: string[] = [
    'All', 'Music', 'Film', 'Theatre', 'Exhibitions', 'Food', 'Guides'
  ];
  
  // Simulated news data - In a real app, this would come from an API
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      const mockNews: NewsType[] = [
        {
          id: '1',
          title: "Summer Music Festivals You Can't Miss in the Baltics",
          excerpt: "From Tallinn to Vilnius, we explore the most exciting music festivals happening across the Baltic states this summer season.",
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, eu euismod nunc nisl eu nisl.',
          image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800',
          publishDate: new Date(2025, 4, 10),
          author: {
            name: 'Laura Kalnina',
            avatar: 'https://i.pravatar.cc/150?img=32'
          },
          categories: ['Music'],
          type: 'guide'
        },
        {
          id: '2',
          title: 'Interview with Award-Winning Lithuanian Director Saulius Berzinis',
          excerpt: 'We sat down with the acclaimed filmmaker to discuss his latest project and the state of Baltic cinema on the international stage.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, eu euismod nunc nisl eu nisl.',
          image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800',
          publishDate: new Date(2025, 4, 15),
          author: {
            name: 'Tomas Zemaitis'
          },
          categories: ['Film'],
          type: 'interview'
        },
        {
          id: '3',
          title: 'Riga Contemporary Art Festival Announces 2025 Program',
          excerpt: 'The biennial event will feature over 50 artists from the Baltics and beyond, exploring themes of identity and sustainability.',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, eu euismod nunc nisl eu nisl.',
          image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800',
          publishDate: new Date(2025, 4, 20),
          author: {
            name: 'Anna Berzina',
            avatar: 'https://i.pravatar.cc/150?img=23'
          },
          categories: ['Exhibitions'],
          type: 'announcement'
        },
        {
          id: '4',
          title: "Event Recap: Baltic Electronic Music Summit Brings Together Region's Top Talent",
          excerpt: "Last weekend's summit in Tallinn showcased emerging artists and industry veterans in a celebration of Baltic electronic music.",
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, eu euismod nunc nisl eu nisl.',
          image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800',
          publishDate: new Date(2025, 4, 25),
          author: {
            name: 'Mart Tamm'
          },
          categories: ['Music'],
          type: 'recap'
        },
        {
          id: '5',
          title: 'Top 5 Hidden Culinary Gems in Vilnius',
          excerpt: "Our food expert guides you through the lesser-known but exceptional dining spots in Lithuania's capital.",
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, eu euismod nunc nisl eu nisl.',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800',
          publishDate: new Date(2025, 4, 28),
          author: {
            name: 'Elena Vaitiekūnaitė',
            avatar: 'https://i.pravatar.cc/150?img=25'
          },
          categories: ['Food'],
          type: 'recommendation'
        },
        {
          id: '6',
          title: 'Behind the Scenes: Preparing for the Baltic Dance Festival',
          excerpt: "We follow the organizers and performers as they prepare for one of the region's most anticipated dance events.",
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod, nisi vel consectetur interdum, nisl nunc egestas nisi, eu euismod nunc nisl eu nisl.',
          image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800',
          publishDate: new Date(2025, 5, 2),
          author: {
            name: 'Kristaps Ozolins'
          },
          categories: ['Dance'],
          type: 'interview'
        }
      ];
      
      setNews(mockNews);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const filteredNews = activeCategory === 'All'
    ? news
    : news.filter(item => item.categories.includes(activeCategory as CategoryType) || 
                         (activeCategory === 'Guides' && item.type === 'guide'));
  
  const featuredNews = filteredNews.length > 0 ? filteredNews[0] : null;
  const regularNews = filteredNews.length > 1 ? filteredNews.slice(1) : [];
  
  return (
    <div className="w-full">
      {/* Category filters */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className={
                activeCategory === category 
                  ? "bg-gradient-to-r from-oasis-cyan to-oasis-magenta text-black" 
                  : ""
              }
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-neon-pulse neon-text text-xl">Loading news...</div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Featured news */}
          {featuredNews && (
            <div className="mb-12">
              <NewsCard news={featuredNews} isFeatured={true} />
            </div>
          )}
          
          {/* Regular news grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
