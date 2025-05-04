'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Bot,
  Send,
  Mic,
  Image as ImageIcon,
  Loader2,
  ChevronDown,
  X,
  ChevronRight,
  MessageSquare,
  Settings,
  Save,
  Download,
  CheckCircle2,
  Info,
  Camera,
  Leaf,
  Sun,
  CloudRain,
  Tractor,
  Droplets,
  Sprout,
  Wheat,
  Users,
} from 'lucide-react'
import { ChatInterface } from '@/components/ai-assistant/ChatInterface'
import { FeatureCard } from '@/components/ai-assistant/FeatureCard'
import { useAIAssistant } from '@/store/ai-assistant/useAIAssistant'
// import DashboardHeader from "@/components/DashboardHeader";
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import HeroSection from '@/components/HeroSection'

export default function AIAssistantPage() {
  const { messages, isLoading } = useAIAssistant()
  const [showFeatures, setShowFeatures] = useState(true)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  }

  // Hide features when chat starts
  useEffect(() => {
    if (messages.length > 0) {
      setShowFeatures(false)
    }
  }, [messages])

  // Sample success stories data
  const successStories = {
    title: 'सफलता की कहानियां',
    viewAllText: 'सभी देखें',
    stories: [
      {
        tag: 'फसल अनुशंसा',
        tagBg: 'bg-green-100',
        tagText: 'text-green-800',
        title: 'गेहूं की उपज 30% बढ़ी',
        description:
          'AI सहायक ने इष्टतम बुवाई समय और उर्वरक अनुप्रयोग की सिफारिश की, जिससे उपज में महत्वपूर्ण सुधार हुआ।',
        date: '2 सप्ताह पहले',
        readMoreText: 'और पढ़ें',
        buttonText: 'text-green-600',
        gradient: 'from-green-50 to-green-100',
        border: 'border-green-200',
        icon: '🌾',
      },
      {
        tag: 'रोग पहचान',
        tagBg: 'bg-amber-100',
        tagText: 'text-amber-800',
        title: 'आलू की फसल को अर्ली ब्लाइट से बचाया',
        description:
          'किसान ने AI छवि पहचान का उपयोग करके अर्ली ब्लाइट की पहचान की और व्यापक क्षति से पहले उपचार लागू किया।',
        date: '1 महीने पहले',
        readMoreText: 'और पढ़ें',
        buttonText: 'text-amber-600',
        gradient: 'from-amber-50 to-amber-100',
        border: 'border-amber-200',
        icon: '🥔',
      },
      {
        tag: 'बाजार अंतर्दृष्टि',
        tagBg: 'bg-blue-100',
        tagText: 'text-blue-800',
        title: 'इष्टतम बिक्री समय से लाभ बढ़ा',
        description:
          'मूल्य भविष्यवाणी ने किसान को बाजार में प्रवेश के समय का अनुमान लगाने में मदद की, जिससे उनकी उपज के लिए 25% अधिक बिक्री मूल्य मिला।',
        date: '3 महीने पहले',
        readMoreText: 'और पढ़ें',
        buttonText: 'text-blue-600',
        gradient: 'from-blue-50 to-blue-100',
        border: 'border-blue-200',
        icon: '📈',
      },
    ],
  }

  // Seasonal farming tips
  const seasonalTips = {
    title: 'मौसमी खेती के टिप्स',
    tips: [
      {
        title: 'रबी फसलों के लिए मिट्टी की तैयारी',
        description:
          'अपनी मिट्टी को रबी फसलों के लिए कैसे तैयार करें, इसके बारे में जानें',
        icon: '🌱',
        color: 'green',
      },
      {
        title: 'जल प्रबंधन तकनीक',
        description:
          'सूखे के मौसम में पानी के कुशल उपयोग के लिए सिंचाई रणनीतियां',
        icon: '💧',
        color: 'blue',
      },
      {
        title: 'जैविक कीट नियंत्रण',
        description:
          'रासायनिक कीटनाशकों के बिना कीटों से निपटने के प्राकृतिक तरीके',
        icon: '🐞',
        color: 'amber',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50">
      <div className="px-4 pb-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Hero Section */}

          <HeroSection
            title="Krishi Sahayak"
            secondaryTitle="AI"
            info="Your Intelligent Farming Companion"
            badges={['95% Accuracy', '100+ Diseases', '50+ Crops']}
            floatingIcon="🧑‍🌾"
          />

          {/* Main Chat Interface */}
          <motion.div variants={itemVariants}>
            <ChatInterface />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
