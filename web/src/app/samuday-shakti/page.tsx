"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import {
  Users, User, UserPlus, Calendar, Clock, MapPin,
  MessageCircle, Bell, Tractor, ShoppingBag, Package,
  TrendingUp, BarChart2, Share2, Settings, ChevronRight,
  ChevronDown, Plus, Check, X, Info, AlertTriangle,
  FileText, Percent, DollarSign, Truck, Zap, Award,
  Leaf, Sprout, Thermometer, Droplet, CloudLightning,
  ShoppingCart, CreditCard, Shield, HelpCircle,
  ArrowRight, ExternalLink, Smartphone, Layers,
  Lock, Unlock, Eye, EyeOff, Star, StarHalf,
  Landmark, Building, Home, Camera, Mic, Send,
  Filter, Search, MoreHorizontal, Edit, Trash2,
  Download, Upload, RefreshCw, Clipboard, CheckCircle,
  MessageSquare, PhoneCall, Video, Mail, Paperclip,
  BookOpen // Added missing BookOpen icon
} from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";


// Sample FPO data
const myFPOs = [
  {
    id: 1,
    name: "Kisan Unnati FPO",
    location: "Sonipat, Haryana",
    members: 120,
    established: "2019",
    crops: ["Wheat", "Rice", "Mustard"],
    chairperson: "Ramesh Kumar",
    logo: "/images/fpo-logo-1.png",
    isActive: true,
    lastActivity: "2 hours ago",
    unreadMessages: 5
  },
  {
    id: 2,
    name: "Pragati Kisan Producer Company",
    location: "Nashik, Maharashtra",
    members: 85,
    established: "2020",
    crops: ["Grapes", "Onions", "Tomatoes"],
    chairperson: "Sunita Patil",
    logo: "/images/fpo-logo-2.png",
    isActive: false,
    lastActivity: "2 days ago",
    unreadMessages: 0
  }
];

// Sample FPO activities data
const recentActivities = [
  {
    id: 1,
    type: "meeting",
    title: "Monthly General Meeting",
    date: "Oct 15, 2023",
    time: "10:00 AM",
    location: "Village Community Hall",
    description: "Discussion on upcoming Rabi season planning and input procurement strategy.",
    organizer: "Ramesh Kumar",
    attendees: 45
  },
  {
    id: 2,
    type: "procurement",
    title: "Bulk Fertilizer Purchase",
    date: "Oct 10, 2023",
    quantity: "2 Tons",
    item: "NPK Fertilizer",
    savings: "₹8,500",
    participants: 28,
    status: "Completed"
  },
  {
    id: 3,
    type: "training",
    title: "Organic Farming Workshop",
    date: "Oct 5, 2023",
    time: "2:00 PM",
    trainer: "Dr. Sharma (KVK)",
    location: "FPO Office",
    attendees: 32,
    description: "Hands-on training on organic pest management techniques."
  },
  {
    id: 4,
    type: "market",
    title: "Collective Wheat Sale",
    date: "Sep 28, 2023",
    quantity: "18 Tons",
    buyer: "Agrotech Foods Ltd.",
    price: "₹2,450/quintal",
    premium: "₹150/quintal",
    participants: 22,
    status: "Payment Received"
  }
];

// Sample equipment sharing data
const sharedEquipment = [
  {
    id: 1,
    name: "Tractor with Rotavator",
    owner: "FPO Owned",
    status: "Available",
    rate: "₹600/hour",
    location: "FPO Warehouse",
    image: "/images/tractor.jpg",
    bookings: [
      { date: "Oct 18, 2023", farmer: "Suresh", duration: "4 hours" },
      { date: "Oct 20, 2023", farmer: "Mahesh", duration: "3 hours" }
    ]
  },
  {
    id: 2,
    name: "Power Sprayer",
    owner: "Rajesh Singh",
    status: "In Use",
    rate: "₹200/day",
    location: "Rajesh's Farm",
    image: "/images/sprayer.jpg",
    bookings: [
      { date: "Oct 15-16, 2023", farmer: "Dinesh", duration: "2 days" }
    ],
    returnDate: "Oct 16, 2023"
  },
  {
    id: 3,
    name: "Seed Drill",
    owner: "FPO Owned",
    status: "Available",
    rate: "₹400/day",
    location: "FPO Warehouse",
    image: "/images/seed-drill.jpg",
    bookings: []
  },
  {
    id: 4,
    name: "Thresher",
    owner: "Prakash Verma",
    status: "Available",
    rate: "₹800/day",
    location: "Prakash's Farm",
    image: "/images/thresher.jpg",
    bookings: [
      { date: "Nov 5, 2023", farmer: "Multiple", duration: "Community Use" }
    ]
  }
];

// Sample group purchase data
const groupPurchases = [
  {
    id: 1,
    item: "Wheat Seeds (HD-2967)",
    quantity: "500 kg",
    unitPrice: "₹65/kg",
    marketPrice: "₹72/kg",
    savings: "10%",
    status: "Open",
    deadline: "Oct 20, 2023",
    participants: 18,
    minRequired: 25,
    progress: 72
  },
  {
    id: 2,
    item: "NPK Fertilizer",
    quantity: "2 Tons",
    unitPrice: "₹1,200/bag",
    marketPrice: "₹1,350/bag",
    savings: "11%",
    status: "Confirmed",
    deadline: "Oct 5, 2023",
    participants: 28,
    minRequired: 20,
    progress: 100
  },
  {
    id: 3,
    item: "Pesticide (Chlorpyrifos)",
    quantity: "100 L",
    unitPrice: "₹450/L",
    marketPrice: "₹520/L",
    savings: "13%",
    status: "Delivered",
    deadline: "Sep 25, 2023",
    participants: 15,
    minRequired: 15,
    progress: 100
  }
];

// Sample collective sales data
const collectiveSales = [
  {
    id: 1,
    crop: "Wheat",
    quantity: "25 Tons",
    status: "Upcoming",
    expectedPrice: "₹2,400-2,500/quintal",
    marketPrice: "₹2,350/quintal",
    participants: 12,
    deadline: "Nov 15, 2023",
    buyer: "Open Bidding",
    progress: 48
  },
  {
    id: 2,
    crop: "Rice",
    quantity: "18 Tons",
    status: "Negotiating",
    expectedPrice: "₹2,200/quintal",
    marketPrice: "₹2,100/quintal",
    participants: 8,
    deadline: "Oct 25, 2023",
    buyer: "Annapurna Foods Ltd.",
    progress: 100
  },
  {
    id: 3,
    crop: "Mustard",
    quantity: "12 Tons",
    status: "Completed",
    finalPrice: "₹5,800/quintal",
    marketPrice: "₹5,600/quintal",
    premium: "3.5%",
    participants: 15,
    date: "Sep 20, 2023",
    buyer: "Organic Oils Co.",
    progress: 100
  }
];

// Sample announcements data
const announcements = [
  {
    id: 1,
    title: "Important: Rabi Season Planning Meeting",
    date: "Oct 12, 2023",
    content: "All members are requested to attend the Rabi season planning meeting on October 15th at 10:00 AM at the Village Community Hall. We will discuss crop selection, input procurement, and market linkage strategies.",
    author: "Ramesh Kumar (Chairperson)",
    priority: "high"
  },
  {
    id: 2,
    title: "New Buyer Partnership: Organic Oils Co.",
    date: "Oct 10, 2023",
    content: "We're pleased to announce a new partnership with Organic Oils Co. for direct procurement of mustard. They are offering a 5% premium over market price for quality produce. Interested farmers please register by October 20th.",
    author: "Marketing Committee",
    priority: "medium"
  },
  {
    id: 3,
    title: "Soil Testing Camp Next Week",
    date: "Oct 8, 2023",
    content: "A soil testing camp will be organized at the FPO office on October 18th from 9:00 AM to 4:00 PM. Please bring 250g soil samples from your fields. The testing is free for all FPO members.",
    author: "Technical Committee",
    priority: "medium"
  }
];

// Sample chat messages
const chatMessages = [
  {
    id: 1,
    sender: "Ramesh Kumar",
    role: "Chairperson",
    message: "नमस्ते सभी सदस्य, कल की मीटिंग में कृपया समय पर पहुंचें। हमें रबी सीजन की योजना पर चर्चा करनी है।",
    time: "10:30 AM",
    avatar: "/images/user-1.jpg"
  },
  {
    id: 2,
    sender: "Suresh Singh",
    role: "Member",
    message: "क्या मीटिंग में फर्टिलाइज़र की खरीद पर भी चर्चा होगी?",
    time: "10:45 AM",
    avatar: "/images/user-2.jpg"
  },
  {
    id: 3,
    sender: "Ramesh Kumar",
    role: "Chairperson",
    message: "हां, हम फर्टिलाइज़र और बीज दोनों की सामूहिक खरीद पर चर्चा करेंगे। अपनी जरूरतों का अनुमान लेकर आएं।",
    time: "11:00 AM",
    avatar: "/images/user-1.jpg"
  },
  {
    id: 4,
    sender: "Sunita Devi",
    role: "Secretary",
    message: "मैंने एजेंडा शेयर कर दिया है। कृपया सभी इसे देख लें और अपने सुझाव दें।",
    time: "11:15 AM",
    avatar: "/images/user-3.jpg"
  }
];

// Sample member data
const members = [
  { id: 1, name: "Ramesh Kumar", role: "Chairperson", village: "Sonipat", landHolding: "5 acres", crops: ["Wheat", "Rice"], joinDate: "Jan 2019", avatar: "/images/user-1.jpg", status: "active" },
  { id: 2, name: "Sunita Devi", role: "Secretary", village: "Kharkhoda", landHolding: "3 acres", crops: ["Wheat", "Vegetables"], joinDate: "Feb 2019", avatar: "/images/user-3.jpg", status: "active" },
  { id: 3, name: "Suresh Singh", role: "Member", village: "Badli", landHolding: "4 acres", crops: ["Wheat", "Mustard"], joinDate: "Mar 2019", avatar: "/images/user-2.jpg", status: "active" },
  { id: 4, name: "Prakash Verma", role: "Member", village: "Sonipat", landHolding: "7 acres", crops: ["Rice", "Sugarcane"], joinDate: "Apr 2019", avatar: "/images/user-4.jpg", status: "inactive" },
  { id: 5, name: "Geeta Kumari", role: "Member", village: "Kharkhoda", landHolding: "2 acres", crops: ["Vegetables"], joinDate: "Jun 2019", avatar: "/images/user-5.jpg", status: "active" }
];

// Sample training data
const trainings = [
  {
    id: 1,
    title: "Organic Farming Techniques",
    date: "Oct 25, 2023",
    time: "10:00 AM - 1:00 PM",
    location: "FPO Training Center",
    trainer: "Dr. Sharma (KVK Sonipat)",
    description: "Hands-on training on organic pest management and soil health improvement techniques.",
    capacity: 30,
    registered: 18,
    status: "Upcoming"
  },
  {
    id: 2,
    title: "Post-Harvest Management",
    date: "Nov 5, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "Village Community Hall",
    trainer: "Agri University Extension Team",
    description: "Learn about proper storage, grading, and value addition techniques to maximize returns.",
    capacity: 40,
    registered: 25,
    status: "Upcoming"
  },
  {
    id: 3,
    title: "Digital Marketing for Farmers",
    date: "Nov 15, 2023",
    time: "11:00 AM - 2:00 PM",
    location: "FPO Office",
    trainer: "Digital India Team",
    description: "Introduction to online marketplaces, social media promotion, and direct customer engagement.",
    capacity: 25,
    registered: 12,
    status: "Upcoming"
  }
];

// Sample FPO performance data
const fpoPerformanceData = [
  { month: 'Jan', sales: 120000, purchases: 80000 },
  { month: 'Feb', sales: 150000, purchases: 90000 },
  { month: 'Mar', sales: 180000, purchases: 100000 },
  { month: 'Apr', sales: 170000, purchases: 85000 },
  { month: 'May', sales: 160000, purchases: 75000 },
  { month: 'Jun', sales: 190000, purchases: 95000 },
  { month: 'Jul', sales: 220000, purchases: 110000 },
  { month: 'Aug', sales: 240000, purchases: 120000 },
  { month: 'Sep', sales: 250000, purchases: 125000 },
];

// Sample savings data
const savingsData = [
  { category: 'Seeds', savings: 45000 },
  { category: 'Fertilizers', savings: 65000 },
  { category: 'Pesticides', savings: 35000 },
  { category: 'Equipment', savings: 25000 },
  { category: 'Marketing', savings: 30000 },
];

// Sample premium data
const premiumData = [
  { crop: 'Wheat', regular: 2200, premium: 2350 },
  { crop: 'Rice', regular: 1900, premium: 2050 },
  { crop: 'Mustard', regular: 5600, premium: 5800 },
  { crop: 'Vegetables', regular: 1500, premium: 1700 },
];

export default function SamudayShaktiPage() {
  const [selectedFPO, setSelectedFPO] = useState(myFPOs[0]);
  const [activeTab, setActiveTab] = useState("overview");
  const [newMessage, setNewMessage] = useState("");
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [showAllEquipment, setShowAllEquipment] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filter members based on search and status
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.crops.some(crop => crop.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus === "all" || member.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const displayMembers = showAllMembers ? filteredMembers : filteredMembers.slice(0, 3);
  const displayEquipment = showAllEquipment ? sharedEquipment : sharedEquipment.slice(0, 2);

  // Calculate FPO statistics
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.status === "active").length;
  const totalSavings = savingsData.reduce((sum, item) => sum + item.savings, 0);
  const avgPremium = premiumData.reduce((sum, item) => sum + ((item.premium - item.regular) / item.regular * 100), 0) / premiumData.length;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div>
      <DashboardHeader />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Header with gradient background */}
          <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-2xl p-6 shadow-sm border border-emerald-100 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">समुदाय शक्ति (Samuday Shakti)</h1>
                <p className="text-gray-600 mt-1">Empowering farmers through collective action and FPO management</p>
              </div>
              <div className="flex items-center gap-3">
                <Select value={selectedFPO.id.toString()} onValueChange={(value) => setSelectedFPO(myFPOs.find(fpo => fpo.id === parseInt(value)) || myFPOs[0])}>
                  <SelectTrigger className="w-[240px] bg-white border-emerald-200">
                    <SelectValue placeholder="Select FPO" />
                  </SelectTrigger>
                  <SelectContent>
                    {myFPOs.map((fpo) => (
                      <SelectItem key={fpo.id} value={fpo.id.toString()}>
                        <div className="flex items-center gap-2">
                          <span>{fpo.name}</span>
                          {fpo.unreadMessages > 0 && (
                            <Badge className="bg-emerald-100 text-emerald-800 ml-2">{fpo.unreadMessages}</Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                    <SelectItem value="new">
                      <div className="flex items-center gap-2 text-emerald-600">
                        <Plus className="h-4 w-4" />
                        <span>Join New FPO</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Create FPO
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Create New FPO</DialogTitle>
                      <DialogDescription>
                        Start a new Farmer Producer Organization to enable collective action and market access.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fpo-name" className="text-right">
                          FPO Name
                        </Label>
                        <Input id="fpo-name" className="col-span-3" placeholder="e.g., Kisan Unnati FPO" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="location" className="text-right">
                          Location
                        </Label>
                        <Input id="location" className="col-span-3" placeholder="District, State" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="primary-crops" className="text-right">
                          Primary Crops
                        </Label>
                        <Input id="primary-crops" className="col-span-3" placeholder="e.g., Wheat, Rice, Vegetables" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                          Description
                        </Label>
                        <Textarea id="description" className="col-span-3" placeholder="Brief description of the FPO's goals and activities" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">Create FPO</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Selected FPO Info */}
            {selectedFPO && (
              <div className="mt-6 bg-white rounded-xl p-4 border border-emerald-100">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center">
                    {selectedFPO.logo ? (
                      <Image
                        src={selectedFPO.logo}
                        alt={selectedFPO.name}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    ) : (
                      <Users className="w-8 h-8 text-emerald-600" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl font-semibold text-gray-800">{selectedFPO.name}</h2>
                          <Badge className="bg-emerald-100 text-emerald-800">
                            {selectedFPO.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {selectedFPO.location}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
                        <div className="text-sm">
                          <span className="text-gray-500">Members:</span>
                          <span className="ml-1 font-medium text-gray-800">{selectedFPO.members}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Established:</span>
                          <span className="ml-1 font-medium text-gray-800">{selectedFPO.established}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Chairperson:</span>
                          <span className="ml-1 font-medium text-gray-800">{selectedFPO.chairperson}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1">
                        {selectedFPO.crops.map((crop, index) => (
                          <Badge key={index} variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                            {crop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
              <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800">
                <BarChart2 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="members" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800">
                <Users className="h-4 w-4 mr-2" />
                Members
              </TabsTrigger>
              <TabsTrigger value="activities" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800">
                <Calendar className="h-4 w-4 mr-2" />
                Activities
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800">
                <Tractor className="h-4 w-4 mr-2" />
                Resources
              </TabsTrigger>
              <TabsTrigger value="marketplace" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Marketplace
              </TabsTrigger>
              <TabsTrigger value="communication" className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800">
                <MessageCircle className="h-4 w-4 mr-2" />
                Communication
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* FPO Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:col-span-3"
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">FPO Performance Dashboard</CardTitle>
                      <CardDescription>Key metrics and collective achievements</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-emerald-600">Total Members</p>
                              <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalMembers}</h3>
                            </div>
                            <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-emerald-600" />
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs text-gray-500">{activeMembers} active members</p>
                            <Progress value={(activeMembers / totalMembers) * 100} className="h-1 mt-1" />
                          </div>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-blue-600">Total Savings</p>
                              <h3 className="text-2xl font-bold text-gray-800 mt-1">₹{totalSavings.toLocaleString()}</h3>
                            </div>
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <DollarSign className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs text-gray-500">Through collective purchases</p>
                          </div>
                        </div>

                        <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-amber-600">Avg. Price Premium</p>
                              <h3 className="text-2xl font-bold text-gray-800 mt-1">{avgPremium.toFixed(1)}%</h3>
                            </div>
                            <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                              <TrendingUp className="h-5 w-5 text-amber-600" />
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs text-gray-500">Higher than market rates</p>
                          </div>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-purple-600">Active Initiatives</p>
                              <h3 className="text-2xl font-bold text-gray-800 mt-1">7</h3>
                            </div>
                            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <Zap className="h-5 w-5 text-purple-600" />
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs text-gray-500">Purchases, sales & trainings</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* FPO Performance Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="md:col-span-2"
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">FPO Business Performance</CardTitle>
                      <CardDescription>Monthly sales and purchases</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={fpoPerformanceData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="colorPurchases" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                            <Area type="monotone" dataKey="sales" stroke="#10b981" fillOpacity={1} fill="url(#colorSales)" />
                            <Area type="monotone" dataKey="purchases" stroke="#3b82f6" fillOpacity={1} fill="url(#colorPurchases)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Collective Savings */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Collective Savings</CardTitle>
                      <CardDescription>By category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={savingsData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="savings"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {savingsData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Recent Activities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="md:col-span-3"
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Recent FPO Activities</CardTitle>
                          <CardDescription>Latest collective actions</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                          View All
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.slice(0, 3).map((activity) => (
                          <div key={activity.id} className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex-shrink-0">
                              {activity.type === "meeting" && (
                                <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                  <Users className="h-5 w-5 text-purple-600" />
                                </div>
                              )}
                              {activity.type === "procurement" && (
                                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                                </div>
                              )}
                              {activity.type === "training" && (
                                <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                                  <BookOpen className="h-5 w-5 text-amber-600" />
                                </div>
                              )}
                              {activity.type === "market" && (
                                <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                                </div>
                              )}
                            </div>
                            <div className="flex-grow">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                <h4 className="font-medium text-gray-800">{activity.title}</h4>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="h-3.5 w-3.5 mr-1" />
                                  {activity.date}
                                  {activity.time && (
                                    <>
                                      <span className="mx-1">•</span>
                                      <Clock className="h-3.5 w-3.5 mr-1" />
                                      {activity.time}
                                    </>
                                  )}
                                </div>
                              </div>

                              <div className="mt-1 text-sm text-gray-600">
                                {activity.description && <p>{activity.description}</p>}

                                {activity.type === "procurement" && (
                                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                    <span>Item: {activity.item}</span>
                                    <span>Quantity: {activity.quantity}</span>
                                    <span>Savings: {activity.savings}</span>
                                    <span>Participants: {activity.participants}</span>
                                  </div>
                                )}

                                {activity.type === "market" && (
                                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                    <span>Quantity: {activity.quantity}</span>
                                    <span>Price: {activity.price}</span>
                                    <span>Premium: {activity.premium}</span>
                                    <span>Participants: {activity.participants}</span>
                                  </div>
                                )}
                              </div>

                              {activity.status && (
                                <div className="mt-2">
                                  <Badge className={
                                    activity.status === "Completed" || activity.status === "Payment Received"
                                      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                      : "bg-amber-100 text-amber-800 border-amber-200"
                                  }>
                                    {activity.status}
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Announcements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="md:col-span-3"
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Announcements</CardTitle>
                          <CardDescription>Important updates from FPO</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50">
                          View All
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {announcements.map((announcement) => (
                          <div key={announcement.id} className="p-3 rounded-lg border border-gray-100 hover:border-emerald-100 hover:shadow-sm transition-all">
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-1">
                                {announcement.priority === "high" ? (
                                  <AlertTriangle className="h-5 w-5 text-red-500" />
                                ) : (
                                  <Bell className="h-5 w-5 text-amber-500" />
                                )}
                              </div>
                              <div className="flex-grow">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                  <h4 className="font-medium text-gray-800">{announcement.title}</h4>
                                  <div className="text-sm text-gray-500">{announcement.date}</div>
                                </div>
                                <p className="mt-1 text-sm text-gray-600">{announcement.content}</p>
                                <div className="mt-2 text-xs text-gray-500">Posted by: {announcement.author}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            {/* Members Tab */}
            <TabsContent value="members">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle>FPO Members</CardTitle>
                        <CardDescription>View and manage all members of the FPO</CardDescription>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                          <Input
                            type="search"
                            placeholder="Search members..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                        <Select value={filterStatus} onValueChange={setFilterStatus}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Members</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                              <UserPlus className="h-4 w-4 mr-2" />
                              Add Member
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Add New Member</DialogTitle>
                              <DialogDescription>
                                Add a new farmer to the FPO membership
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                  Full Name
                                </Label>
                                <Input id="name" className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="village" className="text-right">
                                  Village
                                </Label>
                                <Input id="village" className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="land" className="text-right">
                                  Land Holding
                                </Label>
                                <Input id="land" type="number" className="col-span-3" placeholder="In acres" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="crops" className="text-right">
                                  Main Crops
                                </Label>
                                <Input id="crops" className="col-span-3" placeholder="e.g., Wheat, Rice" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">
                                  Phone
                                </Label>
                                <Input id="phone" className="col-span-3" />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">Add Member</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {displayMembers.map((member) => (
                        <div key={member.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-emerald-100 hover:shadow-sm transition-all">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border border-gray-200">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-gray-800">{member.name}</h4>
                                <Badge className={
                                  member.status === "active"
                                    ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                    : "bg-gray-100 text-gray-800 border-gray-200"
                                }>
                                  {member.status === "active" ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500">{member.role}</p>
                            </div>
                          </div>

                          <div className="flex-grow grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 sm:mt-0">
                            <div className="text-sm">
                              <span className="text-gray-500">Village:</span>
                              <span className="ml-1 text-gray-800">{member.village}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Land:</span>
                              <span className="ml-1 text-gray-800">{member.landHolding}</span>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Crops:</span>
                              <span className="ml-1 text-gray-800">{member.crops.join(", ")}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-3 sm:mt-0">
                            <Button variant="outline" size="sm" className="h-8 text-gray-600">
                              <MessageSquare className="h-3.5 w-3.5 mr-1" />
                              Message
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 text-gray-600">
                              <Edit className="h-3.5 w-3.5 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}

                      {filteredMembers.length > 3 && !showAllMembers && (
                        <Button
                          variant="outline"
                          className="w-full text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                          onClick={() => setShowAllMembers(true)}
                        >
                          Show All Members ({filteredMembers.length})
                        </Button>
                      )}

                      {showAllMembers && (
                        <Button
                          variant="outline"
                          className="w-full text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                          onClick={() => setShowAllMembers(false)}
                        >
                          Show Less
                        </Button>
                      )}

                      {filteredMembers.length === 0 && (
                        <div className="text-center py-8">
                          <User className="h-12 w-12 text-gray-300 mx-auto" />
                          <h3 className="mt-2 text-lg font-medium text-gray-800">No members found</h3>
                          <p className="text-gray-500">Try adjusting your search or filters</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Member Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Member Demographics</CardTitle>
                      <CardDescription>Distribution by village and land holding</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { village: 'Sonipat', count: 2 },
                              { village: 'Kharkhoda', count: 2 },
                              { village: 'Badli', count: 1 },
                            ]}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="village" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#10b981" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Crop Distribution</CardTitle>
                      <CardDescription>Main crops grown by members</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Wheat', value: 4 },
                                { name: 'Rice', value: 2 },
                                { name: 'Vegetables', value: 2 },
                                { name: 'Mustard', value: 1 },
                                { name: 'Sugarcane', value: 1 },
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {[...Array(5)].map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Activities Tab */}
            <TabsContent value="activities">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle>FPO Activities Calendar</CardTitle>
                        <CardDescription>Upcoming and past collective activities</CardDescription>
                      </div>
                      <div className="flex gap-3">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Activity Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="meeting">Meetings</SelectItem>
                            <SelectItem value="procurement">Procurement</SelectItem>
                            <SelectItem value="training">Trainings</SelectItem>
                            <SelectItem value="market">Market Sales</SelectItem>
                          </SelectContent>
                        </Select>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Activity
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Schedule New Activity</DialogTitle>
                              <DialogDescription>
                                Create a new collective activity for FPO members
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="activity-type" className="text-right">
                                  Activity Type
                                </Label>
                                <Select>
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="meeting">Meeting</SelectItem>
                                    <SelectItem value="procurement">Group Purchase</SelectItem>
                                    <SelectItem value="training">Training</SelectItem>
                                    <SelectItem value="market">Collective Sale</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                  Title
                                </Label>
                                <Input id="title" className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="date" className="text-right">
                                  Date
                                </Label>
                                <Input id="date" type="date" className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="time" className="text-right">
                                  Time
                                </Label>
                                <Input id="time" type="time" className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="location" className="text-right">
                                  Location
                                </Label>
                                <Input id="location" className="col-span-3" />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                  Description
                                </Label>
                                <Textarea id="description" className="col-span-3" />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">Schedule Activity</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex gap-4 p-4 rounded-lg border border-gray-100 hover:border-emerald-100 hover:shadow-sm transition-all">
                          <div className="flex-shrink-0">
                            {activity.type === "meeting" && (
                              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <Users className="h-6 w-6 text-purple-600" />
                              </div>
                            )}
                            {activity.type === "procurement" && (
                              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <ShoppingCart className="h-6 w-6 text-blue-600" />
                              </div>
                            )}
                            {activity.type === "training" && (
                              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                                <BookOpen className="h-6 w-6 text-amber-600" />
                              </div>
                            )}
                            {activity.type === "market" && (
                              <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-emerald-600" />
                              </div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <h4 className="font-medium text-gray-800">{activity.title}</h4>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                {activity.date}
                                {activity.time && (
                                  <>
                                    <span className="mx-1">•</span>
                                    <Clock className="h-3.5 w-3.5 mr-1" />
                                    {activity.time}
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="mt-1 text-sm text-gray-600">
                              {activity.description && <p>{activity.description}</p>}

                              {activity.location && (
                                <div className="flex items-center mt-1 text-gray-500">
                                  <MapPin className="h-3.5 w-3.5 mr-1" />
                                  {activity.location}
                                </div>
                              )}

                              {activity.type === "procurement" && (
                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                                  <span>Item: {activity.item}</span>
                                  <span>Quantity: {activity.quantity}</span>
                                  <span>Savings: {activity.savings}</span>
                                  <span>Participants: {activity.participants}</span>
                                </div>
                              )}

                              {activity.type === "market" && (
                                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                                  <span>Quantity: {activity.quantity}</span>
                                  <span>Price: {activity.price}</span>
                                  <span>Premium: {activity.premium}</span>
                                  <span>Participants: {activity.participants}</span>
                                </div>
                              )}
                            </div>

                            {activity.status && (
                              <div className="mt-2">
                                <Badge className={
                                  activity.status === "Completed" || activity.status === "Payment Received"
                                    ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                    : "bg-amber-100 text-amber-800 border-amber-200"
                                }>
                                  {activity.status}
                                </Badge>
                              </div>
                            )}
                          </div>
                          <div className="flex-shrink-0 flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 text-gray-600">
                              <Edit className="h-3.5 w-3.5 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Calendar */}
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Calendar</CardTitle>
                    <CardDescription>Upcoming scheduled activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                    

                      <div className="mt-6">
                        <h4 className="font-medium text-gray-800 mb-3">Upcoming Activities</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100">
                            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">Monthly FPO Meeting</h5>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                15 Aug, 2023
                                <span className="mx-1">•</span>
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                10:00 AM
                              </div>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <MapPin className="h-3.5 w-3.5 mr-1" />
                                Community Hall, Sonipat
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100">
                            <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                              <BookOpen className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">Organic Farming Workshop</h5>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                22 Aug, 2023
                                <span className="mx-1">•</span>
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                2:00 PM
                              </div>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <MapPin className="h-3.5 w-3.5 mr-1" />
                                Agricultural Extension Center
                              </div>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100">
                            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <ShoppingCart className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">Bulk Fertilizer Purchase</h5>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                27 Aug, 2023
                                <span className="mx-1">•</span>
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                9:00 AM
                              </div>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <MapPin className="h-3.5 w-3.5 mr-1" />
                                FPO Office
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Shared Equipment */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle>Shared Equipment</CardTitle>
                        <CardDescription>Machinery and tools available for members</CardDescription>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Equipment
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Equipment</DialogTitle>
                            <DialogDescription>
                              Register new shared equipment for FPO members
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="equipment-name" className="text-right">
                                Equipment Name
                              </Label>
                              <Input id="equipment-name" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="equipment-type" className="text-right">
                                Type
                              </Label>
                              <Select>
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="tractor">Tractor</SelectItem>
                                  <SelectItem value="harvester">Harvester</SelectItem>
                                  <SelectItem value="sprayer">Sprayer</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="purchase-date" className="text-right">
                                Purchase Date
                              </Label>
                              <Input id="purchase-date" type="date" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="value" className="text-right">
                                Value (₹)
                              </Label>
                              <Input id="value" type="number" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="rental-rate" className="text-right">
                                Rental Rate (₹/day)
                              </Label>
                              <Input id="rental-rate" type="number" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="description" className="text-right">
                                Description
                              </Label>
                              <Textarea id="description" className="col-span-3" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">Add Equipment</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: 1,
                          name: "Mahindra 575 DI Tractor",
                          type: "tractor",
                          status: "available",
                          rentalRate: "₹800/day",
                          lastService: "15 Jul, 2023",
                          nextService: "15 Oct, 2023",
                          image: "/images/tractor.jpg"
                        },
                        {
                          id: 2,
                          name: "Power Sprayer",
                          type: "sprayer",
                          status: "in-use",
                          rentalRate: "₹200/day",
                          lastService: "10 Jun, 2023",
                          nextService: "10 Sep, 2023",
                          currentUser: "Ramesh Kumar",
                          returnDate: "18 Aug, 2023",
                          image: "/images/sprayer.jpg"
                        },
                        {
                          id: 3,
                          name: "Wheat Thresher",
                          type: "harvester",
                          status: "maintenance",
                          rentalRate: "₹500/day",
                          lastService: "05 Aug, 2023",
                          nextService: "05 Nov, 2023",
                          maintenanceNote: "Belt replacement",
                          availableFrom: "20 Aug, 2023",
                          image: "/images/thresher.jpg"
                        }
                      ].map((equipment) => (
                        <div key={equipment.id} className="flex gap-4 p-4 rounded-lg border border-gray-100 hover:border-emerald-100 hover:shadow-sm transition-all">
                          <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden relative">
                            {equipment.image ? (
                              <Image
                                src={equipment.image}
                                alt={equipment.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Tractor className="h-10 w-10 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <h4 className="font-medium text-gray-800">{equipment.name}</h4>
                              <Badge className={
                                equipment.status === "available"
                                  ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                  : equipment.status === "in-use"
                                    ? "bg-blue-100 text-blue-800 border-blue-200"
                                    : "bg-amber-100 text-amber-800 border-amber-200"
                              }>
                                {equipment.status === "available"
                                  ? "Available"
                                  : equipment.status === "in-use"
                                    ? "In Use"
                                    : "Under Maintenance"}
                              </Badge>
                            </div>

                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                              <div>
                                <span className="text-gray-500">Type:</span>
                                <span className="ml-1 text-gray-800 capitalize">{equipment.type}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Rental Rate:</span>
                                <span className="ml-1 text-gray-800">{equipment.rentalRate}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Last Service:</span>
                                <span className="ml-1 text-gray-800">{equipment.lastService}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Next Service:</span>
                                <span className="ml-1 text-gray-800">{equipment.nextService}</span>
                              </div>

                              {equipment.status === "in-use" && (
  <>
    <div>
      <span className="text-gray-500">Current User:</span>
      <span className="ml-1 text-gray-800">{equipment.currentUser}</span>
    </div>
    <div>
      <span className="text-gray-500">Return Date:</span>
      <span className="ml-1 text-gray-800">{equipment.returnDate}</span>
    </div>
  </>
)}
{equipment.status === "maintenance" && (
  <>
    <div>
      <span className="text-gray-500">Maintenance Note:</span>
      <span className="ml-1 text-gray-800">{equipment.maintenanceNote}</span>
    </div>
    <div>
      <span className="text-gray-500">Available From:</span>
      <span className="ml-1 text-gray-800">{equipment.availableFrom}</span>
    </div>
  </>
)}
                            </div>
                          </div>
                          <div className="flex-shrink-0 flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 text-gray-600">
                              <Edit className="h-3.5 w-3.5 mr-1" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 text-gray-600">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              Book
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {sharedEquipment.length > 2 && !showAllEquipment && (
                      <Button
                        variant="outline"
                        className="w-full mt-4 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                        onClick={() => setShowAllEquipment(true)}
                      >
                        Show All Equipment ({sharedEquipment.length})
                      </Button>
                    )}

                    {showAllEquipment && (
                      <Button
                        variant="outline"
                        className="w-full mt-4 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                        onClick={() => setShowAllEquipment(false)}
                      >
                        Show Less
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Equipment Usage Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Equipment Usage</CardTitle>
                    <CardDescription>Utilization trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { month: 'Jan', usage: 20 },
                            { month: 'Feb', usage: 30 },
                            { month: 'Mar', usage: 45 },
                            { month: 'Apr', usage: 40 },
                            { month: 'May', usage: 35 },
                            { month: 'Jun', usage: 50 },
                            { month: 'Jul', usage: 60 },
                            { month: 'Aug', usage: 55 },
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value: number) => `${value} hours`} />
                          <Line type="monotone" dataKey="usage" stroke="#10b981" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Training Resources */}
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle>Training & Resources</CardTitle>
                      <CardDescription>Upcoming workshops and learning materials</CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Training
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Schedule New Training</DialogTitle>
                          <DialogDescription>
                            Organize a new training session for FPO members
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="training-title" className="text-right">
                              Title
                            </Label>
                            <Input id="training-title" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="training-date" className="text-right">
                              Date
                            </Label>
                            <Input id="training-date" type="date" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="training-time" className="text-right">
                              Time
                            </Label>
                            <Input id="training-time" type="time" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="trainer" className="text-right">
                              Trainer
                            </Label>
                            <Input id="trainer" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="location" className="text-right">
                              Location
                            </Label>
                            <Input id="location" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                              Description
                            </Label>
                            <Textarea id="description" className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">Schedule Training</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trainings.map((training) => (
                      <div key={training.id} className="flex gap-4 p-4 rounded-lg border border-gray-100 hover:border-emerald-100 hover:shadow-sm transition-all">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                            <BookOpen className="h-6 w-6 text-amber-600" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <h4 className="font-medium text-gray-800">{training.title}</h4>
                            <Badge className={
                              training.status === "Upcoming"
                                ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                : "bg-gray-100 text-gray-800 border-gray-200"
                            }>
                              {training.status}
                            </Badge>
                          </div>
                          <div className="mt-1 text-sm text-gray-600">
                            <p>{training.description}</p>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                              <div className="flex items-center text-gray-500">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                {training.date}
                              </div>
                              <div className="flex items-center text-gray-500">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                {training.time}
                              </div>
                              <div className="flex items-center text-gray-500">
                                <MapPin className="h-3.5 w-3.5 mr-1" />
                                {training.location}
                              </div>
                              <div className="flex items-center text-gray-500">
                                <User className="h-3.5 w-3.5 mr-1" />
                                {training.trainer}
                              </div>
                            </div>
                            <div className="mt-2">
                              <Progress value={(training.registered / training.capacity) * 100} className="h-1" />
                              <p className="text-xs text-gray-500 mt-1">
                                {training.registered} / {training.capacity} registered
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-2">
                          <Button variant="outline" size="sm" className="h-8 text-gray-600">
                            <Edit className="h-3.5 w-3.5 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 text-gray-600">
                            <UserPlus className="h-3.5 w-3.5 mr-1" />
                            Register
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Marketplace Tab */}
            <TabsContent value="marketplace">
              <div className="space-y-6">
                {/* Group Purchases */}
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle>Group Purchases</CardTitle>
                        <CardDescription>Bulk buying opportunities</CardDescription>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Start Group Purchase
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Initiate Group Purchase</DialogTitle>
                            <DialogDescription>
                              Start a new bulk purchase for FPO members
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="item" className="text-right">
                                Item
                              </Label>
                              <Input id="item" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="quantity" className="text-right">
                                Quantity
                              </Label>
                              <Input id="quantity" type="number" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="unit-price" className="text-right">
                                Unit Price (₹)
                              </Label>
                              <Input id="unit-price" type="number" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="deadline" className="text-right">
                                Deadline
                              </Label>
                              <Input id="deadline" type="date" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="min-participants" className="text-right">
                                Min. Participants
                              </Label>
                              <Input id="min-participants" type="number" className="col-span-3" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">Start Purchase</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {groupPurchases.map((purchase) => (
                        <div key={purchase.id} className="flex gap-4 p-4 rounded-lg border border-gray-100 hover:border-emerald-100 hover:shadow-sm transition-all">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <ShoppingCart className="h-6 w-6 text-blue-600" />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <h4 className="font-medium text-gray-800">{purchase.item}</h4>
                              <Badge className={
                                purchase.status === "Open"
                                  ? "bg-amber-100 text-amber-800 border-amber-200"
                                  : purchase.status === "Confirmed"
                                    ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                                    : "bg-gray-100 text-gray-800 border-gray-200"
                              }>
                                {purchase.status}
                              </Badge>
                            </div>
                            <div className="mt-1 text-sm text-gray-600">
                              <div className="flex flex-wrap gap-x-4 gap-y-1">
                                <span>Quantity: {purchase.quantity}</span>
                                <span>Unit Price: {purchase.unitPrice}</span>
                                <span>Market Price: {purchase.marketPrice}</span>
                                <span>Savings: {purchase.savings}</span>
                              </div>
                              <div className="mt-2">
                                <Progress value={purchase.progress} className="h-1" />
                                <p className="text-xs text-gray-500 mt-1">
                                  {purchase.participants} / {purchase.minRequired} participants
                                </p>
                              </div>
                              <div className="flex items-center text-gray-500 mt-2">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                Deadline: {purchase.deadline}
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0 flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 text-gray-600">
                              <UserPlus className="h-3.5 w-3.5 mr-1" />
                              Join
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Collective Sales */}
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle>Collective Sales</CardTitle>
                        <CardDescription>Bulk selling opportunities</CardDescription>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Start Collective Sale
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Initiate Collective Sale</DialogTitle>
                            <DialogDescription>
                              Start a new bulk sale for FPO members
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="crop" className="text-right">
                                Crop
                              </Label>
                              <Input id="crop" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="quantity" className="text-right">
                                Quantity
                              </Label>
                              <Input id="quantity" type="number" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="expected-price" className="text-right">
                                Expected Price (₹)
                              </Label>
                              <Input id="expected-price" type="number" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="deadline" className="text-right">
                                Deadline
                              </Label>
                              <Input id="deadline" type="date" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="buyer" className="text-right">
                                Buyer
                              </Label>
                              <Input id="buyer" className="col-span-3" placeholder="e.g., Open Bidding" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">Start Sale</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {collectiveSales.map((sale) => (
                        <div key={sale.id} className="flex gap-4 p-4 rounded-lg border border-gray-100 hover:border-emerald-100 hover:shadow-sm transition-all">
                          <div className="flex-shrink-0">
                            <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                              <TrendingUp className="h-6 w-6 text-emerald-600" />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <h4 className="font-medium text-gray-800">{sale.crop}</h4>
                              <Badge className={
                                sale.status === "Upcoming"
                                  ? "bg-amber-100 text-amber-800 border-amber-200"
                                  : sale.status === "Negotiating"
                                    ? "bg-blue-100 text-blue-800 border-blue-200"
                                    : "bg-emerald-100 text-emerald-800 border-emerald-200"
                              }>
                                {sale.status}
                              </Badge>
                            </div>
                            <div className="mt-1 text-sm text-gray-600">
                              <div className="flex flex-wrap gap-x-4 gap-y-1">
                                <span>Quantity: {sale.quantity}</span>
                                {sale.expectedPrice && <span>Expected Price: {sale.expectedPrice}</span>}
                                {sale.finalPrice && <span>Final Price: {sale.finalPrice}</span>}
                                <span>Market Price: {sale.marketPrice}</span>
                                {sale.premium && <span>Premium: {sale.premium}</span>}
                              </div>
                              <div className="mt-2">
                                <Progress value={sale.progress} className="h-1" />
                                <p className="text-xs text-gray-500 mt-1">
                                  {sale.participants} participants
                                </p>
                              </div>
                              <div className="flex items-center text-gray-500 mt-2">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                {sale.deadline || sale.date}
                              </div>
                              <div className="flex items-center text-gray-500 mt-1">
                                <User className="h-3.5 w-3.5 mr-1" />
                                Buyer: {sale.buyer}
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0 flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 text-gray-600">
                              <UserPlus className="h-3.5 w-3.5 mr-1" />
                              Join
                            </Button>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Communication Tab */}
            <TabsContent value="communication">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Chat Interface */}
                <Card className="md:col-span-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>FPO Group Chat</CardTitle>
                        <CardDescription>Communicate with members</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 text-gray-600">
                          <Users className="h-3.5 w-3.5 mr-1" />
                          Members
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="h-96 overflow-y-auto border border-gray-100 rounded-lg p-4">
                        {chatMessages.map((message) => (
                          <div key={message.id} className="flex gap-3 mb-4">
                            <Avatar className="h-10 w-10 border border-gray-200">
                              <AvatarImage src={message.avatar} alt={message.sender} />
                              <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-gray-800">{message.sender}</h4>
                                <span className="text-xs text-gray-500">{message.role}</span>
                                <span className="text-xs text-gray-400">{message.time}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{message.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Type your message..."
                          className="flex-grow"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Announcements */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Announcements</CardTitle>
                        <CardDescription>Recent updates</CardDescription>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                            <Plus className="h-4 w-4 mr-1" />
                            New
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create Announcement</DialogTitle>
                            <DialogDescription>
                              Share important updates with FPO members
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="title" className="text-right">
                                Title
                              </Label>
                              <Input id="title" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="content" className="text-right">
                                Content
                              </Label>
                              <Textarea id="content" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="priority" className="text-right">
                                Priority
                              </Label>
                              <Select defaultValue="medium">
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select priority" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">Post Announcement</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {announcements.slice(0, 3).map((announcement) => (
                        <div key={announcement.id} className="p-3 rounded-lg border border-gray-100 hover:border-emerald-100 hover:shadow-sm transition-all">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {announcement.priority === "high" ? (
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                              ) : (
                                <Bell className="h-5 w-5 text-amber-500" />
                              )}
                            </div>
                            <div className="flex-grow">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                <h4 className="font-medium text-gray-800">{announcement.title}</h4>
                                <div className="text-sm text-gray-500">{announcement.date}</div>
                              </div>
                              <p className="mt-1 text-sm text-gray-600">{announcement.content}</p>
                              <div className="mt-2 text-xs text-gray-500">Posted by: {announcement.author}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                      >
                        View All Announcements
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}