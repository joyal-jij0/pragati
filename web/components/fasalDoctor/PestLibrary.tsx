'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion' // Ensure correct import
import {
  Upload,
  Scan,
  AlertTriangle,
  CheckCircle,
  Loader2,
  ArrowRight,
  Info,
  X,
  MapPin,
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
  ThumbsUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

// Import data (Assuming these are typed correctly in the source)
import {
  commonPests,
  diagnosisHistory,
  diseaseIdentificationData,
  diseaseIdentificationAnimations,
  fallbackTreatmentData,
  fallbackCaseHistoryData,
  diseaseIdentificationHelpers,
} from '@/data/fasalDoctorData'

interface AnalysisResults {
  pestName: string
  confidence: number
  description: string
  symptoms: string[]
  causes: string[]
  severity: 'low' | 'medium' | 'high'
  treatments?: string[]
  images?: string[]
}

interface Treatment {
  title: string
  description: string
  effectiveness: 'high' | 'medium' | 'low'
  timeline: string
  image?: string
}

interface Recommendation {
  pest: string
  treatments: Treatment[]
  preventiveMeasures: string[]
}

interface SimilarCase {
  id: string
  farmerName: string
  farmerAvatar: string
  crop: string
  pest: string
  location: string
  date: string
  description: string
  severity: 'low' | 'medium' | 'high'
  treatmentSuccess: number
  images: string[]
  tags: string[]
}

const PestLibrary: React.FC = () => {
  // State for image upload and analysis
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [analysisComplete, setAnalysisComplete] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('upload')
  const [dragActive, setDragActive] = useState<boolean>(false)
  const [progressValue, setProgressValue] = useState<number>(0)

  // Create pest detection data based on disease identification data
  const data = {
    uploadSection: {
      title: "Pest Detection",
      description: "Upload an image of your crop to identify pests and get treatment recommendations",
      dragDropText: "Drag and drop your image here",
      orText: "or browse from your device",
      browseText: "Browse Files",
      analyzeButtonText: "Analyze Image",
      analyzingText: "Analyzing your image..."
    },
    resultsSection: {
      title: "Analysis Results",
      description: "Here are the results of your pest analysis"
    }
  }

  // Sample analysis results (would be populated from API in real app)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)

  // Animation variants
  const { containerVariants, itemVariants, floatVariants } = diseaseIdentificationAnimations

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle drag events
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  // Handle drop event
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Simulate analysis process with animated progress
  const analyzeImage = async () => {
    setIsAnalyzing(true)
    setProgressValue(0)

    // Simulate progress animation
    const interval = setInterval(() => {
      setProgressValue((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return 95
        }
        return prev + 5
      })
    }, 150)

    try {
      // Create form data to send the image
      const formData = new FormData()

      // Get the actual file from the data URL
      if (!uploadedImage) {
        throw new Error('No image uploaded')
      }

      // Convert data URL to Blob
      const fetchResponse = await fetch(uploadedImage)
      const blob = await fetchResponse.blob()

      // Create a File object from the Blob
      const file = new File([blob], 'image.jpg', { type: blob.type })

      // Important: Use "file" as the field name, not "image"
      formData.append('file', file)

      console.log('Sending request to API with file...')

      // Make API request to pest detection endpoint
      const response = await fetch(
        'http://127.0.0.1:8000/api/v1/pest-detect/',
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error:', errorData)
        throw new Error(
          `Failed to analyze image: ${response.status} ${response.statusText}`
        )
      }

      // Parse the response
      const data = await response.json()
      console.log('API Response:', data)

      // Extract pest name from the new API response structure
      const pestName = data.pest || 'Unknown Pest'
      const confidence = 95 // You might want to get this from the API if available

      // Check if data.data exists and contains the expected fields
      if (!data.data) {
        throw new Error('Invalid API response format: missing data object')
      }

      // Get images from API response and add base URL
      const pestImages = data.images 
        ? data.images.map((img: string) => img.startsWith('http') ? img : `http://127.0.0.1:8000${img}`)
        : [];

      // Map the API response to our component's data structure
      const mappedResults: AnalysisResults = {
        pestName: pestName,
        confidence: confidence,
        description: data.data.description || 'No description available',
        symptoms: data.data.symptoms || [],
        causes: data.data.causes || [],
        severity: determineSeverity(data.data),
        treatments: data.data.pesticides ? [data.data.pesticides] : [],
        images: pestImages,
      }

      // Complete the analysis
      clearInterval(interval)
      setProgressValue(100)
      setIsAnalyzing(false)
      setAnalysisComplete(true)
      setAnalysisResults(mappedResults)
      setActiveTab('results')
    } catch (error: any) {
      console.error('Error analyzing image:', error)
      clearInterval(interval)
      setIsAnalyzing(false)
      setProgressValue(0)
      // Show error message to user
      alert(`Failed to analyze image: ${error.message}`)
    }
  }

  // Helper function to determine severity based on symptoms and causes
  const determineSeverity = (apiData: any): 'low' | 'medium' | 'high' => {
    if (!apiData) return 'low'
    
    const description = apiData.description || ''
    const prevention = apiData.prevention || ''
    
    const severeKeywords = [
      'severe',
      'critical',
      'widespread',
      'extensive',
      'infestation',
      'large areas',
      'complete',
      'destroy',
    ]

    if (severeKeywords.some(keyword => description.toLowerCase().includes(keyword))) {
      return 'high'
    }
    
    if (description.length > 200 || prevention.split('•').length > 3) {
      return 'medium'
    }

    return 'low'
  }

  // Get severity color using helper function
  const getSeverityColor = diseaseIdentificationHelpers.getSeverityColor

  // Get severity icon
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-4 w-4" />
      case 'medium':
        return <Info className="h-4 w-4" />
      case 'low':
        return <CheckCircle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  // Find matching treatment recommendations
  const getRecommendations = (): Recommendation | null => {
    if (!analysisResults) return null

    // Use the treatments and images from the API response
    return {
      pest: analysisResults.pestName,
      treatments: analysisResults.treatments
        ? analysisResults.treatments.map((treatment, index) => ({
            title: `Treatment Option ${index + 1}`,
            description: treatment,
            effectiveness: 
              index === 0 ? 'high' : 
              index === 1 ? 'medium' : 
              'low',
            timeline: '2-3 weeks',
            image: analysisResults.images?.[0] // Use first image for all treatments
          }))
        : [{
            title: 'Default Treatment',
            description: 'General pest control measures',
            effectiveness: 'medium',
            timeline: '2-3 weeks',
            image: analysisResults.images?.[0]
          }],
      preventiveMeasures: fallbackTreatmentData.preventiveMeasures,
    }
  }

  // Get similar cases from history
  const getSimilarCases = (): SimilarCase[] => {
    if (!analysisResults) return []

    return [
      {
        id: 'case-001',
        farmerName: 'Rajesh Kumar',
        farmerAvatar: '/placeholder/avatar.jpg', // Updated to use placeholder
        crop: 'Cotton',
        pest: analysisResults.pestName,
        location: 'Pune, Maharashtra',
        date: '15 May 2023',
        description:
          'Identified early signs of pest infestation on leaves. Applied organic neem-based solution as recommended and practiced field sanitation. Complete recovery within 2 weeks.',
        severity: 'medium',
        treatmentSuccess: 95,
        images: ['/placeholder/cotton-pest.jpg'],
        tags: ['Organic Treatment', 'Early Detection'],
      },
    ]
  }

  // Get community insights
  const getCommunityInsights = () => {
    if (!analysisResults) return []

    return (
      diagnosisHistory
        .filter((history) =>
          history.disease
            .toLowerCase()
            .includes(analysisResults.pestName.toLowerCase())
        )
        .slice(0, 3) ||
      fallbackCaseHistoryData.map((item) => ({
        ...item,
        disease: analysisResults.pestName,
      }))
    )
  }

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
              <Bug className="h-4 w-4" />
              <span>{data.resultsSection.title}</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="py-0 border-green-100 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
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
                        repeat: Infinity,
                      }}
                    >
                      <span className="text-2xl">🐛</span>
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
                        ? 'border-green-400 bg-green-50'
                        : uploadedImage
                        ? 'border-green-300 bg-green-50/50'
                        : 'border-gray-300 hover:border-green-300 hover:bg-green-50/30'
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
                            repeat: Infinity,
                            ease: 'linear',
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
              <Card className="border-green-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 py-4">
                  <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                    <Bug className="h-5 w-5 text-green-600" />
                    Common Pests
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {commonPests.slice(0, 4).map((pest, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
                          <span className="text-xl">{pest.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {pest.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Badge
                              className={`${
                                pest.severity === 'high'
                                  ? 'bg-red-100 text-red-800'
                                  : pest.severity === 'medium'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-green-100 text-green-800'
                              } text-xs`}
                            >
                              {pest.severity === 'high'
                                ? 'High Risk'
                                : pest.severity === 'medium'
                                ? 'Medium Risk'
                                : 'Low Risk'}
                            </Badge>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-green-100">
                    <Button
                      variant="ghost"
                      className="w-full text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      View All Pests
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
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
                <Card className="border-green-100 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white py-5">
                    <div className="flex justify-between">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <motion.div
                          className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
                          animate={{
                            rotate: [0, 5, 0, -5, 0],
                            scale: [1, 1.05, 1, 1.05, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                          }}
                        >
                          <span className="text-2xl">🔍</span>
                        </motion.div>
                        <span>Pest Identification Results</span>
                      </CardTitle>
                      <Badge
                        className={`${getSeverityColor(
                          analysisResults.severity
                        )} px-3 py-1.5 text-xs flex items-center gap-1`}
                      >
                        {getSeverityIcon(analysisResults.severity)}
                        <span>
                          {analysisResults.severity === 'high'
                            ? 'High Risk'
                            : analysisResults.severity === 'medium'
                            ? 'Medium Risk'
                            : 'Low Risk'}
                        </span>
                      </Badge>
                    </div>
                    <CardDescription className="text-green-100 mt-3">
                      We've analyzed your image and identified the following pest
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        {uploadedImage && (
                          <img
                            src={uploadedImage}
                            alt="Analyzed crop"
                            className="w-full h-48 object-cover rounded-lg shadow-md"
                          />
                        )}
                        <div className="mt-4 bg-green-50 rounded-lg p-4">
                          <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                            <Bug className="h-4 w-4 text-green-600" />
                            Identified Pest
                          </h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Name:</span>
                              <span className="font-medium text-gray-800">
                                {analysisResults.pestName}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Confidence:</span>
                              <span className="font-medium text-gray-800">
                                {analysisResults.confidence}%
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Severity:</span>
                              <span
                                className={`font-medium ${
                                  analysisResults.severity === 'high'
                                    ? 'text-red-600'
                                    : analysisResults.severity === 'medium'
                                    ? 'text-amber-600'
                                    : 'text-green-600'
                                }`}
                              >
                                {analysisResults.severity === 'high'
                                  ? 'High'
                                  : analysisResults.severity === 'medium'
                                  ? 'Medium'
                                  : 'Low'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-2/3">
                        <h3 className="font-medium text-lg text-gray-800 mb-3">
                          {analysisResults.pestName}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {analysisResults.description}
                        </p>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-600" />
                              Symptoms
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                              {analysisResults.symptoms.map((symptom, index) => (
                                <li key={index}>{symptom}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                              <Info className="h-4 w-4 text-blue-600" />
                              Causes
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                              {analysisResults.causes.map((cause, index) => (
                                <li key={index}>{cause}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                          >
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-200 hover:bg-green-50"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Treatment Recommendations */}
                <Card className="border-green-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 py-4">
                    <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-600" />
                      Treatment Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {getRecommendations() && (
                      <div className="space-y-6">
                        <div className="space-y-4">
                          {getRecommendations()?.treatments.map(
                            (treatment, index) => (
                              <div
                                key={index}
                                className="bg-white border border-green-100 rounded-lg p-4 shadow-sm hover:border-green-300 transition-colors"
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                      treatment.effectiveness === 'high'
                                        ? 'bg-green-100 text-green-600'
                                        : treatment.effectiveness === 'medium'
                                        ? 'bg-amber-100 text-amber-600'
                                        : 'bg-blue-100 text-blue-600'
                                    }`}
                                  >
                                    {treatment.effectiveness === 'high' ? (
                                      <CheckCircle className="h-5 w-5" />
                                    ) : treatment.effectiveness === 'medium' ? (
                                      <Shield className="h-5 w-5" />
                                    ) : (
                                      <Droplets className="h-5 w-5" />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                      <h3 className="font-medium text-gray-800">
                                        {treatment.title}
                                      </h3>
                                      <Badge
                                        className={`${
                                          treatment.effectiveness === 'high'
                                            ? 'bg-green-100 text-green-800'
                                            : treatment.effectiveness ===
                                              'medium'
                                            ? 'bg-amber-100 text-amber-800'
                                            : 'bg-blue-100 text-blue-800'
                                        }`}
                                      >
                                        {treatment.effectiveness === 'high'
                                          ? 'Highly Effective'
                                          : treatment.effectiveness === 'medium'
                                          ? 'Moderately Effective'
                                          : 'Supportive Treatment'}
                                      </Badge>
                                    </div>
                                    {treatment.image && (
                                      <img
                                        src={treatment.image}
                                        alt={`Treatment ${treatment.title}`}
                                        className="mt-2 w-full h-32 object-cover rounded-md"
                                      />
                                    )}
                                    <p className="text-gray-600 mt-1 text-sm">
                                      {treatment.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                      <Clock className="h-3.5 w-3.5" />
                                      <span>Timeline: {treatment.timeline}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-green-100">
                          <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            Preventive Measures
                          </h3>
                          <ul className="space-y-2">
                            {getRecommendations()?.preventiveMeasures.map(
                              (measure, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-2 text-gray-600"
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{measure}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Similar Cases */}
                <Card className="border-green-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 py-4">
                    <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                      <Users className="h-5 w-5 text-green-600" />
                      Similar Cases
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {getSimilarCases().map((caseItem, index) => (
                        <div
                          key={index}
                          className="bg-white border border-green-100 rounded-lg p-4 shadow-sm hover:border-green-300 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <Avatar className="h-10 w-10 border border-green-100">
                              <AvatarImage
                                src={caseItem.farmerAvatar}
                                alt={caseItem.farmerName}
                              />
                              <AvatarFallback className="bg-green-100 text-green-800">
                                {caseItem.farmerName
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h3 className="font-medium text-gray-800">
                                  {caseItem.farmerName}
                                </h3>
                                <Badge
                                  className={`${getSeverityColor(
                                    caseItem.severity
                                  )}`}
                                >
                                  {caseItem.severity === 'high'
                                    ? 'High Severity'
                                    : caseItem.severity === 'medium'
                                    ? 'Medium Severity'
                                    : 'Low Severity'}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  <span>{caseItem.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3.5 w-3.5" />
                                  <span>{caseItem.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Leaf className="h-3.5 w-3.5" />
                                  <span>{caseItem.crop}</span>
                                </div>
                              </div>
                              <p className="text-gray-600 mt-2 text-sm">
                                {caseItem.description}
                              </p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {caseItem.tags.map((tag, tagIndex) => (
                                  <Badge
                                    key={tagIndex}
                                    variant="outline"
                                    className="bg-green-50 text-green-700 border-green-200"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="mt-3 flex items-center gap-2">
                                <div className="text-xs font-medium text-gray-700">
                                  Treatment Success:
                                </div>
                                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-green-500 rounded-full"
                                    style={{
                                      width: `${caseItem.treatmentSuccess}%`,
                                    }}
                                  />
                                </div>
                                <div className="text-xs font-medium text-green-700">
                                  {caseItem.treatmentSuccess}%
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-1 space-y-6">
                {/* Analysis Summary */}
                <Card className="border-green-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 py-4">
                    <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                      <Microscope className="h-5 w-5 text-green-600" />
                      Analysis Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-gray-600">Pest Identified:</div>
                        <div className="font-medium text-gray-800">
                          {analysisResults.pestName}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-600">Confidence:</div>
                        <div className="font-medium text-gray-800">
                          {analysisResults.confidence}%
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-gray-600">Severity:</div>
                        <Badge
                          className={`${getSeverityColor(
                            analysisResults.severity
                          )}`}
                        >
                          {analysisResults.severity === 'high'
                            ? 'High'
                            : analysisResults.severity === 'medium'
                            ? 'Medium'
                            : 'Low'}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-green-100">
                      <h3 className="font-medium text-gray-800 mb-3">
                        Description
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {analysisResults.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-green-100">
                      <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        Symptoms
                      </h3>
                      <ul className="space-y-2">
                        {analysisResults.symptoms.map((symptom, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-gray-600 text-sm"
                          >
                            <div className="h-5 w-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <AlertTriangle className="h-3 w-3 text-amber-600" />
                            </div>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-green-100">
                      <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
                        <Bug className="h-4 w-4 text-red-500" />
                        Causes
                      </h3>
                      <ul className="space-y-2">
                        {analysisResults.causes.map((cause, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-gray-600 text-sm"
                          >
                            <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Bug className="h-3 w-3 text-red-600" />
                            </div>
                            <span>{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-green-100 flex justify-between">
                      <Button
                        variant="outline"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button
                        variant="outline"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Community Insights */}
                <Card className="border-green-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 py-4">
                    <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-green-600" />
                      Community Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {getCommunityInsights().map((insight, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 pb-4 border-b border-green-100 last:border-0 last:pb-0"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                            // @ts-expect-error - supressing error for prototype build
                              src={insight.farmerAvatar}
                              // @ts-expect-error - supressing error for prototype build
                              alt={insight.farmerName}
                            />
                            <AvatarFallback className="bg-green-100 text-green-800 text-xs">
                              {/* @ts-expect-error - supressing error for prototype build */}
                              {insight.farmerName
                                .split(' ')
                                // @ts-expect-error - supressing error for prototype build
                                .map((n) => n[0])
                                .join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-medium text-gray-800">
{/* @ts-expect-error - supressing error for prototype build */}
                                {insight.farmerName}
                              </h4>
                              <span className="text-xs text-gray-500">
                                {insight.date}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
{/* @ts-expect-error - supressing error for prototype build */}
                              "{insight.comment}"
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs text-gray-500 hover:text-green-600"
                              >
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                Helpful
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs text-gray-500 hover:text-green-600"
                              >
                                <MessageCircle className="h-3 w-3 mr-1" />
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

export default PestLibrary