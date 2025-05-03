'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

import WeatherWidget from '@/components/dashboard/WeatherWidget'
import CropHealthCard from '@/components/dashboard/CropHealthCard'
import MarketPriceCard from '@/components/dashboard/MarketPriceCard'
import AdvisoryCard from '@/components/dashboard/AdvisoryCard'
import ActivityFeed from '@/components/dashboard/ActivityFeed'
import RecommendationCard from '@/components/dashboard/RecommendationCard'
import FinancialSummary from '@/components/dashboard/FinancialSummary'
import FarmStatistics from '@/components/dashboard/FarmStatistics'
import QuickActions from '@/components/dashboard/QuickActions'
import FarmerCommunity from '@/components/dashboard/FarmerCommunity'
import WelcomeBanner from '@/components/dashboard/WelcomeBanner'

// Mock data
import {
  weatherData,
  cropHealthData,
  marketPriceData,
  advisoryData,
  activityData,
  recommendationData,
  financialData,
  farmStatData,
  communityData,
} from '@/data/dashboardData'
import { createClient } from '@/utils/supabase/client'

export default function Dashboard() {
  const [greeting, setGreeting] = useState('Good morning')
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()
  const [farmerName, setfarmerName] = useState('Farmer')

  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      session.data.session?.user.user_metadata.full_name &&
        setfarmerName(session.data.session?.user.user_metadata.full_name)
      // do something here with the session like  ex: setState(session)
    })
  }, [])

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour >= 12 && hour < 17) {
      setGreeting('Good afternoon')
    } else if (hour >= 17) {
      setGreeting('Good evening')
    }

    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-green-200 border-t-green-500 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
          </div>
          <p className="mt-4 text-green-800 font-medium">
            Loading your farm data...
          </p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="p-4 pt-0 space-y-6 bg-gradient-to-b from-green-50 to-white min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Welcome Banner */}
      <motion.div variants={itemVariants}>
        <WelcomeBanner greeting={greeting} farmerName={farmerName} />
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <QuickActions />
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Weather Widget - Spans 2 columns on medium screens */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <WeatherWidget weatherData={weatherData} />
        </motion.div>

        {/* Crop Health Card */}
        <motion.div variants={itemVariants}>
          <CropHealthCard cropHealthData={cropHealthData} />
        </motion.div>

        {/* Advisory Card */}
        <motion.div variants={itemVariants}>
          <AdvisoryCard advisories={advisoryData} />
        </motion.div>

        {/* Market Price Card - Spans 2 columns */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <MarketPriceCard marketData={marketPriceData} />
        </motion.div>

        {/* Farm Statistics - Spans 2 columns */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <FarmStatistics farmStatData={farmStatData} />
        </motion.div>

        {/* Financial Summary */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 lg:col-span-2"
        >
          <FinancialSummary financialData={financialData} />
        </motion.div>

        {/* Recommendations */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 lg:col-span-2"
        >
          <RecommendationCard recommendations={recommendationData} />
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-2 lg:col-span-2"
        >
          <ActivityFeed activities={activityData} />
        </motion.div>

        {/* Farmer Community */}
        <motion.div
          variants={itemVariants}
          className="md:col-span-3 lg:col-span-2"
        >
          <FarmerCommunity communityData={communityData} />
        </motion.div>
      </div>

      {/* Enhanced Footer */}
      <motion.footer
        variants={itemVariants}
        className="mt-12 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 shadow-sm overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 p-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <motion.span
                  className="text-xl"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🌾
                </motion.span>
              </div>
              <h3 className="text-lg font-semibold text-green-800">
                Krishi Sahayak AI
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Empowering Indian farmers with AI-driven insights, market
              intelligence, and sustainable farming practices.
            </p>
            <div className="flex space-x-3 pt-2">
              <motion.a
                href="#"
                className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700"
                whileHover={{ y: -3, backgroundColor: '#dcfce7' }}
              >
                <span>📱</span>
              </motion.a>
              <motion.a
                href="#"
                className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700"
                whileHover={{ y: -3, backgroundColor: '#dcfce7' }}
              >
                <span>📧</span>
              </motion.a>
              <motion.a
                href="#"
                className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700"
                whileHover={{ y: -3, backgroundColor: '#dcfce7' }}
              >
                <span>📞</span>
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-green-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                'Dashboard',
                'Market Prices',
                'Weather Forecast',
                'Crop Calendar',
                'Government Schemes',
              ].map((item) => (
                <motion.li key={item} whileHover={{ x: 3 }}>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-green-700 flex items-center gap-1"
                  >
                    <span>→</span> {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-green-800 mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                'Farming Techniques',
                'Pest Management',
                'Soil Health',
                'Water Conservation',
                'Success Stories',
              ].map((item) => (
                <motion.li key={item} whileHover={{ x: 3 }}>
                  <Link
                    href="#"
                    className="text-sm text-gray-600 hover:text-green-700 flex items-center gap-1"
                  >
                    <span>→</span> {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-green-800 mb-4">Stay Updated</h4>
            <p className="text-sm text-gray-600 mb-3">
              Subscribe to our newsletter for farming tips and market updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="text-sm px-3 py-2 border border-green-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-green-500 w-full"
              />
              <motion.button
                className="bg-green-600 text-white px-3 py-2 rounded-r-md text-sm font-medium"
                whileHover={{ backgroundColor: '#16a34a' }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        <div className="border-t border-green-100 p-6 bg-white/50">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © 2025 Krishi Sahayak AI - Empowering Indian Farmers
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/help"
                className="text-sm text-green-600 hover:text-green-700 transition-colors"
              >
                Help
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-green-600 hover:text-green-700 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-green-600 hover:text-green-700 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="text-sm text-green-600 hover:text-green-700 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  )
}
