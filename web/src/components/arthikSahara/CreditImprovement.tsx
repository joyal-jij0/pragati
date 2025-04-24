import React from "react";
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
  ChevronRight
} from "lucide-react";

const CreditImprovement = () => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Sample credit score history
  const scoreHistory = [
    { month: "जुलाई", score: 52 },
    { month: "अगस्त", score: 55 },
    { month: "सितंबर", score: 58 },
    { month: "अक्टूबर", score: 62 },
    { month: "नवंबर", score: 65 },
    { month: "दिसंबर", score: 68 }
  ];

  // Improvement recommendations
  const recommendations = [
    {
      id: 1,
      title: "फसल बिक्री रिकॉर्ड अपडेट करें",
      description: "अपनी हाल की फसल बिक्री का विवरण अपलोड करें",
      impact: "high",
      timeframe: "तुरंत",
      completed: false
    },
    {
      id: 2,
      title: "FPO बैठकों में भाग लें",
      description: "अगली FPO बैठक 15 जनवरी को है",
      impact: "medium",
      timeframe: "15 दिन",
      completed: false
    },
    {
      id: 3,
      title: "मिट्टी परीक्षण सलाह अपनाएं",
      description: "मिट्टी परीक्षण के आधार पर उर्वरक उपयोग अनुशंसाओं का पालन करें",
      impact: "high",
      timeframe: "30 दिन",
      completed: false
    },
    {
      id: 4,
      title: "ऐप पर नियमित रूप से लॉग इन करें",
      description: "सप्ताह में कम से कम 3 बार ऐप का उपयोग करें",
      impact: "low",
      timeframe: "निरंतर",
      completed: true
    },
    {
      id: 5,
      title: "वित्तीय शिक्षा मॉड्यूल पूरा करें",
      description: "बजट और बचत पर मॉड्यूल पूरा करें",
      impact: "medium",
      timeframe: "7 दिन",
      completed: false
    }
  ];

  // Impact badge component
  const ImpactBadge = ({ impact }: { impact: string }) => {
    switch (impact) {
      case "high":
        return (
          <div className="bg-green-50 text-green-600 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>उच्च प्रभाव</span>
          </div>
        );
      case "medium":
        return (
          <div className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
            <Info className="h-3 w-3" />
            <span>मध्यम प्रभाव</span>
          </div>
        );
      case "low":
        return (
          <div className="bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
            <Info className="h-3 w-3" />
            <span>कम प्रभाव</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">क्रेडिट स्कोर सुधारें</h2>
        <span className="text-sm text-gray-500">वर्तमान स्कोर: <span className="font-medium text-green-600">68/100</span></span>
      </div>

      {/* Score History Chart */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">स्कोर इतिहास</h3>
        </div>
        
        <div className="p-6">
          <div className="h-48 flex items-end justify-between gap-2">
            {scoreHistory.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-green-500 rounded-t-sm" 
                  style={{ 
                    height: `${(item.score / 100) * 100}%`,
                    opacity: 0.6 + (index / (scoreHistory.length * 2))
                  }}
                ></div>
                <div className="mt-2 text-xs text-gray-600">{item.month}</div>
                <div className="text-xs font-medium text-gray-800">{item.score}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">आपका स्कोर</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-0.5 w-6 bg-amber-500"></div>
              <span className="text-xs text-gray-600">औसत स्कोर (55)</span>
            </div>
          </div>
          
          <div className="mt-4 bg-green-50 border-l-4 border-green-500 p-3">
            <div className="flex items-start gap-2">
              <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">बढ़ता हुआ स्कोर</p>
                <p className="text-xs text-gray-600">आपका स्कोर पिछले 6 महीनों में 16 अंक बढ़ा है। इसी तरह जारी रखें!</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Improvement Recommendations */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">सुधार के लिए अनुशंसाएँ</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div 
                key={rec.id} 
                className={`p-4 rounded-lg border ${rec.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${rec.completed ? 'bg-gray-100 text-gray-500' : rec.impact === 'high' ? 'bg-green-100 text-green-600' : rec.impact === 'medium' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                    {rec.completed ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : rec.impact === 'high' ? (
                      <Zap className="h-5 w-5" />
                    ) : rec.impact === 'medium' ? (
                      <Award className="h-5 w-5" />
                    ) : (
                      <Info className="h-5 w-5" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-medium ${rec.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{rec.title}</h4>
                      <ImpactBadge impact={rec.impact} />
                    </div>
                    <p className={`mt-1 text-xs ${rec.completed ? 'text-gray-400' : 'text-gray-600'}`}>{rec.description}</p>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>समय सीमा: {rec.timeframe}</span>
                      </div>
                      
                      {rec.completed ? (
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          पूरा हुआ
                        </span>
                      ) : (
                        <button className="text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-colors">
                          शुरू करें
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Credit Score Factors */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">आपके स्कोर को प्रभावित करने वाले कारक</h3>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-800">फसल उत्पादन</span>
              </div>
              <span className="text-sm font-medium text-gray-800">85%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-green-600 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="mt-1 text-xs text-gray-500">आपका फसल उत्पादन क्षेत्र औसत से 20% अधिक है</p>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-800">बाजार बिक्री</span>
              </div>
              <span className="text-sm font-medium text-gray-800">70%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-green-600 rounded-full" style={{ width: '70%' }}></div>
            </div>
            <p className="mt-1 text-xs text-gray-500">आपने पिछले सीजन में अपनी फसल का 70% बाजार में बेचा</p>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium text-gray-800">सलाह अपनाना</span>
              </div>
              <span className="text-sm font-medium text-gray-800">45%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-amber-500 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="mt-1 text-xs text-gray-500">आपने केवल 45% कृषि सलाह का पालन किया है</p>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium text-gray-800">FPO सहभागिता</span>
              </div>
              <span className="text-sm font-medium text-gray-800">30%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-red-500 rounded-full" style={{ width: '30%' }}></div>
            </div>
            <p className="mt-1 text-xs text-gray-500">आप केवल 30% FPO बैठकों में शामिल हुए हैं</p>
          </div>
        </div>
      </motion.div>
      
      {/* Success Stories */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">सफलता की कहानियां</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <div className="bg-green-100 p-2 rounded-full">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-800">रामसिंह, पानीपत</h4>
                <p className="text-xs text-gray-500 mt-1">रामसिंह ने 6 महीने में अपना स्कोर 45 से 75 तक बढ़ाया और ₹2,00,000 का फसल ऋण प्राप्त किया। उन्होंने नियमित रूप से फसल बिक्री रिकॉर्ड अपडेट किए और FPO बैठकों में भाग लिया।</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <div className="bg-green-100 p-2 rounded-full">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-800">सुनीता देवी, हरियाणा</h4>
                <p className="text-xs text-gray-500 mt-1">सुनीता ने अपने क्रेडिट स्कोर को 50 से 80 तक बढ़ाया और ₹3,50,000 का उपकरण ऋण प्राप्त किया। उन्होंने मिट्टी परीक्षण सलाह का पालन किया और वित्तीय शिक्षा मॉड्यूल पूरे किए।</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-800">मोहन लाल, उत्तर प्रदेश</h4>
                <p className="text-xs text-gray-500 mt-1">मोहन ने अपना स्कोर 40 से 70 तक बढ़ाया और ₹1,25,000 का सिंचाई ऋण प्राप्त किया। उन्होंने अपने फसल उत्पादन रिकॉर्ड नियमित रूप से अपडेट किए और सभी FPO बैठकों में भाग लिया।</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
              <span>और सफलता की कहानियां देखें</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Educational Resources */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">शिक्षात्मक संसाधन</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <BarChart2 className="h-5 w-5 text-blue-600" />
                </div>
                <h4 className="text-sm font-medium text-gray-800">क्रेडिट स्कोर क्या है?</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">क्रेडिट स्कोर क्या है और यह आपके वित्तीय जीवन को कैसे प्रभावित करता है, इसके बारे में जानें।</p>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">वीडियो देखें (5 मिनट)</button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <h4 className="text-sm font-medium text-gray-800">अपना स्कोर कैसे बढ़ाएं</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">अपने क्रेडिट स्कोर को बढ़ाने के लिए 5 प्रभावी तरीके जानें।</p>
              <button className="text-xs text-green-600 hover:text-green-700 font-medium">लेख पढ़ें (3 मिनट)</button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <h4 className="text-sm font-medium text-gray-800">आम गलतियां</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">किसान अक्सर क्रेडिट स्कोर बढ़ाने में कौन सी गलतियां करते हैं?</p>
              <button className="text-xs text-amber-600 hover:text-amber-700 font-medium">इन्फोग्राफिक देखें</button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Award className="h-5 w-5 text-purple-600" />
                </div>
                <h4 className="text-sm font-medium text-gray-800">अच्छे क्रेडिट के लाभ</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">अच्छा क्रेडिट स्कोर आपको कैसे अधिक ऋण विकल्प और कम ब्याज दर दिला सकता है।</p>
              <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">पॉडकास्ट सुनें (10 मिनट)</button>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              सभी शिक्षात्मक संसाधन देखें
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CreditImprovement;