"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  MapPin,
  Users,
  Phone,
  Mail,
  Globe,
  Star,
  Calendar,
  TrendingUp,
  Truck,
  Leaf,
  Briefcase,
  ArrowUpRight,
  Info
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Sample data for FPOs
const fpoList = [
  {
    id: 1,
    name: "किसान उन्नति FPO",
    logo: "https://randomuser.me/api/portraits/men/32.jpg",
    location: "सोनीपत, हरियाणा",
    members: 450,
    established: "2018",
    primaryCrops: ["गेहूं", "धान", "सरसों"],
    services: ["सामूहिक बिक्री", "सामूहिक खरीद", "प्रशिक्षण"],
    rating: 4.8,
    verified: true,
    description: "किसान उन्नति FPO हरियाणा के सोनीपत क्षेत्र के किसानों द्वारा स्थापित एक FPO है जो मुख्य रूप से अनाज और तिलहन फसलों पर केंद्रित है।",
    contactPerson: "रामवीर सिंह",
    phone: "+91 98765 43210",
    email: "info@kisanunnatifpo.org",
    website: "www.kisanunnatifpo.org",
    achievements: [
      "2022 में सर्वश्रेष्ठ FPO पुरस्कार",
      "120 टन गेहूं की सामूहिक बिक्री",
      "15% अधिक मूल्य प्राप्ति"
    ]
  },
  {
    id: 2,
    name: "प्रगति किसान FPO",
    logo: "https://randomuser.me/api/portraits/men/85.jpg",
    location: "नासिक, महाराष्ट्र",
    members: 320,
    established: "2019",
    primaryCrops: ["प्याज", "अंगूर", "टमाटर"],
    services: ["सामूहिक बिक्री", "प्रसंस्करण", "भंडारण"],
    rating: 4.6,
    verified: true,
    description: "प्रगति किसान FPO महाराष्ट्र के नासिक क्षेत्र के किसानों द्वारा स्थापित एक FPO है जो मुख्य रूप से सब्जियों और फलों पर केंद्रित है।",
    contactPerson: "सुरेश पाटिल",
    phone: "+91 97654 32109",
    email: "contact@pragatikisanfpo.org",
    website: "www.pragatikisanfpo.org",
    achievements: [
      "प्याज निर्यात में 30% वृद्धि",
      "12% लागत बचत",
      "कोल्ड स्टोरेज सुविधा स्थापना"
    ]
  },
  {
    id: 3,
    name: "जय किसान FPO",
    logo: "https://randomuser.me/api/portraits/women/65.jpg",
    location: "इंदौर, मध्य प्रदेश",
    members: 280,
    established: "2020",
    primaryCrops: ["सोयाबीन", "गेहूं", "मक्का"],
    services: ["संसाधन साझाकरण", "सामूहिक खरीद", "प्रशिक्षण"],
    rating: 4.5,
    verified: true,
    description: "जय किसान FPO मध्य प्रदेश के इंदौर क्षेत्र के किसानों द्वारा स्थापित एक FPO है जो मुख्य रूप से अनाज और तिलहन फसलों पर केंद्रित है।",
    contactPerson: "सुनीता देवी",
    phone: "+91 96543 21098",
    email: "info@jaykisanfpo.org",
    website: "www.jaykisanfpo.org",
    achievements: [
      "कृषि उपकरण साझाकरण से 25% उत्पादकता वृद्धि",
      "सोयाबीन प्रसंस्करण इकाई स्थापना",
      "200+ किसानों को प्रशिक्षण"
    ]
  },
];

// Sample data for upcoming FPO events
const fpoEvents = [
  {
    id: 1,
    title: "FPO प्रबंधन कार्यशाला",
    date: "15 नवंबर, 2023",
    location: "कृषि विज्ञान केंद्र, करनाल",
    organizer: "NABARD",
  },
  {
    id: 2,
    title: "FPO वित्तीय साक्षरता कार्यक्रम",
    date: "22 नवंबर, 2023",
    location: "किसान भवन, सोनीपत",
    organizer: "SFAC",
  },
];

// Sample data for FPO categories
const fpoCategories = [
  { id: 1, name: "अनाज उत्पादक", count: 45 },
  { id: 2, name: "फल और सब्जी", count: 38 },
  { id: 3, name: "डेयरी", count: 22 },
  { id: 4, name: "जैविक खेती", count: 15 },
  { id: 5, name: "मसाले", count: 12 },
];

// Sample data for states
const states = [
  { id: 1, name: "हरियाणा", count: 28 },
  { id: 2, name: "महाराष्ट्र", count: 35 },
  { id: 3, name: "मध्य प्रदेश", count: 22 },
  { id: 4, name: "पंजाब", count: 18 },
  { id: 5, name: "राजस्थान", count: 25 },
];

const FPODirectory = () => {
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
  const [stateFilter, setStateFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFPO, setSelectedFPO] = useState<number | null>(null);

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
            <h2 className="text-2xl font-bold text-gray-800">FPO निर्देशिका</h2>
            <p className="text-gray-600 mt-1">
              अपने क्षेत्र के FPO से जुड़ें या नए व्यापारिक अवसर खोजें
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white">
              <Info className="h-4 w-4 mr-2" />
              FPO क्या है?
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <ArrowUpRight className="h-4 w-4 mr-2" />
              FPO पंजीकरण
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">पंजीकृत FPO</p>
                <p className="text-xl font-bold text-gray-800">7,500+</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">किसान सदस्य</p>
                <p className="text-xl font-bold text-gray-800">16 लाख+</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">राज्य कवरेज</p>
                <p className="text-xl font-bold text-gray-800">28</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">वार्षिक कारोबार</p>
                <p className="text-xl font-bold text-gray-800">₹5,000 करोड़+</p>
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
                placeholder="FPO का नाम, स्थान या फसल खोजें" 
                className="pl-10 bg-gray-50 border-gray-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200">
                  <SelectValue placeholder="श्रेणी चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">सभी श्रेणियां</SelectItem>
                  <SelectItem value="grains">अनाज उत्पादक</SelectItem>
                  <SelectItem value="fruits">फल और सब्जी</SelectItem>
                  <SelectItem value="dairy">डेयरी</SelectItem>
                  <SelectItem value="organic">जैविक खेती</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200">
                  <SelectValue placeholder="राज्य चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">सभी राज्य</SelectItem>
                  <SelectItem value="haryana">हरियाणा</SelectItem>
                  <SelectItem value="maharashtra">महाराष्ट्र</SelectItem>
                  <SelectItem value="mp">मध्य प्रदेश</SelectItem>
                  <SelectItem value="punjab">पंजाब</SelectItem>
                  <SelectItem value="rajasthan">राजस्थान</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" className="bg-white">
                <Filter className="h-4 w-4 mr-2" />
                फिल्टर
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <motion.div variants={itemVariants} className="md:col-span-1 space-y-6">
            {/* FPO Categories */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-800">FPO श्रेणियां</h3>
              </div>
              
              <div className="p-4">
                <div className="space-y-2">
                  {fpoCategories.map((category) => (
                    <div 
                      key={category.id} 
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      <Badge variant="outline" className="bg-gray-50 text-gray-600">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* States */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-800">राज्य</h3>
              </div>
              
              <div className="p-4">
                <div className="space-y-2">
                  {states.map((state) => (
                    <div 
                      key={state.id} 
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-medium text-gray-700">{state.name}</span>
                      <Badge variant="outline" className="bg-gray-50 text-gray-600">
                        {state.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-medium text-gray-800">आगामी FPO कार्यक्रम</h3>
                <button className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                  <span>सभी देखें</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  {fpoEvents.map((event) => (
                    <div key={event.id} className="border border-gray-100 rounded-lg p-4 hover:border-green-200 transition-colors">
                      <h4 className="font-medium text-gray-800 mb-2">{event.title}</h4>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-gray-400" />
                          <span>आयोजक: {event.organizer}</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <Button variant="outline" size="sm" className="w-full border-gray-200 text-green-600 hover:text-green-700">
                          पंजीकरण करें
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* FPO Listings */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-medium text-gray-800">FPO सूची</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">क्रमबद्ध करें:</span>
                  <Select defaultValue="rating">
                    <SelectTrigger className="w-[140px] h-8 text-xs border-gray-200">
                      <SelectValue placeholder="रेटिंग" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">रेटिंग</SelectItem>
                      <SelectItem value="members">सदस्य संख्या</SelectItem>
                      <SelectItem value="established">स्थापना वर्ष</SelectItem>
                      <SelectItem value="name">नाम</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {fpoList.map((fpo) => (
                    <div 
                      key={fpo.id} 
                      className={`border rounded-lg overflow-hidden transition-colors ${
                        selectedFPO === fpo.id ? 'border-green-300 bg-green-50' : 'border-gray-100 hover:border-green-200'
                      }`}
                      onClick={() => setSelectedFPO(fpo.id === selectedFPO ? null : fpo.id)}
                    >
                      <div className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-16 w-16 rounded-md">
                            <AvatarImage src={fpo.logo} />
                            <AvatarFallback>{fpo.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium text-gray-800">{fpo.name}</h4>
                                  {fpo.verified && (
                                    <Badge className="bg-green-100 text-green-700 border-0">
                                      सत्यापित
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-500 flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {fpo.location}
                                </p>
                              </div>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                                <span className="text-sm font-medium ml-1">{fpo.rating}</span>
                              </div>
                            </div>
                            
                            <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-400" />
                                <span>{fpo.members} सदस्य</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span>स्थापना: {fpo.established}</span>
                              </div>
                            </div>
                            
                            <div className="mt-3 flex flex-wrap gap-2">
                              {fpo.primaryCrops.map((crop, index) => (
                                <Badge key={index} variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                                  {crop}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="mt-3 flex flex-wrap gap-2">
                              {fpo.services.map((service, index) => (
                                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {selectedFPO === fpo.id && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-sm text-gray-600 mb-4">
                              {fpo.description}
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 mb-2">संपर्क जानकारी</h5>
                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-gray-400" />
                                    <span>{fpo.contactPerson}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <span>{fpo.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <span>{fpo.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-gray-400" />
                                    <span>{fpo.website}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h5 className="text-sm font-medium text-gray-700 mb-2">प्रमुख उपलब्धियां</h5>
                                <ul className="space-y-1 text-sm">
                                  {fpo.achievements.map((achievement, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <ChevronRight className="h-4 w-4 text-green-500 mt-0.5" />
                                      <span>{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            <div className="flex justify-end gap-3">
                              <Button variant="outline" className="border-gray-200">
                                संपर्क करें
                              </Button>
                              <Button className="bg-green-600 hover:bg-green-700 text-white">
                                सदस्यता के लिए आवेदन करें
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1 mx-auto">
                    <span>और FPO देखें</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg overflow-hidden text-white p-6 md:p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-3">अपना FPO पंजीकृत करें</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            अपने FPO को पंजीकृत करके हमारे प्लेटफॉर्म पर अधिक दृश्यता प्राप्त करें, नए व्यापारिक अवसरों तक पहुंचें और अपने सदस्यों के लिए अधिक मूल्य सृजित करें।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-700 px-6 py-2.5 rounded-md text-sm font-medium hover:bg-green-50 transition-colors">
              और जानकारी प्राप्त करें
            </button>
            <button className="bg-green-800 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-green-900 transition-colors">
              अभी पंजीकरण करें
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FPODirectory;