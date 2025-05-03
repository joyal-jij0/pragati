import { Message } from "@/types/ai-assistant";
import { groqService } from "./groqService";

// Get API key from environment variables
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

export const aiAssistantService = {
  getResponse: async (text: string, images: File[] = [], messages: Message[] = []): Promise<string> => {
    try {
      // If we have a Groq API key, use the Groq service
      if (GROQ_API_KEY) {
        return await groqService.getResponse(messages, GROQ_API_KEY);
      }
      
      // Extract language code from the text
      const langMatch = text.match(/\[LANG:([a-z]{2})\]/);
      const languageCode = langMatch && langMatch[1] ? langMatch[1] : "hi"; // Default to Hindi
      
      // Fallback to mock responses if no API key is provided
      console.warn("No Groq API key provided, using mock responses");
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate responses in the appropriate language
      if (languageCode === "hi") {
        // Hindi responses
        if (text.toLowerCase().includes('weather') || text.toLowerCase().includes('मौसम')) {
          return "आपके स्थान के लिए मौसम पूर्वानुमान के अनुसार, अगले 3 दिनों में साफ आसमान और 25°C से 32°C तक का तापमान रहेगा। आर्द्रता लगभग 65% रहेगी। ये स्थितियां अधिकांश खेत कार्यों के लिए अनुकूल हैं।";
        }
        
        if (text.toLowerCase().includes('disease') || text.toLowerCase().includes('रोग') || images.length > 0) {
          return "प्रदान की गई जानकारी से, यह पत्ती झुलसा (लीफ ब्लाइट) के प्रारंभिक लक्षण प्रतीत होते हैं। मैं अनुशंसा करता हूं:\n\n1. प्रभावित पत्तियों को हटाकर नष्ट करें\n2. कॉपर-आधारित फफूंदनाशक लागू करें\n3. बेहतर वायु संचार के लिए पौधों के बीच उचित दूरी सुनिश्चित करें\n\nक्या आप अधिक विशिष्ट उपचार विकल्प चाहेंगे?";
        }
        
        if (text.toLowerCase().includes('crop') || text.toLowerCase().includes('फसल') || text.toLowerCase().includes('plant') || text.toLowerCase().includes('पौधा')) {
          return "आपके मिट्टी के प्रकार और वर्तमान मौसम के आधार पर, मैं निम्नलिखित पर विचार करने की सलाह देता हूं:\n\n- **गेहूं**: अच्छी बाजार मांग, मध्यम पानी की आवश्यकता\n- **सरसों**: आपके क्षेत्र के लिए उपयुक्त, अच्छी रोटेशन फसल\n- **चना**: नाइट्रोजन-फिक्सिंग, मिट्टी के स्वास्थ्य में सुधार करता है\n\nक्या आप इनमें से किसी विकल्प पर अधिक विवरण चाहेंगे?";
        }
        
        if (text.toLowerCase().includes('market') || text.toLowerCase().includes('बाजार') || text.toLowerCase().includes('price') || text.toLowerCase().includes('मूल्य')) {
          return "आपके क्षेत्र में वर्तमान बाजार मूल्य:\n\n- गेहूं: ₹2,100 - ₹2,250 प्रति क्विंटल\n- चावल: ₹1,950 - ₹2,100 प्रति क्विंटल\n- मक्का: ₹1,800 - ₹1,900 प्रति क्विंटल\n\nपिछले महीने की तुलना में गेहूं के मूल्य में वृद्धि हो रही है।";
        }
        
        if (text.toLowerCase().includes('scheme') || text.toLowerCase().includes('योजना') || text.toLowerCase().includes('subsidy') || text.toLowerCase().includes('सब्सिडी')) {
          return "यहां कुछ प्रासंगिक सरकारी योजनाएं हैं:\n\n1. **पीएम-किसान**: ₹6,000 प्रति वर्ष का प्रत्यक्ष आय समर्थन\n2. **मृदा स्वास्थ्य कार्ड योजना**: मुफ्त मिट्टी परीक्षण और सिफारिशें\n3. **पीएमएफबीवाई**: न्यूनतम प्रीमियम के साथ फसल बीमा\n\nपीएमएफबीवाई के लिए आवेदन की खिड़की अगले महीने तक खुली है।";
        }
        
        // Default Hindi response
        return "आपके संदेश के लिए धन्यवाद। मैं आज आपकी कृषि आवश्यकताओं में कैसे सहायता कर सकता हूं? मैं फसल अनुशंसाओं, रोग पहचान, मौसम मार्गदर्शन, बाजार जानकारी और अधिक में मदद कर सकता हूं।";
      } else if (languageCode === "pa") {
        // Punjabi responses
        return "ਤੁਹਾਡੇ ਸੁਨੇਹੇ ਲਈ ਧੰਨਵਾਦ। ਮੈਂ ਅੱਜ ਤੁਹਾਡੀਆਂ ਖੇਤੀਬਾੜੀ ਜ਼ਰੂਰਤਾਂ ਵਿੱਚ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ? ਮੈਂ ਫਸਲ ਦੀਆਂ ਸਿਫਾਰਸ਼ਾਂ, ਬਿਮਾਰੀ ਦੀ ਪਛਾਣ, ਮੌਸਮ ਦੇ ਮਾਰਗਦਰਸ਼ਨ, ਮਾਰਕੀਟ ਦੀ ਜਾਣਕਾਰੀ ਅਤੇ ਹੋਰ ਬਹੁਤ ਕੁਝ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ।";
      } else if (languageCode === "bn") {
        // Bengali responses
        return "আপনার বার্তার জন্য ধন্যবাদ। আমি আজ আপনার কৃষি প্রয়োজনীয়তায় কীভাবে সাহায্য করতে পারি? আমি ফসলের সুপারিশ, রোগ সনাক্তকরণ, আবহাওয়া গাইডেন্স, বাজার তথ্য এবং আরও অনেক কিছুতে সাহায্য করতে পারি।";
      } else if (languageCode === "te") {
        // Telugu responses
        return "మీ సందేశానికి ధన్యవాదాలు. నేను ఈరోజు మీ వ్యవసాయ అవసరాలలో ఎలా సహాయపడగలను? నేను పంట సిఫార్సులు, వ్యాధి గుర్తింపు, వాతావరణ మార్గదర్శకత్వం, మార్కెట్ సమాచారం మరియు మరిన్ని విషయాలలో సహాయపడగలను.";
      } else if (languageCode === "ta") {
        // Tamil responses
        return "உங்கள் செய்திக்கு நன்றி. இன்று உங்கள் விவசாய தேவைகளில் நான் எவ்வாறு உதவ முடியும்? நான் பயிர் பரிந்துரைகள், நோய் அடையாளம், வானிலை வழிகாட்டுதல், சந்தை தகவல் மற்றும் பல விஷயங்களில் உதவ முடியும்.";
      } else if (languageCode === "mr") {
        // Marathi responses
        return "तुमच्या संदेशाबद्दल धन्यवाद. मी आज तुमच्या शेती गरजांमध्ये कशी मदत करू शकतो? मी पीक शिफारसी, रोग ओळख, हवामान मार्गदर्शन, बाजार माहिती आणि बरेच काही मदत करू शकतो.";
      } else if (languageCode === "gu") {
        // Gujarati responses
        return "તમારા સંદેશ માટે આભાર. હું આજે તમારી ખેતી જરૂરિયાતોમાં કેવી રીતે મદદ કરી શકું? હું પાક ભલામણો, રોગ ઓળખ, હવામાન માર્ગદર્શન, બજાર માહિતી અને વધુ ઘણી બાબતોમાં મદદ કરી શકું છું.";
      } else if (languageCode === "kn") {
        // Kannada responses
        return "ನಿಮ್ಮ ಸಂದೇಶಕ್ಕೆ ಧನ್ಯವಾದಗಳು. ನಾನು ಇಂದು ನಿಮ್ಮ ಕೃಷಿ ಅಗತ್ಯಗಳಲ್ಲಿ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು? ನಾನು ಬೆಳೆ ಶಿಫಾರಸುಗಳು, ರೋಗ ಗುರುತಿಸುವಿಕೆ, ಹವಾಮಾನ ಮಾರ್ಗದರ್ಶನ, ಮಾರುಕಟ್ಟೆ ಮಾಹಿತಿ ಮತ್ತು ಇನ್ನೂ ಹೆಚ್ಚಿನದರಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಹುದು.";
      } else {
        // English responses (default for other languages)
        if (text.toLowerCase().includes('weather')) {
          return "Based on the forecast for your location, expect clear skies with temperatures ranging from 25°C to 32°C over the next 3 days. Humidity will be around 65%. These conditions are favorable for most field operations.";
        }
        
        if (text.toLowerCase().includes('disease') || images.length > 0) {
          return "From the information provided, this appears to be early signs of leaf blight. I recommend:\n\n1. Remove and destroy affected leaves\n2. Apply a copper-based fungicide\n3. Ensure proper spacing between plants for better air circulation\n\nWould you like more specific treatment options?";
        }
        
        if (text.toLowerCase().includes('crop') || text.toLowerCase().includes('plant')) {
          return "Based on your soil type and the current season, I recommend considering:\n\n- **Wheat**: Good market demand, moderate water requirements\n- **Mustard**: Suitable for your region, good rotation crop\n- **Chickpeas**: Nitrogen-fixing, improves soil health\n\nWould you like more details on any of these options?";
        }
        
        if (text.toLowerCase().includes('market') || text.toLowerCase().includes('price')) {
          return "Current market prices in your region:\n\n- Wheat: ₹2,100 - ₹2,250 per quintal\n- Rice: ₹1,950 - ₹2,100 per quintal\n- Maize: ₹1,800 - ₹1,900 per quintal\n\nPrices for wheat are trending upward compared to last month.";
        }
        
        if (text.toLowerCase().includes('scheme') || text.toLowerCase().includes('subsidy')) {
          return "Here are some relevant government schemes:\n\n1. **PM-KISAN**: Direct income support of ₹6,000 per year\n2. **Soil Health Card Scheme**: Free soil testing and recommendations\n3. **PMFBY**: Crop insurance with minimal premium\n\nThe application window for PMFBY is currently open until next month.";
        }
        
        // Default English response
        return "Thank you for your message. How can I assist with your farming needs today? I can help with crop recommendations, disease identification, weather guidance, market information, and more.";
      }
    } catch (error) {
      console.error("Error in AI Assistant service:", error);
      return "I apologize, but I encountered an error processing your request. Please check your internet connection and try again.";
    }
  }
};