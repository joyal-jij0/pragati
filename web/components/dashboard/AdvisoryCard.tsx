import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Advisory } from '@/types/advisory'

interface AdvisoryCardProps {
  advisories: Advisory[]
}

const AdvisoryCard = ({ advisories }: AdvisoryCardProps) => {
  const [activeTab, setActiveTab] = useState('all')
  const [expandedAdvisory, setExpandedAdvisory] = useState<number | null>(null)
  
  // Filter advisories by severity for tabs
  const highPriorityAdvisories = advisories.filter(adv => adv.severity === 'high')
  const mediumPriorityAdvisories = advisories.filter(adv => adv.severity === 'medium')
  const lowPriorityAdvisories = advisories.filter(adv => adv.severity === 'low')
  
  const getSeverityColor = (severity?: string) => {
    switch (severity) {
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
  
  const getSeverityIcon = (severity?: string) => {
    switch (severity) {
      case 'high':
        return '🔴'
      case 'medium':
        return '🟠'
      case 'low':
        return '🟢'
      default:
        return '🔵'
    }
  }

  return (
    <Card className="py-0 overflow-hidden border-red-100 h-full shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="bg-gradient-to-r from-red-50 to-red-100/30 pt-2">
        <CardHeader className="py-3 flex items-center">
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-red-800 flex items-center gap-2">
              <motion.div 
                className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center"
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5 }}
              >
                <span className="text-xl">⚠️</span>
              </motion.div>
              <span>Alerts & Advisories</span>
            </CardTitle>
            <motion.div 
              className="text-xs text-red-600 bg-red-100/50 px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-red-500">🔔</span>
              <span>{advisories.length} Alerts</span>
            </motion.div>
          </div>
        </CardHeader>
        <div className="h-1 bg-gradient-to-r from-red-100 to-red-50"></div>
      </div>
      
      <div className="max-h-[calc(100%-60px)] overflow-auto scrollbar-hide">
        <CardContent className="p-0 flex-grow flex flex-col">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="px-4 pt-4">
              <TabsList className="grid grid-cols-4 bg-red-50/50">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-red-100 data-[state=active]:text-red-800"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="high" 
                  className="data-[state=active]:bg-red-100 data-[state=active]:text-red-800"
                >
                  <span className="flex items-center gap-1">
                    <span>High</span>
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="medium" 
                  className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
                >
                  <span className="flex items-center gap-1">
                    <span>Medium</span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  </span>
                </TabsTrigger>
                <TabsTrigger 
                  value="low" 
                  className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
                >
                  <span className="flex items-center gap-1">
                    <span>Low</span>
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-0">
              <div className="divide-y divide-red-100">
                {advisories.map((advisory, index) => (
                  <AdvisoryItem 
                    key={advisory.id}
                    advisory={advisory}
                    index={index}
                    isExpanded={expandedAdvisory === advisory.id}
                    onToggleExpand={() => setExpandedAdvisory(expandedAdvisory === advisory.id ? null : advisory.id)}
                    getSeverityColor={getSeverityColor}
                    getSeverityIcon={getSeverityIcon}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="high" className="mt-0">
              <div className="divide-y divide-red-100">
                {highPriorityAdvisories.length > 0 ? (
                  highPriorityAdvisories.map((advisory, index) => (
                    <AdvisoryItem 
                      key={advisory.id}
                      advisory={advisory}
                      index={index}
                      isExpanded={expandedAdvisory === advisory.id}
                      onToggleExpand={() => setExpandedAdvisory(expandedAdvisory === advisory.id ? null : advisory.id)}
                      getSeverityColor={getSeverityColor}
                      getSeverityIcon={getSeverityIcon}
                    />
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <p className="text-sm text-gray-600">No high priority alerts at the moment.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="medium" className="mt-0">
              <div className="divide-y divide-amber-100">
                {mediumPriorityAdvisories.length > 0 ? (
                  mediumPriorityAdvisories.map((advisory, index) => (
                    <AdvisoryItem 
                      key={advisory.id}
                      advisory={advisory}
                      index={index}
                      isExpanded={expandedAdvisory === advisory.id}
                      onToggleExpand={() => setExpandedAdvisory(expandedAdvisory === advisory.id ? null : advisory.id)}
                      getSeverityColor={getSeverityColor}
                      getSeverityIcon={getSeverityIcon}
                    />
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <p className="text-sm text-gray-600">No medium priority alerts at the moment.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="low" className="mt-0">
              <div className="divide-y divide-green-100">
                {lowPriorityAdvisories.length > 0 ? (
                  lowPriorityAdvisories.map((advisory, index) => (
                    <AdvisoryItem 
                      key={advisory.id}
                      advisory={advisory}
                      index={index}
                      isExpanded={expandedAdvisory === advisory.id}
                      onToggleExpand={() => setExpandedAdvisory(expandedAdvisory === advisory.id ? null : advisory.id)}
                      getSeverityColor={getSeverityColor}
                      getSeverityIcon={getSeverityIcon}
                    />
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                      <span className="text-3xl">🔍</span>
                    </div>
                    <p className="text-sm text-gray-600">No low priority alerts at the moment.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="p-3 bg-gradient-to-r from-red-50 to-transparent border-t border-red-100 mt-auto">
            <motion.button 
              className="w-full text-sm text-red-600 hover:text-red-700 font-medium flex items-center justify-center gap-1 py-2 rounded-md hover:bg-red-50/70 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View All Advisories</span>
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

// Separate component for each advisory item
const AdvisoryItem = ({ 
  advisory, 
  index, 
  isExpanded, 
  onToggleExpand,
  getSeverityColor,
  getSeverityIcon
}: { 
  advisory: Advisory, 
  index: number, 
  isExpanded: boolean, 
  onToggleExpand: () => void,
  getSeverityColor: (severity?: string) => string,
  getSeverityIcon: (severity?: string) => string
}) => {
  return (
    <motion.div 
      key={advisory.id} 
      className={`p-4 hover:bg-red-50/50 transition-colors ${isExpanded ? 'bg-red-50/30' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onClick={onToggleExpand}
    >
      <div className="flex gap-3">
        <motion.div 
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0`}
          style={{ 
            backgroundColor: `var(--${advisory.color}-100, #fee2e2)`,
            color: `var(--${advisory.color}-500, #ef4444)`
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="text-xl">{advisory.icon}</span>
        </motion.div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-800">{advisory.title}</h3>
            {advisory.severity && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor(advisory.severity)} flex items-center gap-1`}>
                <span>{getSeverityIcon(advisory.severity)}</span>
                <span className="capitalize">{advisory.severity}</span>
              </span>
            )}
          </div>
          <p className="text-xs text-gray-600 mt-1">{advisory.description}</p>
          <p className="text-xs text-gray-500 italic mt-1">{advisory.translation}</p>
          
          <motion.div 
            className="mt-2 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          >
            {advisory.actionRequired && (
              <div className="mt-2 p-2 bg-red-50 rounded-md border border-red-100">
                <p className="text-xs font-medium text-red-700">Action Required:</p>
                <p className="text-xs text-gray-700">{advisory.actionRequired}</p>
              </div>
            )}
            
            {advisory.source && (
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-500">Source: {advisory.source}</span>
              </div>
            )}
          </motion.div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">{advisory.timestamp}</span>
            <motion.button 
              className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded-full hover:bg-red-50 flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand();
              }}
            >
              <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
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

export default AdvisoryCard