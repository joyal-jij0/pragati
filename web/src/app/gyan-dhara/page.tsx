"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sun, Cloud, CloudRain, CloudDrizzle, CloudLightning, CloudSnow, CloudFog,
  Droplets, Wind, Thermometer, Umbrella, Sunrise, Sunset,
  TrendingUp, TrendingDown, AlertTriangle, Calendar, Clock, 
  MapPin, Navigation, Zap, Award, Leaf, Sprout, 
  Droplet, CloudOff, ArrowRight, ChevronRight, ChevronDown,
  Info, BarChart2, RefreshCw, Search, Filter, Download, Share2
} from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';

// Weather forecast data
const hourlyForecast = [
  { time: '6:00', temp: 24, humidity: 65, icon: <Sun className="w-5 h-5" />, precipitation: 0 },
  { time: '9:00', temp: 27, humidity: 60, icon: <Sun className="w-5 h-5" />, precipitation: 0 },
  { time: '12:00', temp: 32, humidity: 55, icon: <Sun className="w-5 h-5" />, precipitation: 0 },
  { time: '15:00', temp: 33, humidity: 50, icon: <Sun className="w-5 h-5" />, precipitation: 0 },
  { time: '18:00', temp: 30, humidity: 55, icon: <Cloud className="w-5 h-5" />, precipitation: 0 },
  { time: '21:00', temp: 27, humidity: 60, icon: <Cloud className="w-5 h-5" />, precipitation: 0 },
  { time: '0:00', temp: 25, humidity: 65, icon: <Cloud className="w-5 h-5" />, precipitation: 0 },
  { time: '3:00', temp: 24, humidity: 70, icon: <Cloud className="w-5 h-5" />, precipitation: 0 },
];

const weeklyForecast = [
  { day: 'सोम', date: 'Oct 10', maxTemp: 33, minTemp: 24, humidity: 55, icon: <Sun className="w-6 h-6" />, precipitation: 0, conditions: "साफ़" },
  { day: 'मंगल', date: 'Oct 11', maxTemp: 32, minTemp: 23, humidity: 60, icon: <Sun className="w-6 h-6" />, precipitation: 0, conditions: "साफ़" },
  { day: 'बुध', date: 'Oct 12', maxTemp: 30, minTemp: 22, humidity: 65, icon: <Cloud className="w-6 h-6" />, precipitation: 10, conditions: "आंशिक बादल" },
  { day: 'गुरु', date: 'Oct 13', maxTemp: 29, minTemp: 22, humidity: 70, icon: <CloudRain className="w-6 h-6" />, precipitation: 40, conditions: "हल्की बारिश" },
  { day: 'शुक्र', date: 'Oct 14', maxTemp: 28, minTemp: 21, humidity: 75, icon: <CloudRain className="w-6 h-6" />, precipitation: 60, conditions: "बारिश" },
  { day: 'शनि', date: 'Oct 15', maxTemp: 30, minTemp: 22, humidity: 65, icon: <Cloud className="w-6 h-6" />, precipitation: 20, conditions: "आंशिक बादल" },
  { day: 'रवि', date: 'Oct 16', maxTemp: 31, minTemp: 23, humidity: 60, icon: <Sun className="w-6 h-6" />, precipitation: 0, conditions: "साफ़" },
];

const rainfallData = [
  { month: 'Jan', actual: 10, normal: 15 },
  { month: 'Feb', actual: 12, normal: 20 },
  { month: 'Mar', actual: 25, normal: 30 },
  { month: 'Apr', actual: 35, normal: 40 },
  { month: 'May', actual: 45, normal: 50 },
  { month: 'Jun', actual: 100, normal: 120 },
  { month: 'Jul', actual: 180, normal: 200 },
  { month: 'Aug', actual: 170, normal: 190 },
  { month: 'Sep', actual: 90, normal: 100 },
  { month: 'Oct', actual: 40, normal: 50 },
  { month: 'Nov', actual: 20, normal: 25 },
  { month: 'Dec', actual: 15, normal: 20 },
];

const soilMoistureData = [
  { date: '1', value: 65 },
  { date: '2', value: 60 },
  { date: '3', value: 55 },
  { date: '4', value: 50 },
  { date: '5', value: 45 },
  { date: '6', value: 40 },
  { date: '7', value: 60 },
  { date: '8', value: 55 },
  { date: '9', value: 50 },
  { date: '10', value: 45 },
];

// Crop advisories based on weather
const cropAdvisories = [
  {
    id: 1,
    crop: "गेहूं (Wheat)",
    stage: "बुवाई (Sowing)",
    advisory: "अगले 3 दिनों तक बारिश नहीं होगी। गेहूं की बुवाई के लिए अनुकूल समय है। बुवाई के बाद हल्की सिंचाई करें।",
    advisoryEng: "No rain expected for the next 3 days. Favorable time for wheat sowing. Provide light irrigation after sowing.",
    icon: <Sprout className="w-6 h-6" />,
    color: "green",
  },
  {
    id: 2,
    crop: "धान (Rice)",
    stage: "बढ़वार (Vegetative)",
    advisory: "अगले 2 दिनों में हल्की बारिश की संभावना है। खेत में पानी का स्तर बनाए रखें। नाइट्रोजन उर्वरक का प्रयोग टालें।",
    advisoryEng: "Light rain expected in the next 2 days. Maintain water level in the field. Postpone nitrogen fertilizer application.",
    icon: <Droplet className="w-6 h-6" />,
    color: "blue",
  },
  {
    id: 3,
    crop: "सरसों (Mustard)",
    stage: "फूल (Flowering)",
    advisory: "अगले सप्ताह तापमान में गिरावट की संभावना है। सिंचाई सुनिश्चित करें और माहू के लिए निगरानी रखें।",
    advisoryEng: "Temperature drop expected next week. Ensure irrigation and monitor for aphid infestation.",
    icon: <Thermometer className="w-6 h-6" />,
    color: "amber",
  },
  {
    id: 4,
    crop: "आलू (Potato)",
    stage: "कंद वृद्धि (Tuber formation)",
    advisory: "मिट्टी में नमी बनाए रखें। अगले 5 दिनों में तापमान अनुकूल रहेगा। पिछाई करके मिट्टी चढ़ाएं।",
    advisoryEng: "Maintain soil moisture. Temperature will remain favorable for the next 5 days. Perform earthing up.",
    icon: <Leaf className="w-6 h-6" />,
    color: "brown",
  },
];

// Weather alerts
const weatherAlerts = [
  {
    id: 1,
    title: "हल्की बारिश की चेतावनी",
    titleEng: "Light Rain Alert",
    description: "13-14 अक्टूबर को हल्की से मध्यम बारिश की संभावना है। फसल कटाई और रसायनों के छिड़काव से बचें।",
    descriptionEng: "Light to moderate rainfall expected on October 13-14. Avoid harvesting and chemical spraying.",
    severity: "moderate",
    icon: <CloudRain className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "कीट प्रकोप की संभावना",
    titleEng: "Pest Outbreak Possibility",
    description: "बढ़ते तापमान और आर्द्रता के कारण माहू और सफेद मक्खी का प्रकोप हो सकता है। नियमित निगरानी करें।",
    descriptionEng: "Rising temperature and humidity may lead to aphid and whitefly infestation. Monitor regularly.",
    severity: "high",
    icon: <AlertTriangle className="w-6 h-6" />,
  },
];

// Farming activities calendar
const farmingCalendar = [
  {
    id: 1,
    date: "अक्टूबर 10-15",
    activity: "गेहूं की बुवाई",
    activityEng: "Wheat Sowing",
    description: "उन्नत किस्में: HD-2967, HD-3086, DBW-187",
    descriptionEng: "Improved varieties: HD-2967, HD-3086, DBW-187",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: 2,
    date: "अक्टूबर 15-20",
    activity: "सरसों में सिंचाई",
    activityEng: "Mustard Irrigation",
    description: "फूल आने के समय सिंचाई महत्वपूर्ण है",
    descriptionEng: "Irrigation is crucial during flowering stage",
    icon: <Droplet className="w-5 h-5" />,
  },
  {
    id: 3,
    date: "अक्टूबर 20-25",
    activity: "आलू में मिट्टी चढ़ाना",
    activityEng: "Potato Earthing Up",
    description: "कंद विकास के लिए आवश्यक प्रक्रिया",
    descriptionEng: "Essential process for tuber development",
    icon: <Sprout className="w-5 h-5" />,
  },
];

export default function GyanDharaPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("सोनीपत, हरियाणा");
  const [showAllAdvisories, setShowAllAdvisories] = useState(false);
  const [activeTab, setActiveTab] = useState("weather");
  const [language, setLanguage] = useState("hindi");

  useEffect(() => {
    setIsClient(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Format date for display
  const formattedDate = new Intl.DateTimeFormat('hi-IN', {
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
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold flex items-center">
                <Cloud className="w-8 h-8 mr-2" />
                ज्ञान धारा (Gyan Dhara)
              </h1>
              <p className="text-green-50">किसानों के लिए मौसम पूर्वानुमान और कृषि सलाह</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg text-white">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-lg text-white">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{isClient ? formattedTime : "Loading..."}</span>
              </div>
              <button 
                onClick={() => setLanguage(language === "hindi" ? "english" : "hindi")}
                className="px-4 py-2 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
              >
                {language === "hindi" ? "English" : "हिंदी"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Location selector and tabs */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm border border-gray-100">
            <MapPin className="w-5 h-5 text-green-600 ml-2" />
            <select 
              className="bg-transparent text-gray-800 font-medium focus:outline-none"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="सोनीपत, हरियाणा">सोनीपत, हरियाणा</option>
              <option value="करनाल, हरियाणा">करनाल, हरियाणा</option>
              <option value="पानीपत, हरियाणा">पानीपत, हरियाणा</option>
              <option value="रोहतक, हरियाणा">रोहतक, हरियाणा</option>
              <option value="हिसार, हरियाणा">हिसार, हरियाणा</option>
            </select>
            <button className="p-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100">
              <Navigation className="w-4 h-4" />
            </button>
          </div>

          <div className="flex bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <button 
              className={`px-4 py-2 font-medium text-sm ${activeTab === "weather" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-green-50"}`}
              onClick={() => setActiveTab("weather")}
            >
              {language === "hindi" ? "मौसम" : "Weather"}
            </button>
            <button 
              className={`px-4 py-2 font-medium text-sm ${activeTab === "advisory" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-green-50"}`}
              onClick={() => setActiveTab("advisory")}
            >
              {language === "hindi" ? "कृषि सलाह" : "Advisory"}
            </button>
            <button 
              className={`px-4 py-2 font-medium text-sm ${activeTab === "rainfall" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-green-50"}`}
              onClick={() => setActiveTab("rainfall")}
            >
              {language === "hindi" ? "वर्षा विश्लेषण" : "Rainfall Analysis"}
            </button>
            <button 
              className={`px-4 py-2 font-medium text-sm ${activeTab === "calendar" ? "bg-green-600 text-white" : "text-gray-600 hover:bg-green-50"}`}
              onClick={() => setActiveTab("calendar")}
            >
              {language === "hindi" ? "कृषि कैलेंडर" : "Farm Calendar"}
            </button>
          </div>
        </div>

        {activeTab === "weather" && (
          <>
            {/* Current weather card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {language === "hindi" ? "वर्तमान मौसम" : "Current Weather"}
                  </h2>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                      <Sun className="w-14 h-14" />
                    </div>
                    <div>
                      <p className="text-5xl font-bold text-gray-800">32°C</p>
                      <p className="text-gray-500 mt-1">{language === "hindi" ? "साफ़ आसमान" : "Clear Sky"}</p>
                      <p className="text-sm text-gray-500 mt-1">{language === "hindi" ? "अनुभव: 34°C" : "Feels like: 34°C"}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{language === "hindi" ? "आर्द्रता" : "Humidity"}</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-800">65%</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Wind className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{language === "hindi" ? "हवा" : "Wind"}</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-800">12 km/h</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Umbrella className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{language === "hindi" ? "वर्षा" : "Rainfall"}</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-800">0 mm</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <Droplet className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{language === "hindi" ? "मिट्टी की नमी" : "Soil Moisture"}</span>
                      </div>
                      <p className="text-lg font-semibold text-gray-800">45%</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 border-t lg:border-t-0 lg:border-l border-gray-100 lg:pl-6 pt-6 lg:pt-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      {language === "hindi" ? "सूर्योदय और सूर्यास्त" : "Sunrise & Sunset"}
                    </h3>
                  </div>
                  
                  <div className="flex justify-between items-center bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                        <Sunrise className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{language === "hindi" ? "सूर्योदय" : "Sunrise"}</p>
                        <p className="text-xl font-semibold text-gray-800">06:15 AM</p>
                      </div>
                    </div>
                    
                    <div className="w-24 h-0.5 bg-gradient-to-r from-amber-200 to-orange-200"></div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                        <Sunset className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{language === "hindi" ? "सूर्यास्त" : "Sunset"}</p>
                        <p className="text-xl font-semibold text-gray-800">05:45 PM</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      {language === "hindi" ? "कृषि मौसम सूचकांक" : "Agro-Weather Index"}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                        <p className="text-sm text-gray-600">{language === "hindi" ? "सिंचाई की आवश्यकता" : "Irrigation Need"}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-semibold text-green-700">उच्च</span>
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                        <p className="text-sm text-gray-600">{language === "hindi" ? "फसल रोग जोखिम" : "Disease Risk"}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-semibold text-amber-700">मध्यम</span>
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hourly forecast */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {language === "hindi" ? "घंटेवार पूर्वानुमान" : "Hourly Forecast"}
                </h2>
                <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                  {language === "hindi" ? "और देखें" : "View More"}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
                {hourlyForecast.map((hour, index) => (
                  <div 
                    key={index} 
                    className={`flex-shrink-0 w-24 rounded-lg p-3 flex flex-col items-center ${
                      index === 0 ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-700">{hour.time}</p>
                    <div className={`my-2 text-${index === 0 ? 'blue' : 'gray'}-500`}>
                      {hour.icon}
                    </div>
                    <p className="text-lg font-bold text-gray-800">{hour.temp}°C</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Droplets className="w-3 h-3 mr-1" />
                      <span>{hour.humidity}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 7-day forecast */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {language === "hindi" ? "7-दिन का पूर्वानुमान" : "7-Day Forecast"}
              </h2>
              
              <div className="space-y-3">
                {weeklyForecast.map((day, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg grid grid-cols-7 items-center ${
                      index === 0 ? 'bg-blue-50 border border-blue-100' : 'bg-gray-50 border border-gray-100'
                    }`}
                  >
                    <div className="col-span-2 md:col-span-1">
                      <p className="text-sm font-medium text-gray-700">{day.day}</p>
                      <p className="text-xs text-gray-500">{day.date}</p>
                    </div>
                    
                    <div className="col-span-1 flex justify-center">
                      {day.icon}
                    </div>
                    
                    <div className="col-span-2 md:col-span-1 text-center">
                      <p className="text-sm text-gray-600">{language === "hindi" ? "तापमान" : "Temp"}</p>
                      <p className="text-sm font-medium">
                        <span className="text-red-600">{day.maxTemp}°</span> / 
                        <span className="text-blue-600">{day.minTemp}°</span>
                      </p>
                    </div>
                    
                    <div className="hidden md:block md:col-span-1 text-center">
                      <p className="text-sm text-gray-600">{language === "hindi" ? "आर्द्रता" : "Humidity"}</p>
                      <p className="text-sm font-medium text-gray-800">{day.humidity}%</p>
                    </div>
                    
                    <div className="hidden md:block md:col-span-1 text-center">
                      <p className="text-sm text-gray-600">{language === "hindi" ? "वर्षा" : "Rain"}</p>
                      <p className="text-sm font-medium text-gray-800">{day.precipitation}%</p>
                    </div>
                    
                    <div className="col-span-2 text-right">
                      <p className="text-sm text-gray-600">{language === "hindi" ? "स्थिति" : "Conditions"}</p>
                      <p className="text-sm font-medium text-gray-800">{language === "hindi" ? day.conditions : day.conditions}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Weather alerts */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                  {language === "hindi" ? "मौसम चेतावनी" : "Weather Alerts"}
                </h2>
              </div>
              
              <div className="space-y-4">
                {weatherAlerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-4 rounded-lg border ${
                      alert.severity === 'high' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        alert.severity === 'high' ? 'bg-red-100 text-red-500' : 'bg-amber-100 text-amber-500'
                      }`}>
                        {alert.icon}
                      </div>
                      <div>
                        <h3 className={`font-medium ${
                          alert.severity === 'high' ? 'text-red-700' : 'text-amber-700'
                        }`}>
                          {language === "hindi" ? alert.title : alert.titleEng}
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {language === "hindi" ? alert.description : alert.descriptionEng}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {activeTab === "advisory" && (
          <>
            {/* Crop advisories */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Sprout className="w-6 h-6 mr-2 text-green-600" />
                  {language === "hindi" ? "फसल सलाह" : "Crop Advisories"}
                </h2>
                <button 
                  onClick={() => setShowAllAdvisories(!showAllAdvisories)}
                  className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                >
                  {showAllAdvisories 
                    ? (language === "hindi" ? "कम दिखाएं" : "Show Less") 
                    : (language === "hindi" ? "सभी देखें" : "View All")}
                  <ChevronDown className={`w-4 h-4 transform ${showAllAdvisories ? 'rotate-180' : ''} transition-transform`} />
                </button>
              </div>
              
              <div className="space-y-4">
                {(showAllAdvisories ? cropAdvisories : cropAdvisories.slice(0, 2)).map((advisory) => (
                  <div 
                    key={advisory.id} 
                    className={`p-5 rounded-lg border bg-${advisory.color}-50 border-${advisory.color}-100`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className={`p-3 rounded-full bg-${advisory.color}-100 text-${advisory.color}-600 self-start`}>
                        {advisory.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-medium text-gray-800">{advisory.crop}</h3>
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {advisory.stage}
                          </span>
                        </div>
                        <p className="text-gray-600">
                          {language === "hindi" ? advisory.advisory : advisory.advisoryEng}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Soil health and moisture */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Droplet className="w-6 h-6 mr-2 text-blue-500" />
                {language === "hindi" ? "मिट्टी की स्थिति" : "Soil Conditions"}
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">
                    {language === "hindi" ? "मिट्टी की नमी" : "Soil Moisture"}
                  </h3>
                  <div className="h-64 bg-gray-50 p-4 rounded-lg">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={soilMoistureData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="date" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#93c5fd" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <p className="text-sm text-gray-600">{language === "hindi" ? "वर्तमान नमी" : "Current Moisture"}</p>
                      <p className="text-lg font-semibold text-blue-700">45%</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <p className="text-sm text-gray-600">{language === "hindi" ? "अनुशंसित नमी" : "Recommended"}</p>
                      <p className="text-lg font-semibold text-blue-700">50-60%</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">
                    {language === "hindi" ? "मिट्टी की स्वास्थ्य सलाह" : "Soil Health Advisory"}
                  </h3>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100 h-64 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 rounded-full bg-green-100 text-green-600">
                          <Info className="w-5 h-5" />
                        </div>
                        <h4 className="font-medium text-green-800">
                          {language === "hindi" ? "मिट्टी की स्थिति" : "Soil Status"}
                        </h4>
                      </div>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          {language === "hindi" 
                            ? "मिट्टी की नमी कम है, सिंचाई की आवश्यकता है।" 
                            : "Soil moisture is low, irrigation is needed."}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          {language === "hindi" 
                            ? "मिट्टी का pH मान 6.8 है, जो अधिकांश फसलों के लिए उपयुक्त है।" 
                            : "Soil pH is 6.8, which is suitable for most crops."}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          {language === "hindi" 
                            ? "नाइट्रोजन की मात्रा मध्यम है, फसल की आवश्यकता अनुसार उर्वरक का प्रयोग करें।" 
                            : "Nitrogen level is moderate, apply fertilizer as per crop requirement."}
                        </li>
                      </ul>
                    </div>
                    <button className="self-start mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                      {language === "hindi" ? "विस्तृत रिपोर्ट देखें" : "View Detailed Report"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pest and disease alerts */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-amber-500" />
                {language === "hindi" ? "कीट और रोग चेतावनी" : "Pest & Disease Alerts"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-amber-100 text-amber-600">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <h3 className="font-medium text-amber-800">
                      {language === "hindi" ? "माहू (एफिड)" : "Aphids"}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-3">
                    {language === "hindi" 
                      ? "वर्तमान तापमान और आर्द्रता स्थितियां माहू के प्रकोप के लिए अनुकूल हैं। सरसों और गेहूं की फसलों की नियमित निगरानी करें।" 
                      : "Current temperature and humidity conditions are favorable for aphid infestation. Regularly monitor mustard and wheat crops."}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-amber-700">
                      {language === "hindi" ? "जोखिम स्तर: मध्यम" : "Risk Level: Moderate"}
                    </span>
                    <button className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                      {language === "hindi" ? "नियंत्रण उपाय" : "Control Measures"}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-red-100 text-red-600">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <h3 className="font-medium text-red-800">
                      {language === "hindi" ? "झुलसा रोग" : "Blight Disease"}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-3">
                    {language === "hindi" 
                      ? "आलू की फसल में झुलसा रोग का खतरा बढ़ गया है। अगले 3 दिनों में बारिश की संभावना के कारण निगरानी बढ़ाएं।" 
                      : "Risk of blight disease in potato crop has increased. Increase monitoring due to possibility of rain in next 3 days."}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-red-700">
                      {language === "hindi" ? "जोखिम स्तर: उच्च" : "Risk Level: High"}
                    </span>
                    <button className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1">
                      {language === "hindi" ? "नियंत्रण उपाय" : "Control Measures"}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {activeTab === "rainfall" && (
          <>
            {/* Rainfall analysis */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <CloudRain className="w-6 h-6 mr-2 text-blue-500" />
                  {language === "hindi" ? "वर्षा विश्लेषण" : "Rainfall Analysis"}
                </h2>
                <div className="flex items-center gap-3">
                  <button className="p-2 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="h-80 bg-gray-50 p-4 rounded-lg mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rainfallData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Bar dataKey="actual" name={language === "hindi" ? "वास्तविक वर्षा" : "Actual Rainfall"} fill="#3b82f6" />
                    <Bar dataKey="normal" name={language === "hindi" ? "सामान्य वर्षा" : "Normal Rainfall"} fill="#93c5fd" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">
                    {language === "hindi" ? "वार्षिक वर्षा" : "Annual Rainfall"}
                  </h3>
                  <div className="flex items-end gap-2">
                    <p className="text-3xl font-bold text-blue-700">742</p>
                    <p className="text-gray-600 mb-1">mm</p>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+5% {language === "hindi" ? "सामान्य से" : "from normal"}</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">
                    {language === "hindi" ? "मानसून वर्षा" : "Monsoon Rainfall"}
                  </h3>
                  <div className="flex items-end gap-2">
                    <p className="text-3xl font-bold text-blue-700">540</p>
                    <p className="text-gray-600 mb-1">mm</p>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-red-600">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm font-medium">-8% {language === "hindi" ? "सामान्य से" : "from normal"}</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-medium text-blue-800 mb-2">
                    {language === "hindi" ? "वर्षा के दिन" : "Rainy Days"}
                  </h3>
                  <div className="flex items-end gap-2">
                    <p className="text-3xl font-bold text-blue-700">48</p>
                    <p className="text-gray-600 mb-1">{language === "hindi" ? "दिन" : "days"}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+3 {language === "hindi" ? "सामान्य से" : "from normal"}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-amber-50 p-4 rounded-lg border border-amber-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-amber-100 text-amber-600 mt-1">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-amber-800 mb-1">
                      {language === "hindi" ? "वर्षा पैटर्न विश्लेषण" : "Rainfall Pattern Analysis"}
                    </h3>
                    <p className="text-gray-700">
                      {language === "hindi" 
                        ? "इस वर्ष मानसून की शुरुआत 5 दिन देरी से हुई, लेकिन कुल वर्षा सामान्य से अधिक रही। जुलाई में सबसे अधिक वर्षा दर्ज की गई, जबकि अगस्त में वर्षा सामान्य से कम रही। सितंबर के अंत में मानसून की वापसी देरी से हुई।" 
                        : "This year, monsoon onset was delayed by 5 days, but total rainfall was above normal. July recorded the highest rainfall, while August received below normal rainfall. Monsoon withdrawal was delayed at the end of September."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Water resource management */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Droplet className="w-6 h-6 mr-2 text-blue-500" />
                {language === "hindi" ? "जल संसाधन प्रबंधन" : "Water Resource Management"}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-medium text-blue-800 mb-3">
                    {language === "hindi" ? "जल संरक्षण सुझाव" : "Water Conservation Tips"}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                        <Droplet className="w-4 h-4" />
                      </div>
                      <p className="text-gray-700">
                        {language === "hindi" 
                          ? "ड्रिप सिंचाई का उपयोग करें, यह 60% तक पानी बचा सकता है।" 
                          : "Use drip irrigation, it can save up to 60% water."}
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                        <Droplet className="w-4 h-4" />
                      </div>
                      <p className="text-gray-700">
                        {language === "hindi" 
                          ? "सुबह या शाम को सिंचाई करें, दिन के समय वाष्पीकरण अधिक होता है।" 
                          : "Irrigate in morning or evening, evaporation is higher during daytime."}
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                        <Droplet className="w-4 h-4" />
                      </div>
                      <p className="text-gray-700">
                        {language === "hindi" 
                          ? "वर्षा जल संचयन संरचनाओं का निर्माण करें।" 
                          : "Construct rainwater harvesting structures."}
                      </p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 mt-0.5">
                        <Droplet className="w-4 h-4" />
                      </div>
                      <p className="text-gray-700">
                        {language === "hindi" 
                          ? "मिट्टी में नमी बनाए रखने के लिए मल्चिंग का उपयोग करें।" 
                          : "Use mulching to retain soil moisture."}
                      </p>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h3 className="text-lg font-medium text-blue-800 mb-3">
                    {language === "hindi" ? "जल स्रोत स्थिति" : "Water Source Status"}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-gray-700">{language === "hindi" ? "भूजल स्तर" : "Groundwater Level"}</p>
                        <p className="text-sm font-medium text-amber-600">65%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-gray-700">{language === "hindi" ? "नहर जल उपलब्धता" : "Canal Water Availability"}</p>
                        <p className="text-sm font-medium text-green-600">80%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-gray-700">{language === "hindi" ? "तालाब जल स्तर" : "Pond Water Level"}</p>
                        <p className="text-sm font-medium text-red-600">40%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-gray-700">{language === "hindi" ? "बांध जल स्तर" : "Dam Water Level"}</p>
                        <p className="text-sm font-medium text-green-600">75%</p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}

        {activeTab === "calendar" && (
          <>
            {/* Farming calendar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-green-600" />
                  {language === "hindi" ? "कृषि कैलेंडर" : "Farming Calendar"}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{language === "hindi" ? "अक्टूबर 2025" : "April 2025"}</span>
                  <div className="flex">
                    <button className="p-1.5 bg-gray-50 text-gray-600 rounded-l-md hover:bg-gray-100 border border-gray-200">
                      <ChevronRight className="w-4 h-4 transform rotate-180" />
                    </button>
                    <button className="p-1.5 bg-gray-50 text-gray-600 rounded-r-md hover:bg-gray-100 border border-gray-200">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                    {language === "hindi" 
                      ? day === 'Sun' ? 'रवि' 
                        : day === 'Mon' ? 'सोम' 
                        : day === 'Tue' ? 'मंगल' 
                        : day === 'Wed' ? 'बुध' 
                        : day === 'Thu' ? 'गुरु' 
                        : day === 'Fri' ? 'शुक्र' 
                        : 'शनि'
                      : day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
                  // Example activity markers
                  const hasPlanting = [3, 12, 20].includes(date);
                  const hasHarvesting = [8, 25].includes(date);
                  const hasSpraying = [5, 15, 28].includes(date);
                  const hasIrrigation = [2, 9, 16, 23, 30].includes(date);
                  
                  return (
                    <div 
                      key={date} 
                      className={`p-2 border ${date === 10 ? 'bg-green-50 border-green-200' : 'border-gray-100'} rounded-md text-center relative ${
                        date < 10 ? 'opacity-50' : ''
                      }`}
                    >
                      <p className={`text-sm ${date === 10 ? 'font-bold text-green-800' : 'font-medium text-gray-700'}`}>
                        {date}
                      </p>
                      <div className="flex justify-center gap-1 mt-1">
                        {hasPlanting && (
                          <div className="w-2 h-2 rounded-full bg-green-500" title={language === "hindi" ? "बुवाई" : "Planting"}></div>
                        )}
                        {hasHarvesting && (
                          <div className="w-2 h-2 rounded-full bg-amber-500" title={language === "hindi" ? "कटाई" : "Harvesting"}></div>
                        )}
                        {hasSpraying && (
                          <div className="w-2 h-2 rounded-full bg-blue-500" title={language === "hindi" ? "छिड़काव" : "Spraying"}></div>
                        )}
                        {hasIrrigation && (
                          <div className="w-2 h-2 rounded-full bg-cyan-500" title={language === "hindi" ? "सिंचाई" : "Irrigation"}></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600">{language === "hindi" ? "बुवाई" : "Planting"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm text-gray-600">{language === "hindi" ? "कटाई" : "Harvesting"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-600">{language === "hindi" ? "छिड़काव" : "Spraying"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                  <span className="text-sm text-gray-600">{language === "hindi" ? "सिंचाई" : "Irrigation"}</span>
                </div>
              </div>
            </motion.div>

            {/* Crop calendar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Sprout className="w-6 h-6 mr-2 text-green-600" />
                {language === "hindi" ? "फसल कैलेंडर" : "Crop Calendar"}
              </h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                        {language === "hindi" ? "फसल" : "Crop"}
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                        {language === "hindi" ? "किस्म" : "Variety"}
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                        {language === "hindi" ? "बुवाई का समय" : "Sowing Time"}
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                        {language === "hindi" ? "कटाई का समय" : "Harvesting Time"}
                      </th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                        {language === "hindi" ? "अवधि (दिन)" : "Duration (days)"}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {language === "hindi" ? "गेहूं" : "Wheat"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        HD-2967, PBW-550
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {language === "hindi" ? "अक्टूबर-नवंबर" : "October-November"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {language === "hindi" ? "मार्च-अप्रैल" : "March-April"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        140-150
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {language === "hindi" ? "धान" : "Rice"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        Pusa-1121, PR-126
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {language === "hindi" ? "जून-जुलाई" : "June-July"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {language === "hindi" ? "अक्टूबर-नवंबर" : "October-November"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        120-130
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {language === "hindi" ? "सरसों" : "Mustard"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        RH-749, RH-725
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {language === "hindi" ? "अक्टूबर" : "October"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {language === "hindi" ? "फरवरी-मार्च" : "February-March"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        110-120
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {language === "hindi" ? "मक्का" : "Maize"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        PMH-1, PMH-2
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {language === "hindi" ? "जून-जुलाई" : "June-July"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {language === "hindi" ? "सितंबर-अक्टूबर" : "September-October"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        90-100
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {language === "hindi" ? "आलू" : "Potato"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        Kufri Pukhraj, Kufri Jyoti
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {language === "hindi" ? "अक्टूबर" : "October"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {language === "hindi" ? "जनवरी-फरवरी" : "January-February"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        90-110
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-green-100 text-green-600 mt-1">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800 mb-1">
                      {language === "hindi" ? "फसल कैलेंडर नोट" : "Crop Calendar Note"}
                    </h3>
                    <p className="text-gray-700">
                      {language === "hindi" 
                        ? "फसल कैलेंडर स्थानीय जलवायु परिस्थितियों के अनुसार भिन्न हो सकता है। अपने क्षेत्र के लिए सटीक बुवाई और कटाई के समय के लिए स्थानीय कृषि विभाग से परामर्श करें।" 
                        : "Crop calendar may vary according to local climatic conditions. Consult local agriculture department for accurate sowing and harvesting times for your region."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Seasonal activities */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-blue-500" />
                {language === "hindi" ? "मौसमी गतिविधियां" : "Seasonal Activities"}
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-blue-800 mb-3 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                      <span className="text-sm font-bold">1</span>
                    </span>
                    {language === "hindi" ? "अक्टूबर-नवंबर (रबी फसल बुवाई)" : "October-November (Rabi Crop Sowing)"}
                  </h3>
                  
                  <ul className="space-y-2 pl-10">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <p className="text-gray-700">
                        {language === "hindi" 
                          ? "गेहूं, सरसों, चना और मटर की बुवाई करें।" 
                          : "Sow wheat, mustard, chickpea, and peas."}
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <p className="text-gray-700">
                        {language === "hindi" 
                          ? "आलू की रोपाई करें।" 
                          : "Plant potatoes."}
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <p className="text-gray-700">
                        {language === "hindi" 
                          ? "सब्जियों की नर्सरी तैयार करें।" 
                          : "Prepare nursery for vegetables."}
                      </p>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-green-800 mb-3 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
                      <span className="text-sm font-bold">2</span>
                    </span>
                    {language === "hindi" ? "मार्च-अप्रैल (रबी फसल कटाई)" : "March-April (Rabi Crop Harvesting)"}
                  </h3>
                  
                  <ul className="space-y-2 pl-10">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <p className="text-gray-700">
                        {language === "hindi" 
                          ? "गेहूं, सरसों और चने की कटाई करें।" 
                          : "Harvest wheat, mustard, and chickpea."}
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <p className="text-gray-700">
                        {language === "hindi" 
                          ? "ग्रीष्मकालीन सब्जियों की बुवाई करें।" 
                          : "Sow summer vegetables."}
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">•</span>
                      <p className="text-gray-700">
                        {language === "hindi" 
                          ? "फलों के बागों में सिंचाई और निराई करें।" 
                          : "Irrigate and weed fruit orchards."}
                      </p>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-amber-800 mb-3 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mr-2">
                      <span className="text-sm font-bold">3</span>
                    </span>
                    {language === "hindi" ? "जून-जुलाई (खरीफ फसल बुवाई)" : "June-July (Kharif Crop Sowing)"}
                  </h3>
                  
                  <ul className="space-y-2 pl-10">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <p className="text-gray-700">
                        {language === "hindi" 
                          ? "धान की रोपाई करें।" 
                          : "Transplant rice seedlings."}
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <p className="text-gray-700">
                        {language === "hindi" 
                          ? "मक्का, बाजरा और ज्वार की बुवाई करें।" 
                          : "Sow maize, pearl millet, and sorghum."}
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <p className="text-gray-700">
                        {language === "hindi" 
                          ? "दलहन और तिलहन फसलों की बुवाई करें।" 
                          : "Sow pulses and oilseed crops."}
                      </p>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-orange-800 mb-3 flex items-center">
                    <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mr-2">
                      <span className="text-sm font-bold">4</span>
                    </span>
                    {language === "hindi" ? "सितंबर-अक्टूबर (खरीफ फसल कटाई)" : "September-October (Kharif Crop Harvesting)"}
                  </h3>
                  
                  <ul className="space-y-2 pl-10">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <p className="text-gray-700">
                        {language === "hindi" 
                          ? "धान, मक्का और बाजरा की कटाई करें।" 
                          : "Harvest rice, maize, and pearl millet."}
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <p className="text-gray-700">
                        {language === "hindi" 
                          ? "रबी फसलों के लिए खेत तैयार करें।" 
                          : "Prepare fields for rabi crops."}
                      </p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">•</span>
                      <p className="text-gray-700">
                        {language === "hindi" 
                          ? "सब्जियों की शरदकालीन फसलें लगाएं।" 
                          : "Plant winter vegetable crops."}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}