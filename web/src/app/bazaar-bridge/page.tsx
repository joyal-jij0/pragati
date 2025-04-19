"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  TrendingUp, TrendingDown, BarChart2, ShoppingCart, Truck, 
  Package, Search, Filter, ChevronDown, ChevronRight, Star, 
  Calendar, Clock, MapPin, DollarSign, AlertTriangle, 
  Info, ArrowRight, Users, Shield, CheckCircle, Zap,Eye, Plus,
  RefreshCw, Share2, Download, Bookmark, Heart, ShoppingBag,
  Percent, Award, Tag, Layers, MessageCircle, HelpCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts';

// Sample price data
const priceData = [
  { date: 'Oct 1', price: 1800, avg: 1750 },
  { date: 'Oct 2', price: 1820, avg: 1760 },
  { date: 'Oct 3', price: 1850, avg: 1770 },
  { date: 'Oct 4', price: 1830, avg: 1780 },
  { date: 'Oct 5', price: 1860, avg: 1790 },
  { date: 'Oct 6', price: 1890, avg: 1800 },
  { date: 'Oct 7', price: 1910, avg: 1810 },
  { date: 'Oct 8', price: 1940, avg: 1820 },
  { date: 'Oct 9', price: 1970, avg: 1830 },
  { date: 'Oct 10', price: 1990, avg: 1840 },
  { date: 'Oct 11', price: 2010, avg: 1850 },
  { date: 'Oct 12', price: 2030, avg: 1860 },
  { date: 'Oct 13', price: 2050, avg: 1870 },
  { date: 'Oct 14', price: 2070, avg: 1880 },
];

// Sample price forecast data
const priceForecastData = [
  { date: 'Oct 15', minPrice: 2050, maxPrice: 2100, avg: 2075 },
  { date: 'Oct 16', minPrice: 2060, maxPrice: 2110, avg: 2085 },
  { date: 'Oct 17', minPrice: 2070, maxPrice: 2120, avg: 2095 },
  { date: 'Oct 18', minPrice: 2080, maxPrice: 2130, avg: 2105 },
  { date: 'Oct 19', minPrice: 2090, maxPrice: 2140, avg: 2115 },
  { date: 'Oct 20', minPrice: 2100, maxPrice: 2150, avg: 2125 },
  { date: 'Oct 21', minPrice: 2110, maxPrice: 2160, avg: 2135 },
];

// Sample market data
const marketData = [
  { 
    id: 1,
    market: "Azadpur Mandi", 
    location: "Delhi",
    distance: "15 km",
    crops: [
      { name: "Tomato", price: 1850, trend: "up", change: 2.5 },
      { name: "Potato", price: 1200, trend: "down", change: 1.2 },
      { name: "Onion", price: 2200, trend: "up", change: 3.8 },
    ] 
  },
  { 
    id: 2,
    market: "Ghazipur Mandi", 
    location: "Delhi",
    distance: "22 km",
    crops: [
      { name: "Tomato", price: 1820, trend: "up", change: 2.0 },
      { name: "Potato", price: 1180, trend: "down", change: 1.5 },
      { name: "Onion", price: 2150, trend: "up", change: 3.2 },
    ] 
  },
  { 
    id: 3,
    market: "Sonipat Mandi", 
    location: "Haryana",
    distance: "35 km",
    crops: [
      { name: "Tomato", price: 1780, trend: "up", change: 1.8 },
      { name: "Potato", price: 1150, trend: "down", change: 2.0 },
      { name: "Onion", price: 2100, trend: "up", change: 2.5 },
    ] 
  },
];

// Sample buyer requirements
const buyerRequirements = [
  {
    id: 1,
    buyer: "Fresh Harvest Ltd.",
    crop: "Tomato",
    variety: "Hybrid",
    quantity: "5 tons",
    price: "₹20-22/kg",
    location: "Delhi NCR",
    deadline: "Oct 25, 2023",
    verified: true,
    rating: 4.8,
    image: "/images/buyers/buyer1.jpg"
  },
  {
    id: 2,
    buyer: "Organic Foods Co.",
    crop: "Potato",
    variety: "Kufri Jyoti",
    quantity: "10 tons",
    price: "₹15-16/kg",
    location: "Sonipat",
    deadline: "Oct 30, 2023",
    verified: true,
    rating: 4.5,
    image: "/images/buyers/buyer2.jpg"
  },
  {
    id: 3,
    buyer: "Green Valley Exports",
    crop: "Onion",
    variety: "Red",
    quantity: "8 tons",
    price: "₹25-28/kg",
    location: "Ghaziabad",
    deadline: "Nov 5, 2023",
    verified: true,
    rating: 4.7,
    image: "/images/buyers/buyer3.jpg"
  },
];

// Sample products
const products = [
  {
    id: 1,
    name: "NPK 19-19-19 Fertilizer",
    category: "Fertilizer",
    brand: "Coromandel",
    price: 1250,
    unit: "50 kg bag",
    rating: 4.7,
    reviews: 128,
    image: "/images/products/fertilizer1.jpg",
    inStock: true,
    discount: 5,
    verified: true
  },
  {
    id: 2,
    name: "Tata Rallis Tafgor",
    category: "Insecticide",
    brand: "Tata Rallis",
    price: 450,
    unit: "1 liter",
    rating: 4.5,
    reviews: 96,
    image: "/images/products/insecticide1.jpg",
    inStock: true,
    discount: 0,
    verified: true
  },
  {
    id: 3,
    name: "Hybrid Tomato Seeds",
    category: "Seeds",
    brand: "Syngenta",
    price: 850,
    unit: "500g packet",
    rating: 4.8,
    reviews: 75,
    image: "/images/products/seeds1.jpg",
    inStock: true,
    discount: 10,
    verified: true
  },
  {
    id: 4,
    name: "Drip Irrigation Kit",
    category: "Equipment",
    brand: "Netafim",
    price: 5500,
    unit: "1 acre kit",
    rating: 4.6,
    reviews: 42,
    image: "/images/products/equipment1.jpg",
    inStock: false,
    discount: 0,
    verified: true
  },
];

// Sample FPO group buying
const groupBuyingDeals = [
  {
    id: 1,
    product: "Urea Fertilizer",
    originalPrice: 320,
    groupPrice: 280,
    unit: "per 50kg bag",
    minQuantity: 100,
    currentParticipants: 18,
    targetParticipants: 25,
    deadline: "Oct 25, 2023",
    organizer: "Kisan FPO"
  },
  {
    id: 2,
    product: "Tractor Rental",
    originalPrice: 800,
    groupPrice: 600,
    unit: "per day",
    minQuantity: 30,
    currentParticipants: 22,
    targetParticipants: 30,
    deadline: "Oct 30, 2023",
    organizer: "Pragati Kisan Sangh"
  }
];

export default function BazaarBridge() {
  const [activeTab, setActiveTab] = useState("market-prices");
  const [language, setLanguage] = useState("english");
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [selectedMarket, setSelectedMarket] = useState(null);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {language === "hindi" ? "बाज़ार ब्रिज" : "Bazaar Bridge"}
          </h1>
          <p className="text-gray-600 mt-1">
            {language === "hindi" 
              ? "बाज़ार मूल्य, खरीदारों से जुड़ें और कृषि आदानों की खरीदारी करें" 
              : "Market prices, connect with buyers, and shop for agricultural inputs"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLanguage("english")}
            className={`px-3 py-1.5 text-sm rounded-md ${
              language === "english" 
                ? "bg-green-100 text-green-800 font-medium" 
                : "bg-gray-100 text-gray-600"
            }`}
          >
            English
          </button>
          <button 
            onClick={() => setLanguage("hindi")}
            className={`px-3 py-1.5 text-sm rounded-md ${
              language === "hindi" 
                ? "bg-green-100 text-green-800 font-medium" 
                : "bg-gray-100 text-gray-600"
            }`}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab("market-prices")}
            className={`flex-1 py-4 px-4 text-center font-medium text-sm transition-colors duration-200 ${
              activeTab === "market-prices"
                ? "text-green-600 border-b-2 border-green-500"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <BarChart2 className="w-4 h-4" />
              <span>{language === "hindi" ? "बाज़ार मूल्य" : "Market Prices"}</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("buyer-connect")}
            className={`flex-1 py-4 px-4 text-center font-medium text-sm transition-colors duration-200 ${
              activeTab === "buyer-connect"
                ? "text-green-600 border-b-2 border-green-500"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="w-4 h-4" />
              <span>{language === "hindi" ? "खरीदार कनेक्ट" : "Buyer Connect"}</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("input-marketplace")}
            className={`flex-1 py-4 px-4 text-center font-medium text-sm transition-colors duration-200 ${
              activeTab === "input-marketplace"
                ? "text-green-600 border-b-2 border-green-500"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span>{language === "hindi" ? "कृषि आदान बाज़ार" : "Input Marketplace"}</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("group-buying")}
            className={`flex-1 py-4 px-4 text-center font-medium text-sm transition-colors duration-200 ${
              activeTab === "group-buying"
                ? "text-green-600 border-b-2 border-green-500"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Users className="w-4 h-4" />
              <span>{language === "hindi" ? "सामूहिक खरीद" : "Group Buying"}</span>
            </div>
          </button>
        </div>

        <div className="p-6">
          {/* Market Prices Tab */}
          {activeTab === "market-prices" && (
            <div>
              {/* Search and filter */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder={language === "hindi" ? "फसल या मंडी खोजें..." : "Search crop or market..."}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <select className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 text-sm bg-white">
                      <option value="all">{language === "hindi" ? "सभी फसलें" : "All Crops"}</option>
                      <option value="wheat">{language === "hindi" ? "गेहूं" : "Wheat"}</option>
                      <option value="rice">{language === "hindi" ? "चावल" : "Rice"}</option>
                      <option value="tomato">{language === "hindi" ? "टमाटर" : "Tomato"}</option>
                      <option value="potato">{language === "hindi" ? "आलू" : "Potato"}</option>
                      <option value="onion">{language === "hindi" ? "प्याज" : "Onion"}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                  <div className="relative">
                    <select className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 text-sm bg-white">
                      <option value="all">{language === "hindi" ? "सभी मंडियां" : "All Markets"}</option>
                      <option value="nearby">{language === "hindi" ? "नज़दीकी" : "Nearby"}</option>
                      <option value="delhi">{language === "hindi" ? "दिल्ली" : "Delhi"}</option>
                      <option value="haryana">{language === "hindi" ? "हरियाणा" : "Haryana"}</option>
                      <option value="punjab">{language === "hindi" ? "पंजाब" : "Punjab"}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Price trend chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {language === "hindi" ? "गेहूं मूल्य प्रवृत्ति" : "Wheat Price Trend"}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {language === "hindi" ? "अज़ादपुर मंडी, दिल्ली" : "Azadpur Mandi, Delhi"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" />
                      <span>+12.5%</span>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-2 rounded-md hover:bg-gray-100 text-gray-500">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-md hover:bg-gray-100 text-gray-500">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '8px', 
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                          border: '1px solid #E5E7EB'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#10B981" 
                        fillOpacity={1} 
                        fill="url(#colorPrice)" 
                        name={language === "hindi" ? "वर्तमान मूल्य (₹/क्विंटल)" : "Current Price (₹/quintal)"}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="avg" 
                        stroke="#6366F1" 
                        fillOpacity={0.3} 
                        fill="url(#colorAvg)" 
                        name={language === "hindi" ? "औसत मूल्य (₹/क्विंटल)" : "Average Price (₹/quintal)"}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-4">
                  <h3 className="text-base font-medium text-gray-800 mb-3">
                    {language === "hindi" ? "मूल्य पूर्वानुमान" : "Price Forecast"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-800">
                            {language === "hindi" ? "अल्पकालिक पूर्वानुमान (7 दिन)" : "Short-term Forecast (7 days)"}
                          </h4>
                          <p className="text-blue-700 mt-1">
                            {language === "hindi" 
                              ? "मूल्य में 3-5% की वृद्धि की संभावना है" 
                              : "Prices likely to increase by 3-5%"}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Info className="w-4 h-4 text-blue-500" />
                            <p className="text-xs text-blue-600">
                              {language === "hindi" 
                                ? "आने वाले त्योहारों के कारण मांग में वृद्धि" 
                                : "Increased demand due to upcoming festivals"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-amber-100 rounded-full text-amber-600">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium text-amber-800">
                            {language === "hindi" ? "बिक्री के लिए अनुशंसित समय" : "Recommended Selling Time"}
                          </h4>
                          <p className="text-amber-700 mt-1">
                            {language === "hindi" 
                              ? "अगले 5-7 दिनों में बिक्री करने पर विचार करें" 
                              : "Consider selling in the next 5-7 days"}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            <p className="text-xs text-amber-600">
                              {language === "hindi" 
                                ? "अक्टूबर के अंत में मूल्य में गिरावट की संभावना" 
                                : "Prices likely to decline by end of October"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Nearby markets */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {language === "hindi" ? "आस-पास की मंडियां" : "Nearby Markets"}
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                          {language === "hindi" ? "मंडी" : "Market"}
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                          {language === "hindi" ? "स्थान" : "Location"}
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                          {language === "hindi" ? "फसल" : "Crop"}
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                          {language === "hindi" ? "मूल्य (₹/क्विंटल)" : "Price (₹/quintal)"}
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                          {language === "hindi" ? "प्रवृत्ति" : "Trend"}
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                          {language === "hindi" ? "कार्रवाई" : "Action"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {marketData.map((market) => (
                        market.crops.map((crop, cropIndex) => (
                          <tr key={`${market.id}-${cropIndex}`} className="hover:bg-gray-50">
                            {cropIndex === 0 && (
                              <td 
                                className="py-3 px-4 text-sm text-gray-800 font-medium" 
                                rowSpan={market.crops.length}
                              >
                                {market.market}
                              </td>
                            )}
                            {cropIndex === 0 && (
                              <td 
                                className="py-3 px-4 text-sm text-gray-600" 
                                rowSpan={market.crops.length}
                              >
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                  <span>{market.location}</span>
                                  <span className="text-xs text-gray-400 ml-1">({market.distance})</span>
                                </div>
                              </td>
                            )}
                            <td className="py-3 px-4 text-sm text-gray-800">
                              {crop.name}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                              ₹{crop.price}
                            </td>
                            <td className="py-3 px-4">
                              <div className={`flex items-center gap-1 ${
                                crop.trend === "up" 
                                  ? "text-green-600" 
                                  : "text-red-500"
                              }`}>
                                {crop.trend === "up" ? (
                                  <TrendingUp className="w-4 h-4" />
                                ) : (
                                  <TrendingDown className="w-4 h-4" />
                                )}
                                <span className="text-sm font-medium">{crop.change}%</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                {language === "hindi" ? "विवरण देखें" : "View Details"}
                              </button>
                            </td>
                          </tr>
                        ))
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* AI Price Insights */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {language === "hindi" ? "एआई मूल्य अंतर्दृष्टि" : "AI Price Insights"}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {language === "hindi" ? "आपकी फसल के लिए व्यक्तिगत मूल्य अंतर्दृष्टि और सिफारिशें" : "Personalized price insights and recommendations for your crop"}
                    </p>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <h3 className="font-medium text-gray-800 mb-2">
                          {language === "hindi" ? "मूल्य विश्लेषण" : "Price Analysis"}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {language === "hindi" 
                            ? "वर्तमान मूल्य पिछले 3 महीनों के औसत से 12.5% अधिक है" 
                            : "Current price is 12.5% higher than the 3-month average"}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <Info className="w-4 h-4" />
                          <span>
                            {language === "hindi" 
                              ? "अधिक जानकारी देखें" 
                              : "See more details"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <h3 className="font-medium text-gray-800 mb-2">
                          {language === "hindi" ? "बाजार अवसर" : "Market Opportunity"}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {language === "hindi" 
                            ? "अज़ादपुर मंडी में वर्तमान में सर्वोत्तम मूल्य मिल रहा है" 
                            : "Azadpur Mandi currently offers the best price"}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {language === "hindi" 
                              ? "मार्ग देखें" 
                              : "View directions"}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-5 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                      <h3 className="font-medium text-indigo-800 mb-2">
                        {language === "hindi" ? "व्यक्तिगत सिफारिश" : "Personalized Recommendation"}
                      </h3>
                      <p className="text-sm text-indigo-700 mb-3">
                        {language === "hindi" 
                          ? "आपकी फसल के लिए अगले 7 दिनों में बिक्री करना सबसे अच्छा होगा। मूल्य में 3-5% की वृद्धि की उम्मीद है, उसके बाद अक्टूबर के अंत में गिरावट आ सकती है।" 
                          : "For your crop, selling within the next 7 days would be optimal. Prices are expected to rise by 3-5% before potentially declining by the end of October."}
                      </p>
                      <button className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                        {language === "hindi" ? "विस्तृत रिपोर्ट देखें" : "View Detailed Report"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Buyer Connect Tab */}
          {activeTab === "buyer-connect" && (
            <div>
              {/* Search and filter */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder={language === "hindi" ? "फसल या खरीदार खोजें..." : "Search crop or buyer..."}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <select className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 text-sm bg-white">
                      <option value="all">{language === "hindi" ? "सभी फसलें" : "All Crops"}</option>
                      <option value="wheat">{language === "hindi" ? "गेहूं" : "Wheat"}</option>
                      <option value="rice">{language === "hindi" ? "चावल" : "Rice"}</option>
                      <option value="tomato">{language === "hindi" ? "टमाटर" : "Tomato"}</option>
                      <option value="potato">{language === "hindi" ? "आलू" : "Potato"}</option>
                      <option value="onion">{language === "hindi" ? "प्याज" : "Onion"}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                  <div className="relative">
                    <select className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 text-sm bg-white">
                      <option value="all">{language === "hindi" ? "सभी स्थान" : "All Locations"}</option>
                      <option value="delhi">{language === "hindi" ? "दिल्ली" : "Delhi"}</option>
                      <option value="haryana">{language === "hindi" ? "हरियाणा" : "Haryana"}</option>
                      <option value="punjab">{language === "hindi" ? "पंजाब" : "Punjab"}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                  <button className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <span>{language === "hindi" ? "फ़िल्टर" : "Filter"}</span>
                  </button>
                </div>
              </div>

              {/* Buyer requirements cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {buyerRequirements.map((buyer) => (
                  <motion.div 
                    key={buyer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: buyer.id * 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className="relative h-40 bg-gray-100">
                      <Image 
                        src={buyer.image} 
                        alt={buyer.buyer}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform hover:scale-105"
                      />
                      {buyer.verified && (
                        <div className="absolute top-3 right-3 bg-green-600 text-white p-1.5 rounded-full">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-800">{buyer.buyer}</h3>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-medium">{buyer.rating}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">{language === "hindi" ? "फसल:" : "Crop:"}</span> {buyer.crop} ({buyer.variety})
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">{language === "hindi" ? "मात्रा:" : "Quantity:"}</span> {buyer.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">{language === "hindi" ? "मूल्य:" : "Price:"}</span> {buyer.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">{language === "hindi" ? "स्थान:" : "Location:"}</span> {buyer.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            <span className="font-medium text-gray-700">{language === "hindi" ? "समय सीमा:" : "Deadline:"}</span> {buyer.deadline}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-1.5">
                          <MessageCircle className="w-4 h-4" />
                          <span>{language === "hindi" ? "संपर्क करें" : "Contact"}</span>
                        </button>
                        <button className="px-3 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button className="px-3 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Post your crop section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 p-6 mb-6"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-2/3">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {language === "hindi" ? "अपनी फसल पोस्ट करें" : "Post Your Crop"}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {language === "hindi" 
                        ? "अपनी फसल के विवरण पोस्ट करें और सीधे खरीदारों से जुड़ें। हमारा AI आपकी फसल के लिए सबसे अच्छे खरीदारों का मिलान करेगा।" 
                        : "Post details of your crop and connect directly with buyers. Our AI will match the best buyers for your crop."}
                    </p>
                    <button className="px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>{language === "hindi" ? "अपनी फसल पोस्ट करें" : "Post Your Crop"}</span>
                    </button>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <Image 
                      src="/images/post-crop.png" 
                      alt="Post your crop" 
                      width={200} 
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Success stories */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {language === "hindi" ? "सफलता की कहानियां" : "Success Stories"}
                </h2>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                      <Image 
                        src="/images/farmers/farmer1.jpg" 
                        alt="Farmer" 
                        width={48} 
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {language === "hindi" ? "रामेश्वर सिंह" : "Rameshwar Singh"}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {language === "hindi" 
                          ? "मैंने अपनी टमाटर की फसल बाज़ार ब्रिज पर पोस्ट की और मुझे स्थानीय बाज़ार से 15% अधिक मूल्य मिला। प्रक्रिया बहुत आसान थी और भुगतान समय पर हुआ।" 
                          : "I posted my tomato crop on Bazaar Bridge and got 15% higher price than the local market. The process was very easy and payment was on time."}
                      </p>
                      <div className="flex items-center gap-1 text-amber-500 mt-2">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    {language === "hindi" ? "और सफलता की कहानियां देखें" : "View More Success Stories"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}

           {/* Group Buying Tab */}
           {activeTab === "group-buying" && (
            <div>
              {/* Hero section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 p-6 mb-6"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-2/3">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {language === "hindi" ? "सामूहिक खरीदारी के साथ बचत करें" : "Save with Group Buying"}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {language === "hindi" 
                        ? "अन्य किसानों के साथ मिलकर बड़ी मात्रा में खरीदारी करें और 15-30% तक की बचत करें। सामूहिक खरीदारी से बेहतर कीमतें और गुणवत्ता सुनिश्चित करें।" 
                        : "Purchase in bulk together with other farmers and save up to 15-30%. Group buying ensures better prices and quality."}
                    </p>
                    <button className="px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{language === "hindi" ? "समूह में शामिल हों" : "Join a Group"}</span>
                    </button>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <Image 
                      src="https://img.freepik.com/free-vector/team-concept-illustration_114360-678.jpg" 
                      alt="Group buying" 
                      width={200} 
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Active group buys */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {language === "hindi" ? "सक्रिय समूह खरीदारी" : "Active Group Buys"}
                  </h2>
                  <div className="flex gap-3">
                    <div className="relative">
                      <select className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 text-sm bg-white">
                        <option value="all">{language === "hindi" ? "सभी श्रेणियां" : "All Categories"}</option>
                        <option value="fertilizer">{language === "hindi" ? "उर्वरक" : "Fertilizer"}</option>
                        <option value="seeds">{language === "hindi" ? "बीज" : "Seeds"}</option>
                        <option value="pesticides">{language === "hindi" ? "कीटनाशक" : "Pesticides"}</option>
                        <option value="equipment">{language === "hindi" ? "उपकरण" : "Equipment"}</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      <span>{language === "hindi" ? "फ़िल्टर" : "Filter"}</span>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      id: 1,
                      title: "Premium NPK Fertilizer",
                      category: "Fertilizer",
                      brand: "Coromandel",
                      image: "https://img.freepik.com/free-photo/fertilizer-bag-isolated-white-background_93675-130163.jpg",
                      originalPrice: 1200,
                      groupPrice: 950,
                      unit: "50kg bag",
                      minMembers: 10,
                      currentMembers: 7,
                      timeLeft: "2 days 5 hours",
                      discount: 21
                    },
                    {
                      id: 2,
                      title: "Hybrid Wheat Seeds",
                      category: "Seeds",
                      brand: "Bayer",
                      image: "https://img.freepik.com/free-photo/wheat-seeds-wooden-scoop_144627-16190.jpg",
                      originalPrice: 850,
                      groupPrice: 680,
                      unit: "10kg pack",
                      minMembers: 15,
                      currentMembers: 12,
                      timeLeft: "3 days 12 hours",
                      discount: 20
                    },
                    {
                      id: 3,
                      title: "Organic Pesticide",
                      category: "Pesticides",
                      brand: "UPL Organic",
                      image: "https://img.freepik.com/free-photo/pesticide-bottle-isolated_93675-130164.jpg",
                      originalPrice: 1500,
                      groupPrice: 1050,
                      unit: "5L container",
                      minMembers: 8,
                      currentMembers: 6,
                      timeLeft: "1 day 8 hours",
                      discount: 30
                    }
                  ].map((group) => (
                    <motion.div 
                      key={group.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: group.id * 0.1 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <div className="relative h-48 bg-gray-100">
                        <Image 
                          src={group.image} 
                          alt={group.title}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="transition-transform hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                          {group.discount}% OFF
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-medium text-gray-500">{group.category}</span>
                          <span className="text-xs font-medium text-gray-500">{group.brand}</span>
                        </div>
                        
                        <h3 className="font-medium text-gray-800 mb-2">{group.title}</h3>
                        
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg font-bold text-gray-800">₹{group.groupPrice}</span>
                          <span className="text-sm text-gray-500 line-through">₹{group.originalPrice}</span>
                          <span className="text-xs text-gray-500">/{group.unit}</span>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-3 mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-600">
                              {language === "hindi" ? "सदस्य" : "Members"}: {group.currentMembers}/{group.minMembers}
                            </span>
                            <span className="text-xs font-medium text-green-600">
                              {Math.round((group.currentMembers / group.minMembers) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-green-600 h-1.5 rounded-full" 
                              style={{ width: `${(group.currentMembers / group.minMembers) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center gap-1 mt-2 text-amber-600">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">{group.timeLeft} left</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                            {language === "hindi" ? "समूह में शामिल हों" : "Join Group"}
                          </button>
                          <button className="px-3 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* How it works */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                  {language === "hindi" ? "यह कैसे काम करता है" : "How It Works"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <Users className="w-6 h-6 text-green-600" />,
                      title: language === "hindi" ? "समूह में शामिल हों या बनाएं" : "Join or Create a Group",
                      description: language === "hindi" 
                        ? "मौजूदा समूह खरीदारी में शामिल हों या अपनी आवश्यकता के अनुसार नया समूह बनाएं।" 
                        : "Join an existing group buy or create a new one based on your needs."
                    },
                    {
                      icon: <Users className="w-6 h-6 text-blue-600" />,
                      title: language === "hindi" ? "न्यूनतम सदस्य संख्या पूरी करें" : "Reach Minimum Members",
                      description: language === "hindi" 
                        ? "समूह खरीदारी सक्रिय होने के लिए न्यूनतम सदस्य संख्या पूरी होनी चाहिए।" 
                        : "The group buy activates once the minimum number of members is reached."
                    },
                    {
                      icon: <ShoppingBag className="w-6 h-6 text-amber-600" />,
                      title: language === "hindi" ? "छूट पर खरीदें" : "Purchase at Discount",
                      description: language === "hindi" 
                        ? "समूह पूरा होने पर, सभी सदस्य छूट मूल्य पर उत्पाद खरीद सकते हैं।" 
                        : "Once the group is complete, all members can purchase the product at the discounted price."
                    }
                  ].map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        {step.icon}
                      </div>
                      <h3 className="font-medium text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Create your own group buy */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6 mb-6"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-2/3">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {language === "hindi" ? "अपनी समूह खरीदारी बनाएं" : "Create Your Own Group Buy"}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {language === "hindi" 
                        ? "अपनी आवश्यकताओं के अनुसार समूह खरीदारी शुरू करें। अपने क्षेत्र के अन्य किसानों को आमंत्रित करें और बड़ी बचत करें।" 
                        : "Start a group buy according to your needs. Invite other farmers in your area and save big."}
                    </p>
                    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>{language === "hindi" ? "समूह खरीदारी बनाएं" : "Create Group Buy"}</span>
                    </button>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <Image 
                      src="https://img.freepik.com/free-vector/team-leader-teamwork-concept-illustration_114360-9040.jpg" 
                      alt="Create group buy" 
                      width={200} 
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Success stories */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {language === "hindi" ? "सफलता की कहानियां" : "Success Stories"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: language === "hindi" ? "किसान समूह, हरियाणा" : "Farmer Group, Haryana",
                      image: "https://img.freepik.com/free-photo/group-farmers-standing-field_23-2148748381.jpg",
                      story: language === "hindi" 
                        ? "हमारे 25 किसानों के समूह ने NPK उर्वरक की सामूहिक खरीदारी की और प्रति बोरी ₹300 की बचत की। इससे हमें बेहतर गुणवत्ता वाला उत्पाद भी मिला।" 
                        : "Our group of 25 farmers did a group purchase of NPK fertilizer and saved ₹300 per bag. We also got better quality product."
                    },
                    {
                      name: language === "hindi" ? "महिला किसान संघ, पंजाब" : "Women Farmers Association, Punjab",
                      image: "https://img.freepik.com/free-photo/group-women-working-farm_23-2148748383.jpg",
                      story: language === "hindi" 
                        ? "हमने बीज और कीटनाशकों की सामूहिक खरीदारी की और 22% की बचत की। अब हम हर सीजन में समूह खरीदारी करते हैं।" 
                        : "We did a group purchase of seeds and pesticides and saved 22%. Now we do group buying every season."
                    }
                  ].map((story, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0">
                          <Image 
                            src={story.image} 
                            alt={story.name} 
                            width={64} 
                            height={64}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800 mb-1">{story.name}</h3>
                          <p className="text-sm text-gray-600">{story.story}</p>
                          <div className="flex items-center gap-1 text-amber-500 mt-2">
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                            <Star className="w-4 h-4 fill-current" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    {language === "hindi" ? "और सफलता की कहानियां देखें" : "View More Success Stories"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Input Marketplace Tab */}
          {activeTab === "input-marketplace" && (
            <div>
              {/* Search and filter */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder={language === "hindi" ? "उत्पाद खोजें..." : "Search products..."}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <select className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 text-sm bg-white">
                      <option value="all">{language === "hindi" ? "सभी श्रेणियां" : "All Categories"}</option>
                      <option value="fertilizer">{language === "hindi" ? "उर्वरक" : "Fertilizer"}</option>
                      <option value="seeds">{language === "hindi" ? "बीज" : "Seeds"}</option>
                      <option value="pesticides">{language === "hindi" ? "कीटनाशक" : "Pesticides"}</option>
                      <option value="equipment">{language === "hindi" ? "उपकरण" : "Equipment"}</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                  <button className="px-4 py-2.5 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <span>{language === "hindi" ? "फ़िल्टर" : "Filter"}</span>
                  </button>
                </div>
              </div>

              {/* Featured products */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {language === "hindi" ? "विशेष उत्पाद" : "Featured Products"}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <motion.div 
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: product.id * 0.1 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <div className="relative h-48 bg-gray-100">
                        <Image 
                          src={product.image} 
                          alt={product.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          className="transition-transform hover:scale-105"
                        />
                        {product.discount > 0 && (
                          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                            {product.discount}% OFF
                          </div>
                        )}
                        {product.verified && (
                          <div className="absolute top-3 right-3 bg-blue-600 text-white p-1.5 rounded-full">
                            <Shield className="w-4 h-4" />
                          </div>
                        )}
                        <button className="absolute bottom-3 right-3 bg-white text-gray-600 p-1.5 rounded-full shadow-md hover:bg-gray-100">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs font-medium text-gray-500">{product.category}</span>
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="text-xs font-medium">{product.rating} ({product.reviews})</span>
                          </div>
                        </div>
                        
                        <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                        <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
                        
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-gray-800">₹{product.price}</span>
                            <span className="text-xs text-gray-500">/{product.unit}</span>
                          </div>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            product.inStock 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {product.inStock 
                              ? (language === "hindi" ? "स्टॉक में" : "In Stock") 
                              : (language === "hindi" ? "स्टॉक में नहीं" : "Out of Stock")}
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <button 
                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              product.inStock 
                                ? "bg-green-600 text-white hover:bg-green-700" 
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!product.inStock}
                          >
                            {language === "hindi" ? "कार्ट में जोड़ें" : "Add to Cart"}
                          </button>
                          <button className="px-3 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recommended for you */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {language === "hindi" ? "आपके लिए अनुशंसित" : "Recommended for You"}
                  </h2>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    {language === "hindi" ? "सभी देखें" : "View All"}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <Image 
                        src="/images/products/seeds2.jpg" 
                        alt="Hybrid Rice Seeds" 
                        width={80} 
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">Hybrid Rice Seeds</h3>
                      <p className="text-xs text-gray-500 mb-1">Bayer CropScience</p>
                      <div className="flex items-center gap-1 text-amber-500 mb-2">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-medium">4.6 (52)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800">₹950</span>
                        <button className="px-2 py-1 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700">
                          {language === "hindi" ? "खरीदें" : "Buy Now"}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <Image 
                        src="/images/products/pesticide2.jpg" 
                        alt="Organic Pesticide" 
                        width={80} 
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">Organic Pesticide</h3>
                      <p className="text-xs text-gray-500 mb-1">Organic Solutions</p>
                      <div className="flex items-center gap-1 text-amber-500 mb-2">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-medium">4.3 (38)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800">₹580</span>
                        <button className="px-2 py-1 bg-green-600 text-white rounded text-xs font-medium hover:bg-green-700">
                          {language === "hindi" ? "खरीदें" : "Buy Now"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Trusted brands */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {language === "hindi" ? "विश्वसनीय ब्रांड" : "Trusted Brands"}
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {['Syngenta', 'Bayer', 'UPL', 'Coromandel', 'Tata Rallis', 'Mahindra'].map((brand, index) => (
                    <div key={index} className="flex items-center justify-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50 h-24">
                      <Image 
                        src={`/images/brands/brand${index + 1}.png`} 
                        alt={brand}
                        width={100}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Special offers */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-100 p-6 mt-6"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-2/3">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-5 h-5 text-amber-600" />
                      <h2 className="text-xl font-semibold text-gray-800">
                        {language === "hindi" ? "विशेष ऑफर" : "Special Offers"}
                      </h2>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {language === "hindi" 
                        ? "अपने पहले ऑर्डर पर 10% की छूट प्राप्त करें। कोड का उपयोग करें: FIRST10" 
                        : "Get 10% off on your first order. Use code: FIRST10"}
                    </p>
                    <button className="px-5 py-2.5 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4" />
                      <span>{language === "hindi" ? "अभी खरीदें" : "Shop Now"}</span>
                    </button>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <Image 
                      src="/images/special-offer.png" 
                      alt="Special offer" 
                      width={200} 
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Knowledge Hub Tab */}
          {activeTab === "knowledge-hub" && (
            <div>
              {/* Search and categories */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder={language === "hindi" ? "विषय या लेख खोजें..." : "Search topics or articles..."}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/30 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbar">
                  {["All", "Crop Management", "Market Trends", "Technology", "Organic Farming", "Government Schemes"].map((category, index) => (
                    <button 
                      key={index}
                      className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                        index === 0 
                          ? "bg-green-600 text-white" 
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {language === "hindi" 
                        ? ["सभी", "फसल प्रबंधन", "बाजार रुझान", "प्रौद्योगिकी", "जैविक खेती", "सरकारी योजनाएं"][index] 
                        : category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured articles */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {language === "hindi" ? "प्रमुख लेख" : "Featured Articles"}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className="relative h-56 bg-gray-100">
                      <Image 
                        src="/images/articles/article1.jpg" 
                        alt="Sustainable farming practices"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                        {language === "hindi" ? "जैविक खेती" : "Organic Farming"}
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {language === "hindi" 
                          ? "टिकाऊ खेती प्रथाओं के माध्यम से उपज और लाभ बढ़ाना" 
                          : "Increasing Yield and Profit Through Sustainable Farming Practices"}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {language === "hindi" 
                          ? "जैविक खेती तकनीकों का उपयोग करके अपनी फसल की उपज और गुणवत्ता को कैसे बढ़ाएं, जबकि पर्यावरण पर प्रभाव को कम करें।" 
                          : "Learn how to increase your crop yield and quality using organic farming techniques, while reducing environmental impact."}
                      </p>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                            <Image 
                              src="/images/experts/expert1.jpg" 
                              alt="Dr. Rajesh Kumar" 
                              width={32} 
                              height={32}
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs text-gray-600">Dr. Rajesh Kumar</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Oct 12, 2023</span>
                        </div>
                      </div>
                      
                      <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        <span>{language === "hindi" ? "पूरा लेख पढ़ें" : "Read Full Article"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className="relative h-56 bg-gray-100">
                      <Image 
                        src="/images/articles/article2.jpg" 
                        alt="Market trends analysis"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                        {language === "hindi" ? "बाजार रुझान" : "Market Trends"}
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {language === "hindi" 
                          ? "2023-24 के लिए कृषि बाजार रुझान और पूर्वानुमान" 
                          : "Agricultural Market Trends and Forecasts for 2023-24"}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {language === "hindi" 
                          ? "आने वाले सीजन के लिए प्रमुख फसलों के मूल्य रुझानों का विश्लेषण और अपनी बिक्री रणनीति को अनुकूलित करने के लिए अंतर्दृष्टि।" 
                          : "Analysis of price trends for key crops for the upcoming season and insights to optimize your selling strategy."}
                      </p>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                            <Image 
                              src="/images/experts/expert2.jpg" 
                              alt="Priya Sharma" 
                              width={32} 
                              height={32}
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs text-gray-600">Priya Sharma</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Oct 8, 2023</span>
                        </div>
                      </div>
                      
                      <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        <span>{language === "hindi" ? "पूरा लेख पढ़ें" : "Read Full Article"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Recent articles */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {language === "hindi" ? "हाल के लेख" : "Recent Articles"}
                  </h2>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    {language === "hindi" ? "सभी देखें" : "View All"}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((item) => (
                    <motion.div 
                      key={item}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: item * 0.1 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      <div className="relative h-40 bg-gray-100">
                        <Image 
                          src={`/images/articles/article${item + 2}.jpg`} 
                          alt="Article thumbnail"
                          fill
                          style={{ objectFit: 'cover' }}
                          className="transition-transform hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-gray-800 bg-opacity-75 text-white px-2 py-1 rounded-md text-xs font-medium">
                          {language === "hindi" 
                            ? ["फसल प्रबंधन", "प्रौद्योगिकी", "सरकारी योजनाएं"][item - 1] 
                            : ["Crop Management", "Technology", "Government Schemes"][item - 1]}
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800 mb-2">
                          {language === "hindi" 
                            ? [
                                "मिट्टी की उर्वरता बढ़ाने के लिए फसल चक्र तकनीकें",
                                "किसानों के लिए मोबाइल ऐप्स जो उत्पादकता बढ़ाते हैं",
                                "किसानों के लिए नई सरकारी सब्सिडी योजनाएं"
                              ][item - 1] 
                            : [
                                "Crop Rotation Techniques to Improve Soil Fertility",
                                "Mobile Apps for Farmers That Boost Productivity",
                                "New Government Subsidy Schemes for Farmers"
                              ][item - 1]}
                        </h3>
                        
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{`Oct ${5 - item}, 2023`}</span>
                          </div>
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                            <span>{language === "hindi" ? "पढ़ें" : "Read"}</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Video tutorials */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {language === "hindi" ? "वीडियो ट्यूटोरियल" : "Video Tutorials"}
                  </h2>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    {language === "hindi" ? "सभी देखें" : "View All"}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="group relative rounded-lg overflow-hidden">
                      <div className="aspect-video bg-gray-100 relative">
                        <Image 
                          src={`/images/videos/video${item}.jpg`} 
                          alt="Video thumbnail"
                          fill
                          style={{ objectFit: 'cover' }}
                          className="transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white bg-opacity-90 flex items-center justify-center">
                            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-green-600 border-b-[8px] border-b-transparent ml-1"></div>
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                          {["5:24", "8:12", "6:45"][item - 1]}
                        </div>
                      </div>
                      <h3 className="font-medium text-gray-800 mt-2">
                        {language === "hindi" 
                          ? [
                              "उन्नत सिंचाई तकनीकें जो पानी बचाती हैं",
                              "जैविक कीट नियंत्रण के लिए गाइड",
                              "फसल की पैदावार बढ़ाने के लिए मिट्टी का परीक्षण"
                            ][item - 1] 
                          : [
                              "Advanced Irrigation Techniques That Save Water",
                              "Guide to Organic Pest Control",
                              "Soil Testing for Improved Crop Yield"
                            ][item - 1]}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {language === "hindi" ? "देखा गया" : "Viewed"}: {["2.4K", "1.8K", "3.2K"][item - 1]}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Expert Q&A */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-2/3">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {language === "hindi" ? "विशेषज्ञों से प्रश्न पूछें" : "Ask Experts"}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {language === "hindi" 
                        ? "अपने खेती से संबंधित प्रश्नों के लिए कृषि विशेषज्ञों से सलाह लें। हमारे विशेषज्ञ 24-48 घंटों के भीतर आपके प्रश्नों का उत्तर देंगे।" 
                        : "Get advice from agricultural experts for your farming-related questions. Our experts will answer your questions within 24-48 hours."}
                    </p>
                    <div className="flex flex-wrap gap-3 mb-4">
                      {["Crop Disease", "Soil Health", "Irrigation", "Market Prices", "Seeds"].map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-200">
                          {language === "hindi" 
                            ? ["फसल रोग", "मिट्टी का स्वास्थ्य", "सिंचाई", "बाजार मूल्य", "बीज"][index] 
                            : tag}
                        </span>
                      ))}
                    </div>
                    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      <span>{language === "hindi" ? "प्रश्न पूछें" : "Ask a Question"}</span>
                    </button>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <Image 
                      src="/images/expert-qa.png" 
                      alt="Expert Q&A" 
                      width={200} 
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
                        