"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Send, 
  Image as ImageIcon, 
  Paperclip, 
  Megaphone, 
  Calendar, 
  Users,
  ThumbsUp,
  MessageCircle,
  Share2
} from "lucide-react";

interface GroupChatAnnouncementsProps {
  selectedFPO: string;
}

const GroupChatAnnouncements = ({ selectedFPO }: GroupChatAnnouncementsProps) => {
  const [activeTab, setActiveTab] = useState("chat");
  const [message, setMessage] = useState("");
  
  // Sample announcements data
  const announcements = [
    {
      id: 1,
      author: "Rajesh Kumar",
      role: "FPO Manager",
      avatar: "RK",
      content: "All members are informed that the annual meeting will be held next Tuesday at 10 AM. Please ensure all members attend on time.",
      time: "2 hours ago",
      likes: 24,
      comments: 5,
      important: true
    },
    {
      id: 2,
      author: "Suresh Patel",
      role: "Technical Advisor",
      avatar: "SP",
      content: "Applications for the new tractor subsidy scheme have begun. Interested farmers should contact the FPO office. The last date for application is July 15.",
      time: "1 day ago",
      likes: 42,
      comments: 12,
      important: true
    },
    {
      id: 3,
      author: "Meena Devi",
      role: "Member",
      avatar: "MD",
      content: "I have extra wheat seeds. Please contact me if anyone needs them.",
      time: "2 days ago",
      likes: 8,
      comments: 3,
      important: false
    }
  ];
  
  // Sample chat messages
  const chatMessages = [
    {
      id: 1,
      sender: "Rajesh Kumar",
      avatar: "RK",
      content: "Hello everyone, can someone tell me when the next FPO meeting is?",
      time: "10:30 AM",
      isCurrentUser: false
    },
    {
      id: 2,
      sender: "Suresh Patel",
      avatar: "SP",
      content: "The next meeting is on Tuesday, July 10 at 10 AM. All members should attend.",
      time: "10:32 AM",
      isCurrentUser: false
    },
    {
      id: 3,
      sender: "You",
      avatar: "YA",
      content: "Thank you for the information. I will be present.",
      time: "10:35 AM",
      isCurrentUser: true
    },
    {
      id: 4,
      sender: "Meena Devi",
      avatar: "MD",
      content: "Can someone tell me what documents are required for the new subsidy scheme?",
      time: "10:40 AM",
      isCurrentUser: false
    }
  ];
  
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
  
  const handleSendMessage = () => {
    if (message.trim() === "") return;
    // Logic to send message would go here
    setMessage("");
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 flex items-center gap-1 ${
              activeTab === "chat" ? "border-green-600 text-green-700" : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("chat")}
          >
            <MessageSquare size={16} />
            <span>Group Chat</span>
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 flex items-center gap-1 ${
              activeTab === "announcements" ? "border-green-600 text-green-700" : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("announcements")}
          >
            <Megaphone size={16} />
            <span>Announcements</span>
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 flex items-center gap-1 ${
              activeTab === "events" ? "border-green-600 text-green-700" : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("events")}
          >
            <Calendar size={16} />
            <span>Upcoming Events</span>
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-800">
            {activeTab === "chat" && "Group Chat"}
            {activeTab === "announcements" && "Important Announcements"}
            {activeTab === "events" && "Upcoming Events"}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Users size={14} />
              <span>128 Members</span>
            </span>
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
          </div>
        </div>
        
        {/* Chat Tab Content */}
        {activeTab === "chat" && (
          <div className="space-y-4">
            <div className="h-96 overflow-y-auto bg-gray-50 rounded-lg p-4 space-y-4">
              {chatMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  variants={itemVariants}
                  className={`flex ${msg.isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] ${msg.isCurrentUser ? "bg-green-100 text-gray-800" : "bg-white border border-gray-200 text-gray-800"} rounded-lg p-3 shadow-sm`}>
                    {!msg.isCurrentUser && (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-800 text-xs font-medium">
                          {msg.avatar}
                        </div>
                        <span className="text-sm font-medium">{msg.sender}</span>
                      </div>
                    )}
                    <p className="text-sm">{msg.content}</p>
                    <div className={`text-xs text-gray-500 mt-1 ${msg.isCurrentUser ? "text-right" : ""}`}>
                      {msg.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Paperclip size={18} className="text-gray-500" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <ImageIcon size={18} className="text-gray-500" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button 
                onClick={handleSendMessage}
                className={`p-2 rounded-full ${message.trim() ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"}`}
                disabled={!message.trim()}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
        
        {/* Announcements Tab Content */}
        {activeTab === "announcements" && (
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <motion.div
                key={announcement.id}
                variants={itemVariants}
                className={`p-4 rounded-lg border ${announcement.important ? "border-amber-200 bg-amber-50" : "border-gray-200 bg-white"}`}
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-medium">
                    {announcement.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-800">{announcement.author}</span>
                        <span className="text-xs text-gray-500 ml-2">{announcement.role}</span>
                      </div>
                      <span className="text-xs text-gray-500">{announcement.time}</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-700">{announcement.content}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                        <ThumbsUp size={14} />
                        <span>{announcement.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                        <MessageCircle size={14} />
                        <span>{announcement.comments}</span>
                      </button>
                      <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                        <Share2 size={14} />
                        <span>शेयर</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Events Tab Content */}
        {activeTab === "events" && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg border border-green-200 bg-green-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800">वार्षिक सामान्य बैठक</h4>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">आगामी</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Calendar size={14} />
                <span>10 जुलाई, 2023 | सुबह 10:00 बजे</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                सभी FPO सदस्यों के लिए वार्षिक सामान्य बैठक। वित्तीय रिपोर्ट, नई योजनाओं और आगामी परियोजनाओं पर चर्चा की जाएगी।
              </p>
              <button className="text-sm bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition-colors">
                उपस्थिति की पुष्टि करें
              </button>
            </div>
            
            <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800">कृषि प्रशिक्षण कार्यशाला</h4>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">आगामी</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Calendar size={14} />
                <span>15 जुलाई, 2023 | दोपहर 2:00 बजे</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                जैविक खेती और मिट्टी के स्वास्थ्य पर विशेष प्रशिक्षण कार्यशाला। कृषि विशेषज्ञ द्वारा संचालित।
              </p>
              <button className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors">
                पंजीकरण करें
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GroupChatAnnouncements;