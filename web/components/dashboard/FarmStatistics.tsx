import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'

interface FarmStatisticsProps {
  farmStatData: {
    cropYield: Array<{ year: string; yield: number }>
    waterUsage: Array<{ month: string; usage: number }>
    soilHealth: {
      nitrogen: number
      phosphorus: number
      potassium: number
      organic: number
    }
  }
}

const FarmStatistics = ({ farmStatData }: FarmStatisticsProps) => {
  const [activeTab, setActiveTab] = useState('yield')
  
  // Convert soil health data to array format for charts
  const soilHealthData = Object.entries(farmStatData.soilHealth).map(([key, value]) => {
    let color = ''
    let label = ''
    
    switch(key) {
      case 'nitrogen':
        color = '#3b82f6' // blue
        label = 'Nitrogen (N)'
        break
      case 'phosphorus':
        color = '#eab308' // yellow
        label = 'Phosphorus (P)'
        break
      case 'potassium':
        color = '#a855f7' // purple
        label = 'Potassium (K)'
        break
      case 'organic':
        color = '#22c55e' // green
        label = 'Organic Matter'
        break
    }
    
    return {
      name: key,
      value,
      color,
      label,
      fullMark: 100
    }
  })
  
  // Calculate average yield
  const avgYield = farmStatData.cropYield.reduce((acc, item) => acc + item.yield, 0) / farmStatData.cropYield.length
  
  // Calculate total water usage
  const totalWaterUsage = farmStatData.waterUsage.reduce((acc, item) => acc + item.usage, 0)
  
  // Calculate soil health score (average of all values)
  const soilHealthScore = Object.values(farmStatData.soilHealth).reduce((acc, val) => acc + val, 0) / 
                          Object.values(farmStatData.soilHealth).length
  
  return (
    <Card className="py-0 overflow-hidden border-indigo-100 h-[700px] shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="bg-gradient-to-r from-indigo-50 to-indigo-100/30 pt-2">
        <CardHeader className="py-3 flex items-center">
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-indigo-800 flex items-center gap-2">
              <motion.div 
                className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center"
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.05, 1, 1.05, 1] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-xl">📊</span>
              </motion.div>
              <span>Farm Statistics</span>
            </CardTitle>
            <div className="flex items-center gap-2">
              <motion.div 
                className="bg-indigo-100 text-indigo-800 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-indigo-500">🌾</span>
                <span>Farm Health: {soilHealthScore.toFixed(1)}%</span>
              </motion.div>
            </div>
          </div>
        </CardHeader>
        <div className="h-1 bg-gradient-to-r from-indigo-100 to-indigo-50"></div>
      </div>
      
      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <div className="space-y-4">
          <Tabs defaultValue="yield" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 bg-indigo-50/50 p-1 rounded-lg">
              <TabsTrigger 
                value="yield" 
                className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm rounded-md"
              >
                <div className="flex items-center gap-1.5">
                  <motion.span 
                    className="text-sm"
                    animate={activeTab === 'yield' ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    🌾
                  </motion.span>
                  <span>Crop Yield</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="water" 
                className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm rounded-md"
              >
                <div className="flex items-center gap-1.5">
                  <motion.span 
                    className="text-sm"
                    animate={activeTab === 'water' ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    💧
                  </motion.span>
                  <span>Water Usage</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="soil" 
                className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm rounded-md"
              >
                <div className="flex items-center gap-1.5">
                  <motion.span 
                    className="text-sm"
                    animate={activeTab === 'soil' ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    🌱
                  </motion.span>
                  <span>Soil Health</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-50">
              <TabsContent value="yield" className="mt-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Annual Crop Yield</h3>
                      <p className="text-xs text-gray-500">Measured in quintals per acre</p>
                    </div>
                    <motion.div 
                      className="bg-indigo-50 rounded-full px-3 py-1 flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-indigo-600 text-xs font-medium">Avg: {avgYield.toFixed(1)}</span>
                      <motion.span 
                        className="text-indigo-500"
                        animate={{ rotate: [0, 10, 0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        📈
                      </motion.span>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="h-52"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={farmStatData.cropYield}
                        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient id="yieldGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0.2} />
                          </linearGradient>
                          <filter id="yieldShadow" height="200%" width="200%" x="-50%" y="-50%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feFlood floodColor="rgba(99, 102, 241, 0.3)" result="color"/>
                            <feComposite in="color" in2="blur" operator="in" result="shadow"/>
                            <feMerge>
                              <feMergeNode in="shadow"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f9ff" />
                        <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                        <YAxis 
                          tick={{ fontSize: 12 }} 
                          stroke="#94a3b8"
                          label={{ value: 'Quintals/Acre', position: 'insideLeft', angle: -90, dy: 40, fontSize: 12, fill: '#94a3b8' }}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value} quintals/acre`, 'Yield']}
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            borderRadius: '8px', 
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                          }}
                          cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                          animationDuration={300}
                        />
                                           <Bar 
                          dataKey="yield" 
                          fill="url(#yieldGradient)" 
                          stroke="#6366f1"
                          strokeWidth={1}
                          radius={[4, 4, 0, 0]}
                          barSize={30}
                          animationDuration={1500}
                          animationEasing="ease-out"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <motion.div 
                      className="bg-indigo-50/50 p-2 rounded-lg border border-indigo-100/50 flex items-center justify-between"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(224, 231, 255, 0.6)" }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                          <span className="text-sm">🌱</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Best Year</p>
                          <p className="text-sm font-medium text-gray-700">2022</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-indigo-600">32.5</span>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-indigo-50/50 p-2 rounded-lg border border-indigo-100/50 flex items-center justify-between"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(224, 231, 255, 0.6)" }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                          <span className="text-sm">📈</span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Growth</p>
                          <p className="text-sm font-medium text-gray-700">Year-on-Year</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-green-600">+8.2%</span>
                    </motion.div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="water" className="mt-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Monthly Water Usage</h3>
                      <p className="text-xs text-gray-500">Measured in kiloliters</p>
                    </div>
                    <motion.div 
                      className="bg-blue-50 rounded-full px-3 py-1 flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-blue-600 text-xs font-medium">Total: {totalWaterUsage.toFixed(0)} KL</span>
                      <motion.span 
                        className="text-blue-500"
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        💧
                      </motion.span>
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    className="h-52"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={farmStatData.waterUsage}
                        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                      >
                        <defs>
                          <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                          </linearGradient>
                          <filter id="waterShadow" height="200%" width="200%" x="-50%" y="-50%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feFlood floodColor="rgba(59, 130, 246, 0.3)" result="color"/>
                            <feComposite in="color" in2="blur" operator="in" result="shadow"/>
                            <feMerge>
                              <feMergeNode in="shadow"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f9ff" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                        <YAxis 
                          tick={{ fontSize: 12 }} 
                          stroke="#94a3b8"
                          label={{ value: 'Kiloliters', position: 'insideLeft', angle: -90, dy: 40, fontSize: 12, fill: '#94a3b8' }}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value} KL`, 'Water Usage']}
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            borderRadius: '8px', 
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                          }}
                          cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '5 5' }}
                          animationDuration={300}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="usage" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                          activeDot={{ r: 6, fill: '#3b82f6', stroke: 'white', strokeWidth: 2, filter: 'url(#waterShadow)' }}
                          isAnimationActive={true}
                          animationDuration={1500}
                          animationEasing="ease-out"
                          fill="url(#waterGradient)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <motion.div 
                      className="bg-blue-50/50 p-2 rounded-lg border border-blue-100/50 flex flex-col items-center justify-center"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(219, 234, 254, 0.6)" }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    >
                      <span className="text-xs text-gray-500">Peak Month</span>
                      <div className="flex items-center gap-1 mt-1">
                        <motion.span 
                          className="text-blue-500"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >💧</motion.span>
                        <span className="text-sm font-medium text-gray-700">July</span>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-blue-50/50 p-2 rounded-lg border border-blue-100/50 flex flex-col items-center justify-center"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(219, 234, 254, 0.6)" }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
                    >
                      <span className="text-xs text-gray-500">Efficiency</span>
                      <div className="flex items-center gap-1 mt-1">
                        <motion.span 
                          className="text-green-500"
                          animate={{ rotate: [0, 10, 0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >✅</motion.span>
                        <span className="text-sm font-medium text-gray-700">Good</span>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-blue-50/50 p-2 rounded-lg border border-blue-100/50 flex flex-col items-center justify-center"
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(219, 234, 254, 0.6)" }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                    >
                      <span className="text-xs text-gray-500">Savings</span>
                      <div className="flex items-center gap-1 mt-1">
                        <motion.span 
                          className="text-amber-500"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >⚡</motion.span>
                        <span className="text-sm font-medium text-gray-700">12%</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="soil" className="mt-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Soil Health Analysis</h3>
                      <p className="text-xs text-gray-500">Nutrient composition percentage</p>
                    </div>
                    <motion.div 
                      className="bg-green-50 rounded-full px-3 py-1 flex items-center gap-1"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-green-600 text-xs font-medium">Health: {soilHealthScore.toFixed(1)}%</span>
                      <motion.span 
                        className="text-green-500"
                        animate={{ rotate: [0, 10, 0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        🌱
                      </motion.span>
                    </motion.div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                      className="h-52"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <defs>
                            {soilHealthData.map((entry, index) => (
                              <filter key={`glow-${index}`} id={`glow-${index}`} height="130%" width="130%">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                <feMerge>
                                  <feMergeNode in="coloredBlur"/>
                                  <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                              </filter>
                            ))}
                          </defs>
                          <Pie
                            data={soilHealthData}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={60}
                            paddingAngle={5}
                            dataKey="value"
                            labelLine={false}
                            label={({ name, value, cx, cy, midAngle, innerRadius, outerRadius }) => {
                              const RADIAN = Math.PI / 180;
                              const radius = 25 + innerRadius + (outerRadius - innerRadius);
                              const x = cx + radius * Math.cos(-midAngle * RADIAN);
                              const y = cy + radius * Math.sin(-midAngle * RADIAN);
                              
                              return (
                                <text 
                                  x={x} 
                                  y={y} 
                                  fill="#374151" 
                                  textAnchor={x > cx ? 'start' : 'end'} 
                                  dominantBaseline="central"
                                  className="text-xs font-medium"
                                >
                                  {`${value}%`}
                                </text>
                              );
                            }}
                            animationBegin={0}
                            animationDuration={1200}
                            animationEasing="ease-out"
                          >
                            {soilHealthData.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={entry.color} 
                                stroke="#fff" 
                                strokeWidth={2}
                                filter={`url(#glow-${index})`}
                              />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Composition']}
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              borderRadius: '8px', 
                              border: '1px solid #e2e8f0',
                              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }}
                            animationDuration={300}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </motion.div>
                    
                    <motion.div 
                      className="h-52"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={soilHealthData}>
                          <PolarGrid stroke="#e2e8f0" />
                          <PolarAngleAxis dataKey="label" tick={{ fill: '#64748b', fontSize: 10 }} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                          <Radar 
                            name="Soil Composition" 
                            dataKey="value" 
                            stroke="#10b981" 
                            fill="#10b981" 
                            fillOpacity={0.5}
                            animationBegin={0}
                            animationDuration={1200}
                            animationEasing="ease-out"
                          />
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Composition']}
                            contentStyle={{ 
                              backgroundColor: 'white', 
                              borderRadius: '8px', 
                              border: '1px solid #e2e8f0',
                              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                            }}
                            animationDuration={300}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    {soilHealthData.map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-green-50/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-2">
                          <motion.div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                            whileHover={{ scale: 1.5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                          ></motion.div>
                          <span className="text-sm text-gray-700">{item.label}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-24 h-3 bg-gray-100 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full rounded-full"
                              style={{ backgroundColor: item.color }}
                              initial={{ width: 0 }}
                              animate={{ width: `${item.value}%` }}
                              transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                            ></motion.div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700">{item.value}%</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        <div className="mt-auto pt-4 border-t border-indigo-100">
          <motion.button 
            className="w-full text-sm text-indigo-600 hover:text-indigo-700 font-medium px-3 py-2 rounded-md hover:bg-indigo-50/70 transition-colors flex items-center justify-center gap-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View Detailed Farm Analysis 
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >→</motion.span>
          </motion.button>
        </div>
      </CardContent>
    </Card>
  )
}

export default FarmStatistics