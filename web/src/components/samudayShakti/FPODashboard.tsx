import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, Bell, Calendar, TrendingUp, BarChart2, 
  ShoppingBag, Package, Tractor, MessageCircle, 
  ChevronRight, Info, AlertTriangle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Sample FPO data
const myFPOs = [
  {
    id: 1,
    name: "किसान उन्नति FPO",
    location: "सोनीपत, हरियाणा",
    members: 120,
    established: "2019",
    crops: ["गेहूं", "चावल", "सरसों"],
    chairperson: "रमेश कुमार",
    logo: "https://images.unsplash.com/photo-1585665187093-a3511c2fe57a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    isActive: true,
    lastActivity: "2 घंटे पहले",
    unreadMessages: 5
  }
];

// Sample activity data
const recentActivities = [
  {
    id: 1,
    type: "meeting",
    title: "मासिक सामान्य बैठक",
    date: "15 अक्टूबर, 2023",
    time: "सुबह 10:00 बजे",
    location: "गांव सामुदायिक हॉल",
    description: "आगामी रबी सीजन की योजना और इनपुट खरीद रणनीति पर चर्चा।",
    organizer: "रमेश कुमार",
    attendees: 45
  },
  {
    id: 2,
    type: "procurement",
    title: "थोक उर्वरक खरीद",
    date: "10 अक्टूबर, 2023",
    quantity: "2 टन",
    item: "NPK उर्वरक",
    savings: "₹8,500",
    participants: 28,
    status: "पूर्ण"
  },
  {
    id: 3,
    type: "training",
    title: "जैविक खेती कार्यशाला",
    date: "5 अक्टूबर, 2023",
    time: "दोपहर 2:00 बजे",
    trainer: "डॉ. शर्मा (KVK)",
    location: "FPO कार्यालय",
    attendees: 32,
    description: "जैविक कीट प्रबंधन तकनीकों पर व्यावहारिक प्रशिक्षण।"
  }
];

// Sample announcements
const announcements = [
  {
    id: 1,
    title: "महत्वपूर्ण: रबी सीजन योजना बैठक",
    date: "12 अक्टूबर, 2023",
    content: "सभी सदस्यों से अनुरोध है कि वे 15 अक्टूबर को सुबह 10:00 बजे गांव सामुदायिक हॉल में रबी सीजन योजना बैठक में भाग लें। हम फसल चयन, इनपुट खरीद और बाजार संबंध रणनीतियों पर चर्चा करेंगे।",
    author: "रमेश कुमार (अध्यक्ष)",
    priority: "high"
  },
  {
    id: 2,
    title: "नई खरीदार साझेदारी: ऑर्गेनिक ऑयल्स कंपनी",
    date: "10 अक्टूबर, 2023",
    content: "हमें ऑर्गेनिक ऑयल्स कंपनी के साथ सरसों की सीधी खरीद के लिए एक नई साझेदारी की घोषणा करते हुए खुशी हो रही है। वे गुणवत्ता उत्पादन के लिए बाजार मूल्य से 5% अधिक प्रीमियम दे रहे हैं। इच्छुक किसान कृपया 20 अक्टूबर तक पंजीकरण करें।",
    author: "विपणन समिति",
    priority: "medium"
  }
];

// Sample metrics data
const salesData = [
  { name: 'जन', value: 120000 },
  { name: 'फर', value: 180000 },
  { name: 'मार्च', value: 250000 },
  { name: 'अप्रैल', value: 300000 },
  { name: 'मई', value: 270000 },
  { name: 'जून', value: 220000 },
  { name: 'जुल', value: 180000 },
  { name: 'अग', value: 220000 },
  { name: 'सित', value: 270000 },
  { name: 'अक्ट', value: 320000 },
];

const savingsData = [
  { name: 'बीज', value: 25 },
  { name: 'उर्वरक', value: 35 },
  { name: 'कीटनाशक', value: 20 },
  { name: 'उपकरण', value: 15 },
  { name: 'अन्य', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const FPODashboard = () => {
  const [activeFPO, setActiveFPO] = useState(myFPOs[0]);
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="space-y-6">
      {/* FPO Overview Card */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
      >
        <div className="p-6 flex flex-col md:flex-row gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-green-100">
              <img 
                src={activeFPO.logo} 
                alt={activeFPO.name} 
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-gray-800">{activeFPO.name}</h3>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  सक्रिय
                </Badge>
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Users className="h-4 w-4" />
                {activeFPO.members} सदस्य • स्थापित {activeFPO.established}
              </p>
            </div>
          </div>
          
          <div className="ml-auto flex flex-wrap gap-3 items-center">
            <button className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-800 rounded-md text-sm hover:bg-green-200 transition-colors">
              <Bell className="h-4 w-4" />
              <span>सूचनाएँ ({activeFPO.unreadMessages})</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-md text-sm hover:bg-blue-200 transition-colors">
              <Calendar className="h-4 w-4" />
              <span>कैलेंडर</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 text-amber-800 rounded-md text-sm hover:bg-amber-200 transition-colors">
              <Users className="h-4 w-4" />
              <span>सदस्य</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-500">कुल सामूहिक बिक्री</h4>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">₹32.5 लाख</p>
          <div className="mt-2 flex items-center text-xs text-green-600">
            <span className="font-medium">↑ 12%</span>
            <span className="text-gray-500 ml-1">पिछले वर्ष से</span>
          </div>
        </motion.div>
        
        <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-500">कुल बचत</h4>
            <ShoppingBag className="h-4 w-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">₹4.8 लाख</p>
          <div className="mt-2 flex items-center text-xs text-blue-600">
            <span className="font-medium">↑ 8%</span>
            <span className="text-gray-500 ml-1">पिछले वर्ष से</span>
          </div>
        </motion.div>
        
        <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-500">सक्रिय सदस्य</h4>
            <Users className="h-4 w-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">98/120</p>
          <div className="mt-2 flex items-center text-xs text-amber-600">
            <span className="font-medium">82%</span>
            <span className="text-gray-500 ml-1">सक्रियता दर</span>
          </div>
        </motion.div>
        
        <motion.div variants={cardVariants} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-500">आगामी गतिविधियां</h4>
            <Calendar className="h-4 w-4 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-800">3</p>
          <div className="mt-2 flex items-center text-xs text-purple-600">
            <span className="font-medium">अगले 7 दिन</span>
          </div>
        </motion.div>
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <motion.div 
          variants={cardVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 md:col-span-2"
        >
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-medium text-gray-800">सामूहिक बिक्री प्रवृत्ति</h3>
            <div className="flex items-center gap-2">
              <select className="text-xs border border-gray-200 rounded px-2 py-1">
                <option>इस वर्ष</option>
                <option>पिछला वर्ष</option>
              </select>
              <Info className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="p-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    tickFormatter={(value) => `₹${value/1000}K`}
                  />
                  <Tooltip 
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'बिक्री']}
                    labelFormatter={(label) => `${label} 2023`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10b981" 
                    fill="url(#colorGradient)" 
                    strokeWidth={2}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Savings Distribution */}
        <motion.div 
          variants={cardVariants}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
        >
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-medium text-gray-800">बचत वितरण</h3>
          </div>
          
          <div className="p-6">
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={savingsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {savingsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'बचत प्रतिशत']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {savingsData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-xs text-gray-600">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
  
        {/* Recent Activities and Announcements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <motion.div 
            variants={cardVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-medium text-gray-800">हाल की गतिविधियां</h3>
              <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                <span>सभी देखें</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${
                        activity.type === 'meeting' ? 'bg-blue-100 text-blue-700' :
                        activity.type === 'procurement' ? 'bg-green-100 text-green-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {activity.type === 'meeting' ? <Users className="h-5 w-5" /> :
                         activity.type === 'procurement' ? <ShoppingBag className="h-5 w-5" /> :
                         <Tractor className="h-5 w-5" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-gray-800">{activity.title}</h4>
                          <span className="text-xs text-gray-500">{activity.date}</span>
                        </div>
                        
                        {activity.type === 'meeting' && (
                          <div className="mt-1 space-y-1">
                            <p className="text-sm text-gray-600">{activity.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{activity.time}</span>
                              <span>{activity.location}</span>
                              <span>{activity.attendees} उपस्थित</span>
                            </div>
                          </div>
                        )}
                        
                        {activity.type === 'procurement' && (
                          <div className="mt-1 space-y-1">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>मात्रा: {activity.quantity}</span>
                              <span>वस्तु: {activity.item}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">{activity.participants} प्रतिभागी</span>
                              <span className="text-xs text-green-600 font-medium">बचत: {activity.savings}</span>
                            </div>
                          </div>
                        )}
                        
                        {activity.type === 'training' && (
                          <div className="mt-1 space-y-1">
                            <p className="text-sm text-gray-600">{activity.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{activity.time}</span>
                              <span>प्रशिक्षक: {activity.trainer}</span>
                              <span>{activity.attendees} उपस्थित</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Announcements */}
          <motion.div 
            variants={cardVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-medium text-gray-800">सूचनाएँ और अपडेट</h3>
              <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                <span>सभी देखें</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div 
                    key={announcement.id} 
                    className={`p-4 rounded-lg border-l-4 ${
                      announcement.priority === 'high' 
                        ? 'border-red-500 bg-red-50' 
                        : 'border-amber-500 bg-amber-50'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {announcement.priority === 'high' ? (
                        <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Info className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-gray-800">{announcement.title}</h4>
                          <span className="text-xs text-gray-500">{announcement.date}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{announcement.content}</p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs text-gray-500">द्वारा: {announcement.author}</span>
                          <button className="text-xs font-medium text-blue-600">अधिक जानकारी</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
  
        {/* Quick Actions */}
        <motion.div 
          variants={cardVariants}
          className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100"
        >
          <h3 className="font-medium text-gray-800 mb-4">त्वरित कार्रवाई</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-2 text-center">
              <div className="bg-blue-100 p-2 rounded-full text-blue-700">
                <Calendar className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-gray-700">बैठक आयोजित करें</span>
            </button>
            
            <button className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-2 text-center">
              <div className="bg-green-100 p-2 rounded-full text-green-700">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-gray-700">सामूहिक खरीद शुरू करें</span>
            </button>
            
            <button className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-2 text-center">
              <div className="bg-amber-100 p-2 rounded-full text-amber-700">
                <Package className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-gray-700">बिक्री प्रस्ताव बनाएं</span>
            </button>
            
            <button className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-2 text-center">
              <div className="bg-purple-100 p-2 rounded-full text-purple-700">
                <MessageCircle className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-gray-700">सदस्यों को संदेश भेजें</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  };
  
  export default FPODashboard;