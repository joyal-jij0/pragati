import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

interface CommunityGroup {
  id: number
  name: string
  members: number
  activity: string
  events: number
  icon: string
}

interface FarmerCommunityProps {
  communityData: CommunityGroup[]
}

const FarmerCommunity = ({ communityData }: FarmerCommunityProps) => {
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null)
  
  return (
    <Card className="overflow-hidden border-orange-100 h-full shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="bg-gradient-to-r from-orange-50 to-orange-100/30 pt-2">
        <CardHeader className="py-3 flex items-center">
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <motion.div 
                className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center"
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.05, 1, 1.05, 1] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-xl">👨‍👩‍👧‍👦</span>
              </motion.div>
              <span>Farmer Community</span>
            </CardTitle>
            <motion.div 
              className="bg-white shadow-sm rounded-full px-2 py-1 flex items-center text-xs font-medium"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-orange-600">{communityData.length} groups</span>
            </motion.div>
          </div>
        </CardHeader>
        <div className="h-1 bg-gradient-to-r from-orange-100 to-orange-50"></div>
      </div>
      
      <div className="max-h-[calc(100%-60px)] overflow-auto scrollbar-hide">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {communityData.map((group) => (
              <motion.div 
                key={group.id} 
                className="p-4 bg-white rounded-lg border border-orange-100 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  borderColor: "rgba(251, 146, 60, 0.5)"
                }}
                onMouseEnter={() => setHoveredGroup(group.id)}
                onMouseLeave={() => setHoveredGroup(null)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 border border-orange-200"
                    animate={{ 
                      scale: hoveredGroup === group.id ? [1, 1.1, 1] : 1,
                      rotate: hoveredGroup === group.id ? [0, 5, 0, -5, 0] : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-xl">{group.icon}</span>
                  </motion.div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">{group.name}</h3>
                    <p className="text-xs text-gray-500">{group.members} members</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${getActivityColor(group.activity)}`}></span>
                    <span className="text-gray-600">{group.activity} Activity</span>
                  </div>
                  <div className="text-orange-600 font-medium">
                    {group.events} upcoming events
                  </div>
                </div>
                
                <motion.button 
                  className="mt-3 w-full text-xs text-orange-600 hover:text-orange-700 font-medium py-1.5 border border-orange-200 rounded-md hover:bg-orange-50 transition-colors"
                  whileHover={{ backgroundColor: "rgba(255, 237, 213, 0.7)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    animate={{ 
                      x: hoveredGroup === group.id ? [0, 3, 0] : 0
                    }}
                    transition={{ duration: 1, repeat: hoveredGroup === group.id ? Infinity : 0 }}
                  >
                    Join Group
                  </motion.span>
                </motion.button>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ 
              backgroundColor: "rgba(255, 237, 213, 0.5)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-800 flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  📅
                </motion.span>
                Upcoming Community Events
              </h3>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                3 events
              </span>
            </div>
            
            <div className="space-y-3">
              {[
                { icon: '🌱', title: 'Organic Farming Workshop', time: 'Tomorrow, 10:00 AM' },
                { icon: '🚜', title: 'Farm Equipment Demo', time: 'Jul 15, 2:00 PM' },
                { icon: '🏆', title: 'Best Farmer Award Ceremony', time: 'Jul 20, 5:00 PM' }
              ].map((event, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center justify-between p-2 bg-white rounded-md border border-orange-100"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ 
                    backgroundColor: "rgba(255, 250, 240, 1)",
                    x: 5
                  }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <span className="text-lg">{event.icon}</span>
                    </motion.div>
                    <span className="text-sm text-gray-700">{event.title}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-orange-300"></span>
                    <span className="text-xs text-gray-500">{event.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.button
              className="mt-3 w-full text-xs text-orange-600 hover:text-orange-700 font-medium py-1.5 border border-orange-200 rounded-md hover:bg-orange-50 transition-colors"
              whileHover={{ backgroundColor: "rgba(255, 237, 213, 0.7)" }}
              whileTap={{ scale: 0.98 }}
            >
              View All Events
            </motion.button>
          </motion.div>
          
          <div className="mt-4 pt-4 border-t border-orange-100 flex justify-center">
            <motion.button 
              className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1 px-4 py-1.5 rounded-md hover:bg-orange-50/70 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Explore All Communities</span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >→</motion.span>
            </motion.button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

// Helper function to get color based on activity level
const getActivityColor = (activity: string) => {
  switch (activity.toLowerCase()) {
    case 'high':
      return 'bg-green-500'
    case 'medium':
      return 'bg-amber-500'
    case 'low':
      return 'bg-red-500'
    default:
      return 'bg-blue-500'
  }
}

export default FarmerCommunity