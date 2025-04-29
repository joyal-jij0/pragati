import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  Award,
  Zap,
  Calendar,
  BarChart2,
  Leaf,
  ChevronRight,
  ArrowRight,
  Star,
  Clock,
  Target,
  Shield,
  Droplet,
  Sun,
  Percent,
  Users
} from "lucide-react";

const CreditImprovement = () => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, delay: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({ 
      opacity: 1, 
      x: 0,
      transition: { 
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };

  // State for active tab
  const [activeTab, setActiveTab] = useState("overview");

  // Sample credit score history
  const scoreHistory = [
    { month: "July", score: 52, avgScore: 50 },
    { month: "August", score: 55, avgScore: 51 },
    { month: "September", score: 58, avgScore: 52 },
    { month: "October", score: 62, avgScore: 53 },
    { month: "November", score: 65, avgScore: 54 },
    { month: "December", score: 68, avgScore: 55 }
  ];

  // Improvement recommendations
  const recommendations = [
    {
      id: 1,
      title: "Update Crop Sales Records",
      description: "Upload details of your recent crop sales",
      impact: "high",
      timeframe: "Immediate",
      completed: false,
      scoreBoost: "+5 points",
      icon: <BarChart2 className="h-5 w-5" />
    },
    {
      id: 2,
      title: "Attend FPO Meetings",
      description: "Next FPO meeting is on January 15",
      impact: "medium",
      timeframe: "15 days",
      completed: false,
      scoreBoost: "+3 points",
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 3,
      title: "Adopt Soil Testing Advice",
      description: "Follow fertilizer usage recommendations based on soil testing",
      impact: "high",
      timeframe: "30 days",
      completed: false,
      scoreBoost: "+4 points",
      icon: <Droplet className="h-5 w-5" />
    },
    {
      id: 4,
      title: "Log in Regularly to the App",
      description: "Use the app at least 3 times a week",
      impact: "low",
      timeframe: "Continuous",
      completed: true,
      scoreBoost: "+2 points",
      icon: <CheckCircle className="h-5 w-5" />
    },
    {
      id: 5,
      title: "Complete Financial Education Module",
      description: "Complete the module on budgeting and savings",
      impact: "medium",
      timeframe: "7 days",
      completed: false,
      scoreBoost: "+3 points",
      icon: <Award className="h-5 w-5" />
    }
  ];

  // Credit score breakdown
  const scoreBreakdown = [
    { category: "Crop Production", score: 85, color: "green" },
    { category: "Market Sales", score: 70, color: "green" },
    { category: "Advice Adoption", score: 45, color: "amber" },
    { category: "FPO Participation", score: 30, color: "red" },
    { category: "Financial Literacy", score: 60, color: "blue" },
    { category: "Digital Engagement", score: 75, color: "green" }
  ];

  // Seasonal credit score trends
  const seasonalTrends = [
    { season: "Winter", avgScore: 62, icon: <Sun className="h-4 w-4" /> },
    { season: "Summer", avgScore: 58, icon: <Sun className="h-4 w-4" /> },
    { season: "Monsoon", avgScore: 70, icon: <Droplet className="h-4 w-4" /> },
    { season: "Post-Harvest", avgScore: 65, icon: <Leaf className="h-4 w-4" /> }
  ];

  // Credit milestones
  const creditMilestones = [
    { score: 50, title: "Basic Eligibility", achieved: true, benefits: "Eligible for small crop loans" },
    { score: 65, title: "Preferred Status", achieved: true, benefits: "Access to equipment financing" },
    { score: 75, title: "Premium Borrower", achieved: false, benefits: "Reduced interest rates, higher loan amounts" },
    { score: 85, title: "Elite Status", achieved: false, benefits: "Priority processing, lowest interest rates" }
  ];

  // Impact badge component
  const ImpactBadge = ({ impact }: { impact: string }) => {
    switch (impact) {
      case "high":
        return (
          <div className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>High Impact</span>
          </div>
        );
      case "medium":
        return (
          <div className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
            <Info className="h-3 w-3" />
            <span>Medium Impact</span>
          </div>
        );
      case "low":
        return (
          <div className="bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
            <Info className="h-3 w-3" />
            <span>Low Impact</span>
          </div>
        );
      default:
        return null;
    }
  };

  // Tab navigation component
  const TabNavigation = () => {
    const tabs = [
      { id: "overview", label: "Overview", icon: <BarChart2 className="h-4 w-4" /> },
      { id: "recommendations", label: "Recommendations", icon: <Zap className="h-4 w-4" /> },
      { id: "factors", label: "Score Factors", icon: <Target className="h-4 w-4" /> },
      { id: "milestones", label: "Milestones", icon: <Award className="h-4 w-4" /> }
    ];

    return (
      <div className="flex overflow-x-auto hide-scrollbar space-x-2 pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    );
  };

  // Circular progress component
  const CircularProgress = ({ value, size = 120, strokeWidth = 8, color = "green" }: any) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const dash = (value * circumference) / 100;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`var(--color-${color}-500)`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - dash}
            strokeLinecap="round"
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-2xl font-bold text-gray-800">{value}</span>
          <span className="text-xs text-gray-500">out of 100</span>
        </div>
      </div>
    );
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            {/* Score Overview */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-800">Credit Score Overview</h3>
              </div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex flex-col items-center">
                    <CircularProgress value={68} />
                    <div className="mt-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-600">+16 points in 6 months</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Last updated: Today</p>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">Current Status</span>
                          <span className="text-sm font-medium text-blue-600">Preferred Borrower</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-blue-600 rounded-full" style={{ width: '68%' }}></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                          <span>Basic (0-50)</span>
                          <span>Preferred (51-70)</span>
                          <span>Premium (71-85)</span>
                          <span>Elite (86-100)</span>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                        <div className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-800">You're 7 points away from Premium status</p>
                            <p className="text-xs text-gray-600">Complete high-impact recommendations to reach Premium status and unlock better loan terms.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Score History Chart */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-800">Score History</h3>
              </div>
              
              <div className="p-6">
                <div className="h-64 flex items-end justify-between gap-4 relative mb-6">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 inset-y-0 flex flex-col justify-between text-xs text-gray-500 pr-2">
                    <span>100</span>
                    <span>75</span>
                    <span>50</span>
                    <span>25</span>
                    <span>0</span>
                  </div>
                  
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    {[0, 25, 50, 75, 100].map((value) => (
                      <div 
                        key={value} 
                        className="w-full h-[1px] bg-gray-200"
                        style={{ bottom: `${value}%` }}
                      ></div>
                    ))}
                  </div>
                  
                  {/* Average score line */}
                  <div 
                    className="absolute h-[2px] w-full bg-amber-400 z-10" 
                    style={{ bottom: `${(55 / 100) * 100}%` }}
                  >
                    <div className="absolute right-0 -top-6 text-xs text-amber-600 font-medium">
                      Avg: 55
                    </div>
                  </div>
                  
                  {/* Month bars */}
                  {scoreHistory.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1 relative z-20 pl-6">
                      {/* Score bar */}
                      <div className="w-full max-w-[40px] flex flex-col items-center group">
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          Score: {item.score} | Avg: {item.avgScore}
                        </div>
                        
                        {/* Average score dot */}
                        <div 
                          className="absolute w-3 h-3 bg-amber-500 rounded-full border-2 border-white shadow-sm z-10" 
                          style={{ bottom: `calc(${(item.avgScore / 100) * 100}% - 1.5px)` }}
                        ></div>
                        
                        <div 
                          className="w-full max-w-[40px] bg-gradient-to-t from-green-400 to-green-600 rounded-t-md shadow-md" 
                          style={{ 
                            height: `${(item.score / 100) * 100}%`,
                            opacity: 0.7 + (index / (scoreHistory.length * 2))
                          }}
                        ></div>
                        <div className="mt-2 text-xs font-medium text-gray-600">{item.month}</div>
                        <div className="text-sm font-medium text-gray-800">{item.score}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-gradient-to-t from-green-400 to-green-600 rounded-full"></div>
                    <span className="text-xs text-gray-600">Your Score</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="h-3 w-3 bg-amber-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Average Score (55)</span>
                  </div>
                </div>
                
                <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-3">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Consistent Growth</p>
                      <p className="text-xs text-gray-600">Your score has increased by 16 points in the last 6 months, showing consistent improvement. Keep up the good work!</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Seasonal Trends */}
            <motion.div 
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-800">Seasonal Score Trends</h3>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {seasonalTrends.map((season, index) => (
                    <motion.div 
                      key={index}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-gray-50 rounded-lg p-4 text-center"
                    >
                      <div className="flex justify-center mb-2">
                        <div className={`p-2 rounded-full ${
                          season.season === "Monsoon" ? "bg-blue-100 text-blue-600" : 
                          season.season === "Summer" ? "bg-amber-100 text-amber-600" : 
                          season.season === "Winter" ? "bg-indigo-100 text-indigo-600" : 
                          "bg-green-100 text-green-600"
                        }`}>
                          {season.icon}
                        </div>
                      </div>
                      <h4 className="text-sm font-medium text-gray-800">{season.season}</h4>
                      <p className="text-xs text-gray-500 mt-1">Avg. Score: {season.avgScore}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-3">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Seasonal Insights</p>
                      <p className="text-xs text-gray-600">Your credit score tends to be highest during monsoon season. Consider planning major loan applications during this period for better approval chances.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        );
        
      case "recommendations":
        return (
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-medium text-gray-800">Personalized Recommendations</h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <motion.div 
                    key={rec.id}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className={`p-4 rounded-lg border ${rec.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-green-300 transition-colors'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${rec.completed ? 'bg-gray-100 text-gray-500' : rec.impact === 'high' ? 'bg-green-100 text-green-600' : rec.impact === 'medium' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                        {rec.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : rec.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-medium ${rec.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{rec.title}</h4>
                          <ImpactBadge impact={rec.impact} />
                        </div>
                        <p className={`mt-1 text-xs ${rec.completed ? 'text-gray-400' : 'text-gray-600'}`}>{rec.description}</p>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{rec.timeframe}</span>
                            </div>
                            
                            <div className="flex items-center gap-1 text-xs text-green-600 font-medium">
                              <TrendingUp className="h-3 w-3" />
                              <span>{rec.scoreBoost}</span>
                            </div>
                          </div>
                          
                          {rec.completed ? (
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Completed
                            </span>
                          ) : (
                            <button className="text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-colors">
                              Start Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-100">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">Recommendation Impact</h4>
                    <p className="text-xs text-gray-600 mt-1">Completing all high and medium impact recommendations could increase your score by up to 15 points, potentially moving you to Premium status.</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-600 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                      <span className="text-xs font-medium text-gray-700">Current: 68</span>
                      <ArrowRight className="h-3 w-3 text-gray-400" />
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-600 rounded-full" style={{ width: '83%' }}></div>
                      </div>
                      <span className="text-xs font-medium text-blue-700">Potential: 83</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
        
      case "factors":
        return (
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-medium text-gray-800">Factors Affecting Your Score</h3>
            </div>
            
            <div className="p-6 space-y-6">
              {scoreBreakdown.map((factor, index) => (
                <motion.div 
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {factor.score >= 70 ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : factor.score >= 45 ? (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-sm font-medium text-gray-800">{factor.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800">{factor.score}%</span>
                      <div className={`px-2 py-0.5 rounded-full text-xs ${
                        factor.score >= 70 ? 'bg-green-100 text-green-700' : 
                        factor.score >= 45 ? 'bg-amber-100 text-amber-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {factor.score >= 70 ? 'Strong' : factor.score >= 45 ? 'Average' : 'Weak'}
                      </div>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className={`h-2 rounded-full ${
                      factor.color === 'green' ? 'bg-green-600' : 
                      factor.color === 'amber' ? 'bg-amber-500' : 
                      factor.color === 'red' ? 'bg-red-500' : 
                      'bg-blue-600'
                    }`} style={{ width: `${factor.score}%` }}></div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {factor.category === "Crop Production" && "Your crop production area is 20% above average"}
                    {factor.category === "Market Sales" && "You sold 70% of your crop in the market last season"}
                    {factor.category === "Advice Adoption" && "You've followed only 45% of agricultural advice"}
                    {factor.category === "FPO Participation" && "You've attended only 30% of FPO meetings"}
                    {factor.category === "Financial Literacy" && "You've completed 3 out of 5 financial education modules"}
                    {factor.category === "Digital Engagement" && "You regularly use the app and update your information"}
                  </p>
                </motion.div>
              ))}
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 border-l-4 border-green-500 p-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Your Strengths</p>
                      <p className="text-xs text-gray-600">Crop Production, Market Sales, and Digital Engagement are your strongest areas. Keep maintaining these practices.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 border-l-4 border-amber-500 p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">Areas to Improve</p>
                      <p className="text-xs text-gray-600">Focus on increasing your FPO Participation and Advice Adoption to see the biggest improvements in your score.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
        
      case "milestones":
        return (
          <motion.div 
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-medium text-gray-800">Credit Score Milestones</h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-8">
                {creditMilestones.map((milestone, index) => (
                  <motion.div 
                    key={index}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full ${
                        milestone.achieved 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        <Award className="h-8 w-8" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-gray-800">{milestone.title}</h4>
                          <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            milestone.achieved 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-200 text-gray-700'
                          }`}>
                            {milestone.score}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{milestone.benefits}</p>
                        
                        <div className="mt-2">
                          {milestone.achieved ? (
                            <div className="flex items-center gap-1 text-green-600 text-xs">
                              <CheckCircle className="h-3 w-3" />
                              <span>Achieved</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-gray-500 text-xs">
                              <Target className="h-3 w-3" />
                              <span>{milestone.score - 68} points needed</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">Next Milestone: Premium Borrower</h4>
                    <p className="text-xs text-gray-600 mt-1">You're just 7 points away from reaching Premium Borrower status. This will unlock reduced interest rates and higher loan amounts.</p>
                    <button className="mt-3 text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors flex items-center gap-1">
                      <span>View Recommendations</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
        }
      };

  return (
    <div className="space-y-6">
      {/* Page Title with Score Badge */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Improve Credit Score</h2>
        
        <motion.div 
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-sm text-gray-600">Current Score:</span>
          <div className="flex items-center gap-1">
            <motion.div 
              className="text-lg font-bold text-green-600"
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.2, 1] }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              68
            </motion.div>
            <span className="text-sm text-gray-500">/100</span>
          </div>
          <motion.div 
            className="ml-1 bg-green-100 p-1 rounded-full"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          >
            <Star className="h-4 w-4 text-green-600" />
          </motion.div>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <TabNavigation />
      
      {/* Tab Content */}
      <div className="space-y-6">
        {renderTabContent()}
      </div>
      
      {/* Educational Resources */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">Educational Resources</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div 
              className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
              whileHover={{ y: -5, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <BarChart2 className="h-5 w-5 text-blue-600" />
                </div>
                <h4 className="text-sm font-medium text-gray-800">What is a Credit Score?</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">Learn what a credit score is and how it affects your financial life.</p>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                <span>Watch Video (5 min)</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </motion.div>
            
            <motion.div 
              className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
              whileHover={{ y: -5, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <h4 className="text-sm font-medium text-gray-800">How to Increase Your Score</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">Learn 5 effective ways to increase your credit score.</p>
              <button className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                <span>Read Article (3 min)</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </motion.div>
            
            <motion.div 
              className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
              whileHover={{ y: -5, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <h4 className="text-sm font-medium text-gray-800">Common Mistakes</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">What mistakes do farmers often make in increasing credit scores?</p>
              <button className="text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                <span>View Infographic</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </motion.div>
            
            <motion.div 
              className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors"
              whileHover={{ y: -5, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <h4 className="text-sm font-medium text-gray-800">Benefits of Good Credit</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">How a good credit score can get you more loan options and lower interest rates.</p>
              <button className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1">
                <span>Listen to Podcast (10 min)</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Success Stories */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">Success Stories</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <motion.div 
              className="flex items-start gap-3 pb-4 border-b border-gray-100"
              whileHover={{ x: 5 }}
            >
              <div className="bg-green-100 p-2 rounded-full">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-800">Ramsingh, Panipat</h4>
                <p className="text-xs text-gray-500 mt-1">Ramsingh increased his score from 45 to 75 in 6 months and received a crop loan of ₹2,00,000. He regularly updated crop sales records and attended FPO meetings.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-3 pb-4 border-b border-gray-100"
              whileHover={{ x: 5 }}
            >
              <div className="bg-green-100 p-2 rounded-full">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-800">Sunita Devi, Haryana</h4>
                <p className="text-xs text-gray-500 mt-1">Sunita increased her credit score from 50 to 80 and received equipment loan of ₹3,50,000. She followed soil testing advice and completed financial education modules.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-3"
              whileHover={{ x: 5 }}
            >
              <div className="bg-green-100 p-2 rounded-full">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-800">Mohan Lal, Uttar Pradesh</h4>
                <p className="text-xs text-gray-500 mt-1">Mohan increased his score from 40 to 70 and received an irrigation loan of ₹1,25,000. He regularly updated his crop production records and attended all FPO meetings.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Call to Action */}
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-md overflow-hidden"
      >
        <div className="p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">Ready to boost your credit score?</h3>
              <p className="mt-2 text-green-50">Start with the highest impact recommendations today.</p>
            </div>
            <motion.button 
              className="px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreditImprovement;