"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Image as ImageIcon, Mic, Paperclip, Smile, Loader2, Leaf, Sun, CloudRain, MapPin, FileText, HelpCircle, Globe, Trash2, MicOff } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import { ImageUploadPreview } from "./ImageUploadPreview";
import { FarmerSidebar } from "./FarmerSidebar";
import { FeatureCard } from "./FeatureCard";
import { Message } from "@/types/ai-assistant";
import { useAIAssistant } from "@/store/ai-assistant/useAIAssistant";
import { startRecording, stopRecording } from "@/services/ai-assistant/speechService";
import { speechService } from "@/services/ai-assistant/speechService";

// Define supported languages
const languages = [
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "bn", name: "বাংলা", flag: "🇮🇳" },
  { code: "te", name: "తెలుగు", flag: "🇮🇳" },
  { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  { code: "mr", name: "मराठी", flag: "🇮🇳" },
];

export const ChatInterface: React.FC = () => {
  const { messages, isLoading, sendMessage, error, clearChat } = useAIAssistant();
  const [inputText, setInputText] = useState("");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  
  // Speech recognition states
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [isProcessingSpeech, setIsProcessingSpeech] = useState(false);
  
  // Initialize with welcome message if no messages exist
  useEffect(() => {
    if (messages.length === 0) {
      // This will be handled by the Zustand store's initial state
    }
  }, [messages]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if ((!inputText.trim() && uploadedImages.length === 0) || isLoading) return;
    
    // Add language code to the message
    const textWithLanguage = `[LANG:${selectedLanguage.code}] ${inputText}`;
    
    // Use the Zustand store's sendMessage function
    await sendMessage(textWithLanguage, uploadedImages);
    
    // Clear input and uploaded images
    setInputText("");
    setUploadedImages([]);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedImages([...uploadedImages, ...Array.from(files)]);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleTopicSelect = (topic: string) => {
    setInputText(`Tell me about ${topic}`);
  };
  
  const handleLanguageSelect = (language: typeof languages[0]) => {
    // Clear chat when language is changed
    clearChat();
    setSelectedLanguage(language);
    setShowLanguageSelector(false);
  };
  
  const handleClearChat = () => {
    clearChat();
  };
  
  // Handle speech-to-text recording
  const handleSpeechToText = async () => {
    try {
      if (isRecording) {
        // Stop recording
        setIsRecording(false);
        setIsProcessingSpeech(true);
        
        if (mediaRecorder) {
          const audioBlob = await stopRecording(mediaRecorder);
          
          // Convert speech to text
          const transcribedText = await speechService.speechToText(audioBlob, selectedLanguage.code);
          
          // Set the transcribed text as input
          if (transcribedText) {
            setInputText(transcribedText);
          }
        }
        
        setMediaRecorder(null);
        setIsProcessingSpeech(false);
      } else {
        // Start recording
        setIsRecording(true);
        
        const recorder = await startRecording();
        setMediaRecorder(recorder);
      }
    } catch (error) {
      console.error("Error with speech recognition:", error);
      setIsRecording(false);
      setIsProcessingSpeech(false);
      setMediaRecorder(null);
      
      // Show error message to user
      alert("Could not access microphone. Please check your browser permissions.");
    }
  };
  
  // Sample feature cards for farmers based on selected language
  const getFarmerFeatures = () => {
    if (selectedLanguage.code === "hi") {
      return [
        {
          title: "फसल रोग पहचान",
          description: "अपनी फसल की फोटो अपलोड करें और रोग की पहचान करें",
          icon: "🌱",
          color: "green"
        },
        {
          title: "मौसम अलर्ट",
          description: "अपनी फसलों को प्रभावित करने वाली मौसम की स्थिति के बारे में समय पर अलर्ट प्राप्त करें",
          icon: "☁️",
          color: "blue"
        },
        {
          title: "बाजार मूल्य",
          description: "अपनी फसलों के लिए वर्तमान बाजार मूल्य जांचें और अपनी बिक्री की योजना बनाएं",
          icon: "💰",
          color: "amber"
        },
        {
          title: "सरकारी योजनाएँ",
          description: "किसानों के लिए उपलब्ध सरकारी योजनाओं और सब्सिडी के बारे में जानें",
          icon: "📋",
          color: "purple"
        }
      ];
    } else if (selectedLanguage.code === "pa") {
      return [
        {
          title: "ਫਸਲ ਰੋਗ ਪਛਾਣ",
          description: "ਆਪਣੀ ਫਸਲ ਦੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰਨ ਰੋਗ ਦੀ ਪਛਾਣ ਕਰਨ",
          icon: "🌱",
          color: "green"
        },
        {
          title: "ਮੌਸਮ ਅਲਰਟ",
          description: "ਆਪਣੀਆਂ ਫਸਲਾਂ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰਨ ਵਾਲੀ ਮੌਸਮ ਸਥਿਤੀ ਬਾਰੇ ਸਮੇਂ ਸਿਰ ਅਲਰਟ ਪ੍ਰਾਪਤ ਕਰਨ",
          icon: "☁️",
          color: "blue"
        },
        {
          title: "ਬਾਜ਼ਾਰ ਮੁੱਲ",
          description: "ਆਪਣੀਆਂ ਫਸਲਾਂ ਲਈ ਮੌਜੂਦਾ ਬਾਜ਼ਾਰ ਮੁੱਲ ਦੀ ਜਾਂਚ ਕਰਨ",
          icon: "💰",
          color: "amber"
        },
        {
          title: "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ",
          description: "ਕਿਸਾਨਾਂ ਲਈ ਉਪਲਬਧ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਅਤੇ ਸਬਸਿਡੀਆਂ ਬਾਰੇ ਜਾਣੋ",
          icon: "📋",
          color: "purple"
        }
      ];
    } else {
      // English and other languages
      return [
        {
          title: "Crop Disease Identification",
          description: "Upload photos of your crop and identify diseases",
          icon: "🌱",
          color: "green"
        },
        {
          title: "Weather Alerts",
          description: "Receive timely alerts about weather conditions affecting your crops",
          icon: "☁️",
          color: "blue"
        },
        {
          title: "Market Prices",
          description: "Check current market prices for your crops and plan your sales",
          icon: "💰",
          color: "amber"
        },
        {
          title: "Government Schemes",
          description: "Learn about government schemes and subsidies available for farmers",
          icon: "📋",
          color: "purple"
        }
      ];
    }
  };
  
  const farmerFeatures = getFarmerFeatures();
  // Sample emojis for quick access
  const quickEmojis = ["🌱", "🌾", "🌿", "🍃", "🌲", "🌳", "🌴", "🌵", "🌷", "🌸", "🌹", "🌺", "🌻", "🌼", "🍀", "🍁", "���2", "���4", "🌞", "🌧️", "☔", "❤️", "👍", "😊"];
  
  const insertEmoji = (emoji: string) => {
    setInputText(prev => prev + emoji);
    setShowEmojiPicker(false);
  };
  
  // Quick question suggestions based on selected language
  const getQuickQuestions = () => {
    if (selectedLanguage.code === "hi") {
      return [
        "मेरे क्षेत्र में गेहूं की खेती के लिए सबसे अच्छा समय क्या है?",
        "पीएम किसान योजना के लिए आवेदन कैसे करें?",
        "फसल बीमा के बारे में जानकारी दें",
        "मेरे नजदीक के कृषि केंद्र कहां हैं?"
      ];
    } else {
      return [
        "What is the best time for wheat cultivation in my region?",
        "How to apply for PM Kisan Yojana?",
        "Provide information about crop insurance",
        "Where are the agricultural centers near me?"
      ];
    }
  };
  
  const quickQuestions = getQuickQuestions();
  
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="hidden md:block border-r border-green-100 shadow-sm">
        <FarmerSidebar onTopicSelect={handleTopicSelect} />
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gradient-to-b from-green-50 to-white">
        {/* Header */}
        <div className="bg-white border-b border-green-100 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-md">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">Krishi Sahayak Assistant</h3>
                <p className="text-xs text-gray-500">Powered by AI</p>
              </div>
            </div>
            
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-green-50 hover:bg-green-100 text-green-700 transition-colors border border-green-200"
              >
                <span>{selectedLanguage.flag}</span>
                <span className="text-sm font-medium">{selectedLanguage.name}</span>
                <Globe className="h-4 w-4" />
              </button>
              
              {showLanguageSelector && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-green-100 z-50"
                >
                  <div className="py-2">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageSelect(language)}
                        className={`flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-green-50 ${
                          selectedLanguage.code === language.code ? 'bg-green-100 text-green-800' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span className="text-sm">{language.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} language={selectedLanguage.code} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="p-4 border-t border-green-100 bg-white">
          {/* Uploaded Images Preview */}
          {uploadedImages.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {uploadedImages.map((image, index) => (
                <ImageUploadPreview 
                  key={index} 
                  image={image} 
                  onRemove={() => handleRemoveImage(index)} 
                />
              ))}
            </div>
          )}
          
          {/* Input Box */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 border border-gray-200">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={selectedLanguage.code === "hi" ? "अपना संदेश यहां टाइप करें..." : "Type your message here..."}
                className="flex-1 bg-transparent border-none outline-none resize-none h-10 py-2 text-gray-800 placeholder-gray-500"
                style={{ maxHeight: "80px", minHeight: "40px" }}
              />
              
              {/* Emoji Picker Button */}
              <button 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-gray-500 hover:text-gray-700"
              >
                <Smile className="h-5 w-5" />
              </button>
              
              {/* File Upload Button */}
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-gray-500 hover:text-gray-700"
              >
                <ImageIcon className="h-5 w-5" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                multiple
              />
              
              {/* Speech-to-Text Button */}
              <button 
                onClick={handleSpeechToText}
                className={`p-2 rounded-full ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : isProcessingSpeech ? 'bg-yellow-100 text-yellow-600' : 'text-gray-500 hover:text-gray-700'}`}
                disabled={isProcessingSpeech}
              >
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
            </div>
            
            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={(!inputText.trim() && uploadedImages.length === 0) || isLoading}
              className={`p-3 rounded-full ${
                (!inputText.trim() && uploadedImages.length === 0) || isLoading
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
            
            {/* Clear Chat Button */}
            <button
              onClick={handleClearChat}
              className="p-3 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              title="Clear chat"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
          
          {/* Emoji Picker Dropdown */}
          {showEmojiPicker && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 p-2 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-wrap gap-2"
            >
              {/* Quick emojis */}
              {quickEmojis.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => insertEmoji(emoji)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-xl"
                >
                  {emoji}
                </button>
              ))}
            </motion.div>
          )}
          
          {/* Quick Questions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputText(question)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full"
              >
                {question.length > 40 ? question.substring(0, 40) + "..." : question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}