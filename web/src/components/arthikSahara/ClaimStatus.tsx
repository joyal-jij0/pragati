import React from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  ChevronRight,
  Download,
  MessageSquare,
  Camera,
  Upload,
  Umbrella,
  Calendar
} from "lucide-react";

const ClaimStatus = () => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Sample claims data
  const claims = [
    {
      id: "CLM-2023-1105",
      type: "फसल बीमा - सूखा",
      provider: "एग्रीकल्चर इंश्योरेंस कंपनी",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Agriculture_Insurance_Company_of_India_logo.svg/200px-Agriculture_Insurance_Company_of_India_logo.svg.png",
      policyId: "POL-2023-0501",
      amount: "₹75,000",
      date: "5 नवंबर, 2023",
      status: "processing", // processing, approved, rejected, pending
      progress: 60,
      steps: [
        { name: "दावा दर्ज", completed: true, date: "5 नवंबर, 2023" },
        { name: "दस्तावेज़ सत्यापन", completed: true, date: "8 नवंबर, 2023" },
        { name: "क्षेत्र निरीक्षण", completed: false, inProgress: true, date: "प्रगति में" },
        { name: "मूल्यांकन", completed: false, date: "लंबित" },
        { name: "अंतिम निर्णय", completed: false, date: "लंबित" },
        { name: "भुगतान", completed: false, date: "लंबित" }
      ]
    },
    {
      id: "CLM-2023-0920",
      type: "पशुधन बीमा - पशु बीमारी",
      provider: "भारतीय जीवन बीमा निगम",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Life_Insurance_Corporation_of_India.svg/200px-Life_Insurance_Corporation_of_India.svg.png",
      policyId: "POL-2023-0615",
      amount: "₹20,000",
      date: "20 सितंबर, 2023",
      status: "approved",
      progress: 100,
      steps: [
        { name: "दावा दर्ज", completed: true, date: "20 सितंबर, 2023" },
        { name: "दस्तावेज़ सत्यापन", completed: true, date: "22 सितंबर, 2023" },
        { name: "पशु चिकित्सक निरीक्षण", completed: true, date: "25 सितंबर, 2023" },
        { name: "मूल्यांकन", completed: true, date: "28 सितंबर, 2023" },
        { name: "अंतिम निर्णय", completed: true, date: "1 अक्टूबर, 2023" },
        { name: "भुगतान", completed: true, date: "5 अक्टूबर, 2023" }
      ]
    },
    {
      id: "CLM-2023-0805",
      type: "फसल बीमा - अत्यधिक वर्षा",
      provider: "एग्रीकल्चर इंश्योरेंस कंपनी",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Agriculture_Insurance_Company_of_India_logo.svg/200px-Agriculture_Insurance_Company_of_India_logo.svg.png",
      policyId: "POL-2022-0501",
      amount: "₹45,000",
      date: "5 अगस्त, 2023",
      status: "rejected",
      progress: 100,
      steps: [
        { name: "दावा दर्ज", completed: true, date: "5 अगस्त, 2023" },
        { name: "दस्तावेज़ सत्यापन", completed: true, date: "8 अगस्त, 2023" },
        { name: "क्षेत्र निरीक्षण", completed: true, date: "12 अगस्त, 2023" },
        { name: "मूल्यांकन", completed: true, date: "15 अगस्त, 2023" },
        { name: "अंतिम निर्णय", completed: true, date: "20 अगस्त, 2023", rejected: true }
      ]
    }
  ];

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "processing":
        return (
          <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>प्रक्रियाधीन</span>
          </div>
        );
      case "approved":
        return (
          <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            <span>स्वीकृत</span>
          </div>
        );
      case "rejected":
        return (
          <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            <span>अस्वीकृत</span>
          </div>
        );
      case "pending":
        return (
          <div className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span>लंबित</span>
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
        <h2 className="text-2xl font-bold text-gray-800">दावा स्थिति</h2>
        <button className="text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-1">
          <FileText className="h-4 w-4" />
          <span>नया दावा दर्ज करें</span>
        </button>
      </div>

      {/* Claims List */}
      <div className="space-y-4">
        {claims.map((claim) => (
          <motion.div 
            key={claim.id}
            variants={cardVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* Claim Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={claim.logo} alt={claim.provider} className="h-12 w-12 object-contain bg-gray-50 p-1 rounded-md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-800">{claim.type}</h3>
                      <StatusBadge status={claim.status} />
                    </div>
                    <p className="text-sm text-gray-600">{claim.provider}</p>
                    <p className="text-xs text-gray-500">पॉलिसी: {claim.policyId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-800">{claim.amount}</div>
                  <p className="text-xs text-gray-500">दावा दिनांक: {claim.date}</p>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">प्रगति</span>
                <span className="text-xs font-medium text-gray-700">{claim.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className={`h-2 rounded-full ${claim.status === 'rejected' ? 'bg-red-500' : claim.status === 'approved' ? 'bg-green-600' : 'bg-blue-600'}`} 
                  style={{ width: `${claim.progress}%` }}
                ></div>
              </div>
            </div>
            
            {/* Claim Steps */}
            <div className="p-6">
              <h4 className="text-sm font-medium text-gray-800 mb-4">दावा प्रक्रिया</h4>
              
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-6">
                  {claim.steps.map((step, index) => (
                    <div key={index} className="relative flex gap-4">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                        step.completed 
                          ? step.rejected 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-green-100 text-green-600' 
                          : step.inProgress 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.completed 
                          ? step.rejected 
                            ? <XCircle className="h-5 w-5" /> 
                            : <CheckCircle className="h-5 w-5" /> 
                          : step.inProgress 
                            ? <Clock className="h-5 w-5" /> 
                            : index + 1
                        }
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-800">{step.name}</h5>
                        <p className="text-xs text-gray-500">{step.date}</p>
                        
                        {step.rejected && (
                          <div className="mt-2 bg-red-50 border-l-2 border-red-500 p-2">
                            <p className="text-xs text-red-600">दावा अस्वीकृत: मौसम डेटा के अनुसार, आपके क्षेत्र में अत्यधिक वर्षा का स्तर नुकसान सीमा से कम था।</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {claim.status === 'processing' && (
                <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <h5 className="text-sm font-medium text-gray-800">अगला कदम</h5>
                    <p className="text-xs text-gray-500">क्षेत्र निरीक्षण 15 नवंबर, 2023 को निर्धारित है</p>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    <span>अधिक जानकारी</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              {claim.status === 'rejected' && (
                <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <h5 className="text-sm font-medium text-gray-800">अपील करें</h5>
                    <p className="text-xs text-gray-500">आप 30 दिनों के भीतर इस निर्णय के खिलाफ अपील कर सकते हैं</p>
                  </div>
                  <button className="text-sm bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors">
                    अपील दर्ज करें
                  </button>
                </div>
              )}
              
              {claim.status === 'approved' && (
                <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <h5 className="text-sm font-medium text-gray-800">भुगतान विवरण</h5>
                    <p className="text-xs text-gray-500">आपके बैंक खाते में ₹20,000 का भुगतान किया गया</p>
                    <p className="text-xs text-gray-500">लेनदेन संख्या: TXN-2023100501</p>
                  </div>
                  <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>रसीद डाउनलोड करें</span>
                  </button>
                </div>
              )}
            </div>
            
            {/* Document Upload Section - Only for processing claims */}
            {claim.status === 'processing' && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-800">दस्तावेज़ अपलोड</h4>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    <Upload className="h-3 w-3" />
                    <span>सभी अपलोड करें</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-3 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-medium text-gray-800">क्षति के फोटो</h5>
                      <span className="text-xs text-amber-600 font-medium">आवश्यक</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">फसल क्षति के कम से कम 3 फोटो अपलोड करें</p>
                    <button className="w-full border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
                      <Camera className="h-6 w-6 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">फोटो अपलोड करें</span>
                      <span className="text-xs text-gray-500 mt-1">या फाइल खींचकर यहां छोड़ें</span>
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-3 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-medium text-gray-800">भूमि रिकॉर्ड</h5>
                      <span className="text-xs text-green-600 font-medium">अपलोड किया गया</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">आपके भूमि स्वामित्व का प्रमाण</p>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">land_record.pdf</span>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Communication Section */}
            <div className="p-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-800">संचार</h4>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  <span>सभी संदेश देखें</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              
              <div className="space-y-4">
                {claim.status === 'processing' && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-1 rounded-full">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-medium text-gray-800">बीमा एजेंट</h5>
                          <span className="text-xs text-gray-500">2 दिन पहले</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">हमारा निरीक्षक 15 नवंबर को आपके खेत का दौरा करेगा। कृपया उस दिन उपस्थित रहें।</p>
                        
                        <div className="mt-3 flex justify-end">
                          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                            जवाब दें
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {claim.status === 'rejected' && (
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-100 p-1 rounded-full">
                        <MessageSquare className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-medium text-gray-800">दावा प्रबंधक</h5>
                          <span className="text-xs text-gray-500">10 दिन पहले</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">आपका दावा अस्वीकृत कर दिया गया है। मौसम डेटा के अनुसार, आपके क्षेत्र में वर्षा का स्तर नुकसान सीमा से कम था। अधिक जानकारी के लिए विस्तृत रिपोर्ट देखें।</p>
                        
                        <div className="mt-3 flex justify-end">
                          <button className="text-xs text-red-600 hover:text-red-700 font-medium">
                            रिपोर्ट देखें
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {claim.status === 'approved' && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full">
                        <MessageSquare className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-medium text-gray-800">दावा प्रबंधक</h5>
                          <span className="text-xs text-gray-500">15 दिन पहले</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">आपका दावा स्वीकृत कर लिया गया है। ₹20,000 की राशि आपके बैंक खाते में 5 अक्टूबर, 2023 को स्थानांतरित कर दी गई है।</p>
                        
                        <div className="mt-3 flex justify-end">
                          <button className="text-xs text-green-600 hover:text-green-700 font-medium">
                            धन्यवाद भेजें
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Message Input - Only for processing claims */}
              {claim.status === 'processing' && (
                <div className="mt-4">
                  <div className="relative">
                    <input
                      type="text"
                      className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="संदेश लिखें..."
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button className="text-blue-600 hover:text-blue-700">
                        <MessageSquare className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Claim Guide */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">दावा दर्ज करने का मार्गदर्शन</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">1. दावा फॉर्म भरें</h4>
              <p className="text-xs text-gray-500">अपनी पॉलिसी संख्या, क्षति का प्रकार और तिथि सहित सभी आवश्यक विवरण प्रदान करें।</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">2. दस्तावेज़ अपलोड करें</h4>
              <p className="text-xs text-gray-500">क्षति के फोटो, भूमि रिकॉर्ड और अन्य आवश्यक दस्तावेज़ अपलोड करें।</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">3. निरीक्षण की प्रतीक्षा करें</h4>
              <p className="text-xs text-gray-500">हमारा एजेंट आपके खेत/पशुधन का निरीक्षण करेगा और आपके दावे का मूल्यांकन करेगा।</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1">
              <Umbrella className="h-4 w-4" />
              <span>नया दावा दर्ज करें</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">अक्सर पूछे जाने वाले प्रश्न</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">दावा दर्ज करने के लिए कितना समय है?</h4>
              <p className="text-sm text-gray-600">क्षति होने के 7 दिनों के भीतर दावा दर्ज करना आवश्यक है। देरी से दर्ज किए गए दावों के लिए अतिरिक्त दस्तावेज़ और स्पष्टीकरण की आवश्यकता हो सकती है।</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">दावे के निपटान में कितना समय लगता है?</h4>
              <p className="text-sm text-gray-600">सभी दस्तावेज़ प्राप्त होने और निरीक्षण पूरा होने के बाद, दावे का निपटान आमतौर पर 15-30 दिनों के भीतर किया जाता है।</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">क्या मैं अस्वीकृत दावे के खिलाफ अपील कर सकता हूं?</h4>
              <p className="text-sm text-gray-600">हां, आप अस्वीकृति की सूचना प्राप्त होने के 30 दिनों के भीतर अपील दर्ज कर सकते हैं। अपील के साथ अतिरिक्त प्रमाण या दस्तावेज़ प्रदान करें।</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              <span>और प्रश्न देखें</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClaimStatus;