import React from "react";
import { motion } from "framer-motion";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  FileText, 
  ChevronRight,
  Download,
  MessageSquare
} from "lucide-react";

const ApplicationStatus = () => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Sample application data
  const applications = [
    {
      id: "APP-2023-1205",
      type: "फसल ऋण",
      provider: "स्टेट बैंक ऑफ इंडिया",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/200px-SBI-logo.svg.png",
      amount: "₹1,50,000",
      date: "5 दिसंबर, 2023",
      status: "processing", // processing, approved, rejected, pending
      progress: 60,
      steps: [
        { name: "आवेदन जमा", completed: true, date: "5 दिसंबर, 2023" },
        { name: "दस्तावेज़ सत्यापन", completed: true, date: "7 दिसंबर, 2023" },
        { name: "क्रेडिट मूल्यांकन", completed: false, inProgress: true, date: "प्रगति में" },
        { name: "अंतिम अनुमोदन", completed: false, date: "लंबित" },
        { name: "वितरण", completed: false, date: "लंबित" }
      ]
    },
    {
      id: "APP-2023-1102",
      type: "उपकरण ऋण",
      provider: "पंजाब नेशनल बैंक",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Punjab_National_Bank_logo.svg/200px-Punjab_National_Bank_logo.svg.png",
      amount: "₹75,000",
      date: "2 नवंबर, 2023",
      status: "approved",
      progress: 100,
      steps: [
        { name: "आवेदन जमा", completed: true, date: "2 नवंबर, 2023" },
        { name: "दस्तावेज़ सत्यापन", completed: true, date: "5 नवंबर, 2023" },
        { name: "क्रेडिट मूल्यांकन", completed: true, date: "10 नवंबर, 2023" },
        { name: "अंतिम अनुमोदन", completed: true, date: "15 नवंबर, 2023" },
        { name: "वितरण", completed: true, date: "20 नवंबर, 2023" }
      ]
    },
    {
      id: "APP-2023-0915",
      type: "फसल बीमा",
      provider: "एग्रीकल्चर इंश्योरेंस कंपनी",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Agriculture_Insurance_Company_of_India_logo.svg/200px-Agriculture_Insurance_Company_of_India_logo.svg.png",
      amount: "₹50,000 कवरेज",
      date: "15 सितंबर, 2023",
      status: "rejected",
      progress: 100,
      steps: [
        { name: "आवेदन जमा", completed: true, date: "15 सितंबर, 2023" },
        { name: "दस्तावेज़ सत्यापन", completed: true, date: "18 सितंबर, 2023" },
        { name: "क्षेत्र निरीक्षण", completed: true, date: "25 सितंबर, 2023" },
        { name: "अंतिम निर्णय", completed: true, date: "30 सितंबर, 2023", rejected: true },
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
        <h2 className="text-2xl font-bold text-gray-800">आवेदन स्थिति</h2>
        <button className="text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-1">
          <FileText className="h-4 w-4" />
          <span>नया आवेदन</span>
        </button>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {applications.map((app) => (
          <motion.div 
            key={app.id}
            variants={cardVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* Application Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={app.logo} alt={app.provider} className="h-12 w-12 object-contain bg-gray-50 p-1 rounded-md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-800">{app.type}</h3>
                      <StatusBadge status={app.status} />
                    </div>
                    <p className="text-sm text-gray-600">{app.provider}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-800">{app.amount}</div>
                  <p className="text-xs text-gray-500">आवेदन: {app.date}</p>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">प्रगति</span>
                <span className="text-xs font-medium text-gray-700">{app.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className={`h-2 rounded-full ${app.status === 'rejected' ? 'bg-red-500' : 'bg-green-600'}`} 
                  style={{ width: `${app.progress}%` }}
                ></div>
              </div>
            </div>
            
            {/* Application Steps */}
            <div className="p-6">
              <h4 className="text-sm font-medium text-gray-800 mb-4">आवेदन प्रक्रिया</h4>
              
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-6">
                  {app.steps.map((step, index) => (
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
                        <p className="mt-1 text-xs text-gray-500">{step.date}</p>
                        
                        {step.rejected && (
                          <div className="mt-2 bg-red-50 border-l-4 border-red-500 p-3">
                            <p className="text-xs text-red-700">आपका आवेदन अस्वीकृत कर दिया गया है। कारण: अपर्याप्त भूमि दस्तावेज़।</p>
                            <button className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>विस्तृत कारण देखें</span>
                            </button>
                          </div>
                        )}
                        
                        {step.completed && step.name === "अंतिम अनुमोदन" && app.status === "approved" && (
                          <div className="mt-2 bg-green-50 border-l-4 border-green-500 p-3">
                            <p className="text-xs text-green-700">आपका आवेदन स्वीकृत कर दिया गया है। कृपया अनुमोदन पत्र डाउनलोड करें।</p>
                            <button className="mt-1 text-xs text-green-600 font-medium flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              <span>अनुमोदन पत्र डाउनलोड करें</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>सहायता प्राप्त करें</span>
                </button>
                <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                  <span>विस्तृत जानकारी</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* No Applications State */}
      {applications.length === 0 && (
        <motion.div 
          variants={cardVariants}
          className="bg-white rounded-xl shadow-md p-8 text-center"
        >
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">कोई आवेदन नहीं</h3>
          <p className="text-gray-600 mb-6">आपने अभी तक कोई ऋण या बीमा आवेदन नहीं किया है।</p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            अपना पहला आवेदन शुरू करें
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ApplicationStatus;