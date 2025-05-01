"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  BarChart2, 
  PieChart,
  Leaf,
  Award,
  Shield,
  Zap,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Star,
  Info
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const CreditDashboard = () => {
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
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  const floatVariants = {
    hover: {
      y: -5,
      transition: {
        yoyo: Infinity,
        duration: 0.6
      }
    }
  };
  
  // Sample credit improvement tips
  const creditTips = [
    "Regular crop sales recording boosts your score",
    "Participate in FPO meetings for community points",
    "Adopt agricultural best practices for higher ratings"
  ];
  
  const [currentTip, setCurrentTip] = useState(0);
  
  // Function to get severity color
  const getSeverityColor = (percentage: number) => {
    if (percentage >= 70) return "text-green-600";
    if (percentage >= 45) return "text-amber-500";
    return "text-red-500";
  };
  
  // Function to get progress bar color
  const getProgressColor = (percentage: number) => {
    if (percentage >= 70) return "bg-green-600";
    if (percentage >= 45) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Page Title with Animated Tip */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <h2 className="text-2xl font-bold text-gray-800">Alternative Credit Score</h2>
        
        <motion.div 
          className="bg-blue-50 border border-blue-100 rounded-lg p-2 text-sm text-blue-700 flex items-center gap-2 shadow-sm"
          animate={{ 
            scale: [1, 1.02, 1],
            borderColor: ['#dbeafe', '#93c5fd', '#dbeafe']
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Info className="h-4 w-4 text-blue-500" />
          <AnimatePresence mode="wait">
            <motion.span
              key={currentTip}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {creditTips[currentTip]}
            </motion.span>
          </AnimatePresence>
          <button 
            onClick={() => setCurrentTip((prev) => (prev + 1) % creditTips.length)}
            className="ml-2 text-blue-600 hover:text-blue-800"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>

      {/* Credit Score Card */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden border border-green-100 hover:shadow-lg transition-shadow duration-300"
      >
        <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 py-5">
          <div className="flex justify-between items-center">
            <CardTitle className="text-white font-medium flex items-center gap-3 text-xl">
              <motion.div 
                className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.05, 1, 1.05, 1] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-2xl">🏆</span>
              </motion.div>
              <span>Your Credit Score</span>
            </CardTitle>
            <motion.button 
              className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Details</span>
              <ArrowRight className="h-3 w-3" />
            </motion.button>
          </div>
          <CardDescription className="text-green-100 mt-1">
            Based on your farming activities and financial behavior
          </CardDescription>
        </div>
        
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-baseline">
                <motion.div 
                  className="text-6xl font-bold text-gray-800"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                >
                  68
                </motion.div>
                <span className="text-lg text-gray-500">/100</span>
                <motion.div 
                  className="ml-3 bg-green-100 p-1 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Sparkles className="h-4 w-4 text-green-600" />
                </motion.div>
              </div>
              <div className="mt-2 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+12 in the last 3 months</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Good score! You qualify for most loans.</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Poor</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "68%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
            </div>
            
            <div className="w-40 h-40 relative">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#e5e7eb" 
                  strokeWidth="10"
                />
                <motion.circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#16a34a" 
                  strokeWidth="10"
                  strokeDasharray="251.2"
                  strokeDashoffset="80"
                  transform="rotate(-90 50 50)"
                  initial={{ strokeDashoffset: "251.2" }}
                  animate={{ strokeDashoffset: "80" }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                />
                <text 
                  x="50" 
                  y="50" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  fill="#16a34a"
                  fontSize="16"
                  fontWeight="bold"
                >
                  68%
                </text>
              </svg>
              
              <motion.div 
                className="absolute -top-2 -right-2 bg-green-100 p-1.5 rounded-full shadow-sm"
                animate={{ 
                  y: [0, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Star className="h-5 w-5 text-green-600 fill-green-500" />
              </motion.div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100 hover:border-green-200 transition-colors"
              whileHover={{ y: -5, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <div className="text-sm text-gray-500 flex items-center justify-center gap-1 mb-1">
                <Award className="h-4 w-4 text-green-500" />
                <span>Loan Eligibility</span>
              </div>
              <div className="mt-1 text-lg font-semibold text-gray-800">₹1,25,000</div>
            </motion.div>
            <motion.div 
              className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100 hover:border-green-200 transition-colors"
              whileHover={{ y: -5, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <div className="text-sm text-gray-500 flex items-center justify-center gap-1 mb-1">
                <Zap className="h-4 w-4 text-amber-500" />
                <span>Interest Rate</span>
              </div>
              <div className="mt-1 text-lg font-semibold text-gray-800">9.5%</div>
            </motion.div>
            <motion.div 
              className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100 hover:border-green-200 transition-colors"
              whileHover={{ y: -5, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <div className="text-sm text-gray-500 flex items-center justify-center gap-1 mb-1">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>Duration</span>
              </div>
              <div className="mt-1 text-lg font-semibold text-gray-800">12 months</div>
            </motion.div>
          </div>
        </CardContent>
      </motion.div>

      {/* Credit Factors */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100 hover:shadow-lg transition-shadow duration-300"
      >
        <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/30 py-4 border-b border-blue-100">
          <CardTitle className="font-medium text-gray-800 flex items-center gap-2">
            <motion.div 
              className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"
              whileHover="hover"
              variants={floatVariants}
            >
              <Shield className="h-5 w-5 text-blue-600" />
            </motion.div>
            <span>Factors Affecting Your Score</span>
          </CardTitle>
          <CardDescription className="text-gray-500 mt-1">
            Improve these factors to increase your credit score
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 space-y-5">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-1/3 flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-medium ml-2">Crop Production</span>
            </div>
            <div className="w-2/3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Excellent</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2 bg-gray-200">
                <motion.div 
                  className="h-full bg-green-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 1, delay: 0.1 }}
                />
              </Progress>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-1/3 flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-medium ml-2">Market Sales</span>
            </div>
            <div className="w-2/3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Good</span>
                <span>70%</span>
              </div>
              <Progress value={70} className="h-2 bg-gray-200">
                <motion.div 
                  className="h-full bg-green-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </Progress>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="w-1/3 flex items-center">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-amber-500" />
              </div>
              <span className="text-sm font-medium ml-2">Advice Adoption</span>
            </div>
            <div className="w-2/3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Average</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2 bg-gray-200">
                <motion.div 
                  className="h-full bg-amber-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "45%" }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </Progress>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-1/3 flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-gray-500" />
              </div>
              <span className="text-sm font-medium ml-2">App Usage</span>
            </div>
            <div className="w-2/3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Average</span>
                <span>60%</span>
              </div>
              <Progress value={60} className="h-2 bg-gray-200">
                <motion.div 
                  className="h-full bg-gray-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </Progress>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-1/3 flex items-center">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-red-500" />
              </div>
              <span className="text-sm font-medium ml-2">FPO Participation</span>
            </div>
            <div className="w-2/3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Low</span>
                <span>30%</span>
              </div>
              <Progress value={30} className="h-2 bg-gray-200">
                <motion.div 
                  className="h-full bg-red-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "30%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </Progress>
            </div>
          </motion.div>
        </CardContent>
        
        <CardFooter className="bg-blue-50/50 px-6 py-3 border-t border-blue-100">
          <motion.button 
            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 ml-auto"
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View Detailed Analysis</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </CardFooter>
      </motion.div>

      {/* Recent Activity */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden border border-amber-100 hover:shadow-lg transition-shadow duration-300"
      >
        <CardHeader className="bg-gradient-to-r from-amber-50 to-amber-100/30 py-4 border-b border-amber-100">
          <CardTitle className="font-medium text-gray-800 flex items-center gap-2">
            <motion.div 
              className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center"
              whileHover="hover"
              variants={floatVariants}
            >
              <Zap className="h-5 w-5 text-amber-500" />
            </motion.div>
            <span>Recent Activities</span>
          </CardTitle>
          <CardDescription className="text-gray-500 mt-1">
            Activities that have impacted your credit score
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="space-y-5">
            <motion.div 
              className="flex items-start gap-3 pb-4 border-b border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ x: 5 }}
            >
              <motion.div 
                className="bg-green-100 p-3 rounded-full"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="text-xl">🌾</span>
              </motion.div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-800">Wheat Crop Sale Record</p>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    +5 Points
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">May 15, 2023 - ₹45,000</p>
                <div className="mt-2 text-xs text-gray-600">
                  Timely recording of crop sales improves your financial tracking score
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-3 pb-4 border-b border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ x: 5 }}
            >
              <motion.div 
                className="bg-blue-100 p-3 rounded-full"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <span className="text-xl">🧪</span>
              </motion.div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-800">Soil Test Advice Adopted</p>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    +3 Points
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">April 2, 2023</p>
                <div className="mt-2 text-xs text-gray-600">
                  Following agricultural best practices demonstrates responsible farming
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ x: 5 }}
            >
              <motion.div 
                className="bg-amber-100 p-3 rounded-full"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <span className="text-xl">👨‍👩‍👧‍👦</span>
              </motion.div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-800">Participated in FPO Meeting</p>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    +2 Points
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">March 28, 2023</p>
                <div className="mt-2 text-xs text-gray-600">
                  Community participation shows commitment to agricultural development
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.button 
            className="w-full mt-6 text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center justify-center gap-1 py-2 rounded-md hover:bg-amber-50 transition-colors border border-amber-100"
            whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(245, 158, 11, 0.15)" }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View All Activities</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </CardContent>
      </motion.div>
    </motion.div>
  );
};

export default CreditDashboard;