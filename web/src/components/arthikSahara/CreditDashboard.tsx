import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  BarChart2, 
  PieChart,
  Leaf
} from "lucide-react";

const CreditDashboard = () => {
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
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">वैकल्पिक क्रेडिट स्कोर</h2>
        <span className="text-sm text-gray-500">अपडेटेड: 2 घंटे पहले</span>
      </div>

      {/* Credit Score Card */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-medium">आपका क्रेडिट स्कोर</h3>
            <button className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full transition-colors">
              विस्तार देखें
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-5xl font-bold text-gray-800">68<span className="text-lg text-gray-500">/100</span></div>
              <div className="mt-1 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-green-600 font-medium">+12 पिछले 3 महीनों से</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">अच्छा स्कोर! आप अधिकांश ऋणों के लिए पात्र हैं।</p>
            </div>
            
            <div className="w-32 h-32 relative">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#e5e7eb" 
                  strokeWidth="10"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  fill="none" 
                  stroke="#16a34a" 
                  strokeWidth="10"
                  strokeDasharray="251.2"
                  strokeDashoffset="80"
                  transform="rotate(-90 50 50)"
                />
                <text 
                  x="50" 
                  y="50" 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  fill="#16a34a"
                  fontSize="16"
                  fontWeight="bold"
                >
                  68%
                </text>
              </svg>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-sm text-gray-500">ऋण पात्रता</div>
              <div className="mt-1 text-lg font-semibold text-gray-800">₹1,25,000</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-sm text-gray-500">ब्याज दर</div>
              <div className="mt-1 text-lg font-semibold text-gray-800">9.5%</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-sm text-gray-500">अवधि</div>
              <div className="mt-1 text-lg font-semibold text-gray-800">12 महीने</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Credit Factors */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">आपके स्कोर को प्रभावित करने वाले कारक</h3>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center">
            <div className="w-1/3 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium">फसल उत्पादन</span>
            </div>
            <div className="w-2/3">
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-600 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>उत्कृष्ट</span>
                <span>85%</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-1/3 flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-sm font-medium">बाजार बिक्री</span>
            </div>
            <div className="w-2/3">
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-600 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>अच्छा</span>
                <span>70%</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-1/3 flex items-center">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-sm font-medium">सलाह अपनाना</span>
            </div>
            <div className="w-2/3">
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-amber-500 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>औसत</span>
                <span>45%</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-1/3 flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-sm font-medium">ऐप उपयोग</span>
            </div>
            <div className="w-2/3">
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-gray-400 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>औसत</span>
                <span>60%</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-1/3 flex items-center">
              <TrendingDown className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-sm font-medium">FPO सहभागिता</span>
            </div>
            <div className="w-2/3">
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-red-500 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <div className="mt-1 flex justify-between text-xs text-gray-500">
                <span>कम</span>
                <span>30%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">हाल की गतिविधियां</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <div className="bg-green-100 p-2 rounded-full">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">गेहूं की फसल बिक्री रिकॉर्ड</p>
                <p className="text-xs text-gray-500">15 मई, 2023 - ₹45,000</p>
                <div className="mt-1 text-xs text-green-600 font-medium">+5 क्रेडिट अंक</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <div className="bg-blue-100 p-2 rounded-full">
                <BarChart2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">मिट्टी परीक्षण सलाह अपनाई</p>
                <p className="text-xs text-gray-500">2 अप्रैल, 2023</p>
                <div className="mt-1 text-xs text-green-600 font-medium">+3 क्रेडिट अंक</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <PieChart className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">FPO बैठक में भाग लिया</p>
                <p className="text-xs text-gray-500">28 मार्च, 2023</p>
                <div className="mt-1 text-xs text-green-600 font-medium">+2 क्रेडिट अंक</div>
              </div>
            </div>
          </div>
          
          <button className="mt-4 w-full text-center text-sm text-green-600 font-medium hover:text-green-700">
            सभी गतिविधियां देखें →
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CreditDashboard;