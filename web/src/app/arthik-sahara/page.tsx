"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import DashboardHeader from "@/components/DashboardHeader";
import {
  TrendingUp, TrendingDown, AlertTriangle,
  BarChart2, PieChart, LineChart, Activity,
  Calendar, Clock, MapPin, Zap, Award,
  Leaf, Sprout, Thermometer, Droplet, CloudLightning,
  ShoppingBag, CreditCard, Shield, HelpCircle,
  ChevronRight, ExternalLink, ArrowRight, Plus,
  Check, X, Info, FileText, Percent, DollarSign,
  Umbrella, Sun, Cloud, CloudRain, Coins, Calculator,
  BarChart, PieChart as PieChartIcon, Users, User,
  Smartphone, Layers, Lock, Unlock, Eye, EyeOff,
  FileCheck, FilePlus, Star, StarHalf, Tractor,
  Droplets, Wind, Landmark, Building, Home, Camera
} from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart as ReBarChart, Bar, PieChart as RePieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
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

// Credit Score Data
const creditScoreData = [
  { name: 'Farm Activity', value: 85, fullMark: 100 },
  { name: 'Payment History', value: 70, fullMark: 100 },
  { name: 'App Engagement', value: 90, fullMark: 100 },
  { name: 'Market Activity', value: 65, fullMark: 100 },
  { name: 'Input Purchases', value: 75, fullMark: 100 },
];

// Credit Score History
const creditScoreHistory = [
  { month: 'Jan', score: 620 },
  { month: 'Feb', score: 635 },
  { month: 'Mar', score: 650 },
  { month: 'Apr', score: 645 },
  { month: 'May', score: 660 },
  { month: 'Jun', score: 675 },
  { month: 'Jul', score: 690 },
  { month: 'Aug', score: 705 },
  { month: 'Sep', score: 720 },
  { month: 'Oct', score: 735 },
  { month: 'Nov', score: 750 },
  { month: 'Dec', score: 765 },
];

// Loan Options
const loanOptions = [
  {
    id: 1,
    name: "Kisan Credit Card",
    provider: "State Bank of India",
    amount: "₹50,000 - ₹3,00,000",
    interest: "7% p.a.",
    tenure: "12 months",
    eligibility: "Alternative Credit Score > 650",
    purpose: "Crop inputs, equipment rental",
    logo: "/images/sbi-logo.png",
    match: 95,
    features: [
      "No collateral required for loans up to ₹1,60,000",
      "Interest subvention of 2% for prompt repayment",
      "Flexible withdrawal and repayment",
      "Accident insurance cover"
    ]
  },
  {
    id: 2,
    name: "Agri Equipment Loan",
    provider: "HDFC Bank",
    amount: "₹1,00,000 - ₹10,00,000",
    interest: "8.5% p.a.",
    tenure: "1-5 years",
    eligibility: "Alternative Credit Score > 700",
    purpose: "Purchase of farm equipment",
    logo: "/images/hdfc-logo.png",
    match: 85,
    features: [
      "Up to 85% of equipment value financed",
      "Quick processing within 3 days",
      "Flexible repayment options",
      "No foreclosure charges after 12 months"
    ]
  },
  {
    id: 3,
    name: "Micro Irrigation Loan",
    provider: "NABARD via Local Cooperative",
    amount: "₹25,000 - ₹2,00,000",
    interest: "6% p.a.",
    tenure: "3-5 years",
    eligibility: "Alternative Credit Score > 600",
    purpose: "Drip/sprinkler irrigation systems",
    logo: "/images/nabard-logo.png",
    match: 90,
    features: [
      "Subsidy of 40-55% available through government schemes",
      "Moratorium period of 6 months",
      "Technical assistance provided",
      "Water conservation focus gives priority approval"
    ]
  },
  {
    id: 4,
    name: "Warehouse Receipt Financing",
    provider: "Axis Bank",
    amount: "Up to 75% of commodity value",
    interest: "9% p.a.",
    tenure: "Up to 12 months",
    eligibility: "Alternative Credit Score > 680",
    purpose: "Post-harvest financing against stored produce",
    logo: "/images/axis-logo.png",
    match: 75,
    features: [
      "No additional collateral required",
      "Flexibility to sell when prices are favorable",
      "Warehouse receipt as security",
      "Avoid distress sales immediately after harvest"
    ]
  },
  {
    id: 5,
    name: "FPO Member Loan",
    provider: "Small Finance Bank",
    amount: "₹20,000 - ₹1,00,000",
    interest: "10% p.a. (reducing)",
    tenure: "6-12 months",
    eligibility: "Alternative Credit Score > 620, FPO Membership",
    purpose: "Seasonal crop inputs",
    logo: "/images/sfb-logo.png",
    match: 88,
    features: [
      "Group guarantee from FPO members",
      "Faster processing for repeat borrowers",
      "Flexible repayment aligned with harvest cycle",
      "Financial literacy training included"
    ]
  }
];

// Insurance Options
const insuranceOptions = [
  {
    id: 1,
    name: "Weather Index Insurance - Wheat",
    provider: "Agriculture Insurance Company",
    premium: "₹1,200 per acre",
    coverage: "₹30,000 per acre",
    triggers: "Rainfall deficit, excess rainfall, temperature extremes",
    claimProcess: "Automatic based on weather data",
    logo: "/images/aic-logo.png",
    match: 98,
    features: [
      "No claim filing needed - automatic triggers",
      "Premium subsidy of 50% available",
      "Hyperlocal weather data from nearest AWS",
      "Payout within 15 days of trigger event"
    ]
  },
  {
    id: 2,
    name: "Multi-Peril Crop Insurance",
    provider: "HDFC ERGO",
    premium: "₹1,800 per acre",
    coverage: "₹40,000 per acre",
    triggers: "Yield loss, natural calamities, pest/disease outbreaks",
    claimProcess: "Simplified claim with mobile app photo evidence",
    logo: "/images/hdfc-ergo-logo.png",
    match: 85,
    features: [
      "Comprehensive coverage against multiple risks",
      "Simplified claim process via app",
      "Coverage from sowing to harvest",
      "Additional coverage for post-harvest losses (7 days)"
    ]
  },
  {
    id: 3,
    name: "Parametric Drought Protection",
    provider: "ICICI Lombard",
    premium: "₹900 per acre",
    coverage: "₹25,000 per acre",
    triggers: "NDVI index below threshold, soil moisture deficit",
    claimProcess: "Automatic based on satellite data",
    logo: "/images/icici-lombard-logo.png",
    match: 92,
    features: [
      "Satellite-based monitoring - no manual inspection",
      "Partial payouts possible for moderate drought",
      "Early warning alerts when conditions approach trigger levels",
      "Transparent trigger thresholds shared in advance"
    ]
  },
  {
    id: 4,
    name: "Horticulture Crop Protection",
    provider: "Bajaj Allianz",
    premium: "₹2,200 per acre",
    coverage: "₹60,000 per acre",
    triggers: "Weather events, market price drop below threshold",
    claimProcess: "Hybrid - automatic for weather, simplified for other claims",
    logo: "/images/bajaj-allianz-logo.png",
    match: 78,
    features: [
      "Specialized for high-value horticultural crops",
      "Price protection component included",
      "Coverage for quality deterioration",
      "Extended coverage for cold storage period (30 days)"
    ]
  },
  {
    id: 5,
    name: "Livestock Weather Protection",
    provider: "New India Assurance",
    premium: "₹800 per animal",
    coverage: "₹25,000 per animal",
    triggers: "Heat stress index, cold wave, disease outbreaks in region",
    claimProcess: "Automatic for weather triggers, simplified for disease",
    logo: "/images/nia-logo.png",
    match: 65,
    features: [
      "Covers productivity loss due to weather stress",
      "Preventive healthcare advisory included",
      "Vaccination subsidy included",
      "Optional add-on for permanent disability"
    ]
  }
];

// Credit Score Improvement Tips
const improvementTips = [
  {
    id: 1,
    title: "Regular App Engagement",
    description: "Log into the app at least 3 times per week to record farm activities and check advisories.",
    impact: "Medium",
    difficulty: "Easy",
    icon: <Smartphone className="w-5 h-5 text-green-500" />
  },
  {
    id: 2,
    title: "Complete Farm Profile",
    description: "Ensure all sections of your farm profile are complete with accurate information.",
    impact: "High",
    difficulty: "Easy",
    icon: <FileCheck className="w-5 h-5 text-green-500" />
  },
  {
    id: 3,
    title: "Follow Weather Advisories",
    description: "Implement recommended actions from weather advisories and mark them as completed.",
    impact: "Medium",
    difficulty: "Medium",
    icon: <Cloud className="w-5 h-5 text-blue-500" />
  },
  {
    id: 4,
    title: "Record All Transactions",
    description: "Use the app to record all farm-related purchases and sales, even small ones.",
    impact: "High",
    difficulty: "Medium",
    icon: <FileText className="w-5 h-5 text-amber-500" />
  },
  {
    id: 5,
    title: "Join an FPO",
    description: "Become an active member of a Farmer Producer Organization through the platform.",
    impact: "High",
    difficulty: "Medium",
    icon: <Users className="w-5 h-5 text-indigo-500" />
  },
  {
    id: 6,
    title: "Use Digital Payments",
    description: "Make and receive payments through the platform's integrated payment system.",
    impact: "Medium",
    difficulty: "Easy",
    icon: <CreditCard className="w-5 h-5 text-purple-500" />
  }
];

// Recent Financial Activities
const recentActivities = [
  {
    id: 1,
    title: "Applied for Kisan Credit Card",
    time: "Today, 10:30 AM",
    status: "pending",
    icon: <CreditCard className="w-4 h-4" />,
    color: "blue",
  },
  {
    id: 2,
    title: "Weather Index Insurance premium paid",
    time: "Yesterday, 4:45 PM",
    status: "completed",
    amount: "₹1,200",
    icon: <Shield className="w-4 h-4" />,
    color: "green",
  },
  {
    id: 3,
    title: "Received insurance payout for rainfall deficit",
    time: "3 days ago, 2:15 PM",
    status: "completed",
    amount: "₹8,500",
    icon: <Umbrella className="w-4 h-4" />,
    color: "amber",
  },
  {
    id: 4,
    title: "Loan EMI payment",
    time: "7 days ago, 11:20 AM",
    status: "completed",
    amount: "₹3,200",
    icon: <Landmark className="w-4 h-4" />,
    color: "purple",
  },
  {
    id: 5,
    title: "Credit score updated",
    time: "10 days ago, 9:15 AM",
    status: "info",
    change: "+15 points",
    icon: <TrendingUp className="w-4 h-4" />,
    color: "green",
  },
];

// Weather risk data for insurance
const weatherRiskData = [
  { month: 'Jan', rainfall: 20, temperature: 15, risk: 30 },
  { month: 'Feb', rainfall: 25, temperature: 18, risk: 25 },
  { month: 'Mar', rainfall: 30, temperature: 22, risk: 20 },
  { month: 'Apr', rainfall: 20, temperature: 28, risk: 40 },
  { month: 'May', rainfall: 15, temperature: 32, risk: 60 },
  { month: 'Jun', rainfall: 40, temperature: 30, risk: 70 },
  { month: 'Jul', rainfall: 80, temperature: 28, risk: 50 },
  { month: 'Aug', rainfall: 100, temperature: 27, risk: 40 },
  { month: 'Sep', rainfall: 60, temperature: 26, risk: 30 },
  { month: 'Oct', rainfall: 30, temperature: 24, risk: 25 },
  { month: 'Nov', rainfall: 20, temperature: 20, risk: 20 },
  { month: 'Dec', rainfall: 15, temperature: 16, risk: 30 },
];

export default function ArthikSaharaPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState("credit");
  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanTenure, setLoanTenure] = useState(12);
  const [cropType, setCropType] = useState("wheat");
  const [landArea, setLandArea] = useState(2);
  const [showAllLoans, setShowAllLoans] = useState(false);
  const [showAllInsurance, setShowAllInsurance] = useState(false);
  const [creditScore, setCreditScore] = useState(765);

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

  // Calculate EMI for loan amount
  const calculateEMI = (principal: number, rate: number, time: number) => {
    rate = rate / (12 * 100); // monthly interest rate
    time = time; // time in months
    return (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
  };

  // Get credit score color
  const getCreditScoreColor = (score: number) => {
    if (score < 600) return "text-red-500";
    if (score < 650) return "text-orange-500";
    if (score < 700) return "text-yellow-500";
    if (score < 750) return "text-green-500";
    return "text-emerald-500";
  };

  // Get credit score label
  const getCreditScoreLabel = (score: number) => {
    if (score < 600) return "Poor";
    if (score < 650) return "Fair";
    if (score < 700) return "Good";
    if (score < 750) return "Very Good";
    return "Excellent";
  };

  // Filter loans based on credit score
  const filteredLoans = loanOptions.filter(loan => {
    const matches = loan.eligibility.match(/\d+/);
    const requiredScore = matches ? parseInt(matches[0]) : 0;
    return creditScore >= requiredScore;
  });

  // Sort loans by match percentage
  const sortedLoans = [...filteredLoans].sort((a, b) => b.match - a.match);
  const displayLoans = showAllLoans ? sortedLoans : sortedLoans.slice(0, 3);

  // Filter insurance options
  const sortedInsurance = [...insuranceOptions].sort((a, b) => b.match - a.match);
  const displayInsurance = showAllInsurance ? sortedInsurance : sortedInsurance.slice(0, 3);

  return (
    <div>
      <DashboardHeader />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Header with gradient background */}
          <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 rounded-2xl p-6 shadow-sm border border-indigo-100 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-800 to-purple-600 bg-clip-text text-transparent">
                  आर्थिक सहारा (Arthik Sahara)
                </h1>
                <p className="text-gray-600">Financial support tailored for your farming needs</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-indigo-100 text-gray-700 shadow-sm">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium">{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-indigo-100 text-gray-700 shadow-sm">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium">{isClient ? formattedTime : "Loading..."}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Tabs */}
          <Tabs defaultValue="insurance" className="mb-8" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6">
            <TabsTrigger value="insurance" className="text-base">
                <Shield className="w-4 h-4 mr-2" />
                Crop Insurance
              </TabsTrigger>
              <TabsTrigger value="credit" className="text-base">
                <CreditCard className="w-4 h-4 mr-2" />
                Credit & Loans
              </TabsTrigger>
            </TabsList>

            {/* Credit & Loans Tab Content */}
            <TabsContent value="credit" className="space-y-6">
              {/* Credit Score Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* Credit Score Card */}
                <Card className="md:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>Alternative Credit Score</span>
                      <Info className="w-4 h-4 text-gray-400 cursor-help" />
                    </CardTitle>
                    <CardDescription>Based on your farming activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-4">
                      <div className="relative w-36 h-36 flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="10"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke={creditScore >= 750 ? "#10b981" : creditScore >= 700 ? "#22c55e" : creditScore >= 650 ? "#eab308" : creditScore >= 600 ? "#f97316" : "#ef4444"}
                            strokeWidth="10"
                            strokeDasharray="283"
                            strokeDashoffset={283 - (283 * (creditScore / 850))}
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                          <span className={`text-3xl font-bold ${getCreditScoreColor(creditScore)}`}>{creditScore}</span>
                          <span className="text-sm text-gray-500">{getCreditScoreLabel(creditScore)}</span>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          +15 points this month
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center pt-0">
                    <Button variant="outline" className="w-full">
                      <FileText className="w-4 h-4 mr-2" />
                      View Detailed Report
                    </Button>
                  </CardFooter>
                </Card>

                {/* Credit Score Factors */}
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Score Factors</CardTitle>
                    <CardDescription>Key components affecting your credit score</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      {isClient && (
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart outerRadius={90} data={creditScoreData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="name" />
                            <PolarRadiusAxis domain={[0, 100]} />
                            <Radar
                              name="Credit Factors"
                              dataKey="value"
                              stroke="#6366f1"
                              fill="#6366f1"
                              fillOpacity={0.5}
                            />
                            <Tooltip />
                          </RadarChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Credit Score History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Score History</CardTitle>
                    <CardDescription>Your credit score trend over the past year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      {isClient && (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={creditScoreHistory}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="month" />
                            <YAxis domain={[600, 800]} />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type="monotone" dataKey="score" stroke="#6366f1" fillOpacity={1} fill="url(#colorScore)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Loan Finder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Loan Finder</CardTitle>
                    <CardDescription>Find the right loan for your farming needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                          <div className="flex items-center gap-4">
                            <Input
                              id="loanAmount"
                              type="number"
                              value={loanAmount}
                              onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                              className="w-full"
                            />
                            <span className="text-sm text-gray-500 whitespace-nowrap">
                              ₹{loanAmount.toLocaleString()}
                            </span>
                          </div>
                          <Slider
                            value={[loanAmount]}
                            min={10000}
                            max={500000}
                            step={10000}
                            onValueChange={(value) => setLoanAmount(value[0])}
                            className="mt-2"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="loanTenure">Loan Tenure (months)</Label>
                          <div className="flex items-center gap-4">
                            <Input
                              id="loanTenure"
                              type="number"
                              value={loanTenure}
                              onChange={(e) => setLoanTenure(parseInt(e.target.value))}
                              className="w-full"
                            />
                            <span className="text-sm text-gray-500 whitespace-nowrap">
                              {loanTenure} months
                            </span>
                          </div>
                          <Slider
                            value={[loanTenure]}
                            min={3}
                            max={60}
                            step={1}
                            onValueChange={(value) => setLoanTenure(value[0])}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Loan Purpose</Label>
                          <Select defaultValue="inputs">
                            <SelectTrigger>
                              <SelectValue placeholder="Select purpose" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="inputs">Crop Inputs</SelectItem>
                              <SelectItem value="equipment">Farm Equipment</SelectItem>
                              <SelectItem value="irrigation">Irrigation System</SelectItem>
                              <SelectItem value="storage">Storage Facility</SelectItem>
                              <SelectItem value="land">Land Development</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Crop Type</Label>
                          <Select value={cropType} onValueChange={setCropType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select crop" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="wheat">Wheat</SelectItem>
                              <SelectItem value="rice">Rice</SelectItem>
                              <SelectItem value="cotton">Cotton</SelectItem>
                              <SelectItem value="sugarcane">Sugarcane</SelectItem>
                              <SelectItem value="vegetables">Vegetables</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="landArea">Land Area (Acres)</Label>
                          <div className="flex items-center gap-4">
                            <Input
                              id="landArea"
                              type="number"
                              value={landArea}
                              onChange={(e) => setLandArea(parseFloat(e.target.value))}
                              className="w-full"
                            />
                            <span className="text-sm text-gray-500 whitespace-nowrap">
                              {landArea} acres
                            </span>
                          </div>
                          <Slider
                            value={[landArea]}
                            min={0.5}
                            max={20}
                            step={0.5}
                            onValueChange={(value) => setLandArea(value[0])}
                            className="mt-2"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-base font-medium text-gray-800 mb-4">Recommended Loans</h3>
                      <div className="space-y-4">
                        {displayLoans.map((loan) => (
                          <div
                            key={loan.id}
                            className="bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
                          >
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                              <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center p-2">
                                {loan.logo ? (
                                  <Image
                                    src={loan.logo}
                                    alt={loan.provider}
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                  />
                                ) : (
                                  <Landmark className="w-8 h-8 text-gray-400" />
                                )}
                              </div>

                              <div className="flex-grow">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="text-lg font-semibold text-gray-800">{loan.name}</h4>
                                      <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200">
                                        {loan.match}% Match
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-500">{loan.provider}</p>
                                  </div>
                                  <div className="flex flex-wrap gap-3">
                                    <div className="text-sm">
                                      <span className="text-gray-500">Amount:</span>
                                      <span className="ml-1 font-medium text-gray-800">{loan.amount}</span>
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-gray-500">Interest:</span>
                                      <span className="ml-1 font-medium text-gray-800">{loan.interest}</span>
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-gray-500">Tenure:</span>
                                      <span className="ml-1 font-medium text-gray-800">{loan.tenure}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-3">
                                  <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value={`loan-${loan.id}`} className="border-none">
                                      <AccordionTrigger className="py-1 text-sm text-indigo-600 hover:text-indigo-800 hover:no-underline">
                                        View Details
                                      </AccordionTrigger>
                                      <AccordionContent>
                                        <div className="pt-2 pb-3 space-y-3">
                                          <div>
                                            <p className="text-sm font-medium text-gray-700">Eligibility:</p>
                                            <p className="text-sm text-gray-600">{loan.eligibility}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium text-gray-700">Purpose:</p>
                                            <p className="text-sm text-gray-600">{loan.purpose}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium text-gray-700">Features:</p>
                                            <ul className="mt-1 space-y-1">
                                              {loan.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                  <span>{feature}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>

                                          <div className="pt-2">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Estimated EMI:</p>
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                              <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">For ₹{loanAmount.toLocaleString()}</span>
                                                <span className="text-lg font-semibold text-gray-800">
                                                  ₹{Math.round(calculateEMI(loanAmount, parseFloat(loan.interest), loanTenure)).toLocaleString()}/month
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                </div>
                              </div>

                              <div className="flex-shrink-0 flex flex-col gap-2">
                                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                  Apply Now
                                </Button>
                                <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                                  Compare
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}

                        {filteredLoans.length > 3 && (
                          <div className="flex justify-center mt-4">
                            <Button
                              variant="outline"
                              onClick={() => setShowAllLoans(!showAllLoans)}
                              className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                            >
                              {showAllLoans ? (
                                <>
                                  <ChevronRight className="w-4 h-4 mr-2 rotate-90" />
                                  Show Less
                                </>
                              ) : (
                                <>
                                  <ChevronRight className="w-4 h-4 mr-2 -rotate-90" />
                                  Show All ({filteredLoans.length}) Loans
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Credit Score Improvement Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Improve Your Credit Score</CardTitle>
                    <CardDescription>Follow these tips to increase your alternative credit score</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {improvementTips.map((tip) => (
                        <div
                          key={tip.id}
                          className="bg-white border border-gray-200 rounded-lg p-4 hover:border-indigo-200 hover:shadow-sm transition-all duration-200"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                              {tip.icon}
                            </div>
                            <div>
                              <h4 className="text-base font-medium text-gray-800">{tip.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <Badge variant="outline" className={`
                                  ${tip.impact === 'High' ? 'bg-green-50 text-green-700 border-green-200' :
                                    tip.impact === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                    'bg-blue-50 text-blue-700 border-blue-200'}
                                `}>
                                  {tip.impact} Impact
                                </Badge>
                                <Badge variant="outline" className={`
                                  ${tip.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' :
                                    tip.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                    'bg-red-50 text-red-700 border-red-200'}
                                `}>
                                  {tip.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Financial Activities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Financial Activities</CardTitle>
                    <CardDescription>Your recent transactions and financial updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className={`w-8 h-8 rounded-full bg-${activity.color}-100 flex items-center justify-center flex-shrink-0`}>
                            <div className={`text-${activity.color}-500`}>
                              {activity.icon}
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <h4 className="text-sm font-medium text-gray-800">{activity.title}</h4>
                              <span className="text-xs text-gray-500">{activity.time}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              {activity.status === 'pending' && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  Pending
                                </Badge>
                              )}
                              {activity.status === 'completed' && (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  Completed
                                </Badge>
                              )}
                              {activity.status === 'info' && (
                                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                  Info
                                </Badge>
                              )}
                              {activity.amount && (
                                <span className="text-sm font-medium text-gray-800">{activity.amount}</span>
                              )}
                              {activity.change && (
                                <span className="text-sm font-medium text-green-600">{activity.change}</span>
                              )}
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="flex-shrink-0">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Insurance Tab Content */}
            <TabsContent value="insurance" className="space-y-6">
              {/* Insurance Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* Weather Risk Assessment */}
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Weather Risk Assessment</CardTitle>
                    <CardDescription>Risk profile for your crops based on historical weather patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      {isClient && (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={weatherRiskData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area type="monotone" dataKey="risk" stroke="#ef4444" fillOpacity={1} fill="url(#colorRisk)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="text-sm font-medium text-gray-800">High Risk Months</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">May, June, July</p>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                        <div className="flex items-center gap-2">
                          <CloudRain className="w-4 h-4 text-amber-500" />
                          <span className="text-sm font-medium text-gray-800">Rainfall Deficit</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">30% probability</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-medium text-gray-800">Heat Stress</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">45% probability</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                        <div className="flex items-center gap-2">
                          <CloudLightning className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-gray-800">Extreme Events</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">15% probability</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Insurance Coverage Status */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Coverage Status</CardTitle>
                    <CardDescription>Your current insurance protection</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-green-500" />
                            <span className="font-medium text-gray-800">Wheat Crop</span>
                          </div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Coverage:</span>
                            <span className="font-medium text-gray-800">₹30,000 per acre</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Area Insured:</span>
                            <span className="font-medium text-gray-800">2 acres</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Valid Until:</span>
                            <span className="font-medium text-gray-800">June 30, 2023</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-gray-400" />
                            <span className="font-medium text-gray-800">Other Crops</span>
                          </div>
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Not Insured</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-3">Protect your other crops against weather risks and market fluctuations.</p>
                        <Button className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white">
                          Explore Options
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Insurance Finder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Insurance Finder</CardTitle>
                    <CardDescription>Find the right insurance for your crops</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Crop Type</Label>
                          <Select value={cropType} onValueChange={setCropType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select crop" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="wheat">Wheat</SelectItem>
                              <SelectItem value="rice">Rice</SelectItem>
                              <SelectItem value="cotton">Cotton</SelectItem>
                              <SelectItem value="sugarcane">Sugarcane</SelectItem>
                              <SelectItem value="vegetables">Vegetables</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="landArea">Land Area (Acres)</Label>
                          <div className="flex items-center gap-4">
                            <Input
                              id="landArea"
                              type="number"
                              value={landArea}
                              onChange={(e) => setLandArea(parseFloat(e.target.value))}
                              className="w-full"
                            />
                            <span className="text-sm text-gray-500 whitespace-nowrap">
                              {landArea} acres
                            </span>
                          </div>
                          <Slider
                            value={[landArea]}
                            min={0.5}
                            max={20}
                            step={0.5}
                            onValueChange={(value) => setLandArea(value[0])}
                            className="mt-2"
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Risk Coverage</Label>
                          <Select defaultValue="comprehensive">
                            <SelectTrigger>
                              <SelectValue placeholder="Select coverage" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">Basic (Weather only)</SelectItem>
                              <SelectItem value="standard">Standard (Weather + Pests)</SelectItem>
                              <SelectItem value="comprehensive">Comprehensive (All Risks)</SelectItem>
                              <SelectItem value="premium">Premium (All Risks + Price Protection)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Sowing Season</Label>
                          <Select defaultValue="kharif">
                            <SelectTrigger>
                              <SelectValue placeholder="Select season" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                              <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                              <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                              <SelectItem value="yearround">Year-round</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-base font-medium text-gray-800 mb-4">Recommended Insurance Plans</h3>
                      <div className="space-y-4">
                        {displayInsurance.map((insurance) => (
                          <div
                            key={insurance.id}
                            className="bg-white border border-gray-200 rounded-xl p-4 hover:border-indigo-200 hover:shadow-md transition-all duration-200"
                          >
                            <div className="flex flex-col md:flex-row md:items-center gap-4">
                              <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center p-2">
                                {insurance.logo ? (
                                  <Image
                                    src={insurance.logo}
                                    alt={insurance.provider}
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                  />
                                ) : (
                                  <Shield className="w-8 h-8 text-gray-400" />
                                )}
                              </div>

                              <div className="flex-grow">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="text-lg font-semibold text-gray-800">{insurance.name}</h4>
                                      <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200">
                                        {insurance.match}% Match
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-gray-500">{insurance.provider}</p>
                                  </div>
                                  <div className="flex flex-wrap gap-3">
                                    <div className="text-sm">
                                      <span className="text-gray-500">Premium:</span>
                                      <span className="ml-1 font-medium text-gray-800">{insurance.premium}</span>
                                    </div>
                                    <div className="text-sm">
                                      <span className="text-gray-500">Coverage:</span>
                                      <span className="ml-1 font-medium text-gray-800">{insurance.coverage}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-3">
                                  <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value={`insurance-${insurance.id}`} className="border-none">
                                      <AccordionTrigger className="py-1 text-sm text-indigo-600 hover:text-indigo-800 hover:no-underline">
                                        View Details
                                      </AccordionTrigger>
                                      <AccordionContent>
                                        <div className="pt-2 pb-3 space-y-3">
                                          <div>
                                            <p className="text-sm font-medium text-gray-700">Triggers:</p>
                                            <p className="text-sm text-gray-600">{insurance.triggers}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium text-gray-700">Claim Process:</p>
                                            <p className="text-sm text-gray-600">{insurance.claimProcess}</p>
                                          </div>
                                          <div>
                                            <p className="text-sm font-medium text-gray-700">Features:</p>
                                            <ul className="mt-1 space-y-1">
                                              {insurance.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                                  <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                  <span>{feature}</span>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>

                                          <div className="pt-2">
                                            <p className="text-sm font-medium text-gray-700 mb-2">Total Premium:</p>
                                            <div className="bg-gray-50 p-3 rounded-lg">
                                              <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-600">For {landArea} acres</span>
                                                <span className="text-lg font-semibold text-gray-800">
                                                  ₹{Math.round(parseFloat(insurance.premium.replace(/[^\d.]/g, '')) * landArea).toLocaleString()}
                                                </span>
                                              </div>
                                              <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                                                <Info className="w-4 h-4" />
                                                <span>Eligible for 50% premium subsidy under PMFBY</span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                </div>
                              </div>

                              <div className="flex-shrink-0 flex flex-col gap-2">
                                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                                  Enroll Now
                                </Button>
                                <Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                                  Compare
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}

                        {sortedInsurance.length > 3 && (
                          <div className="flex justify-center mt-4">
                            <Button
                              variant="outline"
                              onClick={() => setShowAllInsurance(!showAllInsurance)}
                              className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                            >
                              {showAllInsurance ? (
                                <>
                                  <ChevronRight className="w-4 h-4 mr-2 rotate-90" />
                                  Show Less
                                </>
                              ) : (
                                <>
                                  <ChevronRight className="w-4 h-4 mr-2 -rotate-90" />
                                  Show All ({sortedInsurance.length}) Plans
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Claim Process Guide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Claim Process Guide</CardTitle>
                    <CardDescription>How to file and track insurance claims</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
                      <div className="space-y-8">
                        <div className="relative pl-10">
                          <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                            <FileText className="h-4 w-4" />
                          </div>
                          <h3 className="text-base font-medium text-gray-800">1. Report Damage</h3>
                          <p className="mt-1 text-sm text-gray-600">
                            Report crop damage within 72 hours of the incident through the app or by calling our helpline.
                          </p>
                          <div className="mt-3">
                            <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                              Report Damage
                            </Button>
                          </div>
                        </div>

                        <div className="relative pl-10">
                          <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                            <Camera className="h-4 w-4" />
                          </div>
                          <h3 className="text-base font-medium text-gray-800">2. Document Evidence</h3>
                          <p className="mt-1 text-sm text-gray-600">
                            Take clear photos of the damaged crops and affected area. Upload them through the app.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <div className="relative h-16 w-16 rounded-md bg-gray-100 flex items-center justify-center">
                              <Plus className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="relative h-16 w-16 rounded-md overflow-hidden">
                              <Image
                                src="/images/crop-damage-1.jpg"
                                alt="Crop damage"
                                width={64}
                                height={64}
                                className="object-cover"
                              />
                            </div>
                            <div className="relative h-16 w-16 rounded-md overflow-hidden">
                              <Image
                                src="/images/crop-damage-2.jpg"
                                alt="Crop damage"
                                width={64}
                                height={64}
                                className="object-cover"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="relative pl-10">
                          <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                            <FileCheck className="h-4 w-4" />
                          </div>
                          <h3 className="text-base font-medium text-gray-800">3. Assessment</h3>
                          <p className="mt-1 text-sm text-gray-600">
                            An insurance surveyor will visit your farm to assess the damage within 7 working days.
                          </p>
                        </div>

                        <div className="relative pl-10">
                          <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                            <DollarSign className="h-4 w-4" />
                          </div>
                          <h3 className="text-base font-medium text-gray-800">4. Claim Settlement</h3>
                          <p className="mt-1 text-sm text-gray-600">
                            Once approved, the claim amount will be directly transferred to your linked bank account.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-indigo-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Need help with a claim?</h4>
                          <p className="mt-1 text-sm text-gray-600">
                            Our support team is available 24/7 to assist you with the claim process.
                          </p>
                          <div className="mt-3">
                            <Button variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                              Contact Support
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Weather Alerts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Weather Alerts & Advisories</CardTitle>
                    <CardDescription>Stay informed about weather conditions affecting your crops</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-800">Heavy Rainfall Alert</h4>
                            <p className="mt-1 text-sm text-gray-600">
                              Heavy rainfall expected in your region over the next 48 hours. Consider postponing any planned spraying activities.
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                                Medium Risk
                              </Badge>
                              <span className="text-xs text-gray-500">Valid until: May 15, 2023</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Thermometer className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-800">Temperature Advisory</h4>
                            <p className="mt-1 text-sm text-gray-600">
                              Temperatures expected to rise above 38°C next week. Ensure adequate irrigation for your crops.
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                                High Risk
                              </Badge>
                              <span className="text-xs text-gray-500">Valid until: May 20, 2023</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Wind className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="text-sm font-medium text-gray-800">Wind Advisory</h4>
                            <p className="mt-1 text-sm text-gray-600">
                              Strong winds forecasted for tomorrow. Secure any loose structures and equipment on your farm.
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                                Low Risk
                              </Badge>
                              <span className="text-xs text-gray-500">Valid until: May 12, 2023</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-base font-medium text-gray-800 mb-3">Weather Forecast</h3>
                      <div className="grid grid-cols-5 gap-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                            <p className="text-sm font-medium text-gray-800">{day}</p>
                            <div className="my-2">
                              {index === 0 && <CloudRain className="h-6 w-6 mx-auto text-blue-500" />}
                              {index === 1 && <CloudRain className="h-6 w-6 mx-auto text-blue-500" />}
                              {index === 2 && <Cloud className="h-6 w-6 mx-auto text-gray-500" />}
                              {index === 3 && <Sun className="h-6 w-6 mx-auto text-yellow-500" />}
                              {index === 4 && <Sun className="h-6 w-6 mx-auto text-yellow-500" />}
                            </div>
                            <p className="text-sm font-medium text-gray-800">
                              {index === 0 && '26°C'}
                              {index === 1 && '25°C'}
                              {index === 2 && '28°C'}
                              {index === 3 && '32°C'}
                              {index === 4 && '34°C'}
                            </p>
                            <p className="text-xs text-gray-500">
                              {index === 0 && '80%'}
                              {index === 1 && '60%'}
                              {index === 2 && '30%'}
                              {index === 3 && '10%'}
                              {index === 4 && '5%'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}