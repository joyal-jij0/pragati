import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion, AnimatePresence } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Activity {
  id: number
  type: string
  title: string
  description: string
  timestamp: string
  icon: string
  importance?: 'high' | 'medium' | 'low'
  location?: string
  relatedItems?: string[]
}

interface ActivityFeedProps {
  activities: Activity[]
}

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  const [activeTab, setActiveTab] = useState('all')
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null)
  
  // Filter activities by type for tabs
  const weatherActivities = activities.filter(act => act.type === 'weather')
  const marketActivities = activities.filter(act => act.type === 'market' || act.type === 'purchase')
  const cropActivities = activities.filter(act => 
    act.type === 'diagnosis' || act.type === 'harvest' || act.type === 'soil'
  )
  const otherActivities = activities.filter(act => 
    act.type !== 'weather' && act.type !== 'market' && act.type !== 'purchase' && 
    act.type !== 'diagnosis' && act.type !== 'harvest' && act.type !== 'soil'
  )
  
  const getImportanceColor = (importance?: string) => {
    switch (importance) {
      case 'high':
        return 'bg-red-100 text-red-700'
      case 'medium':
        return 'bg-amber-100 text-amber-700'
      case 'low':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-blue-100 text-blue-700'
    }
  }

  return (
    <Card className="py-0 overflow-hidden border-purple-100 h-full shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="bg-gradient-to-r from-purple-50 to-purple-100/30 pt-2">
        <CardHeader className="py-3 flex items-center">
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <motion.div 
                className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center"
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.05, 1, 1.05, 1] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-xl">📋</span>
              </motion.div>
              <span>Recent Activity</span>
            </CardTitle>
            <motion.div 
              className="bg-white shadow-sm rounded-full px-3 py-1.5 flex items-center text-xs font-medium"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-purple-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                {activities.length} updates
              </span>
            </motion.div>
          </div>
        </CardHeader>
        <div className="h-1 bg-gradient-to-r from-purple-100 to-purple-50"></div>
      </div>
      
      <div className="max-h-[calc(100%-60px)] overflow-auto scrollbar-hide">
        <CardContent className="p-0 flex-grow flex flex-col">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-4 pt-4">
              <TabsList className="grid grid-cols-4 bg-purple-50/50">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="weather" 
                  className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
                >
                  <span className="flex items-center gap-1">
                    <span>Weather</span>
                    <span className="text-xs">🌧️</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="market" 
                  className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
                >
                  <span className="flex items-center gap-1">
                    <span>Market</span>
                    <span className="text-xs">📈</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="crop" 
                  className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
                >
                  <span className="flex items-center gap-1">
                    <span>Crop</span>
                    <span className="text-xs">🌱</span>
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="relative">
                <AnimatePresence>
                  {activities.map((activity, index) => (
                    <ActivityItem 
                      key={activity.id}
                      activity={activity}
                      index={index}
                      isLast={index === activities.length - 1}
                      isExpanded={expandedActivity === activity.id}
                      onToggleExpand={() => setExpandedActivity(expandedActivity === activity.id ? null : activity.id)}
                      getActivityTypeColor={getActivityTypeColor}
                      getImportanceColor={getImportanceColor}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>
            
            <TabsContent value="weather" className="mt-0">
              <div className="relative">
                {weatherActivities.length > 0 ? (
                  weatherActivities.map((activity, index) => (
                    <ActivityItem 
                      key={activity.id}
                      activity={activity}
                      index={index}
                      isLast={index === weatherActivities.length - 1}
                      isExpanded={expandedActivity === activity.id}
                      onToggleExpand={() => setExpandedActivity(expandedActivity === activity.id ? null : activity.id)}
                      getActivityTypeColor={getActivityTypeColor}
                      getImportanceColor={getImportanceColor}
                    />
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <p className="text-sm text-gray-600">No weather activities found.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="market" className="mt-0">
              <div className="relative">
                {marketActivities.length > 0 ? (
                  marketActivities.map((activity, index) => (
                    <ActivityItem 
                      key={activity.id}
                      activity={activity}
                      index={index}
                      isLast={index === marketActivities.length - 1}
                      isExpanded={expandedActivity === activity.id}
                      onToggleExpand={() => setExpandedActivity(expandedActivity === activity.id ? null : activity.id)}
                      getActivityTypeColor={getActivityTypeColor}
                      getImportanceColor={getImportanceColor}
                    />
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <p className="text-sm text-gray-600">No market activities found.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="crop" className="mt-0">
              <div className="relative">
                {cropActivities.length > 0 ? (
                  cropActivities.map((activity, index) => (
                    <ActivityItem 
                      key={activity.id}
                      activity={activity}
                      index={index}
                      isLast={index === cropActivities.length - 1}
                      isExpanded={expandedActivity === activity.id}
                      onToggleExpand={() => setExpandedActivity(expandedActivity === activity.id ? null : activity.id)}
                      getActivityTypeColor={getActivityTypeColor}
                      getImportanceColor={getImportanceColor}
                    />
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <p className="text-sm text-gray-600">No crop activities found.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="p-3 bg-gradient-to-r from-purple-50 to-transparent border-t border-purple-100 mt-auto">
            <motion.button 
              className="w-full text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center justify-center gap-1 px-3 py-1.5 rounded-md hover:bg-purple-50/70 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View All Activity</span>
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

// Separate component for each activity item
const ActivityItem = ({ 
  activity, 
  index, 
  isLast,
  isExpanded, 
  onToggleExpand,
  getActivityTypeColor,
  getImportanceColor
}: { 
  activity: Activity, 
  index: number,
  isLast: boolean,
  isExpanded: boolean, 
  onToggleExpand: () => void,
  getActivityTypeColor: (type: string) => string,
  getImportanceColor: (importance?: string) => string
}) => {
  return (
    <motion.div 
      key={activity.id} 
      className={`p-4 hover:bg-purple-50/50 transition-colors relative ${isExpanded ? 'bg-purple-50/30' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ backgroundColor: "rgba(243, 232, 255, 0.5)" }}
      onClick={onToggleExpand}
    >
      {/* Timeline connector */}
      {!isLast && (
        <motion.div 
          className="absolute left-9 top-14 bottom-0 w-0.5 bg-purple-100"
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        ></motion.div>
      )}
      
      <div className="flex gap-3">
        <motion.div 
          className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 flex-shrink-0 relative z-10 border border-purple-200"
          whileHover={{ scale: 1.1, rotate: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="text-xl">{activity.icon}</span>
        </motion.div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-800">{activity.title}</h3>
            <div className="flex items-center gap-1">
              {activity.importance && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${getImportanceColor(activity.importance)} mr-1`}>
                  {activity.importance}
                </span>
              )}
              <span className={`text-xs px-2 py-0.5 rounded-full bg-${getActivityTypeColor(activity.type)}-50 text-${getActivityTypeColor(activity.type)}-700`}>
                {activity.type}
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
          
          <motion.div 
            className="mt-2 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {activity.location && (
              <div className="flex items-center gap-1 mt-1">
                <span className="text-xs text-gray-500">📍 Location:</span>
                <span className="text-xs font-medium text-gray-700">{activity.location}</span>
              </div>
            )}
            
            {activity.relatedItems && activity.relatedItems.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Related Items:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {activity.relatedItems.map((item, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full border border-purple-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-2 flex justify-end">
              <motion.button 
                className="text-xs text-purple-600 hover:text-purple-700 font-medium px-2 py-1 rounded-full hover:bg-purple-50 flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  // This would typically navigate to a details page
                }}
              >
                <span>View Details</span>
                <span>→</span>
              </motion.button>
            </div>
          </motion.div>
          
          <div className="flex items-center mt-2">
            <div className="w-2 h-2 rounded-full bg-purple-300 mr-2"></div>
            <p className="text-xs text-gray-500">{activity.timestamp}</p>
            
            <motion.button 
              className="ml-auto text-xs text-purple-600 hover:text-purple-700 font-medium px-2 py-1 rounded-full hover:bg-purple-50 flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand();
              }}
            >
              <span>{isExpanded ? 'Less' : 'More'}</span>
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isExpanded ? '▲' : '▼'}
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Helper function to get color based on activity type
const getActivityTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'weather':
      return 'blue'
    case 'market':
    case 'purchase':
      return 'amber'
    case 'diagnosis':
      return 'red'
    case 'harvest':
    case 'soil':
      return 'green'
    case 'equipment':
      return 'orange'
    case 'community':
      return 'indigo'
    default:
      return 'purple'
  }
}

export default ActivityFeed