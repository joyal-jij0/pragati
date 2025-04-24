import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Filter, 
  ChevronDown, 
  Star, 
  Clock, 
  Calendar, 
  Percent, 
  CheckCircle, 
  XCircle
} from "lucide-react";

const LoanMarketplace = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [loanType, setLoanType] = useState("all");
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const loanProducts = [
    {
      id: 1,
      name: "किसान क्रेडिट कार्ड",
      provider: "स्टेट बैंक ऑफ इंडिया",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/200px-SBI-logo.svg.png",
      interestRate: "7.0%",
      maxAmount: "₹3,00,000",
      duration: "12 महीने",
      eligible: true,
      featured: true,
      type: "crop"
    },
    {
      id: 2,
      name: "फसल उत्पादन ऋण",
      provider: "पंजाब नेशनल बैंक",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Punjab_National_Bank_logo.svg/200px-Punjab_National_Bank_logo.svg.png",
      interestRate: "9.5%",
      maxAmount: "₹2,00,000",
      duration: "24 महीने",
      eligible: true,
      featured: false,
      type: "crop"
    },
    {
      id: 3,
      name: "छोटे किसान विकास ऋण",
      provider: "NABARD",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/NABARD_Logo.svg/200px-NABARD_Logo.svg.png",
      interestRate: "8.75%",
      maxAmount: "₹1,50,000",
      duration: "36 महीने",
      eligible: true,
      featured: false,
      type: "development"
    },
    {
      id: 4,
      name: "कृषि उपकरण ऋण",
      provider: "HDFC बैंक",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/200px-HDFC_Bank_Logo.svg.png",
      interestRate: "10.5%",
      maxAmount: "₹5,00,000",
      duration: "48 महीने",
      eligible: false,
      featured: false,
      type: "equipment"
    },
    {
      id: 5,
      name: "सिंचाई परियोजना ऋण",
      provider: "बैंक ऑफ बड़ौदा",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Bank_of_Baroda_logo.svg/200px-Bank_of_Baroda_logo.svg.png",
      interestRate: "8.25%",
      maxAmount: "₹2,50,000",
      duration: "36 महीने",
      eligible: true,
      featured: false,
      type: "infrastructure"
    }
  ];

  const filteredLoans = loanType === "all" 
    ? loanProducts 
    : loanProducts.filter(loan => loan.type === loanType);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">ऋण बाज़ार</h2>
        <button 
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-1 text-sm bg-white px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50"
        >
          <Filter className="h-4 w-4" />
          <span>फ़िल्टर</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filters */}
      {filterOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-xl shadow-md p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ऋण प्रकार</label>
              <select 
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={loanType}
                onChange={(e) => setLoanType(e.target.value)}
              >
                <option value="all">सभी ऋण</option>
                <option value="crop">फसल ऋण</option>
                <option value="equipment">उपकरण ऋण</option>
                <option value="development">विकास ऋण</option>
                <option value="infrastructure">बुनियादी ढांचा ऋण</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">अधिकतम ब्याज दर</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>कोई सीमा नहीं</option>
                <option>7%</option>
                <option>8%</option>
                <option>9%</option>
                <option>10%</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ऋण अवधि</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>कोई प्राथमिकता नहीं</option>
                <option>12 महीने तक</option>
                <option>24 महीने तक</option>
                <option>36 महीने तक</option>
                <option>36+ महीने</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end gap-2">
            <button className="text-sm text-gray-600 hover:text-gray-800">रीसेट करें</button>
            <button className="text-sm bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700">लागू करें</button>
          </div>
        </motion.div>
      )}

      {/* Featured Loan */}
      {filteredLoans.some(loan => loan.featured) && (
        <motion.div 
          variants={cardVariants}
          className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl shadow-md overflow-hidden border border-amber-200"
        >
          <div className="px-6 py-3 bg-amber-500 text-white flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">विशेष ऋण</span>
            </div>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">आपके लिए अनुशंसित</span>
          </div>
          
          {filteredLoans.filter(loan => loan.featured).map(loan => (
            <div key={loan.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={loan.logo} alt={loan.provider} className="h-12 w-12 object-contain bg-white p-1 rounded-md" />
                  <div>
                    <h3 className="font-medium text-gray-800">{loan.name}</h3>
                    <p className="text-sm text-gray-600">{loan.provider}</p>
                  </div>
                </div>
                <div className="bg-white px-3 py-1 rounded-full text-sm font-medium text-green-600 border border-green-200">
                  पात्र
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-1">
                    <Percent className="h-4 w-4" />
                    <span>ब्याज दर</span>
                  </div>
                  <div className="font-semibold text-gray-800">{loan.interestRate}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-1">
                    <CreditCard className="h-4 w-4" />
                    <span>अधिकतम राशि</span>
                  </div>
                  <div className="font-semibold text-gray-800">{loan.maxAmount}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>अवधि</span>
                  </div>
                  <div className="font-semibold text-gray-800">{loan.duration}</div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-md text-sm font-medium transition-colors">
                  आवेदन करें
                </button>
                <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-md text-sm font-medium transition-colors">
                  अधिक जानकारी
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Other Loans */}
      <div className="space-y-4">
        {filteredLoans.filter(loan => !loan.featured).map(loan => (
          <motion.div 
            key={loan.id}
            variants={cardVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={loan.logo} alt={loan.provider} className="h-12 w-12 object-contain bg-gray-50 p-1 rounded-md" />
                  <div>
                    <h3 className="font-medium text-gray-800">{loan.name}</h3>
                    <p className="text-sm text-gray-600">{loan.provider}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${loan.eligible ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-gray-50 text-gray-600 border border-gray-200'}`}>
                  {loan.eligible ? 'पात्र' : 'अपात्र'}
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
                    <Percent className="h-3 w-3" />
                    <span>ब्याज दर</span>
                  </div>
                  <div className="font-semibold text-gray-800">{loan.interestRate}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
                    <CreditCard className="h-3 w-3" />
                    <span>अधिकतम राशि</span>
                  </div>
                  <div className="font-semibold text-gray-800">{loan.maxAmount}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
                    <Calendar className="h-3 w-3" />
                    <span>अवधि</span>
                  </div>
                  <div className="font-semibold text-gray-800">{loan.duration}</div>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button 
                  className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors ${loan.eligible ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  disabled={!loan.eligible}
                >
                  आवेदन करें
                </button>
                <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-1.5 rounded-md text-sm font-medium transition-colors">
                  विवरण
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Eligibility Info */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">ऋण पात्रता आवश्यकताएँ</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">न्यूनतम क्रेडिट स्कोर</p>
                <p className="text-xs text-gray-600">अधिकांश ऋणों के लिए 60/100 या उससे अधिक स्कोर की आवश्यकता होती है</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">फसल उत्पादन रिकॉर्ड</p>
                <p className="text-xs text-gray-600">पिछले 2 सीज़न के फसल उत्पादन का प्रमाण</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">भूमि रिकॉर्ड</p>
                <p className="text-xs text-gray-600">खेती की भूमि के स्वामित्व या पट्टे का प्रमाण</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">बकाया ऋण</p>
                <p className="text-xs text-gray-600">अधिकांश ऋणदाता आपको नया ऋण नहीं देंगे यदि आपके पास पहले से बकाया ऋण है</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <div className="bg-green-100 p-1 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">आपका वर्तमान स्कोर: 68/100</p>
                <p className="text-xs text-gray-600">आप अधिकांश ऋणों के लिए पात्र हैं। अपने स्कोर को बढ़ाने के लिए अपनी फसल बिक्री रिकॉर्ड अपडेट करें और सलाह का पालन करें।</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Application Process */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">आवेदन प्रक्रिया</h3>
        </div>
        
        <div className="p-6">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              <div className="relative flex gap-4">
                <div className="bg-green-600 text-white h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 z-10">1</div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">ऋण चुनें</h4>
                  <p className="mt-1 text-xs text-gray-600">अपनी आवश्यकताओं के अनुसार उपयुक्त ऋण विकल्प चुनें</p>
                </div>
              </div>
              
              <div className="relative flex gap-4">
                <div className="bg-green-600 text-white h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 z-10">2</div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">आवेदन फॉर्म भरें</h4>
                  <p className="mt-1 text-xs text-gray-600">अपनी व्यक्तिगत, फसल और भूमि जानकारी प्रदान करें</p>
                </div>
              </div>
              
              <div className="relative flex gap-4">
                <div className="bg-green-600 text-white h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 z-10">3</div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">दस्तावेज़ अपलोड करें</h4>
                  <p className="mt-1 text-xs text-gray-600">आधार कार्ड, भूमि रिकॉर्ड और फसल उत्पादन प्रमाण अपलोड करें</p>
                </div>
              </div>
              
              <div className="relative flex gap-4">
                <div className="bg-green-600 text-white h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 z-10">4</div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">डिजिटल सत्यापन</h4>
                  <p className="mt-1 text-xs text-gray-600">वीडियो कॉल के माध्यम से अपनी पहचान सत्यापित करें</p>
                </div>
              </div>
              
              <div className="relative flex gap-4">
                <div className="bg-green-600 text-white h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 z-10">5</div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">मंजूरी और वितरण</h4>
                  <p className="mt-1 text-xs text-gray-600">आवेदन स्वीकृत होने पर, राशि सीधे आपके बैंक खाते में जमा की जाएगी</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              अभी आवेदन शुरू करें
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
        
        <div className="p-6 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-800">क्या मैं एक से अधिक ऋण के लिए आवेदन कर सकता हूँ?</h4>
            <p className="mt-1 text-xs text-gray-600">हां, आप एक से अधिक ऋण के लिए आवेदन कर सकते हैं, लेकिन आपकी कुल ऋण राशि आपकी पात्रता सीमा से अधिक नहीं होनी चाहिए।</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-800">ऋण आवेदन की प्रक्रिया में कितना समय लगता है?</h4>
            <p className="mt-1 text-xs text-gray-600">आमतौर पर, आवेदन प्रक्रिया 3-5 कार्य दिवसों में पूरी हो जाती है, बशर्ते सभी दस्तावेज़ सही हों।</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-800">क्या मैं अपना ऋण जल्दी चुका सकता हूँ?</h4>
            <p className="mt-1 text-xs text-gray-600">हां, अधिकांश ऋणों में पूर्व भुगतान का विकल्प होता है, और कुछ में पूर्व भुगतान शुल्क भी नहीं लिया जाता है।</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-800">यदि मेरा क्रेडिट स्कोर कम है तो क्या होगा?</h4>
            <p className="mt-1 text-xs text-gray-600">कम क्रेडिट स्कोर वाले किसानों के लिए भी कुछ विशेष ऋण योजनाएँ उपलब्ध हैं, लेकिन ब्याज दर अधिक हो सकती है।</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-800">क्या मैं अपने मोबाइल से ऋण के लिए आवेदन कर सकता हूँ?</h4>
            <p className="mt-1 text-xs text-gray-600">हां, आप हमारे मोबाइल ऐप या वेबसाइट के माध्यम से कहीं से भी ऋण के लिए आवेदन कर सकते हैं।</p>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">अन्य प्रश्न?</p>
            <button className="text-sm text-green-600 font-medium hover:text-green-700">
              हमसे संपर्क करें →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoanMarketplace;