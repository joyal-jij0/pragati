import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, TrendingUp, Users, Calendar, Filter, 
  Search, ChevronDown, ChevronRight, Check, Clock, 
  AlertCircle, ArrowRight, Plus, BarChart2, ExternalLink
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Sample data for active sales
const activeSales = [
  {
    id: 1,
    title: "गेहूं सामूहिक बिक्री",
    crop: "गेहूं",
    variety: "HD-2967",
    status: "चल रहा है",
    deadline: "15 अप्रैल, 2024",
    totalQuantity: "200 टन",
    currentQuantity: "120 टन",
    progress: 60,
    participants: 35,
    targetParticipants: 50,
    coordinator: "सुरेश यादव",
    estimatedPremium: "8-10%",
    basePrice: "₹2,200/क्विंटल",
    expectedPrice: "₹2,350-2,400/क्विंटल",
    buyer: "शक्ति फूड्स प्राइवेट लिमिटेड",
    qualityParameters: [
      { name: "नमी", value: "12% से कम" },
      { name: "टूटे दाने", value: "2% से कम" },
      { name: "अन्य मिश्रण", value: "1% से कम" }
    ]
  },
  {
    id: 2,
    title: "सरसों सामूहिक बिक्री",
    crop: "सरसों",
    variety: "RH-749",
    status: "चल रहा है",
    deadline: "20 मार्च, 2024",
    totalQuantity: "100 टन",
    currentQuantity: "85 टन",
    progress: 85,
    participants: 28,
    targetParticipants: 35,
    coordinator: "अनिल शर्मा",
    estimatedPremium: "10-12%",
    basePrice: "₹5,100/क्विंटल",
    expectedPrice: "₹5,600-5,700/क्विंटल",
    buyer: "ऑर्गेनिक ऑयल्स कंपनी",
    qualityParameters: [
      { name: "तेल मात्रा", value: "40% से अधिक" },
      { name: "नमी", value: "8% से कम" },
      { name: "अशुद्धि", value: "2% से कम" }
    ]
  }
];

// Sample data for past sales
const pastSales = [
  {
    id: 101,
    title: "धान सामूहिक बिक्री",
    crop: "धान",
    variety: "पूसा बासमती-1",
    status: "पूर्ण",
    completionDate: "15 नवंबर, 2023",
    totalQuantity: "150 टन",
    participants: 42,
    actualPremium: "12%",
    totalValue: "₹52.5 लाख",
    additionalEarning: "₹5.6 लाख",
    buyer: "शाही एक्सपोर्ट्स",
    coordinator: "रमेश कुमार"
  },
  {
    id: 102,
    title: "आलू सामूहिक बिक्री",
    crop: "आलू",
    variety: "कुफरी चंद्रमुखी",
    status: "पूर्ण",
    completionDate: "20 फरवरी, 2023",
    totalQuantity: "80 टन",
    participants: 25,
    actualPremium: "15%",
    totalValue: "₹16 लाख",
    additionalEarning: "₹2.1 लाख",
    buyer: "फूड प्रोसेसिंग यूनिट",
    coordinator: "विकास सिंह"
  },
  {
    id: 103,
    title: "प्याज सामूहिक बिक्री",
    crop: "प्याज",
    variety: "नासिक रेड",
    status: "पूर्ण",
    completionDate: "10 जनवरी, 2023",
    totalQuantity: "60 टन",
    participants: 22,
    actualPremium: "18%",
    totalValue: "₹15 लाख",
    additionalEarning: "₹2.3 लाख",
    buyer: "मेट्रो केश एंड कैरी",
    coordinator: "संजय पाटिल"
  }
];

// Sample data for market prices
const marketPriceData = [
  { month: 'जन', गेहूं: 2100, सरसों: 4800, धान: 1900, आलू: 1200, प्याज: 1800 },
  { month: 'फर', गेहूं: 2150, सरसों: 4900, धान: 1950, आलू: 1100, प्याज: 2200 },
  { month: 'मार्च', गेहूं: 2200, सरसों: 5100, धान: 2000, आलू: 1000, प्याज: 2500 },
  { month: 'अप्रैल', गेहूं: 2250, सरसों: 5200, धान: 2050, आलू: 1100, प्याज: 2300 },
  { month: 'मई', गेहूं: 2300, सरसों: 5150, धान: 2100, आलू: 1300, प्याज: 2000 },
  { month: 'जून', गेहूं: 2350, सरसों: 5100, धान: 2150, आलू: 1500, प्याज: 1800 },
  { month: 'जुल', गेहूं: 2400, सरसों: 5050, धान: 2200, आलू: 1700, प्याज: 1600 },
  { month: 'अग', गेहूं: 2350, सरसों: 5000, धान: 2250, आलू: 1900, प्याज: 1500 },
  { month: 'सित', गेहूं: 2300, सरसों: 4950, धान: 2300, आलू: 2000, प्याज: 1400 },
  { month: 'अक्ट', गेहूं: 2250, सरसों: 4900, धान: 2250, आलू: 1800, प्याज: 1300 },
  { month: 'नव', गेहूं: 2200, सरसों: 4850, धान: 2200, आलू: 1600, प्याज: 1400 },
  { month: 'दिस', गेहूं: 2150, सरसों: 4800, धान: 2150, आलू: 1400, प्याज: 1600 }
];

// Sample data for buyers
const buyers = [
  {
    id: 1,
    name: "शक्ति फूड्स प्राइवेट लिमिटेड",
    category: "खाद्य प्रसंस्करण",
    rating: 4.8,
    totalDeals: 12,
    location: "करनाल, हरियाणा",
    contactPerson: "अमित शर्मा",
    phone: "9876543210",
    premiumOffered: "8-12%",
    preferredCrops: ["गेहूं", "चावल", "मक्का"]
  },
  {
    id: 2,
    name: "ऑर्गेनिक ऑयल्स कंपनी",
    category: "तेल निष्कर्षण",
    rating: 4.7,
    totalDeals: 8,
    location: "जयपुर, राजस्थान",
    contactPerson: "राजेश अग्रवाल",
    phone: "9876543211",
    premiumOffered: "10-15%",
    preferredCrops: ["सरसों", "सूरजमुखी", "मूंगफली"]
  },
  {
    id: 3,
    name: "मेट्रो केश एंड कैरी",
    category: "थोक विक्रेता",
    rating: 4.6,
    totalDeals: 15,
    location: "गुरुग्राम, हरियाणा",
    contactPerson: "विवेक गुप्ता",
    phone: "9876543212",
    premiumOffered: "5-10%",
    preferredCrops: ["आलू", "प्याज", "टमाटर", "हरी सब्जियां"]
  }
];

const CollectiveSales = () => {
  const [selectedSale, setSelectedSale] = useState(activeSales[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("सभी");
  const [selectedCrop, setSelectedCrop] = useState("गेहूं");
  
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header Section */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl shadow-lg overflow-hidden text-white"
      >
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold mb-3">सामूहिक बिक्री</h2>
            <p className="mb-4">
              सामूहिक बिक्री के माध्यम से अपनी उपज का 8-18% तक अधिक मूल्य प्राप्त करें। बड़ी मात्रा में उत्पादन एकत्रित करके सीधे प्रोसेसर्स, निर्यातकों और बड़े खरीदारों को बेचें।
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white bg-opacity-20 px-3 py-1.5 rounded-full text-sm font-medium">
                ₹1.2 करोड़+ कुल बिक्री
              </div>
              <div className="bg-white bg-opacity-20 px-3 py-1.5 rounded-full text-sm font-medium">
                14% औसत प्रीमियम
              </div>
              <div className="bg-white bg-opacity-20 px-3 py-1.5 rounded-full text-sm font-medium">
                35+ सफल बिक्री
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold">2</p>
                  <p className="text-sm text-amber-100">सक्रिय बिक्री</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">63</p>
                  <p className="text-sm text-amber-100">सक्रिय सदस्य</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">205</p>
                  <p className="text-sm text-amber-100">टन उपज</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">₹18L</p>
                  <p className="text-sm text-amber-100">अतिरिक्त आय</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-amber-800 px-6 py-3 flex justify-between items-center">
          <p className="text-sm text-amber-100">
            नई सामूहिक बिक्री शुरू करें या मौजूदा में शामिल हों
          </p>
          <button className="bg-white text-amber-700 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-amber-50 transition-colors flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>नई बिक्री</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Sales List */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-1 space-y-4"
        >
          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="बिक्री खोजें..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Badge 
                variant={filterCategory === "सभी" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilterCategory("सभी")}
              >
                सभी
              </Badge>
              <Badge 
                variant={filterCategory === "अनाज" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilterCategory("अनाज")}
              >
                अनाज
              </Badge>
              <Badge 
                variant={filterCategory === "तिलहन" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilterCategory("तिलहन")}
              >
                तिलहन
              </Badge>
              <Badge 
                variant={filterCategory === "सब्जियां" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilterCategory("सब्जियां")}
              >
                सब्जियां
              </Badge>
              <Badge 
                variant={filterCategory === "फल" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilterCategory("फल")}
              >
                फल
              </Badge>
            </div>
          </div>

          {/* Sales Tabs */}
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4 bg-white/50 p-1 rounded-lg">
              <TabsTrigger value="active" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800">
                सक्रिय बिक्री
              </TabsTrigger>
              <TabsTrigger value="past" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800">
                पिछली बिक्री
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-0 space-y-3">
              {activeSales.map((sale) => (
                <div 
                  key={sale.id}
                  className={`bg-white rounded-lg shadow-sm p-4 border ${
                    selectedSale.id === sale.id 
                      ? 'border-amber-300 ring-1 ring-amber-300' 
                      : 'border-gray-100'
                  } cursor-pointer hover:border-amber-200 transition-colors`}
                  onClick={() => setSelectedSale(sale)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800">{sale.title}</h3>
                    <Badge variant={sale.status === "चल रहा है" ? "default" : "outline"}>
                      {sale.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Package className="h-4 w-4" />
                    <span>{sale.crop} ({sale.variety})</span>
                    <span className="text-gray-300">|</span>
                    <Calendar className="h-4 w-4" />
                    <span>{sale.deadline}</span>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>प्रगति</span>
                      <span>{sale.progress}%</span>
                    </div>
                    <Progress value={sale.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{sale.participants}/{sale.targetParticipants} सदस्य</span>
                    <span className="font-medium text-amber-600">{sale.currentQuantity}/{sale.totalQuantity}</span>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="past" className="mt-0 space-y-3">
              {pastSales.map((sale) => (
                <div 
                  key={sale.id}
                  className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:border-amber-200 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800">{sale.title}</h3>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      {sale.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Package className="h-4 w-4" />
                    <span>{sale.crop} ({sale.variety})</span>
                    <span className="text-gray-300">|</span>
                    <Calendar className="h-4 w-4" />
                    <span>{sale.completionDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{sale.participants} सदस्य</span>
                    <span className="font-medium text-gray-800">{sale.totalQuantity}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between text-sm">
                    <span className="text-gray-600">अतिरिक्त आय</span>
                    <span className="font-medium text-green-600">{sale.additionalEarning} ({sale.actualPremium})</span>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Main Content - Sale Details */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 space-y-4"
        >
          {/* Sale Details Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-medium text-gray-800">{selectedSale.title}</h3>
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                {selectedSale.status}
              </Badge>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-amber-600" />
                    <h4 className="text-sm font-medium text-gray-700">समय सीमा</h4>
                  </div>
                  <p className="text-lg font-medium text-gray-800">{selectedSale.deadline}</p>
                  <p className="text-xs text-gray-500 mt-1">अंतिम तिथि</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <h4 className="text-sm font-medium text-gray-700">अनुमानित प्रीमियम</h4>
                  </div>
                  <p className="text-lg font-medium text-gray-800">{selectedSale.estimatedPremium}</p>
                  <p className="text-xs text-gray-500 mt-1">बाजार मूल्य से अधिक</p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-blue-600" />
                    <h4 className="text-sm font-medium text-gray-700">प्रतिभागी</h4>
                  </div>
                  <p className="text-lg font-medium text-gray-800">{selectedSale.participants}/{selectedSale.targetParticipants}</p>
                  <p className="text-xs text-gray-500 mt-1">सदस्य शामिल हुए</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">बिक्री प्रगति</h4>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">वर्तमान मात्रा: {selectedSale.currentQuantity}</span>
                    <span className="text-gray-600">लक्ष्य: {selectedSale.totalQuantity}</span>
                  </div>
                  <Progress value={selectedSale.progress} className="h-3" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{selectedSale.progress}% पूर्ण</span>
                  <span className="text-amber-600 font-medium">शेष: {
                    parseInt(selectedSale.totalQuantity) - parseInt(selectedSale.currentQuantity)
                  } टन</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">मूल्य विवरण</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">आधार मूल्य (मंडी)</p>
                    <p className="text-lg font-medium text-gray-800">{selectedSale.basePrice}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">अनुमानित बिक्री मूल्य</p>
                    <p className="text-lg font-medium text-green-600">{selectedSale.expectedPrice}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">खरीदार</p>
                    <p className="text-base font-medium text-gray-800">{selectedSale.buyer}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">गुणवत्ता मापदंड</h4>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          मापदंड
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          आवश्यक मान
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedSale.qualityParameters.map((param, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                            {param.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            {param.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">समन्वयक जानकारी</h4>
                <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-4">
                  <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                    <span className="text-lg font-medium">{selectedSale.coordinator.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{selectedSale.coordinator}</p>
                    <p className="text-sm text-gray-500">बिक्री समन्वयक</p>
                  </div>
                  <button className="ml-auto bg-amber-100 text-amber-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-amber-200 transition-colors">
                    संपर्क करें
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button className="px-4 py-2 border border-amber-300 text-amber-700 rounded-md text-sm font-medium hover:bg-amber-50 transition-colors">
                  और जानकारी
                </button>
                <button className="px-4 py-2 bg-amber-600 text-white rounded-md text-sm font-medium hover:bg-amber-700 transition-colors flex items-center justify-center gap-1">
                  <span>बिक्री में शामिल हों</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Market Price Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-medium text-gray-800">बाजार मूल्य प्रवृत्ति</h3>
              <div className="flex items-center gap-2">
                <select 
                  className="text-xs border border-gray-200 rounded px-2 py-1"
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                >
                  <option value="गेहूं">गेहूं</option>
                  <option value="सरसों">सरसों</option>
                  <option value="धान">धान</option>
                  <option value="आलू">आलू</option>
                  <option value="प्याज">प्याज</option>
                </select>
                <button className="text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  <span>विस्तृत</span>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={marketPriceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      domain={['dataMin - 100', 'dataMax + 100']}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${value}`, selectedCrop]}
                      labelFormatter={(label) => `${label} 2023`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey={selectedCrop} 
                      stroke="#f59e0b" 
                      fill="url(#colorGradient)" 
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                <p>मासिक औसत मूल्य (₹/क्विंटल) - वर्ष 2023</p>
              </div>
            </div>
          </div>
          
          {/* Buyers Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-medium text-gray-800">प्रमुख खरीदार</h3>
              <button className="text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                <span>सभी देखें</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {buyers.map((buyer) => (
                  <div key={buyer.id} className="border border-gray-100 rounded-lg p-4 hover:border-amber-200 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800">{buyer.name}</h4>
                      <div className="flex items-center gap-1 text-amber-500">
                        <span className="text-sm font-medium">{buyer.rating}</span>
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{buyer.category} | {buyer.location}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <p className="text-gray-500">प्रीमियम</p>
                        <p className="font-medium text-green-600">{buyer.premiumOffered}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">कुल सौदे</p>
                        <p className="font-medium text-gray-800">{buyer.totalDeals}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {buyer.preferredCrops.map((crop, index) => (
                        <Badge key={index} variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          {crop}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <button className="text-xs text-amber-600 hover:text-amber-700 font-medium">
                        विवरण देखें
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Success Stories */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-medium text-gray-800">सफलता की कहानियां</h3>
            </div>
            
            <div className="p-6">
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 flex-shrink-0">
                    <span className="text-lg font-medium">र</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">रामवीर सिंह, हरियाणा</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      "सामूहिक बिक्री से मुझे अपने गेहूं का 12% अधिक मूल्य मिला। अकेले बेचने पर मुझे यह कभी नहीं मिल पाता। अगली फसल में भी मैं इसी प्रक्रिया से बिक्री करूंगा।"
                    </p>
                    <p className="text-xs text-gray-500 mt-2">गेहूं सामूहिक बिक्री, जनवरी 2023</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                    <span className="text-lg font-medium">स</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">सविता देवी, राजस्थान</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      "सरसों की सामूहिक बिक्री से हमारे गांव के 25 किसानों को कुल ₹3.2 लाख का अतिरिक्त लाभ हुआ। गुणवत्ता के लिए प्रीमियम मिलना सबसे अच्छी बात थी।"
                    </p>
                    <p className="text-xs text-gray-500 mt-2">सरसों सामूहिक बिक्री, मार्च 2023</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <button className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1 mx-auto">
                  <span>और कहानियां पढ़ें</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* FAQ Section */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-6"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">अक्सर पूछे जाने वाले प्रश्न</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="border border-gray-100 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">सामूहिक बिक्री में कैसे शामिल हों?</h4>
              <p className="text-sm text-gray-600">
                आप मौजूदा सामूहिक बिक्री में शामिल होने के लिए "बिक्री में शामिल हों" बटन पर क्लिक करके या नई बिक्री शुरू करने के लिए "नई बिक्री" बटन पर क्लिक करके शामिल हो सकते हैं। आपको अपनी फसल की मात्रा और गुणवत्ता विवरण प्रदान करना होगा।
              </p>
            </div>
            
            <div className="border border-gray-100 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">क्या गुणवत्ता मापदंड पूरा करना जरूरी है?</h4>
              <p className="text-sm text-gray-600">
                हां, खरीदार द्वारा निर्धारित गुणवत्ता मापदंडों को पूरा करना आवश्यक है। इससे आपकी उपज का अधिक मूल्य सुनिश्चित होता है। यदि आपकी उपज मापदंडों को पूरा नहीं करती है, तो भी आप शामिल हो सकते हैं, लेकिन प्रीमियम मूल्य कम हो सकता है।
              </p>
            </div>
            
            <div className="border border-gray-100 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">भुगतान प्रक्रिया कैसे काम करती है?</h4>
              <p className="text-sm text-gray-600">
                बिक्री पूरी होने के बाद, खरीदार द्वारा 3-5 कार्य दिवसों के भीतर सीधे आपके बैंक खाते में भुगतान किया जाता है। आप अपने प्रोफाइल में अपने बैंक विवरण अपडेट कर सकते हैं। सभी लेनदेन सुरक्षित और पारदर्शी हैं।
              </p>
            </div>
            
            <div className="border border-gray-100 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">क्या परिवहन की व्यवस्था करनी होगी?</h4>
              <p className="text-sm text-gray-600">
                नहीं, बड़े पैमाने पर बिक्री के लिए परिवहन की व्यवस्था हमारे द्वारा की जाती है। आपको केवल निर्धारित संग्रह केंद्र पर अपनी उपज पहुंचानी होगी। विशेष परिस्थितियों में, अतिरिक्त शुल्क पर घर से पिकअप की सुविधा भी उपलब्ध है।
              </p>
            </div>
          </div>
          
          <div className="mt-6 bg-amber-50 border border-amber-100 rounded-lg p-4 flex items-center gap-4">
            <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 flex-shrink-0">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">और सहायता चाहिए?</h4>
              <p className="text-sm text-gray-600 mt-1">
                हमारी सहायता टीम से संपर्क करें या अपने क्षेत्र के समन्वयक से बात करें।
              </p>
            </div>
            <button className="ml-auto bg-amber-100 text-amber-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-amber-200 transition-colors">
              संपर्क करें
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Call to Action */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl shadow-lg overflow-hidden text-white p-6 md:p-8 text-center"
      >
        <h2 className="text-2xl font-bold mb-3">अभी सामूहिक बिक्री में शामिल हों</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          अपनी उपज का अधिकतम मूल्य प्राप्त करें और बाजार में अपनी स्थिति मजबूत करें। सामूहिक शक्ति से आर्थिक समृद्धि की ओर बढ़ें।
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-amber-700 px-6 py-2.5 rounded-md text-sm font-medium hover:bg-amber-50 transition-colors">
            मौजूदा बिक्री देखें
          </button>
          <button className="bg-amber-800 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-amber-900 transition-colors flex items-center justify-center gap-1 mx-auto sm:mx-0">
            <Plus className="h-4 w-4" />
            <span>नई बिक्री शुरू करें</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CollectiveSales;