import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Recommendation {
  id: number
  title: string
  description: string
  icon: string
  category: string
  action: string
  link: string
  priority?: 'high' | 'medium' | 'low'
  timeToImplement?: string
  potentialBenefit?: string
}

interface RecommendationCardProps {
    recommendations: Recommendation[]
  }
  
  const RecommendationCard = ({ recommendations }: RecommendationCardProps) => {
    const [activeTab, setActiveTab] = useState('all')
    const [hoveredRecommendation, setHoveredRecommendation] = useState<number | null>(null)
    
    // Filter recommendations by category for tabs
    const marketRecommendations = recommendations.filter(rec => rec.category === 'market')
    const advisoryRecommendations = recommendations.filter(rec => rec.category === 'advisory')
    const inputRecommendations = recommendations.filter(rec => rec.category === 'input')
    
    const getCategoryColor = (category: string) => {
      switch (category) {
        case 'market':
          return 'amber'
        case 'advisory':
          return 'red'
        case 'input':
          return 'green'
        default:
          return 'blue'
      }
    }
    
    const getCategoryBgColor = (category: string) => {
      switch (category) {
        case 'market':
          return 'bg-amber-50'
        case 'advisory':
          return 'bg-red-50'
        case 'input':
          return 'bg-green-50'
        default:
          return 'bg-blue-50'
      }
    }
    
    const getCategoryTextColor = (category: string) => {
      switch (category) {
        case 'market':
          return 'text-amber-700'
        case 'advisory':
          return 'text-red-700'
        case 'input':
          return 'text-green-700'
        default:
          return 'text-blue-700'
      }
    }
    
    const getPriorityColor = (priority?: string) => {
      switch (priority) {
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
      <Card className="overflow-hidden border-blue-100 h-full shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100/30 pt-2">
          <CardHeader className="py-3 flex items-center">
            <div className="flex justify-between items-center w-full">
              <CardTitle className="text-blue-800 flex items-center gap-2">
                <motion.div 
                  className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.05, 1, 1.05, 1] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="text-xl">💡</span>
                </motion.div>
                <span>Personalized Recommendations</span>
              </CardTitle>
              <motion.div 
                className="bg-white shadow-sm rounded-full px-2 py-1 flex items-center text-xs font-medium"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-blue-600">{recommendations.length} suggestions</span>
              </motion.div>
            </div>
          </CardHeader>
          <div className="h-1 bg-gradient-to-r from-blue-100 to-blue-50"></div>
        </div>
        
        <div className="max-h-[calc(100%-60px)] overflow-auto scrollbar-hide">
          <CardContent className="p-0">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="px-4 pt-4">
                <TabsList className="grid grid-cols-4 bg-blue-50/50">
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger 
                    value="market" 
                    className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
                  >
                    Market
                  </TabsTrigger>
                  <TabsTrigger 
                    value="advisory" 
                    className="data-[state=active]:bg-red-100 data-[state=active]:text-red-800"
                  >
                    Advisory
                  </TabsTrigger>
                  <TabsTrigger 
                    value="input" 
                    className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
                  >
                    Input
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <div className="divide-y divide-blue-100">
                  {recommendations.map((recommendation, index) => {
                    const categoryBg = getCategoryBgColor(recommendation.category)
                    const categoryText = getCategoryTextColor(recommendation.category)
                    
                    return (
                      <div 
                        key={recommendation.id} 
                        className="p-4 hover:bg-blue-50/50 transition-colors"
                        onMouseEnter={() => setHoveredRecommendation(recommendation.id)}
                        onMouseLeave={() => setHoveredRecommendation(null)}
                      >
                        <div className="flex gap-3">
                          <div 
                            className={`w-10 h-10 rounded-full ${categoryBg} flex items-center justify-center ${categoryText} flex-shrink-0`}
                          >
                            <span className="text-xl">{recommendation.icon}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-gray-800">{recommendation.title}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${categoryBg} ${categoryText}`}>
                                {recommendation.category}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{recommendation.description}</p>
                            
                            <div className="mt-2">
                              <Link 
                                href={recommendation.link}
                                className={`text-xs ${categoryText} font-medium flex items-center gap-1`}
                              >
                                <span>{recommendation.action}</span>
                                <span>→</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="market" className="mt-0">
                <div className="divide-y divide-amber-100">
                  {marketRecommendations.length > 0 ? (
                    marketRecommendations.map((recommendation, index) => {
                      const categoryBg = getCategoryBgColor(recommendation.category)
                      const categoryText = getCategoryTextColor(recommendation.category)
                      
                      return (
                        <div 
                          key={recommendation.id} 
                          className="p-4 hover:bg-amber-50/50 transition-colors"
                          onMouseEnter={() => setHoveredRecommendation(recommendation.id)}
                          onMouseLeave={() => setHoveredRecommendation(null)}
                        >
                          <div className="flex gap-3">
                            <div 
                              className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-700 flex-shrink-0"
                            >
                              <span className="text-xl">{recommendation.icon}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-800">{recommendation.title}</h3>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                                  market
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{recommendation.description}</p>
                              
                              <div className="mt-2">
                                <Link 
                                  href={recommendation.link}
                                  className="text-xs text-amber-700 font-medium flex items-center gap-1"
                                >
                                  <span>{recommendation.action}</span>
                                  <span>→</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                        <span className="text-3xl">🔍</span>
                      </div>
                      <p className="text-sm text-gray-600">No market recommendations available at the moment.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="advisory" className="mt-0">
                <div className="divide-y divide-red-100">
                  {advisoryRecommendations.length > 0 ? (
                    advisoryRecommendations.map((recommendation, index) => {
                      const categoryBg = getCategoryBgColor(recommendation.category)
                      const categoryText = getCategoryTextColor(recommendation.category)
                      
                      return (
                        <div 
                          key={recommendation.id} 
                          className="p-4 hover:bg-red-50/50 transition-colors"
                          onMouseEnter={() => setHoveredRecommendation(recommendation.id)}
                          onMouseLeave={() => setHoveredRecommendation(null)}
                        >
                          <div className="flex gap-3">
                            <div 
                              className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-700 flex-shrink-0"
                            >
                              <span className="text-xl">{recommendation.icon}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-800">{recommendation.title}</h3>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-700">
                                  advisory
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{recommendation.description}</p>
                              
                              <div className="mt-2">
                                <Link 
                                  href={recommendation.link}
                                  className="text-xs text-red-700 font-medium flex items-center gap-1"
                                >
                                  <span>{recommendation.action}</span>
                                  <span>→</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                        <span className="text-3xl">🔍</span>
                      </div>
                      <p className="text-sm text-gray-600">No advisory recommendations available at the moment.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="input" className="mt-0">
                <div className="divide-y divide-green-100">
                  {inputRecommendations.length > 0 ? (
                    inputRecommendations.map((recommendation, index) => {
                      const categoryBg = getCategoryBgColor(recommendation.category)
                      const categoryText = getCategoryTextColor(recommendation.category)
                      
                      return (
                        <div 
                          key={recommendation.id} 
                          className="p-4 hover:bg-green-50/50 transition-colors"
                          onMouseEnter={() => setHoveredRecommendation(recommendation.id)}
                          onMouseLeave={() => setHoveredRecommendation(null)}
                        >
                          <div className="flex gap-3">
                            <div 
                              className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-700 flex-shrink-0"
                            >
                              <span className="text-xl">{recommendation.icon}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-800">{recommendation.title}</h3>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                                  input
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{recommendation.description}</p>
                              
                              <div className="mt-2">
                                <Link 
                                  href={recommendation.link}
                                  className="text-xs text-green-700 font-medium flex items-center gap-1"
                                >
                                  <span>{recommendation.action}</span>
                                  <span>→</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center text-green-500">
                        <span className="text-3xl">🔍</span>
                      </div>
                      <p className="text-sm text-gray-600">No input recommendations available at the moment.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="p-3 bg-gradient-to-r from-blue-50 to-transparent border-t border-blue-100">
              <motion.button 
                className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-1 px-3 py-1.5 rounded-md hover:bg-blue-50/70 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>View All Recommendations</span>
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
  
  export default RecommendationCard