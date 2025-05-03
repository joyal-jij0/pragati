import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Video, 
  FileText, 
  ChevronRight, 
  Star, 
  Clock, 
  Download,
  CheckCircle,
  Play,
  Calendar,
  Users,
  TrendingUp
} from "lucide-react";

const FinancialEducation = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Categories
  const categories = [
    { id: "all", name: "All" },
    { id: "credit", name: "Credit" },
    { id: "loans", name: "Loans" },
    { id: "insurance", name: "Insurance" },
    { id: "savings", name: "Savings" },
    { id: "market", name: "Market" }
  ];

  // Educational resources
  const resources = [
    {
      id: 1,
      title: "How to Improve Credit Score",
      type: "article",
      category: "credit",
      thumbnail: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      duration: "5 mins",
      author: "Financial Advisory Team",
      rating: 4.8,
      completed: true,
      description: "Learn effective strategies to improve your credit score."
    },
    {
      id: 2,
      title: "Importance of Crop Insurance",
      type: "video",
      category: "insurance",
      thumbnail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      duration: "12 mins",
      author: "Agriculture Expert",
      rating: 4.5,
      completed: false,
      description: "Why crop insurance is important and how it provides protection."
    },
    {
      id: 3,
      title: "Kisan Credit Card Guide",
      type: "pdf",
      category: "credit",
      thumbnail: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      duration: "8 pages",
      author: "Financial Services Department",
      rating: 4.7,
      completed: false,
      description: "Learn about Kisan Credit Card benefits and application process."
    },
    {
      id: 4,
      title: "Types of Agricultural Loans",
      type: "article",
      category: "loans",
      thumbnail: "https://images.unsplash.com/photo-1601599963565-b7f49deb352a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      duration: "7 mins",
      author: "Rural Bank",
      rating: 4.3,
      completed: false,
      description: "Details of various types of loans available for farmers."
    },
    {
      id: 5,
      title: "Developing Savings Habits",
      type: "video",
      category: "savings",
      thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      duration: "15 mins",
      author: "Financial Educator",
      rating: 4.9,
      completed: false,
      description: "Ways to manage your income and develop saving habits."
    },
    {
      id: 6,
      title: "Finding Markets for Agricultural Produce",
      type: "article",
      category: "market",
      thumbnail: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      duration: "6 mins",
      author: "Market Expert",
      rating: 4.6,
      completed: false,
      description: "How to find the best market and price for your crops."
    }
  ];

  // Filter resources based on active category
  const filteredResources = activeCategory === "all" 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);

  // Upcoming webinars
  const upcomingWebinars = [
    {
      id: 1,
      title: "How to Successfully File Crop Insurance Claims",
      date: "November 15, 2023",
      time: "2:00 PM",
      speaker: "Rajesh Sharma, Insurance Expert",
      participants: 45
    },
    {
      id: 2,
      title: "Financial Management for Small Farmers",
      date: "November 20, 2023",
      time: "11:00 AM",
      speaker: "Anita Patel, Financial Advisor",
      participants: 32
    }
  ];

  // Resource type icon
  const getResourceIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "pdf":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800">Financial Education</h3>
        <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
          <span>View All</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto hide-scrollbar pb-2">
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.slice(0, 4).map((resource) => (
          <motion.div
            key={resource.id}
            variants={cardVariants}
            className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex h-full">
              <div className="w-1/3 relative">
                <img 
                  src={resource.thumbnail} 
                  alt={resource.title} 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  {resource.type === "video" && (
                    <div className="bg-white bg-opacity-80 rounded-full p-1.5">
                      <Play className="h-4 w-4 text-green-600" />
                    </div>
                  )}
                </div>
              </div>
              <div className="w-2/3 p-3 flex flex-col">
                <div className="flex items-center gap-1 mb-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    resource.type === 'article' ? 'bg-blue-100 text-blue-700' :
                    resource.type === 'video' ? 'bg-red-100 text-red-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    <div className="flex items-center gap-1">
                      {getResourceIcon(resource.type)}
                      <span>{resource.type === 'article' ? 'Article' : resource.type === 'video' ? 'Video' : 'PDF'}</span>
                    </div>
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {resource.duration}
                  </span>
                </div>
                
                <h4 className="font-medium text-gray-800 mb-1 line-clamp-2">{resource.title}</h4>
                <p className="text-xs text-gray-500 mb-2 line-clamp-2">{resource.description}</p>
                
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs text-gray-600">{resource.rating}</span>
                  </div>
                  
                  {resource.completed ? (
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Completed
                    </span>
                  ) : (
                    <button className="text-xs text-green-600 font-medium">
                      {resource.type === 'pdf' ? 'Download' : 'Read'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Upcoming Webinars */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
          <h4 className="font-medium text-gray-800 flex items-center gap-1">
            <Video className="h-4 w-4 text-green-600" />
            Upcoming Webinars
          </h4>
          <button className="text-xs text-green-600 hover:text-green-700 font-medium">
            View All
          </button>
        </div>
        
        <div className="p-4 space-y-3">
          {upcomingWebinars.map((webinar) => (
            <div key={webinar.id} className="flex items-start gap-3 pb-3 last:pb-0 last:border-b-0 border-b border-gray-100">
              <div className="bg-green-100 p-2 rounded-lg text-green-800 flex-shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h5 className="font-medium text-gray-800 text-sm">{webinar.title}</h5>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-gray-500">{webinar.date}, {webinar.time}</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {webinar.participants} participants
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Speaker: {webinar.speaker}</p>
                <button className="mt-2 text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-colors">
                  Register
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Tips */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
        <div className="flex items-start gap-3">
          <div className="bg-amber-200 p-2 rounded-full text-amber-700">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-1">Financial Tip of the Day</h4>
            <p className="text-sm text-gray-700">Always set aside at least 10% of your income for savings. This will help you stay prepared for emergency situations.</p>
            <div className="mt-3 flex gap-2">
              <button className="text-xs bg-amber-600 text-white px-3 py-1 rounded-full hover:bg-amber-700 transition-colors">
                Get More Tips
              </button>
              <button className="text-xs bg-white text-amber-700 px-3 py-1 rounded-full border border-amber-300 hover:bg-amber-50 transition-colors">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Download Resources */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="px-4 py-3 border-b border-gray-100">
          <h4 className="font-medium text-gray-800">Downloadable Resources</h4>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <h5 className="text-sm font-medium text-gray-800">Financial Planning Workbook</h5>
                <p className="text-xs text-gray-500">PDF, 2.5 MB</p>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-700">
              <Download className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-green-600" />
              <div>
                <h5 className="text-sm font-medium text-gray-800">Loan Application Checklist</h5>
                <p className="text-xs text-gray-500">PDF, 1.8 MB</p>
              </div>
            </div>
            <button className="text-green-600 hover:text-green-700">
              <Download className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-amber-600" />
              <div>
                <h5 className="text-sm font-medium text-gray-800">Insurance Claim Process Guide</h5>
                <p className="text-xs text-gray-500">PDF, 3.2 MB</p>
              </div>
            </div>
            <button className="text-amber-600 hover:text-amber-700">
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialEducation;