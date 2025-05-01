import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Bug, AlertTriangle, Leaf, Info, ChevronDown, ChevronRight } from "lucide-react";
import { commonPests } from "@/data/fasalDoctorData";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PestLibrary = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  const [expandedPest, setExpandedPest] = useState<number | null>(null);

  // Filter pests based on search term and severity
  const filteredPests = commonPests.filter((pest) => {
    const matchesSearch =
      pest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pest.crops.some((crop) => crop.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSeverity = selectedSeverity ? pest.severity === selectedSeverity : true;
    
    return matchesSearch && matchesSeverity;
  });

  // Get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="कीट का नाम या फसल खोजें..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className={`${
                selectedSeverity === "high" ? "bg-red-100 text-red-800" : ""
              }`}
              onClick={() =>
                setSelectedSeverity(selectedSeverity === "high" ? null : "high")
              }
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              उच्च जोखिम
            </Button>
            <Button
              variant="outline"
              className={`${
                selectedSeverity === "medium" ? "bg-amber-100 text-amber-800" : ""
              }`}
              onClick={() =>
                setSelectedSeverity(selectedSeverity === "medium" ? null : "medium")
              }
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              मध्यम जोखिम
            </Button>
          </div>
        </div>
      </div>

      {/* Pests List */}
      <div className="space-y-4">
        {filteredPests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <Bug className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-800 mb-1">कोई कीट नहीं मिला</h3>
            <p className="text-gray-500">अपनी खोज शब्दों को बदलें या फिल्टर हटाएं</p>
          </div>
        ) : (
          filteredPests.map((pest) => (
            <motion.div
              key={pest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div
                className="p-4 cursor-pointer"
                onClick={() =>
                  setExpandedPest(expandedPest === pest.id ? null : pest.id)
                }
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
                      <span className="text-xl">{pest.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-gray-800">
                        {pest.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {pest.crops.slice(0, 3).map((crop, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-gray-50"
                          >
                            {crop}
                          </Badge>
                        ))}
                        {pest.crops.length > 3 && (
                          <Badge variant="outline" className="bg-gray-50">
                            +{pest.crops.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={getSeverityColor(pest.severity)}
                    >
                      {pest.severity === "high"
                        ? "उच्च जोखिम"
                        : pest.severity === "medium"
                        ? "मध्यम जोखिम"
                        : "कम जोखिम"}
                    </Badge>
                    {expandedPest === pest.id ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {expandedPest === pest.id && (
                <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                        लक्षण
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {pest.symptoms.map((symptom, index) => (
                          <li key={index}>{symptom}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                        <Bug className="h-4 w-4 mr-2 text-red-600" />
                        नुकसान
                      </h4>
                      <p className="text-gray-600">{pest.damage}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-green-600" />
                      नियंत्रण के उपाय
                    </h4>
                    <p className="text-gray-600">{pest.control}</p>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                      <Info className="h-4 w-4 mr-2 text-blue-600" />
                      निवारक उपाय
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {pest.preventiveMeasures.map((measure, index) => (
                        <li key={index}>{measure}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {pest.images.map((image, index) => (
                      <div key={index} className="bg-gray-100 rounded-lg p-2">
                        <img
                          src={image}
                          alt={`${pest.name} image ${index + 1}`}
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default PestLibrary;