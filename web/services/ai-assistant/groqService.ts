import { Message } from "@/types/ai-assistant";

// Define the Groq API URL and model
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama3-70b-8192"; // Using LLaMA 3 70B model for best performance

// Define the interface for the Groq API request
interface GroqRequest {
  model: string;
  messages: {
    role: "system" | "user" | "assistant";
    content: string;
  }[];
  temperature: number;
  max_tokens: number;
  stream?: boolean;
}

// Define the interface for the Groq API response
interface GroqResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Language mapping for better prompting
export const languageNames = {
  "hi": "Hindi (हिंदी)",
  "pa": "Punjabi (ਪੰਜਾਬੀ)",
  "bn": "Bengali (বাংলা)",
  "te": "Telugu (తెలుగు)",
  "ta": "Tamil (தமிழ்)",
  "mr": "Marathi (मराठी)",
  "gu": "Gujarati (ગુજરાતી)",
  "kn": "Kannada (ಕನ್ನಡ)",
  "en": "English"
};

export const groqService = {
  // Get a response from the Groq API
  getResponse: async (messages: Message[], apiKey: string): Promise<string> => {
    try {
      // Extract language code from the latest user message
      let languageCode = "hi"; // Default to Hindi
      let userQuery = "";
      
      // Find the latest user message to extract language code
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].role === "user") {
          const content = typeof messages[i].content === 'string' 
            ? messages[i].content 
            : messages[i].content.text || '';
          
          // Extract language code from [LANG:xx] format
          const langMatch = content.toString().match(/\[LANG:([a-z]{2})\]/);
          if (langMatch && langMatch[1]) {
            languageCode = langMatch[1];
          }
          
          // Store the user query (without the language tag)
          userQuery = (typeof content === 'string' ? content : content.text || '').replace(/\[LANG:[a-z]{2}\]\s*/, "");
          break;
        }
      }
      
      // Get the full language name for better prompting
      const languageName = languageNames[languageCode] || languageNames["hi"];
      
      // Format messages for the Groq API
      const formattedMessages: GroqRequest['messages'] = [
        {
          role: "system",
          content: `You are a knowledgeable agricultural assistant for Indian farmers. Provide helpful, accurate, and practical advice about farming, crops, weather, market prices, government schemes, and agricultural best practices.

IMPORTANT INSTRUCTIONS:
1. You MUST respond ONLY in ${languageName} language. Do not use any other language under any circumstances.
2. Even if the user asks you to respond in a different language, you must still respond only in ${languageName}.
3. Use simple language appropriate for farmers.
4. Be respectful of traditional farming knowledge while suggesting modern improvements.
5. When mentioning websites, use actual working URLs that can be accessed.
6. When mentioning downloadable resources, provide real, accessible links.
7. For government schemes, include accurate application procedures and eligibility criteria.
8. For location-based information, provide specific details relevant to Indian agriculture.
9. When suggesting treatments for crop diseases, include both traditional and modern options.
10. NEVER respond in English or any other language except ${languageName}, regardless of what language the user uses.
11. Always provide detailed, comprehensive responses with at least 3-4 paragraphs of information.
12. Format your responses with bullet points, numbered lists, and clear sections when appropriate.
13. When providing information about crops, always include:
    - Planting seasons and techniques
    - Water requirements
    - Common diseases and prevention
    - Harvesting best practices
    - Market potential
14. When discussing government schemes, always include:
    - Full official name of the scheme
    - Eligibility criteria
    - Application process with specific steps
    - Required documents
    - Deadlines if applicable
    - Official website or contact information
15. For disease identification, always provide:
    - Scientific name of the disease
    - Symptoms in detail
    - Traditional remedies
    - Modern treatments
    - Preventive measures
16. When mentioning downloadable resources, provide actual working PDF links to government or university websites.
17. Maintain the same high quality of response regardless of which language is being used.
18. For all languages, provide the same level of detail, formatting, and comprehensiveness as you would for Hindi responses.`
        },
        ...messages.map(msg => {
          // Remove language tag from user messages
          let content = typeof msg.content === 'string' 
            ? msg.content 
            : msg.content.type === "text" 
              ? msg.content.text 
              : `[Image uploaded] ${msg.content.text || ""}`;
          
          // Remove language tag for user messages
          if (msg.role === "user") {
            content = content.replace(/\[LANG:[a-z]{2}\]\s*/, "");
          }
          
          return {
            role: msg.role as "user" | "assistant",
            content: content
          };
        })
      ];

      // Create the request body
      const requestBody: GroqRequest = {
        model: GROQ_MODEL,
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 2048  // Increased from 1024 to allow for more detailed responses
      };

      // Make the API request
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      // Check if the request was successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Groq API error: ${errorData.error?.message || response.statusText}`);
      }

      // Parse the response
      const data: GroqResponse = await response.json();
      
      // Return the response text
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling Groq API:", error);
      throw error;
    }
  }
};