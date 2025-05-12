
import React from 'react';
import NewsFeed from '@/components/news/NewsFeed';

const News = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-2 neon-text">News Feed</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Stay updated with the latest cultural news and stories
        </p>
        <NewsFeed />
      </div>
    </div>
  );
};

export default News;
