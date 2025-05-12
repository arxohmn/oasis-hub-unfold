import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CategoryType } from '../events/EventFilters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type UserType = 'regular' | 'industry' | 'venue';
export type LookingForType = 'Event Buddies' | 'Friends' | 'Networking' | 'Collaborations' | 'Performers';

export interface ProfileType {
  id: string;
  username: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    website?: string;
  };
  interests: CategoryType[];
  lookingFor: LookingForType[];
  userType: UserType;
  prompts?: {
    idealWeekend?: string;
    bestAdvice?: string;
    favoriteSeason?: string;
  };
}

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType>({
    id: '1',
    username: 'baltictraveler',
    avatar: 'https://i.pravatar.cc/150?img=33',
    coverImage: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1200',
    bio: 'Culture enthusiast exploring the vibrant arts scene across the Baltic states. Always looking for new experiences and connections.',
    socialLinks: {
      instagram: 'https://instagram.com/baltictraveler',
      facebook: 'https://facebook.com/baltictraveler'
    },
    interests: ['Music', 'Film', 'Theatre', 'Exhibitions', 'Food'],
    lookingFor: ['Event Buddies', 'Friends'],
    userType: 'regular',
    prompts: {
      idealWeekend: 'Art gallery hopping followed by a local music gig and dinner at a hidden gem restaurant.',
      bestAdvice: "The best experiences often happen when you're outside your comfort zone."
    }
  });
  
  const [activeTab, setActiveTab] = useState('profile');
  
  // This would come from a real authentication system
  const isCurrentUserProfile = true;
  
  const [userType, setUserType] = useState<UserType>(profile.userType);
  
  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
    // In a real app, this would update the profile via API call
    setProfile({...profile, userType: type});
  };
  
  return (
    <div className="w-full">
      {/* Cover image and profile photo */}
      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-16">
        {profile.coverImage ? (
          <img 
            src={profile.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-oasis-cyan/50 via-oasis-magenta/50 to-oasis-green/50"></div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
        
        {/* Profile photo */}
        <div className="absolute -bottom-12 left-6">
          <div className="relative">
            {profile.avatar ? (
              <img 
                src={profile.avatar} 
                alt={profile.username} 
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-oasis-dark object-cover"
              />
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-oasis-dark bg-muted flex items-center justify-center text-2xl font-bold">
                {profile.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
        
        {/* Username and edit button */}
        <div className="absolute bottom-4 left-36 md:left-44 right-4 flex justify-between items-end">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">{profile.username}</h1>
            <div className="flex items-center gap-1">
              <span className="text-sm text-white/70">
                {profile.userType === 'regular' && 'Regular User'}
                {profile.userType === 'industry' && 'Entertainment Industry'}
                {profile.userType === 'venue' && 'Venue'}
              </span>
            </div>
          </div>
          
          {isCurrentUserProfile && (
            <Button 
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
              size="sm"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>
      
      {/* Tabs and content */}
      <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-8">
          {/* Bio */}
          {profile.bio && (
            <div className="glass-effect p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-3">Bio</h2>
              <p>{profile.bio}</p>
            </div>
          )}
          
          {/* User Type Selection (only shown to profile owner) */}
          {isCurrentUserProfile && (
            <div className="glass-effect p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-4">Profile Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => handleUserTypeChange('regular')}
                  variant={userType === 'regular' ? 'default' : 'outline'}
                  className={userType === 'regular' ? "bg-primary text-primary-foreground h-auto py-4" : "h-auto py-4"}
                >
                  <div className="text-left">
                    <div className="font-medium">Regular User</div>
                    <div className="text-sm opacity-70">For individuals exploring events</div>
                  </div>
                </Button>
                
                <Button
                  onClick={() => handleUserTypeChange('industry')}
                  variant={userType === 'industry' ? 'default' : 'outline'}
                  className={userType === 'industry' ? "bg-secondary text-secondary-foreground h-auto py-4" : "h-auto py-4"}
                >
                  <div className="text-left">
                    <div className="font-medium">Industry Rep</div>
                    <div className="text-sm opacity-70">For artists and organizers</div>
                  </div>
                </Button>
                
                <Button
                  onClick={() => handleUserTypeChange('venue')}
                  variant={userType === 'venue' ? 'default' : 'outline'}
                  className={userType === 'venue' ? "bg-accent text-accent-foreground h-auto py-4" : "h-auto py-4"}
                >
                  <div className="text-left">
                    <div className="font-medium">Venue</div>
                    <div className="text-sm opacity-70">For event spaces and venues</div>
                  </div>
                </Button>
              </div>
            </div>
          )}
          
          {/* Interests and Looking For */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interests */}
            <div className="glass-effect p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-3">I'm into</h2>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map(interest => (
                  <span key={interest} className="category-tag">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Looking For */}
            <div className="glass-effect p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-3">Looking for</h2>
              <div className="flex flex-wrap gap-2">
                {profile.lookingFor.map(item => (
                  <span 
                    key={item} 
                    className="px-3 py-1 text-sm rounded-full bg-secondary/20 text-secondary/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Prompts */}
          {profile.prompts && Object.keys(profile.prompts).length > 0 && (
            <div className="glass-effect p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-4">About me</h2>
              <div className="space-y-4">
                {profile.prompts.idealWeekend && (
                  <div>
                    <h3 className="text-md font-medium mb-1 neon-text">My ideal weekend</h3>
                    <p>{profile.prompts.idealWeekend}</p>
                  </div>
                )}
                
                {profile.prompts.bestAdvice && (
                  <div>
                    <h3 className="text-md font-medium mb-1 neon-text">Best advice I've received</h3>
                    <p>{profile.prompts.bestAdvice}</p>
                  </div>
                )}
                
                {profile.prompts.favoriteSeason && (
                  <div>
                    <h3 className="text-md font-medium mb-1 neon-text">Favorite season for events</h3>
                    <p>{profile.prompts.favoriteSeason}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Social links */}
          {profile.socialLinks && Object.keys(profile.socialLinks).length > 0 && (
            <div className="glass-effect p-6 rounded-lg">
              <h2 className="text-xl font-medium mb-4">Connect with me</h2>
              <div className="flex gap-4">
                {profile.socialLinks.instagram && (
                  <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    Instagram
                  </a>
                )}
                {profile.socialLinks.facebook && (
                  <a href={profile.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    Facebook
                  </a>
                )}
                {profile.socialLinks.twitter && (
                  <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    Twitter
                  </a>
                )}
                {profile.socialLinks.website && (
                  <a href={profile.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                    Website
                  </a>
                )}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="activity" className="glass-effect p-6 rounded-lg">
          <div className="text-center py-16">
            <h3 className="text-xl mb-2">Activity feature coming soon</h3>
            <p className="text-muted-foreground">Track your event attendance and interactions</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
