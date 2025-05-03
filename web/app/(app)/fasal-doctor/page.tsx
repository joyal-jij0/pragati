'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import {
  Leaf,
  ChevronRight,
  Camera,
  CheckCircle2,
  Info,
  Microscope,
  FileText,
  AlertTriangle,
  Sprout,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
// Import Fasal Doctor components
import DiseaseIdentification from '@/components/fasalDoctor/DiseaseIdentification'
import TreatmentRecommendations from '@/components/fasalDoctor/TreatmentRecommendations'
import PestLibrary from '@/components/fasalDoctor/PestLibrary'
import DiseaseLibrary from '@/components/fasalDoctor/DiseaseLibrary'
import DiagnosisHistory from '@/components/fasalDoctor/DiagnosisHistory'
import PreventiveMeasures from '@/components/fasalDoctor/PreventiveMeasures'
import CommunityInsights from '@/components/fasalDoctor/CommunityInsights'

// Import data
import { fasalDoctorData } from '@/data/fasalDoctorData'
import HeroSection from '@/components/HeroSection'

const FasalDoctorPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  }

  const { mainPage } = fasalDoctorData

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      <div className="container mx-auto px-4 py-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <HeroSection
            title="Fasal Doctor"
            secondaryTitle="AI"
            info="Your intelligent assistant for crop health monitoring, disease identification, and treatment recommendations"
            badges={['95% Accuracy', '100+ Diseases', '50+ Crops']}
          />
          {/* Main Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="diagnosis" className="w-full">
              <TabsList className="grid grid-cols-5 w-full mb-6 bg-white/50 p-1 rounded-lg">
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

              {/* <TabsContent value="treatment" className="mt-0">
                <TreatmentRecommendations />
              </TabsContent> */}

              <TabsContent value="pests" className="mt-0">
                <PestLibrary />
              </TabsContent>

              <TabsContent value="diseases" className="mt-0">
                <DiseaseLibrary />
              </TabsContent>

              {/* <TabsContent value="history" className="mt-0">
                <DiagnosisHistory />
              </TabsContent> */}

              <TabsContent value="prevention" className="mt-0">
                <PreventiveMeasures />
              </TabsContent>

              <TabsContent value="community" className="mt-0">
                <CommunityInsights />
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Success Stories */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-medium text-gray-800">
                {mainPage.successStories.title}
              </h3>
              <motion.button
                className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
                whileHover={{ x: 3 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
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
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 ${story.tagBg} ${story.tagText} rounded-full text-xs font-medium`}
                      >
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
                      <span className="text-xs text-gray-500">
                        {story.date}
                      </span>
                      <motion.button
                        className={`text-xs ${story.buttonText} font-medium`}
                        whileHover={{ x: 3 }}
                        transition={{ type: 'spring', stiffness: 400 }}
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
                  <h3 className="text-lg font-medium text-gray-800">
                    Need Expert Assistance?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Connect with agricultural experts for personalized guidance
                  </p>
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
  )
}

export default FasalDoctorPage
