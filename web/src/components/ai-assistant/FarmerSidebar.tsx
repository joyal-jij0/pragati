import React from "react";
import { motion } from "framer-motion";
import { 
  Sprout, 
  CloudRain, 
  Tractor, 
  DollarSign, 
  Users, 
  HelpCircle,
  Leaf,
  Sun,
  Wind,
  Droplets,
  Bug,
  FileText,
  Calendar,
  Menu,
  X
} from "lucide-react";

interface FarmerSidebarProps {
  onTopicSelect: (topic: string) => void;
}

export const FarmerSidebar: React.FC<FarmerSidebarProps> = ({ onTopicSelect }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  
  // Current weather and crop data (in a real app, this would come from an API)
  const currentDate = new Date().toLocaleDateString('en-US', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  
  const weatherData = {
    temp: "32°C",
    condition: "Sunny",
    humidity: "65%",
    wind: "10 km/h"
  };
  
  const cropStages = [
    { name: "Rice", stage: "Flowering", progress: 65 },
    { name: "Wheat", stage: "Harvesting", progress: 90 }
  ];
  
  const quickTopics = [
    { id: "weather", name: "Weather Forecast", icon: <CloudRain className="h-4 w-4" /> },
    { id: "pests", name: "Pest Control", icon: <Bug className="h-4 w-4" /> },
    { id: "market", name: "Market Prices", icon: <DollarSign className="h-4 w-4" /> },
    { id: "equipment", name: "Equipment Rental", icon: <Tractor className="h-4 w-4" /> },
    { id: "community", name: "Community Support", icon: <Users className="h-4 w-4" /> },
    { id: "schemes", name: "Government Schemes", icon: <FileText className="h-4 w-4" /> }
  ];
  
  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const sidebarContent = (
    <>
      {/* Farmer Profile Summary */}
      <div className="p-4 border-b border-green-100">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <Sprout className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Farmer Assistant</h3>
            <p className="text-xs text-gray-500">{currentDate}</p>
          </div>
        </div>
      </div>
      
      {/* Weather Widget */}
      <div className="p-4 border-b border-green-100">
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Sun className="h-4 w-4 mr-2 text-amber-500" />
          Today's Weather
        </h4>
        <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg p-3 border border-blue-100">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-medium text-gray-800">{weatherData.temp}</div>
            <div className="text-sm text-gray-600">{weatherData.condition}</div>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div className="flex items-center">
              <Droplets className="h-3 w-3 mr-1 text-blue-500" />
              Humidity: {weatherData.humidity}
            </div>
            <div className="flex items-center">
              <Wind className="h-3 w-3 mr-1 text-blue-500" />
              Wind: {weatherData.wind}
            </div>
          </div>
        </div>
      </div>
      
      {/* Crop Status */}
      <div className="p-4 border-b border-green-100">
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Leaf className="h-4 w-4 mr-2 text-green-500" />
          Crop Status
        </h4>
        <div className="space-y-3">
          {cropStages.map((crop, index) => (
            <div key={index} className="bg-white border border-green-100 rounded-lg p-3 shadow-sm hover:border-green-300 transition-colors">
              <div className="flex justify-between items-center mb-1">
                <div className="font-medium text-gray-800">{crop.name}</div>
                <div className="text-xs text-gray-500">{crop.stage}</div>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full" 
                  style={{ width: `${crop.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Topics */}
      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <HelpCircle className="h-4 w-4 mr-2 text-amber-500" />
          Ask About
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {quickTopics.map((topic) => (
            <motion.button
              key={topic.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white border border-green-100 rounded-lg p-2 shadow-sm hover:border-green-300 hover:bg-green-50 transition-colors text-left"
              onClick={() => {
                onTopicSelect(topic.name);
                if (isMobileMenuOpen) setIsMobileMenuOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  {topic.icon}
                </div>
                <span className="text-xs font-medium text-gray-700">{topic.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </>
  );
  
  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={toggleMobileMenu}
          className="p-2 bg-white rounded-full shadow-md border border-green-100"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-gray-600" />
          ) : (
            <Menu className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>
      
      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="w-72 h-full bg-white overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </motion.div>
        </motion.div>
      )}
      
      {/* Desktop sidebar */}
      <div className="w-full md:w-72 bg-white h-full overflow-y-auto hidden md:block">
        {sidebarContent}
      </div>
    </>
  );
};