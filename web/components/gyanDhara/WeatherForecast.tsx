"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sun, Cloud, CloudRain, CloudDrizzle, CloudLightning, 
  Wind, Droplets, Thermometer, Calendar, Clock, 
  ArrowRight, ChevronDown, Filter
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Sample data
const hourlyForecast = [
  { time: '6:00', temp: 24, humidity: 65, icon: <Sun className="w-5 h-5" />, precipitation: 0 },
  { time: '9:00', temp: 27, humidity: 60, icon: <Sun className="w-5 h-5" />, precipitation: 0 },
  { time: '12:00', temp: 32, humidity: 55, icon: <Sun className="w-5 h-5" />, precipitation: 0 },
  { time: '15:00', temp: 33, humidity: 50, icon: <Sun className="w-5 h-5" />, precipitation: 0 },
  { time: '18:00', temp: 30, humidity: 55, icon: <Cloud className="w-5 h-5" />, precipitation: 0 },
  { time: '21:00', temp: 27, humidity: 60, icon: <Cloud className="w-5 h-5" />, precipitation: 0 },
  { time: '0:00', temp: 25, humidity: 65, icon: <Cloud className="w-5 h-5" />, precipitation: 0 },
  { time: '3:00', temp: 24, humidity: 70, icon: <Cloud className="w-5 h-5" />, precipitation: 0 },
];

const weeklyForecast = [
  { day: 'सोम', date: 'Oct 10', maxTemp: 33, minTemp: 24, humidity: 55, icon: <Sun className="w-6 h-6" />, precipitation: 0, conditions: "साफ़" },
  { day: 'मंगल', date: 'Oct 11', maxTemp: 32, minTemp: 23, humidity: 60, icon: <Sun className="w-6 h-6" />, precipitation: 0, conditions: "साफ़" },
  { day: 'बुध', date: 'Oct 12', maxTemp: 30, minTemp: 22, humidity: 65, icon: <Cloud className="w-6 h-6" />, precipitation: 10, conditions: "आंशिक बादल" },
  { day: 'गुरु', date: 'Oct 13', maxTemp: 29, minTemp: 22, humidity: 70, icon: <CloudRain className="w-6 h-6" />, precipitation: 40, conditions: "हल्की बारिश" },
  { day: 'शुक्र', date: 'Oct 14', maxTemp: 28, minTemp: 21, humidity: 75, icon: <CloudRain className="w-6 h-6" />, precipitation: 60, conditions: "बारिश" },
  { day: 'शनि', date: 'Oct 15', maxTemp: 30, minTemp: 22, humidity: 65, icon: <Cloud className="w-6 h-6" />, precipitation: 20, conditions: "आंशिक बादल" },
  { day: 'रवि', date: 'Oct 16', maxTemp: 31, minTemp: 23, humidity: 60, icon: <Sun className="w-6 h-6" />, precipitation: 0, conditions: "साफ़" },
];

// Convert to chart data
const tempChartData = weeklyForecast.map(day => ({
  name: day.day,
  max: day.maxTemp,
  min: day.minTemp
}));

const precipChartData = weeklyForecast.map(day => ({
  name: day.day,
  value: day.precipitation
}));

const WeatherForecast = () => {
  const [forecastType, setForecastType] = useState("daily");
  
  return (
    <div className="space-y-6">
      {/* Forecast Type Selector */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="flex space-x-2">
          <button 
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${forecastType === 'hourly' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setForecastType('hourly')}
          >
            घंटेवार पूर्वानुमान
          </button>
          <button 
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${forecastType === 'daily' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setForecastType('daily')}
          >
            दैनिक पूर्वानुमान
          </button>
        </div>
      </div>
      
      {/* Hourly Forecast */}
      {forecastType === 'hourly' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">आज का घंटेवार पूर्वानुमान</h2>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-500">सोमवार, 10 अक्टूबर</span>
            </div>
          </div>
          
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-4 min-w-max">
              {hourlyForecast.map((hour, index) => (
                <div 
                  key={hour.time}
                  className={`flex flex-col items-center p-3 rounded-xl min-w-[80px] ${index === 2 ? 'bg-blue-50 border border-blue-100' : ''}`}
                >
                  <div className={`text-sm font-medium ${index === 2 ? 'text-blue-700' : 'text-gray-700'}`}>{hour.time}</div>
                  <div className="my-2">
                    {hour.icon}
                  </div>
                  <div className={`text-lg font-bold ${index === 2 ? 'text-blue-700' : 'text-gray-800'}`}>
                    {hour.temp}°
                  </div>
                  <div className="flex items-center mt-1">
                    <Droplets className={`h-3 w-3 mr-1 ${index === 2 ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span className={`text-xs ${index === 2 ? 'text-blue-600' : 'text-gray-500'}`}>{hour.humidity}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Temperature Chart */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">तापमान पूर्वानुमान</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={hourlyForecast}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    domain={['dataMin - 2', 'dataMax + 2']}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                    tickFormatter={(value) => `${value}°`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => [`${value}°C`, 'तापमान']}
                    labelFormatter={(label) => `समय: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fill="url(#tempGradient)" 
                    activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Daily Forecast */}
      {forecastType === 'daily' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Weekly Overview */}
          <div className="bg-white rounded-3xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">साप्ताहिक पूर्वानुमान</h2>
              <button className="flex items-center text-sm text-emerald-600 font-medium">
                <Filter className="h-4 w-4 mr-1" />
                फ़िल्टर
              </button>
            </div>
            
            <div className="space-y-3">
              {weeklyForecast.map((day, index) => (
                <div 
                  key={day.day}
                  className={`flex items-center justify-between p-3 rounded-xl ${index === 0 ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-center">
                    <div className={`w-10 text-center ${index === 0 ? 'text-blue-700' : 'text-gray-700'}`}>
                      <div className="text-sm font-medium">{day.day}</div>
                      <div className="text-xs text-gray-500">{day.date}</div>
                    </div>
                    <div className="ml-4">
                      {day.icon}
                    </div>
                    <div className="ml-4">
                      <div className={`text-sm font-medium ${index === 0 ? 'text-blue-700' : 'text-gray-700'}`}>{day.conditions}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex items-center mr-6">
                      <Droplets className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm text-gray-600">{day.humidity}%</span>
                    </div>
                    <div className="flex items-center mr-6">
                      <CloudRain className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-sm text-gray-600">{day.precipitation}%</span>
                    </div>
                    <div className="w-20 text-right">
                      <div className="text-sm font-bold text-gray-800">{day.maxTemp}°</div>
                      <div className="text-xs text-gray-500">{day.minTemp}°</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Temperature Chart */}
          <div className="bg-white rounded-3xl shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">तापमान प्रवृत्ति</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={tempChartData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    domain={['dataMin - 2', 'dataMax + 2']}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                    tickFormatter={(value) => `${value}°`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => [`${value}°C`, '']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="max" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#ef4444', stroke: '#fff', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#ef4444', stroke: '#fff', strokeWidth: 2 }}
                    name="अधिकतम"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="min" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                    name="न्यूनतम"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Precipitation Chart */}
          <div className="bg-white rounded-3xl shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">वर्षा संभावना</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={precipChartData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                >
                  <defs>
                    <linearGradient id="precipGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                    tickLine={{ stroke: '#e5e7eb' }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => [`${value}%`, 'वर्षा संभावना']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#60a5fa" 
                    strokeWidth={2}
                    fill="url(#precipGradient)" 
                    activeDot={{ r: 6, fill: '#60a5fa', stroke: '#fff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WeatherForecast;