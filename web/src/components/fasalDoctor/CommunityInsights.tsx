import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, Search, MessageCircle, ThumbsUp, Share, Filter, 
  Calendar, MapPin, Image, Send, AlertTriangle, CheckCircle,
  Leaf, Bug, Shield, User, BarChart2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample community posts data
const communityPosts = [
  {
    id: 1,
    author: {
      name: "राजेश कुमार",
      location: "हरियाणा",
      avatar: "/avatars/farmer1.png"
    },
    date: "2 दिन पहले",
    content: "मेरे गेहूं के खेत में पत्ती झुलसा रोग दिखाई दे रहा है। मैंने फसल डॉक्टर से निदान करवाया और प्रोपिकोनाज़ोल का छिड़काव किया। अब फसल में सुधार दिख रहा है। सभी किसान भाइयों को सलाह है कि अपने खेतों का नियमित निरीक्षण करें।",
    images: ["/crops/wheat-leaf-rust.jpg"],
    likes: 24,
    comments: 8,
    shares: 5,
    tags: ["गेहूं", "पत्ती झुलसा", "फंगसाइड"],
    verified: true,
    disease: {
      name: "पत्ती झुलसा रोग",
      severity: "medium"
    }
  },
  {
    id: 2,
    author: {
      name: "सुनीता देवी",
      location: "उत्तर प्रदेश",
      avatar: "/avatars/farmer2.png"
    },
    date: "1 सप्ताह पहले",
    content: "मेरे टमाटर के पौधों पर सफेद मक्खी का प्रकोप हो गया था। नीम तेल और पीले चिपचिपे ट्रैप का उपयोग करके मैंने इसे नियंत्रित किया। जैविक कीटनाशकों का उपयोग करने से फसल भी स्वस्थ रहती है और पर्यावरण भी।",
    images: ["/crops/tomato-whitefly.jpg"],
    likes: 32,
    comments: 12,
    shares: 7,
    tags: ["टमाटर", "सफेद मक्खी", "जैविक नियंत्रण"],
    verified: true,
    pest: {
      name: "सफेद मक्खी",
      severity: "high"
    }
  },
  {
    id: 3,
    author: {
      name: "अमित सिंह",
      location: "पंजाब",
      avatar: "/avatars/farmer3.png"
    },
    date: "2 सप्ताह पहले",
    content: "फसल चक्र अपनाने से मेरे खेत में मिट्टी की उर्वरता बढ़ी है और रोगों का प्रकोप भी कम हुआ है। पिछले साल धान के बाद इस बार मैंने दलहन लगाया है। मिट्टी में नाइट्रोजन की मात्रा बढ़ी है और अगली फसल के लिए खेत तैयार है।",
    images: ["/crops/crop-rotation.jpg"],
    likes: 45,
    comments: 15,
    shares: 10,
    tags: ["फसल चक्र", "मिट्टी स्वास्थ्य", "दलहन"],
    verified: true
  }
];

// Sample trending topics
const trendingTopics = [
  { id: 1, name: "खरीफ फसल तैयारी", count: 156 },
  { id: 2, name: "जैविक खेती", count: 124 },
  { id: 3, name: "फसल बीमा", count: 98 },
  { id: 4, name: "सिंचाई तकनीक", count: 87 },
  { id: 5, name: "मौसम अपडेट", count: 76 }
];

// Sample expert farmers
const expertFarmers = [
  { id: 1, name: "डॉ. रमेश यादव", specialty: "फसल रोग विशेषज्ञ", followers: 1245 },
  { id: 2, name: "सुरेश पटेल", specialty: "जैविक खेती", followers: 987 },
  { id: 3, name: "अनिता शर्मा", specialty: "बागवानी विशेषज्ञ", followers: 856 }
];

// Sample success stories
const successStories = [
  {
    id: 1,
    farmer: "महेश चौधरी",
    location: "राजस्थान",
    story: "फसल डॉक्टर की मदद से मैंने अपने कपास के खेत में लाल सुंडी के प्रकोप को समय रहते पहचाना और नियंत्रित किया। इससे मेरी फसल बच गई और उत्पादन में 30% की वृद्धि हुई।",
    crop: "कपास",
    problem: "लाल सुंडी",
    solution: "समय पर पहचान और नियंत्रण",
    result: "30% अधिक उत्पादन"
  },
  {
    id: 2,
    farmer: "लक्ष्मी देवी",
    location: "कर्नाटक",
    story: "मेरे टमाटर के खेत में अर्ली ब्लाइट की समस्या थी। फसल डॉक्टर से मिले उपचार सुझावों को अपनाकर मैंने न केवल फसल को बचाया बल्कि रासायनिक कीटनाशकों का उपयोग भी 50% कम किया।",
    crop: "टमाटर",
    problem: "अर्ली ब्लाइट",
    solution: "एकीकृत रोग प्रबंधन",
    result: "50% कम रसायन उपयोग"
  }
];

const CommunityInsights = () => {
  // State for post creation
  const [postContent, setPostContent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
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

  // Get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h2 className="text-xl font-bold text-gray-800">समुदाय अंतर्दृष्टि</h2>
          <p className="text-gray-600 mt-1">
            अन्य किसानों के अनुभव और ज्ञान से सीखें और अपने अनुभव साझा करें
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-sm">
            <Filter className="h-4 w-4 mr-2" />
            फ़िल्टर
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white text-sm">
            <Users className="h-4 w-4 mr-2" />
            समुदाय से जुड़ें
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <motion.div 
          variants={itemVariants}
          className="md:col-span-2 space-y-6"
        >
          {/* Create Post Card */}
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/avatars/user.png" />
                <AvatarFallback className="bg-green-100 text-green-600">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <Input
                  placeholder="अपने अनुभव या प्रश्न साझा करें..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="border-gray-200"
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-between items-center">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Image className="h-4 w-4 mr-1" />
                  फोटो
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <MapPin className="h-4 w-4 mr-1" />
                  स्थान
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Leaf className="h-4 w-4 mr-1" />
                  फसल
                </Button>
              </div>
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white text-sm"
                disabled={!postContent.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                पोस्ट करें
              </Button>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {communityPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-4">
                  {/* Post Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback className="bg-green-100 text-green-600">
                          {post.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-1">
                          <p className="font-medium text-gray-800">{post.author.name}</p>
                          {post.verified && (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{post.author.location}</span>
                          <span className="mx-1">•</span>
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                    {(post.disease || post.pest) && (
                      <Badge 
                        className={`${getSeverityColor(
                          post.disease?.severity || post.pest?.severity || "medium"
                        )}`}
                      >
                        {post.disease ? (
                          <Leaf className="h-3 w-3 mr-1" />
                        ) : (
                          <Bug className="h-3 w-3 mr-1" />
                        )}
                        {post.disease?.name || post.pest?.name}
                      </Badge>
                    )}
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-700 mb-3">{post.content}</p>

                  {/* Post Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="bg-green-50 text-green-700 hover:bg-green-100"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Post Images */}
                  {post.images && post.images.length > 0 && (
                    <div className="mb-3 rounded-lg overflow-hidden">
                      <img 
                        src={post.images[0]} 
                        alt="Post" 
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <Button variant="ghost" size="sm" className="text-gray-600 text-xs">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {post.likes} लाइक
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 text-xs">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments} टिप्पणियां
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 text-xs">
                      <Share className="h-4 w-4 mr-1" />
                      {post.shares} शेयर
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div 
          variants={itemVariants}
          className="space-y-6"
        >
          {/* Search Box */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="समुदाय में खोजें..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-medium text-gray-800">ट्रेंडिंग विषय</h3>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {trendingTopics.map((topic) => (
                  <div 
                    key={topic.id}
                    className="flex justify-between items-center p-2 rounded-lg hover:bg-green-50 transition-colors cursor-pointer"
                  >
                    <span className="text-gray-700">#{topic.name}</span>
                    <Badge variant="outline" className="bg-gray-50">
                      {topic.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expert Farmers */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-medium text-gray-800">विशेषज्ञ किसान</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {expertFarmers.map((expert) => (
                  <div 
                    key={expert.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-green-100 text-green-600">
                          {expert.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-800">{expert.name}</p>
                        <p className="text-xs text-gray-500">{expert.specialty}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">
                      फॉलो करें
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-medium text-gray-800">सफलता की कहानियां</h3>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {successStories.map((story) => (
                  <div 
                    key={story.id}
                    className="p-3 rounded-lg border border-green-100 bg-green-50/50"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <h4 className="font-medium text-gray-800">{story.farmer}, {story.location}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {story.story}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-2 rounded-md">
                        <span className="text-gray-500">फसल:</span>
                        <span className="font-medium text-gray-700 ml-1">{story.crop}</span>
                      </div>
                      <div className="bg-white p-2 rounded-md">
                        <span className="text-gray-500">समस्या:</span>
                        <span className="font-medium text-gray-700 ml-1">{story.problem}</span>
                      </div>
                      <div className="bg-white p-2 rounded-md">
                        <span className="text-gray-500">समाधान:</span>
                        <span className="font-medium text-gray-700 ml-1">{story.solution}</span>
                      </div>
                      <div className="bg-white p-2 rounded-md">
                        <span className="text-gray-500">परिणाम:</span>
                        <span className="font-medium text-green-700 ml-1">{story.result}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityInsights;