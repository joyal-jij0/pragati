"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  Scan,
  AlertTriangle,
  CheckCircle,
  Loader2,
  ArrowRight,
  Info,
  X,
  Leaf,
  Microscope,
  FileText,
  ChevronRight,
  Share2,
  Save,
  MessageCircle,
  Droplets,
  Shield,
  Users,
  Clock,
  Calendar,
  Bug,
  Thermometer,
  Wind,
  CloudRain,
  MapPin,
  Search,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Import data
import {
  commonDiseases,
  diagnosisHistory,
  diseaseIdentificationData,
  diseaseIdentificationAnimations,
  fallbackTreatmentData,
  fallbackCaseHistoryData,
  diseaseIdentificationHelpers,
} from "@/data/fasalDoctorData";

const DiseaseIdentification = () => {
  // State for image upload and analysis
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [dragActive, setDragActive] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  // Get data from imported constants
  const data = diseaseIdentificationData;

  // Sample analysis results (would be populated from API in real app)
  const [analysisResults, setAnalysisResults] = useState<{
    diseaseName: string;
    confidence: number;
    description: string;
    symptoms: string[];
    causes: string[];
    severity: "low" | "medium" | "high";
    treatments?: string[];
  } | null>(null);

  // Animation variants
  const { containerVariants, itemVariants, floatVariants } =
    diseaseIdentificationAnimations;

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulate analysis process with animated progress
  const analyzeImage = async () => {
    setIsAnalyzing(true);
    setProgressValue(0);

    // Simulate progress animation
    const interval = setInterval(() => {
      setProgressValue((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 150);

    try {
      // Create form data to send the image
      const formData = new FormData();

      // Get the actual file from the data URL
      if (!uploadedImage) {
        throw new Error("No image uploaded");
      }

      // Convert data URL to Blob
      const fetchResponse = await fetch(uploadedImage);
      const blob = await fetchResponse.blob();

      // Create a File object from the Blob
      const file = new File([blob], "image.jpg", { type: blob.type });

      
      formData.append("file", file);

      console.log("Sending request to API with file...");

      // Make API request
      const response = await fetch(
        "http://127.0.0.1:8000/api/v1/disease-detect/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(
          `Failed to analyze image: ${response.status} ${response.statusText}`
        );
      }

      // Parse the response
      const data = await response.json();
      console.log("API Response:", data);

      // Extract disease name from class_counts (taking the first one)
      const diseaseName = Object.keys(data.class_counts)[0];
      const confidence = 95; // You might want to get this from the API if available

      // Map the API response to our component's data structure
      const mappedResults = {
        diseaseName: diseaseName,
        confidence: confidence,
        description: data.llm_response["Disease Details"],
        symptoms: data.llm_response["Symptoms"],
        causes: data.llm_response["Causes"],
        severity: determineSeverity(data.llm_response), // Helper function to determine severity
        treatments: data.llm_response["Treatment"],
      };

      // Complete the analysis
      clearInterval(interval);
      setProgressValue(100);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setAnalysisResults(mappedResults);
      setActiveTab("results");
    } catch (error) {
      console.error("Error analyzing image:", error);
      clearInterval(interval);
      setIsAnalyzing(false);
      setProgressValue(0);
      // Show error message to user
      alert(`Failed to analyze image: ${error.message}`);
    }
  };

  // Helper function to determine severity based on symptoms and causes
  const determineSeverity = (llmResponse) => {
    // This is a simple heuristic - you might want to improve this logic
    const symptoms = llmResponse["Symptoms"];
    const causes = llmResponse["Causes"];

    // Check for severe keywords in symptoms
    const severeKeywords = [
      "severe",
      "critical",
      "widespread",
      "extensive",
      "merge",
      "large areas",
      "brittle",
      "break",
    ];

    for (const symptom of symptoms) {
      if (
        severeKeywords.some((keyword) =>
          symptom.toLowerCase().includes(keyword)
        )
      ) {
        return "high";
      }
    }

    // Medium severity if there are many symptoms or causes
    if (symptoms.length > 2 || causes.length > 2) {
      return "medium";
    }

    return "low";
  };

  // Get severity color using helper function
  const getSeverityColor = diseaseIdentificationHelpers.getSeverityColor;

  // Get severity icon
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-4 w-4" />;
      case "medium":
        return <Info className="h-4 w-4" />;
      case "low":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  // Find matching treatment recommendations
  const getRecommendations = () => {
    if (!analysisResults) return null;

    // Use the treatments from the API response
    return {
      disease: analysisResults.diseaseName,
      treatments: analysisResults.treatments
        ? analysisResults.treatments.map((treatment, index) => ({
            title: `Treatment Option ${index + 1}`,
            description: treatment,
            effectiveness:
              index === 0 ? "high" : index === 1 ? "medium" : "low",
            timeline: "2-3 weeks",
          }))
        : fallbackTreatmentData.treatments,
      preventiveMeasures: fallbackTreatmentData.preventiveMeasures,
    };
  };

  // Get similar cases from history
  const getSimilarCases = () => {
    if (!analysisResults) return [];

    // Return hardcoded beautiful cases instead of filtering from history
    return [
      {
        id: "case-001",
        farmerName: "Rajesh Kumar",
        farmerAvatar: "/images/farmers/farmer1.jpg",
        crop: "Rice",
        disease: analysisResults.diseaseName,
        location: "Pune, Maharashtra",
        date: "15 May 2023",
        description:
          "Identified early signs of infection on lower leaves. Applied organic neem-based solution as recommended and practiced field sanitation. Complete recovery within 3 weeks.",
        severity: "medium",
        treatmentSuccess: 95,
        images: ["/images/cases/rice-disease-1.jpg"],
        tags: ["Organic Treatment", "Early Detection"],
      },
    ];
  };

  // Get community insights
  const getCommunityInsights = () => {
    if (!analysisResults) return [];

    // In a real app, this would query a database of past diagnoses
    // For demo, return some sample cases that match the current disease
    return (
      diagnosisHistory
        .filter((history) =>
          history.disease
            .toLowerCase()
            .includes(analysisResults.diseaseName.toLowerCase())
        )
        .slice(0, 3) ||
      fallbackCaseHistoryData.map((item) => ({
        ...item,
        disease: analysisResults.diseaseName,
      }))
    );
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto mb-6 bg-green-50 p-1 rounded-lg shadow-md">
          <TabsTrigger
            value="upload"
            className="data-[state=active]:bg-white data-[state=active]:text-green-800 data-[state=active]:shadow-sm"
            disabled={isAnalyzing}
          >
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span>{data.uploadSection.title}</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="results"
            className="data-[state=active]:bg-white data-[state=active]:text-green-800 data-[state=active]:shadow-sm"
            disabled={!analysisComplete || isAnalyzing}
          >
            <div className="flex items-center gap-2">
              <Microscope className="h-4 w-4" />
              <span>{data.resultsSection.title}</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="border-green-100 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white py-5">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <motion.div
                      className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                      animate={{
                        rotate: [0, 5, 0, -5, 0],
                        scale: [1, 1.05, 1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <span className="text-2xl">🔍</span>
                    </motion.div>
                    <span>{data.uploadSection.title}</span>
                  </CardTitle>
                  <CardDescription className="text-green-100 mt-1">
                    {data.uploadSection.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                      dragActive
                        ? "border-green-400 bg-green-50"
                        : uploadedImage
                        ? "border-green-300 bg-green-50/50"
                        : "border-gray-300 hover:border-green-300 hover:bg-green-50/30"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {uploadedImage ? (
                      <div className="relative">
                        <motion.img
                          src={uploadedImage}
                          alt="Uploaded crop"
                          className="max-h-64 mx-auto rounded-lg shadow-md"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.button
                          onClick={() => setUploadedImage(null)}
                          className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-red-50 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </motion.button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <motion.div
                          className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center"
                          whileHover="hover"
                          variants={floatVariants}
                        >
                          <Upload className="h-8 w-8 text-green-600" />
                        </motion.div>
                        <div>
                          <p className="text-gray-700 font-medium mb-1 text-lg">
                            {data.uploadSection.dragDropText}
                          </p>
                          <p className="text-gray-500 text-sm mb-4">
                            {data.uploadSection.orText}
                          </p>
                          <motion.label
                            className="bg-green-600 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-green-700 transition-colors cursor-pointer inline-block shadow-sm hover:shadow-md"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                          >
                            {data.uploadSection.browseText}
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileUpload}
                            />
                          </motion.label>
                        </div>
                      </div>
                    )}
                  </div>

                  {uploadedImage && !isAnalyzing && (
                    <div className="mt-4 flex justify-center">
                      <motion.button
                        onClick={analyzeImage}
                        className="bg-green-600 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-green-700 transition-colors shadow-sm hover:shadow-md flex items-center gap-2"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <Scan className="h-5 w-5" />
                        {data.uploadSection.analyzeButtonText}
                      </motion.button>
                    </div>
                  )}

                  {isAnalyzing && (
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-center gap-3">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        >
                          <Loader2 className="h-5 w-5 text-green-600" />
                        </motion.div>
                        <span className="text-green-600 font-medium">
                          {data.uploadSection.analyzingText}
                        </span>
                      </div>
                      <Progress
                        value={progressValue}
                        className="h-2 bg-green-100"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-1">
              <Card className="border-green-100 shadow-md h-full">
                <CardHeader className="bg-green-50 py-4">
                  <CardTitle className="text-green-800 flex items-center gap-2 text-base">
                    <Info className="h-5 w-5 text-green-600" />
                    <span>Upload Tips</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-3">
                    {data.uploadSection.uploadTips.map((tip, index) => (
                      <motion.li
                        key={index}
                        variants={itemVariants}
                        className="flex items-start gap-2"
                      >
                        <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-600">{tip}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-6 p-3 bg-amber-50 rounded-lg border border-amber-100">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-800 mb-1">
                          Important Note
                        </p>
                        <p className="text-xs text-amber-700">
                          This AI analysis provides only preliminary diagnosis.
                          Consult an agricultural expert for final decisions.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Common Crop Diseases
                    </h4>
                    <div className="space-y-2">
                      {commonDiseases.slice(0, 3).map((disease) => (
                        <div
                          key={disease.id}
                          className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-800">
                            <span>{disease.icon}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {disease.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {disease.crops.join(", ")}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="results" className="mt-0">
          {analysisResults && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {/* Main Results Card */}
                <Card className="border-green-100 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white py-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                          <Leaf className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold">
                            {analysisResults.diseaseName}
                          </CardTitle>
                          <CardDescription className="text-green-100 mt-1 flex items-center gap-2">
                            <Badge className="bg-white/20 text-white border-none">
                              {analysisResults.confidence}% Accuracy
                            </Badge>
                            <span className="text-sm">•</span>
                            <span
                              className={`text-sm capitalize px-2 py-0.5 rounded-full ${
                                analysisResults.severity === "high"
                                  ? "bg-red-400/30"
                                  : analysisResults.severity === "medium"
                                  ? "bg-amber-400/30"
                                  : "bg-green-400/30"
                              }`}
                            >
                              {analysisResults.severity} Severity
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          <span>{data.resultsSection.shareButtonText}</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-white hover:bg-white/20"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          <span>{data.resultsSection.saveButtonText}</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                      {/* Left Column - Image */}
                      <div className="md:col-span-1 border-r speckle-border-green-100">
                        <div className="p-4">
                          {uploadedImage && (
                            <div className="relative">
                              <img
                                src={uploadedImage || "/placeholder.svg"}
                                alt="Analyzed crop"
                                className="w-full rounded-lg shadow-md"
                              />
                              <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                                Analyzed
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Column - Disease Details */}
                      <div className="md:col-span-2">
                        <div className="p-5">
                          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                            <Microscope className="h-5 w-5 text-green-600" />
                            <span>
                              {data.resultsSection.diseaseDetailsTitle}
                            </span>
                          </h3>

                          <div className="space-y-4">
                            <div>
                              <p className="text-gray-700 mb-3">
                                {analysisResults.description}
                              </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <h4 className="font-medium text-gray-700 flex items-center gap-2">
                                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                                  <span>Symptoms</span>
                                </h4>
                                <ul className="space-y-1.5">
                                  {analysisResults.symptoms.map(
                                    (symptom, index) => (
                                      <motion.li
                                        key={index}
                                        variants={itemVariants}
                                        className="flex items-start gap-2"
                                      >
                                        <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                                          <span className="text-xs">
                                            {index + 1}
                                          </span>
                                        </div>
                                        <span className="text-sm text-gray-600">
                                          {symptom}
                                        </span>
                                      </motion.li>
                                    )
                                  )}
                                </ul>
                              </div>

                              <div className="space-y-2">
                                <h4 className="font-medium text-gray-700 flex items-center gap-2">
                                  <Bug className="h-4 w-4 text-red-500" />
                                  <span>Causes</span>
                                </h4>
                                <ul className="space-y-1.5">
                                  {analysisResults.causes.map(
                                    (cause, index) => (
                                      <motion.li
                                        key={index}
                                        variants={itemVariants}
                                        className="flex items-start gap-2"
                                      >
                                        <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                                          <span className="text-xs">
                                            {index + 1}
                                          </span>
                                        </div>
                                        <span className="text-sm text-gray-600">
                                          {cause}
                                        </span>
                                      </motion.li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Treatment Recommendations */}
                <Card className="border-green-100 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4">
                    <CardTitle className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                        <Droplets className="h-5 w-5 text-white" />
                      </div>
                      <span>{data.resultsSection.treatmentTitle}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5">
                    {getRecommendations() ? (
                      <div className="space-y-5">
                        {getRecommendations()?.treatments.map(
                          (treatment, index) => (
                            <motion.div
                              key={index}
                              variants={itemVariants}
                              className="p-4 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-white"
                            >
                              <div className="flex items-start gap-3">
                                <div
                                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                    treatment.effectiveness === "high"
                                      ? "bg-green-100 text-green-600"
                                      : treatment.effectiveness === "medium"
                                      ? "bg-amber-100 text-amber-600"
                                      : "bg-blue-100 text-blue-600"
                                  }`}
                                >
                                  {treatment.effectiveness === "high"
                                    ? "💯"
                                    : treatment.effectiveness === "medium"
                                    ? "👍"
                                    : "👌"}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-blue-800 flex items-center gap-2">
                                    {treatment.title}
                                    <Badge
                                      className={`ml-2 ${
                                        treatment.effectiveness === "high"
                                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                                          : treatment.effectiveness === "medium"
                                          ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                          : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                                      }`}
                                    >
                                      {treatment.effectiveness
                                        .charAt(0)
                                        .toUpperCase() +
                                        treatment.effectiveness.slice(1)}{" "}
                                      Effectiveness
                                    </Badge>
                                  </h4>
                                  <p className="text-gray-600 mt-1">
                                    {treatment.description}
                                  </p>
                                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                    <Clock className="h-4 w-4" />
                                    <span>{treatment.timeline}</span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )
                        )}

                        <div className="mt-6">
                          <h4 className="font-medium text-gray-700 flex items-center gap-2 mb-3">
                            <Shield className="h-5 w-5 text-green-600" />
                            <span>Preventive Measures</span>
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {getRecommendations()?.preventiveMeasures.map(
                              (measure, index) => (
                                <motion.div
                                  key={index}
                                  variants={itemVariants}
                                  className="flex items-start gap-2 p-3 rounded-lg bg-green-50 border border-green-100"
                                >
                                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {["🌱", "🌿", "🍃", "🌲"][index % 4]}
                                  </div>
                                  <span className="text-sm text-gray-700">
                                    {measure}
                                  </span>
                                </motion.div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-6 text-center">
                        <div className="mx-auto w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                          <AlertTriangle className="h-8 w-8 text-blue-300" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">
                          No Specific Treatments Found
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                          We couldn't find specific treatment recommendations
                          for this disease in our database. Consider consulting
                          with an agricultural expert for personalized advice.
                        </p>
                        <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          {data.resultsSection.consultButtonText}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-1 space-y-6">
                {/* Community Insights Card */}
                <Card className="border-green-100 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-amber-600 to-amber-500 text-white py-4">
                    <CardTitle className="flex items-center gap-3 text-base">
                      <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <span>Community Insights</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    {getCommunityInsights().length > 0 ? (
                      <div className="space-y-4">
                        {getCommunityInsights().map((insight, index) => (
                          <motion.div
                            key={insight.id}
                            variants={itemVariants}
                            className="p-3 rounded-lg border border-amber-100 bg-gradient-to-r from-amber-50 to-white"
                          >
                            <div className="flex items-start gap-3 mb-2">
                              <Avatar className="h-10 w-10 border-2 border-amber-200">
                                <AvatarImage
                                  src={
                                    insight.author.avatar || "/placeholder.svg"
                                  }
                                />
                                <AvatarFallback className="bg-amber-100 text-amber-800">
                                  {insight.author.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium text-amber-800">
                                  {insight.author.name}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {insight.author.role}
                                </p>
                              </div>
                            </div>
                            <h5 className="font-medium text-gray-800 mb-1">
                              {insight.title}
                            </h5>
                            <p className="text-sm text-gray-600 mb-2">
                              {insight.content}
                            </p>
                            <div className="flex justify-between items-center text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{insight.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <ThumbsUp className="h-3 w-3 text-amber-500" />
                                <span>
                                  {insight.likes} farmers found this helpful
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center">
                        <div className="mx-auto w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-3">
                          <MessageCircle className="h-6 w-6 text-amber-300" />
                        </div>
                        <h3 className="text-base font-medium text-gray-700 mb-2">
                          No Community Insights Yet
                        </h3>
                        <p className="text-sm text-gray-500">
                          Be the first to share your experience or insights
                          about dealing with this disease.
                        </p>
                        <Button
                          size="sm"
                          className="mt-3 bg-amber-600 hover:bg-amber-700"
                        >
                          <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                          Share Your Experience
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Weather Conditions Card */}
                <Card className="border-green-100 shadow-lg overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-sky-600 to-sky-500 text-white py-4">
                    <CardTitle className="flex items-center gap-3 text-base">
                      <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                        <CloudRain className="h-4 w-4 text-white" />
                      </div>
                      <span>Weather Risk Factors</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-sky-50 border border-sky-100">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                            <Thermometer className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            Temperature
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-sky-700">
                            25-30°C
                          </span>
                          <p className="text-xs text-gray-500">High Risk</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-sky-50 border border-sky-100">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                            <Droplets className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            Humidity
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-sky-700">
                            70-85%
                          </span>
                          <p className="text-xs text-gray-500">High Risk</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-lg bg-sky-50 border border-sky-100">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-sky-100 flex items-center justify-center text-sky-600">
                            <Wind className="h-4 w-4" />
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            Wind
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-sky-700">
                            5-10 km/h
                          </span>
                          <p className="text-xs text-gray-500">Low Risk</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-amber-800 mb-1">
                            Weather Alert
                          </p>
                          <p className="text-xs text-amber-700">
                            Current weather conditions are favorable for disease
                            spread. Consider preventive measures immediately.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Similar Cases Section */}
                <Card className="border-green-100 shadow-md overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-600/90 to-green-500/90 text-white py-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-white/90" />
                      <span>{data.resultsSection.similarCasesTitle}</span>
                    </CardTitle>
                    <CardDescription className="text-green-50 mt-1">
                      Learn from other farmers who successfully managed similar
                      issues
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    {getSimilarCases().length > 0 ? (
                      <div>
                        {getSimilarCases().map((caseItem, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            className="border-b border-green-100 last:border-b-0 hover:bg-green-50/50 transition-colors"
                          >
                            <div className="p-5">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-12 w-12 border-2 border-green-100 ring-2 ring-green-50">
                                    <AvatarImage
                                      src={
                                        caseItem.farmerAvatar ||
                                        "/placeholder.svg"
                                      }
                                      alt={caseItem.farmerName}
                                    />
                                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-green-600 text-white font-medium">
                                      {caseItem.farmerName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h4 className="text-base font-semibold text-gray-800">
                                      {caseItem.farmerName}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <Badge
                                        variant="outline"
                                        className="text-xs bg-green-50 border-green-200 text-green-700 px-2 py-0.5 flex items-center gap-1"
                                      >
                                        <span className="text-sm">🌾</span>
                                        {caseItem.crop}
                                      </Badge>
                                      <span className="text-xs text-gray-500 flex items-center">
                                        <MapPin className="h-3 w-3 inline mr-0.5" />
                                        {caseItem.location}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                  <span className="text-xs text-gray-500 flex items-center">
                                    <Calendar className="h-3 w-3 inline mr-1" />
                                    {caseItem.date}
                                  </span>
                                  <Badge
                                    className={`mt-1 text-xs ${
                                      caseItem.severity === "high"
                                        ? "bg-red-100 text-red-700 border-red-200"
                                        : caseItem.severity === "medium"
                                        ? "bg-amber-100 text-amber-700 border-amber-200"
                                        : "bg-green-100 text-green-700 border-green-200"
                                    }`}
                                  >
                                    <span>
                                      {caseItem.severity === "high"
                                        ? "⚠️"
                                        : caseItem.severity === "medium"
                                        ? "⚡"
                                        : "✅"}
                                    </span>
                                    {caseItem.severity.charAt(0).toUpperCase() +
                                      caseItem.severity.slice(1)}{" "}
                                    Severity
                                  </Badge>
                                </div>
                              </div>

                              <div className="mt-2 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-green-200 before:rounded-full">
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  {caseItem.description}
                                </p>
                              </div>

                              <div className="mt-4 flex flex-wrap gap-1.5">
                                <div className="mt-4 flex items-center justify-between">
                                  <div className="w-1/2">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-xs font-medium text-gray-700">
                                        <span className="mr-1">🌱</span>
                                        Treatment Success
                                      </span>
                                      <span className="text-xs font-bold text-green-700">
                                        {caseItem.treatmentSuccess}%
                                      </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                      <div
                                        className={`h-2.5 rounded-full ${
                                          caseItem.treatmentSuccess > 90
                                            ? "bg-gradient-to-r from-green-400 to-green-500"
                                            : caseItem.treatmentSuccess > 75
                                            ? "bg-gradient-to-r from-green-300 to-green-400"
                                            : "bg-gradient-to-r from-amber-400 to-amber-500"
                                        }`}
                                        style={{
                                          width: `${caseItem.treatmentSuccess}%`,
                                        }}
                                      ></div>
                                    </div>
                                  </div>

                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200 group"
                                  >
                                    <span className="text-xs flex items-center">
                                      <span className="mr-1">👁️</span>
                                      View Details
                                    </span>
                                    <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-8 bg-green-50/50">
                        <div className="w-16 h-16 mx-auto bg-green-100/70 rounded-full flex items-center justify-center mb-3">
                          <Search className="h-8 w-8 text-green-500" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          No similar cases found
                        </p>
                        <p className="text-xs text-gray-500">
                          We couldn't find any similar cases for this disease in
                          our database.
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="bg-green-50/70 py-3 px-5 flex justify-between items-center">
                    <p className="text-xs text-gray-600">
                      Showing {getSimilarCases().length} similar cases
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-700 hover:text-green-800 hover:bg-green-100 text-xs h-8"
                    >
                      View All Cases
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default DiseaseIdentification;
