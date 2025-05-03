import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Calendar, Droplets, Sun, Wind, CloudRain, Sprout, Leaf, Bug, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sample preventive measures data
const preventiveMeasuresData = [
  {
    id: 1,
    category: "मौसम आधारित",
    title: "सूखे से बचाव",
    description: "सूखे की स्थिति में फसलों को बचाने के लिए निम्न उपाय अपनाएं:",
    icon: <Sun className="h-5 w-5" />,
    color: "amber",
    measures: [
      "नियमित सिंचाई सुनिश्चित करें, विशेषकर महत्वपूर्ण विकास चरणों में",
      "मल्चिंग का उपयोग करके मिट्टी की नमी को संरक्षित करें",
      "सूखा प्रतिरोधी फसल किस्मों का चयन करें",
      "ड्रिप सिंचाई जैसी जल संरक्षण तकनीकों का उपयोग करें",
      "फसल चक्र और मिश्रित खेती अपनाएं"
    ],
    seasonality: "गर्मी और पूर्व-मानसून",
    priority: "high"
  },
  {
    id: 2,
    category: "कीट प्रबंधन",
    title: "एफिड्स (माहू) नियंत्रण",
    description: "एफिड्स से फसलों को बचाने के लिए निवारक उपाय:",
    icon: <Bug className="h-5 w-5" />,
    color: "green",
    measures: [
      "नियमित रूप से फसलों का निरीक्षण करें, विशेषकर पत्तियों के निचले हिस्से में",
      "प्राकृतिक शिकारियों जैसे लेडीबग को प्रोत्साहित करें",
      "नीम तेल या लहसुन-मिर्च स्प्रे जैसे जैविक कीटनाशकों का उपयोग करें",
      "पीले चिपचिपे ट्रैप का उपयोग करें",
      "संक्रमित पौधों या पौधे के हिस्सों को हटा दें"
    ],
    seasonality: "वसंत और शुरुआती गर्मी",
    priority: "medium"
  },
  {
    id: 3,
    category: "रोग प्रबंधन",
    title: "फफूंदी रोग रोकथाम",
    description: "फफूंदी रोगों से फसलों को बचाने के लिए निवारक उपाय:",
    icon: <Leaf className="h-5 w-5" />,
    color: "blue",
    measures: [
      "उचित जल निकासी सुनिश्चित करें और अत्यधिक सिंचाई से बचें",
      "पौधों के बीच पर्याप्त हवा का संचार सुनिश्चित करें",
      "रोग प्रतिरोधी किस्मों का चयन करें",
      "स्वस्थ बीज और रोपण सामग्री का उपयोग करें",
      "फसल अवशेषों को हटाकर स्वच्छता बनाए रखें",
      "फसल चक्र अपनाएं"
    ],
    seasonality: "बरसात और उच्च आर्द्रता वाले मौसम",
    priority: "high"
  },
// ... existing code ...
{
    id: 4,
    category: "मिट्टी स्वास्थ्य",
    title: "मिट्टी की उर्वरता बनाए रखना",
    description: "मिट्टी की उर्वरता बनाए रखने के लिए निवारक उपाय:",
    icon: <Sprout className="h-5 w-5" />,
    color: "purple",
    measures: [
      "जैविक खाद और कम्पोस्ट का उपयोग करें",
      "हरी खाद और फसल अवशेषों को मिट्टी में मिलाएं",
      "फसल चक्र अपनाएं, विशेषकर दलहनी फसलों के साथ",
      "मिट्टी परीक्षण के आधार पर संतुलित उर्वरक प्रयोग करें",
      "मिट्टी की संरचना सुधारने के लिए जैविक पदार्थों का उपयोग करें"
    ],
    seasonality: "फसल चक्र के अनुसार",
    priority: "medium"
  },
  {
    id: 5,
    category: "जल प्रबंधन",
    title: "अत्यधिक वर्षा से बचाव",
    description: "अत्यधिक वर्षा से फसलों को बचाने के लिए निवारक उपाय:",
    icon: <CloudRain className="h-5 w-5" />,
    color: "blue",
    measures: [
      "उचित जल निकासी प्रणाली विकसित करें",
      "उठी हुई क्यारियों या मेड़ों पर खेती करें",
      "जलभराव सहन करने वाली फसल किस्मों का चयन करें",
      "फसल बीमा करवाएं",
      "मौसम पूर्वानुमान के आधार पर फसल कार्य योजना बनाएं"
    ],
    seasonality: "मानसून",
    priority: "high"
  }
];

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

const PreventiveMeasures: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);

  const filteredMeasures = preventiveMeasuresData.filter(measure => {
    if (selectedCategory && measure.category !== selectedCategory) return false;
    if (selectedPriority && measure.priority !== selectedPriority) return false;
    return true;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "मौसम आधारित": return <Sun className="h-4 w-4" />;
      case "कीट प्रबंधन": return <Bug className="h-4 w-4" />;
      case "रोग प्रबंधन": return <Leaf className="h-4 w-4" />;
      case "मिट्टी स्वास्थ्य": return <Sprout className="h-4 w-4" />;
      case "जल प्रबंधन": return <Droplets className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-amber-600 bg-amber-50 border-amber-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case "amber": return "bg-amber-100 text-amber-800 border-amber-200";
      case "green": return "bg-green-100 text-green-800 border-green-200";
      case "blue": return "bg-blue-100 text-blue-800 border-blue-200";
      case "purple": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Filter Section */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">फ़िल्टर करें</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">श्रेणी द्वारा</h4>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(preventiveMeasuresData.map(m => m.category))).map(category => (
                <Badge
                  key={category}
                  variant="outline"
                  className={`cursor-pointer ${
                    selectedCategory === category 
                      ? 'bg-green-100 text-green-800 border-green-300' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category ? null : category
                  )}
                >
                  {getCategoryIcon(category)}
                  <span className="ml-1">{category}</span>
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">प्राथमिकता द्वारा</h4>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(preventiveMeasuresData.map(m => m.priority))).map(priority => (
                <Badge
                  key={priority}
                  variant="outline"
                  className={`cursor-pointer ${
                    selectedPriority === priority 
                      ? getPriorityColor(priority) 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedPriority(
                    selectedPriority === priority ? null : priority
                  )}
                >
                  {priority === "high" && <AlertTriangle className="h-3 w-3 mr-1" />}
                  {priority === "medium" && <AlertTriangle className="h-3 w-3 mr-1" />}
                  {priority === "low" && <Shield className="h-3 w-3 mr-1" />}
                  <span>
                    {priority === "high" && "उच्च प्राथमिकता"}
                    {priority === "medium" && "मध्यम प्राथमिकता"}
                    {priority === "low" && "निम्न प्राथमिकता"}
                  </span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {(selectedCategory || selectedPriority) && (
          <div className="mt-4 flex justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                setSelectedCategory(null);
                setSelectedPriority(null);
              }}
              className="text-sm text-gray-600"
            >
              फ़िल्टर हटाएं
            </Button>
          </div>
        )}
      </motion.div>

      {/* Preventive Measures Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMeasures.map((measure) => (
          <motion.div
            key={measure.id}
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className={`p-4 ${getColorClass(measure.color)} border-b`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {measure.icon}
                  <h3 className="font-medium">{measure.title}</h3>
                </div>
                <Badge variant="outline" className={getPriorityColor(measure.priority)}>
                  {measure.priority === "high" && "उच्च प्राथमिकता"}
                  {measure.priority === "medium" && "मध्यम प्राथमिकता"}
                  {measure.priority === "low" && "निम्न प्राथमिकता"}
                </Badge>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">{measure.description}</p>
              
              <div className="space-y-2 mb-4">
                {measure.measures.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="bg-green-100 text-green-800 rounded-full p-1 mt-0.5 flex-shrink-0">
                      <Shield className="h-3 w-3" />
                    </div>
                    <p className="text-sm text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>मौसम: {measure.seasonality}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Seasonal Calendar */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">मौसमी निवारक उपाय कैलेंडर</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sun className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-green-800">वसंत (मार्च-अप्रैल)</h4>
              </div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>कीट निगरानी शुरू करें</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>मिट्टी परीक्षण करवाएं</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>बीज उपचार करें</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sun className="h-5 w-5 text-amber-600" />
                <h4 className="font-medium text-amber-800">गर्मी (मई-जून)</h4>
              </div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>मल्चिंग करें</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>जल संरक्षण उपाय अपनाएं</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span>छायादार जाल का उपयोग करें</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <CloudRain className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-800">मानसून (जुलाई-सितंबर)</h4>
              </div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>जल निकासी सुनिश्चित करें</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>फफूंदी रोग नियंत्रण</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>उठी हुई क्यारियां बनाएं</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Wind className="h-5 w-5 text-purple-600" />
                <h4 className="font-medium text-purple-800">शरद/सर्दी (अक्टूबर-फरवरी)</h4>
              </div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>मिट्टी में जैविक पदार्थ मिलाएं</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>ठंड से बचाव के उपाय करें</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-3.5 w-3.5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>अगले मौसम की योजना बनाएं</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PreventiveMeasures;