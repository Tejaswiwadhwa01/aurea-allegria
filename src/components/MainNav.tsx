
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserAuth } from "@/components/UserAuth";

export function MainNav() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  
  return (
    <div className="flex justify-between items-center py-4 px-6">
      <div className="flex items-center space-x-6">
        <Link to="/" className="font-semibold text-lg">AUREA</Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/women" className="text-sm hover:text-gray-600 transition-colors">Women</Link>
          <Link to="/men" className="text-sm hover:text-gray-600 transition-colors">Men</Link>
          <Link to="/collections" className="text-sm hover:text-gray-600 transition-colors">Collections</Link>
          <Link to="/featured-collections" className="text-sm hover:text-gray-600 transition-colors">Featured</Link>
          <Link to="/about" className="text-sm hover:text-gray-600 transition-colors">About</Link>
        </nav>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsAuthOpen(true)}
          aria-label="User Account"
        >
          <UserRound className="h-5 w-5" />
        </Button>
        <Link to="/favorites">
          <Button variant="ghost" size="icon" aria-label="Favorites">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </Button>
        </Link>
      </div>
      
      <UserAuth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
