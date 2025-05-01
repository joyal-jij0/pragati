import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Umbrella, 
  Shield, 
  AlertTriangle, 
  FileText, 
  Check, 
  X,
  ArrowRight,
  Search,
  Filter,
  Leaf,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  Bug,
  Tractor,
} from "lucide-react";

const InsuranceProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Insurance product categories
  const categories = [
    { id: "all", name: "सभी" },
    { id: "crop", name: "फसल बीमा" },
    { id: "livestock", name: "पशुधन बीमा" },
    { id: "equipment", name: "उपकरण बीमा" },
    { id: "weather", name: "मौसम बीमा" }
  ];

  // Sample insurance products data
  const insuranceProducts = [
    {
      id: 1,
      name: "प्रधानमंत्री फसल बीमा योजना",
      provider: "एग्रीकल्चर इंश्योरेंस कंपनी",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Agriculture_Insurance_Company_of_India_logo.svg/200px-Agriculture_Insurance_Company_of_India_logo.svg.png",
      category: "crop",
      coverageAmount: "फसल मूल्य का 80% तक",
      premium: "प्रीमियम का 2% किसान द्वारा, शेष सरकार द्वारा",
      description: "सभी खाद्य फसलों, तिलहन और वार्षिक वाणिज्यिक/बागवानी फसलों के लिए व्यापक बीमा कवर।",
      eligibility: "सभी किसान जो बैंकों से ऋण लेते हैं और स्वैच्छिक आधार पर गैर-ऋणी किसान।",
      benefits: [
        "फसल कटाई के बाद के नुकसान के लिए कवरेज",
        "स्थानीय आपदाओं के कारण नुकसान के लिए कवरेज",
        "बुवाई न कर पाने की स्थिति में बीमा"
      ],
      risks: [
        { name: "सूखा", icon: <Sun className="h-4 w-4" /> },
        { name: "बाढ़", icon: <Droplets className="h-4 w-4" /> },
        { name: "कीट", icon: <Bug className="h-4 w-4" /> }
      ],
      documents: ["आधार कार्ड", "भूमि रिकॉर्ड", "बैंक विवरण", "फसल बुवाई प्रमाण"],
      recommended: true,
      popularityScore: 95
    },
    {
      id: 2,
      name: "मौसम आधारित फसल बीमा",
      provider: "भारतीय कृषि बीमा कंपनी",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Agriculture_Insurance_Company_of_India_logo.svg/200px-Agriculture_Insurance_Company_of_India_logo.svg.png",
      category: "weather",
      coverageAmount: "फसल मूल्य का 70% तक",
      premium: "₹1,500 - ₹3,000 प्रति एकड़",
      description: "मौसम के पैरामीटर जैसे वर्षा, तापमान आदि के आधार पर बीमा कवरेज।",
      eligibility: "सभी किसान जिनके पास भूमि का स्वामित्व या पट्टा है।",
      benefits: [
        "मौसम स्टेशन के आंकड़ों के आधार पर स्वचालित भुगतान",
        "फसल के नुकसान का प्रमाण देने की आवश्यकता नहीं",
        "त्वरित दावा निपटान"
      ],
      risks: [
        { name: "कम वर्षा", icon: <Droplets className="h-4 w-4" /> },
        { name: "अधिक तापमान", icon: <Sun className="h-4 w-4" /> },
        { name: "तेज हवा", icon: <Wind className="h-4 w-4" /> }
      ],
      documents: ["आधार कार्ड", "भूमि रिकॉर्ड", "बैंक विवरण"],
      recommended: false,
      popularityScore: 80
    },
    {
      id: 3,
      name: "पशुधन बीमा योजना",
      provider: "भारतीय जीवन बीमा निगम",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Life_Insurance_Corporation_of_India.svg/200px-Life_Insurance_Corporation_of_India.svg.png",
      category: "livestock",
      coverageAmount: "पशु मूल्य का 90% तक",
      premium: "मूल्य का 3-5% वार्षिक",
      description: "गाय, भैंस, बकरी और अन्य पशुओं के लिए व्यापक बीमा कवरेज।",
      eligibility: "सभी पशुपालक जिनके पास स्वस्थ पशु हैं।",
      benefits: [
        "प्राकृतिक मृत्यु के मामले में कवरेज",
        "बीमारी के कारण मृत्यु के लिए कवरेज",
        "दुर्घटना के कारण मृत्यु के लिए कवरेज"
      ],
      risks: [
        { name: "बीमारी", icon: <AlertTriangle className="h-4 w-4" /> },
        { name: "दुर्घटना", icon: <AlertTriangle className="h-4 w-4" /> },
        { name: "प्राकृतिक आपदा", icon: <CloudRain className="h-4 w-4" /> }
      ],
      documents: ["आधार कार्ड", "पशु स्वास्थ्य प्रमाणपत्र", "पशु फोटो", "बैंक विवरण"],
      recommended: true,
      popularityScore: 85
    },
    {
      id: 4,
      name: "कृषि उपकरण बीमा",
      provider: "न्यू इंडिया एश्योरेंस",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/New_India_Assurance_Logo.svg/200px-New_India_Assurance_Logo.svg.png",
      category: "equipment",
      coverageAmount: "उपकरण मूल्य का 100% तक",
      premium: "मूल्य का 2% वार्षिक",
      description: "ट्रैक्टर, थ्रेशर, पंप सेट और अन्य कृषि उपकरणों के लिए बीमा कवरेज।",
      eligibility: "सभी किसान जिनके पास कृषि उपकरण हैं।",
      benefits: [
        "चोरी के मामले में कवरेज",
        "दुर्घटना के कारण क्षति के लिए कवरेज",
        "प्राकृतिक आपदा के कारण क्षति के लिए कवरेज"
      ],
      risks: [
        { name: "दुर्घटना", icon: <AlertTriangle className="h-4 w-4" /> },
        { name: "चोरी", icon: <AlertTriangle className="h-4 w-4" /> },
        { name: "प्राकृतिक आपदा", icon: <CloudRain className="h-4 w-4" /> }
      ],
      documents: ["आधार कार्ड", "उपकरण खरीद बिल", "उपकरण फोटो", "बैंक विवरण"],
      recommended: false,
      popularityScore: 70
    }
  ];

  // Filter products based on search term and category
  const filteredProducts = insuranceProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">बीमा योजनाएँ</h2>
        <button 
          className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-1"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          <span>फिल्टर {showFilters ? 'छुपाएं' : 'दिखाएं'}</span>
        </button>
      </div>

      {/* Search and Filters */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="बीमा योजना या प्रदाता खोजें..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {showFilters && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">श्रेणी द्वारा फ़िल्टर करें</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedCategory === category.id
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Insurance Products List */}
      <div className="space-y-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <motion.div 
              key={product.id}
              variants={cardVariants}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <img 
                    src={product.logo} 
                    alt={product.provider} 
                    className="h-16 w-16 object-contain bg-gray-50 p-2 rounded-md"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.provider}</p>
                      </div>
                      
                      {product.recommended && (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                          अनुशंसित
                        </span>
                      )}
                    </div>
                    
                    <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-1">कवरेज</h4>
                        <p className="text-sm font-medium text-gray-800">{product.coverageAmount}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-1">प्रीमियम</h4>
                        <p className="text-sm font-medium text-gray-800">{product.premium}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-xs font-medium text-gray-500 mb-1">कवर किए गए जोखिम</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {product.risks.map((risk, index) => (
                          <div key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs flex items-center gap-1">
                            {risk.icon}
                            <span>{risk.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-xs font-medium text-gray-500 mb-1">लाभ</h4>
                      <ul className="space-y-1">
                        {product.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-1">आवश्यक दस्तावेज़</h4>
                        <p className="text-sm text-gray-600">{product.documents.join(", ")}</p>
                      </div>
                      
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1">
                        <span>आवेदन करें</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <motion.div 
            variants={cardVariants}
            className="bg-white rounded-xl shadow-md p-8 text-center"
          >
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Umbrella className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">कोई बीमा योजना नहीं मिली</h3>
            <p className="text-gray-600 mb-6">आपके खोज मापदंडों से मेल खाने वाली कोई बीमा योजना नहीं मिली।</p>
            <button 
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              फिल्टर साफ़ करें
            </button>
          </motion.div>
        )}
      </div>

      {/* Insurance Comparison */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">बीमा तुलना</h3>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">अपनी आवश्यकताओं के अनुसार विभिन्न बीमा योजनाओं की तुलना करें।</p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    बीमा योजना
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    कवरेज
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    प्रीमियम
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    जोखिम कवरेज
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    लोकप्रियता
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {insuranceProducts.slice(0, 3).map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 object-contain" src={product.logo} alt={product.provider} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.provider}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.coverageAmount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{product.premium}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-1">
                        {product.risks.map((risk, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {risk.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-2 w-24 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-green-600 rounded-full" 
                            style={{ width: `${product.popularityScore}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-500">{product.popularityScore}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              विस्तृत तुलना देखें
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InsuranceProducts;