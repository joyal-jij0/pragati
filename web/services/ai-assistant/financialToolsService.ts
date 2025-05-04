import { CropCalculationResult } from "@/components/arthikSahara/CropFinanceCalculator";

// Define the Gemini API URL and model
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";
const GEMINI_MODEL = "gemini-1.5-pro"; // Using Gemini 1.5 Pro for best performance

// Get API key from environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

// Define the interface for the Gemini API request
interface GeminiRequest {
  contents: {
    role: "user" | "model";
    parts: {
      text: string;
    }[];
  }[];
  generationConfig: {
    temperature: number;
    maxOutputTokens: number;
  };
}

// Define the interface for the Gemini API response
interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
    finishReason: string;
  }[];
  promptFeedback?: {
    safetyRatings: {
      category: string;
      probability: string;
    }[];
  };
}

// Define interfaces for the financial recommendations
export interface LoanRecommendation {
  name: string;
  provider: string;
  interestRate: string;
  maxAmount: string;
  eligibility: string;
  features: string[];
  applicationProcess: string;
  documents: string[];
  suitabilityScore: number;
  suitabilityReason: string;
}

export interface SubsidyRecommendation {
  name: string;
  provider: string;
  benefit: string;
  eligibility: string;
  features: string[];
  applicationProcess: string;
  documents: string[];
  suitabilityScore: number;
  suitabilityReason: string;
}

export interface FinancialAdvice {
  summary: string;
  profitabilityAnalysis: string;
  riskAssessment: string;
  recommendations: string[];
  alternativeCrops?: string[];
}

export const financialToolsService = {
  // Generate loan recommendations based on crop calculation results
  generateLoanRecommendations: async (
    cropResults: CropCalculationResult,
    farmerProfile: any
  ): Promise<LoanRecommendation[]> => {
    try {
      if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
        console.warn("No Gemini API key provided, using mock responses");
        // Return mock data if no API key is provided
        return getMockLoanRecommendations(cropResults);
      }

      // Format the prompt for the Gemini API
      const formattedPrompt = `
        You are an expert on Indian agricultural finance and loan schemes. 
        Based on the following crop calculation results and farmer profile, recommend the most suitable loan schemes.
        
        Crop: ${cropResults.crop.name}
        Land Size: ${cropResults.landSize} acres
        Total Investment Needed: ₹${cropResults.totalInvestment.toFixed(2)}
        Expected Revenue: ₹${cropResults.expectedRevenue.toFixed(2)}
        Expected Profit: ₹${cropResults.profit.toFixed(2)}
        ROI: ${cropResults.roi.toFixed(2)}%
        Loan Interest Rate Used in Calculation: ${cropResults.interestRate}%
        
        Farmer Profile:
        ${JSON.stringify(farmerProfile, null, 2)}
        
        Please provide 3-5 loan schemes that would be most suitable for this farmer.
        Format your response as a valid JSON array with the following structure for each loan:
        [
          {
            "name": "Loan Name",
            "provider": "Bank/Institution Name",
            "interestRate": "X% p.a.",
            "maxAmount": "₹X,XX,XXX",
            "eligibility": "Eligibility criteria",
            "features": ["Feature 1", "Feature 2", "Feature 3"],
            "applicationProcess": "How to apply",
            "documents": ["Document 1", "Document 2", "Document 3"],
            "suitabilityScore": 95, // 0-100 score indicating how suitable this loan is
            "suitabilityReason": "Explanation of why this loan is suitable"
          }
        ]
      `;

      // Create the request body
      const requestBody: GeminiRequest = {
        contents: [
          {
            role: "user",
            parts: [{ text: formattedPrompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2, // Lower temperature for more factual responses
          maxOutputTokens: 2048 // Sufficient for detailed loan information
        }
      };

      // Make the API request
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
      }

      // Parse the response
      const data: GeminiResponse = await response.json();
      
      // Extract the response text from the first candidate
      if (data.candidates && data.candidates.length > 0) {
        const responseText = data.candidates[0].content.parts[0].text;
        
        // Extract JSON from the response text
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const jsonString = jsonMatch[0];
          return JSON.parse(jsonString) as LoanRecommendation[];
        } else {
          throw new Error("Could not parse JSON from Gemini response");
        }
      } else {
        throw new Error("No response from Gemini API");
      }
    } catch (error) {
      console.error("Error calling Gemini API for loan recommendations:", error);
      return getMockLoanRecommendations(cropResults);
    }
  },

  // Generate loan recommendations based on farmer profile
  generateLoanRecommendationsForProfile: async (
    farmerProfile: any
  ): Promise<LoanRecommendation[]> => {
    try {
      if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
        console.warn("No Gemini API key provided, using mock responses");
        // Return mock data if no API key is provided
        return getMockLoanRecommendations(farmerProfile);
      }

      // Format the prompt for the Gemini API
      const formattedPrompt = `
        You are an expert on Indian agricultural finance and loan schemes. 
        Based on the following farmer profile, recommend the most suitable loan schemes.
        
        Farmer Profile:
        ${JSON.stringify(farmerProfile, null, 2)}
        
        Please provide 3-5 loan schemes that would be most suitable for this farmer.
        Format your response as a valid JSON array with the following structure for each loan:
        [
          {
            "name": "Loan Name",
            "provider": "Bank/Institution Name",
            "interestRate": "X% p.a.",
            "maxAmount": "₹X,XX,XXX",
            "eligibility": "Eligibility criteria",
            "features": ["Feature 1", "Feature 2", "Feature 3"],
            "applicationProcess": "How to apply",
            "documents": ["Document 1", "Document 2", "Document 3"],
            "suitabilityScore": 95, // 0-100 score indicating how suitable this loan is
            "suitabilityReason": "Explanation of why this loan is suitable"
          }
        ]
      `;

      // Create the request body
      const requestBody: GeminiRequest = {
        contents: [
          {
            role: "user",
            parts: [{ text: formattedPrompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2, // Lower temperature for more factual responses
          maxOutputTokens: 2048 // Sufficient for detailed loan information
        }
      };

      // Make the API request
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
      }

      // Parse the response
      const data: GeminiResponse = await response.json();
      
      // Extract the response text from the first candidate
      if (data.candidates && data.candidates.length > 0) {
        const responseText = data.candidates[0].content.parts[0].text;
        
        // Extract JSON from the response text
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const jsonString = jsonMatch[0];
          return JSON.parse(jsonString) as LoanRecommendation[];
        } else {
          throw new Error("Could not parse JSON from Gemini response");
        }
      } else {
        throw new Error("No response from Gemini API");
      }
    } catch (error) {
      console.error("Error calling Gemini API for loan recommendations:", error);
      return getMockLoanRecommendations(farmerProfile);
    }
  },

  // Generate subsidy recommendations based on crop calculation results
  generateSubsidyRecommendations: async (
    cropResults: CropCalculationResult,
    farmerProfile: any
  ): Promise<SubsidyRecommendation[]> => {
    try {
      if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
        console.warn("No Gemini API key provided, using mock responses");
        // Return mock data if no API key is provided
        return getMockSubsidyRecommendations(cropResults);
      }

      // Format the prompt for the Gemini API
      const formattedPrompt = `
        You are an expert on Indian agricultural subsidies and government schemes. 
        Based on the following crop calculation results and farmer profile, recommend the most suitable subsidy schemes.
        
        Crop: ${cropResults.crop.name}
        Land Size: ${cropResults.landSize} acres
        Total Investment Needed: ₹${cropResults.totalInvestment.toFixed(2)}
        Expected Revenue: ₹${cropResults.expectedRevenue.toFixed(2)}
        Expected Profit: ₹${cropResults.profit.toFixed(2)}
        ROI: ${cropResults.roi.toFixed(2)}%
        
        Farmer Profile:
        ${JSON.stringify(farmerProfile, null, 2)}
        
        Please provide 3-5 subsidy schemes that would be most suitable for this farmer.
        Format your response as a valid JSON array with the following structure for each subsidy:
        [
          {
            "name": "Subsidy Name",
            "provider": "Government Department/Agency",
            "benefit": "Benefit description (e.g., '50% subsidy on equipment')",
            "eligibility": "Eligibility criteria",
            "features": ["Feature 1", "Feature 2", "Feature 3"],
            "applicationProcess": "How to apply",
            "documents": ["Document 1", "Document 2", "Document 3"],
            "suitabilityScore": 95, // 0-100 score indicating how suitable this subsidy is
            "suitabilityReason": "Explanation of why this subsidy is suitable"
          }
        ]
      `;

      // Create the request body
      const requestBody: GeminiRequest = {
        contents: [
          {
            role: "user",
            parts: [{ text: formattedPrompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2, // Lower temperature for more factual responses
          maxOutputTokens: 2048 // Sufficient for detailed subsidy information
        }
      };

      // Make the API request
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
      }

      // Parse the response
      const data: GeminiResponse = await response.json();
      
      // Extract the response text from the first candidate
      if (data.candidates && data.candidates.length > 0) {
        const responseText = data.candidates[0].content.parts[0].text;
        
        // Extract JSON from the response text
        const jsonMatch = responseText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const jsonString = jsonMatch[0];
          return JSON.parse(jsonString) as SubsidyRecommendation[];
        } else {
          throw new Error("Could not parse JSON from Gemini response");
        }
      } else {
        throw new Error("No response from Gemini API");
      }
    } catch (error) {
      console.error("Error calling Gemini API for subsidy recommendations:", error);
      return getMockSubsidyRecommendations(cropResults);
    }
  },

  // Generate financial advice based on crop calculation results
  generateFinancialAdvice: async (
    cropResults: CropCalculationResult
  ): Promise<FinancialAdvice> => {
    try {
      if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
        console.warn("No Gemini API key provided, using mock responses");
        // Return mock data if no API key is provided
        return getMockFinancialAdvice(cropResults);
      }

      // Format the prompt for the Gemini API
      const formattedPrompt = `
        You are an expert agricultural financial advisor. 
        Based on the following crop calculation results, provide detailed financial advice.
        
        Crop: ${cropResults.crop.name}
        Land Size: ${cropResults.landSize} acres
        Seed Cost: ₹${cropResults.totalSeedCost.toFixed(2)}
        Fertilizer Cost: ₹${cropResults.totalFertilizerCost.toFixed(2)}
        Labor Cost: ₹${cropResults.totalLaborCost.toFixed(2)}
        Water Cost: ₹${cropResults.waterCost.toFixed(2)}
        Total Investment: ₹${cropResults.totalInvestment.toFixed(2)}
        Loan Interest: ₹${cropResults.loanInterest.toFixed(2)}
        Expected Yield: ${cropResults.adjustedYield.toFixed(2)} units
        Expected Revenue: ₹${cropResults.expectedRevenue.toFixed(2)}
        Expected Profit: ₹${cropResults.profit.toFixed(2)}
        ROI: ${cropResults.roi.toFixed(2)}%
        Break-even Price: ₹${cropResults.breakEvenPrice.toFixed(2)} per unit
        
        Please provide comprehensive financial advice with the following sections:
        1. Summary of financial outlook
        2. Profitability analysis
        3. Risk assessment
        4. Specific recommendations to improve profitability
        5. Alternative crops to consider (if applicable)
        
        Format your response as a valid JSON object with the following structure:
        {
          "summary": "Overall financial outlook summary",
          "profitabilityAnalysis": "Detailed analysis of profitability",
          "riskAssessment": "Assessment of financial risks",
          "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"],
          "alternativeCrops": ["Crop 1", "Crop 2", "Crop 3"] // Optional
        }
      `;

      // Create the request body
      const requestBody: GeminiRequest = {
        contents: [
          {
            role: "user",
            parts: [{ text: formattedPrompt }]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048
        }
      };

      // Make the API request
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
      }

      // Parse the response
      const data: GeminiResponse = await response.json();
      
      // Extract the response text from the first candidate
      if (data.candidates && data.candidates.length > 0) {
        const responseText = data.candidates[0].content.parts[0].text;
        
        // Extract JSON from the response text
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonString = jsonMatch[0];
          return JSON.parse(jsonString) as FinancialAdvice;
        } else {
          throw new Error("Could not parse JSON from Gemini response");
        }
      } else {
        throw new Error("No response from Gemini API");
      }
    } catch (error) {
      console.error("Error calling Gemini API for financial advice:", error);
      return getMockFinancialAdvice(cropResults);
    }
  }
};

// Mock data functions for testing or when API key is not available
function getMockLoanRecommendations(cropResults: CropCalculationResult): LoanRecommendation[] {
  const cropName = cropResults.crop.name;
  const investment = cropResults.totalInvestment;
  
  return [
    {
      name: "Kisan Credit Card",
      provider: "State Bank of India",
      interestRate: "7% p.a. (4% with interest subvention)",
      maxAmount: `₹${Math.min(300000, Math.round(investment * 1.5))}`,
      eligibility: "All farmers with land ownership documents",
      features: [
        "No collateral up to ₹1,60,000",
        "Interest subvention of 3%",
        "Flexible repayment options",
        `Suitable for ${cropName} cultivation`
      ],
      applicationProcess: "Apply at your nearest SBI branch with required documents",
      documents: ["Land Records", "Identity Proof", "Address Proof", "Passport Size Photo"],
      suitabilityScore: 95,
      suitabilityReason: `Ideal for ${cropName} cultivation with low interest rate and flexible repayment options`
    },
    {
      name: "Agriculture Term Loan",
      provider: "NABARD",
      interestRate: "8.5% p.a.",
      maxAmount: `₹${Math.round(investment * 2)}`,
      eligibility: "Farmers with good credit history and land ownership",
      features: [
        "Longer repayment period (3-7 years)",
        "Moratorium period available",
        "Can be used for equipment purchase",
        "Higher loan amount available"
      ],
      applicationProcess: "Apply through any commercial bank that has refinance arrangement with NABARD",
      documents: ["Land Records", "Farm Development Plan", "Identity Proof", "Bank Statements"],
      suitabilityScore: 85,
      suitabilityReason: `Good for long-term investment in ${cropName} cultivation with higher loan amount`
    },
    {
      name: "Crop Loan",
      provider: "District Cooperative Bank",
      interestRate: "6% p.a.",
      maxAmount: `₹${Math.round(investment * 1.2)}`,
      eligibility: "Member of local cooperative society",
      features: [
        "Lower interest rate",
        "Simple application process",
        "Local support available",
        "Quick disbursement"
      ],
      applicationProcess: "Apply through your local cooperative society",
      documents: ["Land Records", "Identity Proof", "Cooperative Membership Proof"],
      suitabilityScore: 80,
      suitabilityReason: `Convenient option for ${cropName} farmers with cooperative membership and quick processing`
    }
  ];
}

function getMockSubsidyRecommendations(cropResults: CropCalculationResult): SubsidyRecommendation[] {
  const cropName = cropResults.crop.name;
  
  return [
    {
      name: "PM-KISAN",
      provider: "Government of India",
      benefit: "₹6,000 per year direct income support",
      eligibility: "All landholding farmer families with cultivable land",
      features: [
        "Direct benefit transfer to bank account",
        "No repayment required",
        "Paid in three equal installments",
        "Simple verification process"
      ],
      applicationProcess: "Apply online through PM-KISAN portal or visit your nearest Common Service Center",
      documents: ["Aadhaar Card", "Land Records", "Bank Account Details"],
      suitabilityScore: 90,
      suitabilityReason: "Universal income support scheme for all farmers regardless of crop type"
    },
    {
      name: `${cropName} Specific Subsidy Scheme`,
      provider: "State Agriculture Department",
      benefit: `30-50% subsidy on ${cropName} seeds and fertilizers`,
      eligibility: `Farmers cultivating ${cropName} in the current season`,
      features: [
        "Direct reduction in input costs",
        "Quality certified seeds provided",
        "Technical guidance included",
        "Soil testing services"
      ],
      applicationProcess: "Register with your local Agriculture Department office before the sowing season",
      documents: ["Land Records", "Identity Proof", "Bank Account Details", "Previous Season Crop Records"],
      suitabilityScore: 95,
      suitabilityReason: `Specifically designed for ${cropName} cultivation, directly reducing your input costs`
    },
    {
      name: "Micro Irrigation Subsidy",
      provider: "Ministry of Agriculture",
      benefit: "55-85% subsidy on drip/sprinkler irrigation systems",
      eligibility: "All farmers adopting micro-irrigation technology",
      features: [
        "Significant water conservation",
        "Reduced electricity costs",
        "Improved crop yield",
        "Long-term benefits"
      ],
      applicationProcess: "Apply through your district agriculture office or online portal",
      documents: ["Land Records", "Bank Account Details", "Water Source Proof", "Farm Layout Plan"],
      suitabilityScore: 85,
      suitabilityReason: `Will help optimize water usage for ${cropName} cultivation and reduce long-term costs`
    }
  ];
}

function getMockFinancialAdvice(cropResults: CropCalculationResult): FinancialAdvice {
  const cropName = cropResults.crop.name;
  const roi = cropResults.roi;
  const profit = cropResults.profit;
  
  let profitabilityStatus = "moderate";
  if (roi > 50) profitabilityStatus = "high";
  if (roi < 20) profitabilityStatus = "low";
  
  let riskLevel = "moderate";
  if (cropResults.crop.weatherSensitivity === "high") riskLevel = "high";
  if (cropResults.crop.weatherSensitivity === "low") riskLevel = "low";
  
  return {
    summary: `Your ${cropName} cultivation shows ${profitabilityStatus} profitability with an ROI of ${roi.toFixed(2)}% and expected profit of ₹${profit.toFixed(2)}. The overall financial outlook is ${profit > 0 ? "positive" : "concerning"}.`,
    
    profitabilityAnalysis: `The investment of ₹${cropResults.totalInvestment.toFixed(2)} is expected to generate revenue of ₹${cropResults.expectedRevenue.toFixed(2)}, resulting in a ${profit > 0 ? "profit" : "loss"} of ₹${Math.abs(profit).toFixed(2)}. Your break-even price is ₹${cropResults.breakEvenPrice.toFixed(2)} per unit, which is ${cropResults.breakEvenPrice < cropResults.crop.currentPrice ? "below" : "above"} the current market price of ₹${cropResults.crop.currentPrice}.`,
    
    riskAssessment: `${cropName} has ${riskLevel} sensitivity to weather conditions. Your current weather assumption is "${cropResults.weatherCondition}" which affects yield by ${cropResults.weatherCondition === "favorable" ? "+20%" : cropResults.weatherCondition === "unfavorable" ? "-20%" : "0%"}. Market price fluctuations and unexpected pest/disease outbreaks remain additional risk factors.`,
    
    recommendations: [
      `Consider ${cropResults.interestRate > 7 ? "refinancing at a lower interest rate" : "maintaining your current loan terms"} to optimize financial outcomes.`,
      `${cropResults.totalFertilizerCost > cropResults.totalSeedCost * 2 ? "Reduce fertilizer usage through soil testing and targeted application" : "Maintain current input balance"}`,
      `Explore crop insurance options to mitigate the ${riskLevel} weather sensitivity risk of ${cropName}`,
      `${roi < 30 ? "Consider diversifying with companion crops to improve overall farm profitability" : "Focus on optimizing current cultivation practices"}`,
      `${cropResults.waterCost > cropResults.totalInvestment * 0.2 ? "Invest in water conservation technologies to reduce ongoing costs" : "Maintain current water management practices"}`
    ],
    
    alternativeCrops: roi < 30 ? [
      cropName === "Wheat" ? "Barley" : "Wheat",
      cropName === "Rice" ? "Pulses" : "Rice",
      cropName === "Cotton" ? "Soybean" : "Cotton"
    ] : undefined
  };
}
