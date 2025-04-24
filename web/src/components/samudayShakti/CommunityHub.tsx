"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Search,
  Calendar,
  MessageCircle,
  Users,
  ThumbsUp,
  MessageSquare,
  MapPin,
  Share2,
  Image,
  FileText,
  Video,
  Bell,
  User,
  Bookmark
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

// Sample data for community posts
const communityPosts = [
  {
    id: 1,
    author: {
      name: "रामवीर सिंह",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      role: "किसान, सोनीपत FPO",
    },
    content: "मेरे खेत में इस बार गेहूं की फसल में कुछ कीड़े दिखाई दे रहे हैं। क्या कोई इसके बारे में जानता है और क्या उपाय करना चाहिए?",
    images: ["https://images.unsplash.com/photo-1574323347407-f5e1c5a1ec21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"],
    timestamp: "2 घंटे पहले",
    likes: 12,
    comments: 8,
    shares: 3,
    tags: ["गेहूं", "कीट नियंत्रण", "फसल सुरक्षा"],
  },
  {
    id: 2,
    author: {
      name: "कृषि विज्ञान केंद्र, करनाल",
      avatar: "https://randomuser.me/api/portraits/men/85.jpg",
      role: "आधिकारिक संस्था",
    },
    content: "आगामी 20 अक्टूबर को हम 'जैविक खेती और मिट्टी स्वास्थ्य' पर एक कार्यशाला आयोजित कर रहे हैं। सभी किसान भाई-बहन आमंत्रित हैं। प्रवेश निःशुल्क है।",
    images: ["https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"],
    timestamp: "1 दिन पहले",
    likes: 45,
    comments: 12,
    shares: 28,
    tags: ["कार्यशाला", "जैविक खेती", "मिट्टी स्वास्थ्य"],
  },
  {
    id: 3,
    author: {
      name: "सुनीता देवी",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      role: "किसान, भरतपुर FPO",
    },
    content: "हमारे FPO ने पिछले महीने सामूहिक बिक्री के माध्यम से सरसों का अच्छा मूल्य प्राप्त किया। मंडी से 15% अधिक मिला। सभी सदस्य बहुत खुश हैं। अगली बार और भी अधिक किसान जुड़ेंगे।",
    images: [],
    timestamp: "2 दिन पहले",
    likes: 38,
    comments: 7,
    shares: 5,
    tags: ["सामूहिक बिक्री", "सरसों", "FPO सफलता"],
  },
];

// Sample data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "जैविक खेती कार्यशाला",
    date: "20 अक्टूबर, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "कृषि विज्ञान केंद्र, करनाल",
    organizer: "कृषि विज्ञान केंद्र",
    participants: 45,
  },
  {
    id: 2,
    title: "FPO सदस्य बैठक",
    date: "25 अक्टूबर, 2023",
    time: "2:00 PM - 5:00 PM",
    location: "किसान भवन, सोनीपत",
    organizer: "किसान उन्नति FPO",
    participants: 28,
  },
];

// Sample data for trending topics
const trendingTopics = [
  { id: 1, name: "रबी फसल तैयारी", posts: 120 },
  { id: 2, name: "जैविक खेती", posts: 85 },
  { id: 3, name: "फसल बीमा", posts: 72 },
  { id: 4, name: "सिंचाई तकनीक", posts: 64 },
  { id: 5, name: "मौसम अपडेट", posts: 58 },
];

const CommunityHub = () => {
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

  // State for post input
  const [postContent, setPostContent] = useState("");

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
            <h2 className="text-2xl font-bold text-gray-800">समुदाय हब</h2>
            <p className="text-gray-600 mt-1">
              अपने समुदाय के साथ जुड़ें, ज्ञान साझा करें और सहयोग करें
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white">
              <Bell className="h-4 w-4 mr-2" />
              सूचनाएं
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              समूह बनाएं
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <motion.div variants={itemVariants} className="md:col-span-1 space-y-6">
            {/* User Profile Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-green-600 h-24 relative">
                <div className="absolute -bottom-10 left-6">
                  <Avatar className="h-20 w-20 border-4 border-white">
                    <AvatarImage src="https://randomuser.me/api/portraits/men/42.jpg" />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="pt-12 pb-6 px-6">
                <h3 className="font-medium text-gray-800">राजेश कुमार</h3>
                <p className="text-sm text-gray-500">किसान, सोनीपत FPO</p>
                
                <div className="mt-4 flex justify-between text-center">
                  <div>
                    <p className="text-lg font-bold text-gray-800">24</p>
                    <p className="text-xs text-gray-500">पोस्ट</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-800">156</p>
                    <p className="text-xs text-gray-500">कनेक्शन</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-800">12</p>
                    <p className="text-xs text-gray-500">समूह</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" className="w-full border-gray-200">
                    <User className="h-4 w-4 mr-2" />
                    प्रोफाइल देखें
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Upcoming Events */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-medium text-gray-800">आगामी कार्यक्रम</h3>
                <button className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                  <span>सभी देखें</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border border-gray-100 rounded-lg p-4 hover:border-green-200 transition-colors">
                      <h4 className="font-medium text-gray-800 mb-2">{event.title}</h4>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span>{event.date}, {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>{event.participants} प्रतिभागी</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">आयोजक: {event.organizer}</span>
                        <button className="text-xs text-green-600 hover:text-green-700 font-medium">
                          शामिल हों
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-medium text-gray-800">ट्रेंडिंग विषय</h3>
              </div>
              
              <div className="p-4">
                <div className="space-y-2">
                  {trendingTopics.map((topic) => (
                    <div 
                      key={topic.id} 
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-medium text-gray-700">#{topic.name}</span>
                      <span className="text-xs text-gray-500">{topic.posts} पोस्ट</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarImage src="https://randomuser.me/api/portraits/men/42.jpg" />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <Textarea 
                      placeholder="अपने विचार या प्रश्न साझा करें..." 
                      className="resize-none border-gray-200 focus:border-green-300 focus:ring-green-200"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                    />
                    
                    <div className="mt-3 flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-gray-600 border-gray-200">
                          <Image className="h-4 w-4 mr-1" />
                          फोटो
                        </Button>
                        <Button variant="outline" size="sm" className="text-gray-600 border-gray-200">
                          <Video className="h-4 w-4 mr-1" />
                          वीडियो
                        </Button>
                        <Button variant="outline" size="sm" className="text-gray-600 border-gray-200">
                          <FileText className="h-4 w-4 mr-1" />
                          फाइल
                        </Button>
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        पोस्ट करें
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Community Posts */}
            <div className="space-y-4">
              {communityPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-gray-800">{post.author.name}</h4>
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-gray-500">{post.author.role}</p>
                          <span className="text-gray-300">•</span>
                          <p className="text-xs text-gray-500">{post.timestamp}</p>
                        </div>
                      </div>
                      <button className="ml-auto text-gray-400 hover:text-gray-600">
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{post.content}</p>
                    
                    {post.images.length > 0 && (
                      <div className="mb-3">
                        <img 
                          src={post.images[0]} 
                          alt="Post image" 
                          className="w-full h-auto rounded-lg"
                        />
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-100">
                      <button className="flex items-center gap-1 hover:text-green-600">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-green-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments} टिप्पणियां</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-green-600">
                        <Share2 className="h-4 w-4" />
                        <span>{post.shares} शेयर</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-green-600">
                        <Bookmark className="h-4 w-4" />
                        <span>सेव करें</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="text-center">
                <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1 mx-auto">
                  <span>और पोस्ट देखें</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg overflow-hidden text-white p-6 md:p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-3">अपने क्षेत्र के किसान समूह से जुड़ें</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            अपने क्षेत्र के किसानों से जुड़कर ज्ञान साझा करें, समस्याओं का समाधान खोजें और सामूहिक रूप से विकास करें।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-700 px-6 py-2.5 rounded-md text-sm font-medium hover:bg-green-50 transition-colors">
              समूह खोजें
            </button>
            <button className="bg-green-800 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-green-900 transition-colors flex items-center justify-center gap-1 mx-auto sm:mx-0">
              <MessageCircle className="h-4 w-4" />
              <span>चर्चा शुरू करें</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CommunityHub;
