
import React from 'react';
import { Button } from '@/components/ui/button';
import { CategoryType } from '../events/EventFilters';

export interface NewsType {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  publishDate: Date;
  author: {
    name: string;
    avatar?: string;
  };
  categories: CategoryType[];
  type: 'announcement' | 'recap' | 'interview' | 'guide' | 'recommendation';
}

interface NewsCardProps {
  news: NewsType;
  isFeatured?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, isFeatured = false }) => {
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  if (isFeatured) {
    return (
      <div className="group relative rounded-lg overflow-hidden neon-border h-[500px] hover:scale-[1.01] transition-all">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0">
          <img 
            src={news.image} 
            alt={news.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            {news.type === 'announcement' && (
              <span className="bg-oasis-magenta/80 text-white px-3 py-1 text-sm font-medium rounded-full">
                New Event
              </span>
            )}
            {news.type === 'recap' && (
              <span className="bg-oasis-cyan/80 text-black px-3 py-1 text-sm font-medium rounded-full">
                Event Recap
              </span>
            )}
            {news.type === 'interview' && (
              <span className="bg-oasis-green/80 text-black px-3 py-1 text-sm font-medium rounded-full">
                Interview
              </span>
            )}
            {news.type === 'guide' && (
              <span className="bg-yellow-400/80 text-black px-3 py-1 text-sm font-medium rounded-full">
                Guide
              </span>
            )}
            {news.type === 'recommendation' && (
              <span className="bg-purple-500/80 text-white px-3 py-1 text-sm font-medium rounded-full">
                Recommendation
              </span>
            )}
          </div>
          
          <h2 className="text-3xl font-bold mb-3 line-clamp-2">{news.title}</h2>
          
          <p className="text-gray-200 mb-4 line-clamp-3">{news.excerpt}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {news.author.avatar ? (
                <img 
                  src={news.author.avatar} 
                  alt={news.author.name}
                  className="w-8 h-8 rounded-full mr-2 object-cover" 
                />
              ) : (
                <div className="w-8 h-8 rounded-full mr-2 bg-gray-500 flex items-center justify-center">
                  {news.author.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm font-medium">{news.author.name}</p>
                <p className="text-xs text-gray-300">{formatDate(news.publishDate)}</p>
              </div>
            </div>
            
            <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm">
              Read More
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="rounded-lg overflow-hidden flex flex-col neon-border hover:scale-[1.01] transition-all">
      <div className="h-48 overflow-hidden">
        <img 
          src={news.image} 
          alt={news.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      <div className="p-4 flex-1 bg-card">
        <div className="flex items-center gap-2 mb-3">
          {news.type === 'announcement' && (
            <span className="bg-oasis-magenta/30 text-oasis-magenta px-2 py-0.5 text-xs font-medium rounded-full">
              New Event
            </span>
          )}
          {news.type === 'recap' && (
            <span className="bg-oasis-cyan/30 text-oasis-cyan px-2 py-0.5 text-xs font-medium rounded-full">
              Event Recap
            </span>
          )}
          {news.type === 'interview' && (
            <span className="bg-oasis-green/30 text-oasis-green px-2 py-0.5 text-xs font-medium rounded-full">
              Interview
            </span>
          )}
          {news.type === 'guide' && (
            <span className="bg-yellow-400/30 text-yellow-400 px-2 py-0.5 text-xs font-medium rounded-full">
              Guide
            </span>
          )}
          {news.type === 'recommendation' && (
            <span className="bg-purple-500/30 text-purple-500 px-2 py-0.5 text-xs font-medium rounded-full">
              Recommendation
            </span>
          )}
        </div>
        
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{news.title}</h3>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{news.excerpt}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            {news.author.avatar ? (
              <img 
                src={news.author.avatar} 
                alt={news.author.name}
                className="w-6 h-6 rounded-full mr-2 object-cover" 
              />
            ) : (
              <div className="w-6 h-6 rounded-full mr-2 bg-muted flex items-center justify-center text-xs">
                {news.author.name.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-xs">{formatDate(news.publishDate)}</p>
            </div>
          </div>
          
          <Button size="sm" variant="ghost" className="text-sm">
            Read
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
