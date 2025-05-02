'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CloudRain,
  Calendar,
  ArrowRight,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Map,
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts'

// Sample data
const monthlyRainfall = [
  { name: 'Jan', actual: 10, normal: 12 },
  { name: 'Feb', actual: 15, normal: 18 },
  { name: 'Mar', actual: 20, normal: 25 },
  { name: 'Apr', actual: 30, normal: 35 },
  { name: 'May', actual: 40, normal: 45 },
  { name: 'Jun', actual: 120, normal: 100 },
  { name: 'Jul', actual: 180, normal: 200 },
  { name: 'Aug', actual: 160, normal: 180 },
  { name: 'Sep', actual: 90, normal: 100 },
  { name: 'Oct', actual: 30, normal: 40 },
  { name: 'Nov', actual: 15, normal: 20 },
  { name: 'Dec', actual: 10, normal: 15 },
]

const dailyRainfall = [
  { date: '4 Oct', rainfall: 0 },
  { date: '5 Oct', rainfall: 0 },
  { date: '6 Oct', rainfall: 5 },
  { date: '7 Oct', rainfall: 12 },
  { date: '8 Oct', rainfall: 3 },
  { date: '9 Oct', rainfall: 0 },
  { date: '10 Oct', rainfall: 0 },
]

const RainfallAnalysis = () => {
  const [timeframe, setTimeframe] = useState('monthly')

  return (
    <div className="space-y-6">
      {/* Timeframe Selector */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="flex space-x-2">
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
              timeframe === 'daily'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setTimeframe('daily')}
          >
            Daily Rainfall
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
              timeframe === 'monthly'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setTimeframe('monthly')}
          >
            Monthly Rainfall
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium ${
              timeframe === 'seasonal'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            onClick={() => setTimeframe('seasonal')}
          >
            Seasonal Rainfall
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
              <h2 className="text-2xl font-bold">Rainfall Analysis</h2>
              <p className="text-blue-100">Sonipat, Haryana</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white">
              <CloudRain className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-sm text-blue-100">
                Annual Rainfall (Till Date)
              </div>
              <div className="text-3xl font-bold mt-1">720 mm</div>
              <div className="flex items-center mt-1 text-sm">
                <TrendingDown className="h-4 w-4 mr-1 text-red-300" />
                <span className="text-red-300">10% less</span>
                <span className="text-blue-100 ml-1">than normal</span>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-sm text-blue-100">
                Monsoon Rainfall (June-September)
              </div>
              <div className="text-3xl font-bold mt-1">550 mm</div>
              <div className="flex items-center mt-1 text-sm">
                <TrendingDown className="h-4 w-4 mr-1 text-red-300" />
                <span className="text-red-300">5% less</span>
                <span className="text-blue-100 ml-1">than normal</span>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-white/10 rounded-xl p-4">
            <div className="text-sm text-blue-100">October Rainfall</div>
            <div className="text-3xl font-bold mt-1">20 mm</div>
            <div className="flex items-center mt-1 text-sm">
              <TrendingDown className="h-4 w-4 mr-1 text-red-300" />
              <span className="text-red-300">50% less</span>
              <span className="text-blue-100 ml-1">than normal</span>
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
            <h2 className="text-xl font-bold text-gray-800">
              Monthly Rainfall Comparison
            </h2>
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
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f0f0"
                  vertical={false}
                />
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
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  }}
                  formatter={(value) => [`${value} mm`, '']}
                />
                <Legend />
                <Bar
                  dataKey="actual"
                  name="Actual Rainfall"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="normal"
                  name="Normal Rainfall"
                  fill="#93c5fd"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm font-medium text-gray-700">
                Annual Rainfall Percentage
              </div>
              <div className="text-2xl font-bold text-blue-700 mt-1">90%</div>
              <div className="text-xs text-gray-500 mt-1">
                Percentage of Normal
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm font-medium text-gray-700">
                Rainfall Status
              </div>
              <div className="text-xl font-bold text-blue-700 mt-1">Normal</div>
              <div className="text-xs text-gray-500 mt-1">
                Between -19% to +19%
              </div>
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
            <h2 className="text-xl font-bold text-gray-800">
              Last 7 Days Rainfall
            </h2>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-500">4-10 October, 2023</span>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyRainfall}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f0f0f0"
                  vertical={false}
                />
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
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  }}
                  formatter={(value) => [`${value} mm`, 'Rainfall']}
                />
                <Bar
                  dataKey="rainfall"
                  name="Rainfall"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 bg-blue-50 rounded-xl p-4">
            <div className="flex items-center">
              <CloudRain className="h-5 w-5 text-blue-600 mr-2" />
              <div className="text-sm font-medium text-gray-700">
                Total Rainfall in Last 7 Days
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-700 mt-1">20 mm</div>
            <div className="text-xs text-gray-500 mt-1">
              Highest Rainfall: 12 mm (7 October)
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
            <h2 className="text-xl font-bold text-gray-800">
              Seasonal Rainfall Analysis
            </h2>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-500 mr-1" />
              <span className="text-sm text-gray-500">2023</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm font-medium text-gray-700">
                Pre-Monsoon (March-May)
              </div>
              <div className="text-2xl font-bold text-blue-700 mt-1">90 mm</div>
              <div className="flex items-center mt-1 text-xs">
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                <span className="text-red-500">15% less</span>
                <span className="text-gray-500 ml-1">than normal</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm font-medium text-gray-700">
                Monsoon (June-September)
              </div>
              <div className="text-2xl font-bold text-blue-700 mt-1">
                550 mm
              </div>
              <div className="flex items-center mt-1 text-xs">
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                <span className="text-red-500">5% less</span>
                <span className="text-gray-500 ml-1">than normal</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm font-medium text-gray-700">
                Post-Monsoon (Oct-Dec)
              </div>
              <div className="text-2xl font-bold text-blue-700 mt-1">20 mm</div>
              <div className="flex items-center mt-1 text-xs">
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                <span className="text-red-500">50% less</span>
                <span className="text-gray-500 ml-1">
                  than normal (till date)
                </span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <div className="text-sm font-medium text-gray-700">
                Winter (Jan-Feb)
              </div>
              <div className="text-2xl font-bold text-blue-700 mt-1">25 mm</div>
              <div className="flex items-center mt-1 text-xs">
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                <span className="text-red-500">20% less</span>
                <span className="text-gray-500 ml-1">than normal</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center mb-2">
              <Map className="h-5 w-5 text-gray-600 mr-2" />
              <div className="text-sm font-medium text-gray-700">
                Regional Rainfall Status
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-xs text-gray-600">
                  Extremely Low (-60% or less)
                </span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-orange-500 mr-2"></div>
                <span className="text-xs text-gray-600">
                  Low (-59% to -20%)
                </span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-gray-600">
                  Normal (-19% to +19%)
                </span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-xs text-gray-600">
                  High (+20% to +59%)
                </span>
              </div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-xs text-gray-600">
                  Extremely High (above +60%)
                </span>
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
  )
}

export default RainfallAnalysis
