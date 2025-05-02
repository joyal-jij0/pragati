'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Search, Bell, Menu } from 'lucide-react'

// Import components
import WeatherOverview from '@/components/gyanDhara/WeatherOverview'
import WeatherForecast from '@/components/gyanDhara/WeatherForecast'
import CropAdvisory from '@/components/gyanDhara/CropAdvisory'
import RainfallAnalysis from '@/components/gyanDhara/RainfallAnalysis'
import WeatherAlerts from '@/components/gyanDhara/WeatherAlerts'
import SoilMoisture from '@/components/gyanDhara/SoilMoisture'
import FasalDoctorPreview from '@/components/gyanDhara/FasalDoctorPreview'
import HeroSection from '@/components/HeroSection'

export default function GyanDharaPage() {
  const [location, setLocation] = useState('Sonipat, Haryana')
  const [activeTab, setActiveTab] = useState('overview')

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="pb-4 px-4">
        <HeroSection
          title="Gyan"
          secondaryTitle="Dhara"
          info="Stay ahead with accurate weather forecasts, expert crop advice, and tailored farming solutions to maximize your yield and efficiency."
          badges={[
            'Real-Time Updates',
            'Region-Specific Advice',
            'Trusted by Farmers',
          ]}
          floatingIcon="🌧️"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === 'overview'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Weather Overview
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === 'forecast'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('forecast')}
            >
              Forecast
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === 'advisory'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('advisory')}
            >
              Crop Advisory
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === 'rainfall'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('rainfall')}
            >
              Rainfall Analysis
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === 'soil'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('soil')}
            >
              Soil Moisture
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === 'alerts'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('alerts')}
            >
              Alerts
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
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Weather Alerts Section */}
            <WeatherAlerts compact={true} />

            {/* Fasal Doctor Preview */}
            <FasalDoctorPreview />

            {/* Crop Advisory Preview - Only show on non-advisory tabs */}
            {activeTab !== 'advisory' && <CropAdvisory compact={true} />}

            {/* Soil Moisture Preview - Only show on non-soil tabs */}
            {activeTab !== 'soil' && <SoilMoisture compact={true} />}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
