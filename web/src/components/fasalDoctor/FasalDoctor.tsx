"use client";

import type React from "react";

import { useState, useRef } from "react";
import {
  FaCamera,
  FaExclamationCircle,
  FaComments,
  FaUsers,
  FaLeaf,
  FaChevronDown,
  FaChevronUp,
  FaPaperPlane,
  FaImage,
  FaCheckCircle,
  FaInfoCircle,
  FaSeedling,
  FaFlask,
  FaShieldAlt,
  FaTimesCircle,
} from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export default function FasalDoctorPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<
    Array<{ type: string; text: string; image?: string }>
  >([
    {
      type: "ai",
      text: "Hello! I'm your AI crop assistant. How can I help you with your crop health today?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatImage, setChatImage] = useState<string | null>(null);
  const chatFileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsAnalyzing(true);
      // Simulate AI analysis
      setTimeout(() => {
        setDiagnosis({
          disease: "Tomato Powdery Mildew",
          confidence: 92,
          symptoms: [
            "White powdery spots on leaves",
            "Yellowing of affected leaves",
            "Reduced plant vigor",
            "Premature leaf drop",
          ],
          lifecycle: "5-7 days under favorable conditions",
          severity: "Moderate to High",
          description:
            "Powdery mildew is a fungal disease that affects tomato plants. It appears as a white powdery substance on leaves, stems, and sometimes fruit.",
        });
        setIsAnalyzing(false);

        // Add AI message about diagnosis
        setMessages((prev) => [
          ...prev,
          {
            type: "ai",
            text: `I've analyzed your image and detected Tomato Powdery Mildew with 92% confidence. This fungal disease appears as white powdery spots on leaves and can spread rapidly in humid conditions.`,
          },
        ]);

        scrollToBottom();
      }, 2000);
    }
  };

  const handleChatImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setChatImage(imageUrl);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() && !chatImage) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: inputMessage,
        image: chatImage || undefined,
      },
    ]);

    // Clear input and image
    setInputMessage("");
    setChatImage(null);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: chatImage
            ? "I've analyzed your image. This appears to be a tomato plant affected by powdery mildew. Would you like me to provide treatment recommendations?"
            : "I'll help you with that. Could you provide more details or upload an image of the affected crop?",
        },
      ]);
      scrollToBottom();
    }, 1000);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 py-4 flex flex-col animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Fasal Doctor</h1>
          <p className="text-gray-600 text-sm">
            AI-powered pest & disease diagnosis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <FaLeaf className="mr-1 h-3 w-3" /> Gyan Dhara
          </Badge>
        </div>
      </div>

      {/* Main content area with grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-grow overflow-hidden">
        {/* Left Column - Make it scrollable */}
        <div className="lg:col-span-8 overflow-y-auto pr-2 space-y-4 pb-2">
          {/* Tabs for different sections */}
          <Tabs defaultValue="diagnosis" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="diagnosis" className="text-sm">
                <FaCamera className="mr-2 h-3 w-3" /> Diagnosis
              </TabsTrigger>
              <TabsTrigger value="history" className="text-sm">
                <FaLeaf className="mr-2 h-3 w-3" /> History
              </TabsTrigger>
              <TabsTrigger value="tips" className="text-sm">
                <FaInfoCircle className="mr-2 h-3 w-3" /> Tips
              </TabsTrigger>
            </TabsList>

            <TabsContent value="diagnosis" className="space-y-4">
              {/* Image Upload Card */}
              <Card className="overflow-hidden border-green-100">
                <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                  <CardTitle className="flex items-center gap-2">
                    <FaCamera className="h-4 w-4 text-green-600" />
                    Upload Crop Image
                  </CardTitle>
                  <CardDescription>
                    Upload a clear image of your crop for AI diagnosis
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg transition-all",
                      isAnalyzing
                        ? "border-green-300 bg-green-50"
                        : "border-gray-200 hover:border-green-300",
                      "relative"
                    )}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer block p-6"
                    >
                      <div className="space-y-4 text-center">
                        {isAnalyzing ? (
                          <div className="flex flex-col items-center justify-center py-4">
                            <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                            <p className="text-green-600 font-medium">
                              Analyzing your crop...
                            </p>
                            <p className="text-green-500 text-sm">
                              Using AI to identify diseases and pests
                            </p>
                          </div>
                        ) : previewUrl ? (
                          <div className="relative">
                            <img
                              src={previewUrl || "/placeholder.svg"}
                              alt="Selected crop"
                              className="max-h-64 mx-auto rounded-lg"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedImage(null);
                                setPreviewUrl(null);
                                setDiagnosis(null);
                              }}
                            >
                              <FaTimesCircle className="mr-1 h-3 w-3" />
                              Change
                            </Button>
                          </div>
                        ) : (
                          <>
                            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                              <FaCamera className="w-8 h-8 text-green-600" />
                            </div>
                            <p className="text-gray-600">
                              Drop your image here, or click to browse
                            </p>
                            <p className="text-xs text-gray-500">
                              Supports: JPG, PNG (max 5MB)
                            </p>
                            <div className="pt-2 flex justify-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <FaCheckCircle className="text-green-500" />
                                <span>Good lighting</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FaCheckCircle className="text-green-500" />
                                <span>Clear focus</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FaCheckCircle className="text-green-500" />
                                <span>Close-up of symptoms</span>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Diagnosis Results */}
              {diagnosis && (
                <Card className="border-green-100 overflow-hidden">
                  <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <FaLeaf className="h-4 w-4 text-green-600" />
                        Diagnosis Results
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-green-100 text-green-700 hover:bg-green-200"
                      >
                        {diagnosis.confidence}% Confidence
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                        <FaExclamationCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-800">
                          {diagnosis.disease}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Severity: {diagnosis.severity}
                        </p>
                        <div className="mt-2">
                          <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium">
                              Confidence Score
                            </span>
                            <span className="text-xs font-medium">
                              {diagnosis.confidence}%
                            </span>
                          </div>
                          <Progress
                            value={diagnosis.confidence}
                            className="h-2 bg-gray-100"
                            indicatorClassName="bg-green-600"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-md border border-blue-100 text-sm flex gap-2">
                      <FaInfoCircle className="h-5 w-5 flex-shrink-0 text-blue-500 mt-0.5" />
                      <p className="text-blue-700">{diagnosis.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-700 text-sm flex items-center gap-1">
                          <FaInfoCircle className="h-3 w-3 text-green-600" />{" "}
                          Symptoms:
                        </h4>
                        <ul className="text-gray-600 space-y-1 text-sm">
                          {diagnosis.symptoms.map(
                            (symptom: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0 h-3 w-3" />
                                <span>{symptom}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-700 text-sm flex items-center gap-1">
                          <FaInfoCircle className="h-3 w-3 text-green-600" />{" "}
                          Disease Lifecycle:
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {diagnosis.lifecycle}
                        </p>
                        <div className="pt-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white text-xs"
                          >
                            <FaInfoCircle className="mr-1 h-3 w-3" /> Learn More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Treatment Recommendations */}
              {diagnosis && (
                <Collapsible
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  className="w-full"
                >
                  <Card className="border-green-100 overflow-hidden">
                    <CardHeader className="pb-2 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <FaSeedling className="h-4 w-4 text-green-600" />
                          Treatment Recommendations
                        </CardTitle>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-9 p-0">
                            {isOpen ? (
                              <FaChevronUp className="h-4 w-4" />
                            ) : (
                              <FaChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    </CardHeader>
                    <CollapsibleContent>
                      <CardContent className="pt-4 px-4 pb-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <Card className="bg-white border-green-100">
                            <CardHeader className="py-3 px-4 bg-blue-50 border-b border-blue-100">
                              <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <FaLeaf className="h-3 w-3 text-blue-600" />
                                Cultural Control
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="py-3 px-4">
                              <ul className="space-y-2 text-gray-600 text-sm">
                                <li className="flex items-start gap-2">
                                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0 h-3 w-3" />
                                  <span>
                                    Improve air circulation between plants
                                  </span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0 h-3 w-3" />
                                  <span>Avoid overhead irrigation</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0 h-3 w-3" />
                                  <span>
                                    Remove and destroy infected plant parts
                                  </span>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="bg-white border-green-100">
                            <CardHeader className="py-3 px-4 bg-emerald-50 border-b border-emerald-100">
                              <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <FaSeedling className="h-3 w-3 text-emerald-600" />
                                Biological Control
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="py-3 px-4">
                              <ul className="space-y-2 text-gray-600 text-sm">
                                <li className="flex items-start gap-2">
                                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0 h-3 w-3" />
                                  <span>Apply Bacillus subtilis</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0 h-3 w-3" />
                                  <span>Use neem-based products</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0 h-3 w-3" />
                                  <span>
                                    Introduce beneficial microorganisms
                                  </span>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>

                          <Card className="bg-white border-green-100">
                            <CardHeader className="py-3 px-4 bg-amber-50 border-b border-amber-100">
                              <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <FaFlask className="h-3 w-3 text-amber-600" />
                                Chemical Control
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="py-3 px-4">
                              <ul className="space-y-2 text-gray-600 text-sm">
                                <li className="flex items-start gap-2">
                                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0 h-3 w-3" />
                                  <span>Use sulfur-based fungicides</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0 h-3 w-3" />
                                  <span>Apply at early disease onset</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <FaShieldAlt className="text-amber-500 mt-1 flex-shrink-0 h-3 w-3" />
                                  <span>
                                    Follow safety guidelines (7 days PHI)
                                  </span>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              )}

              {/* Expert Connect and Quick Tips moved below diagnostic results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Expert Connect */}
                <Card className="border-purple-100 overflow-hidden">
                  <CardHeader className="pb-3 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
                    <CardTitle className="flex items-center gap-2">
                      <FaUsers className="h-4 w-4 text-purple-600" />
                      Expert Connect
                    </CardTitle>
                    <CardDescription>
                      Get personalized advice from certified agriculture experts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3 mb-3">
                      {[
                        {
                          name: "Dr. Priya Sharma",
                          role: "Plant Pathologist",
                          org: "KVK Sonipat",
                        },
                        {
                          name: "Dr. Rajesh Kumar",
                          role: "Entomologist",
                          org: "Haryana Agricultural University",
                        },
                      ].map((expert, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2 border rounded-md hover:bg-purple-50 transition-colors"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`/placeholder.svg?height=32&width=32`}
                              alt={expert.name}
                            />
                            <AvatarFallback className="bg-purple-100 text-purple-600">
                              {expert.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">
                              {expert.name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {expert.role}, {expert.org}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0"
                          >
                            <FaComments className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white">
                      <FaUsers className="w-4 h-4" />
                      Connect with Expert
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Tips */}
                <Card className="border-amber-100 overflow-hidden">
                  <CardHeader className="pb-3 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
                    <CardTitle className="flex items-center gap-2">
                      <FaLeaf className="w-4 h-4 text-amber-600" />
                      Quick Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 p-4">
                    <div className="bg-white rounded-md p-3 border border-amber-100 flex items-start gap-2">
                      <FaInfoCircle className="text-amber-500 mt-1 flex-shrink-0 h-4 w-4" />
                      <p className="text-sm text-gray-700">
                        Take photos in natural light for better diagnosis
                        accuracy
                      </p>
                    </div>
                    <div className="bg-white rounded-md p-3 border border-amber-100 flex items-start gap-2">
                      <FaInfoCircle className="text-amber-500 mt-1 flex-shrink-0 h-4 w-4" />
                      <p className="text-sm text-gray-700">
                        Include both healthy and affected parts of the plant
                      </p>
                    </div>
                    <div className="bg-white rounded-md p-3 border border-amber-100 flex items-start gap-2">
                      <FaInfoCircle className="text-amber-500 mt-1 flex-shrink-0 h-4 w-4" />
                      <p className="text-sm text-gray-700">
                        For best results, take multiple photos from different
                        angles
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                  <CardTitle>Diagnosis History</CardTitle>
                  <CardDescription>
                    Your previous crop diagnoses and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {[
                      {
                        date: "April 15, 2025",
                        disease: "Tomato Powdery Mildew",
                        confidence: 92,
                      },
                      {
                        date: "April 10, 2025",
                        disease: "Rice Blast",
                        confidence: 88,
                      },
                      {
                        date: "April 5, 2025",
                        disease: "Wheat Rust",
                        confidence: 95,
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 border rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <div className="h-16 w-16 bg-gray-200 rounded-md overflow-hidden relative flex-shrink-0">
                          <Image
                            src={`/placeholder.svg?height=64&width=64`}
                            alt="Crop image"
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{item.disease}</h3>
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-700"
                            >
                              {item.confidence}%
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Diagnosed on {item.date}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-shrink-0"
                        >
                          <FaChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tips">
              <Card>
                <CardHeader className="pb-3 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
                  <CardTitle>Preventive Measures</CardTitle>
                  <CardDescription>
                    Best practices to prevent common crop diseases
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-amber-50 border-amber-100">
                      <h3 className="flex items-center gap-2 font-medium text-amber-800 mb-2">
                        <FaExclamationCircle className="h-4 w-4 text-amber-600" />{" "}
                        Seasonal Alert
                      </h3>
                      <p className="text-amber-700">
                        Current weather conditions favor the development of
                        powdery mildew in tomato crops. Consider preventive
                        spraying.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          title: "Crop Rotation",
                          desc: "Rotate crops to prevent buildup of soil-borne diseases",
                          icon: (
                            <FaSeedling className="h-5 w-5 text-green-600" />
                          ),
                        },
                        {
                          title: "Proper Spacing",
                          desc: "Ensure adequate spacing between plants for air circulation",
                          icon: <FaLeaf className="h-5 w-5 text-green-600" />,
                        },
                        {
                          title: "Water Management",
                          desc: "Water at the base of plants to keep foliage dry",
                          icon: <FaLeaf className="h-5 w-5 text-green-600" />,
                        },
                        {
                          title: "Resistant Varieties",
                          desc: "Choose disease-resistant varieties when available",
                          icon: (
                            <FaSeedling className="h-5 w-5 text-green-600" />
                          ),
                        },
                      ].map((tip, i) => (
                        <div
                          key={i}
                          className="flex gap-3 p-4 border rounded-lg hover:bg-green-50 transition-colors"
                        >
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                            {tip.icon}
                          </div>
                          <div>
                            <h3 className="font-medium">{tip.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {tip.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* AI Assistant - Right Column (Full Height) */}
        <div className="lg:col-span-4 h-full">
          <Card className="h-full flex flex-col border-blue-100 overflow-hidden">
            <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
              <CardTitle className="flex items-center gap-2">
                <FaComments className="h-4 w-4 text-blue-600" />
                AI Assistant
              </CardTitle>
              <CardDescription>
                Get instant answers about crop diseases and treatments
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col p-0">
              <div className="flex-grow bg-gray-50 p-3 overflow-y-auto border-b border-gray-100">
                <div className="space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-2 ${
                        message.type === "user" ? "justify-end" : ""
                      }`}
                    >
                      {message.type === "ai" && (
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <FaComments className="w-4 h-4 text-blue-600" />
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] p-3 rounded-lg ${
                          message.type === "ai"
                            ? "bg-white shadow-sm border border-blue-100 rounded-tl-none"
                            : "bg-green-100 text-green-800 rounded-tr-none"
                        }`}
                      >
                        {message.image && (
                          <div className="mb-2 rounded-md overflow-hidden">
                            <img
                              src={message.image || "/placeholder.svg"}
                              alt="Uploaded crop"
                              className="max-h-40 w-auto"
                            />
                          </div>
                        )}
                        <p className="text-sm">{message.text}</p>
                      </div>
                      {message.type === "user" && (
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <FaUsers className="w-4 h-4 text-green-600" />
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Chat image preview */}
              {chatImage && (
                <div className="p-2 border-t border-blue-100 bg-blue-50">
                  <div className="relative inline-block">
                    <img
                      src={chatImage || "/placeholder.svg"}
                      alt="Preview"
                      className="h-16 rounded-md"
                    />
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/3 -translate-y-1/3"
                      onClick={() => setChatImage(null)}
                    >
                      <FaTimesCircle className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Add image upload and chat input */}
              <div className="p-3 border-t border-blue-100">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask about your crop..."
                    className="flex-grow px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                  <Button
                    className="bg-green-600 hover:bg-green-700 flex-shrink-0"
                    onClick={handleSendMessage}
                  >
                    <FaPaperPlane className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative flex-grow">
                    <input
                      type="file"
                      accept="image/*"
                      id="chat-image-upload"
                      className="hidden"
                      ref={chatFileInputRef}
                      onChange={handleChatImageUpload}
                    />
                    <label
                      htmlFor="chat-image-upload"
                      className="flex items-center justify-center gap-2 w-full py-2 px-3 text-xs border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                    >
                      <FaImage className="w-3 h-3 text-gray-500" />
                      <span className="text-gray-600">
                        Upload image to chat
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FaChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      fill="currentColor"
      {...props}
    >
      <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
    </svg>
  );
}
