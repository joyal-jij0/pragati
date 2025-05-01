import React from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, AlertCircle, Clock, ChevronRight, FileText, Download } from "lucide-react";
import { diagnosisHistory } from "@/data/fasalDoctorData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const DiagnosisHistory = () => {
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "उपचारित":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        );
      case "प्रक्रियाधीन":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="h-3 w-3 mr-1" />
            {status}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800">
            {status}
          </Badge>
        );
    }
  };

  // Get result badge
  const getResultBadge = (result: string) => {
    switch (result) {
      case "सफल":
        return (
          <Badge className="bg-green-100 text-green-800">
            {result}
          </Badge>
        );
      case "आंशिक सफल":
        return (
          <Badge className="bg-amber-100 text-amber-800">
            {result}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800">
            {result}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">निदान इतिहास</h2>
        <Button variant="outline" className="text-sm">
          <FileText className="h-4 w-4 mr-2" />
          रिपोर्ट डाउनलोड करें
        </Button>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {diagnosisHistory.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {item.date}
                  </div>
                  <div className="h-4 w-px bg-gray-200"></div>
                  <div className="text-sm font-medium text-gray-700">
                    {item.crop}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  {getStatusBadge(item.status)}
                  {getResultBadge(item.result)}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/4">
                  <img
                    src={item.image}
                    alt={`${item.crop} - ${item.disease}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-3/4">
                  <h3 className="font-medium text-lg text-gray-800 mb-1">
                    {item.disease}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-blue-100 text-blue-800">
                      {item.confidence}% सटीकता
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">उपचार:</span> {item.treatment}
                  </div>
                  <div className="flex justify-end">
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                      विस्तृत रिपोर्ट देखें
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {diagnosisHistory.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-800 mb-1">कोई निदान इतिहास नहीं</h3>
          <p className="text-gray-500 mb-4">आप अभी तक कोई फसल निदान नहीं करवाए हैं</p>
          <Button>
            नया निदान करें
          </Button>
        </div>
      )}
    </div>
  );
};

export default DiagnosisHistory;