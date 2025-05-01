import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { motion } from 'framer-motion'

interface CropHealthItem {
  name: string
  value: number
  color: string
}

interface CropHealthCardProps {
  cropHealthData: CropHealthItem[]
}

const CropHealthCard = ({ cropHealthData }: CropHealthCardProps) => {
  const totalHealth = cropHealthData.reduce((acc, item) => acc + item.value, 0) / cropHealthData.length;
  
  return (
    <Card className="overflow-hidden border-green-100 h-[600px] shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="bg-gradient-to-r from-green-50 to-green-100/30 pt-2">
        <CardHeader className="py-3 flex items-center">
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-green-800 flex items-center gap-2">
              <motion.div 
                className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1] 
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <span className="text-xl">🌱</span>
              </motion.div>
              <span>Crop Health</span>
            </CardTitle>
            <motion.div 
              className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-green-500">📊</span>
              <span>Overall: {totalHealth.toFixed(1)}%</span>
            </motion.div>
          </div>
        </CardHeader>
        <div className="h-1 bg-gradient-to-r from-green-100 to-green-50"></div>
      </div>
      
      <CardContent className="p-4 flex-grow flex flex-col justify-between">
        <div className="space-y-6">
          <motion.div 
            className="h-52 mt-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <defs>
                  {cropHealthData.map((entry, index) => (
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
                  data={cropHealthData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  labelLine={false}
                  label={({ name, value, cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
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
                  {cropHealthData.map((entry, index) => (
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
                  formatter={(value) => [`${value}%`, 'Health Score']}
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
          
          <div className="space-y-2">
            {cropHealthData.map((crop, index) => (
              <motion.div 
                key={index} 
                className="flex items-center justify-between p-2 rounded-lg hover:bg-green-50/50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: crop.color }}
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  ></motion.div>
                  <span className="text-sm text-gray-700">{crop.name}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-24 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full rounded-full"
                      style={{ backgroundColor: crop.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${crop.value}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    ></motion.div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">{crop.value}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-green-100">
          <motion.button 
            className="w-full text-sm text-green-600 hover:text-green-700 font-medium flex items-center justify-center gap-1 py-2 rounded-md hover:bg-green-50/70 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View Detailed Report</span>
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

export default CropHealthCard