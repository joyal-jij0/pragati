'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sprout,
  Calendar,
  ArrowRight,
  ChevronDown,
  Droplets,
  Sun,
  CloudRain,
  Wind,
  AlertTriangle,
} from 'lucide-react'

interface CropAdvisoryProps {
  compact?: boolean
}

const crops = [
  {
    id: 'wheat',
    name: 'गेहूं (Wheat)',
    icon: '🌾',
    stage: 'Flowering',
    color: 'amber',
  },
  {
    id: 'rice',
    name: 'धान (Rice)',
    icon: '🌾',
    stage: 'Transplanting',
    color: 'green',
  },
  {
    id: 'cotton',
    name: 'कपास (Cotton)',
    icon: '🌿',
    stage: 'Boll Development',
    color: 'blue',
  },
  {
    id: 'sugarcane',
    name: 'गन्ना (Sugarcane)',
    icon: '🎋',
    stage: 'Growth',
    color: 'purple',
  },
]

const CropAdvisory = ({ compact = false }: CropAdvisoryProps) => {
  const [selectedCrop, setSelectedCrop] = useState('wheat')

  if (compact) {
    return (
      <div className="bg-white rounded-3xl shadow-md p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-bold text-gray-800">Crop Advisory</h3>
          <button className="text-xs text-emerald-600 font-medium flex items-center">
            View All
            <ArrowRight className="h-3 w-3 ml-1" />
          </button>
        </div>

        <div className="bg-amber-50 rounded-xl p-3">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mr-2">
              <span className="text-lg">🌾</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">
                गेहूं (Wheat)
              </div>
              <div className="text-xs text-gray-500">Flowering</div>
            </div>
          </div>
          <div className="mt-2 text-xs text-amber-800">
            <AlertTriangle className="h-3 w-3 inline mr-1" />
            Irrigate in the next 2 days. Flowering is a critical stage.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Crop Selector */}
      <div className="bg-white rounded-3xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Crop Advisory</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {crops.map((crop) => (
            <button
              key={crop.id}
              className={`p-3 rounded-xl flex flex-col items-center ${
                selectedCrop === crop.id
                  ? `bg-${crop.color}-50 border border-${crop.color}-200`
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCrop(crop.id)}
            >
              <span className="text-2xl mb-1">{crop.icon}</span>
              <span
                className={`text-sm font-medium ${
                  selectedCrop === crop.id
                    ? `text-${crop.color}-800`
                    : 'text-gray-700'
                }`}
              >
                {crop.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Current Advisory */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-md overflow-hidden"
      >
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">Wheat Crop Advisory</h2>
              <p className="text-amber-100">October 10, 2023</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white">
              <span className="text-2xl">🌾</span>
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <div className="bg-white/20 rounded-lg px-3 py-1.5 text-sm">
              <span className="font-medium">Current Stage:</span> Flowering
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Weather-based Advisory
            </h3>
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 mt-1">
                  <CloudRain className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    Irrigate in the next 2 days
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    The flowering stage is sensitive to water. No rainfall is
                    expected in the next 5 days, so irrigation is necessary.
                  </p>
                  <div className="mt-2 flex items-center text-xs text-blue-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>
                      Recommended time: Morning or evening (not afternoon)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Nutrition Management
            </h3>
            <div className="bg-emerald-50 rounded-xl p-4">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-3 mt-1">
                  <Sprout className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    Apply Urea Spray
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Nitrogen is needed during the flowering stage. Apply 2% urea
                    as foliar spray (20 grams/liter of water).
                  </p>
                  <div className="mt-2 text-xs text-emerald-600">
                    <AlertTriangle className="h-3 w-3 inline mr-1" />
                    <span>Apply spray only after irrigation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Pest and Disease Management
            </h3>
            <div className="bg-red-50 rounded-xl p-4">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3 mt-1">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    Monitor for Aphids
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Weather conditions are favorable for aphid infestation.
                    Check the lower parts of leaves.
                  </p>
                  <div className="mt-2 text-xs text-red-600">
                    <span>
                      If infestation appears, spray Imidacloprid @ 0.3 ml/liter
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Action Plan for Next 7 Days
            </h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mr-3">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="flex-grow">
                  <div className="text-sm font-medium">October 11-12</div>
                  <div className="text-xs text-gray-500">Irrigate</div>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mr-3">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="flex-grow">
                  <div className="text-sm font-medium">October 13</div>
                  <div className="text-xs text-gray-500">Apply Urea Spray</div>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mr-3">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="flex-grow">
                  <div className="text-sm font-medium">October 14-16</div>
                  <div className="text-xs text-gray-500">Monitor for Pests</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CropAdvisory
