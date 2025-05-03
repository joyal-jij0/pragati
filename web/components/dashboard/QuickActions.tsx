import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const QuickActions = () => {
  const actions = [
    { 
      name: 'Weather', 
      icon: '☁️', 
      color: 'bg-blue-100 text-blue-600', 
      link: '/gyan-dhara/weather' 
    },
    { 
      name: 'Crop Doctor', 
      icon: '🌱', 
      color: 'bg-green-100 text-green-600', 
      link: '/fasal-doctor' 
    },
    { 
      name: 'Market Prices', 
      icon: '📊', 
      color: 'bg-amber-100 text-amber-600', 
      link: '/bazaar-bridge/prices' 
    },
    { 
      name: 'Buy Inputs', 
      icon: '🛒', 
      color: 'bg-purple-100 text-purple-600', 
      link: '/bazaar-bridge/inputs' 
    },
    { 
      name: 'Sell Crops', 
      icon: '🌾', 
      color: 'bg-yellow-100 text-yellow-600', 
      link: '/bazaar-bridge/sell' 
    },
    { 
      name: 'Loans', 
      icon: '💰', 
      color: 'bg-emerald-100 text-emerald-600', 
      link: '/arthik-sahara/loans' 
    },
    { 
      name: 'Insurance', 
      icon: '🛡️', 
      color: 'bg-red-100 text-red-600', 
      link: '/arthik-sahara/insurance' 
    },
    { 
      name: 'Community', 
      icon: '👨‍👩‍👧‍👦', 
      color: 'bg-indigo-100 text-indigo-600', 
      link: '/samuday-shakti' 
    },
  ]

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {actions.map((action, index) => (
          <Link 
            href={action.link} 
            key={index}
            className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-green-50 transition-colors group"
          >
            <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center text-xl mb-2 transition-transform group-hover:scale-110`}>
              {action.icon}
            </div>
            <span className="text-xs text-gray-700 text-center font-medium">{action.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default QuickActions