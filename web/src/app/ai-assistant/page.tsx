'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  BsRobot, BsLightningCharge, BsTranslate, BsArrowRight, 
  BsChevronDown, BsChevronUp, BsBookmark, BsBookmarkFill, 
  BsThreeDots, BsPlayFill, BsPauseFill, BsMic, BsMicFill,
  BsImage, BsSend, BsInfoCircle, BsCalendar3, BsCloudSun
} from 'react-icons/bs';
import { 
  FaUser, FaRegLightbulb, FaLeaf, FaRupeeSign, FaStore, 
  FaUsers, FaRegFileAlt, FaRegClock, FaCheck, FaSeedling
} from 'react-icons/fa';
import { 
  MdOutlineRecordVoiceOver, MdOutlineTranslate, MdOutlineSchool,
  MdOutlineWbSunny, MdBugReport, MdOutlineLocalOffer, MdOutlineWaterDrop
} from 'react-icons/md';
import { RiVoiceprintFill, RiPlantLine, RiWaterFlashLine } from 'react-icons/ri';
import { TbPlant, TbTemperature } from 'react-icons/tb';
import { HiOutlineSpeakerphone } from 'react-icons/hi';

const KrishiChatbot = () => {
  // State for active feature
  const [activeFeature, setActiveFeature] = useState('chat');
  
  // State for chat messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      content: "नमस्ते किसान साथी! मैं कृषि मित्र AI हूँ। आज मैं आपकी कैसे सहायता कर सकता हूँ? आप मौसम, फसल, बाज़ार भाव, या किसी भी कृषि संबंधित जानकारी के बारे में पूछ सकते हैं।",
      secondaryContent: "Hello farmer friend! I am Krishi Mitra AI. How can I help you today? You can ask about weather, crops, market prices, or any farming-related information.",
      timestamp: new Date().toISOString(),
      format: 'text'
    }
  ]);
  
  // State for user input
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Hindi');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isImageUploadOpen, setIsImageUploadOpen] = useState(false);
  
  // Ref for chat container to auto-scroll
  const chatContainerRef = useRef(null);
  const audioRef = useRef(null);
  
  // Languages for translation
  const languages = [
    'Hindi', 'English', 'Bengali', 'Tamil', 'Telugu', 
    'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'
  ];
  
  // Auto-scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Sample templates for quick prompts based on farmer needs
  const promptTemplates = [
    {
      id: 'weather',
      title: 'मौसम जानकारी',
      subtitle: 'Weather Information',
      prompt: 'आज और आने वाले 5 दिनों का मौसम कैसा रहेगा?',
      icon: <MdOutlineWbSunny className="text-amber-500" />
    },
    {
      id: 'pest',
      title: 'फसल रोग पहचान',
      subtitle: 'Crop Disease Identification',
      prompt: 'मेरी टमाटर की फसल पर सफेद धब्बे हैं, क्या यह बीमारी है?',
      icon: <MdBugReport className="text-red-500" />
    },
    {
      id: 'market',
      title: 'बाज़ार भाव',
      subtitle: 'Market Prices',
      prompt: 'आज के गेहूं के भाव क्या हैं?',
      icon: <FaRupeeSign className="text-green-600" />
    },
    {
      id: 'irrigation',
      title: 'सिंचाई सलाह',
      subtitle: 'Irrigation Advice',
      prompt: 'मेरी गेहूं की फसल को कितने पानी की जरूरत है?',
      icon: <RiWaterFlashLine className="text-blue-500" />
    },
    {
      id: 'fertilizer',
      title: 'उर्वरक सलाह',
      subtitle: 'Fertilizer Advice',
      prompt: 'धान की फसल के लिए कौन सा उर्वरक सबसे अच्छा है?',
      icon: <TbPlant className="text-emerald-600" />
    },
    {
      id: 'scheme',
      title: 'सरकारी योजनाएँ',
      subtitle: 'Government Schemes',
      prompt: 'किसानों के लिए नई सरकारी योजनाएँ क्या हैं?',
      icon: <FaRegFileAlt className="text-indigo-500" />
    }
  ];

  // Simulated AI response function
  const simulateResponse = (input) => {
    setIsTyping(true);
    
    // Simulate different responses based on input content
    setTimeout(() => {
      let newMessage = {
        id: messages.length + 2,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        format: 'text'
      };
      
      if (input.toLowerCase().includes('मौसम') || input.toLowerCase().includes('weather')) {
        newMessage.content = "आने वाले 5 दिनों का मौसम पूर्वानुमान इस प्रकार है:\n\n• आज: धूप, 32°C, हवा: 10 km/h\n• कल: आंशिक बादल, 30°C, हवा: 12 km/h\n• परसों: हल्की बारिश (5mm), 28°C\n• उसके बाद: बादल, 29°C\n• 5वां दिन: धूप, 31°C\n\nसलाह: कल शाम तक सिंचाई करें। परसों की बारिश का लाभ उठाएं।";
        newMessage.secondaryContent = "The 5-day weather forecast is as follows:\n\n• Today: Sunny, 32°C, Wind: 10 km/h\n• Tomorrow: Partly cloudy, 30°C, Wind: 12 km/h\n• Day after: Light rain (5mm), 28°C\n• Then: Cloudy, 29°C\n• 5th day: Sunny, 31°C\n\nAdvice: Irrigate by tomorrow evening. Take advantage of the rain the day after tomorrow.";
        newMessage.format = 'weather';
      } else if (input.toLowerCase().includes('रोग') || input.toLowerCase().includes('बीमारी') || input.toLowerCase().includes('disease')) {
        newMessage.content = "आपके विवरण के आधार पर, यह पाउडरी मिल्ड्यू (चूर्णिल फफूंदी) हो सकती है। यह एक कवक जनित रोग है जो टमाटर की फसल को प्रभावित करता है।\n\nलक्षण: पत्तियों पर सफेद पाउडर जैसे धब्बे, जो बाद में भूरे हो जाते हैं।\n\nउपचार:\n1. नीम तेल स्प्रे (5ml/लीटर पानी)\n2. हल्का पोटेशियम बाइकार्बोनेट स्प्रे\n3. गंभीर मामलों में, ट्राइफ्लोक्सीस्ट्रोबिन 25% WG @ 0.4g/लीटर का छिड़काव करें\n\nरोकथाम:\n• पौधों के बीच पर्याप्त हवा का प्रवाह सुनिश्चित करें\n• सिंचाई सुबह करें ताकि पत्तियां दिन में सूख जाएं";
        newMessage.secondaryContent = "Based on your description, this could be Powdery Mildew. It's a fungal disease that affects tomato crops.\n\nSymptoms: White powdery spots on leaves that later turn brown.\n\nTreatment:\n1. Neem oil spray (5ml/liter water)\n2. Mild potassium bicarbonate spray\n3. For severe cases, spray Trifloxystrobin 25% WG @ 0.4g/liter\n\nPrevention:\n• Ensure adequate airflow between plants\n• Irrigate in the morning so leaves dry during the day";
        newMessage.format = 'diagnosis';
      } else if (input.toLowerCase().includes('भाव') || input.toLowerCase().includes('price')) {
        newMessage.content = "आज के गेहूं के भाव (नजदीकी मंडियों में):\n\n• सोनीपत मंडी: ₹2,150/क्विंटल (0.5% ↑)\n• करनाल मंडी: ₹2,175/क्विंटल (0.2% ↑)\n• पानीपत मंडी: ₹2,140/क्विंटल (0.3% ↓)\n\nभाव पूर्वानुमान: अगले 7 दिनों में गेहूं के भाव में 2-3% की वृद्धि की संभावना है। बिक्री के लिए 5-7 दिन प्रतीक्षा करने पर विचार करें।\n\nनोट: MSP ₹2,125/क्विंटल है।";
        newMessage.secondaryContent = "Today's wheat prices (in nearby mandis):\n\n• Sonipat Mandi: ₹2,150/quintal (0.5% ↑)\n• Karnal Mandi: ₹2,175/quintal (0.2% ↑)\n• Panipat Mandi: ₹2,140/quintal (0.3% ↓)\n\nPrice Forecast: Wheat prices are likely to increase by 2-3% in the next 7 days. Consider waiting 5-7 days for selling.\n\nNote: MSP is ₹2,125/quintal.";
        newMessage.format = 'market';
      } else if (input.toLowerCase().includes('सिंचाई') || input.toLowerCase().includes('पानी') || input.toLowerCase().includes('irrigation')) {
        newMessage.content = "गेहूं की फसल के लिए सिंचाई सलाह:\n\n• वर्तमान चरण (फूल आना): यह महत्वपूर्ण चरण है, पर्याप्त नमी सुनिश्चित करें\n• आवश्यकता: 50-60mm पानी प्रति सिंचाई\n• अनुशंसित समय: सुबह या शाम (दोपहर में नहीं)\n\nआपके क्षेत्र में कल हल्की बारिश (5mm) का पूर्वानुमान है। यदि बारिश 10mm से कम है, तो परसों सिंचाई करें।\n\nध्यान दें: अत्यधिक सिंचाई से रोग का खतरा बढ़ सकता है।";
        newMessage.secondaryContent = "Irrigation advice for wheat crop:\n\n• Current stage (Flowering): This is a critical stage, ensure adequate moisture\n• Requirement: 50-60mm water per irrigation\n• Recommended time: Morning or evening (not afternoon)\n\nLight rain (5mm) is forecasted in your area tomorrow. If rainfall is less than 10mm, irrigate the day after tomorrow.\n\nNote: Excessive irrigation can increase disease risk.";
        newMessage.format = 'advice';
      } else {
        newMessage.content = "मुझे आपका प्रश्न समझने में कठिनाई हो रही है। कृपया निम्न में से किसी विषय पर अधिक जानकारी के लिए पूछें:\n\n• मौसम पूर्वानुमान\n• फसल रोग और कीट\n• बाज़ार भाव\n• सिंचाई सलाह\n• उर्वरक अनुशंसा\n• सरकारी योजनाएँ\n\nया आप अपना प्रश्न दूसरे तरीके से पूछ सकते हैं।";
        newMessage.secondaryContent = "I'm having difficulty understanding your question. Please ask for more information on any of these topics:\n\n• Weather forecast\n• Crop diseases and pests\n• Market prices\n• Irrigation advice\n• Fertilizer recommendations\n• Government schemes\n\nOr you can try rephrasing your question.";
      }
      
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'user',
        content: input,
        timestamp: new Date().toISOString(),
        format: 'text'
      }, newMessage]);
      
      setIsTyping(false);
      setUserInput('');
    }, 1500);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;
    simulateResponse(userInput);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTemplateClick = (template) => {
    setActiveTemplate(template.id);
    setUserInput(template.prompt);
    simulateResponse(template.prompt);
  };

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Simulate voice recording
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setUserInput('मेरी गेहूं की फसल को कितने पानी की जरूरत है?');
        simulateResponse('मेरी गेहूं की फसल को कितने पानी की जरूरत है?');
      }, 3000);
    }
  };

  const toggleImageUpload = () => {
    setIsImageUploadOpen(!isImageUploadOpen);
  };

  const playAudio = (messageId) => {
    setIsPlaying(true);
    setCurrentAudio(messageId);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
      setCurrentAudio(null);
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-900 text-white py-6 mt-22 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center">
            <BsRobot className="mr-3 h-8 w-8" />
            कृषि मित्र AI (Krishi Mitra AI)
          </h1>
          <p className="mt-2 text-emerald-100 max-w-3xl">
            आपका व्यक्तिगत कृषि सहायक - मौसम, फसल, बाज़ार और अधिक जानकारी के लिए पूछें
            <span className="hidden md:inline"> | Your personal farming assistant - Ask about weather, crops, markets and more</span>
          </p>
        </div>
      </div>

      <div className="flex-grow container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Features */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                <BsLightningCharge className="mr-2 text-emerald-600" />
                सहायता विकल्प (Help Options)
              </h3>
              
              <div className="space-y-2 mt-4">
                <button 
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center ${activeFeature === 'chat' ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-50 text-gray-700'}`}
                  onClick={() => setActiveFeature('chat')}
                >
                  <BsRobot className={`mr-3 ${activeFeature === 'chat' ? 'text-emerald-600' : 'text-gray-500'}`} />
                  <div>
                    <div className="font-medium">AI चैटबॉट</div>
                    <div className="text-xs text-gray-500">AI Chatbot</div>
                  </div>
                </button>
                
                <button 
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center ${activeFeature === 'voice' ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-50 text-gray-700'}`}
                  onClick={() => setActiveFeature('voice')}
                >
                  <MdOutlineRecordVoiceOver className={`mr-3 ${activeFeature === 'voice' ? 'text-emerald-600' : 'text-gray-500'}`} />
                  <div>
                    <div className="font-medium">आवाज सहायता</div>
                    <div className="text-xs text-gray-500">Voice Assistance</div>
                  </div>
                </button>
                
                <button 
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center ${activeFeature === 'image' ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-50 text-gray-700'}`}
                  onClick={() => setActiveFeature('image')}
                >
                  <BsImage className={`mr-3 ${activeFeature === 'image' ? 'text-emerald-600' : 'text-gray-500'}`} />
                  <div>
                    <div className="font-medium">फसल छवि विश्लेषण</div>
                    <div className="text-xs text-gray-500">Crop Image Analysis</div>
                  </div>
                </button>
                
                <button 
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center ${activeFeature === 'recommend' ? 'bg-emerald-50 text-emerald-700' : 'hover:bg-gray-50 text-gray-700'}`}
                  onClick={() => setActiveFeature('recommend')}
                >
                  <FaRegLightbulb className={`mr-3 ${activeFeature === 'recommend' ? 'text-emerald-600' : 'text-gray-500'}`} />
                  <div>
                    <div className="font-medium">स्मार्ट अनुशंसाएँ</div>
                    <div className="text-xs text-gray-500">Smart Recommendations</div>
                  </div>
                </button>
              </div>
              
              <div className="mt-6 pt-5 border-t border-gray-100">
                <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                  <MdOutlineTranslate className="mr-2 text-emerald-600" />
                  भाषा (Language)
                </h3>
                
                <div className="relative">
                  <button 
                    className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg text-gray-700 hover:border-emerald-300"
                    onClick={toggleLanguageDropdown}
                  >
                    <span>{selectedLanguage}</span>
                    {showLanguageDropdown ? <BsChevronUp /> : <BsChevronDown />}
                  </button>
                  
                  {showLanguageDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {languages.map((language) => (
                        <button
                          key={language}
                          className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${selectedLanguage === language ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'}`}
                          onClick={() => selectLanguage(language)}
                        >
                          {language}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 pt-5 border-t border-gray-100">
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                  <h3 className="font-medium text-emerald-800 flex items-center">
                    <BsInfoCircle className="mr-2 text-emerald-600" />
                    सहायता टिप्स
                  </h3>
                  <p className="mt-2 text-sm text-emerald-700">
                    आप अपनी भाषा में प्रश्न पूछ सकते हैं। आवाज़ बटन का उपयोग करके बोलकर भी पूछ सकते हैं।
                  </p>
                  <p className="mt-2 text-xs text-emerald-600">
                    You can ask questions in your language. You can also speak using the voice button.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[calc(100vh-180px)]">
              {/* Chat Header */}
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <BsRobot className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-800">कृषि मित्र AI</h3>
                    <p className="text-xs text-gray-500">Krishi Mitra AI</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-gray-50 rounded-full">
                    <BsThreeDots className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div 
                className="flex-grow overflow-y-auto p-4 space-y-4"
                ref={chatContainerRef}
              >
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl p-3 ${
                        message.sender === 'user' 
                          ? 'bg-emerald-600 text-white rounded-tr-none' 
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      {message.sender === 'ai' && (
                        <div className="flex items-center mb-1.5">
                          <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-2">
                            <BsRobot className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-xs font-medium text-emerald-800">कृषि मित्र AI</span>
                        </div>
                      )}
                      
                      {message.format === 'weather' ? (
                        <div>
                          <div className="mb-2 font-medium">मौसम पूर्वानुमान (Weather Forecast)</div>
                          <div className="bg-white rounded-lg p-3 mb-2">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <MdOutlineWbSunny className="h-8 w-8 text-amber-500 mr-2" />
                                <div>
                                  <div className="font-medium">आज</div>
                                  <div className="text-xs text-gray-500">Today</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">32°C</div>
                                <div className="text-xs text-gray-500">धूप (Sunny)</div>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2 mt-2">
                              <div className="text-center p-2 bg-gray-50 rounded">
                                <div className="text-xs text-gray-500">कल</div>
                                <MdOutlineWbSunny className="h-5 w-5 mx-auto text-amber-400" />
                                <div className="text-sm font-medium">30°C</div>
                              </div>
                              <div className="text-center p-2 bg-gray-50 rounded">
                                <div className="text-xs text-gray-500">परसों</div>
                                <BsCloudSun className="h-5 w-5 mx-auto text-blue-400" />
                                <div className="text-sm font-medium">28°C</div>
                              </div>
                              <div className="text-center p-2 bg-gray-50 rounded">
                                <div className="text-xs text-gray-500">दिन 4</div>
                                <BsCloudSun className="h-5 w-5 mx-auto text-gray-400" />
                                <div className="text-sm font-medium">29°C</div>
                              </div>
                              <div className="text-center p-2 bg-gray-50 rounded">
                                <div className="text-xs text-gray-500">दिन 5</div>
                                <MdOutlineWbSunny className="h-5 w-5 mx-auto text-amber-500" />
                                <div className="text-sm font-medium">31°C</div>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm">{message.content.split('\n\n')[1]}</p>
                        </div>
                      ) : message.format === 'diagnosis' ? (
                        <div>
                          <div className="mb-2 font-medium">फसल रोग निदान (Crop Disease Diagnosis)</div>
                          <div className="bg-white rounded-lg p-3 mb-2">
                            <div className="flex items-center mb-2">
                              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                                <MdBugReport className="h-6 w-6" />
                                </div>
                              <div>
                                <div className="font-medium">पाउडरी मिल्ड्यू (चूर्णिल फफूंदी)</div>
                                <div className="text-xs text-gray-500">Powdery Mildew</div>
                              </div>
                            </div>
                            <div className="mt-2 space-y-2">
                              <div className="bg-red-50 p-2 rounded-md">
                                <div className="text-xs font-medium text-red-700">लक्षण (Symptoms):</div>
                                <div className="text-sm text-red-800">पत्तियों पर सफेद पाउडर जैसे धब्बे, जो बाद में भूरे हो जाते हैं।</div>
                              </div>
                              <div className="bg-emerald-50 p-2 rounded-md">
                                <div className="text-xs font-medium text-emerald-700">उपचार (Treatment):</div>
                                <ul className="text-sm text-emerald-800 list-disc pl-4">
                                  <li>नीम तेल स्प्रे (5ml/लीटर पानी)</li>
                                  <li>हल्का पोटेशियम बाइकार्बोनेट स्प्रे</li>
                                  <li>गंभीर मामलों में, ट्राइफ्लोक्सीस्ट्रोबिन 25% WG @ 0.4g/लीटर का छिड़काव करें</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm mt-2">
                            <span className="font-medium">रोकथाम (Prevention):</span><br />
                            • पौधों के बीच पर्याप्त हवा का प्रवाह सुनिश्चित करें<br />
                            • सिंचाई सुबह करें ताकि पत्तियां दिन में सूख जाएं
                          </p>
                        </div>
                      ) : message.format === 'market' ? (
                        <div>
                          <div className="mb-2 font-medium">बाज़ार भाव (Market Prices)</div>
                          <div className="bg-white rounded-lg p-3 mb-2">
                            <div className="flex items-center mb-3">
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                                <FaRupeeSign className="h-5 w-5" />
                              </div>
                              <div>
                                <div className="font-medium">गेहूं के भाव</div>
                                <div className="text-xs text-gray-500">Wheat Prices</div>
                              </div>
                            </div>
                            <div className="space-y-2 mt-2">
                              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                <div className="text-sm">सोनीपत मंडी</div>
                                <div className="flex items-center">
                                  <span className="font-medium">₹2,150/क्विंटल</span>
                                  <span className="ml-2 text-xs text-emerald-600">0.5% ↑</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                <div className="text-sm">करनाल मंडी</div>
                                <div className="flex items-center">
                                  <span className="font-medium">₹2,175/क्विंटल</span>
                                  <span className="ml-2 text-xs text-emerald-600">0.2% ↑</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                                <div className="text-sm">पानीपत मंडी</div>
                                <div className="flex items-center">
                                  <span className="font-medium">₹2,140/क्विंटल</span>
                                  <span className="ml-2 text-xs text-red-500">0.3% ↓</span>
                                </div>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-amber-50 rounded-md">
                                <div className="text-sm font-medium text-amber-800">MSP</div>
                                <div className="font-medium text-amber-800">₹2,125/क्विंटल</div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-blue-50 p-2 rounded-md mb-2">
                            <div className="text-xs font-medium text-blue-700">भाव पूर्वानुमान (Price Forecast):</div>
                            <div className="text-sm text-blue-800">अगले 7 दिनों में गेहूं के भाव में 2-3% की वृद्धि की संभावना है। बिक्री के लिए 5-7 दिन प्रतीक्षा करने पर विचार करें।</div>
                          </div>
                        </div>
                      ) : message.format === 'advice' ? (
                        <div>
                          <div className="mb-2 font-medium">सिंचाई सलाह (Irrigation Advice)</div>
                          <div className="bg-white rounded-lg p-3 mb-2">
                            <div className="flex items-center mb-3">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                <MdOutlineWaterDrop className="h-6 w-6" />
                              </div>
                              <div>
                                <div className="font-medium">गेहूं की फसल के लिए सिंचाई</div>
                                <div className="text-xs text-gray-500">Wheat Crop Irrigation</div>
                              </div>
                            </div>
                            <div className="space-y-2 mt-2">
                              <div className="flex items-start p-2 bg-blue-50 rounded-md">
                                <div className="flex-shrink-0 w-24 text-xs font-medium text-blue-700">वर्तमान चरण:</div>
                                <div className="text-sm text-blue-800">फूल आना (महत्वपूर्ण चरण, पर्याप्त नमी सुनिश्चित करें)</div>
                              </div>
                              <div className="flex items-start p-2 bg-blue-50 rounded-md">
                                <div className="flex-shrink-0 w-24 text-xs font-medium text-blue-700">आवश्यकता:</div>
                                <div className="text-sm text-blue-800">50-60mm पानी प्रति सिंचाई</div>
                              </div>
                              <div className="flex items-start p-2 bg-blue-50 rounded-md">
                                <div className="flex-shrink-0 w-24 text-xs font-medium text-blue-700">अनुशंसित समय:</div>
                                <div className="text-sm text-blue-800">सुबह या शाम (दोपहर में नहीं)</div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-amber-50 p-2 rounded-md mb-2">
                            <div className="text-xs font-medium text-amber-700">मौसम अलर्ट (Weather Alert):</div>
                            <div className="text-sm text-amber-800">आपके क्षेत्र में कल हल्की बारिश (5mm) का पूर्वानुमान है। यदि बारिश 10mm से कम है, तो परसों सिंचाई करें।</div>
                          </div>
                          <div className="mt-2 text-xs text-red-600">
                            <span className="font-medium">ध्यान दें:</span> अत्यधिक सिंचाई से रोग का खतरा बढ़ सकता है।
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="whitespace-pre-line">{message.content}</p>
                          {message.secondaryContent && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <p className="text-xs text-gray-500 whitespace-pre-line">{message.secondaryContent}</p>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {message.sender === 'ai' && (
                        <div className="mt-2 pt-2 border-t border-gray-200 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button 
                              className="text-gray-400 hover:text-emerald-600"
                              onClick={() => playAudio(message.id)}
                            >
                              {isPlaying && currentAudio === message.id ? (
                                <BsPauseFill className="h-4 w-4" />
                              ) : (
                                <BsPlayFill className="h-4 w-4" />
                              )}
                            </button>
                            <button className="text-gray-400 hover:text-emerald-600">
                              <BsBookmark className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl p-3 bg-gray-100 text-gray-800 rounded-tl-none">
                      <div className="flex items-center space-x-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Chat Input */}
              <div className="p-3 border-t border-gray-100">
                {isImageUploadOpen && (
                  <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-700">फसल की छवि अपलोड करें</h4>
                      <button 
                        className="text-gray-400 hover:text-gray-600"
                        onClick={toggleImageUpload}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <BsImage className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">फसल की छवि खींचें और यहां छोड़ें या फ़ाइल चुनें</p>
                      <button className="mt-2 px-3 py-1.5 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700">
                        फ़ाइल चुनें
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="flex items-end gap-2">
                  <button 
                    className={`p-2 rounded-full ${isRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    onClick={toggleRecording}
                  >
                    {isRecording ? <BsMicFill className="h-5 w-5" /> : <BsMic className="h-5 w-5" />}
                  </button>
                  
                  <button 
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                    onClick={toggleImageUpload}
                  >
                    <BsImage className="h-5 w-5" />
                  </button>
                  
                  <div className="flex-grow relative">
                    <textarea
                      className="w-full border border-gray-200 rounded-lg pl-3 pr-10 py-2 focus:outline-none focus:border-emerald-300 resize-none"
                      placeholder={`${selectedLanguage === 'Hindi' ? 'अपना प्रश्न यहां टाइप करें...' : 'Type your question here...'}`}
                      rows={1}
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      style={{ minHeight: '44px', maxHeight: '120px' }}
                    />
                    {userInput.trim() !== '' && (
                      <button 
                        className="absolute right-2 bottom-2 p-1 rounded-full bg-emerald-600 text-white"
                        onClick={handleSendMessage}
                      >
                        <BsSend className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Quick Prompt Templates */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {promptTemplates.map((template) => (
                    <button
                      key={template.id}
                      className={`flex items-center px-3 py-1.5 rounded-full text-xs border ${
                        activeTemplate === template.id
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => handleTemplateClick(template)}
                    >
                      {template.icon}
                      <span className="ml-1.5">{template.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Sidebar - Context & Recommendations */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                <FaRegLightbulb className="mr-2 text-emerald-600" />
                स्मार्ट अनुशंसाएँ (Smart Recommendations)
              </h3>
              
              <div className="space-y-3 mt-4">
                <div className="p-3 rounded-lg border border-gray-100 hover:border-emerald-100 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <MdOutlineWaterDrop className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">सिंचाई अनुसूची</h4>
                      <p className="text-xs text-gray-500">Irrigation Schedule</p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-600">
                    आपकी गेहूं की फसल के लिए अगली सिंचाई 23 अगस्त को करने की सलाह दी जाती है।
                  </p>
                  <div className="mt-2 flex justify-end">
                    <button className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center">
                      विवरण देखें <BsArrowRight className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg border border-gray-100 hover:border-emerald-100 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <FaRupeeSign className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">बाज़ार अवसर</h4>
                      <p className="text-xs text-gray-500">Market Opportunity</p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-600">
                    गेहूं के भाव में वृद्धि की संभावना है। बिक्री के लिए 5-7 दिन प्रतीक्षा करने पर विचार करें।
                  </p>
                  <div className="mt-2 flex justify-end">
                    <button className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center">
                      विवरण देखें <BsArrowRight className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg border border-gray-100 hover:border-emerald-100 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      <MdBugReport className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-800">कीट चेतावनी</h4>
                      <p className="text-xs text-gray-500">Pest Alert</p>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-600">
                    आपके क्षेत्र में एफिड्स (माहू) का प्रकोप देखा गया है। अपनी फसल की जांच करें।
                  </p>
                  <div className="mt-2 flex justify-end">
                    <button className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center">
                      विवरण देखें <BsArrowRight className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-5 border-t border-gray-100">
                <h3 className="font-medium text-gray-800 mb-3 flex items-center">
                  <FaRegClock className="mr-2 text-emerald-600" />
                  हाल की बातचीत (Recent Conversations)
                </h3>
                
                <div className="space-y-2 mt-3">
                  <button className="w-full text-left p-2 rounded-lg hover:bg-gray-50 flex items-center">
                    <div className="h-7 w-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-2">
                      <MdOutlineWbSunny className="h-4 w-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-sm font-medium text-gray-800 truncate">मौसम पूर्वानुमान</div>
                      <div className="text-xs text-gray-500 truncate">2 घंटे पहले</div>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-2 rounded-lg hover:bg-gray-50 flex items-center">
                    <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                      <MdOutlineWaterDrop className="h-4 w-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-sm font-medium text-gray-800 truncate">सिंचाई सलाह</div>
                      <div className="text-xs text-gray-500 truncate">1 दिन पहले</div>
                    </div>
                  </button>
                  
                  <button className="w-full text-left p-2 rounded-lg hover:bg-gray-50 flex items-center">
                    <div className="h-7 w-7 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-2">
                      <FaRupeeSign className="h-4 w-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-sm font-medium text-gray-800 truncate">गेहूं के भाव</div>
                      <div className="text-xs text-gray-500 truncate">3 दिन पहले</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KrishiChatbot;