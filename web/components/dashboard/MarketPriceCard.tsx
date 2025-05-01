import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface MarketPriceCardProps {
  marketData: Array<{
    date: string
    wheat: number
    rice: number
    maize: number
  }>
}

const MarketPriceCard = ({ marketData }: MarketPriceCardProps) => {
  const [timeRange, setTimeRange] = useState('6m')
  const [hoveredCrop, setHoveredCrop] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('chart')
  
  // Get latest prices
  const latestData = marketData[marketData.length - 1]
  
  // Calculate trends (comparing with data from 3 positions back)
  const previousData = marketData[marketData.length - 4] || marketData[0]
  const trends = {
    wheat: {
      change: latestData.wheat - previousData.wheat,
      percentage: ((latestData.wheat - previousData.wheat) / previousData.wheat * 100).toFixed(1)
    },
    rice: {
      change: latestData.rice - previousData.rice,
      percentage: ((latestData.rice - previousData.rice) / previousData.rice * 100).toFixed(1)
    },
    maize: {
      change: latestData.maize - previousData.maize,
      percentage: ((latestData.maize - previousData.maize) / previousData.maize * 100).toFixed(1)
    }
  }

  // Sample market data for nearby mandis
  const nearbyMandis = [
    { name: 'Sonipat Mandi', distance: '12 km', wheat: latestData.wheat + 50, rice: latestData.rice - 20, maize: latestData.maize + 30 },
    { name: 'Panipat Mandi', distance: '28 km', wheat: latestData.wheat - 30, rice: latestData.rice + 40, maize: latestData.maize - 10 },
    { name: 'Karnal Mandi', distance: '45 km', wheat: latestData.wheat + 20, rice: latestData.rice + 10, maize: latestData.maize + 50 },
  ]
  
  return (
    <Card className="overflow-hidden border-amber-100 h-full shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="bg-gradient-to-r from-amber-50 to-amber-100/30 pt-2">
        <CardHeader className="py-3 flex items-center">
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-amber-800 flex items-center gap-2">
              <motion.div 
                className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center"
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.05, 1, 1.05, 1] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-xl">💰</span>
              </motion.div>
              <span>Market Prices</span>
            </CardTitle>
            <div className="flex items-center gap-2">
              <motion.div 
                className="bg-white shadow-sm rounded-full p-1 flex items-center text-xs font-medium"
                whileHover={{ scale: 1.02 }}
              >
                <button 
                  className={`px-3 py-1 rounded-full transition-colors ${timeRange === '6m' ? 'bg-amber-100 text-amber-800' : 'text-gray-600 hover:bg-amber-50'}`}
                  onClick={() => setTimeRange('6m')}
                >
                  6M
                </button>
                <button 
                  className={`px-3 py-1 rounded-full transition-colors ${timeRange === '1y' ? 'bg-amber-100 text-amber-800' : 'text-gray-600 hover:bg-amber-50'}`}
                  onClick={() => setTimeRange('1y')}
                >
                  1Y
                </button>
                <button 
                  className={`px-3 py-1 rounded-full transition-colors ${timeRange === '3y' ? 'bg-amber-100 text-amber-800' : 'text-gray-600 hover:bg-amber-50'}`}
                  onClick={() => setTimeRange('3y')}
                >
                  3Y
                </button>
              </motion.div>
            </div>
          </div>
        </CardHeader>
        <div className="h-1 bg-gradient-to-r from-amber-100 to-amber-50"></div>
      </div>
      
      <div className="max-h-[calc(100%-60px)] overflow-auto scrollbar-hide">
        <CardContent className="p-4 flex-grow flex flex-col">
          <Tabs defaultValue="chart" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 bg-amber-50/50">
              <TabsTrigger 
                value="chart" 
                className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
              >
                Price Chart
              </TabsTrigger>
              <TabsTrigger 
                value="trends" 
                className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
              >
                Price Trends
              </TabsTrigger>
              <TabsTrigger 
                value="mandis" 
                className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800"
              >
                Nearby Mandis
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chart" className="mt-0 space-y-6">
              <motion.div 
                className="h-64"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={marketData}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="wheatGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="riceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="maizeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ea580c" stopOpacity={0} />
                      </linearGradient>
                      <filter id="shadow" height="200%" width="200%" x="-50%" y="-50%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feFlood floodColor="rgba(234, 179, 8, 0.3)" result="color"/>
                        <feComposite in="color" in2="blur" operator="in" result="shadow"/>
                        <feMerge>
                          <feMergeNode in="shadow"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#a8a29e" />
                    <YAxis 
                      tick={{ fontSize: 12 }} 
                      stroke="#a8a29e"
                      domain={[1500, 2500]}
                      label={{ value: '₹/Quintal', position: 'insideLeft', angle: -90, dy: 40, fontSize: 12, fill: '#a8a29e' }}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${value}/quintal`, '']}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '8px', 
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                      }}
                      animationDuration={300}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '10px' }}
                      iconType="circle"
                      onMouseEnter={(e) => setHoveredCrop(e.dataKey as string)}
                      onMouseLeave={() => setHoveredCrop(null)}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="wheat" 
                      stroke="#eab308" 
                      strokeWidth={hoveredCrop === 'wheat' ? 4 : 2}
                      dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                      activeDot={{ r: 6, fill: '#eab308', stroke: 'white', strokeWidth: 2, filter: 'url(#shadow)' }}
                      isAnimationActive={true}
                      animationDuration={1500}
                      animationEasing="ease-out"
                      fill="url(#wheatGradient)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="rice" 
                      stroke="#16a34a" 
                      strokeWidth={hoveredCrop === 'rice' ? 4 : 2}
                      dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                      activeDot={{ r: 6, fill: '#16a34a', stroke: 'white', strokeWidth: 2 }}
                      isAnimationActive={true}
                      animationDuration={1500}
                      animationEasing="ease-out"
                      animationBegin={300}
                      fill="url(#riceGradient)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="maize" 
                      stroke="#ea580c" 
                      strokeWidth={hoveredCrop === 'maize' ? 4 : 2}
                      dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                      activeDot={{ r: 6, fill: '#ea580c', stroke: 'white', strokeWidth: 2 }}
                      isAnimationActive={true}
                      animationDuration={1500}
                      animationEasing="ease-out"
                      animationBegin={600}
                      fill="url(#maizeGradient)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
              
              <motion.div 
                className="bg-amber-50/50 rounded-lg p-3 border border-amber-100/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-xs">📈</span>
                    </motion.div>
                    <span className="text-xs font-medium text-gray-700">Market Insights</span>
                  </div>
                  <span className="text-xs text-amber-600 bg-white px-2 py-0.5 rounded-full">Updated Today</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Wheat prices have shown a significant increase of {trends.wheat.percentage}% in the last quarter due to reduced supply. 
                  Rice remains stable with a slight {trends.rice.percentage}% change, while maize has increased by {trends.maize.percentage}%.
                </p>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="trends" className="mt-0">
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-amber-50 to-amber-100/30 rounded-lg border border-amber-100 shadow-sm"
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(234, 179, 8, 0.15)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span className="text-xs font-medium text-gray-700">Wheat</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-800">₹{latestData.wheat}</span>
                      <motion.span 
                        className={`text-xs ${Number(trends.wheat.percentage) >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center gap-0.5 bg-white/80 px-1.5 py-0.5 rounded-full`}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <span>{Number(trends.wheat.percentage) >= 0 ? '↑' : '↓'}</span>
                        <span>{Math.abs(Number(trends.wheat.percentage))}%</span>
                      </motion.span>
                    </div>
                    <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-amber-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5 }}
                      ></motion.div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>Last Month: ₹{previousData.wheat}</span>
                      <span>Change: ₹{trends.wheat.change}</span>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-green-50 to-green-100/30 rounded-lg border border-green-100 shadow-sm"
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(22, 163, 74, 0.15)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-xs font-medium text-gray-700">Rice</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-800">₹{latestData.rice}</span>
                      <motion.span 
                        className={`text-xs ${Number(trends.rice.percentage) >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center gap-0.5 bg-white/80 px-1.5 py-0.5 rounded-full`}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                      >
                        <span>{Number(trends.rice.percentage) >= 0 ? '↑' : '↓'}</span>
                        <span>{Math.abs(Number(trends.rice.percentage))}%</span>
                      </motion.span>
                    </div>
                    <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-green-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                      ></motion.div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>Last Month: ₹{previousData.rice}</span>
                      <span>Change: ₹{trends.rice.change}</span>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="p-3 bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-lg border border-orange-100 shadow-sm"
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(234, 88, 12, 0.15)" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span className="text-xs font-medium text-gray-700">Maize</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-800">₹{latestData.maize}</span>
                      <motion.span 
                        className={`text-xs ${Number(trends.maize.percentage) >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center gap-0.5 bg-white/80 px-1.5 py-0.5 rounded-full`}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                      >
                        <span>{Number(trends.maize.percentage) >= 0 ? '↑' : '↓'}</span>
                        <span>{Math.abs(Number(trends.maize.percentage))}%</span>
                      </motion.span>
                    </div>
                    <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-orange-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 1.5, delay: 0.4 }}
                      ></motion.div>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>Last Month: ₹{previousData.maize}</span>
                      <span>Change: ₹{trends.maize.change}</span>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div 
                  className="bg-amber-50/50 rounded-lg p-4 border border-amber-100/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <h3 className="text-sm font-medium text-amber-800 mb-2">Price Forecast</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                        <span className="text-xs">🌾</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-700">Wheat</p>
                        <p className="text-xs text-gray-600">Expected to rise by 5-8% in the next month due to reduced supply.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <span className="text-xs">🌾</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-700">Rice</p>
                        <p className="text-xs text-gray-600">Prices expected to remain stable with minimal fluctuations.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <span className="text-xs">🌽</span>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-700">Maize</p>
                        <p className="text-xs text-gray-600">Likely to see a moderate increase of 3-4% due to seasonal demand.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
            
            <TabsContent value="mandis" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-amber-800">Nearby Mandis</h3>
                  <span className="text-xs text-amber-600 bg-white px-2 py-0.5 rounded-full">Within 50km</span>
                </div>
                
                {nearbyMandis.map((mandi, index) => (
                  <motion.div 
                    key={index}
                    className="p-3 bg-white rounded-lg border border-amber-100 shadow-sm"
                    whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(234, 179, 8, 0.1)" }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                          <span className="text-xs">🏪</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{mandi.name}</p>
                          <p className="text-xs text-gray-500">{mandi.distance} away</p>
                        </div>
                      </div>
                      <motion.button 
                        className="text-xs text-amber-600 hover:text-amber-700 font-medium px-2 py-1 rounded-full hover:bg-amber-50/70 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Directions
                      </motion.button>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      <div className="p-2 bg-amber-50 rounded-md">
                        <p className="text-xs text-gray-500">Wheat</p>
                        <p className="text-sm font-medium text-gray-800">₹{mandi.wheat}</p>
                        <p className="text-xs text-gray-500">
                          {mandi.wheat > latestData.wheat ? 
                            <span className="text-green-600">+₹{mandi.wheat - latestData.wheat}</span> : 
                            <span className="text-red-600">-₹{latestData.wheat - mandi.wheat}</span>
                          }
                        </p>
                      </div>
                      <div className="p-2 bg-green-50 rounded-md">
                        <p className="text-xs text-gray-500">Rice</p>
                        <p className="text-sm font-medium text-gray-800">₹{mandi.rice}</p>
                        <p className="text-xs text-gray-500">
                          {mandi.rice > latestData.rice ? 
                            <span className="text-green-600">+₹{mandi.rice - latestData.rice}</span> : 
                            <span className="text-red-600">-₹{latestData.rice - mandi.rice}</span>
                          }
                        </p>
                      </div>
                      <div className="p-2 bg-orange-50 rounded-md">
                        <p className="text-xs text-gray-500">Maize</p>
                        <p className="text-sm font-medium text-gray-800">₹{mandi.maize}</p>
                        <p className="text-xs text-gray-500">
                          {mandi.maize > latestData.maize ? 
                            <span className="text-green-600">+₹{mandi.maize - latestData.maize}</span> : 
                            <span className="text-red-600">-₹{latestData.maize - mandi.maize}</span>
                          }
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <motion.div 
                  className="mt-4 p-3 bg-amber-50/50 rounded-lg border border-amber-100/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <span className="text-xs">💡</span>
                    </div>
                    <p className="text-xs font-medium text-gray-700">Mandi Tip</p>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Prices at Sonipat Mandi are currently higher for wheat. Consider selling your wheat crop there for maximum profit.
                  </p>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-auto pt-4 border-t border-amber-100 flex justify-between">
            <motion.button 
              className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-amber-50/70 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View All Crops</span>
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >→</motion.span>
            </motion.button>
            <motion.button 
              className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-amber-50/70 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Nearby Mandis</span>
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

export default MarketPriceCard