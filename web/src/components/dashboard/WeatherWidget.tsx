import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { motion } from 'framer-motion'

interface WeatherDataItem {
  day: string
  temp: number
  humidity: number
  rainfall: number
  icon: string
}

interface WeatherWidgetProps {
  weatherData: WeatherDataItem[]
}

const WeatherWidget = ({ weatherData }: WeatherWidgetProps) => {
  return (
    <Card className="overflow-hidden border-green-100 h-[600px] shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100/30 pt-2">
        <CardHeader className="py-3 flex items-center">
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <motion.div 
                className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-xl">☁️</span>
              </motion.div>
              <span>Weather Forecast</span>
            </CardTitle>
            <motion.div 
              className="text-xs text-blue-600 bg-blue-100/50 px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-blue-500">📍</span>
              <span>Sonipat, Haryana</span>
            </motion.div>
          </div>
        </CardHeader>
        <div className="h-1 bg-gradient-to-r from-blue-100 to-blue-50"></div>
      </div>
      
      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <div className="space-y-6">
          <motion.div 
            className="mb-4 grid grid-cols-7 gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {weatherData.map((item, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center p-2 rounded-lg bg-gradient-to-b from-blue-50/50 to-transparent border border-blue-100/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)",
                  borderColor: "rgba(59, 130, 246, 0.3)"
                }}
              >
                <span className="text-xs font-medium text-gray-600">{item.day}</span>
                <motion.span 
                  className="text-2xl my-1"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: item.icon === '🌧️' ? [0, -5, 0, 5, 0] : 
                            item.icon === '☀️' ? [0, 10, 0, 10, 0] : 
                            [0, 5, 0, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >{item.icon}</motion.span>
                <span className="text-sm font-bold text-gray-800">{item.temp}°C</span>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <motion.span 
                    className="text-blue-500 mr-1"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >💧</motion.span>
                  <span>{item.humidity}%</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="h-52"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weatherData}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                  <filter id="shadow" height="200%" width="200%" x="-50%" y="-50%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feFlood floodColor="rgba(59, 130, 246, 0.3)" result="color"/>
                    <feComposite in="color" in2="blur" operator="in" result="shadow"/>
                    <feMerge>
                      <feMergeNode in="shadow"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f9ff" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis 
                  yAxisId="temp" 
                  orientation="left" 
                  tick={{ fontSize: 12 }} 
                  stroke="#94a3b8"
                  domain={[20, 40]}
                  label={{ value: '°C', position: 'insideLeft', angle: -90, dy: 40, fontSize: 12, fill: '#94a3b8' }}
                />
                <YAxis 
                  yAxisId="rain" 
                  orientation="right" 
                  tick={{ fontSize: 12 }} 
                  stroke="#94a3b8"
                  domain={[0, 20]}
                  label={{ value: 'mm', position: 'insideRight', angle: -90, dy: 40, fontSize: 12, fill: '#94a3b8' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    borderRadius: '8px', 
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value, name) => {
                    if (name === 'temp') return [`${value}°C`, 'Temperature'];
                    if (name === 'rainfall') return [`${value} mm`, 'Rainfall'];
                    return [value, name];
                  }}
                  animationDuration={300}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '10px' }}
                  iconType="circle"
                />
                <Area 
                  type="monotone" 
                  dataKey="temp" 
                  yAxisId="temp"
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fill="url(#tempGradient)" 
                  name="Temperature"
                  activeDot={{ r: 6, fill: '#3b82f6', stroke: 'white', strokeWidth: 2, filter: 'url(#shadow)' }}
                  isAnimationActive={true}
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                <Area 
                  type="monotone" 
                  dataKey="rainfall" 
                  yAxisId="rain"
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  fill="url(#rainGradient)" 
                  name="Rainfall"
                  activeDot={{ r: 6, fill: '#06b6d4', stroke: 'white', strokeWidth: 2, filter: 'url(#shadow)' }}
                  isAnimationActive={true}
                  animationDuration={1500}
                  animationEasing="ease-out"
                  animationBegin={300}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <motion.div 
              className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="text-blue-500"
                animate={{ rotate: [0, 20, 0, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >💨</motion.span>
              <span className="text-sm text-gray-700">12 km/h NE</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="text-yellow-500"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >☀️</motion.span>
              <span className="text-sm text-gray-700">UV: High</span>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-blue-100">
          <motion.button 
            className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-2 rounded-md hover:bg-blue-50/70 transition-colors flex items-center justify-center gap-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Detailed Forecast 
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >→</motion.span>
          </motion.button>
        </div>
      </CardContent>
    </Card>
  )
}

export default WeatherWidget