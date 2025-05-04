import { GovernmentScheme } from "@/components/arthikSahara/SaralDocuments";

// Define the Gemini API URL and model
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent";
const GEMINI_MODEL = "gemini-1.5-pro"; // Using Gemini 1.5 Pro for best performance

// Get API key from environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

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

export const schemeFinderService = {
  // Generate completion for scheme finder
  generateCompletion: async (prompt: string): Promise<GovernmentScheme[] | string> => {
    try {
      if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
        console.warn("No Gemini API key provided, using mock responses");
        // Return mock data if no API key is provided
        return getMockSchemes();
      }

      // Format the prompt for the Gemini API
      const formattedPrompt = `
        You are an expert on Indian agricultural schemes and government programs for farmers. 
        Your task is to provide accurate, detailed information about schemes that match the user's criteria.
        Format your response as a valid JSON array of schemes with all the required fields.
        
        ${prompt}
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
          maxOutputTokens: 4096 // Increased for detailed scheme information
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
        return responseText;
      } else {
        throw new Error("No response from Gemini API");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  },

  // Generate application roadmap for a specific scheme
  generateRoadmap: async (scheme: GovernmentScheme, language: string = "en"): Promise<string[]> => {
    try {
      if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY") {
        console.warn("No Gemini API key provided, using mock roadmap");
        return getMockRoadmap(scheme, language);
      }
      
      // Format the prompt for the Gemini API
      const formattedPrompt = `
        Create a detailed step-by-step roadmap for applying to the following government scheme:
        
        Scheme Name: ${scheme.title}
        Description: ${scheme.description}
        Eligibility: ${scheme.eligibility}
        Required Documents: ${scheme.documents.join(", ")}
        Application Process: ${scheme.applicationProcess}
        
        Important instructions:
        1. Respond in ${language === "en" ? "English" : language === "hi" ? "Hindi" : language === "pa" ? "Punjabi" : language === "gu" ? "Gujarati" : language === "mr" ? "Marathi" : language === "bn" ? "Bengali" : language === "te" ? "Telugu" : language === "ta" ? "Tamil" : "English"} language.
        2. Format your response as a detailed list of actionable steps that a farmer should follow to successfully apply for this scheme.
        3. Each step should start with an emoji followed by "Step X:" and then the instruction.
        4. Include as many steps as needed to fully explain the process (not limited to 10 steps).
        5. For each step, provide detailed explanations with sub-points where necessary.
        6. Include information about where to find forms, how to fill them, where to submit them, etc.
        7. Include relevant URLs, contact information, and helpline numbers where applicable.
        8. Make the instructions simple enough for farmers with limited technical knowledge to understand.
        9. Include information about tracking the application status after submission.
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
      
      // Extract the response text and split into steps
      if (data.candidates && data.candidates.length > 0) {
        const responseText = data.candidates[0].content.parts[0].text;
        // Extract steps from the response
        const steps = responseText
          .split('\n')
          .filter(line => line.trim().length > 0 && (line.includes('Step') || line.includes('चरण') || line.includes('ਕਦਮ') || line.includes('પગલું') || line.includes('पाऊल') || line.includes('ধাপ') || line.includes('దశ') || line.includes('படி')))
          .map(line => line.trim());
        
        return steps.length > 0 ? steps : getMockRoadmap(scheme, language);
      } else {
        return getMockRoadmap(scheme, language);
      }
    } catch (error) {
      console.error("Error generating roadmap:", error);
      return getMockRoadmap(scheme, language);
    }
  }
};

// Mock data function for testing or when API key is not available
function getMockSchemes(): GovernmentScheme[] {
  return [
    {
      id: "scheme-1",
      title: "PM-KISAN",
      description: "Direct income support of ₹6,000 per year to farmer families",
      eligibility: "All landholding farmer families with cultivable land",
      benefits: "₹6,000 per year in three equal installments",
      documents: ["Aadhaar Card", "Land Records", "Bank Passbook"],
      applicationProcess: "Online through PM-KISAN portal or through Common Service Centers",
      deadline: "Ongoing",
      category: "income-support",
      cropTypes: ["all"],
      landSizeRequirement: "any",
      farmerCategory: "all",
      aiRecommendation: "Based on your profile as a farmer in Haryana with medium-sized land, this scheme is highly relevant for you.",
      matchScore: 95,
      applicationDeadline: "Ongoing",
      estimatedBenefit: "₹6,000 per year",
      applicationLink: "https://pmkisan.gov.in/",
      formDownloadLink: "https://pmkisan.gov.in/Documents/FarmerRegistrationForm.pdf",
    },
    {
      id: "scheme-2",
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      description: "Crop insurance scheme to provide financial support to farmers suffering crop loss/damage",
      eligibility: "All farmers growing notified crops in notified areas",
      benefits: "Insurance coverage and financial support in case of crop failure",
      documents: ["Aadhaar Card", "Land Records", "Bank Passbook", "Sowing Certificate"],
      applicationProcess: "Through banks, insurance companies, or online portal",
      deadline: "Varies by season",
      category: "insurance",
      cropTypes: ["rice", "wheat", "pulses", "oilseeds"],
      landSizeRequirement: "any",
      farmerCategory: "all",
      aiRecommendation: "Given your wheat cultivation in Haryana, this insurance scheme is crucial for protecting against crop failures.",
      matchScore: 88,
      applicationDeadline: "30 June 2025 for Kharif season",
      estimatedBenefit: "Coverage up to ₹50,000 per acre",
    },
    {
      id: "scheme-3",
      title: "Kisan Credit Card (KCC)",
      description: "Provides farmers with affordable credit for cultivation and other needs",
      eligibility: "All farmers, sharecroppers, tenant farmers, and self-help groups",
      benefits: "Credit up to ₹3 lakh at 4% interest rate with interest subvention",
      documents: ["Identity Proof", "Address Proof", "Land Records", "Passport Size Photo"],
      applicationProcess: "Apply through nationalized banks, regional rural banks, or cooperative banks",
      deadline: "Ongoing",
      category: "credit",
      cropTypes: ["all"],
      landSizeRequirement: "any",
      farmerCategory: "all",
      aiRecommendation: "With your medium-sized farm, a KCC would provide you with timely credit for purchasing seeds and fertilizers.",
      matchScore: 90,
      applicationDeadline: "Ongoing",
      estimatedBenefit: "Up to ₹3 lakh loan at 4% interest",
    }
  ];
}

// Mock roadmap function for when API key is not available
function getMockRoadmap(scheme: GovernmentScheme, language: string = "en"): string[] {
  if (language === "hi") {
    return [
      `📋 चरण 1: सभी आवश्यक दस्तावेज़ इकट्ठा करें (${scheme.documents.join(", ")})`,
      "✅ चरण 2: योजना की पात्रता मानदंडों के अनुसार अपनी पात्रता सत्यापित करें",
      "🖥️ चरण 3: आधिकारिक आवेदन पोर्टल या निकटतम कॉमन सर्विस सेंटर पर जाएँ",
      "📝 चरण 4: आवेदन फॉर्स को सही व्यक्तिगत और भूमि विवरण के साथ भरें",
      "📎 चरण 5: सभी आवश्यक दस्तावेजों की स्कैन की गई प्रतियां अपलोड करें",
      "💰 चरण 6: आवेदन शुल्क का भुगतान करें (यदि लागू हो)",
      "📤 चरण 7: अपना आवेदन जमा करें और संदर्भ संख्याक नोट करें",
      "⏱️ चरण 8: संदर्भ संख्याक का उपयोग करके अपने आवेदन की स्थिति को ट्रैक करें",
      "📱 चरण 9: अधिकारियों से आने वाले किसी भी सत्यापन कਾल या संदेशों का जवाब दें",
      "🎉 चरण 10: योजना में सफल नामांकन की पुष्टि प्राप्त करें",
    ];
  } else if (language === "pa") {
    return [
      `📋 ਕਦਮ 1: ਸਾਰੇ ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼ ਇਕੱਠੇ ਕਰੋ (${scheme.documents.join(", ")})`,
      "✅ ਕਦਮ 2: ਯੋਜਨਾ ਦੇ ਯੋਗਤਾ ਮਾਪਦੰਡਾਂ ਦੇ ਅਨੁਸਾਰ ਆਪਣੀ ਯੋਗਤਾ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
      "🖥️ ਕਦਮ 3: ਅਧਿਕਾਰਤ ਐਪਲੀਕੇਸ਼ਨ ਪੋਰਟਲ ਜਾਂ ਨੇੜਲੇ ਕਾਮਨ ਸਰਵਿਸ ਸੈਂਟਰ 'ਤੇ ਜਾਓ",
      "📝 ਕਦਮ 4: ਐਪਲੀਕੇਸ਼ਨ ਫਾਰਮ ਨੂੰ ਸਹੀ ਨਿੱਜੀ ਅਤੇ ਜ਼ਮੀਨੀ ਵੇਰਵਿਆਂ ਨਾਲ ਭਰੋ",
      "📎 ਕਦਮ 5: ਸਾਰੇ ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼ਾਂ ਦੀਆਂ ਕਾਪੀਆਂ ਅਪਲੋਡ ਕਰੋ",
      "💰 ਕਦਮ 6: ਐਪਲੀਕੇਸ਼ਨ ਫੀਸ ਦਾ ਭੁਗਤਾਨ ਕਰੋ (ਜੇ ਲਾਗੂ ਹੋਵੇ)",
      "📤 ਕਦਮ 7: ਆਪਣੀ ਐਪਲੀਕੇਸ਼ਨ ਜਮ੍ਹਾਂ ਕਰੋ ਅਤੇ ਰੈਫਰੈਂਸ ਨੰਬਰ ਨੋਟ ਕਰੋ",
      "⏱️ ਕਦਮ 8: ਰੈਫਰੈਂਸ ਨੰਬਰ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਆਪਣੀ ਐਪਲੀਕੇਸ਼ਨ ਦੀ ਸਥਿਤੀ ਨੂੰ ਟਰੈਕ ਕਰੋ",
      "📱 ਕਦਮ 9: ਅਧਿਕਾਰੀਆਂ ਤੋਂ ਕਿਸੇ ਵੀ ਪੁਸ਼ਟੀਕਰਨ ਕਾਲਾਂ ਜਾਂ ਸੁਨੇਹਿਆਂ ਦਾ ਜਵਾਬ ਦਿਓ",
      "🎉 ਕਦਮ 10: ਯੋਜਨਾ ਵਿੱਚ ਸਫਲ ਦਾਖਲੇ ਦੀ ਪੁਸ਼ਟੀ ਪ੍ਰਾਪਤ ਕਰੋ",
    ];
  } else {
    return [
      `📋 Step 1: Gather all required documents (${scheme.documents.join(", ")})`,
      "✅ Step 2: Verify your eligibility criteria matches the scheme requirements",
      "🖥️ Step 3: Visit the official application portal or nearest Common Service Center",
      "📝 Step 4: Fill the application form with accurate personal and land details",
      "📎 Step 5: Upload scanned copies of all required documents",
      "💰 Step 6: Pay application fee (if applicable)",
      "📤 Step 7: Submit your application and note down the reference number",
      "⏱️ Step 8: Track your application status using the reference number",
      "📱 Step 9: Respond to any verification calls or messages from authorities",
      "🎉 Step 10: Receive confirmation of successful enrollment in the scheme",
    ];
  }
}