import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  DollarSign, 
  Tractor, 
  Award, 
  TrendingUp, 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight,
  Zap,
  Star
} from "lucide-react";

interface FPODashboardProps {
  selectedFPO: string;
}

const FPODashboard = ({ selectedFPO }: FPODashboardProps) => {
  // Animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-green-600">📊</span> FPO Performance Overview
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Users size={16} />
              </div>
              <span className="text-sm font-medium text-gray-600">Members</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">248</p>
            <p className="text-xs text-green-600 flex items-center mt-1">
              <TrendingUp size={12} className="mr-1" /> +12 this month
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <DollarSign size={16} />
              </div>
              <span className="text-sm font-medium text-gray-600">Revenue</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">₹24.8L</p>
            <p className="text-xs text-blue-600 flex items-center mt-1">
              <TrendingUp size={12} className="mr-1" /> +8% YoY
            </p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                <Tractor size={16} />
              </div>
              <span className="text-sm font-medium text-gray-600">Equipment</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">32</p>
            <p className="text-xs text-amber-600 flex items-center mt-1">
              <TrendingUp size={12} className="mr-1" /> 85% utilization
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <Award size={16} />
              </div>
              <span className="text-sm font-medium text-gray-600">Rating</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">4.8/5</p>
            <p className="text-xs text-purple-600 flex items-center mt-1">
              <Star size={12} className="mr-1" /> Top 10% in region
            </p>
          </div>
        </div>
      </motion.div>

      {/* Upcoming Activities */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-blue-600">📅</span> Upcoming Activities
          </h2>
          <button className="text-sm text-green-600 font-medium flex items-center gap-1">
            View Calendar <ChevronRight size={16} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex gap-4 p-4 bg-blue-50 rounded-lg">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <Calendar size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Annual General Meeting</h3>
              <p className="text-sm text-gray-600">Discussion of yearly performance and future plans</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar size={12} /> June 15, 2023
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={12} /> 10:00 AM
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin size={12} /> Community Hall
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-green-50 rounded-lg">
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
              <Zap size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Bulk Purchase: Fertilizers</h3>
              <p className="text-sm text-gray-600">Group purchase of DAP and Urea at discounted rates</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar size={12} /> June 20, 2023
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={12} /> Last date to register
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Member Activity */}
      <motion.div 
        variants={itemVariants}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-purple-600">👥</span> Recent Member Activity
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0">
                <img 
                  src={`https://randomuser.me/api/portraits/men/${item + 20}.jpg`} 
                  alt="Member" 
                  className="h-10 w-10 rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm text-gray-800">
                  <span className="font-medium">Rajesh Kumar</span> {item === 1 ? 'joined the equipment sharing program' : item === 2 ? 'registered for bulk seed purchase' : 'updated their crop planning details'}
                </p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FPODashboard;