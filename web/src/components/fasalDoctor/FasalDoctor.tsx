"use client"

import type React from "react"

import { useState } from "react"
import { Camera, AlertCircle, MessagesSquare, Users, Leaf, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function FasalDoctorPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [diagnosis, setDiagnosis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isOpen, setIsOpen] = useState(true)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setIsAnalyzing(true)
      // Simulate AI analysis
      setTimeout(() => {
        setDiagnosis({
          disease: "Tomato Powdery Mildew",
          confidence: 92,
          symptoms: ["White powdery spots on leaves", "Yellowing of affected leaves", "Reduced plant vigor"],
          lifecycle: "5-7 days under favorable conditions",
          severity: "Moderate to High",
        })
        setIsAnalyzing(false)
      }, 2000)
    }
  }

  return (
    <div className="h-[calc(100vh-4rem)] max-w-7xl mx-auto px-4 py-6 flex flex-col animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Fasal Doctor</h1>
          <p className="text-gray-600 text-sm">AI-powered pest & disease diagnosis</p>
        </div>
      </div>

      {/* Main content area with grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-grow overflow-hidden">
        {/* Left Column - Make it scrollable */}
        <div className="lg:col-span-8 overflow-y-auto pr-2 space-y-5">
          {/* Image Upload Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Upload Crop Image</CardTitle>
              <CardDescription>Upload a clear image of your crop for AI diagnosis</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg transition-all",
                  isAnalyzing ? "border-green-300 bg-green-50" : "border-gray-200 hover:border-green-300",
                  "relative",
                )}
              >
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
                <label htmlFor="image-upload" className="cursor-pointer block p-6">
                  <div className="space-y-4 text-center">
                    {isAnalyzing ? (
                      <div className="flex flex-col items-center justify-center py-4">
                        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                        <p className="text-green-600 font-medium">Analyzing your crop...</p>
                      </div>
                    ) : selectedImage ? (
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(selectedImage) || "/placeholder.svg"}
                          alt="Selected crop"
                          className="max-h-64 mx-auto rounded-lg"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                          onClick={(e) => {
                            e.preventDefault()
                            setSelectedImage(null)
                            setDiagnosis(null)
                          }}
                        >
                          Change
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="w-14 h-14 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                          <Camera className="w-7 h-7 text-green-600" />
                        </div>
                        <p className="text-gray-600">Drop your image here, or click to browse</p>
                        <p className="text-xs text-gray-500">Supports: JPG, PNG (max 5MB)</p>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Diagnosis Results */}
          {diagnosis && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Diagnosis Results</CardTitle>
                  <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-200">
                    {diagnosis.confidence}% Confidence
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{diagnosis.disease}</h3>
                    <p className="text-sm text-gray-500">Severity: {diagnosis.severity}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700 text-sm">Symptoms:</h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      {diagnosis.symptoms.map((symptom: string) => (
                        <li key={symptom} className="flex items-start gap-2">
                          <span className="text-green-600 mt-1">•</span>
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700 text-sm">Disease Lifecycle:</h4>
                    <p className="text-gray-600 text-sm">{diagnosis.lifecycle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Treatment Recommendations */}
          {diagnosis && (
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Treatment Recommendations</CardTitle>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-9 p-0">
                        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Card className="bg-white border-green-100">
                        <CardHeader className="py-3 px-4">
                          <CardTitle className="text-sm font-medium">Cultural Control</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2 px-4">
                          <ul className="space-y-1 text-gray-600 text-xs">
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">•</span>
                              <span>Improve air circulation between plants</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">•</span>
                              <span>Avoid overhead irrigation</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">•</span>
                              <span>Remove and destroy infected plant parts</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-white border-green-100">
                        <CardHeader className="py-3 px-4">
                          <CardTitle className="text-sm font-medium">Biological Control</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2 px-4">
                          <ul className="space-y-1 text-gray-600 text-xs">
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">•</span>
                              <span>Apply Bacillus subtilis</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">•</span>
                              <span>Use neem-based products</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">•</span>
                              <span>Introduce beneficial microorganisms</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-white border-green-100">
                        <CardHeader className="py-3 px-4">
                          <CardTitle className="text-sm font-medium">Chemical Control</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2 px-4">
                          <ul className="space-y-1 text-gray-600 text-xs">
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">•</span>
                              <span>Use sulfur-based fungicides</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">•</span>
                              <span>Apply at early disease onset</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">•</span>
                              <span>Follow safety guidelines</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Expert Connect */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Expert Connect</CardTitle>
                <CardDescription>Get personalized advice from certified agriculture experts</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <Button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white">
                  <Users className="w-4 h-4" />
                  Connect with Expert
                </Button>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-100">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-600" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pb-3">
                <div className="bg-white rounded-md p-3 border border-amber-100">
                  <p className="text-sm text-gray-700">Take photos in natural light for better diagnosis accuracy</p>
                </div>
                <div className="bg-white rounded-md p-3 border border-amber-100">
                  <p className="text-sm text-gray-700">Include both healthy and affected parts of the plant</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Assistant - Right Column (Full Height) */}
        <div className="lg:col-span-4 h-full">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Get instant answers about crop diseases and treatments</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <div className="flex-grow bg-gray-50 rounded-md p-4 mb-4 overflow-y-auto border border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <MessagesSquare className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-gray-100 text-sm">
                      <p>Hello! I'm your AI crop assistant. How can I help you with your crop health today?</p>
                    </div>
                  </div>

                  {diagnosis && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <MessagesSquare className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-gray-100 text-sm">
                        <p>
                          I've analyzed your image and detected {diagnosis.disease}. Would you like to know more about
                          treatment options?
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Add image upload and chat input */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask about your crop..."
                    className="flex-grow px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <Button className="bg-green-600 hover:bg-green-700">
                    <MessagesSquare className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <div className="relative flex-grow">
                    <input type="file" accept="image/*" id="chat-image-upload" className="hidden" />
                    <label
                      htmlFor="chat-image-upload"
                      className="flex items-center justify-center gap-2 w-full py-2 px-3 text-sm border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                    >
                      <Camera className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">Upload image to chat</span>
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
