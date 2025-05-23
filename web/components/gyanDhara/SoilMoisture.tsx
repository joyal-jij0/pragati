'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Droplets,
  Calendar,
  ArrowRight,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Map,
  Layers,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from 'recharts'

interface SoilMoistureProps {
  compact?: boolean
}

// Sample data
const soilMoistureData = [
  { date: '4 Oct', value: 28 },
  { date: '5 Oct', value: 26 },
  { date: '6 Oct', value: 32 },
  { date: '7 Oct', value: 38 },
  { date: '8 Oct', value: 35 },
  { date: '9 Oct', value: 32 },
  { date: '10 Oct', value: 30 },
]

const soilDepthData = [
  { depth: '0-10 cm', moisture: 30, status: 'Suitable', color: 'emerald' },
  { depth: '10-20 cm', moisture: 35, status: 'Suitable', color: 'emerald' },
  { depth: '20-30 cm', moisture: 40, status: 'High', color: 'blue' },
  { depth: '30-40 cm', moisture: 45, status: 'High', color: 'blue' },
]

const SoilMoisture = ({ compact = false }: SoilMoistureProps) => {
  const [soilDepth, setSoilDepth] = useState('0-10')

  if (compact) {
    return (
      <div className="bg-white rounded-3xl shadow-md p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-bold text-gray-800">Soil Moisture</h3>
          <button className="text-xs text-emerald-600 font-medium flex items-center">
            View Details
            <ArrowRight className="h-3 w-3 ml-1" />
          </button>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Droplets className="h-4 w-4 text-blue-500 mr-1" />
            <span className="text-sm font-medium text-gray-700">
              Current Status
            </span>
          </div>
          <span className="text-sm text-emerald-600 font-medium">Suitable</span>
        </div>

        <div className="h-20">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={soilMoistureData}
              margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient
                  id="soilMoistureGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#soilMoistureGradient)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="text-xs text-gray-500 mt-1">Last 7 days trend</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Soil Moisture Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl overflow-hidden text-white shadow-lg"
      >
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">Soil Moisture</h2>
              <p className="text-blue-100">Sonipat, Haryana</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white">
              <Droplets className="h-6 w-6" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-sm text-blue-100">Current Soil Moisture</div>
              <div className="text-3xl font-bold mt-1">30%</div>
              <div className="flex items-center mt-1 text-sm">
                <TrendingDown className="h-4 w-4 mr-1 text-blue-200" />
                <span className="text-blue-200">2% lower</span>
                <span className="text-blue-100 ml-1">than last week</span>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-4">
              <div className="text-sm text-blue-100">Moisture Status</div>
              <div className="text-2xl font-bold mt-1">Suitable</div>
              <div className="flex items-center mt-1 text-sm">
                <span className="text-blue-100">Ideal for wheat</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <h3 className="text-lg font-medium mb-3">7 Day Trend</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={soilMoistureData}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient
                    id="soilMoistureGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.1)"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(26, 86, 219, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value) => [`${value}%`, 'Soil Moisture']}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#ffffff"
                  strokeWidth={2}
                  fill="url(#soilMoistureGradient)"
                  activeDot={{
                    r: 6,
                    fill: '#ffffff',
                    stroke: '#1E40AF',
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Soil Depth Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-3xl shadow-md p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Soil Moisture by Depth
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {soilDepthData.map((item, index) => (
            <button
              key={index}
              className={`p-3 rounded-xl flex flex-col items-center ${
                soilDepth === item.depth.split(' ')[0]
                  ? `bg-${item.color}-50 border border-${item.color}-200`
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => setSoilDepth(item.depth.split(' ')[0])}
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  item.color === 'emerald'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                <Layers className="h-4 w-4" />
              </div>
              <span
                className={`text-sm font-medium mt-1 ${
                  soilDepth === item.depth.split(' ')[0]
                    ? item.color === 'emerald'
                      ? 'text-emerald-800'
                      : 'text-blue-800'
                    : 'text-gray-700'
                }`}
              >
                {item.depth}
              </span>
              <span
                className={`text-xs ${
                  soilDepth === item.depth.split(' ')[0]
                    ? item.color === 'emerald'
                      ? 'text-emerald-600'
                      : 'text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                {item.moisture}%
              </span>
            </button>
          ))}
        </div>

        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center mb-2">
            <Droplets className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-800">
              Soil Moisture Status
            </h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Current Status:</div>
              <div className="text-xl font-bold text-emerald-600 mt-1">
                Suitable
              </div>
            </div>

            <div className="h-16 w-48">
              <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-yellow-500 via-emerald-500 to-blue-500"
                  style={{ width: '100%' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Dry</span>
                <span>Low</span>
                <span>Suitable</span>
                <span>High</span>
              </div>
              <div className="relative h-2 w-full mt-1">
                <div
                  className="absolute h-4 w-4 bg-white border-2 border-emerald-500 rounded-full -mt-1"
                  style={{ left: '60%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-start">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 mt-1">
              <Droplets className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium text-gray-800">
                Irrigation Recommendation
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Current soil moisture is suitable. No irrigation needed for the
                next 3 days. Check again based on next week's weather
                conditions.
              </p>
              <div className="mt-2 flex items-center text-xs text-blue-600">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Next recommended irrigation date: October 14, 2023</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Soil Moisture Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-3xl shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Regional Soil Moisture
          </h2>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 text-gray-500 mr-1" />
            <span className="text-sm text-gray-500">October 10, 2023</span>
          </div>
        </div>

        <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center mb-4">
          <div className="text-center">
            <Map className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Regional Soil Moisture Map</p>
            <p className="text-xs text-gray-400 mt-1">
              (Map will be displayed here)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-sm font-medium text-gray-700">
              In Your Region
            </div>
            <div className="text-xl font-bold text-emerald-600 mt-1">30%</div>
            <div className="text-xs text-gray-500 mt-1">Suitable Condition</div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <div className="text-sm font-medium text-gray-700">
              District Average
            </div>
            <div className="text-xl font-bold text-blue-600 mt-1">35%</div>
            <div className="text-xs text-gray-500 mt-1">Slightly High</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SoilMoisture
