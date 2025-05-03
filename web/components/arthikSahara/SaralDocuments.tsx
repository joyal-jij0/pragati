"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ChevronRight,
  ChevronDown,
  Calendar,
  Loader2,
  Download,
  Share2,
  Info,
  HelpCircle,
  X,
  AlertTriangle,
  ExternalLink,
  FileText,
  CheckCircle,
  Clock,
  MapPin,
  Users,
  Sparkles,
  BarChart,
  ArrowRight,
  Globe,
} from "lucide-react";
import { schemeFinderService } from "@/services/ai-assistant/schemeFinderService";

// Define interfaces
interface SchemeFilters {
  landSize: string;
  cropType: string;
  farmerCategory: string;
  state: string;
}

export interface GovernmentScheme {
  id: string;
  title: string;
  description: string;
  eligibility: string;
  benefits: string;
  documents: string[];
  applicationProcess: string;
  deadline: string;
  category: string;
  cropTypes: string[];
  landSizeRequirement: string;
  farmerCategory: string;
  aiRecommendation?: string;
  matchScore?: number;
  applicationDeadline?: string;
  estimatedBenefit?: string;
  applicationLink?: string;
  formDownloadLink?: string;
}

const SaralDocuments: React.FC = () => {
  // State declarations
  const [schemeSearchQuery, setSchemeSearchQuery] = useState<string>("");
  const [schemeFilters, setSchemeFilters] = useState<SchemeFilters>({
    landSize: "",
    cropType: "",
    farmerCategory: "",
    state: "",
  });
  const [schemeResults, setSchemeResults] = useState<GovernmentScheme[]>([]);
  const [isLoadingSchemes, setIsLoadingSchemes] = useState<boolean>(false);
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showAIInsights, setShowAIInsights] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showRoadmap, setShowRoadmap] = useState<boolean>(false);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState<boolean>(false);
  const [roadmapSteps, setRoadmapSteps] = useState<string[]>([]);
  const detailsRef = useRef<HTMLDivElement>(null);
  // Add language selection state
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // Dropdown options
  const cropTypes = [
    { value: "all", label: "All Crops", emoji: "🌱" },
    { value: "rice", label: "Rice", emoji: "🌾" },
    { value: "wheat", label: "Wheat", emoji: "🌿" },
    { value: "pulses", label: "Pulses", emoji: "🌰" },
    { value: "oilseeds", label: "Oilseeds", emoji: "🌻" },
    { value: "vegetables", label: "Vegetables", emoji: "🥦" },
    { value: "fruits", label: "Fruits", emoji: "🍎" },
    { value: "sugarcane", label: "Sugarcane", emoji: "🍬" },
    { value: "cotton", label: "Cotton", emoji: "🧶" },
  ];

  const landSizes = [
    { value: "", label: "Select Land Size", emoji: "📏" },
    { value: "small", label: "Small (< 2 Hectares)", emoji: "🔹" },
    { value: "medium", label: "Medium (2-10 Hectares)", emoji: "🔶" },
    { value: "large", label: "Large (> 10 Hectares)", emoji: "🔷" },
  ];

  const farmerCategories = [
    { value: "all", label: "All Categories", emoji: "👨‍🌾" },
    { value: "small-marginal", label: "Small & Marginal Farmers", emoji: "👨‍👩‍👧‍👦" },
    { value: "women", label: "Women Farmers", emoji: "👩‍🌾" },
    { value: "tribal", label: "Tribal Farmers", emoji: "🏞️" },
    { value: "sc-st", label: "SC/ST Farmers", emoji: "🧑‍🤝‍🧑" },
  ];

  const states = [
    { value: "", label: "Select State", emoji: "🗺️" },
    { value: "haryana", label: "Haryana", emoji: "🏙️" },
    { value: "punjab", label: "Punjab", emoji: "🌊" },
    { value: "up", label: "Uttar Pradesh", emoji: "🏯" },
    { value: "mp", label: "Madhya Pradesh", emoji: "🏕️" },
    { value: "bihar", label: "Bihar", emoji: "🏞️" },
    { value: "rajasthan", label: "Rajasthan", emoji: "🏜️" },
    { value: "gujarat", label: "Gujarat", emoji: "🏭" },
    { value: "maharashtra", label: "Maharashtra", emoji: "🏙️" },
  ];

  // Language options
  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
  ];


  // Scheme recommendations handler
  const getSchemeRecommendations = async (query: string, filters: SchemeFilters) => {
    try {
      setIsLoadingSchemes(true);
      setError(null);

      const prompt = `
        Find agricultural schemes in India that match these criteria:
        Search query: ${query || "Any"}
        Land size: ${filters.landSize || "Any"}
        Crop type: ${filters.cropType || "Any"}
        Farmer category: ${filters.farmerCategory || "Any"}
        State: ${filters.state || "Any"}
        Language: ${selectedLanguage}
        
        For each scheme, provide:
        1. Title
        2. Description
        3. Eligibility criteria
        4. Benefits
        5. Required documents
        6. Application process
        7. Deadline
        8. Category (income-support, credit, insurance, etc.)
        9. Personalized recommendation based on the farmer's profile
        10. Match score (percentage)
        11. Estimated benefit amount
        12. Application link (official government website URL)
        13. Form download link (PDF or webpage URL)
        
        Please provide all text content in ${selectedLanguage === "en" ? "English" : languages.find(l => l.code === selectedLanguage)?.name || "English"} language.
        
        Format the response as a JSON array of schemes with the following structure:
        [
          {
            "id": "unique-id",
            "title": "Scheme Title",
            "description": "Scheme description",
            "eligibility": "Eligibility criteria",
            "benefits": "Benefits description",
            "documents": ["Document 1", "Document 2"],
            "applicationProcess": "How to apply",
            "deadline": "Application deadline",
            "category": "Category name",
            "cropTypes": ["crop1", "crop2"],
            "landSizeRequirement": "small/medium/large/any",
            "farmerCategory": "category name",
            "aiRecommendation": "Personalized recommendation",
            "matchScore": 85,
            "applicationDeadline": "Specific deadline date",
            "estimatedBenefit": "Estimated benefit amount",
            "applicationLink": "https://official-website.gov.in/apply",
            "formDownloadLink": "https://official-website.gov.in/form.pdf"
          }
        ]
      `;

      const response = await schemeFinderService.generateCompletion(prompt);
      
      let schemes: GovernmentScheme[] = [];
      
      try {
        if (typeof response === 'string') {
          const jsonMatch = response.match(/\[[\s\S]*\]/);
          if (jsonMatch) {
            schemes = JSON.parse(jsonMatch[0]);
          } else {
            throw new Error("Could not find valid JSON in the response");
          }
        } else if (Array.isArray(response)) {
          schemes = response;
        } else if (response.schemes && Array.isArray(response.schemes)) {
          schemes = response.schemes;
        } else {
          throw new Error("Unexpected response format from API");
        }
        
        schemes = schemes.map((scheme: GovernmentScheme, index: number) => ({
          id: scheme.id || `scheme-${index + 1}`,
          title: scheme.title || "Unknown Scheme",
          description: scheme.description || "No description available",
          eligibility: scheme.eligibility || "Not specified",
          benefits: scheme.benefits || "Not specified",
          documents: Array.isArray(scheme.documents) ? scheme.documents : [],
          applicationProcess: scheme.applicationProcess || "Not specified",
          deadline: scheme.deadline || "Not specified",
          category: scheme.category || "other",
          cropTypes: Array.isArray(scheme.cropTypes) ? scheme.cropTypes : ["all"],
          landSizeRequirement: scheme.landSizeRequirement || "any",
          farmerCategory: scheme.farmerCategory || "all",
          aiRecommendation: scheme.aiRecommendation,
          matchScore: typeof scheme.matchScore === 'number' ? scheme.matchScore : undefined,
          applicationDeadline: scheme.applicationDeadline,
          estimatedBenefit: scheme.estimatedBenefit,
          applicationLink: scheme.applicationLink || `https://www.india.gov.in/search/site/${encodeURIComponent(scheme.title)}`,
          formDownloadLink: scheme.formDownloadLink || `https://www.india.gov.in/search/site/${encodeURIComponent(scheme.title)}%20form%20pdf`,
        }));
        
        schemes.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
        
        setSchemeResults(schemes);
      } catch (parseError: any) {
        console.error("Error parsing API response:", parseError);
        setError(`Failed to parse API response: ${parseError.message}`);
        setSchemeResults([]);
      }
      
      setIsLoadingSchemes(false);
    } catch (error: any) {
      console.error("Error getting scheme recommendations:", error);
      setError(`Failed to get recommendations: ${error.message || "Unknown error"}`);
      setIsLoadingSchemes(false);
      setSchemeResults([]);
    }
  };

  // Handlers
  const handleSchemeSearch = () => {
    getSchemeRecommendations(schemeSearchQuery, schemeFilters);
  };

  const handleFilterChange = (name: keyof SchemeFilters, value: string) => {
    setSchemeFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setSchemeFilters({
      landSize: "",
      cropType: "",
      farmerCategory: "",
      state: "",
    });
    setSchemeSearchQuery("");
  };

  const viewSchemeDetails = (scheme: GovernmentScheme) => {
    setSelectedScheme(scheme);
    setShowRoadmap(false);
    
    setTimeout(() => {
      if (detailsRef.current) {
        detailsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const closeSchemeDetails = () => {
    setSelectedScheme(null);
    setShowRoadmap(false);
  };

  const generateRoadmap = async () => {
    if (!selectedScheme) return;
    
    setIsGeneratingRoadmap(true);
    setShowRoadmap(true);
    
    try {
      // Pass the selected language to the roadmap generator
      const steps = await schemeFinderService.generateRoadmap(selectedScheme, selectedLanguage);
      setRoadmapSteps(steps);
    } catch (error) {
      console.error("Error generating roadmap:", error);
      // Fallback to default steps if there's an error
      setRoadmapSteps([
        `📋 Step 1: Gather all required documents (${selectedScheme.documents.join(", ")})`,
        "✅ Step 2: Verify your eligibility criteria matches the scheme requirements",
        "🖥️ Step 3: Visit the official application portal or nearest Common Service Center",
        "📝 Step 4: Fill the application form with accurate personal and land details",
        "📎 Step 5: Upload scanned copies of all required documents",
        "💰 Step 6: Pay application fee (if applicable)",
        "📤 Step 7: Submit your application and note down the reference number",
        "⏱️ Step 8: Track your application status using the reference number",
        "📱 Step 9: Respond to any verification calls or messages from authorities",
        "🎉 Step 10: Receive confirmation of successful enrollment in the scheme",
      ]);
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  const downloadForm = (scheme: GovernmentScheme) => {
    if (scheme.formDownloadLink) {
      window.open(scheme.formDownloadLink, '_blank');
    }
  };

  const visitApplicationPortal = (scheme: GovernmentScheme) => {
    if (scheme.applicationLink) {
      window.open(scheme.applicationLink, '_blank');
    }
  };

  // Utility functions
  const getCategoryColor = (category: string): string => {
    switch (category.toLowerCase()) {
      case "income-support":
        return "bg-green-100 text-green-800";
      case "credit":
        return "bg-blue-100 text-blue-800";
      case "insurance":
        return "bg-purple-100 text-purple-800";
      case "soil-health":
        return "bg-amber-100 text-amber-800";
      case "pension":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryEmoji = (category: string): string => {
    switch (category.toLowerCase()) {
      case "income-support":
        return "💰";
      case "credit":
        return "💳";
      case "insurance":
        return "🛡️";
      case "soil-health":
        return "🌱";
      case "pension":
        return "👴";
      default:
        return "📋";
    }
  };

  const getMatchScoreColor = (score: number | undefined): string => {
    if (!score) return "text-gray-600";
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 60) return "text-amber-600";
    return "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header with Language Selector */}
        <motion.div className="mb-8 text-center relative" variants={itemVariants}>
          <div className="absolute right-0 top-0">
            <div className="relative inline-block">
              <button 
                className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-sm font-medium text-gray-700"
                onClick={() => document.getElementById('language-dropdown')?.classList.toggle('hidden')}
              >
                <Globe className="h-4 w-4 text-gray-500" />
                <span>{languages.find(l => l.code === selectedLanguage)?.flag}</span>
                <span>{languages.find(l => l.code === selectedLanguage)?.name}</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
              <div 
                id="language-dropdown" 
                className="hidden absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1"
              >
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${
                      selectedLanguage === language.code ? 'bg-green-50 text-green-700' : 'text-gray-700'
                    }`}
                    onClick={() => {
                      setSelectedLanguage(language.code);
                      document.getElementById('language-dropdown')?.classList.add('hidden');
                      // Refresh results if we have any
                      if (schemeResults.length > 0) {
                        getSchemeRecommendations(schemeSearchQuery, schemeFilters);
                      }
                    }}
                  >
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                    {selectedLanguage === language.code && (
                      <CheckCircle className="h-4 w-4 ml-auto text-green-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <span className="text-2xl">🌾</span>
            <span>Kisan Scheme Finder</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover government schemes tailored to your farming needs with AI-powered recommendations
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div className="bg-white rounded-xl shadow-md p-6 mb-8" variants={itemVariants}>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for schemes (e.g., crop insurance, subsidies)..."
                value={schemeSearchQuery}
                onChange={(e) => setSchemeSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              {showFilters ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            <button
              onClick={handleSchemeSearch}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" />
              <span>Find Schemes</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Land Size Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Land Size</label>
                <div className="relative">
                  <select
                    value={schemeFilters.landSize}
                    onChange={(e) => handleFilterChange("landSize", e.target.value)}
                    className="w-full p-2 pl-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                  >
                    {landSizes.map((size) => (
                      <option key={size.value} value={size.value}>
                        {size.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-lg">
                    {landSizes.find(size => size.value === schemeFilters.landSize)?.emoji || "📏"}
                  </div>
                </div>
              </div>

              {/* Crop Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                <div className="relative">
                  <select
                    value={schemeFilters.cropType}
                    onChange={(e) => handleFilterChange("cropType", e.target.value)}
                    className="w-full p-2 pl-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                  >
                    {cropTypes.map((crop) => (
                      <option key={crop.value} value={crop.value}>
                        {crop.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-lg">
                    {cropTypes.find(crop => crop.value === schemeFilters.cropType)?.emoji || "🌱"}
                  </div>
                </div>
              </div>

              {/* Farmer Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farmer Category</label>
                <div className="relative">
                  <select
                    value={schemeFilters.farmerCategory}
                    onChange={(e) => handleFilterChange("farmerCategory", e.target.value)}
                    className="w-full p-2 pl-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                  >
                    {farmerCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-lg">
                    {farmerCategories.find(cat => cat.value === schemeFilters.farmerCategory)?.emoji || "👨‍🌾"}
                  </div>
                </div>
              </div>

              {/* State Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <div className="relative">
                  <select
                    value={schemeFilters.state}
                    onChange={(e) => handleFilterChange("state", e.target.value)}
                    className="w-full p-2 pl-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                  >
                    {states.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-lg">
                    {states.find(state => state.value === schemeFilters.state)?.emoji || "🗺️"}
                  </div>
                </div>
              </div>
              
              {/* Reset Filters Button */}
              <div className="lg:col-span-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                >
                  <X className="h-4 w-4" />
                  Reset Filters
                </button>
              </div>
            </motion.div>
          )}
          
          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-red-800">Error</h4>
                <p className="text-xs text-red-600">{error}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Results Section */}
        <motion.div variants={itemVariants}>
          {isLoadingSchemes ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 text-green-500 animate-spin mb-4" />
              <p className="text-gray-600">Searching for schemes...</p>
            </div>
          ) : schemeResults.length > 0 ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">🔍</span>
                  <span>Found {schemeResults.length} Schemes</span>
                </h2>
                <button
                  onClick={() => setShowAIInsights(!showAIInsights)}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700"
                >
                  <Sparkles className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {showAIInsights ? "Hide AI Insights" : "Show AI Insights"}
                  </span>
                </button>
              </div>

              {/* AI Insights */}
              {showAIInsights && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 mb-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">AI Recommendations</h3>
                      <p className="text-gray-600 mb-4">
                        Based on your search criteria, here are some insights to help you choose the right schemes:
                      </p>
                      <ul className="space-y-2">
                        {schemeResults.slice(0, 3).map((scheme) => (
                          <li key={scheme.id} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">✨</span>
                            <span className="text-gray-700">{scheme.aiRecommendation || `${scheme.title} is a good match for your profile.`}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Scheme Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schemeResults.map((scheme) => (
                  <motion.div
                    key={scheme.id}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:border-green-200 transition-colors"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${getCategoryColor(scheme.category)}`}>
                          <span>{getCategoryEmoji(scheme.category)}</span>
                          <span>{scheme.category}</span>
                        </span>
                        {scheme.matchScore && (
                          <span className={`text-sm font-bold ${getMatchScoreColor(scheme.matchScore)} flex items-center gap-1`}>
                            <span>⭐</span>
                            <span>{scheme.matchScore}% Match</span>
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{scheme.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{scheme.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {scheme.cropTypes.map((crop, index) => {
                          const cropInfo = cropTypes.find(c => c.value === crop) || cropTypes[0];
                          return (
                            <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full flex items-center gap-1">
                              <span>{cropInfo.emoji}</span>
                              <span>{crop}</span>
                            </span>
                          );
                        })}
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>{scheme.applicationDeadline || scheme.deadline}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <BarChart className="h-3 w-3" />
                          <span>{scheme.estimatedBenefit || "Not specified"}</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => viewSchemeDetails(scheme)}
                        className="mt-4 w-full py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Info className="h-4 w-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No schemes found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Try adjusting your search criteria or filters to find government schemes that match your needs.
              </p>
            </div>
          )}
        </motion.div>

        {/* Scheme Details Modal */}
        {selectedScheme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="relative w-full max-w-4xl">
              <button
                onClick={closeSchemeDetails}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
              >
                <X className="h-6 w-6" />
              </button>

              <motion.div
                ref={detailsRef}
                className="bg-white rounded-xl shadow-xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{getCategoryEmoji(selectedScheme.category)}</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20`}>
                          {selectedScheme.category.charAt(0).toUpperCase() + selectedScheme.category.slice(1)}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{selectedScheme.title}</h2>
                      <p className="text-green-50">{selectedScheme.description}</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-white bg-opacity-20 rounded-lg p-3">
                        <div className="text-3xl font-bold">{selectedScheme.matchScore || 0}%</div>
                        <div className="text-sm">Match Score</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex border-b mb-6">
                    <button
                      onClick={() => setShowRoadmap(false)}
                      className={`px-4 py-2 font-medium ${!showRoadmap ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                    >
                      Scheme Details
                    </button>
                    <button
                      onClick={() => showRoadmap ? setShowRoadmap(false) : generateRoadmap()}
                      className={`px-4 py-2 font-medium ${showRoadmap ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                    >
                      Application Roadmap
                    </button>
                  </div>

                  {!showRoadmap && (
                    <div className="space-y-6">
                      {selectedScheme.estimatedBenefit && (
                        <div className="bg-green-50 rounded-lg p-4 flex items-center gap-4 border border-green-100">
                          <div className="bg-green-100 p-3 rounded-full text-green-600 text-xl">💰</div>
                          <div>
                            <h3 className="font-medium text-gray-900">Estimated Benefit</h3>
                            <p className="text-green-700 font-semibold text-lg">{selectedScheme.estimatedBenefit}</p>
                          </div>
                        </div>
                      )}

                      {selectedScheme.aiRecommendation && (
                        <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-4 border border-blue-100">
                          <div className="bg-blue-100 p-3 rounded-full text-blue-600 text-xl mt-1">✨</div>
                          <div>
                            <h3 className="font-medium text-gray-900 flex items-center gap-2">
                              <span>AI Recommendation</span>
                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Personalized</span>
                            </h3>
                            <p className="text-gray-700">{selectedScheme.aiRecommendation}</p>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            Eligibility Criteria
                          </h3>
                          <p className="text-gray-700">{selectedScheme.eligibility}</p>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-amber-500" />
                            Benefits
                          </h3>
                          <p className="text-gray-700">{selectedScheme.benefits}</p>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-blue-500" />
                            Application Process
                          </h3>
                          <p className="text-gray-700">{selectedScheme.applicationProcess}</p>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                            <Calendar className="h-5 w-5 text-red-500" />
                            Application Deadline
                          </h3>
                          <p className="text-gray-700">{selectedScheme.applicationDeadline || selectedScheme.deadline}</p>
                        </div>
                      </div>

                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-indigo-500" />
                          Required Documents
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {selectedScheme.documents.map((doc, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span className="text-gray-700">{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-4 mt-6">
                        <button
                          onClick={() => visitApplicationPortal(selectedScheme)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                          <span>Apply Online</span>
                        </button>
                        <button
                          onClick={() => downloadForm(selectedScheme)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <Download className="h-5 w-5" />
                          <span>Download Form</span>
                        </button>
                        <button
                          onClick={generateRoadmap}
                          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <ArrowRight className="h-5 w-5" />
                          <span>Get Application Guide</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {showRoadmap && (
                    <div>
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-green-500" />
                          Application Roadmap for {selectedScheme.title}
                        </h3>
                        <p className="text-gray-600">Follow these steps to successfully apply for this scheme</p>
                      </div>

                      {isGeneratingRoadmap ? (
                        <div className="flex flex-col items-center justify-center py-12">
                          <Loader2 className="h-12 w-12 text-green-500 animate-spin mb-4" />
                          <p className="text-gray-600">Generating your personalized application guide...</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {roadmapSteps.map((step, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div className="bg-green-100 text-green-800 rounded-full h-8 w-8 flex items-center justify-center font-medium">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <p className="text-gray-800">{step}</p>
                              </div>
                            </motion.div>
                          ))}

                          <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-3">
                            <div className="text-amber-500 mt-1">
                              <AlertTriangle className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">Important Note</h4>
                              <p className="text-gray-700 text-sm">
                                Application processes may vary slightly based on your location and specific circumstances. 
                                For the most accurate information, please contact your local agriculture office or visit the 
                                official website.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-4 mt-8">
                        <button
                          onClick={() => visitApplicationPortal(selectedScheme)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <ExternalLink className="h-5 w-5" />
                          <span>Go to Application Portal</span>
                        </button>
                        <button
                          onClick={() => window.print()}
                          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                        >
                          <Download className="h-5 w-5" />
                          <span>Print Roadmap</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SaralDocuments;