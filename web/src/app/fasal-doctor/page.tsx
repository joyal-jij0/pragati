"use client";

import React, { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Leaf, ChevronRight, Camera,CheckCircle2,Info, Microscope, FileText, AlertTriangle, Sprout } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// Import Fasal Doctor components
import DiseaseIdentification from "@/components/fasalDoctor/DiseaseIdentification";
import TreatmentRecommendations from "@/components/fasalDoctor/TreatmentRecommendations";
import PestLibrary from "@/components/fasalDoctor/PestLibrary";
import DiseaseLibrary from "@/components/fasalDoctor/DiseaseLibrary";
import DiagnosisHistory from "@/components/fasalDoctor/DiagnosisHistory";
import PreventiveMeasures from "@/components/fasalDoctor/PreventiveMeasures";
import CommunityInsights from "@/components/fasalDoctor/CommunityInsights";

// Import data
import { fasalDoctorData } from "@/data/fasalDoctorData";

const FasalDoctorPage = () => {
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

  const { mainPage } = fasalDoctorData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      <DashboardHeader
        title={mainPage.title}
        subtitle={mainPage.subtitle}
        icon={<Leaf className="h-6 w-6 text-green-600" />}
      />

      <div className="container mx-auto px-4 py-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
        {/* Hero Section */}
        <motion.div 
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-green-500 text-white mb-10"
          variants={itemVariants}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/20"></div>
            <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-white/20"></div>
            <div className="grid grid-cols-10 grid-rows-10 gap-1 h-full w-full">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="bg-white/5 rounded-sm"></div>
              ))}
            </div>
          </div>
          
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Fasal Doctor <span className="text-green-200">AI</span>
              </h1>
              <p className="text-xl text-green-100 mb-6 max-w-2xl">
                Your intelligent assistant for crop health monitoring, disease identification, and treatment recommendations
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className="bg-white/20 border-none text-white px-3 py-1 text-sm">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  <span>95% Accuracy</span>
                </Badge>
                <Badge className="bg-white/20 border-none text-white px-3 py-1 text-sm">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  <span>100+ Diseases</span>
                </Badge>
                <Badge className="bg-white/20 border-none text-white px-3 py-1 text-sm">
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  <span>50+ Crops</span>
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-green-700 hover:bg-green-100">
                  <Camera className="h-5 w-5 mr-2" />
                  <span>Scan Crop Now</span>
                </Button>
                <Button size="lg" variant="outline" className="bg-white text-green-700 hover:bg-green-100">
                  <Info className="h-5 w-5 mr-2" />
                  <span>How It Works</span>
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-4 bg-white rounded-full opacity-30"></div>
                <div className="absolute inset-8 bg-white rounded-full opacity-40"></div>
                <div className="relative h-48 w-48 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, 0, -5, 0],
                      y: [0, -5, 0, 5, 0]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="text-7xl"
                  >
                    🌱
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

          {/* Main Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="diagnosis" className="w-full">
              <TabsList className="grid grid-cols-7 mb-6 bg-white/50 p-1 rounded-lg">
                {mainPage.tabs.map((tab) => (
                  <TabsTrigger 
                    key={tab.value} 
                    value={tab.value} 
                    className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="diagnosis" className="mt-0">
                <DiseaseIdentification />
              </TabsContent>

              <TabsContent value="treatment" className="mt-0">
                <TreatmentRecommendations />
              </TabsContent>

              <TabsContent value="pests" className="mt-0">
                <PestLibrary />
              </TabsContent>

              <TabsContent value="diseases" className="mt-0">
                <DiseaseLibrary />
              </TabsContent>

              <TabsContent value="history" className="mt-0">
                <DiagnosisHistory />
              </TabsContent>

              <TabsContent value="prevention" className="mt-0">
                <PreventiveMeasures />
              </TabsContent>

              <TabsContent value="community" className="mt-0">
                <CommunityInsights />
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Success Stories */}
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-medium text-gray-800">{mainPage.successStories.title}</h3>
              <motion.button 
                className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span>{mainPage.successStories.viewAllText}</span>
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {mainPage.successStories.stories.map((story, index) => (
                <motion.div 
                  key={index}
                  className={`bg-gradient-to-r ${story.gradient} rounded-lg p-4 border ${story.border} hover:shadow-md transition-shadow`}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-3">
                      <span className={`inline-block px-2.5 py-0.5 ${story.tagBg} ${story.tagText} rounded-full text-xs font-medium`}>
                        {story.tag}
                      </span>
                    </div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      {story.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">
                      {story.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xs text-gray-500">{story.date}</span>
                      <motion.button 
                        className={`text-xs ${story.buttonText} font-medium`}
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {story.readMoreText}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Help Section */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-700">
                  <span className="text-2xl">🌱</span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Need Expert Assistance?</h3>
                  <p className="text-sm text-gray-600">Connect with agricultural experts for personalized guidance</p>
                </div>
              </div>
              <motion.button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Connect with Expert</span>
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default FasalDoctorPage;