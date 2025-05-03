import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Droplet, Sun, Wind, DollarSign, BarChart2, CreditCard, FileText } from "lucide-react";
import { financialToolsService, LoanRecommendation, SubsidyRecommendation } from "@/services/ai-assistant/financialToolsService";

interface CropOption {
  id: string;
  name: string;
  seedCost: number;
  fertilizerCost: number;
  laborCost: number;
  waterRequirement: number;
  growthDays: number;
  expectedYield: number;
  currentPrice: number;
  weatherSensitivity: "low" | "medium" | "high";
}

// Export the result type for use in other components
export interface CropCalculationResult {
  crop: CropOption;
  landSize: number;
  interestRate: number;
  totalSeedCost: number;
  totalFertilizerCost: number;
  totalLaborCost: number;
  waterCost: number;
  totalInvestment: number;
  loanInterest: number;
  adjustedYield: number;
  expectedRevenue: number;
  profit: number;
  roi: number;
  breakEvenPrice: number;
}

interface FarmerProfile {
  name: string;
  age: number;
  category: string;
  landHolding: number;
  state: string;
  district: string;
  creditScore: number;
  existingLoans: boolean;
}

const CropFinanceCalculator: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [landSize, setLandSize] = useState<number>(1);
  const [interestRate, setInterestRate] = useState<number>(7);
  const [weatherCondition, setWeatherCondition] = useState<string>("normal");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [showRecommendations, setShowRecommendations] = useState<boolean>(false);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState<boolean>(false);
  const [loanRecommendations, setLoanRecommendations] = useState<LoanRecommendation[]>([]);
  const [subsidyRecommendations, setSubsidyRecommendations] = useState<SubsidyRecommendation[]>([]);
  
  // Sample farmer profile (in a real app, this would come from user data)
  const farmerProfile: FarmerProfile = {
    name: "Ashish Kumar",
    age: 35,
    category: "small-marginal",
    landHolding: landSize,
    state: "Haryana",
    district: "Sonipat",
    creditScore: 750,
    existingLoans: false
  };
  
  // Sample crop data
  const cropOptions: CropOption[] = [
    {
      id: "wheat",
      name: "Wheat",
      seedCost: 2000,
      fertilizerCost: 3500,
      laborCost: 5000,
      waterRequirement: 450,
      growthDays: 120,
      expectedYield: 40,
      currentPrice: 2200,
      weatherSensitivity: "medium"
    },
    {
      id: "rice",
      name: "Rice",
      seedCost: 1800,
      fertilizerCost: 4000,
      laborCost: 7000,
      waterRequirement: 900,
      growthDays: 90,
      expectedYield: 50,
      currentPrice: 1900,
      weatherSensitivity: "high"
    },
    {
      id: "cotton",
      name: "Cotton",
      seedCost: 3000,
      fertilizerCost: 5000,
      laborCost: 8000,
      waterRequirement: 700,
      growthDays: 160,
      expectedYield: 25,
      currentPrice: 6000,
      weatherSensitivity: "medium"
    },
    {
      id: "sugarcane",
      name: "Sugarcane",
      seedCost: 4000,
      fertilizerCost: 6000,
      laborCost: 10000,
      waterRequirement: 1200,
      growthDays: 360,
      expectedYield: 800,
      currentPrice: 300,
      weatherSensitivity: "medium"
    },
    {
      id: "soybean",
      name: "Soybean",
      seedCost: 2500,
      fertilizerCost: 3000,
      laborCost: 4500,
      waterRequirement: 500,
      growthDays: 100,
      expectedYield: 30,
      currentPrice: 3800,
      weatherSensitivity: "low"
    }
  ];
  
  const calculateResults = () => {
    const crop = cropOptions.find(c => c.id === selectedCrop);
    if (!crop) return null;
    
    // Adjust costs based on land size
    const totalSeedCost = crop.seedCost * landSize;
    const totalFertilizerCost = crop.fertilizerCost * landSize;
    const totalLaborCost = crop.laborCost * landSize;
    
    // Calculate water costs (assuming ₹10 per unit)
    const waterCost = crop.waterRequirement * landSize * 10;
    
    // Calculate total investment
    const totalInvestment = totalSeedCost + totalFertilizerCost + totalLaborCost + waterCost;
    
    // Calculate loan interest if needed
    const loanInterest = totalInvestment * (interestRate / 100);
    
    // Adjust yield based on weather conditions
    let yieldMultiplier = 1;
    if (weatherCondition === "favorable") {
      yieldMultiplier = 1.2;
    } else if (weatherCondition === "unfavorable") {
      yieldMultiplier = 0.8;
    }
    
    // Calculate expected yield and revenue
    const adjustedYield = crop.expectedYield * landSize * yieldMultiplier;
    const expectedRevenue = adjustedYield * crop.currentPrice;
    
    // Calculate profit
    const profit = expectedRevenue - (totalInvestment + loanInterest);
    const roi = (profit / totalInvestment) * 100;
    
    return {
      crop,
      landSize,
      interestRate,
      totalSeedCost,
      totalFertilizerCost,
      totalLaborCost,
      waterCost,
      totalInvestment,
      loanInterest,
      adjustedYield,
      expectedRevenue,
      profit,
      roi,
      breakEvenPrice: (totalInvestment + loanInterest) / adjustedYield
    };
  };
  
  const getFinancialRecommendations = async () => {
    if (!showResults) return;
    
    const results = calculateResults();
    if (!results) return;
    
    setIsLoadingRecommendations(true);
    setShowRecommendations(true);
    
    try {
      // Get loan recommendations
      const loans = await financialToolsService.generateLoanRecommendations(
        results,
        farmerProfile
      );
      setLoanRecommendations(loans);
      
      // Get subsidy recommendations
      const subsidies = await financialToolsService.generateSubsidyRecommendations(
        results,
        farmerProfile
      );
      setSubsidyRecommendations(subsidies);
    } catch (error) {
      console.error("Error getting financial recommendations:", error);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };
  
  const results = showResults ? calculateResults() : null;
  
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
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-6">
        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
          <Calculator className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">Crop Finance Calculator</h2>
          <p className="text-gray-600 text-sm">Plan your farming investment and calculate potential returns</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div>
            <label htmlFor="crop" className="block text-sm font-medium text-gray-700 mb-1">
              Select Crop
            </label>
            <select
              id="crop"
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">-- Select a crop --</option>
              {cropOptions.map(crop => (
                <option key={crop.id} value={crop.id}>{crop.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="landSize" className="block text-sm font-medium text-gray-700 mb-1">
              Land Size (Acres)
            </label>
            <input
              type="number"
              id="landSize"
              min="0.1"
              step="0.1"
              value={landSize}
              onChange={(e) => setLandSize(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
              Loan Interest Rate (%)
            </label>
            <input
              type="number"
              id="interestRate"
              min="0"
              max="30"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label htmlFor="weatherCondition" className="block text-sm font-medium text-gray-700 mb-1">
              Expected Weather Conditions
            </label>
            <select
              id="weatherCondition"
              value={weatherCondition}
              onChange={(e) => setWeatherCondition(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="favorable">Favorable (Above Average)</option>
              <option value="normal">Normal (Average)</option>
              <option value="unfavorable">Unfavorable (Below Average)</option>
            </select>
          </div>
          
          <button
            onClick={() => setShowResults(true)}
            disabled={!selectedCrop}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Calculate
          </button>
        </div>
        
        {showResults && results && (
          <motion.div 
            className="space-y-5"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                Financial Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Investment:</span>
                  <span className="font-medium">₹{results.totalInvestment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Interest:</span>
                  <span className="font-medium">₹{results.loanInterest.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Revenue:</span>
                  <span className="font-medium">₹{results.expectedRevenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-700 font-medium">Profit:</span>
                  <span className={`font-bold ${results.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{results.profit.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ROI:</span>
                  <span className={`font-medium ${results.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {results.roi.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Break-even Price:</span>
                  <span className="font-medium">₹{results.breakEvenPrice.toFixed(2)}/unit</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Droplet className="h-5 w-5 text-blue-600 mr-2" />
                Cost Breakdown
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Seeds:</span>
                  <span className="font-medium">₹{results.totalSeedCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fertilizers:</span>
                  <span className="font-medium">₹{results.totalFertilizerCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Labor:</span>
                  <span className="font-medium">₹{results.totalLaborCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Water:</span>
                  <span className="font-medium">₹{results.waterCost.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <BarChart2 className="h-5 w-5 text-amber-600 mr-2" />
                Yield Estimation
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Expected Yield:</span>
                  <span className="font-medium">{results.adjustedYield.toFixed(2)} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Price:</span>
                  <span className="font-medium">₹{results.crop.currentPrice}/unit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth Period:</span>
                  <span className="font-medium">{results.crop.growthDays} days</span>
                </div>
              </div>
            </motion.div>
            
            <motion.button
              variants={itemVariants}
              onClick={getFinancialRecommendations}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              disabled={isLoadingRecommendations}
            >
              {isLoadingRecommendations ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Getting Recommendations...</span>
                </>
              ) : (
                <>
                  <span>Get Financial Recommendations</span>
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
      
      {/* Financial Recommendations Section */}
      {showRecommendations && (
        <motion.div 
          className="mt-8 space-y-6"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <CreditCard className="h-5 w-5 text-indigo-600 mr-2" />
              Recommended Loan Schemes
            </h3>
            
            {loanRecommendations.length > 0 ? (
              <div className="space-y-4">
                {loanRecommendations.map((loan, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-semibold text-gray-800">{loan.name}</h4>
                      <div className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full">
                        {loan.suitabilityScore}% Match
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{loan.provider}</p>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-gray-500">Interest Rate</p>
                        <p className="text-sm font-medium">{loan.interestRate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Maximum Amount</p>
                        <p className="text-sm font-medium">{loan.maxAmount}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-700">{loan.suitabilityReason}</p>
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-1">Required Documents:</p>
                      <div className="flex flex-wrap gap-1">
                        {loan.documents.map((doc, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No loan recommendations available.</p>
            )}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FileText className="h-5 w-5 text-green-600 mr-2" />
              Recommended Subsidy Schemes
            </h3>
            
            {subsidyRecommendations.length > 0 ? (
              <div className="space-y-4">
                {subsidyRecommendations.map((subsidy, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white p-4 rounded-lg border border-green-100 shadow-sm hover:shadow-md transition-shadow"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-semibold text-gray-800">{subsidy.name}</h4>
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        {subsidy.suitabilityScore}% Match
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{subsidy.provider}</p>
                    <div className="mt-3">
                      <p className="text-xs text-gray-500">Benefit</p>
                      <p className="text-sm font-medium">{subsidy.benefit}</p>
                    </div>
                    <p className="mt-3 text-sm text-gray-700">{subsidy.suitabilityReason}</p>
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-1">Required Documents:</p>
                      <div className="flex flex-wrap gap-1">
                        {subsidy.documents.map((doc, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No subsidy recommendations available.</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CropFinanceCalculator;