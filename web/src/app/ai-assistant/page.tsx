"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Bot, Send, Mic, Image as ImageIcon, 
  Loader2, ChevronDown, X, ChevronRight,
  MessageSquare, Settings, Save, Download,
  CheckCircle2, Info, Camera, Leaf, Sun, CloudRain,
  Tractor, Droplets, Sprout, Wheat, Users,
} from "lucide-react";
import { ChatInterface } from "@/components/ai-assistant/ChatInterface";
import { FeatureCard } from "@/components/ai-assistant/FeatureCard";
import { useAIAssistant } from "@/store/ai-assistant/useAIAssistant";
import DashboardHeader from "@/components/DashboardHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AIAssistantPage() {
  const { messages, isLoading } = useAIAssistant();
  const [showFeatures, setShowFeatures] = useState(true);

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

  // Hide features when chat starts
  useEffect(() => {
    if (messages.length > 0) {
      setShowFeatures(false);
    }
  }, [messages]);

  // Sample success stories data
  const successStories = {
    title: "सफलता की कहानियां",
    viewAllText: "सभी देखें",
    stories: [
      {
        tag: "फसल अनुशंसा",
        tagBg: "bg-green-100",
        tagText: "text-green-800",
        title: "गेहूं की उपज 30% बढ़ी",
        description: "AI सहायक ने इष्टतम बुवाई समय और उर्वरक अनुप्रयोग की सिफारिश की, जिससे उपज में महत्वपूर्ण सुधार हुआ।",
        date: "2 सप्ताह पहले",
        readMoreText: "और पढ़ें",
        buttonText: "text-green-600",
        gradient: "from-green-50 to-green-100",
        border: "border-green-200",
        icon: "🌾"
      },
      {
        tag: "रोग पहचान",
        tagBg: "bg-amber-100",
        tagText: "text-amber-800",
        title: "आलू की फसल को अर्ली ब्लाइट से बचाया",
        description: "किसान ने AI छवि पहचान का उपयोग करके अर्ली ब्लाइट की पहचान की और व्यापक क्षति से पहले उपचार लागू किया।",
        date: "1 महीने पहले",
        readMoreText: "और पढ़ें",
        buttonText: "text-amber-600",
        gradient: "from-amber-50 to-amber-100",
        border: "border-amber-200",
        icon: "🥔"
      },
      {
        tag: "बाजार अंतर्दृष्टि",
        tagBg: "bg-blue-100",
        tagText: "text-blue-800",
        title: "इष्टतम बिक्री समय से लाभ बढ़ा",
        description: "मूल्य भविष्यवाणी ने किसान को बाजार में प्रवेश के समय का अनुमान लगाने में मदद की, जिससे उनकी उपज के लिए 25% अधिक बिक्री मूल्य मिला।",
        date: "3 महीने पहले",
        readMoreText: "और पढ़ें",
        buttonText: "text-blue-600",
        gradient: "from-blue-50 to-blue-100",
        border: "border-blue-200",
        icon: "📈"
      }
    ]
  };

  // Seasonal farming tips
  const seasonalTips = {
    title: "मौसमी खेती के टिप्स",
    tips: [
      {
        title: "रबी फसलों के लिए मिट्टी की तैयारी",
        description: "अपनी मिट्टी को रबी फसलों के लिए कैसे तैयार करें, इसके बारे में जानें",
        icon: "🌱",
        color: "green"
      },
      {
        title: "जल प्रबंधन तकनीक",
        description: "सूखे के मौसम में पानी के कुशल उपयोग के लिए सिंचाई रणनीतियां",
        icon: "💧",
        color: "blue"
      },
      {
        title: "जैविक कीट नियंत्रण",
        description: "रासायनिक कीटनाशकों के बिना कीटों से निपटने के प्राकृतिक तरीके",
        icon: "🐞",
        color: "amber"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      <DashboardHeader
        title="कृषि AI सहायक"
        subtitle="आपका बुद्धिमान खेती साथी"
        icon={<Leaf className="h-6 w-6 text-green-600" />}
      />

      <div className="container mx-auto px-4 py-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Hero Section */}
          <motion.div 
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-green-500 text-white mb-10"
            variants={itemVariants}
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/20"></div>
              <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-white/20"></div>
              <div className="grid grid-cols-10 grid-rows-10 gap-1 h-full w-full">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className="bg-white/5 rounded-sm"></div>
                ))}
              </div>
            </div>
            
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  कृषि AI सहायक <span className="text-green-200">Groq</span>
                </h1>
                <p className="text-xl text-green-100 mb-6 max-w-2xl">
                  व्यक्तिगत सिफारिशें और अंतर्दृष्टि प्रदान करने के लिए उन्नत AI द्वारा संचालित आपका बुद्धिमान खेती साथी
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <Badge className="bg-white/20 border-none text-white px-3 py-1 text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    <span>तत्काल प्रतिक्रिया</span>
                  </Badge>
                  <Badge className="bg-white/20 border-none text-white px-3 py-1 text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    <span>बहुभाषी समर्थन</span>
                  </Badge>
                  <Badge className="bg-white/20 border-none text-white px-3 py-1 text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    <span>छवि विश्लेषण</span>
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-green-100">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    <span>चैट शुरू करें</span>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                    <Info className="h-5 w-5 mr-2" />
                    <span>कैसे काम करता है</span>
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/3 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-pulse"></div>
                  <div className="absolute inset-4 bg-white rounded-full opacity-30"></div>
                  <div className="absolute inset-8 bg-white rounded-full opacity-40"></div>
                  <div className="relative h-48 w-48 flex items-center justify-center">
                    <motion.div
                      animate={{ 
                        rotate: [0, 5, 0, -5, 0],
                        y: [0, -5, 0, 5, 0]
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                      className="text-7xl"
                    >
                      🧑‍🌾
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Chat Interface */}
          <motion.div variants={itemVariants}>
            <ChatInterface />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}