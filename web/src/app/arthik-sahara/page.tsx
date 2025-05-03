"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Search, 
  Book, 
  FileText, 
  Map, 
  Calendar,
  Compass,
  Briefcase,
  Droplet,
  Sun,
  FileCheck,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Clock,
  Users
} from "lucide-react";


import DashboardHeader from "@/components/arthikSahara/DashboardHeader";
import KrishiGyanHub from "@/components/arthikSahara/KrishiGyanHub";
import SaralDocuments from "@/components/arthikSahara/SaralDocuments";
import NearbyServices from "@/components/arthikSahara/NearbyServices";
import MarketPriceTracker from "@/components/arthikSahara/MarketPriceTracker";
import FinancialTools from "@/components/arthikSahara/FinancialTools";

export default function ArthikSaharaPage() {
  const [location, setLocation] = useState("Sonipat, Haryana");
  const [activeTab, setActiveTab] = useState("gyan-hub");
  const [showWeatherAlert, setShowWeatherAlert] = useState(true);
  const [showMarketAlert, setShowMarketAlert] = useState(true);

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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Dashboard Header */}
      <DashboardHeader />
      
      {/* Remove PageHeader and add padding-top to account for fixed header */}
      <div className="container mx-auto px-4 pt-20">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Quick Access */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1 space-y-6"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                      <FileCheck className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Document Checker</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                      <Map className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Nearby Services</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center mr-3">
                      <TrendingUp className="h-4 w-4 text-amber-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Market Prices</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </button>
                
                
                <button className="w-full flex items-center justify-between p-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center mr-3">
                      <Users className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Expert Connect</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </motion.div>
            
            {/* Alerts Section */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Important Alerts</h3>
              
              {showWeatherAlert && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xl">⛈️</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800">Heavy Rain Expected</h4>
                      <p className="text-xs text-gray-600 mt-1">Heavy rainfall predicted in your area for the next 3 days. Consider delaying any fertilizer application.</p>
                      <div className="flex justify-end mt-2">
                        <button 
                          onClick={() => setShowWeatherAlert(false)}
                          className="text-xs text-amber-700 font-medium"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {showMarketAlert && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xl">📈</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800">Price Alert: Wheat</h4>
                      <p className="text-xs text-gray-600 mt-1">Wheat prices have increased by 8% in the last week at Sonipat Mandi. Consider selling now.</p>
                      <div className="flex justify-end mt-2">
                        <button 
                          onClick={() => setShowMarketAlert(false)}
                          className="text-xs text-green-700 font-medium"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
          
          {/* Main Content Area */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3 bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto hide-scrollbar">
                <button
                  onClick={() => setActiveTab("gyan-hub")}
                  className={`px-4 py-3 flex items-center gap-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === "gyan-hub"
                      ? "border-green-600 text-green-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-100 text-green-600">
                    <Book className="h-4 w-4" />
                  </div>
                  <span>Krishi Gyan Hub</span>
                </button>
                
                <button
                  onClick={() => setActiveTab("saral-docs")}
                  className={`px-4 py-3 flex items-center gap-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === "saral-docs"
                      ? "border-green-600 text-green-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
                    <FileText className="h-4 w-4" />
                  </div>
                  <span>Saral Documents</span>
                </button>
                
                <button
                  onClick={() => setActiveTab("nearby-services")}
                  className={`px-4 py-3 flex items-center gap-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === "nearby-services"
                      ? "border-green-600 text-green-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-100 text-amber-600">
                    <Compass className="h-4 w-4" />
                  </div>
                  <span>Nearby Services</span>
                </button>

                
                <button
                  onClick={() => setActiveTab("market-prices")}
                  className={`px-4 py-3 flex items-center gap-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === "market-prices"
                      ? "border-green-600 text-green-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-100 text-red-600">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <span>Market Price Tracker</span>
                </button>
                
                <button
                  onClick={() => setActiveTab("financial-tools")}
                  className={`px-4 py-3 flex items-center gap-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === "financial-tools"
                      ? "border-green-600 text-green-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-100 text-indigo-600">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <span>Financial Tools</span>
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "gyan-hub" && <KrishiGyanHub />}
              {activeTab === "saral-docs" && <SaralDocuments />}
              {activeTab === "nearby-services" && <NearbyServices location={location} />}
              {activeTab === "market-prices" && <MarketPriceTracker location={location} />}
              {activeTab === "financial-tools" && <FinancialTools />}

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}