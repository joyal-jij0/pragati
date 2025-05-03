'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  CloudLightning,
  Thermometer,
  Wind,
  CloudRain,
  ArrowRight,
  Bell,
  Calendar,
  X,
} from 'lucide-react'

interface WeatherAlertsProps {
  compact?: boolean
}

const alerts = [
  {
    id: 1,
    type: 'warning',
    title: 'Extreme Heat Warning',
    description:
      'Temperature expected to reach 42°C in next 3 days. Please avoid going out between 11 AM to 4 PM.',
    icon: <Thermometer className="h-5 w-5" />,
    color: 'red',
    date: '10 October, 2023',
    time: '8:30 AM',
    source: 'India Meteorological Department',
    impact: 'Crop damage, stress on livestock, impact on human health',
    recommendations: [
      'Increase irrigation in fields',
      'Keep animals in shaded areas',
      'Drink plenty of water and avoid sun exposure',
    ],
    isRead: false,
  },
  {
    id: 2,
    type: 'alert',
    title: 'Strong Winds Warning',
    description:
      'Winds expected to blow at 50-60 km/h from 6 PM today. Take appropriate measures to protect crops.',
    icon: <Wind className="h-5 w-5" />,
    color: 'amber',
    date: '9 October, 2023',
    time: '2:15 PM',
    source: 'India Meteorological Department',
    impact: 'Damage to standing crops, falling fruits',
    recommendations: [
      'Support the crops',
      'Tie fruit trees securely',
      'Do not keep items in the open',
    ],
    isRead: true,
  },
  {
    id: 3,
    type: 'info',
    title: 'Light Rain Possibility',
    description:
      'Light to moderate rain expected from tomorrow morning. Advised to complete harvesting work today.',
    icon: <CloudRain className="h-5 w-5" />,
    color: 'blue',
    date: '8 October, 2023',
    time: '5:45 PM',
    source: 'India Meteorological Department',
    impact: 'Damage to harvested crops, increased soil moisture',
    recommendations: [
      'Cover harvested crops',
      'Arrange proper drainage',
      'Postpone chemical spraying',
    ],
    isRead: true,
  },
  {
    id: 4,
    type: 'danger',
    title: 'Lightning Warning',
    description:
      'Lightning expected tonight. Avoid working in open areas and keep livestock in safe places.',
    icon: <CloudLightning className="h-5 w-5" />,
    color: 'purple',
    date: '7 October, 2023',
    time: '7:20 PM',
    source: 'India Meteorological Department',
    impact: 'Life threatening, damage to electrical equipment',
    recommendations: [
      'Do not go outside',
      'Keep animals in enclosed spaces',
      'Unplug electrical devices',
    ],
    isRead: false,
  },
]

const WeatherAlerts = ({ compact = false }: WeatherAlertsProps) => {
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null)
  const [readAlerts, setReadAlerts] = useState<number[]>([2, 3])

  const markAsRead = (id: number) => {
    if (!readAlerts.includes(id)) {
      setReadAlerts([...readAlerts, id])
    }
  }

  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      red: 'bg-red-100 text-red-800 border-red-200',
      amber: 'bg-amber-100 text-amber-800 border-amber-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200',
    }
    return colorMap[color] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getIconColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      red: 'text-red-600',
      amber: 'text-amber-600',
      blue: 'text-blue-600',
      purple: 'text-purple-600',
    }
    return colorMap[color] || 'text-gray-600'
  }

  if (compact) {
    return (
      <div className="bg-white rounded-3xl shadow-md p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-base font-bold text-gray-800">Weather Alerts</h3>
          <button className="text-xs text-emerald-600 font-medium flex items-center">
            View All
            <ArrowRight className="h-3 w-3 ml-1" />
          </button>
        </div>

        <div className="space-y-2">
          {alerts.slice(0, 2).map((alert) => (
            <div
              key={alert.id}
              className={`p-2 rounded-lg border ${getColorClass(alert.color)} ${
                !readAlerts.includes(alert.id) ? 'relative' : ''
              }`}
            >
              {!readAlerts.includes(alert.id) && (
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
              )}
              <div className="flex items-start">
                <div
                  className={`p-1.5 rounded-full ${
                    alert.color === 'red'
                      ? 'bg-red-50'
                      : alert.color === 'amber'
                      ? 'bg-amber-50'
                      : alert.color === 'blue'
                      ? 'bg-blue-50'
                      : 'bg-purple-50'
                  } mr-2`}
                >
                  <div className={getIconColorClass(alert.color)}>
                    {alert.icon}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium">{alert.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {alert.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl shadow-md p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Weather Alerts</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Bell className="h-6 w-6 text-gray-600" />
              {alerts.filter((a) => !readAlerts.includes(a.id)).length > 0 && (
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-[10px] text-white font-medium">
                    {alerts.filter((a) => !readAlerts.includes(a.id)).length}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center text-sm text-gray-600">
          <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
          <span>Active Alerts: {alerts.length}</span>
          <span className="mx-2">•</span>
          <span>
            New: {alerts.filter((a) => !readAlerts.includes(a.id)).length}
          </span>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-white rounded-3xl shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          Active Alerts
        </h3>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-xl border ${getColorClass(alert.color)} ${
                !readAlerts.includes(alert.id) ? 'relative' : ''
              }`}
              onClick={() => {
                setSelectedAlert(alert.id)
                markAsRead(alert.id)
              }}
            >
              {!readAlerts.includes(alert.id) && (
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
              )}
              <div className="flex items-start">
                <div
                  className={`p-2 rounded-full ${
                    alert.color === 'red'
                      ? 'bg-red-50'
                      : alert.color === 'amber'
                      ? 'bg-amber-50'
                      : alert.color === 'blue'
                      ? 'bg-blue-50'
                      : 'bg-purple-50'
                  } mr-3`}
                >
                  <div className={getIconColorClass(alert.color)}>
                    {alert.icon}
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{alert.title}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {alert.description}
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {alert.date}
                    </div>
                  </div>

                  <div className="mt-2 flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      Source: {alert.source}
                    </div>
                    <button
                      className="text-xs font-medium text-blue-600 hover:text-blue-800"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedAlert(alert.id)
                        markAsRead(alert.id)
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedAlert(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {alerts
              .filter((a) => a.id === selectedAlert)
              .map((alert) => (
                <div key={alert.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div
                        className={`p-2 rounded-full ${
                          alert.color === 'red'
                            ? 'bg-red-100'
                            : alert.color === 'amber'
                            ? 'bg-amber-100'
                            : alert.color === 'blue'
                            ? 'bg-blue-100'
                            : 'bg-purple-100'
                        } mr-3`}
                      >
                        <div className={getIconColorClass(alert.color)}>
                          {alert.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {alert.title}
                      </h3>
                    </div>
                    <button
                      className="p-1 rounded-full hover:bg-gray-100"
                      onClick={() => setSelectedAlert(null)}
                    >
                      <X className="h-5 w-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {alert.date}, {alert.time}
                    </div>
                    <div>Source: {alert.source}</div>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-700">{alert.description}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Potential Impact
                    </h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {alert.impact}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {alert.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs mr-2 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-sm text-gray-600">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                      onClick={() => setSelectedAlert(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default WeatherAlerts
