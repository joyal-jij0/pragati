import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, TrendingDown, Users, Calendar, Filter, 
  Search, ChevronDown, ChevronRight, Check, Clock, 
  AlertCircle, ArrowRight, Plus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

// Sample data for active group purchases
const activeGroupPurchases = [
  {
    id: 1,
    title: "रबी सीजन उर्वरक खरीद",
    category: "उर्वरक",
    status: "चल रहा है",
    deadline: "25 अक्टूबर, 2023",
    totalAmount: "₹8,50,000",
    currentAmount: "₹5,20,000",
    progress: 61,
    participants: 42,
    targetParticipants: 60,
    coordinator: "रमेश कुमार",
    estimatedSavings: "12-15%",
    items: [
      { name: "यूरिया", quantity: "20 टन", price: "₹2,80,000" },
      { name: "DAP", quantity: "15 टन", price: "₹3,75,000" },
      { name: "पोटाश", quantity: "8 टन", price: "₹1,95,000" }
    ]
  },
  {
    id: 2,
    title: "बीज खरीद - गेहूं और सरसों",
    category: "बीज",
    status: "चल रहा है",
    deadline: "15 अक्टूबर, 2023",
    totalAmount: "₹3,20,000",
    currentAmount: "₹2,80,000",
    progress: 87,
    participants: 38,
    targetParticipants: 40,
    coordinator: "सुनील यादव",
    estimatedSavings: "8-10%",
    items: [
      { name: "गेहूं बीज (HD-2967)", quantity: "1200 किलो", price: "₹1,80,000" },
      { name: "सरसों बीज (RH-749)", quantity: "800 किलो", price: "₹1,40,000" }
    ]
  }
];

// Sample data for past group purchases
const pastGroupPurchases = [
  {
    id: 101,
    title: "खरीफ सीजन उर्वरक खरीद",
    category: "उर्वरक",
    status: "पूर्ण",
    completionDate: "15 जून, 2023",
    totalAmount: "₹7,20,000",
    participants: 52,
    actualSavings: "14%",
    totalSaved: "₹1,01,000",
    coordinator: "रमेश कुमार"
  },
  {
    id: 102,
    title: "कीटनाशक खरीद",
    category: "कीटनाशक",
    status: "पूर्ण",
    completionDate: "10 जुलाई, 2023",
    totalAmount: "₹2,50,000",
    participants: 35,
    actualSavings: "11%",
    totalSaved: "₹27,500",
    coordinator: "अनिल शर्मा"
  },
  {
    id: 103,
    title: "धान बीज खरीद",
    category: "बीज",
    status: "पूर्ण",
    completionDate: "5 मई, 2023",
    totalAmount: "₹1,80,000",
    participants: 28,
    actualSavings: "9%",
    totalSaved: "₹16,200",
    coordinator: "सुनील यादव"
  }
];

// Sample data for suppliers
const suppliers = [
  {
    id: 1,
    name: "किसान खाद भंडार",
    category: "उर्वरक",
    rating: 4.8,
    totalOrders: 12,
    location: "सोनीपत, हरियाणा",
    contactPerson: "विनोद अग्रवाल",
    phone: "9876543210"
  },
  {
    id: 2,
    name: "श्री कृषि केंद्र",
    category: "बीज, उर्वरक",
    rating: 4.6,
    totalOrders: 8,
    location: "करनाल, हरियाणा",
    contactPerson: "राजेश शर्मा",
    phone: "9876543211"
  },
  {
    id: 3,
    name: "अग्रो केमिकल्स",
    category: "कीटनाशक",
    rating: 4.5,
    totalOrders: 6,
    location: "पानीपत, हरियाणा",
    contactPerson: "सुरेश गुप्ता",
    phone: "9876543212"
  }
];

const GroupPurchases = () => {
  const [selectedPurchase, setSelectedPurchase] = useState(activeGroupPurchases[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("सभी");
  
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header Section */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg overflow-hidden text-white"
      >
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold mb-3">सामूहिक खरीद</h2>
            <p className="mb-4">
              सामूहिक खरीद के माध्यम से कृषि इनपुट पर 8-15% तक की बचत करें। अपने FPO के सदस्यों के साथ मिलकर बड़ी मात्रा में खरीदारी करके बेहतर मूल्य और गुणवत्ता प्राप्त करें।
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white bg-opacity-20 px-3 py-1.5 rounded-full text-sm font-medium">
                ₹42.5 लाख+ कुल खरीद
              </div>
              <div className="bg-white bg-opacity-20 px-3 py-1.5 rounded-full text-sm font-medium">
                12% औसत बचत
              </div>
              <div className="bg-white bg-opacity-20 px-3 py-1.5 rounded-full text-sm font-medium">
                85+ सफल खरीद
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold">2</p>
                  <p className="text-sm text-blue-100">सक्रिय खरीद</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">80</p>
                  <p className="text-sm text-blue-100">सक्रिय सदस्य</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">₹8.2L</p>
                  <p className="text-sm text-blue-100">वर्तमान मूल्य</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">₹1.1L</p>
                  <p className="text-sm text-blue-100">अनुमानित बचत</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-800 px-6 py-3 flex justify-between items-center">
          <p className="text-sm text-blue-100">
            नई सामूहिक खरीद शुरू करें या मौजूदा में शामिल हों
          </p>
          <button className="bg-white text-blue-700 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>नई खरीद</span>
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Purchase List */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-1 space-y-4"
        >
          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <div className="relative mb-3">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="खरीद खोजें..." 
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Badge 
                variant={filterCategory === "सभी" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilterCategory("सभी")}
              >
                सभी
              </Badge>
              <Badge 
                variant={filterCategory === "उर्वरक" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilterCategory("उर्वरक")}
              >
                उर्वरक
              </Badge>
              <Badge 
                variant={filterCategory === "बीज" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilterCategory("बीज")}
              >
                बीज
              </Badge>
              <Badge 
                variant={filterCategory === "कीटनाशक" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilterCategory("कीटनाशक")}
              >
                कीटनाशक
              </Badge>
              <Badge 
                variant={filterCategory === "उपकरण" ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilterCategory("उपकरण")}
              >
                उपकरण
              </Badge>
            </div>
          </div>

          {/* Purchase Tabs */}
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4 bg-white/50 p-1 rounded-lg">
              <TabsTrigger value="active" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
                सक्रिय खरीद
              </TabsTrigger>
              <TabsTrigger value="past" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">
                पिछली खरीद
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-0 space-y-3">
              {activeGroupPurchases.map((purchase) => (
                <div 
                  key={purchase.id}
                  className={`bg-white rounded-lg shadow-sm p-4 border ${
                    selectedPurchase.id === purchase.id 
                      ? 'border-blue-300 ring-1 ring-blue-300' 
                      : 'border-gray-100'
                  } cursor-pointer hover:border-blue-200 transition-colors`}
                  onClick={() => setSelectedPurchase(purchase)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800">{purchase.title}</h3>
                    <Badge variant={purchase.status === "चल रहा है" ? "default" : "outline"}>
                      {purchase.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <ShoppingBag className="h-4 w-4" />
                    <span>{purchase.category}</span>
                    <span className="text-gray-300">|</span>
                    <Calendar className="h-4 w-4" />
                    <span>{purchase.deadline}</span>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>प्रगति</span>
                      <span>{purchase.progress}%</span>
                    </div>
                    <Progress value={purchase.progress} className="h-2" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{purchase.participants}/{purchase.targetParticipants} सदस्य</span>
                    <span className="font-medium text-blue-600">{purchase.currentAmount}</span>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="past" className="mt-0 space-y-3">
              {pastGroupPurchases.map((purchase) => (
                <div 
                  key={purchase.id}
                  className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 hover:border-blue-200 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800">{purchase.title}</h3>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      {purchase.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <ShoppingBag className="h-4 w-4" />
                    <span>{purchase.category}</span>
                    <span className="text-gray-300">|</span>
                    <Calendar className="h-4 w-4" />
                    <span>{purchase.completionDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{purchase.participants} सदस्य</span>
                    <span className="font-medium text-gray-800">{purchase.totalAmount}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between text-sm">
                    <span className="text-gray-600">कुल बचत</span>
                    <span className="font-medium text-green-600">{purchase.totalSaved} ({purchase.actualSavings})</span>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Main Content - Purchase Details */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 space-y-4"
        >
          {/* Purchase Details Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-medium text-gray-800">{selectedPurchase.title}</h3>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                {selectedPurchase.status}
              </Badge>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <h4 className="text-sm font-medium text-gray-700">समय सीमा</h4>
                  </div>
                  <p className="text-lg font-medium text-gray-800">{selectedPurchase.deadline}</p>
                  <p className="text-xs text-gray-500 mt-1">अंतिम तिथि</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingDown className="h-4 w-4 text-green-600" />
                    <h4 className="text-sm font-medium text-gray-700">अनुमानित बचत</h4>
                  </div>
                  <p className="text-lg font-medium text-gray-800">{selectedPurchase.estimatedSavings}</p>
                  <p className="text-xs text-gray-500 mt-1">बाजार मूल्य से</p>
                </div>
                
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-amber-600" />
                    <h4 className="text-sm font-medium text-gray-700">प्रतिभागी</h4>
                  </div>
                  <p className="text-lg font-medium text-gray-800">{selectedPurchase.participants}/{selectedPurchase.targetParticipants}</p>
                  <p className="text-xs text-gray-500 mt-1">सदस्य शामिल हुए</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">खरीद प्रगति</h4>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">वर्तमान राशि: {selectedPurchase.currentAmount}</span>
                    <span className="text-gray-600">लक्ष्य: {selectedPurchase.totalAmount}</span>
                  </div>
                  <Progress value={selectedPurchase.progress} className="h-3" />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{selectedPurchase.progress}% पूर्ण</span>
                  <span className="text-blue-600 font-medium">शेष: {parseInt(selectedPurchase.totalAmount.replace(/[^\d]/g, '')) - parseInt(selectedPurchase.currentAmount.replace(/[^\d]/g, ''))} रुपये</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">खरीद विवरण</h4>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          वस्तु
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          मात्रा
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          मूल्य
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedPurchase.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                            {item.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            {item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">समन्वयक जानकारी</h4>
                <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                    <span className="text-lg font-medium">{selectedPurchase.coordinator.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{selectedPurchase.coordinator}</p>
                    <p className="text-sm text-gray-500">खरीद समन्वयक</p>
                  </div>
                  <button className="ml-auto bg-blue-100 text-blue-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors">
                    संपर्क करें
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button className="px-4 py-2 border border-blue-300 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors">
                  और जानकारी
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-1">
                  <span>खरीद में शामिल हों</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Suppliers Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-medium text-gray-800">अनुमोदित आपूर्तिकर्ता</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                <span>सभी देखें</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suppliers.map((supplier) => (
                  <div 
                    key={supplier.id}
                    className="p-4 border border-gray-100 rounded-lg hover:border-blue-200 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-800">{supplier.name}</h4>
                      <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs">
                        <span>{supplier.rating}</span>
                        <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{supplier.category}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <span>स्थान:</span>
                      <span className="text-gray-700">{supplier.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <span>संपर्क व्यक्ति:</span>
                      <span className="text-gray-700">{supplier.contactPerson}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <span>फोन:</span>
                      <span className="text-gray-700">{supplier.phone}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">{supplier.totalOrders} पूर्ण ऑर्डर</span>
                      <button className="text-blue-600 font-medium">विवरण देखें</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GroupPurchases;