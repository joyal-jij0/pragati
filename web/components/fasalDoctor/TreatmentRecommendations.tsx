"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sprout, Droplets, Wind, Sun, Thermometer, 
  Calendar, Clock, ArrowRight, ChevronDown, 
  Filter, Check, AlertTriangle, Info, Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample treatment data
const treatmentOptions = [
  {
    id: 1,
    type: "chemical",
    name: "मैंकोज़ेब स्प्रे",
    description: "यह एक व्यापक स्पेक्ट्रम कवकनाशी है जो पत्ती झुलसा रोग के खिलाफ प्रभावी है।",
    dosage: "2.5 ग्राम प्रति लीटर पानी",
    frequency: "7-10 दिनों के अंतराल पर",
    effectiveness: 85,
    cost: "मध्यम",
    safetyPrecautions: [
      "स्प्रे करते समय दस्ताने और मास्क पहनें",
      "खाने से पहले फसलों को अच्छी तरह से धोएं",
      "बच्चों और पालतू जानवरों से दूर रखें"
    ],
    environmentalImpact: "मध्यम",
    waitingPeriod: "15 दिन"
  },
  {
    id: 2,
    type: "organic",
    name: "नीम तेल स्प्रे",
    description: "एक प्राकृतिक कवकनाशी जो कई फसल रोगों के खिलाफ प्रभावी है।",
    dosage: "5 मिली प्रति लीटर पानी",
    frequency: "5-7 दिनों के अंतराल पर",
    effectiveness: 70,
    cost: "कम",
    safetyPrecautions: [
      "आंखों से संपर्क से बचें",
      "खाद्य फसलों पर उपयोग के लिए सुरक्षित"
    ],
    environmentalImpact: "कम",
    waitingPeriod: "3 दिन"
  },
  {
    id: 3,
    type: "cultural",
    name: "फसल चक्र",
    description: "अगले मौसम में अलग परिवार की फसल उगाएं ताकि रोग चक्र टूट जाए।",
    effectiveness: 75,
    cost: "कम",
    environmentalImpact: "न्यूनतम",
    additionalBenefits: [
      "मिट्टी की उर्वरता में सुधार",
      "कीट प्रबंधन में सहायता",
      "उत्पादन विविधता"
    ]
  },
  {
    id: 4,
    type: "biological",
    name: "ट्राइकोडर्मा विरिडी",
    description: "एक लाभकारी कवक जो मिट्टी जनित रोगजनकों को नियंत्रित करता है।",
    dosage: "2 किलोग्राम प्रति एकड़",
    frequency: "बुवाई से पहले मिट्टी में मिलाएं",
    effectiveness: 80,
    cost: "मध्यम",
    environmentalImpact: "न्यूनतम",
    additionalBenefits: [
      "मिट्टी के स्वास्थ्य में सुधार",
      "पौधों की वृद्धि को बढ़ावा देता है",
      "जैविक खेती के लिए उपयुक्त"
    ]
  }
];

const TreatmentRecommendations = () => {
  const [selectedTreatmentType, setSelectedTreatmentType] = useState<string | null>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<number | null>(null);
  
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

  // Filter treatments by type
  const filteredTreatments = selectedTreatmentType 
    ? treatmentOptions.filter(treatment => treatment.type === selectedTreatmentType)
    : treatmentOptions;

  // Get treatment type color
  const getTreatmentTypeColor = (type: string) => {
    switch (type) {
      case "chemical":
        return "bg-blue-100 text-blue-800";
      case "organic":
        return "bg-green-100 text-green-800";
      case "cultural":
        return "bg-amber-100 text-amber-800";
      case "biological":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get treatment type icon
  const getTreatmentTypeIcon = (type: string) => {
    switch (type) {
      case "chemical":
        return <Droplets className="h-4 w-4" />;
      case "organic":
        return <Leaf className="h-4 w-4" />;
      case "cultural":
        return <Calendar className="h-4 w-4" />;
      case "biological":
        return <Sprout className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Disease Summary */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-medium text-gray-800">रोग सारांश</h3>
          <span className="text-sm text-red-600 font-medium flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            उच्च जोखिम
          </span>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              <h4 className="text-lg font-medium text-gray-800 mb-3">
                पत्ती झुलसा (अर्ली ब्लाइट)
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                यह टमाटर और आलू की फसलों में होने वाला एक प्रमुख कवक रोग है। इसके लक्षणों में पत्तियों पर भूरे रंग के धब्बे, जो बाद में काले पड़ जाते हैं और पत्तियों का सूखना शामिल है। अधिक नमी और 10-25°C तापमान इस रोग के फैलने के लिए अनुकूल होता है।
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <Thermometer className="h-3.5 w-3.5" />
                    <span>अनुकूल तापमान</span>
                  </div>
                  <p className="font-medium text-gray-800">10-25°C</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <Droplets className="h-3.5 w-3.5" />
                    <span>अनुकूल नमी</span>
                  </div>
                  <p className="font-medium text-gray-800">75-95%</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <Wind className="h-3.5 w-3.5" />
                    <span>फैलाव माध्यम</span>
                  </div>
                  <p className="font-medium text-gray-800">हवा, पानी</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>उपचार समय</span>
                  </div>
                  <p className="font-medium text-gray-800">तुरंत</p>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 flex justify-center items-center">
              <img 
                src="https://images.unsplash.com/photo-1598512752271-33f913a5af13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="पत्ती झुलसा रोग" 
                className="rounded-lg shadow-sm max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Treatment Options */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-gray-800">उपचार विकल्प</h3>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 text-sm"
              onClick={() => setSelectedTreatmentType(null)}
            >
              <Filter className="h-4 w-4" />
              <span>फ़िल्टर</span>
              {selectedTreatmentType && <ChevronDown className="h-3.5 w-3.5 ml-1" />}
            </Button>
            
            {selectedTreatmentType && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-gray-500"
                onClick={() => setSelectedTreatmentType(null)}
              >
                रीसेट
              </Button>
            )}
          </div>
        </div>
        
        {!selectedTreatmentType && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <Button 
              variant="outline" 
              className="justify-start bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300"
              onClick={() => setSelectedTreatmentType("chemical")}
            >
              <Droplets className="h-4 w-4 mr-2 text-blue-600" />
              <span>रासायनिक</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start bg-green-50 border-green-200 hover:bg-green-100 hover:border-green-300"
              onClick={() => setSelectedTreatmentType("organic")}
            >
              <Leaf className="h-4 w-4 mr-2 text-green-600" />
              <span>जैविक</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start bg-amber-50 border-amber-200 hover:bg-amber-100 hover:border-amber-300"
              onClick={() => setSelectedTreatmentType("cultural")}
            >
              <Calendar className="h-4 w-4 mr-2 text-amber-600" />
              <span>सांस्कृतिक</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start bg-purple-50 border-purple-200 hover:bg-purple-100 hover:border-purple-300"
              onClick={() => setSelectedTreatmentType("biological")}
            >
              <Sprout className="h-4 w-4 mr-2 text-purple-600" />
              <span>जैविक नियंत्रण</span>
            </Button>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTreatments.map((treatment) => (
            <div 
              key={treatment.id}
              className={`bg-white rounded-xl shadow-sm overflow-hidden border ${
                selectedTreatment === treatment.id ? 'border-green-500' : 'border-gray-100'
              } cursor-pointer transition-all hover:shadow-md`}
              onClick={() => setSelectedTreatment(
                selectedTreatment === treatment.id ? null : treatment.id
              )}
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getTreatmentTypeColor(treatment.type)}`}>
                      {getTreatmentTypeIcon(treatment.type)}
                      <span>
                        {treatment.type === "chemical" && "रासायनिक"}
                        {treatment.type === "organic" && "जैविक"}
                        {treatment.type === "cultural" && "सांस्कृतिक"}
                        {treatment.type === "biological" && "जैविक नियंत्रण"}
                      </span>
                    </span>
                    <h4 className="text-base font-medium text-gray-800 mt-2">
                      {treatment.name}
                    </h4>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500 mb-1">प्रभावशीलता</span>
                    <div className="flex items-center gap-2">
                      <Progress value={treatment.effectiveness} className="w-16 h-2" />
                      <span className="text-xs font-medium text-gray-700">{treatment.effectiveness}%</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  {treatment.description}
                </p>
                
                {(treatment.type === "chemical" || treatment.type === "organic" || treatment.type === "biological") && (
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="text-xs text-gray-500 block mb-1">खुराक</span>
                      <span className="text-sm font-medium text-gray-800">{treatment.dosage}</span>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <span className="text-xs text-gray-500 block mb-1">आवृत्ति</span>
                      <span className="text-sm font-medium text-gray-800">{treatment.frequency}</span>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-500">लागत:</span>
                    <span className="text-xs font-medium text-gray-700">{treatment.cost}</span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-green-600 hover:text-green-700 hover:bg-green-50 p-0 h-auto"
                  >
                    <span className="text-xs">विस्तार देखें</span>
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
              
              {selectedTreatment === treatment.id && (
                <div className="bg-gray-50 p-4 border-t border-gray-100">
                  {(treatment.type === "chemical" || treatment.type === "organic") && (
                    <>
                      <h5 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        सुरक्षा सावधानियां
                      </h5>
                      <ul className="text-sm text-gray-600 space-y-1 mb-4">
                        {/* @ts-expect-error - prototype error */}
                        {treatment.safetyPrecautions.map((precaution, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{precaution}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <h5 className="text-sm font-medium text-gray-800 mb-2">पर्यावरणीय प्रभाव</h5>
                          <span className="text-sm text-gray-600">{treatment.environmentalImpact}</span>
                        </div>
                        
                        {treatment.waitingPeriod && (
                          <div className="flex-1">
                            <h5 className="text-sm font-medium text-gray-800 mb-2">प्रतीक्षा अवधि</h5>
                            <span className="text-sm text-gray-600">{treatment.waitingPeriod}</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  
                  {treatment.type === "cultural" && (
                    <>
                      <h5 className="text-sm font-medium text-gray-800 mb-2">अतिरिक्त लाभ</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {/* @ts-expect-error - prototype error */}
                        {treatment.additionalBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {treatment.type === "biological" && (
                    <>
                      <h5 className="text-sm font-medium text-gray-800 mb-2">अतिरिक्त लाभ</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {/* @ts-expect-error - prototype error */}
                        {treatment.additionalBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Integrated Recommendations */}
      <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-medium text-gray-800">एकीकृत अनुशंसाएँ</h3>
          <Button variant="outline" size="sm" className="text-sm">
            बाज़ार ब्रिज पर खरीदें
          </Button>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            इस रोग के प्रभावी प्रबंधन के लिए निम्नलिखित एकीकृत दृष्टिकोण अपनाएं:
          </p>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">तत्काल कार्रवाई (1-2 दिन)</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>संक्रमित पत्तियों और फलों को हटाकर नष्ट करें</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>मैंकोज़ेब 2.5 ग्राम प्रति लीटर पानी के हिसाब से छिड़काव करें</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-green-800 mb-2">अगले 7-10 दिन</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>7 दिन बाद दूसरा छिड़काव करें (रासायनिक या जैविक विकल्प चुनें)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>पौधों के बीच हवा का संचार सुनिश्चित करें</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>पत्तियों को गीला होने से बचाएं, ड्रिप सिंचाई का उपयोग करें</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-purple-800 mb-2">दीर्घकालिक प्रबंधन</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>अगले मौसम में फसल चक्र अपनाएं</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>प्रतिरोधी किस्मों का उपयोग करें</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span>मिट्टी में ट्राइकोडर्मा विरिडी का उपयोग करें</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TreatmentRecommendations;