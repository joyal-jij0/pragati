import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, AlertCircle, ChevronRight, FileText, Award, Filter } from "lucide-react";

interface SubsidyScheme {
  id: string;
  name: string;
  description: string;
  benefits: string;
  eligibilityCriteria: {
    landSize?: [number, number]; // min, max in acres (null means no limit)
    crops?: string[];
    states?: string[];
    incomeLimit?: number; // max annual income in INR
    farmingType?: string[]; // organic, traditional, etc.
    category?: string[]; // SC, ST, General, etc.
  };
  applicationProcess: string;
  documents: string[];
  deadline?: string;
  link: string;
}

const SubsidyEligibilityChecker: React.FC = () => {
  const [landSize, setLandSize] = useState<number>(0);
  const [cropType, setCropType] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [annualIncome, setAnnualIncome] = useState<number>(0);
  const [farmingType, setFarmingType] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null);
  
  // Sample subsidy schemes data
  const subsidySchemes: SubsidyScheme[] = [
    {
      id: "pmkisan",
      name: "PM-KISAN",
      description: "Income support of ₹6,000 per year to all farmer families across the country in three equal installments of ₹2,000 each.",
      benefits: "Direct income support of ₹6,000 per year",
      eligibilityCriteria: {
        landSize: [0.1, null],
        states: ["All States"],
        incomeLimit: 100000,
      },
      applicationProcess: "Apply online through the PM-KISAN portal or visit your nearest Common Service Center (CSC).",
      documents: ["Aadhaar Card", "Land Records", "Bank Account Details", "Passport Size Photo"],
      deadline: "Ongoing",
      link: "https://pmkisan.gov.in/"
    },
    {
      id: "pmfby",
      name: "Pradhan Mantri Fasal Bima Yojana",
      description: "Crop insurance scheme that provides comprehensive risk coverage from pre-sowing to post-harvest losses due to natural calamities.",
      benefits: "Insurance coverage for crop losses due to natural calamities",
      eligibilityCriteria: {
        crops: ["Rice", "Wheat", "Pulses", "Oilseeds", "Commercial Crops"],
        states: ["All States"],
      },
      applicationProcess: "Apply through banks at the time of taking crop loans or directly through insurance companies.",
      documents: ["Land Records", "Bank Account Details", "Sowing Certificate"],
      deadline: "Varies by crop season",
      link: "https://pmfby.gov.in/"
    },
    {
      id: "soilhealth",
      name: "Soil Health Card Scheme",
      description: "Provides information on soil nutrient status and recommendations on appropriate dosage of nutrients for improving soil health and fertility.",
      benefits: "Free soil testing and fertilizer recommendations",
      eligibilityCriteria: {
        landSize: [0.1, null],
        states: ["All States"],
      },
      applicationProcess: "Apply at your nearest Krishi Vigyan Kendra or Agriculture Department office.",
      documents: ["Land Records", "Farmer ID"],
      link: "https://soilhealth.dac.gov.in/"
    },
    {
      id: "pmksy",
      name: "Pradhan Mantri Krishi Sinchayee Yojana",
      description: "Aims to ensure access to some means of protective irrigation to all agricultural farms in the country.",
      benefits: "Subsidy on irrigation equipment and infrastructure",
      eligibilityCriteria: {
        landSize: [0.5, null],
        states: ["All States"],
      },
      applicationProcess: "Apply through your district agriculture office or online portal.",
      documents: ["Land Records", "Bank Account Details", "Identity Proof", "Irrigation Plan"],
      link: "https://pmksy.gov.in/"
    },
    {
      id: "organic",
      name: "Paramparagat Krishi Vikas Yojana",
      description: "Promotes organic farming practices and certification.",
      benefits: "Financial assistance of ₹50,000 per hectare for 3 years for organic conversion",
      eligibilityCriteria: {
        farmingType: ["Organic"],
        landSize: [0.5, 10],
      },
      applicationProcess: "Apply through your district agriculture office or state organic mission.",
      documents: ["Land Records", "Bank Account Details", "Declaration of No Chemical Use"],
      link: "https://pgsindia-ncof.gov.in/pkvy/index.aspx"
    },
    {
      id: "scst",
      name: "Special Scheme for SC/ST Farmers",
      description: "Special financial assistance for farmers belonging to Scheduled Castes and Scheduled Tribes.",
      benefits: "Additional subsidy of 25% on farm equipment and inputs",
      eligibilityCriteria: {
        category: ["SC", "ST"],
      },
      applicationProcess: "Apply through your district agriculture office or SC/ST welfare department.",
      documents: ["Caste Certificate", "Land Records", "Bank Account Details", "Identity Proof"],
      link: "https://agriculture.gov.in/"
    },
    {
      id: "kcc",
      name: "Kisan Credit Card",
      description: "Provides farmers with affordable credit for their agricultural needs.",
      benefits: "Low-interest loans for crop production, farm equipment, and consumption needs",
      eligibilityCriteria: {
        landSize: [0.1, null],
        states: ["All States"],
      },
      applicationProcess: "Apply through your nearest bank branch or online banking portal.",
      documents: ["Land Records", "Identity Proof", "Address Proof", "Passport Size Photo"],
      link: "https://www.nabard.org/content.aspx?id=591"
    }
  ];
  
  const checkEligibility = () => {
    return subsidySchemes.filter(scheme => {
      const criteria = scheme.eligibilityCriteria;
      
      // Check land size
      if (criteria.landSize) {
        const [min, max] = criteria.landSize;
        if (landSize < min) return false;
        if (max !== null && landSize > max) return false;
      }
      
      // Check crop type
      if (criteria.crops && cropType && !criteria.crops.includes(cropType)) {
        return false;
      }
      
      // Check state
      if (criteria.states && state && !criteria.states.includes(state) && !criteria.states.includes("All States")) {
        return false;
      }
      
      // Check income limit
      if (criteria.incomeLimit && annualIncome > criteria.incomeLimit) {
        return false;
      }
      
      // Check farming type
      if (criteria.farmingType && farmingType && !criteria.farmingType.includes(farmingType)) {
        return false;
      }
      
      // Check category
      if (criteria.category && category && !criteria.category.includes(category)) {
        return false;
      }
      
      return true;
    });
  };
  
  const eligibleSchemes = showResults ? checkEligibility() : [];
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-6">
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
          <Award className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Subsidy Eligibility Checker</h2>
          <p className="text-gray-600 text-sm">Find government schemes and subsidies you qualify for</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <label htmlFor="landSize" className="block text-sm font-medium text-gray-700 mb-1">
              Land Size (Acres)
            </label>
            <input
              type="number"
              id="landSize"
              min="0"
              step="0.1"
              value={landSize || ""}
              onChange={(e) => setLandSize(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your land size"
            />
          </div>
          
          <div>
            <label htmlFor="cropType" className="block text-sm font-medium text-gray-700 mb-1">
              Primary Crop
            </label>
            <select
              id="cropType"
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select crop --</option>
              <option value="Rice">Rice</option>
              <option value="Wheat">Wheat</option>
              <option value="Pulses">Pulses</option>
              <option value="Oilseeds">Oilseeds</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Sugarcane">Sugarcane</option>
              <option value="Cotton">Cotton</option>
              <option value="Commercial Crops">Other Commercial Crops</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select state --</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Bihar">Bihar</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-1">
              Annual Income (₹)
            </label>
            <input
              type="number"
              id="annualIncome"
              min="0"
              step="1000"
              value={annualIncome || ""}
              onChange={(e) => setAnnualIncome(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your annual income"
            />
          </div>
          
          <div>
            <label htmlFor="farmingType" className="block text-sm font-medium text-gray-700 mb-1">
              Farming Type
            </label>
            <select
              id="farmingType"
              value={farmingType}
              onChange={(e) => setFarmingType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select farming type --</option>
              <option value="Traditional">Traditional</option>
              <option value="Organic">Organic</option>
              <option value="Natural">Natural Farming</option>
              <option value="Integrated">Integrated Farming</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select category --</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="Minority">Minority</option>
            </select>
          </div>
          
          <button
            onClick={() => setShowResults(true)}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Check Eligibility
          </button>
        </div>
        
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 rounded-xl p-5 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Eligible Schemes</h3>
              <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {eligibleSchemes.length} Found
              </div>
            </div>
            
            {eligibleSchemes.length > 0 ? (
              <div className="space-y-3">
                {eligibleSchemes.map(scheme => (
                  <div 
                    key={scheme.id}
                    className={`bg-white rounded-lg border p-3 cursor-pointer transition-all ${
                      selectedScheme === scheme.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedScheme(selectedScheme === scheme.id ? null : scheme.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-800">{scheme.name}</h4>
                      <ChevronRight className={`h-5 w-5 text-blue-500 transition-transform ${selectedScheme === scheme.id ? 'rotate-90' : ''}`} />
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">{scheme.description}</p>
                    
                    {selectedScheme === scheme.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200"
                      >
                        <h4 className="text-lg font-medium text-gray-800 mb-2">
                          {scheme.name} विवरण
                        </h4>
                        <p className="text-gray-600 mb-3">{scheme.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-white p-3 rounded-lg border border-gray-100">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">पात्रता मानदंड</h5>
                            <ul className="space-y-1">
                              {scheme.eligibility.map((item, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start">
                                  <span className="text-green-500 mr-2">✓</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-white p-3 rounded-lg border border-gray-100">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">लाभ</h5>
                            <ul className="space-y-1">
                              {scheme.benefits.map((item, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start">
                                  <span className="text-green-500 mr-2">✓</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-500">
                            अंतिम अपडेट: {scheme.lastUpdated}
                          </div>
                          <button
                            onClick={() => window.open(scheme.applicationLink, "_blank")}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
                          >
                            आवेदन करें
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No eligible schemes found.</p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SubsidyEligibilityChecker;