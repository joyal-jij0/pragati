import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, User, Clock, ThumbsUp, Share2, MapPin, ExternalLink, FileText, AlertCircle, Download, Volume2, VolumeX } from "lucide-react";
import { Message } from "@/types/ai-assistant";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import { speechService } from "@/services/ai-assistant/speechService";

interface ChatMessageProps {
  message: Message;
  language?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, language = "hi" }) => {
  const isUser = message.role === "user";
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Get emoji for avatar based on role
  const getAvatarEmoji = () => {
    if (isUser) {
      return "👨‍🌾"; // Farmer emoji for user
    } else {
      // Different emojis for assistant based on content
      if (typeof message.content === 'string') {
        if (message.content.includes("weather") || message.content.includes("मौसम")) return "🌤️";
        if (message.content.includes("crop") || message.content.includes("फसल")) return "🌾";
        if (message.content.includes("scheme") || message.content.includes("योजना")) return "📋";
        if (message.content.includes("price") || message.content.includes("मूल्य")) return "💰";
      } else if (message.content.type === "text") {
        if (message.content.text.includes("weather") || message.content.text.includes("मौसम")) return "🌤️";
        if (message.content.text.includes("crop") || message.content.text.includes("फसल")) return "🌾";
        if (message.content.text.includes("scheme") || message.content.text.includes("योजना")) return "📋";
        if (message.content.text.includes("price") || message.content.text.includes("मूल्य")) return "💰";
      }
      return "🤖"; // Default robot emoji for assistant
    }
  };
  
  // Function to render links with proper formatting
  const renderLink = (url: string, text: string) => {
    // Check if URL is valid
    let finalUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      finalUrl = `https://${url}`;
    }
    
    return (
      <a 
        href={finalUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`${isUser ? "text-blue-100 hover:text-blue-200" : "text-blue-600 hover:text-blue-800"} underline flex items-center`}
      >
        {text} <ExternalLink className="h-3 w-3 ml-1 inline" />
      </a>
    );
  };
  
  // Function to render Google Maps link
  const renderMapLink = (location: string) => {
    const encodedLocation = encodeURIComponent(location);
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    
    return (
      <div className="mt-3 bg-gray-100 p-3 rounded-lg border border-gray-200">
        <div className="flex items-center text-gray-800 mb-1 text-xs font-medium">
          <MapPin className="h-3 w-3 mr-1" />
          <span>Location: {location}</span>
        </div>
        <a 
          href={mapUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 text-xs flex items-center bg-white p-2 rounded-lg"
        >
          {language === "hi" ? "गूगल मैप्स पर देखें" : "View on Google Maps"} <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>
    );
  };
  
  // Function to render scheme/loan information box
  const renderSchemeInfo = () => {
    return (
      <div className="mt-3 bg-gray-100 p-3 rounded-lg border border-gray-200">
        <div className="flex items-center text-gray-800 mb-2 font-medium">
          <FileText className="h-4 w-4 mr-2" />
          <span>{language === "hi" ? "अतिरिक्त जानकारी" : "Additional Information"}</span>
        </div>
        <div className="text-gray-700 text-sm space-y-2">
          <p>{language === "hi" ? "अधिक विवरण और आवेदन प्रक्रिया के लिए, कृपया यहां जाएं:" : "For more details and application process, please visit:"}</p>
          <div className="bg-white p-2 rounded-lg flex items-center justify-between">
            <span className="text-gray-700">{language === "hi" ? "आधिकारिक पोर्टल" : "Official Portal"}</span>
            {renderLink("https://pmkisan.gov.in/", language === "hi" ? "पीएम किसान पोर्टल" : "PM Kisan Portal")}
          </div>
          <div className="flex items-center text-amber-600 text-xs mt-2">
            <AlertCircle className="h-3 w-3 mr-1" />
            <span>{language === "hi" ? "आवेदन करने से पहले हमेशा पात्रता मानदंड सत्यापित करें" : "Always verify eligibility criteria before applying"}</span>
          </div>
        </div>
      </div>
    );
  };
  
  // Function to render download button for resources
  const renderDownloadButton = (resourceName: string, fileUrl: string = "") => {
    // Default PDF URLs based on resource type
    let url = fileUrl;
    if (!url) {
      if (resourceName.includes("Guide") || resourceName.includes("मार्गदर्शिका")) {
        url = "https://agricoop.gov.in/sites/default/files/National%20Mission%20For%20Sustainable%20Agriculture-GUIDELINES-English.pdf";
      } else if (resourceName.includes("Form") || resourceName.includes("प्रपत्र")) {
        url = "https://pmkisan.gov.in/Documents/RevisedPM-KISANKYCform.pdf";
      }
    }
    
    return (
      <div className="mt-2 bg-white p-2 rounded-lg flex items-center justify-between border border-gray-200">
        <span className="text-gray-700">{resourceName}</span>
        <a 
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-xs py-1 px-2 rounded-lg flex items-center"
        >
          <Download className="h-3 w-3 mr-1" />
          {language === "hi" ? "डाउनलोड" : "Download"}
        </a>
      </div>
    );
  };
  
  // Handle the content based on its type
  const renderContent = () => {
    if (typeof message.content === 'string') {
      // Handle legacy string content
      return (
        <div className={`prose prose-sm max-w-none ${isUser ? "prose-invert" : ""}`}>
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className={`text-xl font-bold mb-3 ${isUser ? "text-white" : "text-gray-900"}`} {...props} />,
              h2: ({ node, ...props }) => <h2 className={`text-lg font-bold mb-2 ${isUser ? "text-white" : "text-gray-900"}`} {...props} />,
              h3: ({ node, ...props }) => <h3 className={`text-md font-bold mb-2 ${isUser ? "text-white" : "text-gray-900"}`} {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1 my-2" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-5 space-y-1 my-2" {...props} />,
              li: ({ node, ...props }) => <li className={isUser ? "text-white/90" : "text-gray-700"} {...props} />,
              a: ({ node, href, children, ...props }) => href ? renderLink(href, String(children)) : <a {...props}>{children}</a>,
              p: ({ node, ...props }) => <p className={`mb-2 ${isUser ? "text-white/90" : "text-gray-700"}`} {...props} />,
              blockquote: ({ node, ...props }) => <blockquote className={`border-l-4 ${isUser ? "border-white/20 pl-4 italic text-white/80" : "border-gray-200 pl-4 italic text-gray-600"}`} {...props} />,
              strong: ({ node, ...props }) => <strong className={`font-bold ${isUser ? "text-white" : "text-gray-900"}`} {...props} />,
              em: ({ node, ...props }) => <em className={`italic ${isUser ? "text-white/90" : "text-gray-700"}`} {...props} />,
              code: ({ node, ...props }) => <code className={`${isUser ? "bg-white/10 text-amber-200" : "bg-gray-100 text-amber-700"} px-1 py-0.5 rounded`} {...props} />,
              pre: ({ node, ...props }) => <pre className={`${isUser ? "bg-white/10 text-green-100" : "bg-gray-100 text-green-700"} p-3 rounded-lg overflow-x-auto my-3`} {...props} />,
            }}
          >
            {message.content}
          </ReactMarkdown>
          
          {/* Check for location mentions to add map link */}
          {!isUser && message.content.includes("location") && message.content.includes("map") && (
            renderMapLink(message.content.split("location")[1].split(".")[0].trim())
          )}
          
          {/* Check for loan/scheme/insurance mentions to add info box */}
          {!isUser && (message.content.includes("loan") || message.content.includes("scheme") || message.content.includes("insurance") || 
                      message.content.includes("ऋण") || message.content.includes("योजना") || message.content.includes("बीमा")) && (
            renderSchemeInfo()
          )}
          
          {/* Check for downloadable resources */}
          {!isUser && (message.content.includes("guide") || message.content.includes("manual") || message.content.includes("मार्गदर्शिका")) && (
            <div className="mt-3 space-y-2">
              {renderDownloadButton(language === "hi" ? "किसान मार्गदर्शिका PDF" : "Farmer's Guide PDF")}
              {renderDownloadButton(language === "hi" ? "आवेदन प्रपत्र" : "Application Form")}
            </div>
          )}
        </div>
      );
    } else if (message.content.type === "text") {
      // Handle text content
      return (
        <div className={`prose prose-sm max-w-none ${isUser ? "prose-invert" : ""}`}>
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className={`text-xl font-bold mb-3 ${isUser ? "text-white" : "text-gray-900"}`} {...props} />,
              h2: ({ node, ...props }) => <h2 className={`text-lg font-bold mb-2 ${isUser ? "text-white" : "text-gray-900"}`} {...props} />,
              h3: ({ node, ...props }) => <h3 className={`text-md font-bold mb-2 ${isUser ? "text-white" : "text-gray-900"}`} {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1 my-2" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-5 space-y-1 my-2" {...props} />,
              li: ({ node, ...props }) => <li className={isUser ? "text-white/90" : "text-gray-700"} {...props} />,
              a: ({ node, href, children, ...props }) => href ? renderLink(href, String(children)) : <a {...props}>{children}</a>,
              p: ({ node, ...props }) => <p className={`mb-2 ${isUser ? "text-white/90" : "text-gray-700"}`} {...props} />,
              blockquote: ({ node, ...props }) => <blockquote className={`border-l-4 ${isUser ? "border-white/20 pl-4 italic text-white/80" : "border-gray-200 pl-4 italic text-gray-600"}`} {...props} />,
              strong: ({ node, ...props }) => <strong className={`font-bold ${isUser ? "text-white" : "text-gray-900"}`} {...props} />,
              em: ({ node, ...props }) => <em className={`italic ${isUser ? "text-white/90" : "text-gray-700"}`} {...props} />,
              code: ({ node, ...props }) => <code className={`${isUser ? "bg-white/10 text-amber-200" : "bg-gray-100 text-amber-700"} px-1 py-0.5 rounded`} {...props} />,
              pre: ({ node, ...props }) => <pre className={`${isUser ? "bg-white/10 text-green-100" : "bg-gray-100 text-green-700"} p-3 rounded-lg overflow-x-auto my-3`} {...props} />,
            }}
          >
            {message.content.text}
          </ReactMarkdown>
          
          {/* Check for location mentions to add map link */}
          {!isUser && message.content.text.includes("location") && message.content.text.includes("map") && (
            renderMapLink(message.content.text.split("location")[1].split(".")[0].trim())
          )}
          
          {/* Check for loan/scheme/insurance mentions to add info box */}
          {!isUser && (message.content.text.includes("loan") || message.content.text.includes("scheme") || message.content.text.includes("insurance") || 
                      message.content.text.includes("ऋण") || message.content.text.includes("योजना") || message.content.text.includes("बीमा")) && (
            renderSchemeInfo()
          )}
          
          {/* Check for downloadable resources */}
          {!isUser && (message.content.text.includes("guide") || message.content.text.includes("manual") || message.content.text.includes("मार्गदर्शिका")) && (
            <div className="mt-3 space-y-2">
              {renderDownloadButton(language === "hi" ? "किसान मार्गदर्शिका PDF" : "Farmer's Guide PDF")}
              {renderDownloadButton(language === "hi" ? "आवेदन प्रपत्र" : "Application Form")}
            </div>
          )}
        </div>
      );
    } else if (message.content.type === "image") {
      // Handle image content
      return (
        <div>
          <img 
            src={message.content.imageUrl} 
            alt="Uploaded image" 
            className="rounded-lg max-h-60 w-auto border-2 border-gray-200 shadow-lg"
          />
          {message.content.text && (
            <div className={`mt-3 prose prose-sm max-w-none ${isUser ? "prose-invert" : ""}`}>
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => <h1 className={`text-xl font-bold mb-3 ${isUser ? "text-white" : "text-gray-900"}`} {...props} />,
                  h2: ({ node, ...props }) => <h2 className={`text-lg font-bold mb-2 ${isUser ? "text-white" : "text-gray-900"}`} {...props} />,
                  h3: ({ node, ...props }) => <h3 className={`text-md font-bold mb-2 ${isUser ? "text-white" : "text-gray-900"}`} {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1 my-2" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal pl-5 space-y-1 my-2" {...props} />,
                  li: ({ node, ...props }) => <li className={isUser ? "text-white/90" : "text-gray-700"} {...props} />,
                  a: ({ node, href, children, ...props }) => href ? renderLink(href, String(children)) : <a {...props}>{children}</a>,
                  p: ({ node, ...props }) => <p className={`mb-2 ${isUser ? "text-white/90" : "text-gray-700"}`} {...props} />,
                  strong: ({ node, ...props }) => <strong className={`font-bold ${isUser ? "text-white" : "text-gray-900"}`} {...props} />,
                  em: ({ node, ...props }) => <em className={`italic ${isUser ? "text-white/90" : "text-gray-700"}`} {...props} />,
                  code: ({ node, ...props }) => <code className={`${isUser ? "bg-white/10 text-amber-200" : "bg-gray-100 text-amber-700"} px-1 py-0.5 rounded`} {...props} />,
                }}
              >
                {message.content.text}
              </ReactMarkdown>
            </div>
          )}
        </div>
      );
    }
    
    // Fallback for unknown content types
    return <div>Unsupported message format</div>;
  };
  
  // Function to play text-to-speech
  const handleTextToSpeech = async () => {
    try {
      // Only process TTS for assistant messages
      if (isUser) return;
      
      // If already playing, stop it
      if (isPlaying) {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        return;
      }
      
      // Get the text content
      let textContent = "";
      if (typeof message.content === 'string') {
        textContent = message.content;
      } else if (message.content.type === "text") {
        textContent = message.content.text;
      } else {
        return; // Can't process non-text content
      }
      
      // If we already have the audio URL, just play it
      if (audioUrl && audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true);
        return;
      }
      
      // Otherwise, generate the audio
      const audio = await speechService.textToSpeech(textContent, language);
      setAudioUrl(audio);
      
      // Play the audio
      if (audioRef.current) {
        audioRef.current.src = audio;
        audioRef.current.play();
        setIsPlaying(true);
        
        // Set up event listener for when audio ends
        audioRef.current.onended = () => {
          setIsPlaying(false);
        };
      }
    } catch (error) {
      console.error("Error with text-to-speech:", error);
      setIsPlaying(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex gap-3 max-w-[80%] ${isUser ? "flex-row-reverse" : ""}`}>
        <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
          isUser ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
        }`}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>
        
        <div>
          <div className={`rounded-2xl p-4 ${
            isUser 
              ? "bg-blue-600 text-white rounded-tr-none" 
              : "bg-gray-100 text-gray-800 rounded-tl-none"
          }`}>
            {renderContent()}
          </div>
          
          <div className="flex items-center mt-1 text-xs text-gray-500 gap-2">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}</span>
            </div>
            
            {/* Text-to-Speech button (only for assistant messages) */}
            {!isUser && (
              <button 
                onClick={handleTextToSpeech}
                className={`p-1 rounded-full ${isPlaying ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
                title={isPlaying ? "Stop speaking" : "Listen"}
              >
                {isPlaying ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
              </button>
            )}
          </div>
          
          {/* Hidden audio element for playing TTS */}
          <audio ref={audioRef} style={{ display: 'none' }} />
        </div>
      </div>
    </motion.div>
  );
};