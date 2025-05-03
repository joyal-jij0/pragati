import React from 'react'
import { motion } from 'framer-motion'
import { weatherData } from '../../data/dashboardData'
import { Badge } from '../ui/badge'
import { CheckCircle2Icon } from 'lucide-react'

interface WelcomeBannerProps {
  greeting: string
  farmerName: string
}

const WelcomeBanner = ({ greeting, farmerName }: WelcomeBannerProps) => {
  // Get today's weather (first item in the weather data array)
  const todayWeather = weatherData[0]

  return (
    <motion.div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-green-500 text-white">
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
            Dashboard <span className="text-green-200">Management Hub</span>
          </h1>
          <p className="text-xl text-green-100 mb-6 max-w-2xl">Centralized management hub for monitoring activities, organizing resources, enhancing market strategies with actionable insights.</p>
          
            <div className="flex flex-wrap gap-3 mb-6">
              {[
          'Actionable Insights',
          'Centralized Monitoring',
          'Enhanced Collaboration',
        ].map((badge) => (
                <Badge
                  key={badge}
                  className="bg-white/20 border-none text-white px-3 py-1 text-sm"
                >
                  <CheckCircle2Icon className="h-4 w-4 mr-1" />
                  <span>{badge}</span>
                </Badge>
              ))}
            </div>
          
          {/* <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-white text-green-700 hover:bg-green-100"
            >
              <CameraIcon className="h-5 w-5 mr-2" />
              <span>Scan Crop Now</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-green-700 hover:bg-green-100"
            >
              <InfoIcon className="h-5 w-5 mr-2" />
              <span>How It Works</span>
            </Button>
          </div> */}
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
                  y: [0, -5, 0, 5, 0],
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

      <div
        className="mt-4 md:mt-0 flex items-center bg-white/15 backdrop-blur-sm p-4 border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300"
      >
        <div className="mr-3 text-4xl">{todayWeather.icon}</div>
        <div>
          <p className="text-xs text-green-100 uppercase tracking-wider font-semibold">
            Today's Weather
          </p>
          <p className="text-xl font-semibold">
            {todayWeather.temp}°C |{' '}
            {todayWeather.rainfall > 0
              ? 'Rain'
              : todayWeather.humidity > 60
              ? 'Cloudy'
              : 'Sunny'}
          </p>
          <div className="flex items-center gap-3 mt-1 text-xs text-green-100">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-300"></span>
              Humidity: {todayWeather.humidity}%
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Rainfall: {todayWeather.rainfall}mm
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WelcomeBanner
