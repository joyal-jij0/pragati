"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mic,
  Image as ImageIcon,
  Paperclip,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Lightbulb,
  BarChart,
  Leaf,
  Droplet,
  Sun,
  Cloud,
  Tractor,
  Zap,
  X,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share2,
  Bookmark
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample data for chat history
const sampleChatHistory = [
  {
    id: 1,
    role: "user",
    content: "मेरे खेत में गेहूं की फसल में पीले धब्बे दिख रहे हैं। क्या यह कोई बीमारी है?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    role: "assistant",
    content: "आपके द्वारा बताए गए लक्षणों से लगता है कि यह पीला रतुआ (Yellow Rust) हो सकता है, जो गेहूं की एक सामान्य बीमारी है। इसके लक्षण पत्तियों पर पीले रंग की धारियां या धब्बे के रूप में दिखाई देते हैं।\n\nनियंत्रण के लिए निम्न उपाय कर सकते हैं:\n1. प्रोपिकोनाज़ोल 25% EC @ 0.1% का छिड़काव करें\n2. फसल की नियमित निगरानी करें\n3. रोग प्रतिरोधी किस्मों का उपयोग करें\n\nक्या आप अपनी फसल की कुछ तस्वीरें साझा कर सकते हैं ताकि मैं अधिक सटीक निदान दे सकूं?",
    timestamp: "10:32 AM",
  },
  {
    id: 3,
    role: "user",
    content: "धन्यवाद! क्या आप बता सकते हैं कि प्रोपिकोनाज़ोल कहां से मिल सकता है और इसकी कीमत क्या है?",
    timestamp: "10:35 AM",
  },
  {
    id: 4,
    role: "assistant",
    content: "प्रोपिकोनाज़ोल 25% EC आपको निम्न स्थानों से मिल सकता है:\n\n1. स्थानीय कृषि आपूर्ति केंद्र\n2. FPO के माध्यम से सामूहिक खरीद (10-15% सस्ता)\n3. ऑनलाइन कृषि इनपुट प्लेटफॉर्म\n\nवर्तमान बाजार मूल्य: ₹650-750 प्रति लीटर\n\nआपके नजदीकी FPO 'किसान उन्नति' इसे सामूहिक खरीद के माध्यम से ₹600 प्रति लीटर की दर से उपलब्ध करा रहे हैं। क्या आप उनसे संपर्क करना चाहेंगे?",
    timestamp: "10:38 AM",
  },
];

// Sample data for AI tools
const aiTools = [
  {
    id: 1,
    name: "फसल स्वास्थ्य विश्लेषक",
    icon: <Leaf className="h-5 w-5" />,
    description: "फसल की तस्वीर अपलोड करें और बीमारियों का पता लगाएं",
    usageCount: 1245,
  },
  {
    id: 2,
    name: "मौसम सलाहकार",
    icon: <Cloud className="h-5 w-5" />,
    description: "आगामी मौसम के आधार पर कृषि गतिविधियों की योजना बनाएं",
    usageCount: 980,
  },
  {
    id: 3,
    name: "मिट्टी विश्लेषक",
    icon: <Droplet className="h-5 w-5" />,
    description: "मिट्टी परीक्षण रिपोर्ट का विश्लेषण और सिफारिशें",
    usageCount: 756,
  },
  {
    id: 4,
    name: "फसल योजनाकार",
    icon: <BarChart className="h-5 w-5" />,
    description: "बाजार रुझानों के आधार पर फसल चयन में सहायता",
    usageCount: 632,
  },
  {
    id: 5,
    name: "उपकरण सलाहकार",
    icon: <Tractor className="h-5 w-5" />,
    description: "आपकी आवश्यकताओं के अनुसार कृषि उपकरण सुझाव",
    usageCount: 489,
  },
];

// Sample data for suggested prompts
const suggestedPrompts = [
  "मेरी फसल के लिए उपयुक्त उर्वरक सुझाएं",
  "इस मौसम में कौन सी फसल बोना उचित रहेगा?",
  "फसल बीमा के बारे में जानकारी दें",
  "मेरे क्षेत्र के लिए सिंचाई की सलाह दें",
  "फसल की कटाई का सही समय क्या है?",
];

const AICollaborationAssistant = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // State for chat
  const [messages, setMessages] = useState(sampleChatHistory);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedTool, setSelectedTool] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;
    
    const newUserMessage = {
      id: messages.length + 1,
      role: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, newUserMessage]);
    setInputMessage("");
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: "assistant",
        content: "मैं आपके प्रश्न पर विचार कर रहा हूं। कृपया थोड़ी देर प्रतीक्षा करें...",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // Handle voice recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording logic would go here
  };

  return (
    <div className="space-y-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">AI सहयोग सहायक</h2>
            <p className="text-gray-600 mt-1">
              कृषि संबंधी प्रश्नों के उत्तर पाएं और AI उपकरणों का उपयोग करें
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white">
              <MessageSquare className="h-4 w-4 mr-2" />
              चैट इतिहास
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Sparkles className="h-4 w-4 mr-2" />
              नया AI उपकरण
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar - AI Tools */}
          <motion.div variants={itemVariants} className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-800">AI उपकरण</h3>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  {aiTools.map((tool) => (
                    <div 
                      key={tool.id} 
                      className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                        selectedTool === tool.id 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-gray-100 hover:border-green-200 hover:bg-green-50'
                      }`}
                      onClick={() => setSelectedTool(tool.id === selectedTool ? null : tool.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                          {tool.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{tool.name}</p>
                          <p className="text-xs text-gray-500">{tool.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-gray-50 text-gray-600">
                        {tool.usageCount}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Knowledge Base */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-800">ज्ञान आधार</h3>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border border-amber-200 bg-amber-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4 text-amber-600" />
                      <h4 className="font-medium text-gray-800">रबी फसल की तैयारी</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      रबी फसलों की बुवाई के लिए अक्टूबर-नवंबर का समय उपयुक्त है। मिट्टी की तैयारी और बीज चयन महत्वपूर्ण है।
                    </p>
                    <button className="text-xs text-amber-700 font-medium">
                      और पढ़ें
                    </button>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-blue-200 bg-blue-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Cloud className="h-4 w-4 text-blue-600" />
                      <h4 className="font-medium text-gray-800">मौसम अपडेट</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      आगामी सप्ताह में हल्की बारिश की संभावना है। फसल कटाई और बुवाई की योजना बनाते समय इसे ध्यान में रखें।
                    </p>
                    <button className="text-xs text-blue-700 font-medium">
                      विस्तृत पूर्वानुमान
                    </button>
                  </div>
                  
                  <div className="p-3 rounded-lg border border-green-200 bg-green-50">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart className="h-4 w-4 text-green-600" />
                      <h4 className="font-medium text-gray-800">बाजार मूल्य</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      गेहूं: ₹2,100-2,200/क्विंटल
                      धान: ₹2,000-2,100/क्विंटल
                      सरसों: ₹5,500-5,700/क्विंटल
                    </p>
                    <button className="text-xs text-green-700 font-medium">
                      सभी फसल मूल्य
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Chat Area */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-[600px] flex flex-col">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/ai-assistant.png" />
                    <AvatarFallback className="bg-green-100 text-green-600">AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-800">कृषि AI सहायक</h3>
                    <p className="text-xs text-gray-500">ऑनलाइन</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>बुकमार्क करें</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>शेयर करें</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                          <X className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>चैट साफ करें</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="flex-grow overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'user' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="whitespace-pre-line">{message.content}</p>
                        <div 
                          className={`text-xs mt-1 ${
                            message.role === 'user' ? 'text-green-100' : 'text-gray-500'
                          }`}
                        >
                          {message.timestamp}
                        </div>
                        
                        {message.role === 'assistant' && (
                          <div className="flex items-center gap-2 mt-2">
                            <button className="text-gray-500 hover:text-gray-700">
                              <ThumbsUp className="h-3 w-3" />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                              <ThumbsDown className="h-3 w-3" />
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* Suggested Prompts */}
              <div className="px-4 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">सुझाए गए प्रश्न:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-full"
                      onClick={() => setInputMessage(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Input Area */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-10 w-10 border-gray-200"
                  >
                    <ImageIcon className="h-5 w-5 text-gray-500" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-10 w-10 border-gray-200"
                  >
                    <Paperclip className="h-5 w-5 text-gray-500" />
                  </Button>
                  <div className="flex-grow relative">
                    <Input
                      placeholder="अपना प्रश्न यहां टाइप करें..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="pr-10 border-gray-200"
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className={`absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 ${
                        isRecording ? 'text-red-500' : 'text-gray-500'
                      }`}
                      onClick={toggleRecording}
                    >
                      <Mic className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={handleSendMessage}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Featured AI Tools */}
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-medium text-gray-800">विशेष AI उपकरण</h3>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
              <span>सभी देखें</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-amber-200">
                <CardHeader className="pb-2">
                  <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-2">
                    <Sun className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">फसल स्वास्थ्य विश्लेषक</CardTitle>
                  <CardDescription>फसल की बीमारियों का पता लगाएं और उपचार पाएं</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    अपनी फसल की तस्वीर अपलोड करें और AI के माध्यम से तुरंत बीमारी का पता लगाएं, उपचार सुझाव और रोकथाम के उपाय प्राप्त करें।
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    उपयोग करें
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
                    <Cloud className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">मौसम सलाहकार</CardTitle>
                  <CardDescription>मौसम के आधार पर कृषि गतिविधियों की योजना बनाएं</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    अपने क्षेत्र के मौसम पूर्वानुमान के आधार पर सिंचाई, स्प्रेइंग, बुवाई और कटाई जैसी कृषि गतिविधियों के लिए सर्वोत्तम समय की सलाह प्राप्त करें।
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    उपयोग करें
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-green-200">
                <CardHeader className="pb-2">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                    <BarChart className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">फसल योजनाकार</CardTitle>
                  <CardDescription>बाजार रुझानों के आधार पर फसल चयन करें</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    बाजार मूल्य विश्लेषण, मौसम पूर्वानुमान और आपकी मिट्टी के प्रकार के आधार पर सबसे लाभदायक फसलों का चयन करने में सहायता प्राप्त करें।
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    उपयोग करें
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg overflow-hidden text-white p-6 md:p-8 text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-10 w-10 text-yellow-300" />
          </div>
          <h2 className="text-2xl font-bold mb-3">AI प्रीमियम सदस्यता प्राप्त करें</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            प्रीमियम सदस्यता के साथ उन्नत AI उपकरणों तक पहुंच प्राप्त करें, असीमित प्रश्न पूछें और विशेषज्ञ कृषि सलाहकारों से व्यक्तिगत सहायता पाएं।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-700 px-6 py-2.5 rounded-md text-sm font-medium hover:bg-indigo-50 transition-colors">
              योजनाएं और कीमतें
            </button>
            <button className="bg-indigo-800 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-indigo-900 transition-colors">
              7 दिन का निःशुल्क परीक्षण प्राप्त करें
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AICollaborationAssistant;