"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CloudRain, Calendar, ArrowRight, ChevronDown, 
  TrendingUp, TrendingDown, BarChart3, Map
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

// Sample data
const monthlyRainfall = [
  { name: 'जन', actual: 10, normal: 12 },
  { name: 'फर', actual: 15, normal: 18 },
  { name: 'मार्च', actual: 20, normal: 25 },
  { name: 'अप्रैल', actual: 30, normal: 35 },
  { name: 'मई', actual: 40, normal: 45 },
  { name: 'जून', actual: 120, normal: 100 },
  { name: 'जुल', actual: 180, normal: 200 },
  { name: 'अग', actual: 160, normal: 180 },
  { name: 'सित', actual: 90, normal: 100 },
  { name: 'अक्टू', actual: 30, normal: 40 },
  { name: 'नव', actual: 15, normal: 20 },
  { name: 'दिस', actual: 10, normal: 15 },
];

const dailyRainfall = [
  { date: '4 अक्टू', rainfall: 0 },
  { date: '5 अक्टू', rainfall: 0 },
  { date: '6 अक्टू', rainfall: 5 },
  { date: '7 अक्टू', rainfall: 12 },
  { date: '8 अक्टू', rainfall: 3 },
  { date: '9 अक्टू', rainfall: 0 },
  { date: '10 अक्टू', rainfall: 0 },
];

const RainfallAnalysis = () => {
  const [timeframe, setTimeframe] = useState("monthly");
  
  return (
    <div className="space-y-6">
      {/* Timeframe Selector */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="flex space-x-2">
          <button 
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${timeframe === 'daily' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setTimeframe('daily')}
          >
            दैनिक वर्षा
          </button>
          <button 
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${timeframe === 'monthly' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setTimeframe('monthly')}
          >
            मासिक वर्षा
          </button>
          <button 
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${timeframe === 'seasonal' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            onClick={() => setTimeframe('seasonal')}
          >
            मौसमी वर्षा
          </button>
        </div>
      </div>
      
      {/* Rainfall Summary Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl overflow-hidden text-white shadow-lg"
      >
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">वर्षा विश्लेषण</h2>
              <p className="text-blue-100">सोनीपत, हरियाणा</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white">
              <CloudRain className="h-6 w-6" />
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-sm text-blue-100">वार्षिक वर्षा (अब तक)</div>
              <div className="text-3xl font-bold mt-1">720 mm</div>
              <div className="flex items-center mt-1 text-sm">
                <TrendingDown className="h-4 w-4 mr-1 text-red-300" />
                <span className="text-red-300">10% कम</span>
                <span className="text-blue-100 ml-1">सामान्य से</span>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-sm text-blue-100">मानसून वर्षा (जून-सितंबर)</div>
              <div className="text-3xl font-bold mt-1">550 mm</div>
              <div className="flex items-center mt-1 text-sm">
                <TrendingDown className="h-4 w-4 mr-1 text-red-300" />
                <span className="text-red-300">5% कम</span>
                <span className="text-blue-100 ml-1">सामान्य से</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-white/10 rounded-xl p-4">
            <div className="text-sm text-blue-100">अक्टूबर में वर्षा</div>
            <div className="text-3xl font-bold mt-1">20 mm</div>
            <div className="flex items-center mt-1 text-sm">
              <TrendingDown className="h-4 w-4 mr-1 text-red-300" />
              <span className="text-red-300">50% कम</span>
              <span className="text-blue-100 ml-1">सामान्य से</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Monthly Rainfall Chart */}
      {timeframe === 'monthly' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">मासिक वर्षा तुलना</h2>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-500">2023</span>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyRainfall}
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
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={{ stroke: '#e5e7eb' }}
                  tickFormatter={(value) => `${value} mm`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value) => [`${value} mm`, '']}
                />
                <Legend />
                <Bar 
                  dataKey="actual" 
                  name="वास्तविक वर्षा" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="normal" 
                  name="सामान्य वर्षा" 
                  fill="#93c5fd" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm font-medium text-gray-700">वार्षिक वर्षा प्रतिशत</div>
              <div className="text-2xl font-bold text-blue-700 mt-1">90%</div>
              <div className="text-xs text-gray-500 mt-1">सामान्य का प्रतिशत</div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm font-medium text-gray-700">वर्षा की स्थिति</div>
              <div className="text-xl font-bold text-blue-700 mt-1">सामान्य</div>
              <div className="text-xs text-gray-500 mt-1">-19% से +19% के बीच</div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Daily Rainfall Chart */}
      {timeframe === 'daily' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">पिछले 7 दिनों की वर्षा</h2>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-500">4-10 अक्टूबर, 2023</span>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyRainfall}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={{ stroke: '#e5e7eb' }}
                  tickFormatter={(value) => `${value} mm`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}
                  formatter={(value) => [`${value} mm`, 'वर्षा']}
                />
                <Bar 
                  dataKey="rainfall" 
                  name="वर्षा" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 bg-blue-50 rounded-xl p-4">
            <div className="flex items-center">
              <CloudRain className="h-5 w-5 text-blue-600 mr-2" />
              <div className="text-sm font-medium text-gray-700">पिछले 7 दिनों में कुल वर्षा</div>
            </div>
            <div className="text-2xl font-bold text-blue-700 mt-1">20 mm</div>
            <div className="text-xs text-gray-500 mt-1">
              सबसे अधिक वर्षा: 12 mm (7 अक्टूबर)
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Seasonal Rainfall */}
      {timeframe === 'seasonal' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-md p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">मौसमी वर्षा विश्लेषण</h2>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-500">2023</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm font-medium text-gray-700">पूर्व-मानसून (मार्च-मई)</div>
              <div className="text-2xl font-bold text-blue-700 mt-1">90 mm</div>
              <div className="flex items-center mt-1 text-xs">
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                <span className="text-red-500">15% कम</span>
                <span className="text-gray-500 ml-1">सामान्य से</span>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm font-medium text-gray-700">मानसून (जून-सितंबर)</div>
              <div className="text-2xl font-bold text-blue-700 mt-1">550 mm</div>
              <div className="flex items-center mt-1 text-xs">
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                <span className="text-red-500">5% कम</span>
                <span className="text-gray-500 ml-1">सामान्य से</span>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm font-medium text-gray-700">उत्तर-मानसून (अक्टू-दिस)</div>
              <div className="text-2xl font-bold text-blue-700 mt-1">20 mm</div>
              <div className="flex items-center mt-1 text-xs">
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                <span className="text-red-500">50% कम</span>
                <span className="text-gray-500 ml-1">सामान्य से (अब तक)</span>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm font-medium text-gray-700">शीतकालीन (जन-फर)</div>
              <div className="text-2xl font-bold text-blue-700 mt-1">25 mm</div>
              <div className="flex items-center mt-1 text-xs">
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                <span className="text-red-500">20% कम</span>
                <span className="text-gray-500 ml-1">सामान्य से</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center mb-2">
              <Map className="h-5 w-5 text-gray-600 mr-2" />
              <div className="text-sm font-medium text-gray-700">क्षेत्रीय वर्षा स्थिति</div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-xs text-gray-600">अत्यधिक कम (-60% से कम)</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-orange-500 mr-2"></div>
                <span className="text-xs text-gray-600">कम (-59% से -20%)</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-gray-600">सामान्य (-19% से +19%)</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-xs text-gray-600">अधिक (+20% से +59%)</span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-xs text-gray-600">अत्यधिक अधिक (+60% से अधिक)</span>
              </div>
            </div>
          </div>
          
          <div className="h-64 bg-white rounded-xl shadow-sm overflow-hidden">
            <img 
              src="/images/rainfall-map.png" 
              alt="Rainfall distribution map" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RainfallAnalysis;