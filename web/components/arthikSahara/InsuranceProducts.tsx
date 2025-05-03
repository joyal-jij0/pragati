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
    { id: "all", name: "All" },
    { id: "crop", name: "Crop Insurance" },
    { id: "livestock", name: "Livestock Insurance" },
    { id: "equipment", name: "Equipment Insurance" },
    { id: "weather", name: "Weather Insurance" }
  ];

  // Sample insurance products data
  const insuranceProducts = [
    {
      id: 1,
      name: "Pradhan Mantri Fasal Bima Yojana",
      provider: "Agriculture Insurance Company",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Agriculture_Insurance_Company_of_India_logo.svg/200px-Agriculture_Insurance_Company_of_India_logo.svg.png",
      category: "crop",
      coverageAmount: "Up to 80% of crop value",
      premium: "2% by farmer, rest by government",
      description: "Comprehensive insurance cover for all food crops, oilseeds, and annual commercial/horticultural crops.",
      eligibility: "All farmers taking loans from banks and non-loanee farmers on a voluntary basis.",
      benefits: [
        "Coverage for post-harvest losses",
        "Coverage for losses due to localized disasters",
        "Insurance for inability to sow"
      ],
      risks: [
        { name: "Drought", icon: <Sun className="h-4 w-4" /> },
        { name: "Flood", icon: <Droplets className="h-4 w-4" /> },
        { name: "Pests", icon: <Bug className="h-4 w-4" /> }
      ],
      documents: ["Aadhaar Card", "Land Records", "Bank Details", "Crop Sowing Certificate"],
      recommended: true,
      popularityScore: 95
    },
    {
      id: 2,
      name: "Weather-Based Crop Insurance",
      provider: "Indian Agriculture Insurance Company",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Agriculture_Insurance_Company_of_India_logo.svg/200px-Agriculture_Insurance_Company_of_India_logo.svg.png",
      category: "weather",
      coverageAmount: "Up to 70% of crop value",
      premium: "₹1,500 - ₹3,000 per acre",
      description: "Insurance coverage based on weather parameters like rainfall, temperature, etc.",
      eligibility: "All farmers owning or leasing land.",
      benefits: [
        "Automatic payouts based on weather station data",
        "No need to prove crop loss",
        "Quick claim settlement"
      ],
      risks: [
        { name: "Low Rainfall", icon: <Droplets className="h-4 w-4" /> },
        { name: "High Temperature", icon: <Sun className="h-4 w-4" /> },
        { name: "Strong Winds", icon: <Wind className="h-4 w-4" /> }
      ],
      documents: ["Aadhaar Card", "Land Records", "Bank Details"],
      recommended: false,
      popularityScore: 80
    },
    {
      id: 3,
      name: "Livestock Insurance Scheme",
      provider: "Life Insurance Corporation of India",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Life_Insurance_Corporation_of_India.svg/200px-Life_Insurance_Corporation_of_India.svg.png",
      category: "livestock",
      coverageAmount: "Up to 90% of animal value",
      premium: "3-5% of value annually",
      description: "Comprehensive insurance coverage for cows, buffaloes, goats, and other animals.",
      eligibility: "All livestock owners with healthy animals.",
      benefits: [
        "Coverage in case of natural death",
        "Coverage for death due to illness",
        "Coverage for death due to accidents"
      ],
      risks: [
        { name: "Illness", icon: <AlertTriangle className="h-4 w-4" /> },
        { name: "Accidents", icon: <AlertTriangle className="h-4 w-4" /> },
        { name: "Natural Disasters", icon: <CloudRain className="h-4 w-4" /> }
      ],
      documents: ["Aadhaar Card", "Animal Health Certificate", "Animal Photo", "Bank Details"],
      recommended: true,
      popularityScore: 85
    },
    {
      id: 4,
      name: "Agricultural Equipment Insurance",
      provider: "New India Assurance",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/New_India_Assurance_Logo.svg/200px-New_India_Assurance_Logo.svg.png",
      category: "equipment",
      coverageAmount: "Up to 100% of equipment value",
      premium: "2% of value annually",
      description: "Insurance coverage for tractors, threshers, pump sets, and other agricultural equipment.",
      eligibility: "All farmers owning agricultural equipment.",
      benefits: [
        "Coverage in case of theft",
        "Coverage for damage due to accidents",
        "Coverage for damage due to natural disasters"
      ],
      risks: [
        { name: "Accidents", icon: <AlertTriangle className="h-4 w-4" /> },
        { name: "Theft", icon: <AlertTriangle className="h-4 w-4" /> },
        { name: "Natural Disasters", icon: <CloudRain className="h-4 w-4" /> }
      ],
      documents: ["Aadhaar Card", "Equipment Purchase Bill", "Equipment Photo", "Bank Details"],
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
        <h2 className="text-2xl font-bold text-gray-800">Insurance Plans</h2>
        <button 
          className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-1"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          <span>Show Filters</span>
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
              placeholder="Search for insurance plans or providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {showFilters && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by Category</h3>
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
                          Recommended
                        </span>
                      )}
                    </div>
                    
                    <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-1">Coverage</h4>
                        <p className="text-sm font-medium text-gray-800">{product.coverageAmount}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-1">Premium</h4>
                        <p className="text-sm font-medium text-gray-800">{product.premium}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-xs font-medium text-gray-500 mb-1">Covered Risks</h4>
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
                      <h4 className="text-xs font-medium text-gray-500 mb-1">Benefits</h4>
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
                        <h4 className="text-xs font-medium text-gray-500 mb-1">Required Documents</h4>
                        <p className="text-sm text-gray-600">{product.documents.join(", ")}</p>
                      </div>
                      
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1">
                        <span>Apply</span>
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
            <h3 className="text-lg font-medium text-gray-800 mb-2">No Insurance Plans Found</h3>
            <p className="text-gray-600 mb-6">No insurance plans matching your search criteria were found.</p>
            <button 
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
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
          <h3 className="font-medium text-gray-800">Insurance Comparison</h3>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">Compare different insurance plans based on your needs.</p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Insurance Plan
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Coverage
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Premium
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risk Coverage
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Popularity
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
              View Detailed Comparison
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InsuranceProducts;