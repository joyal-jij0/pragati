"use client";

import React from "react";
import { motion } from "framer-motion";
import { FPOMember } from "../FPOMembers";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Users, Star, Leaf, Tractor, ChevronRight, Activity, DollarSign, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the activity data interface
interface ActivityItem {
  type: 'meeting' | 'transaction' | 'training' | 'other';
  title: string;
  date: string;
  description: string;
}

interface MemberAnalyticsProps {
  members: FPOMember[];
}

const MemberAnalytics = ({ members }: MemberAnalyticsProps) => {
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

  // Calculate analytics data
  const activeMembers = members.filter(m => m.active).length;
  const inactiveMembers = members.length - activeMembers;
  
  // Role distribution
  const roleDistribution = members.reduce((acc, member) => {
    acc[member.role] = (acc[member.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const roleData = Object.entries(roleDistribution).map(([role, count]) => ({
    name: role,
    value: count
  }));

  // Crop distribution
  const cropDistribution = members.reduce((acc, member) => {
    member.crops.forEach(crop => {
      acc[crop] = (acc[crop] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);
  
  const cropData = Object.entries(cropDistribution)
    .map(([crop, count]) => ({
      name: crop,
      count
    }))
    .sort((a, b) => b.count - a.count);

  // Land holding distribution
  const landData = [
    { name: '0-2 Acres', count: members.filter(m => parseFloat(m.landHolding) < 2).length },
    { name: '2-5 Acres', count: members.filter(m => parseFloat(m.landHolding) >= 2 && parseFloat(m.landHolding) < 5).length },
    { name: '5+ Acres', count: members.filter(m => parseFloat(m.landHolding) >= 5).length }
  ];

  // Member activity (contributions)
  const contributionData = [
    { name: '0-5', count: members.filter(m => m.contributions >= 0 && m.contributions <= 5).length },
    { name: '6-15', count: members.filter(m => m.contributions > 5 && m.contributions <= 15).length },
    { name: '16+', count: members.filter(m => m.contributions > 15).length }
  ];

  // Sample activity data
  const activityData: ActivityItem[] = [
    {
      type: 'meeting',
      title: 'Monthly FPO Meeting',
      date: '2 days ago',
      description: 'Discussion on new crop procurement strategy'
    },
    {
      type: 'transaction',
      title: 'Bulk Purchase',
      date: '1 week ago',
      description: 'Group purchase of fertilizers at discounted rates'
    },
    {
      type: 'training',
      title: 'Organic Farming Workshop',
      date: '2 weeks ago',
      description: 'Training on sustainable farming practices'
    }
  ];

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Summary Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Members</p>
              <h3 className="text-xl font-bold text-gray-800">{members.length}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Members</p>
              <h3 className="text-xl font-bold text-gray-800">{activeMembers}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Star className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Rating</p>
              <h3 className="text-xl font-bold text-gray-800">
                {(members.reduce((sum, m) => sum + m.rating, 0) / members.length).toFixed(1)}
              </h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Leaf className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Land</p>
              <h3 className="text-xl font-bold text-gray-800">
                {members.reduce((sum, m) => sum + parseFloat(m.landHolding), 0).toFixed(1)} Acres
              </h3>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Member Status */}
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Member Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Active', value: activeMembers },
                    { name: 'Inactive', value: inactiveMembers }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#4ade80" />
                  <Cell fill="#d1d5db" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Role Distribution */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">Member Role</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Member Activity Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">Member Activity</h3>
          
          <div className="space-y-6">
            {/* Activity Timeline */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-600">Recent Activities</h4>
              
              <div className="space-y-3">
                {activityData.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      activity.type === 'meeting' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'transaction' ? 'bg-green-100 text-green-600' :
                      activity.type === 'training' ? 'bg-amber-100 text-amber-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {activity.type === 'meeting' && <Users size={16} />}
                      {activity.type === 'transaction' && <DollarSign size={16} />}
                      {activity.type === 'training' && <GraduationCap size={16} />}
                      {activity.type === 'other' && <Activity size={16} />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                        <span className="text-xs text-gray-500">{activity.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* View More Button */}
            <div className="flex justify-center">
              <Button variant="outline" size="sm" className="text-sm">
                View All Activities
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MemberAnalytics;