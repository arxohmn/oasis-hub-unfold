
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Filter } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';

export type CategoryType = 'Music' | 'Film' | 'Theatre' | 'Dance' | 'Exhibitions' | 
  'Performances' | 'Comedy' | 'Kids & Youth' | 'Workshops' | 'Relaxation' | 
  'Active Lifestyle' | 'Food' | 'Sports' | 'All';

export type PriceRange = 'Free' | '<25' | '25-50' | '50-100' | '100-150' | '150+' | 'All';

export type LocationType = {
  country: string;
  city: string;
};

export type FiltersType = {
  category: CategoryType;
  dateRange: DateRange | undefined;
  location: LocationType;
  priceRange: PriceRange;
};

interface EventFiltersProps {
  onFiltersChange: (filters: FiltersType) => void;
}

const EventFilters: React.FC<EventFiltersProps> = ({ onFiltersChange }) => {
  const categories: CategoryType[] = [
    'All', 'Music', 'Film', 'Theatre', 'Dance', 'Exhibitions', 
    'Performances', 'Comedy', 'Kids & Youth', 'Workshops', 
    'Relaxation', 'Active Lifestyle', 'Food', 'Sports'
  ];

  const priceRanges: PriceRange[] = ['All', 'Free', '<25', '25-50', '50-100', '100-150', '150+'];
  
  const countries = ['Estonia', 'Latvia', 'Lithuania'];
  const cities = {
    Estonia: ['Tallinn', 'Tartu', 'Pärnu', 'Narva'],
    Latvia: ['Riga', 'Jurmala', 'Liepaja', 'Daugavpils'],
    Lithuania: ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai']
  };

  const [filters, setFilters] = useState<FiltersType>({
    category: 'All',
    dateRange: undefined,
    location: {
      country: 'Latvia',
      city: 'Riga'
    },
    priceRange: 'All'
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const handleCategoryChange = (category: CategoryType) => {
    const newFilters = { ...filters, category };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };
  
  const handleDateRangeChange = (dateRange: DateRange | undefined) => {
    const newFilters = { ...filters, dateRange };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleThisWeek = () => {
    const today = new Date();
    const endOfWeek = new Date();
    endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
    
    const dateRange = {
      from: today,
      to: endOfWeek
    };
    
    const newFilters = { ...filters, dateRange };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleThisMonth = () => {
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    const dateRange = {
      from: today,
      to: endOfMonth
    };
    
    const newFilters = { ...filters, dateRange };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleCountryChange = (country: string) => {
    const newFilters = { 
      ...filters, 
      location: {
        country,
        city: cities[country as keyof typeof cities][0]
      }
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleCityChange = (city: string) => {
    const newFilters = {
      ...filters,
      location: {
        ...filters.location,
        city
      }
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceChange = (priceRange: PriceRange) => {
    const newFilters = { ...filters, priceRange };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="w-full">
      <div className="lg:hidden mb-4">
        <Button 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          variant="outline"
          className="w-full flex justify-between items-center"
        >
          <span>Filters</span>
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
        <div className="glass-effect p-4 rounded-lg mb-6">
          {/* Category filters */}
          <div className="mb-6">
            <Label className="block mb-3 text-lg font-medium">Category</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  variant={filters.category === category ? "default" : "outline"}
                  className={filters.category === category ? "bg-primary text-primary-foreground" : ""}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Date filters */}
          <div className="mb-6">
            <Label className="block mb-3 text-lg font-medium">Date</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleThisWeek}
              >
                This Week
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleThisMonth}
              >
                This Month
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start"
                    size="sm"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange?.from ? (
                      filters.dateRange.to ? (
                        <>
                          {format(filters.dateRange.from, "LLL dd")} -{" "}
                          {format(filters.dateRange.to, "LLL dd")}
                        </>
                      ) : (
                        format(filters.dateRange.from, "LLL dd")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={filters.dateRange?.from}
                    selected={filters.dateRange}
                    onSelect={handleDateRangeChange}
                    numberOfMonths={1}
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Location filters */}
          <div className="mb-6">
            <Label className="block mb-3 text-lg font-medium">Location</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="block mb-2">Country</Label>
                <select
                  className="w-full p-2 rounded-md bg-card border border-border"
                  value={filters.location.country}
                  onChange={(e) => handleCountryChange(e.target.value)}
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="block mb-2">City</Label>
                <select
                  className="w-full p-2 rounded-md bg-card border border-border"
                  value={filters.location.city}
                  onChange={(e) => handleCityChange(e.target.value)}
                >
                  {cities[filters.location.country as keyof typeof cities].map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Price filters */}
          <div>
            <Label className="block mb-3 text-lg font-medium">Price Range (€)</Label>
            <div className="flex flex-wrap gap-2">
              {priceRanges.map((price) => (
                <Button
                  key={price}
                  onClick={() => handlePriceChange(price)}
                  variant={filters.priceRange === price ? "default" : "outline"}
                  className={filters.priceRange === price ? "bg-primary text-primary-foreground" : ""}
                  size="sm"
                >
                  {price}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFilters;
