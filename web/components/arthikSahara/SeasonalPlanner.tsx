"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Cloud, 
  CloudRain, 
  Droplets, 
  Wind,
  Thermometer,
  Leaf,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";

interface SeasonalData {
  currentSeason: string;
  daysToHarvest: number;
  optimalCrops: string[];
  weatherForecast: string;
  soilMoisture: string;
}

interface SeasonalPlannerProps {
  seasonData: SeasonalData;
}

const SeasonalPlanner = ({ seasonData }: SeasonalPlannerProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Calendar navigation
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  // Get month name
  const getMonthName = (month: number) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[month];
  };
  
  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentYear, currentMonth, i));
    }
    
    return days;
  };
  
  // Sample farming activities data
  const farmingActivities = [
    {
      date: new Date(currentYear, currentMonth, 5),
      activity: "Fertilizer Application",
      description: "Apply NPK fertilizer to wheat crop",
      type: "fertilizer",
      priority: "high"
    },
    {
      date: new Date(currentYear, currentMonth, 12),
      activity: "Irrigation",
      description: "Irrigate wheat fields",
      type: "irrigation",
      priority: "medium"
    },
    {
      date: new Date(currentYear, currentMonth, 18),
      activity: "Pest Control",
      description: "Apply pesticide for aphid control",
      type: "pesticide",
      priority: "high"
    },
    {
      date: new Date(currentYear, currentMonth, 25),
      activity: "Weeding",
      description: "Manual weeding in vegetable plots",
      type: "maintenance",
      priority: "low"
    }
  ];
  
  // Check if a date has activities
  const hasActivities = (date: Date) => {
    return farmingActivities.some(activity => 
      activity.date.getDate() === date.getDate() && 
      activity.date.getMonth() === date.getMonth() && 
      activity.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Get activities for a date
  const getActivitiesForDate = (date: Date) => {
    return farmingActivities.filter(activity => 
      activity.date.getDate() === date.getDate() && 
      activity.date.getMonth() === date.getMonth() && 
      activity.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Get activity type icon
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "fertilizer":
        return <Leaf className="h-4 w-4" />;
      case "irrigation":
        return <Droplets className="h-4 w-4" />;
      case "pesticide":
        return <AlertTriangle className="h-4 w-4" />;
      case "maintenance":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };
  
  // Get activity priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Sample seasonal crop recommendations
  const cropRecommendations = [
    {
      crop: "Wheat",
      sowingPeriod: "October - November",
      harvestPeriod: "March - April",
      waterRequirement: "Medium",
      soilType: "Loamy",
      expectedYield: "4-5 tons/hectare",
      marketPrice: "₹2,015/quintal"
    },
    {
      crop: "Mustard",
      sowingPeriod: "October - November",
      harvestPeriod: "February - March",
      waterRequirement: "Low",
      soilType: "Sandy Loam",
      expectedYield: "1-1.5 tons/hectare",
      marketPrice: "₹5,050/quintal"
    },
    {
      crop: "Gram",
      sowingPeriod: "October - November",
      harvestPeriod: "March - April",
      waterRequirement: "Low",
      soilType: "Sandy Loam to Clay Loam",
      expectedYield: "1-1.2 tons/hectare",
      marketPrice: "₹5,230/quintal"
    }
  ];
  
  // Weather icon based on forecast
  const getWeatherIcon = (forecast: string) => {
    if (forecast.toLowerCase().includes("rain")) {
      return <CloudRain className="h-5 w-5 text-blue-500" />;
    } else if (forecast.toLowerCase().includes("cloud")) {
      return <Cloud className="h-5 w-5 text-gray-500" />;
    } else {
      return <Sun className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Season Overview */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-5 border border-green-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Season Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <span className="text-2xl">🌾</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{seasonData.currentSeason} Season</h3>
                <p className="text-gray-600">Optimal growing period</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-gray-700">{seasonData.daysToHarvest} days to harvest</span>
              </div>
              <div className="flex items-center">
                <Thermometer className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-gray-700">Temperature: 15-25°C (optimal)</span>
              </div>
              <div className="flex items-center">
                <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-gray-700">Soil Moisture: {seasonData.soilMoisture}</span>
              </div>
              <div className="flex items-center">
                {getWeatherIcon(seasonData.weatherForecast)}
                <span className="text-gray-700 ml-2">Weather: {seasonData.weatherForecast}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-gray-800 mb-3">Recommended Crops</h3>
            <div className="space-y-2">
              {seasonData.optimalCrops.map((crop, index) => (
                <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                      <Leaf className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{crop}</h4>
                      <p className="text-xs text-gray-500">High yield potential</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Calendar and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Farming Calendar</h3>
            <div className="flex items-center">
              <button 
                onClick={prevMonth}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <span className="mx-2 font-medium">
                {getMonthName(currentMonth)} {currentYear}
              </span>
              <button 
                onClick={nextMonth}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Day names */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
              <div key={index} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {generateCalendarDays().map((day, index) => (
              <div key={index} className="aspect-square">
                {day ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full h-full rounded-lg flex flex-col items-center justify-center relative ${
                      selectedDate && day.getDate() === selectedDate.getDate() && day.getMonth() === selectedDate.getMonth()
                        ? "bg-green-100 text-green-800"
                        : hasActivities(day)
                        ? "bg-amber-50"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <span className={`text-sm ${
                      new Date().getDate() === day.getDate() && 
                      new Date().getMonth() === day.getMonth() && 
                      new Date().getFullYear() === day.getFullYear()
                        ? "font-bold text-green-600"
                        : ""
                    }`}>
                      {day.getDate()}
                    </span>
                    
                    {hasActivities(day) && (
                      <div className="absolute bottom-1 w-full flex justify-center">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                      </div>
                    )}
                  </motion.button>
                ) : (
                  <div className="w-full h-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Activities */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {selectedDate 
              ? `Activities for ${selectedDate.getDate()} ${getMonthName(selectedDate.getMonth())}`
              : "Upcoming Activities"
            }
          </h3>
          
          {selectedDate && getActivitiesForDate(selectedDate).length > 0 ? (
            <div className="space-y-3">
              {getActivitiesForDate(selectedDate).map((activity, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-lg p-3"
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full ${
                      activity.type === "fertilizer" ? "bg-green-100" :
                      activity.type === "irrigation" ? "bg-blue-100" :
                      activity.type === "pesticide" ? "bg-red-100" :
                      "bg-purple-100"
                    } mr-3`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{activity.activity}</h4>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <div className="mt-2 flex items-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(activity.priority)}`}>
                          {activity.priority.charAt(0).toUpperCase() + activity.priority.slice(1)} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : selectedDate ? (
            <div className="text-center py-8 text-gray-500">
              No activities scheduled for this date
            </div>
          ) : (
            <div className="space-y-3">
              {farmingActivities
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(0, 3)
                .map((activity, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 rounded-lg p-3"
                  >
                    <div className="flex items-start">
                      <div className={`p-2 rounded-full ${
                        activity.type === "fertilizer" ? "bg-green-100" :
                        activity.type === "irrigation" ? "bg-blue-100" :
                        activity.type === "pesticide" ? "bg-red-100" :
                        "bg-purple-100"
                      } mr-3`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-800">{activity.activity}</h4>
                          <span className="text-xs text-gray-500">
                            {activity.date.getDate()} {getMonthName(activity.date.getMonth())}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <div className="mt-2 flex items-center">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(activity.priority)}`}>
                            {activity.priority.charAt(0).toUpperCase() + activity.priority.slice(1)} Priority
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Crop Recommendations */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
            <span className="text-xl">🌱</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Seasonal Crop Recommendations</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Crop
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sowing Period
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Harvest Period
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Water Requirement
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Soil Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected Yield
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Market Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cropRecommendations.map((crop, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                        <Leaf className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="font-medium text-gray-800">{crop.crop}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {crop.sowingPeriod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {crop.harvestPeriod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {crop.waterRequirement}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {crop.soilType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {crop.expectedYield}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {crop.marketPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Farming Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-5 border border-blue-100">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <span className="text-xl">💡</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Seasonal Farming Tips</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2">Irrigation Management</h4>
            <p className="text-sm text-gray-600">
              During Rabi season, maintain adequate soil moisture. Irrigate wheat crop at crown root initiation, tillering, jointing, flowering, and grain filling stages for optimal yield.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2">Pest Management</h4>
            <p className="text-sm text-gray-600">
              Monitor for aphids in wheat and mustard crops. Early detection and control measures can prevent significant yield loss. Use neem-based solutions for organic control.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2">Fertilizer Application</h4>
            <p className="text-sm text-gray-600">
              Apply second dose of nitrogen (urea) at tillering stage for wheat. For mustard, apply sulphur along with NPK for better oil content and yield.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h4 className="font-medium text-gray-800 mb-2">Weather Adaptation</h4>
            <p className="text-sm text-gray-600">
              Protect crops from occasional frost by light irrigation in the evening. Cover sensitive vegetable crops with plastic sheets during extreme cold nights.
            </p>
          </div>
        </div>
      </div>
      
      {/* Weather Forecast */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <span className="text-xl">🌤️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">7-Day Weather Forecast</h3>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {Array.from({ length: 7 }).map((_, index) => {
            const date = new Date();
            date.setDate(date.getDate() + index);
            
            // Sample weather data (would come from API in real app)
            const weatherTypes = ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Sunny", "Sunny", "Partly Cloudy"];
            const tempMax = [24, 23, 22, 20, 21, 23, 24];
            const tempMin = [12, 11, 10, 9, 10, 11, 12];
            
            return (
              <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-xs font-medium text-gray-500">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  {date.getDate()} {getMonthName(date.getMonth()).slice(0, 3)}
                </p>
                
                <div className="h-10 w-10 mx-auto mb-2">
                  {weatherTypes[index] === "Sunny" ? (
                    <Sun className="h-10 w-10 text-amber-500" />
                  ) : weatherTypes[index] === "Partly Cloudy" ? (
                    <Cloud className="h-10 w-10 text-gray-400" />
                  ) : weatherTypes[index] === "Cloudy" ? (
                    <Cloud className="h-10 w-10 text-gray-500" />
                  ) : (
                    <CloudRain className="h-10 w-10 text-blue-500" />
                  )}
                </div>
                
                <p className="text-sm font-medium text-gray-800">{weatherTypes[index]}</p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-xs font-medium text-red-500">{tempMax[index]}°C</span>
                  <span className="text-xs text-gray-400">|</span>
                  <span className="text-xs font-medium text-blue-500">{tempMin[index]}°C</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SeasonalPlanner;