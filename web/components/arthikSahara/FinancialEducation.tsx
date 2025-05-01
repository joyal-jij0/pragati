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
    { id: "all", name: "सभी" },
    { id: "credit", name: "क्रेडिट" },
    { id: "loans", name: "ऋण" },
    { id: "insurance", name: "बीमा" },
    { id: "savings", name: "बचत" },
    { id: "market", name: "बाज़ार" }
  ];

  // Educational resources
  const resources = [
    {
      id: 1,
      title: "क्रेडिट स्कोर को कैसे सुधारें",
      type: "article",
      category: "credit",
      thumbnail: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      duration: "5 मिनट",
      author: "वित्तीय सलाहकार टीम",
      rating: 4.8,
      completed: true,
      description: "अपने क्रेडिट स्कोर को बेहतर बनाने के लिए प्रभावी रणनीतियां सीखें।"
    },
    {
      id: 2,
      title: "फसल बीमा का महत्व",
      type: "video",
      category: "insurance",
      thumbnail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      duration: "12 मिनट",
      author: "कृषि विशेषज्ञ",
      rating: 4.5,
      completed: false,
      description: "फसल बीमा क्यों महत्वपूर्ण है और यह आपको कैसे सुरक्षा प्रदान करता है।"
    },
    {
      id: 3,
      title: "किसान क्रेडिट कार्ड गाइड",
      type: "pdf",
      category: "credit",
      thumbnail: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      duration: "8 पेज",
      author: "वित्तीय सेवा विभाग",
      rating: 4.7,
      completed: false,
      description: "किसान क्रेडिट कार्ड के लाभों और आवेदन प्रक्रिया के बारे में जानें।"
    },
    {
      id: 4,
      title: "कृषि ऋण के प्रकार",
      type: "article",
      category: "loans",
      thumbnail: "https://images.unsplash.com/photo-1601599963565-b7f49deb352a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      duration: "7 मिनट",
      author: "ग्रामीण बैंक",
      rating: 4.3,
      completed: false,
      description: "किसानों के लिए उपलब्ध विभिन्न प्रकार के ऋणों का विवरण।"
    },
    {
      id: 5,
      title: "बचत की आदतें विकसित करना",
      type: "video",
      category: "savings",
      thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      duration: "15 मिनट",
      author: "वित्तीय शिक्षक",
      rating: 4.9,
      completed: false,
      description: "अपनी आय का प्रबंधन करने और बचत की आदतें विकसित करने के तरीके।"
    },
    {
      id: 6,
      title: "कृषि उपज के लिए बाज़ार खोजना",
      type: "article",
      category: "market",
      thumbnail: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
      duration: "6 मिनट",
      author: "बाज़ार विशेषज्ञ",
      rating: 4.6,
      completed: false,
      description: "अपनी फसल के लिए सर्वोत्तम बाज़ार और मूल्य कैसे प्राप्त करें।"
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
      title: "फसल बीमा दावों को सफलतापूर्वक कैसे दर्ज करें",
      date: "15 नवंबर, 2023",
      time: "दोपहर 2:00 बजे",
      speaker: "राजेश शर्मा, बीमा विशेषज्ञ",
      participants: 45
    },
    {
      id: 2,
      title: "छोटे किसानों के लिए वित्तीय प्रबंधन",
      date: "20 नवंबर, 2023",
      time: "सुबह 11:00 बजे",
      speaker: "अनिता पटेल, वित्तीय सलाहकार",
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
        <h3 className="text-lg font-medium text-gray-800">वित्तीय शिक्षा</h3>
        <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
          <span>सभी देखें</span>
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
                      <span>{resource.type === 'article' ? 'लेख' : resource.type === 'video' ? 'वीडियो' : 'पीडीएफ'}</span>
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
                      पूरा किया गया
                    </span>
                  ) : (
                    <button className="text-xs text-green-600 font-medium">
                      {resource.type === 'pdf' ? 'डाउनलोड करें' : 'पढ़ें'}
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
            आगामी वेबिनार
          </h4>
          <button className="text-xs text-green-600 hover:text-green-700 font-medium">
            सभी देखें
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
                    {webinar.participants} प्रतिभागी
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">प्रस्तुतकर्ता: {webinar.speaker}</p>
                <button className="mt-2 text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition-colors">
                  रजिस्टर करें
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
            <h4 className="font-medium text-gray-800 mb-1">आज का वित्तीय टिप</h4>
            <p className="text-sm text-gray-700">अपनी आय का कम से कम 10% हमेशा बचत के लिए अलग रखें। यह आपको आपातकालीन स्थितियों के लिए तैयार रहने में मदद करेगा।</p>
            <div className="mt-3 flex gap-2">
              <button className="text-xs bg-amber-600 text-white px-3 py-1 rounded-full hover:bg-amber-700 transition-colors">
                और टिप्स पाएं
              </button>
              <button className="text-xs bg-white text-amber-700 px-3 py-1 rounded-full border border-amber-300 hover:bg-amber-50 transition-colors">
                शेयर करें
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Download Resources */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
        <div className="px-4 py-3 border-b border-gray-100">
          <h4 className="font-medium text-gray-800">डाउनलोड करने योग्य संसाधन</h4>
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <h5 className="text-sm font-medium text-gray-800">वित्तीय नियोजन वर्कबुक</h5>
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
                <h5 className="text-sm font-medium text-gray-800">ऋण आवेदन चेकलिस्ट</h5>
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
                <h5 className="text-sm font-medium text-gray-800">बीमा दावा प्रक्रिया गाइड</h5>
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