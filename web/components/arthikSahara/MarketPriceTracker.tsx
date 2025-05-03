"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  Calendar, 
  ArrowRight,
  ChevronRight,
  Filter,
  Bell,
  X,
  AlertTriangle,
  ExternalLink,
  MapPin,
  DollarSign,
  Truck,
  ShoppingBag
} from "lucide-react";

const MarketPriceTracker = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<string>("all");
  const [timeRange, setTimeRange] = useState("week");
  const [showPriceAlert, setShowPriceAlert] = useState(true);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Sample crop price data
  const cropPrices = [
    {
      id: "wheat",
      name: "Wheat",
      currentPrice: 2200,
      unit: "quintal",
      change: 50,
      changePercent: 2.3,
      trend: "up",
      lastUpdated: "Today, 10:30 AM",
      forecast: "stable",
      mspPrice: 2015,
      icon: "🌾"
    },
    {
      id: "rice",
      name: "Rice",
      currentPrice: 1950,
      unit: "quintal",
      change: -30,
      changePercent: -1.5,
      trend: "down",
      lastUpdated: "Today, 9:45 AM",
      forecast: "down",
      mspPrice: 1868,
      icon: "🍚"
    },
    {
      id: "cotton",
      name: "Cotton",
      currentPrice: 6200,
      unit: "quintal",
      change: 120,
      changePercent: 1.9,
      trend: "up",
      lastUpdated: "Yesterday, 4:15 PM",
      forecast: "up",
      mspPrice: 5850,
      icon: "🧶"
    },
    {
      id: "soybean",
      name: "Soybean",
      currentPrice: 3800,
      unit: "quintal",
      change: 0,
      changePercent: 0,
      trend: "stable",
      lastUpdated: "Today, 11:00 AM",
      forecast: "stable",
      mspPrice: 3600,
      icon: "🫘"
    },
    {
      id: "mustard",
      name: "Mustard",
      currentPrice: 4500,
      unit: "quintal",
      change: 75,
      changePercent: 1.7,
      trend: "up",
      lastUpdated: "Today, 10:15 AM",
      forecast: "up",
      mspPrice: 4200,
      icon: "🌱"
    },
    {
      id: "maize",
      name: "Maize",
      currentPrice: 1850,
      unit: "quintal",
      change: -25,
      changePercent: -1.3,
      trend: "down",
      lastUpdated: "Yesterday, 5:30 PM",
      forecast: "stable",
      mspPrice: 1760,
      icon: "🌽"
    }
  ];

  // Sample market data
  const markets = [
    { id: "sonipat", name: "Sonipat Mandi", distance: "3.5 km" },
    { id: "panipat", name: "Panipat Grain Market", distance: "28 km" },
    { id: "karnal", name: "Karnal APMC", distance: "65 km" },
    { id: "delhi", name: "Azadpur Mandi, Delhi", distance: "45 km" }
  ];

  // Filter crops based on search query
  const filteredCrops = cropPrices.filter(crop => 
    crop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get trend icon and color
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <BarChart2 className="h-4 w-4 text-amber-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-amber-600";
    }
  };

  const getTrendBgColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "bg-green-100";
      case "down":
        return "bg-red-100";
      default:
        return "bg-amber-100";
    }
  };

  // Get forecast badge
  const getForecastBadge = (forecast: string) => {
    switch (forecast) {
      case "up":
        return (
          <div className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            <TrendingUp className="h-3 w-3" />
            <span>Rising</span>
          </div>
        );
      case "down":
        return (
          <div className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
            <TrendingDown className="h-3 w-3" />
            <span>Falling</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
            <BarChart2 className="h-3 w-3" />
            <span>Stable</span>
          </div>
        );
    }
  };

  // Sample price history data for charts
  const getPriceHistory = (cropId: string) => {
    // This would come from an API in a real application
    const baseData = [
      { date: "Jan", price: 0 },
      { date: "Feb", price: 0 },
      { date: "Mar", price: 0 },
      { date: "Apr", price: 0 },
      { date: "May", price: 0 },
      { date: "Jun", price: 0 },
      { date: "Jul", price: 0 }
    ];
    
    // Generate some random data based on crop ID for demonstration
    const crop = cropPrices.find(c => c.id === cropId);
    if (!crop) return baseData;
    
    const seed = cropId.charCodeAt(0);
    return baseData.map((point, index) => {
      const randomFactor = Math.sin(seed + index) * 0.15;
      const basePrice = crop.currentPrice * (0.85 + index * 0.025);
      return {
        ...point,
        price: Math.round(basePrice * (1 + randomFactor))
      };
    });
  };

  // Handle crop selection
  const handleCropSelect = (cropId: string) => {
    setSelectedCrop(cropId === selectedCrop ? null : cropId);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search for crops..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
          >
            <option value="all">All Markets</option>
            {markets.map(market => (
              <option key={market.id} value={market.id}>{market.name}</option>
            ))}
          </select>
          
          <select
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>
      
      {/* Price Alert */}
      {showPriceAlert && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start justify-between"
        >
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-amber-800">Price Alert</h3>
              <p className="text-xs text-amber-700">Wheat prices have increased by 2.3% in Sonipat Mandi since yesterday</p>
            </div>
          </div>
          <button 
            className="text-amber-500 hover:text-amber-700"
            onClick={() => setShowPriceAlert(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </motion.div>
      )}
      
      {/* Market Prices Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredCrops.map((crop) => (
          <motion.div
            key={crop.id}
            variants={itemVariants}
            className={`bg-white border ${selectedCrop === crop.id ? 'border-green-300 ring-2 ring-green-100' : 'border-gray-200'} rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer`}
            onClick={() => handleCropSelect(crop.id)}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <span className="text-xl">{crop.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{crop.name}</h3>
                    <p className="text-xs text-gray-500">Updated: {crop.lastUpdated}</p>
                  </div>
                </div>
                {getForecastBadge(crop.forecast)}
              </div>
              
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-gray-500">Current Price</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-800">₹{crop.currentPrice}</span>
                    <span className="text-xs text-gray-500">per {crop.unit}</span>
                  </div>
                </div>
                
                <div className={`flex items-center gap-1 ${getTrendColor(crop.trend)}`}>
                  {getTrendIcon(crop.trend)}
                  <span className="font-medium">
                    {crop.change > 0 ? '+' : ''}{crop.change} ({crop.changePercent > 0 ? '+' : ''}{crop.changePercent}%)
                  </span>
                </div>
              </div>
              
              {selectedCrop === crop.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-gray-100"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">MSP: ₹{crop.mspPrice}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Sonipat Mandi</span>
                    </div>
                  </div>
                  
                  {/* Simple price chart visualization */}
                  <div className="h-16 flex items-end gap-1 mt-2">
                    {getPriceHistory(crop.id).map((point, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className={`w-full ${index === 6 ? 'bg-green-500' : 'bg-green-200'} rounded-sm`}
                          style={{ 
                            height: `${(point.price / (crop.currentPrice * 1.2)) * 100}%`,
                            minHeight: '4px'
                          }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-1">{point.date}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <button className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                      <span>View Price History</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                    <button className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                      <Bell className="h-3 w-3" />
                      <span>Set Price Alert</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Nearby Markets */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            <span>Nearby Markets</span>
          </h2>
          <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {markets.map((market) => (
            <div 
              key={market.id}
              className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:border-green-200 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{market.name}</h3>
                  <p className="text-xs text-gray-500">Distance: {market.distance}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                  <Truck className="h-3 w-3" />
                  <span>Directions</span>
                </button>
                <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  <span>Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Market Insights */}
      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-green-600" />
          <span>Market Insights</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <h3 className="text-sm font-medium text-gray-800">Top Gainers</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-700">Cotton</span>
                <span className="text-green-600">+1.9%</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-700">Wheat</span>
                <span className="text-green-600">+2.3%</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-700">Mustard</span>
                <span className="text-green-600">+1.7%</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <h3 className="text-sm font-medium text-gray-800">Top Losers</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-700">Rice</span>
                <span className="text-red-600">-1.5%</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-700">Maize</span>
                <span className="text-red-600">-1.3%</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-700">Potato</span>
                <span className="text-red-600">-0.8%</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <h3 className="text-sm font-medium text-gray-800">Market Schedule</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-700">Sonipat Mandi</span>
                <span className="text-gray-600">Daily, 6 AM - 8 PM</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-700">Panipat Market</span>
                <span className="text-gray-600">Mon-Sat, 7 AM - 7 PM</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-gray-700">Karnal APMC</span>
                <span className="text-gray-600">Mon-Fri, 8 AM - 6 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPriceTracker;