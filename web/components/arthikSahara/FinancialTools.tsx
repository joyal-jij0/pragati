"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calculator, 
  DollarSign, 
  CreditCard, 
  FileText, 
  Calendar, 
  ArrowRight,
  ChevronRight,
  Briefcase,
  PiggyBank,
  Landmark,
  Sparkles,
  Shield,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import CropFinanceCalculator from "./CropFinanceCalculator";

const FinancialTools = () => {
  const [activeTab, setActiveTab] = useState("loans");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Sample loan schemes
  const loanSchemes = [
    {
      id: 1,
      name: "Kisan Credit Card",
      provider: "State Bank of India",
      interestRate: "7% p.a.",
      maxAmount: "₹3,00,000",
      tenure: "12 months",
      eligibility: "All farmers with land ownership documents",
      documents: ["Land Records", "Identity Proof", "Address Proof", "Passport Size Photo"],
      features: ["No collateral up to ₹1,60,000", "Interest subvention of 2%", "Flexible repayment options"],
      icon: "💳"
    },
    {
      id: 2,
      name: "PM Kisan Samman Nidhi Yojana",
      provider: "Government of India",
      interestRate: "N/A (Direct Benefit)",
      maxAmount: "₹6,000 per year",
      tenure: "Yearly (3 installments)",
      eligibility: "Small and marginal farmers with cultivable land",
      documents: ["Aadhaar Card", "Land Records", "Bank Account Details"],
      features: ["Direct income support", "No repayment required", "Transparent online system"],
      icon: "🏦"
    },
    {
      id: 3,
      name: "Agriculture Infrastructure Fund",
      provider: "NABARD",
      interestRate: "3% interest subvention",
      maxAmount: "Project-based",
      tenure: "Up to 15 years",
      eligibility: "Farmers, FPOs, Agri-entrepreneurs",
      documents: ["Project Report", "Land Documents", "Identity Proof", "Bank Statements"],
      features: ["Credit guarantee coverage", "Long repayment period", "Interest subvention"],
      icon: "🏗️"
    }
  ];

  // Sample insurance schemes
  const insuranceSchemes = [
    {
      id: 1,
      name: "Pradhan Mantri Fasal Bima Yojana",
      provider: "Government of India",
      premium: "1.5% to 5% of sum insured",
      coverage: "Comprehensive crop loss protection",
      eligibility: "All farmers growing notified crops",
      documents: ["Land Records", "Sowing Certificate", "Bank Account Details"],
      features: ["Coverage for prevented sowing", "Post-harvest losses covered", "Localized calamities covered"],
      icon: "🛡️"
    },
    {
      id: 2,
      name: "Weather Based Crop Insurance",
      provider: "Agriculture Insurance Company",
      premium: "2% to 6% of sum insured",
      coverage: "Protection against adverse weather conditions",
      eligibility: "Farmers in notified areas",
      documents: ["Land Records", "Identity Proof", "Bank Account Details"],
      features: ["Parametric insurance", "Quick settlement", "No claim inspection needed"],
      icon: "☔"
    },
    {
      id: 3,
      name: "Livestock Insurance Scheme",
      provider: "Various Insurance Companies",
      premium: "3% to 4% of animal value",
      coverage: "Death of animals due to diseases or accidents",
      eligibility: "All farmers owning livestock",
      documents: ["Animal Ownership Proof", "Health Certificate", "Identity Proof"],
      features: ["Coverage for high-yielding cattle", "Add-on coverage for treatment", "Quick claim settlement"],
      icon: "🐄"
    }
  ];

  // Sample subsidy schemes
  const subsidySchemes = [
    {
      id: 1,
      name: "Fertilizer Subsidy",
      provider: "Ministry of Agriculture",
      benefit: "20-50% reduction in fertilizer cost",
      eligibility: "All farmers",
      documents: ["Farmer Registration Card", "Land Records"],
      features: ["Direct benefit transfer", "Covers urea and complex fertilizers", "Soil health card linked benefits"],
      icon: "🌱"
    },
    {
      id: 2,
      name: "Farm Machinery Subsidy",
      provider: "State Agriculture Department",
      benefit: "40-50% subsidy on equipment cost",
      eligibility: "Small and marginal farmers",
      documents: ["Land Records", "Income Certificate", "Bank Account Details"],
      features: ["Covers tractors and implements", "Higher subsidy for SC/ST farmers", "Custom hiring option"],
      icon: "🚜"
    },
    {
      id: 3,
      name: "Solar Pump Subsidy",
      provider: "Ministry of New & Renewable Energy",
      benefit: "Up to 90% subsidy on solar pumps",
      eligibility: "Farmers with suitable land for installation",
      documents: ["Land Records", "Electricity Bill/No Connection Certificate", "Bank Account Details"],
      features: ["Reduced electricity costs", "Environment friendly", "Low maintenance"],
      icon: "☀️"
    }
  ];


  return (
    <div className="space-y-8">
      {/* Header with Tabs */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Financial Tools & Resources</h2>
        <div className="flex overflow-x-auto hide-scrollbar space-x-2 pb-2">
          <button
            onClick={() => setActiveTab("loans")}
            className={`px-4 py-2 rounded-lg flex items-center whitespace-nowrap ${
              activeTab === "loans"
                ? "bg-green-100 text-green-700 font-medium"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            <span>Loan Schemes</span>
          </button>
          
          <button
            onClick={() => setActiveTab("insurance")}
            className={`px-4 py-2 rounded-lg flex items-center whitespace-nowrap ${
              activeTab === "insurance"
                ? "bg-blue-100 text-blue-700 font-medium"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Shield className="h-4 w-4 mr-2" />
            <span>Insurance</span>
          </button>
          
          <button
            onClick={() => setActiveTab("subsidies")}
            className={`px-4 py-2 rounded-lg flex items-center whitespace-nowrap ${
              activeTab === "subsidies"
                ? "bg-amber-100 text-amber-700 font-medium"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <PiggyBank className="h-4 w-4 mr-2" />
            <span>Subsidies</span>
          </button>
          
          <button
            onClick={() => setActiveTab("calculator")}
            className={`px-4 py-2 rounded-lg flex items-center whitespace-nowrap ${
              activeTab === "calculator"
                ? "bg-purple-100 text-purple-700 font-medium"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Calculator className="h-4 w-4 mr-2" />
            <span>Finance Calculator</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Loan Schemes */}
        {activeTab === "loans" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="bg-green-50 rounded-xl p-5 border border-green-100">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <span className="text-xl">💸</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Agricultural Loan Schemes</h3>
                  <p className="text-gray-600 text-sm">Low-interest financing options for farmers</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loanSchemes.map((scheme) => (
                  <motion.div
                    key={scheme.id}
                    variants={itemVariants}
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center mb-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <span className="text-xl">{scheme.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{scheme.name}</h4>
                        <p className="text-xs text-gray-500">{scheme.provider}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Interest Rate:</span>
                        <span className="text-sm font-medium text-gray-800">{scheme.interestRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Max Amount:</span>
                        <span className="text-sm font-medium text-gray-800">{scheme.maxAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tenure:</span>
                        <span className="text-sm font-medium text-gray-800">{scheme.tenure}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h5 className="text-xs font-medium text-gray-700 mb-1">Key Features:</h5>
                      <ul className="text-xs text-gray-600 space-y-1 pl-4">
                        {scheme.features.map((feature, index) => (
                          <li key={index} className="list-disc">{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <button className="w-full flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors">
                      <span>Apply Now</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-center">
                <button className="flex items-center text-green-600 hover:text-green-700 font-medium text-sm">
                  <span>View All Loan Schemes</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Loan Eligibility Checker</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="landSize" className="block text-sm font-medium text-gray-700 mb-1">
                      Land Size (Acres)
                    </label>
                    <input
                      type="number"
                      id="landSize"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your land size"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cropType" className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Crop
                    </label>
                    <select
                      id="cropType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">-- Select crop --</option>
                      <option value="Rice">Rice</option>
                      <option value="Wheat">Wheat</option>
                      <option value="Pulses">Pulses</option>
                      <option value="Vegetables">Vegetables</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-1">
                      Annual Income (₹)
                    </label>
                    <input
                      type="number"
                      id="annualIncome"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your annual income"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="loanPurpose" className="block text-sm font-medium text-gray-700 mb-1">
                      Loan Purpose
                    </label>
                    <select
                      id="loanPurpose"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">-- Select purpose --</option>
                      <option value="Crop Production">Crop Production</option>
                      <option value="Equipment Purchase">Equipment Purchase</option>
                      <option value="Land Development">Land Development</option>
                      <option value="Storage Infrastructure">Storage Infrastructure</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-1">
                      Required Loan Amount (₹)
                    </label>
                    <input
                      type="number"
                      id="loanAmount"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter required loan amount"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="loanTenure" className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Tenure (Months)
                    </label>
                    <input
                      type="number"
                      id="loanTenure"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter preferred tenure"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors">
                  <Calculator className="h-4 w-4" />
                  <span>Check Eligibility</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Insurance Schemes */}
        {activeTab === "insurance" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-xl">🛡️</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Crop Insurance Schemes</h3>
                  <p className="text-gray-600 text-sm">Protect your crops against natural calamities</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {insuranceSchemes.map((scheme) => (
                  <motion.div
                    key={scheme.id}
                    variants={itemVariants}
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center mb-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <span className="text-xl">{scheme.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{scheme.name}</h4>
                        <p className="text-xs text-gray-500">{scheme.provider}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Premium:</span>
                        <span className="text-sm font-medium text-gray-800">{scheme.premium}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Coverage:</span>
                        <span className="text-sm font-medium text-gray-800">{scheme.coverage}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h5 className="text-xs font-medium text-gray-700 mb-1">Key Features:</h5>
                      <ul className="text-xs text-gray-600 space-y-1 pl-4">
                        {scheme.features.map((feature, index) => (
                          <li key={index} className="list-disc">{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <button className="w-full flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors">
                      <span>Apply Now</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-center">
                <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm">
                  <span>View All Insurance Schemes</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Insurance Premium Calculator</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cropType" className="block text-sm font-medium text-gray-700 mb-1">
                      Crop Type
                    </label>
                    <select
                      id="cropType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-- Select crop --</option>
                      <option value="Rice">Rice</option>
                      <option value="Wheat">Wheat</option>
                      <option value="Pulses">Pulses</option>
                      <option value="Vegetables">Vegetables</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="landSize" className="block text-sm font-medium text-gray-700 mb-1">
                      Land Size (Acres)
                    </label>
                    <input
                      type="number"
                      id="landSize"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your land size"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="sumInsured" className="block text-sm font-medium text-gray-700 mb-1">
                      Sum Insured per Acre (₹)
                    </label>
                    <input
                      type="number"
                      id="sumInsured"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter sum insured per acre"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="insuranceScheme" className="block text-sm font-medium text-gray-700 mb-1">
                      Insurance Scheme
                    </label>
                    <select
                      id="insuranceScheme"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-- Select scheme --</option>
                      <option value="PMFBY">Pradhan Mantri Fasal Bima Yojana</option>
                      <option value="WBCIS">Weather Based Crop Insurance</option>
                      <option value="CPIS">Coconut Palm Insurance Scheme</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                  <Calculator className="h-4 w-4" />
                  <span>Calculate Premium</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Subsidies */}
        {activeTab === "subsidies" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <span className="text-xl">🏦</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Agricultural Subsidies</h3>
                  <p className="text-gray-600 text-sm">Government support to reduce farming costs</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subsidySchemes.map((scheme) => (
                  <motion.div
                    key={scheme.id}
                    variants={itemVariants}
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center mb-3">
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <span className="text-xl">{scheme.icon}</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{scheme.name}</h4>
                        <p className="text-xs text-gray-500">{scheme.provider}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Benefit:</span>
                        <span className="text-sm font-medium text-gray-800">{scheme.benefit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Eligibility:</span>
                        <span className="text-sm font-medium text-gray-800">{scheme.eligibility}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h5 className="text-xs font-medium text-gray-700 mb-1">Key Features:</h5>
                      <ul className="text-xs text-gray-600 space-y-1 pl-4">
                        {scheme.features.map((feature, index) => (
                          <li key={index} className="list-disc">{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-3">
                      <h5 className="text-xs font-medium text-gray-700 mb-1">Required Documents:</h5>
                      <ul className="text-xs text-gray-600 space-y-1 pl-4">
                        {scheme.documents.map((doc, index) => (
                          <li key={index} className="list-disc">{doc}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <button className="w-full flex items-center justify-center gap-1 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors">
                      <span>Check Eligibility</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-center">
                <button className="flex items-center text-amber-600 hover:text-amber-700 font-medium text-sm">
                  <span>View All Subsidy Schemes</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Subsidy Application Status</h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Application ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Scheme
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied On
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                            <span className="text-sm">🚜</span>
                          </div>
                          <span className="font-medium text-gray-800">Farm Machinery Subsidy</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                            <span className="text-sm">☀️</span>
                          </div>
                          <span className="font-medium text-gray-800">Solar Pump Subsidy</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-2">
                            <span className="text-sm">☀️</span>
                          </div>
                          <span className="font-medium text-gray-800">Solar Pump Subsidy</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          Under Review
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          Track Status
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Finance Calculator */}
        {activeTab === "calculator" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <CropFinanceCalculator />
          </motion.div>
        )}
        
        {/* FAQs */}
        {activeTab === "faq" && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <div className="bg-red-50 rounded-xl p-5 border border-red-100">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <span className="text-xl">❓</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Frequently Asked Questions</h3>
                  <p className="text-gray-600 text-sm">Common questions about agricultural finance</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center">
                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
                  <HelpCircle className="h-4 w-4" />
                  <span>Ask a Question</span>
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Financial Resources</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                      <FileText className="h-4 w-4 text-purple-600" />
                    </div>
                    <h4 className="font-medium text-gray-800">Financial Guides</h4>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                      <ChevronRight className="h-4 w-4 mr-1 text-gray-400" />
                      <a href="#" className="hover:underline">Guide to Agricultural Loans</a>
                    </li>
                    <li className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                      <ChevronRight className="h-4 w-4 mr-1 text-gray-400" />
                      <a href="#" className="hover:underline">Understanding Crop Insurance</a>
                    </li>
                    <li className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                      <ChevronRight className="h-4 w-4 mr-1 text-gray-400" />
                      <a href="#" className="hover:underline">Subsidy Application Process</a>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <Landmark className="h-4 w-4 text-green-600" />
                    </div>
                    <h4 className="font-medium text-gray-800">Financial Institutions</h4>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                      <ChevronRight className="h-4 w-4 mr-1 text-gray-400" />
                      <a href="#" className="hover:underline">NABARD - National Bank for Agriculture</a>
                    </li>
                    <li className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                      <ChevronRight className="h-4 w-4 mr-1 text-gray-400" />
                      <a href="#" className="hover:underline">Regional Rural Banks</a>
                    </li>
                    <li className="flex items-center text-sm text-gray-600 hover:text-blue-600">
                      <ChevronRight className="h-4 w-4 mr-1 text-gray-400" />
                      <a href="#" className="hover:underline">Cooperative Banks for Agriculture</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Financial Alerts */}
      <div className="bg-gradient-to-r from-amber-50 to-red-50 rounded-xl p-5 border border-amber-100">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Financial Alerts & Deadlines</h3>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-0.5">
                <Calendar className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium text-gray-800">Kisan Credit Card Renewal</h4>
                  <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                    15 days left
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Your Kisan Credit Card is due for renewal. Visit your bank before May 30, 2023 to avoid interest penalties.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3 mt-0.5">
                <Calendar className="h-4 w-4 text-amber-600" />
              </div>
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium text-gray-800">PM-KISAN Installment</h4>
                  <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                    New
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  The next installment of PM-KISAN (₹2,000) has been credited to your account. Check your bank statement.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center">
                  <h4 className="font-medium text-gray-800">Crop Insurance Enrollment</h4>
                  <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded-full">
                    30 days left
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Last date to enroll for Kharif crop insurance under PMFBY is June 15, 2023. Don't miss this opportunity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialTools;