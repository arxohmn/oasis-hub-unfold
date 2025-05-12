
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Calendar, Home, User, Tag } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'Events', path: '/events', icon: <Calendar className="h-5 w-5" /> },
    { name: 'Deals', path: '/deals', icon: <Tag className="h-5 w-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="h-5 w-5" /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-oasis-dark/80 border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - increased height */}
          <div className="flex items-center justify-start w-1/4">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/8c44c583-6542-4181-8416-71ac3689953f.png" 
                alt="oasis.hub logo" 
                className="h-16" // Increased from h-14 to h-16
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex justify-center w-2/4">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md flex items-center gap-2 transition-all ${
                    isActive(item.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Empty div for spacing */}
          <div className="w-1/4 flex justify-end">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                className="inline-flex items-center justify-center"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-effect">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md flex items-center gap-2 ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
