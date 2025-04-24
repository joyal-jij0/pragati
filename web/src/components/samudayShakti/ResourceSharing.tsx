"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Filter,
  Search,
  Calendar,
  MapPin,
  Clock,
  Users,
  Hammer,
  Tractor,
  Droplet,
  Warehouse,
  Share2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Sample data for available resources
const availableResources = [
  {
    id: 1,
    name: "जॉन डीयर ट्रैक्टर",
    category: "कृषि यंत्र",
    type: "ट्रैक्टर",
    owner: "किसान उन्नति FPO",
    location: "सोनीपत, हरियाणा",
    rate: "₹800/दिन",
    availability: "उपलब्ध",
    image: "https://images.unsplash.com/photo-1605002713232-733d3a4a41bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    bookings: 24,
    rating: 4.8,
  },
  {
    id: 2,
    name: "रोटावेटर",
    category: "कृषि यंत्र",
    type: "जुताई उपकरण",
    owner: "प्रगति किसान FPO",
    location: "करनाल, हरियाणा",
    rate: "₹500/दिन",
    availability: "उपलब्ध",
    image: "https://images.unsplash.com/photo-1589923188651-268a9765e432?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    bookings: 18,
    rating: 4.6,
  },
  {
    id: 3,
    name: "स्प्रेयर",
    category: "कृषि यंत्र",
    type: "छिड़काव उपकरण",
    owner: "जय किसान FPO",
    location: "पानीपत, हरियाणा",
    rate: "₹300/दिन",
    availability: "उपलब्ध",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    bookings: 32,
    rating: 4.5,
  },
];

// Sample data for resource categories
const resourceCategories = [
  { id: 1, name: "कृषि यंत्र", count: 45, icon: <Hammer className="h-5 w-5" /> },
  { id: 2, name: "परिवहन", count: 28, icon: <Tractor className="h-5 w-5" /> },
  { id: 3, name: "सिंचाई", count: 15, icon: <Droplet className="h-5 w-5" /> },
  { id: 4, name: "भंडारण", count: 22, icon: <Warehouse className="h-5 w-5" /> },
];

// Sample data for upcoming bookings
const upcomingBookings = [
  {
    id: 1,
    resource: "जॉन डीयर ट्रैक्टर",
    date: "15 अक्टूबर, 2023",
    time: "08:00 AM - 06:00 PM",
    owner: "किसान उन्नति FPO",
    status: "पुष्टि की गई",
    amount: "₹800",
  },
  {
    id: 2,
    resource: "थ्रेशर",
    date: "18 अक्टूबर, 2023",
    time: "09:00 AM - 05:00 PM",
    owner: "प्रगति किसान FPO",
    status: "अपुष्ट",
    amount: "₹1,200",
  },
];

const ResourceSharing = () => {
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

  // State for filters
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  return (
    <div className="space-y-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">संसाधन साझाकरण</h2>
            <p className="text-gray-600 mt-1">
              कृषि उपकरण और संसाधनों को साझा करके लागत कम करें और उत्पादकता बढ़ाएं
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white">
              <Filter className="h-4 w-4 mr-2" />
              फिल्टर
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              संसाधन जोड़ें
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Hammer className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">कुल संसाधन</p>
                <p className="text-xl font-bold text-gray-800">110+</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">सक्रिय उपयोगकर्ता</p>
                <p className="text-xl font-bold text-gray-800">245</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">मासिक बुकिंग</p>
                <p className="text-xl font-bold text-gray-800">320+</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <Share2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">औसत बचत</p>
                <p className="text-xl font-bold text-gray-800">35%</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="संसाधन, स्थान या FPO खोजें" 
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
            <div className="flex gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200">
                  <SelectValue placeholder="श्रेणी चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">सभी श्रेणियां</SelectItem>
                  <SelectItem value="equipment">कृषि यंत्र</SelectItem>
                  <SelectItem value="transport">परिवहन</SelectItem>
                  <SelectItem value="irrigation">सिंचाई</SelectItem>
                  <SelectItem value="storage">भंडारण</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200">
                  <SelectValue placeholder="स्थान चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">सभी स्थान</SelectItem>
                  <SelectItem value="haryana">हरियाणा</SelectItem>
                  <SelectItem value="punjab">पंजाब</SelectItem>
                  <SelectItem value="rajasthan">राजस्थान</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Resource Categories */}
          <motion.div variants={itemVariants} className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-800">संसाधन श्रेणियां</h3>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  {resourceCategories.map((category) => (
                    <div 
                      key={category.id} 
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                          {category.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{category.name}</p>
                          <p className="text-xs text-gray-500">{category.count} उपलब्ध</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Bookings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mt-6">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-medium text-gray-800">आगामी बुकिंग</h3>
                <button className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                  <span>सभी देखें</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-100 rounded-lg p-4 hover:border-green-200 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-800">{booking.resource}</h4>
                        <Badge variant="outline" className={`${
                          booking.status === "पुष्टि की गई" 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>{booking.owner}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800">{booking.amount}</span>
                        <button className="text-xs text-green-600 hover:text-green-700 font-medium">
                          विवरण देखें
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Available Resources */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-medium text-gray-800">उपलब्ध संसाधन</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">क्रमबद्ध करें:</span>
                  <Select defaultValue="popularity">
                    <SelectTrigger className="w-[140px] h-8 text-xs border-gray-200">
                      <SelectValue placeholder="लोकप्रियता" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popularity">लोकप्रियता</SelectItem>
                      <SelectItem value="price-low">कम दर</SelectItem>
                      <SelectItem value="price-high">अधिक दर</SelectItem>
                      <SelectItem value="rating">रेटिंग</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {availableResources.map((resource) => (
                    <div key={resource.id} className="border border-gray-100 rounded-lg overflow-hidden hover:border-green-200 transition-colors">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/3 h-48 md:h-auto">
                          <img 
                            src={resource.image} 
                            alt={resource.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-full md:w-2/3 p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-gray-800">{resource.name}</h4>
                              <p className="text-sm text-gray-500">{resource.category} | {resource.type}</p>
                            </div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {resource.availability}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div>
                              <p className="text-gray-500">मालिक</p>
                              <p className="font-medium text-gray-800">{resource.owner}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">स्थान</p>
                              <p className="font-medium text-gray-800">{resource.location}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">दर</p>
                              <p className="font-medium text-green-600">{resource.rate}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">रेटिंग</p>
                              <div className="flex items-center">
                                <span className="font-medium text-gray-800 mr-1">{resource.rating}</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`h-3 w-3 ${i < Math.floor(resource.rating) ? "text-amber-500" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                                <span className="text-xs text-gray-500 ml-1">({resource.bookings})</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <Button variant="outline" className="mr-2 border-gray-200 text-gray-600 hover:text-gray-800">
                              विवरण देखें
                            </Button>
                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                              बुक करें
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1 mx-auto">
                    <span>और देखें</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Success Stories */}
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-medium text-gray-800">सफलता की कहानियां</h3>
          </div>
          
          <div className="p-6">
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                  <span className="text-lg font-medium">र</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">रामवीर सिंह, हरियाणा</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    "संसाधन साझाकरण से मुझे ट्रैक्टर खरीदने की आवश्यकता नहीं पड़ी। मैं जब चाहता हूं तब बुक कर लेता हूं और 70% लागत बचाता हूं। इससे मेरी आर्थिक स्थिति में सुधार हुआ है।"
                  </p>
                  <p className="text-xs text-gray-500 mt-2">ट्रैक्टर साझाकरण, जनवरी 2023</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                  <span className="text-lg font-medium">स</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">सविता देवी, राजस्थान</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    "हमारे FPO ने सिंचाई उपकरण साझा किए हैं जिससे हमारे गांव के 25 किसानों को लाभ हुआ है। पानी की बचत के साथ-साथ फसल की उत्पादकता भी बढ़ी है।"
                  </p>
                  <p className="text-xs text-gray-500 mt-2">सिंचाई उपकरण साझाकरण, मार्च 2023</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg overflow-hidden text-white p-6 md:p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-3">अपने संसाधन साझा करें या आवश्यकता अनुसार बुक करें</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            अपने कृषि उपकरण और संसाधनों को साझा करके अतिरिक्त आय अर्जित करें या अपनी आवश्यकता के अनुसार संसाधन बुक करके लागत में कटौती करें।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-700 px-6 py-2.5 rounded-md text-sm font-medium hover:bg-green-50 transition-colors">
              संसाधन खोजें
            </button>
            <button className="bg-green-800 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-green-900 transition-colors flex items-center justify-center gap-1 mx-auto sm:mx-0">
              <Plus className="h-4 w-4" />
              <span>संसाधन जोड़ें</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResourceSharing;