import React from 'react'
import { motion } from 'framer-motion'
import { weatherData } from '../../data/dashboardData'

interface WelcomeBannerProps {
  greeting: string
  farmerName: string
}

const WelcomeBanner = ({ greeting, farmerName }: WelcomeBannerProps) => {
  // Get today's weather (first item in the weather data array)
  const todayWeather = weatherData[0]
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white p-6 shadow-xl border border-green-400/20"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-green-300/10 rounded-full blur-2xl"></div>
      
      {/* Animated plant decorations */}
      <motion.div 
        animate={{ 
          y: [0, -5, 0],
          rotate: [0, 2, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 4,
          ease: "easeInOut" 
        }}
        className="absolute bottom-0 right-0 text-7xl opacity-20"
      >
        🌾
      </motion.div>
      
      <motion.div 
        animate={{ 
          y: [0, -3, 0],
          rotate: [0, -2, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute top-0 left-20 text-4xl opacity-20"
      >
        🌱
      </motion.div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 mix-blend-overlay"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-green-100">
              {greeting}, {farmerName}!
            </span>
            <motion.span 
              animate={{ rotate: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 2 }}
            >
              👋
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-green-100 max-w-xl font-light"
          >
            Welcome to your farm dashboard. Here's everything you need to know about your crops, weather, and market today.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 md:mt-0 flex items-center bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300"
        >
          <div className="mr-3 text-4xl">
            {todayWeather.icon}
          </div>
          <div>
            <p className="text-xs text-green-100 uppercase tracking-wider font-semibold">Today's Weather</p>
            <p className="text-xl font-semibold">{todayWeather.temp}°C | {todayWeather.rainfall > 0 ? 'Rain' : todayWeather.humidity > 60 ? 'Cloudy' : 'Sunny'}</p>
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
        </motion.div>
      </div>  
    </motion.div>
  )
}

export default WelcomeBanner