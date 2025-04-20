"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, Bell, Menu } from "lucide-react";

// Import components
import WeatherOverview from "@/components/gyanDhara/WeatherOverview";
import WeatherForecast from "@/components/gyanDhara/WeatherForecast";
import CropAdvisory from "@/components/gyanDhara/CropAdvisory";
import RainfallAnalysis from "@/components/gyanDhara/RainfallAnalysis";
import WeatherAlerts from "@/components/gyanDhara/WeatherAlerts";
import SoilMoisture from "@/components/gyanDhara/SoilMoisture";
import FasalDoctorPreview from "@/components/gyanDhara/FasalDoctorPreview";

export default function GyanDharaPage() {
  const [location, setLocation] = useState("सोनीपत, हरियाणा");
  const [activeTab, setActiveTab] = useState("overview");

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white mt-10 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Menu className="h-6 w-6 md:hidden" />
              <h1 className="text-xl font-bold">ज्ञान धारा</h1>
              <span className="hidden md:inline text-sm opacity-75">| मौसम और फसल सलाह</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-white/20 rounded-full px-3 py-1.5 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{location}</span>
              </div>
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30">
                <Search className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-amber-400 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button 
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${activeTab === 'overview' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('overview')}
            >
              मौसम अवलोकन
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${activeTab === 'forecast' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('forecast')}
            >
              पूर्वानुमान
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${activeTab === 'advisory' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('advisory')}
            >
              फसल सलाह
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${activeTab === 'rainfall' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('rainfall')}
            >
              वर्षा विश्लेषण
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${activeTab === 'soil' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('soil')}
            >
              मिट्टी की नमी
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${activeTab === 'alerts' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('alerts')}
            >
              अलर्ट
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Main Content Area - Changes based on active tab */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 space-y-6"
          >
            {activeTab === 'overview' && <WeatherOverview />}
            {activeTab === 'forecast' && <WeatherForecast />}
            {activeTab === 'advisory' && <CropAdvisory />}
            {activeTab === 'rainfall' && <RainfallAnalysis />}
            {activeTab === 'soil' && <SoilMoisture />}
            {activeTab === 'alerts' && <WeatherAlerts />}
          </motion.div>

          {/* Right Sidebar - Always visible */}
          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            {/* Weather Alerts Section */}
            <WeatherAlerts compact={true} />
            
            {/* Fasal Doctor Preview */}
            <FasalDoctorPreview />
            
            {/* Crop Advisory Preview - Only show on non-advisory tabs */}
            {activeTab !== 'advisory' && (
              <CropAdvisory compact={true} />
            )}
            
            {/* Soil Moisture Preview - Only show on non-soil tabs */}
            {activeTab !== 'soil' && (
              <SoilMoisture compact={true} />
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}