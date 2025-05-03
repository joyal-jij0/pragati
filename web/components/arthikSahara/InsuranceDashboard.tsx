import React from "react";
import { motion } from "framer-motion";
import { 
  Umbrella, 
  Shield, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  CheckCircle,
  Clock,
  ArrowRight,
  BarChart2,
  Leaf,
  Cloud,
  Droplets,
  Sun,
  Wind
} from "lucide-react";

const InsuranceDashboard = () => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Sample active policies data
  const activePolicies = [
    {
      id: "POL-2023-0501",
      type: "Crop Insurance",
      provider: "Agriculture Insurance Company",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Agriculture_Insurance_Company_of_India_logo.svg/200px-Agriculture_Insurance_Company_of_India_logo.svg.png",
      coverage: "₹2,00,000",
      premium: "₹4,000",
      startDate: "1 May, 2023",
      endDate: "30 April, 2024",
      status: "active",
      crops: ["Wheat", "Rice"],
      area: "5 Acres",
      risks: ["Drought", "Flood", "Pests"],
      documents: ["Policy Document", "Land Records", "Aadhar Card"]
    },
    {
      id: "POL-2023-0615",
      type: "Livestock Insurance",
      provider: "Life Insurance Corporation of India",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Life_Insurance_Corporation_of_India.svg/200px-Life_Insurance_Corporation_of_India.svg.png",
      coverage: "₹50,000",
      premium: "₹2,500",
      startDate: "15 June, 2023",
      endDate: "14 June, 2024",
      status: "active",
      animals: ["Cow (2)", "Buffalo (1)"],
      risks: ["Disease", "Natural Disaster", "Accident"],
      documents: ["Policy Document", "Animal Health Certificate", "Aadhar Card"]
    }
  ];

  // Sample claims data
  const recentClaims = [
    {
      id: "CLM-2023-1105",
      policyId: "POL-2022-0501",
      type: "Crop Insurance",
      reason: "Drought",
      amount: "₹75,000",
      date: "5 November, 2023",
      status: "processing",
      progress: 60
    },
    {
      id: "CLM-2023-0920",
      policyId: "POL-2022-0615",
      type: "Livestock Insurance",
      reason: "Animal Disease",
      amount: "₹20,000",
      date: "20 September, 2023",
      status: "approved",
      progress: 100
    }
  ];

  // Weather risk data
  const weatherRisks = [
    {
      type: "Rainfall",
      icon: <Droplets className="h-5 w-5 text-blue-600" />,
      forecast: "Below Normal",
      risk: "high",
      impact: "Crop production may reduce by 20-30%"
    },
    {
      type: "Temperature",
      icon: <Sun className="h-5 w-5 text-amber-600" />,
      forecast: "Above Normal",
      risk: "medium",
      impact: "Crop quality may be affected"
    },
    {
      type: "Wind",
      icon: <Wind className="h-5 w-5 text-gray-600" />,
      forecast: "Normal",
      risk: "low",
      impact: "No significant impact"
    }
  ];

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "active":
        return (
          <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            <span>Active</span>
          </div>
        );
      case "processing":
        return (
          <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Processing</span>
          </div>
        );
      case "approved":
        return (
          <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            <span>Approved</span>
          </div>
        );
      default:
        return null;
    }
  };

  // Risk badge component
  const RiskBadge = ({ risk }: { risk: string }) => {
    switch (risk) {
      case "high":
        return (
          <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            <span>High Risk</span>
          </div>
        );
      case "medium":
        return (
          <div className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            <span>Medium Risk</span>
          </div>
        );
      case "low":
        return (
          <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            <span>Low Risk</span>
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
        <h2 className="text-2xl font-bold text-gray-800">Insurance Dashboard</h2>
        <button className="text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-1">
          <Shield className="h-4 w-4" />
          <span>Buy New Insurance</span>
        </button>
      </div>

      {/* Insurance Summary */}
      <motion.div 
        variants={cardVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-100 p-2 rounded-full">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-800">Active Policies</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">2</p>
          <p className="text-sm text-gray-500 mt-1">Total Coverage: ₹2,50,000</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-full">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-800">Recent Claims</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">2</p>
          <p className="text-sm text-gray-500 mt-1">Total Amount: ₹95,000</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-amber-100 p-2 rounded-full">
              <Calendar className="h-5 w-5 text-amber-600" />
            </div>
            <h3 className="font-medium text-gray-800">Upcoming Renewals</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">1</p>
          <p className="text-sm text-gray-500 mt-1">Next: 30 April, 2024</p>
        </div>
      </motion.div>

      {/* Active Policies */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">Active Policies</h3>
        </div>
        
        <div className="p-6 space-y-6">
          {activePolicies.map((policy) => (
            <div key={policy.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-3">
                  <img src={policy.logo} alt={policy.provider} className="h-10 w-10 object-contain" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-800">{policy.type}</h4>
                      <StatusBadge status={policy.status} />
                    </div>
                    <p className="text-xs text-gray-500">{policy.provider}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">Coverage: {policy.coverage}</p>
                  <p className="text-xs text-gray-500">Premium: {policy.premium}/Year</p>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="text-xs font-medium text-gray-500 mb-1">Policy Details</h5>
                    <p className="text-sm text-gray-800">Policy Number: {policy.id}</p>
                    <p className="text-sm text-gray-800">Duration: {policy.startDate} - {policy.endDate}</p>
                    {policy.crops && (
                      <p className="text-sm text-gray-800">Crops: {policy.crops.join(", ")}</p>
                    )}
                    {policy.animals && (
                      <p className="text-sm text-gray-800">Animals: {policy.animals.join(", ")}</p>
                    )}
                    <p className="text-sm text-gray-800">{policy.area && `Area: ${policy.area}`}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-medium text-gray-500 mb-1">Covered Risks</h5>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {policy.risks.map((risk, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs">
                          {risk}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-xs font-medium text-gray-500 mb-1">Documents</h5>
                    <div className="space-y-1">
                      {policy.documents.map((doc, index) => (
                        <button key={index} className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          <span>{doc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                  <button className="text-sm text-gray-600 hover:text-gray-800">
                    File a Claim
                  </button>
                  <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Claims */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">Recent Claims</h3>
        </div>
        
        <div className="p-6 space-y-4">
          {recentClaims.map((claim) => (
            <div key={claim.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-800">{claim.type}</h4>
                    <StatusBadge status={claim.status} />
                  </div>
                  <p className="text-xs text-gray-500">Claim Number: {claim.id}</p>
                  <p className="text-xs text-gray-500">Reason: {claim.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">Amount: {claim.amount}</p>
                  <p className="text-xs text-gray-500">Date: {claim.date}</p>
                </div>
              </div>
              
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Progress</span>
                  <span className="text-xs font-medium text-gray-700">{claim.progress}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${claim.status === 'approved' ? 'bg-green-600' : 'bg-blue-600'}`} 
                    style={{ width: `${claim.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-end mt-3">
                  <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-center mt-2">
            <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
              <span>View All Claims</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Weather Risk Assessment */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">Weather Risk Assessment</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {weatherRisks.map((risk, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 rounded-full">
                      {risk.icon}
                    </div>
                    <h4 className="font-medium text-gray-800">{risk.type}</h4>
                  </div>
                  <RiskBadge risk={risk.risk} />
                </div>
                <p className="text-sm text-gray-700 mb-1">Forecast: {risk.forecast}</p>
                <p className="text-xs text-gray-500">{risk.impact}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-3">
            <div className="flex items-start gap-2">
              <Cloud className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">Weather-Based Insurance Recommendation</p>
                <p className="text-xs text-gray-600">Consider taking crop insurance with additional drought coverage for the upcoming monsoon.</p>
                <button className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors">
                  View Recommended Insurance
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Insurance Insights */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">Insurance Insights</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-3">Coverage Analysis</h4>
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <BarChart2 className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Your current insurance coverage is 60% of your agricultural value. 80% coverage is recommended for maximum protection.</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-3">Risk Profile</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">Drought</span>
                    <span className="text-xs font-medium text-gray-700">75%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-red-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">Flood</span>
                    <span className="text-xs font-medium text-gray-700">40%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-amber-500 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">Pests</span>
                    <span className="text-xs font-medium text-gray-700">60%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-amber-500 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">Animal Health</span>
                    <span className="text-xs font-medium text-gray-700">30%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Drought is the biggest risk in your area. Consider drought-resistant crops and additional drought coverage.</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Get Comprehensive Risk Analysis
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InsuranceDashboard;