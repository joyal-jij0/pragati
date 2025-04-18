"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import { 
  Sun, Cloud, CloudRain, Droplets, Wind, 
  TrendingUp, TrendingDown, AlertTriangle, 
  BarChart2, PieChart, LineChart, Activity,
  Calendar, Clock, MapPin, Zap, Award, 
  Leaf, Sprout, Thermometer, Droplet, CloudLightning,
  ShoppingBag, CreditCard, Shield, HelpCircle, 
  ChevronRight, ExternalLink, ArrowRight, Plus
} from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RePieChart, Pie, Cell } from 'recharts';

// Weather forecast data
const weatherData = [
  { day: 'Mon', temp: 32, humidity: 45, icon: <Sun className="w-6 h-6" /> },
  { day: 'Tue', temp: 30, humidity: 50, icon: <Sun className="w-6 h-6" /> },
  { day: 'Wed', temp: 28, humidity: 60, icon: <Cloud className="w-6 h-6" /> },
  { day: 'Thu', temp: 27, humidity: 70, icon: <CloudRain className="w-6 h-6" /> },
  { day: 'Fri', temp: 29, humidity: 55, icon: <Cloud className="w-6 h-6" /> },
  { day: 'Sat', temp: 31, humidity: 45, icon: <Sun className="w-6 h-6" /> },
  { day: 'Sun', temp: 33, humidity: 40, icon: <Sun className="w-6 h-6" /> },
];

// Crop health data
const cropHealthData = [
  { name: 'Wheat', value: 85, color: '#22c55e' },
  { name: 'Rice', value: 70, color: '#84cc16' },
  { name: 'Corn', value: 90, color: '#10b981' },
  { name: 'Soybean', value: 65, color: '#4ade80' },
];

// Market price data
const marketPriceData = [
  { month: 'Jan', price: 1500 },
  { month: 'Feb', price: 1550 },
  { month: 'Mar', price: 1600 },
  { month: 'Apr', price: 1650 },
  { month: 'May', price: 1700 },
  { month: 'Jun', price: 1750 },
  { month: 'Jul', price: 1800 },
  { month: 'Aug', price: 1850 },
  { month: 'Sep', price: 1900 },
  { month: 'Oct', price: 1950 },
  { month: 'Nov', price: 2000 },
  { month: 'Dec', price: 2050 },
];

// Dashboard stat cards data
const statCards = [
  {
    title: "Weather Forecast",
    value: "Sunny",
    change: "+2°C",
    trend: "up",
    icon: <Sun className="w-6 h-6" />,
    color: "blue",
    bgGradient: "from-blue-500/20 to-blue-600/5",
    textColor: "text-blue-700",
    iconBg: "bg-blue-500",
  },
  {
    title: "Crop Health",
    value: "Good",
    change: "+5%",
    trend: "up",
    icon: <Leaf className="w-6 h-6" />,
    color: "green",
    bgGradient: "from-green-500/20 to-green-600/5",
    textColor: "text-green-700",
    iconBg: "bg-green-500",
  },
  {
    title: "Market Price",
    value: "₹1,850",
    change: "+₹120",
    trend: "up",
    icon: <BarChart2 className="w-6 h-6" />,
    color: "amber",
    bgGradient: "from-amber-500/20 to-amber-600/5",
    textColor: "text-amber-700",
    iconBg: "bg-amber-500",
  },
  {
    title: "Advisories",
    value: "3",
    change: "New",
    trend: "neutral",
    icon: <AlertTriangle className="w-6 h-6" />,
    color: "rose",
    bgGradient: "from-rose-500/20 to-rose-600/5",
    textColor: "text-rose-700",
    iconBg: "bg-rose-500",
  },
];

// Feature modules data
const featureModules = [
  {
    title: "Weather Advisory",
    description: "Get hyperlocal weather forecasts and farm advisories",
    icon: <Cloud className="w-6 h-6" />,
    href: "/gyan-dhara",
    color: "blue",
    bgGradient: "from-blue-500/10 to-blue-600/5",
  },
  {
    title: "Crop Doctor",
    description: "Diagnose pest & disease issues with AI image analysis",
    icon: <Sprout className="w-6 h-6" />,
    href: "/fasal-doctor",
    color: "green",
    bgGradient: "from-green-500/10 to-green-600/5",
  },
  {
    title: "Market Prices",
    description: "Track real-time market prices and future predictions",
    icon: <BarChart2 className="w-6 h-6" />,
    href: "/bazaar-bridge",
    color: "amber",
    bgGradient: "from-amber-500/10 to-amber-600/5",
  },
  {
    title: "Input Store",
    description: "Find quality agricultural inputs at fair prices",
    icon: <ShoppingBag className="w-6 h-6" />,
    href: "/bazaar-bridge/store",
    color: "indigo",
    bgGradient: "from-indigo-500/10 to-indigo-600/5",
  },
  {
    title: "Loan Options",
    description: "Explore credit options with alternative scoring",
    icon: <CreditCard className="w-6 h-6" />,
    href: "/arthik-sahara/loans",
    color: "purple",
    bgGradient: "from-purple-500/10 to-purple-600/5",
  },
  {
    title: "Crop Insurance",
    description: "Protect your crops with simplified insurance",
    icon: <Shield className="w-6 h-6" />,
    href: "/arthik-sahara/insurance",
    color: "rose",
    bgGradient: "from-rose-500/10 to-rose-600/5",
  },
];

// Recent activity data
const recentActivities = [
  {
    id: 1,
    title: "You checked weather forecast for Sonipat region",
    time: "Today, 10:30 AM",
    icon: <Cloud className="w-4 h-4" />,
    color: "blue",
  },
  {
    id: 2,
    title: "You uploaded a crop image for disease detection",
    time: "Yesterday, 4:45 PM",
    icon: <Image className="w-4 h-4" />,
    color: "green",
  },
  {
    id: 3,
    title: "You checked market prices for wheat in Karnal mandi",
    time: "Yesterday, 2:15 PM",
    icon: <BarChart2 className="w-4 h-4" />,
    color: "amber",
  },
  {
    id: 4,
    title: "You applied for crop insurance for your wheat field",
    time: "2 days ago, 11:20 AM",
    icon: <Shield className="w-4 h-4" />,
    color: "rose",
  },
  {
    id: 5,
    title: "You received a new advisory about pest control",
    time: "3 days ago, 9:15 AM",
    icon: <AlertTriangle className="w-4 h-4" />,
    color: "purple",
  },
];

// Upcoming tasks data
const upcomingTasks = [
  {
    id: 1,
    title: "Apply fertilizer to wheat field",
    date: "Today",
    priority: "high",
    completed: false,
  },
  {
    id: 2,
    title: "Irrigation for rice paddy",
    date: "Tomorrow",
    priority: "medium",
    completed: false,
  },
  {
    id: 3,
    title: "Check for pest infestation in corn",
    date: "Oct 15",
    priority: "medium",
    completed: false,
  },
  {
    id: 4,
    title: "Harvest soybean crop",
    date: "Oct 20",
    priority: "high",
    completed: false,
  },
];

// Soil health data
const soilHealthData = [
  { name: 'Nitrogen', value: 75, fullMark: 100 },
  { name: 'Phosphorus', value: 60, fullMark: 100 },
  { name: 'Potassium', value: 85, fullMark: 100 },
  { name: 'pH Level', value: 70, fullMark: 100 },
  { name: 'Organic Matter', value: 65, fullMark: 100 },
];

export default function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Format date for display
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(currentTime);

  // Format time for display
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(currentTime);

  return (
    <>
      <DashboardHeader />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Welcome header with gradient background */}
          <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 rounded-2xl p-6 shadow-sm border border-green-100 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">
                  नमस्ते, किसान मित्र!
                </h1>
                <p className="text-gray-600">Welcome to your personalized farming dashboard</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-green-100 text-gray-700 shadow-sm">
                  <Calendar className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-green-100 text-gray-700 shadow-sm">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">{isClient ? formattedTime : "Loading..."}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats cards with improved design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card) => (
              <motion.div 
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`bg-gradient-to-r ${card.bgGradient} rounded-xl shadow-sm border border-gray-100 p-5 transition-all duration-200 hover:shadow-md hover:border-${card.color}-200 group`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{card.title}</p>
                    <h3 className={`text-2xl font-bold ${card.textColor} mt-1 group-hover:text-${card.color}-800 transition-colors`}>{card.value}</h3>
                    <div className={`flex items-center mt-1 text-sm ${
                      card.trend === 'up' ? 'text-green-600' : 
                      card.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {card.trend === 'up' && (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      )}
                      {card.trend === 'down' && (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      <span>{card.change}</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 rounded-full ${card.iconBg} bg-opacity-20 flex items-center justify-center text-white group-hover:bg-opacity-30 transition-colors`}>
                    {card.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Weather Forecast - Larger Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <Sun className="w-5 h-5 mr-2 text-amber-500" />
                    Weather Forecast
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">7-day forecast for your location</p>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">Sonipat, Haryana</span>
                </div>
              </div>
              
              <div className="flex flex-nowrap overflow-x-auto pb-4 gap-4 scrollbar-hide">
                {weatherData.map((item, index) => (
                  <div 
                    key={index} 
                    className={`flex-shrink-0 w-24 rounded-lg p-3 flex flex-col items-center ${
                      index === 0 ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-700">{item.day}</p>
                    <div className={`my-2 text-${index === 0 ? 'blue' : 'gray'}-500`}>
                      {item.icon}
                    </div>
                    <p className="text-lg font-bold text-gray-800">{item.temp}°C</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Droplets className="w-3 h-3 mr-1" />
                      <span>{item.humidity}%</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Thermometer className="w-4 h-4 text-red-500" />
                      <span>32°C</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Wind className="w-4 h-4 text-blue-500" />
                      <span>12 km/h</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Droplet className="w-4 h-4 text-blue-500" />
                      <span>45%</span>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    Detailed Forecast
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* AI Recommendation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">AI Recommendation</h3>
                  <p className="text-sm text-gray-600 mt-2">Based on the forecast and your wheat's growth stage, optimal irrigation window starts tomorrow.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button className="px-3 py-1.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg text-sm font-medium hover:from-green-700 hover:to-green-600 transition-colors shadow-sm">
                      Take Action
                    </button>
                    <button className="px-3 py-1.5 bg-white text-gray-700 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Crop Health */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Leaf className="w-5 h-5 mr-2 text-green-500" />
                  Crop Health
                </h3>
                <button className="text-sm text-green-600 hover:text-green-700">View All</button>
              </div>
              
              <div className="h-[180px]">
                {isClient && (
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={cropHealthData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {cropHealthData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                {cropHealthData.map((crop, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: crop.color }}></div>
                    <span className="text-sm text-gray-600">{crop.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Market Price Trends */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <BarChart2 className="w-5 h-5 mr-2 text-amber-500" />
                    Market Price Trends
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Wheat price trends over the past year</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-sm font-medium border border-amber-100">
                    Wheat
                  </button>
                  <button className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium border border-gray-100">
                    Rice
                  </button>
                </div>
              </div>
              
              <div className="h-[200px]">
                {isClient && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={marketPriceData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="price" stroke="#f59e0b" fillOpacity={1} fill="url(#colorPrice)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span className="text-sm text-gray-600">Current: ₹1,850/quintal</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">+6.9% from last month</span>
                  </div>
                </div>
                <button className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                  View Price History
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="md:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {featureModules.map((module) => (
                  <Link 
                    href={module.href}
                    key={module.title}
                    className={`bg-gradient-to-r ${module.bgGradient} rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all duration-200 flex flex-col items-center gap-3 group`}
                  >
                    <div className={`w-12 h-12 rounded-full bg-${module.color}-100 flex items-center justify-center text-${module.color}-600 group-hover:bg-${module.color}-200 transition-colors`}>
                      {module.icon}
                    </div>
                    <div className="text-center">
                      <h4 className="text-sm font-medium text-gray-800 group-hover:text-gray-900">{module.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{module.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Additional Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* News and Advisories */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.9 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                  News & Advisories
                </h3>
                <button className="text-sm text-amber-600 hover:text-amber-700">View All</button>
              </div>
              
              <div className="space-y-4">
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">Heavy Rain Alert</h4>
                      <p className="text-xs text-gray-600 mt-1">Heavy rainfall expected in your region over the next 48 hours. Consider harvesting mature crops.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">Oct 12, 2023</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          Weather
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Leaf className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">New Wheat Variety Released</h4>
                      <p className="text-xs text-gray-600 mt-1">HD-3385 wheat variety with improved rust resistance now available for the upcoming rabi season.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">Oct 10, 2023</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Crop
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-start gap-3">
                    <BarChart2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">MSP Increased for Rabi Crops</h4>
                      <p className="text-xs text-gray-600 mt-1">Government announces 7% increase in minimum support price for wheat and other rabi crops.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-gray-500">Oct 8, 2023</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Market
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Community Insights */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 1.0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-indigo-500" />
                  Community Insights
                </h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-700">Join Community</button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-medium text-sm">
                    RS
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-gray-800">Rajesh Singh</h4>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Has anyone tried the new HD-3385 wheat variety? Looking for feedback before purchasing seeds.</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        12
                      </button>
                      <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        8 replies
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-medium text-sm">
                    PK
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium text-gray-800">Prem Kumar</h4>
                      <span className="text-xs text-gray-500">Yesterday</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Sharing my experience with drip irrigation - reduced my water usage by 40% and increased yield by 15%!</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        24
                      </button>
                      <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        15 replies
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">
                    View More Discussions
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Footer Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Need Help?</h3>
                <p className="text-sm text-gray-600 mt-1">Our support team is available 24/7 to assist you with any questions</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Contact Support
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Knowledge Base
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
