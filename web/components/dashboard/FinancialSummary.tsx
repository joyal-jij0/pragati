import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface FinancialSummaryProps {
  financialData: Array<{
    month: string
    income: number
    expenses: number
  }>
}

const FinancialSummary = ({ financialData }: FinancialSummaryProps) => {
  // Calculate totals
  const totalIncome = financialData.reduce((sum, item) => sum + item.income, 0)
  const totalExpenses = financialData.reduce((sum, item) => sum + item.expenses, 0)
  const profit = totalIncome - totalExpenses
  const profitMargin = (profit / totalIncome) * 100
  
  const [activeTab, setActiveTab] = useState('overview')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState('6m')
  
  // Sample expense breakdown data
  const expenseBreakdown = [
    { category: 'Seeds', amount: totalExpenses * 0.25, color: '#f97316' },
    { category: 'Fertilizers', amount: totalExpenses * 0.30, color: '#84cc16' },
    { category: 'Labor', amount: totalExpenses * 0.20, color: '#06b6d4' },
    { category: 'Equipment', amount: totalExpenses * 0.15, color: '#8b5cf6' },
    { category: 'Others', amount: totalExpenses * 0.10, color: '#ec4899' },
  ]
  
  // Sample income sources data
  const incomeBreakdown = [
    { source: 'Wheat', amount: totalIncome * 0.40, color: '#eab308' },
    { source: 'Rice', amount: totalIncome * 0.35, color: '#16a34a' },
    { source: 'Maize', amount: totalIncome * 0.15, color: '#ea580c' },
    { source: 'Others', amount: totalIncome * 0.10, color: '#6366f1' },
  ]

  return (
    <Card className="py-0 overflow-hidden border-green-100 h-full shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
      <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/30 pt-2">
        <CardHeader className="py-3 flex items-center">
          <div className="flex justify-between items-center w-full">
            <CardTitle className="text-emerald-800 flex items-center gap-2">
              <motion.div 
                className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center"
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.05, 1, 1.05, 1] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-xl">💰</span>
              </motion.div>
              <span>Financial Summary</span>
            </CardTitle>
            <div className="flex items-center gap-2">
              <motion.div 
                className="bg-white shadow-sm rounded-full p-1 flex items-center text-xs font-medium"
                whileHover={{ scale: 1.02 }}
              >
                <button 
                  className={`px-3 py-1 rounded-full transition-colors ${timeRange === '6m' ? 'bg-emerald-100 text-emerald-800' : 'text-gray-600 hover:bg-emerald-50'}`}
                  onClick={() => setTimeRange('6m')}
                >
                  6M
                </button>
                <button 
                  className={`px-3 py-1 rounded-full transition-colors ${timeRange === '1y' ? 'bg-emerald-100 text-emerald-800' : 'text-gray-600 hover:bg-emerald-50'}`}
                  onClick={() => setTimeRange('1y')}
                >
                  1Y
                </button>
                <button 
                  className={`px-3 py-1 rounded-full transition-colors ${timeRange === '3y' ? 'bg-emerald-100 text-emerald-800' : 'text-gray-600 hover:bg-emerald-50'}`}
                  onClick={() => setTimeRange('3y')}
                >
                  3Y
                </button>
              </motion.div>
            </div>
          </div>
        </CardHeader>
        <div className="h-1 bg-gradient-to-r from-emerald-100 to-emerald-50"></div>
      </div>
      
      <div className="max-h-[calc(100%-60px)] overflow-auto scrollbar-hide">
        <CardContent className="p-4 flex-grow flex flex-col">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 bg-emerald-50/50">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="expenses" 
                className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800"
              >
                Expenses
              </TabsTrigger>
              <TabsTrigger 
                value="income" 
                className="data-[state=active]:bg-emerald-100 data-[state=active]:text-emerald-800"
              >
                Income
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <motion.div 
                  className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100/30 rounded-lg border border-emerald-100 shadow-sm"
                  whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(16, 185, 129, 0.15)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <span className="text-sm">📈</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Income</p>
                      <p className="text-lg font-bold text-gray-800">₹{totalIncome.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <motion.span 
                      className="text-xs text-emerald-600 flex items-center gap-0.5 bg-white/80 px-1.5 py-0.5 rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <span>↑</span>
                      <span>12.5%</span>
                    </motion.span>
                    <span className="text-xs text-gray-500 ml-1">vs last period</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="p-3 bg-gradient-to-br from-red-50 to-red-100/30 rounded-lg border border-red-100 shadow-sm"
                  whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(239, 68, 68, 0.15)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      <span className="text-sm">📉</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Total Expenses</p>
                      <p className="text-lg font-bold text-gray-800">₹{totalExpenses.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <motion.span 
                      className="text-xs text-red-600 flex items-center gap-0.5 bg-white/80 px-1.5 py-0.5 rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                    >
                      <span>↑</span>
                      <span>8.2%</span>
                    </motion.span>
                    <span className="text-xs text-gray-500 ml-1">vs last period</span>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-lg border border-blue-100 shadow-sm"
                  whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <span className="text-sm">💎</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Net Profit</p>
                      <p className="text-lg font-bold text-gray-800">₹{profit.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <motion.span 
                      className="text-xs text-blue-600 flex items-center gap-0.5 bg-white/80 px-1.5 py-0.5 rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                    >
                      <span>↑</span>
                      <span>18.3%</span>
                    </motion.span>
                    <span className="text-xs text-gray-500 ml-1">margin: {profitMargin.toFixed(1)}%</span>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="h-64"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={financialData}
                    margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                      <filter id="incomeShadow" height="200%" width="200%" x="-50%" y="-50%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feFlood floodColor="rgba(16, 185, 129, 0.3)" result="color"/>
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
                      label={{ value: '₹ Amount', position: 'insideLeft', angle: -90, dy: 40, fontSize: 12, fill: '#94a3b8' }}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${Number(value).toLocaleString()}`, '']}
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        borderRadius: '8px', 
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                      }}
                      cursor={{ stroke: '#e2e8f0', strokeWidth: 1, strokeDasharray: '5 5' }}
                      animationDuration={300}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="income" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#incomeGradient)"
                      activeDot={{ r: 6, fill: '#10b981', stroke: 'white', strokeWidth: 2, filter: 'url(#incomeShadow)' }}
                      isAnimationActive={true}
                      animationDuration={1500}
                      animationEasing="ease-out"
                      name="Income"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#expensesGradient)"
                      activeDot={{ r: 6, fill: '#ef4444', stroke: 'white', strokeWidth: 2 }}
                      isAnimationActive={true}
                      animationDuration={1500}
                      animationEasing="ease-out"
                      animationBegin={300}
                      name="Expenses"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>
              
              <motion.div 
                className="bg-emerald-50/50 rounded-lg p-3 border border-emerald-100/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-xs">💡</span>
                    </motion.div>
                    <span className="text-xs font-medium text-gray-700">Financial Insights</span>
                  </div>
                  <span className="text-xs text-emerald-600 bg-white px-2 py-0.5 rounded-full">Updated Today</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Your profit margin is {profitMargin.toFixed(1)}%, which is 3.2% higher than the average in your region. 
                  Consider investing in fertilizer stocks as prices are expected to rise by 15% next quarter.
                </p>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                <div className="p-3 bg-white rounded-lg border border-emerald-100 shadow-sm">
                  <h3 className="text-sm font-medium text-emerald-800 mb-2">Income Breakdown</h3>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={incomeBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
                          paddingAngle={2}
                          dataKey="amount"
                          animationDuration={1500}
                          animationEasing="ease-out"
                        >
                          {incomeBreakdown.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color} 
                              stroke="white"
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`₹${Number(value).toLocaleString()}`, '']}
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            borderRadius: '8px', 
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-1">
                    {incomeBreakdown.map((item, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs text-gray-600">{item.source}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-3 bg-white rounded-lg border border-red-100 shadow-sm">
                  <h3 className="text-sm font-medium text-red-800 mb-2">Expense Breakdown</h3>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
                          paddingAngle={2}
                          dataKey="amount"
                          animationDuration={1500}
                          animationEasing="ease-out"
                        >
                          {expenseBreakdown.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color} 
                              stroke="white"
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`₹${Number(value).toLocaleString()}`, '']}
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            borderRadius: '8px', 
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-1">
                    {expenseBreakdown.map((item, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-xs text-gray-600">{item.category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="expenses" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-700">Expense Breakdown</h3>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Total: ₹{totalExpenses.toLocaleString()}
                  </span>
                </div>
                
                <motion.div 
                  className="h-48"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={expenseBreakdown}
                      layout="vertical"
                      margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f9ff" horizontal={true} vertical={false} />
                      <XAxis type="number" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                      <YAxis 
                        dataKey="category" 
                        type="category" 
                        tick={{ fontSize: 12 }} 
                        stroke="#94a3b8" 
                        width={80}
                      />
                      <Tooltip 
                        formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Amount']}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '8px', 
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                        }}
                        cursor={{ fill: 'rgba(236, 253, 245, 0.4)' }}
                        animationDuration={300}
                      />
                      <Bar 
                        dataKey="amount" 
                        radius={[0, 4, 4, 0]}
                        animationDuration={1500}
                        animationEasing="ease-out"
                      >
                        {expenseBreakdown.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            opacity={hoveredItem === entry.category ? 1 : 0.7}
                            onMouseEnter={() => setHoveredItem(entry.category)}
                            onMouseLeave={() => setHoveredItem(null)}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>
                
                <div className="space-y-2 mt-4">
                  {expenseBreakdown.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-red-50/50 transition-colors"
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
                        <span className="text-sm text-gray-700">{item.category}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700">₹{item.amount.toLocaleString()}</span>
                        <span className="ml-2 text-xs text-gray-500">({((item.amount / totalExpenses) * 100).toFixed(1)}%)</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="mt-4 bg-red-50/50 rounded-lg p-3 border border-red-100/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-xs">💡</span>
                    </motion.div>
                    <span className="text-xs font-medium text-gray-700">Cost-Saving Tips</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Consider bulk purchasing fertilizers to save up to 15%. Labor costs can be optimized by 
                    implementing better scheduling during peak seasons.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="mt-4 p-3 bg-white rounded-lg border border-red-100 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1 }}
                >
                  <h3 className="text-sm font-medium text-red-800 mb-2">Monthly Expense Trend</h3>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={financialData}
                        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f9ff" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                        <YAxis 
                          tick={{ fontSize: 12 }} 
                          stroke="#94a3b8"
                        />
                        <Tooltip 
                          formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Expenses']}
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            borderRadius: '8px', 
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="expenses" 
                          stroke="#ef4444" 
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#expensesGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
            
            <TabsContent value="income" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-700">Income Sources</h3>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Total: ₹{totalIncome.toLocaleString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    className="h-48"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={incomeBreakdown}
                        layout="vertical"
                        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f9ff" horizontal={true} vertical={false} />
                        <XAxis type="number" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                        <YAxis 
                          dataKey="source" 
                          type="category" 
                          tick={{ fontSize: 12 }} 
                          stroke="#94a3b8" 
                          width={80}
                        />
                        <Tooltip 
                          formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Amount']}
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            borderRadius: '8px', 
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                          }}
                          cursor={{ fill: 'rgba(236, 253, 245, 0.4)' }}
                          animationDuration={300}
                        />
                        <Bar 
                          dataKey="amount" 
                          radius={[0, 4, 4, 0]}
                          animationDuration={1500}
                          animationEasing="ease-out"
                        >
                          {incomeBreakdown.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color} 
                              onMouseEnter={() => setHoveredItem(entry.source)}
                              onMouseLeave={() => setHoveredItem(null)}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                  
                  <motion.div 
                    className="h-48"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={incomeBreakdown}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={60}
                          paddingAngle={2}
                          dataKey="amount"
                          animationDuration={1500}
                          animationEasing="ease-out"
                          label={({ source, percent }) => `${source}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {incomeBreakdown.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.color} 
                              stroke="white"
                              strokeWidth={2}
                              onMouseEnter={() => setHoveredItem(entry.source)}
                              onMouseLeave={() => setHoveredItem(null)}
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`₹${Number(value).toLocaleString()}`, '']}
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            borderRadius: '8px', 
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                </div>
                
                <div className="space-y-2 mt-4">
                  {incomeBreakdown.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-emerald-50/50 transition-colors"
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
                        <span className="text-sm text-gray-700">{item.source}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700">₹{item.amount.toLocaleString()}</span>
                        <span className="ml-2 text-xs text-gray-500">({((item.amount / totalIncome) * 100).toFixed(1)}%)</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="mt-4 bg-emerald-50/50 rounded-lg p-3 border border-emerald-100/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-xs">💡</span>
                    </motion.div>
                    <span className="text-xs font-medium text-gray-700">Income Growth Opportunities</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Wheat prices are expected to rise by 8% next quarter. Consider increasing wheat production 
                    and exploring organic certification for premium pricing.
                  </p>
                </motion.div>
                
                <motion.div 
                  className="mt-4 p-3 bg-white rounded-lg border border-emerald-100 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1 }}
                >
                  <h3 className="text-sm font-medium text-emerald-800 mb-2">Monthly Income Trend</h3>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={financialData}
                        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f9ff" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                        <YAxis 
                          tick={{ fontSize: 12 }} 
                          stroke="#94a3b8"
                        />
                        <Tooltip 
                          formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Income']}
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            borderRadius: '8px', 
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="income" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#incomeGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="mt-4 grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.2 }}
                >
                  <div className="p-3 bg-white rounded-lg border border-emerald-100 shadow-sm">
                    <h3 className="text-sm font-medium text-emerald-800 mb-2">Top Performing Crop</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="text-xl">🌾</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Wheat</p>
                        <p className="text-xs text-gray-500">40% of total income</p>
                        <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white rounded-lg border border-emerald-100 shadow-sm">
                    <h3 className="text-sm font-medium text-emerald-800 mb-2">Growth Potential</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-xl">🌱</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Organic Farming</p>
                        <p className="text-xs text-gray-500">+25% potential income</p>
                        <div className="mt-1 flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-xs text-amber-400">★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </div>
    </Card>
  )
}

export default FinancialSummary
