import React from "react";
import { MapPin, Search, Bell, Menu } from "lucide-react";

interface PageHeaderProps {
  location: string;
  title: string;
  subtitle: string;
}

const PageHeader = ({ location, title, subtitle }: PageHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-green-700 to-green-600 text-white mt-10 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Menu className="h-6 w-6 md:hidden" />
            <h1 className="text-xl font-bold">{title}</h1>
            <span className="hidden md:inline text-sm opacity-75">| {subtitle}</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-white/20 rounded-full px-3 py-1.5 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>
            <button className="p-2 rounded-full bg-white/20 hover:bg-white/30">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-amber-400 rounded-full"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;