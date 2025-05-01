"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  TrendingUp,
  TrendingDown,
  BarChart2,
  ShoppingCart,
  Package,
  Search,
  Filter,
  Star,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  AlertTriangle,
  Info,
  Users,
  Shield,
  CheckCircle,
  Zap,
  Plus,
  Share2,
  Bookmark,
  Heart,
  ShoppingBag,
  Tag,
  MessageCircle,
  Volume2,
  Percent,
  Eye,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cropPriceData } from "./CropsPRiceData";
import { cropPriceForecastData } from "./CropPriceForceCastData";
import { marketDataByLocation } from "./MarketDataByLocation";
import { buyerRequirements } from "./BuyerRequirement";
import { products } from "./Products";
import { groupBuyingDeals } from "./GroupBuyingDeal";

export default function BazaarBridge() {
  const [activeTab, setActiveTab] = useState("market-prices");
  const [language, setLanguage] = useState("english");
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [selectedMarket, setSelectedMarket] = useState("All");
  const [isDealerModalOpen, setIsDealerModalOpen] = useState(false);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [isProductDetailModalOpen, setIsProductDetailModalOpen] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isVerifiedDealer, setIsVerifiedDealer] = useState(false);
  const [marketData, setMarketData] = useState(marketDataByLocation.All);
  const speechSynthesisRef = useRef(null);
  const [productsToCompare, setProductsToCompare] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Update market data when selected market changes
  useEffect(() => {
    setMarketData(
      marketDataByLocation[selectedMarket] || marketDataByLocation.All
    );
  }, [selectedMarket]);

  const dealerFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    panCard: z
      .string()
      .length(10, { message: "PAN Card must be 10 characters." }),
    aadharNumber: z
      .string()
      .length(12, { message: "Aadhar number must be 12 digits." }),
    address: z.string().min(5, { message: "Address is required." }),
    phone: z.string().min(10, { message: "Valid phone number is required." }),
  });

  const productFormSchema = z.object({
    name: z.string().min(2, { message: "Product name is required." }),
    category: z.string().min(1, { message: "Category is required." }),
    brand: z.string().min(1, { message: "Brand is required." }),
    price: z.coerce.number().positive({ message: "Price must be positive." }),
    unit: z.string().min(1, { message: "Unit is required." }),
    description: z.string().min(5, { message: "Description is required." }),
    ingredients: z.string().min(5, { message: "Ingredients are required." }),
    expiryDate: z.string().min(1, { message: "Expiry date is required." }),
    manufacturingDate: z
      .string()
      .min(1, { message: "Manufacturing date is required." }),
    location: z.string().min(1, { message: "Location is required." }),
  });

  const dealerForm = useForm({
    resolver: zodResolver(dealerFormSchema),
    defaultValues: {
      name: "",
      panCard: "",
      aadharNumber: "",
      address: "",
      phone: "",
    },
  });

  const productForm = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      category: "",
      brand: "",
      price: 0,
      unit: "",
      description: "",
      ingredients: "",
      expiryDate: "",
      manufacturingDate: "",
      location: "",
    },
  });

  const onDealerSubmit = (data) => {
    console.log("Dealer verification data:", data);
    setIsVerifiedDealer(true);
    setIsDealerModalOpen(false);
    setIsListingModalOpen(true);
  };

  const onProductSubmit = (data) => {
    console.log("Product listing data:", data);
    // Here you would typically send this data to your backend
    setIsListingModalOpen(false);
    // Add the new product to your products array
    // This is just a mock implementation
    const newProduct = {
      id: products.length + 1,
      name: data.name,
      category: data.category,
      brand: data.brand,
      price: data.price,
      unit: data.unit,
      rating: 5.0,
      reviews: 0,
      image: "/placeholder.svg?height=192&width=256",
      inStock: true,
      discount: 0,
      verified: true,
      description: data.description,
      ingredients: data.ingredients,
      expiryDate: data.expiryDate,
      manufacturingDate: data.manufacturingDate,
      location: data.location,
    };
    // In a real app, you would update your state with the new product
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsProductDetailModalOpen(true);
  };

  const speakIngredients = (text) => {
    if ("speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === "hindi" ? "hi-IN" : "en-US";
      utterance.rate = 0.9; // Slightly slower for better comprehension

      window.speechSynthesis.speak(utterance);
      speechSynthesisRef.current = utterance;
    } else {
      console.error("Text-to-speech not supported in this browser");
      alert("Text-to-speech is not supported in your browser");
    }
  };

  // Clean up speech synthesis when component unmounts
  useEffect(() => {
    return () => {
      if (speechSynthesisRef.current && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Get price trend percentage for selected crop
  const getPriceTrend = () => {
    const priceData = cropPriceData[selectedCrop];
    if (!priceData || priceData.length < 2) return { value: 0, isUp: true };

    const firstPrice = priceData[0].price;
    const lastPrice = priceData[priceData.length - 1].price;
    const percentChange = ((lastPrice - firstPrice) / firstPrice) * 100;
    return {
      value: Math.abs(percentChange.toFixed(1)),
      isUp: percentChange > 0,
    };
  };

  // Get current price trend
  const priceTrend = getPriceTrend();

  const toggleProductForComparison = (product) => {
    if (productsToCompare.some((p) => p.id === product.id)) {
      setProductsToCompare(
        productsToCompare.filter((p) => p.id !== product.id)
      );
    } else {
      if (productsToCompare.length < 3) {
        setProductsToCompare([...productsToCompare, product]);
      } else {
        alert(
          language === "hindi"
            ? "आप केवल 3 उत्पादों की तुलना कर सकते हैं"
            : "You can only compare up to 3 products"
        );
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6  rounded-lg border p-4 bg-gradient-to-r from-green-600 to-emerald-500 text-white">
        <div>
          <h1 className="text-2xl font-bold ">
            {language === "hindi" ? "बाज़ार ब्रिज" : "Bazaar Bridge"}
          </h1>
          <p className=" mt-1">
            {language === "hindi"
              ? "बाज़ार मूल्य, खरीदारों से जुड़ें और कृषि आदानों की खरीदारी करें"
              : "Market prices, connect with buyers, and shop for agricultural inputs"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage("english")}
            className={`px-3 py-1.5 text-sm rounded-md ${
              language === "english"
                ? "bg-green-100 text-green-800 font-medium"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("hindi")}
            className={`px-3 py-1.5 text-sm rounded-md ${
              language === "hindi"
                ? "bg-green-100 text-green-800 font-medium"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            हिंदी
          </button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger
            value="market-prices"
            className="flex items-center gap-2"
          >
            <BarChart2 className="w-4 h-4" />
            <span>
              {language === "hindi" ? "बाज़ार मूल्य" : "Market Prices"}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="buyer-connect"
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            <span>
              {language === "hindi" ? "खरीदार कनेक्ट" : "Buyer Connect"}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="compare-prices"
            className="flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>
              {language === "hindi" ? "मूल्य तुलना" : "Compare Prices"}
            </span>
          </TabsTrigger>
          <TabsTrigger value="group-buying" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>
              {language === "hindi" ? "सामूहिक खरीद" : "Group Buying"}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="market-prices">
          {/* Market Prices Tab */}
          <div>
            {/* Search and filter */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder={
                      language === "hindi"
                        ? "फसल या मंडी खोजें..."
                        : "Search crop or market..."
                    }
                    className="w-full pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={
                        language === "hindi" ? "फसल चुनें" : "Select crop"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Wheat">
                      {language === "hindi" ? "गेहूं" : "Wheat"}
                    </SelectItem>
                    <SelectItem value="Rice">
                      {language === "hindi" ? "चावल" : "Rice"}
                    </SelectItem>
                    <SelectItem value="Tomato">
                      {language === "hindi" ? "टमाटर" : "Tomato"}
                    </SelectItem>
                    <SelectItem value="Potato">
                      {language === "hindi" ? "आलू" : "Potato"}
                    </SelectItem>
                    <SelectItem value="Onion">
                      {language === "hindi" ? "प्याज" : "Onion"}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedMarket}
                  onValueChange={setSelectedMarket}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={
                        language === "hindi" ? "मंडी चुनें" : "Select market"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">
                      {language === "hindi" ? "सभी मंडियां" : "All Markets"}
                    </SelectItem>
                    <SelectItem value="Nearby">
                      {language === "hindi" ? "नज़दीकी" : "Nearby"}
                    </SelectItem>
                    <SelectItem value="Delhi">
                      {language === "hindi" ? "दिल्ली" : "Delhi"}
                    </SelectItem>
                    <SelectItem value="Haryana">
                      {language === "hindi" ? "हरियाणा" : "Haryana"}
                    </SelectItem>
                    <SelectItem value="Punjab">
                      {language === "hindi" ? "पंजाब" : "Punjab"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price trend chart */}
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">
                      {language === "hindi"
                        ? `${selectedCrop} मूल्य प्रवृत्ति`
                        : `${selectedCrop} Price Trend`}
                    </CardTitle>
                    <CardDescription>
                      {language === "hindi"
                        ? "अज़ादपुर मंडी, दिल्ली"
                        : "Azadpur Mandi, Delhi"}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={priceTrend.isUp ? "success" : "destructive"}
                    className="flex items-center gap-1.5 px-3 py-1.5"
                  >
                    {priceTrend.isUp ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>
                      {priceTrend.isUp ? "+" : "-"}
                      {priceTrend.value}%
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cropPriceData[selectedCrop]}>
                      <defs>
                        <linearGradient
                          id="colorPrice"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10B981"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10B981"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorAvg"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#6366F1"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="95%"
                            stopColor="#6366F1"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                          border: "1px solid #E5E7EB",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#10B981"
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                        name={
                          language === "hindi"
                            ? "वर्तमान मूल्य (₹/क्विंटल)"
                            : "Current Price (₹/quintal)"
                        }
                      />
                      <Area
                        type="monotone"
                        dataKey="avg"
                        stroke="#6366F1"
                        fillOpacity={0.3}
                        fill="url(#colorAvg)"
                        name={
                          language === "hindi"
                            ? "औसत मूल्य (₹/क्विंटल)"
                            : "Average Price (₹/quintal)"
                        }
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 border-t border-gray-100 pt-4">
                  <h3 className="text-base font-medium text-gray-800 mb-3">
                    {language === "hindi"
                      ? "मूल्य पूर्वानुमान"
                      : "Price Forecast"}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-blue-50 border-blue-100">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                            <TrendingUp className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-medium text-blue-800">
                              {language === "hindi"
                                ? "अल्पकालिक पूर्वानुमान (7 दिन)"
                                : "Short-term Forecast (7 days)"}
                            </h4>
                            <p className="text-blue-700 mt-1">
                              {language === "hindi"
                                ? "मूल्य में 3-5% की वृद्धि की संभावना है"
                                : "Prices likely to increase by 3-5%"}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Info className="w-4 h-4 text-blue-500" />
                              <p className="text-xs text-blue-600">
                                {language === "hindi"
                                  ? "आने वाले त्योहारों के कारण मांग में वृद्धि"
                                  : "Increased demand due to upcoming festivals"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-amber-50 border-amber-100">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-amber-100 rounded-full text-amber-600">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-medium text-amber-800">
                              {language === "hindi"
                                ? "बिक्री के लिए अनुशंसित समय"
                                : "Recommended Selling Time"}
                            </h4>
                            <p className="text-amber-700 mt-1">
                              {language === "hindi"
                                ? "अगले 5-7 दिनों में बिक्री करने पर विचार करें"
                                : "Consider selling in the next 5-7 days"}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <AlertTriangle className="w-4 h-4 text-amber-500" />
                              <p className="text-xs text-amber-600">
                                {language === "hindi"
                                  ? "अक्टूबर के अंत में मूल्य में गिरावट की संभावना"
                                  : "Prices likely to decline by end of October"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nearby markets */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>
                  {language === "hindi"
                    ? "आस-पास की मंडियां"
                    : "Nearby Markets"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                          {language === "hindi" ? "मंडी" : "Market"}
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                          {language === "hindi" ? "स्थान" : "Location"}
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                          {language === "hindi" ? "फसल" : "Crop"}
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                          {language === "hindi"
                            ? "मूल्य (₹/क्विंटल)"
                            : "Price (₹/quintal)"}
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                          {language === "hindi" ? "प्रवृत्ति" : "Trend"}
                        </th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                          {language === "hindi" ? "कार्रवाई" : "Action"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {marketData.map((market) =>
                        market.crops.map((crop, cropIndex) => (
                          <tr
                            key={`${market.id}-${cropIndex}`}
                            className="hover:bg-gray-50"
                          >
                            {cropIndex === 0 && (
                              <td
                                className="py-3 px-4 text-sm text-gray-800 font-medium"
                                rowSpan={market.crops.length}
                              >
                                {market.market}
                              </td>
                            )}
                            {cropIndex === 0 && (
                              <td
                                className="py-3 px-4 text-sm text-gray-600"
                                rowSpan={market.crops.length}
                              >
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                  <span>{market.location}</span>
                                  <span className="text-xs text-gray-400 ml-1">
                                    ({market.distance})
                                  </span>
                                </div>
                              </td>
                            )}
                            <td className="py-3 px-4 text-sm text-gray-800">
                              {crop.name}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-800 font-medium">
                              ₹{crop.price}
                            </td>
                            <td className="py-3 px-4">
                              <div
                                className={`flex items-center gap-1 ${
                                  crop.trend === "up"
                                    ? "text-green-600"
                                    : "text-red-500"
                                }`}
                              >
                                {crop.trend === "up" ? (
                                  <TrendingUp className="w-4 h-4" />
                                ) : (
                                  <TrendingDown className="w-4 h-4" />
                                )}
                                <span className="text-sm font-medium">
                                  {crop.change}%
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <Button
                                variant="link"
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium p-0"
                              >
                                {language === "hindi"
                                  ? "विवरण देखें"
                                  : "View Details"}
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* AI Price Insights */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {language === "hindi"
                        ? "एआई मूल्य अंतर्दृष्टि"
                        : "AI Price Insights"}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {language === "hindi"
                        ? "आपकी फसल के लिए व्यक्तिगत मूल्य अंतर्दृष्टि और सिफारिशें"
                        : "Personalized price insights and recommendations for your crop"}
                    </p>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-gray-800 mb-2">
                            {language === "hindi"
                              ? "मूल्य विश्लेषण"
                              : "Price Analysis"}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {language === "hindi"
                              ? "वर्तमान मूल्य पिछले 3 महीनों के औसत से 12.5% अधिक है"
                              : "Current price is 12.5% higher than the 3-month average"}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-blue-600">
                            <Info className="w-4 h-4" />
                            <span>
                              {language === "hindi"
                                ? "अधिक जानकारी देखें"
                                : "See more details"}
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-gray-800 mb-2">
                            {language === "hindi"
                              ? "बाजार अवसर"
                              : "Market Opportunity"}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {language === "hindi"
                              ? "अज़ादपुर मंडी में वर्तमान में सर्वोत्तम मूल्य मिल रहा है"
                              : "Azadpur Mandi currently offers the best price"}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-blue-600">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {language === "hindi"
                                ? "मार्ग देखें"
                                : "View directions"}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="mt-5 bg-indigo-50 border-indigo-100">
                      <CardContent className="p-4">
                        <h3 className="font-medium text-indigo-800 mb-2">
                          {language === "hindi"
                            ? "व्यक्तिगत सिफारिश"
                            : "Personalized Recommendation"}
                        </h3>
                        <p className="text-sm text-indigo-700 mb-3">
                          {language === "hindi"
                            ? "आपकी फसल के लिए अगले 7 दिनों में बिक्री करना सबसे अच्छा होगा। मूल्य में 3-5% की वृद्धि की उम्मीद है, उसके बाद अक्टूबर के अंत में गिरावट आ सकती है।"
                            : "For your crop, selling within the next 7 days would be optimal. Prices are expected to rise by 3-5% before potentially declining by the end of October."}
                        </p>
                        <Button className="mt-1 bg-indigo-600 hover:bg-indigo-700">
                          {language === "hindi"
                            ? "विस्तृत रिपोर्ट देखें"
                            : "View Detailed Report"}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="buyer-connect">
          {/* Buyer Connect Tab */}
          <div>
            {/* Search and filter */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder={
                      language === "hindi"
                        ? "फसल या खरीदार खोजें..."
                        : "Search crop or buyer..."
                    }
                    className="w-full pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={
                        language === "hindi" ? "सभी फसलें" : "All Crops"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {language === "hindi" ? "सभी फसलें" : "All Crops"}
                    </SelectItem>
                    <SelectItem value="wheat">
                      {language === "hindi" ? "गेहूं" : "Wheat"}
                    </SelectItem>
                    <SelectItem value="rice">
                      {language === "hindi" ? "चावल" : "Rice"}
                    </SelectItem>
                    <SelectItem value="tomato">
                      {language === "hindi" ? "टमाटर" : "Tomato"}
                    </SelectItem>
                    <SelectItem value="potato">
                      {language === "hindi" ? "आलू" : "Potato"}
                    </SelectItem>
                    <SelectItem value="onion">
                      {language === "hindi" ? "प्याज" : "Onion"}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={
                        language === "hindi" ? "सभी स्थान" : "All Locations"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {language === "hindi" ? "सभी स्थान" : "All Locations"}
                    </SelectItem>
                    <SelectItem value="delhi">
                      {language === "hindi" ? "दिल्ली" : "Delhi"}
                    </SelectItem>
                    <SelectItem value="haryana">
                      {language === "hindi" ? "हरियाणा" : "Haryana"}
                    </SelectItem>
                    <SelectItem value="punjab">
                      {language === "hindi" ? "पंजाब" : "Punjab"}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>{language === "hindi" ? "फ़िल्टर" : "Filter"}</span>
                </Button>
              </div>
            </div>

            {/* Buyer requirements cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {buyerRequirements.map((buyer) => (
                <Card key={buyer.id} className="overflow-hidden">
                  <div className="relative h-40 bg-gray-100">
                    <Image
                      src={buyer.image || "/placeholder.svg"}
                      alt={buyer.buyer}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform hover:scale-105"
                    />
                    {buyer.verified && (
                      <div className="absolute top-3 right-3 bg-green-600 text-white p-1.5 rounded-full">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {buyer.buyer}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">
                          {buyer.rating}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-gray-700">
                            {language === "hindi" ? "फसल:" : "Crop:"}
                          </span>{" "}
                          {buyer.crop} ({buyer.variety})
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-gray-700">
                            {language === "hindi" ? "मात्रा:" : "Quantity:"}
                          </span>{" "}
                          {buyer.quantity}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-gray-700">
                            {language === "hindi" ? "मूल्य:" : "Price:"}
                          </span>{" "}
                          {buyer.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-gray-700">
                            {language === "hindi" ? "स्थान:" : "Location:"}
                          </span>{" "}
                          {buyer.location}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          <span className="font-medium text-gray-700">
                            {language === "hindi" ? "समय सीमा:" : "Deadline:"}
                          </span>{" "}
                          {buyer.deadline}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700 flex items-center justify-center gap-1.5">
                        <MessageCircle className="w-4 h-4" />
                        <span>
                          {language === "hindi" ? "संपर्क करें" : "Contact"}
                        </span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            {/* Search and filter */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder={
                      language === "hindi"
                        ? "उत्पाद खोजें..."
                        : "Search products..."
                    }
                    className="w-full pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={
                        language === "hindi"
                          ? "सभी श्रेणियां"
                          : "All Categories"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {language === "hindi"
                        ? "सभी श्रेणियां"
                        : "All Categories"}
                    </SelectItem>
                    <SelectItem value="fertilizer">
                      {language === "hindi" ? "उर्वरक" : "Fertilizer"}
                    </SelectItem>
                    <SelectItem value="seeds">
                      {language === "hindi" ? "बीज" : "Seeds"}
                    </SelectItem>
                    <SelectItem value="pesticides">
                      {language === "hindi" ? "कीटनाशक" : "Pesticides"}
                    </SelectItem>
                    <SelectItem value="equipment">
                      {language === "hindi" ? "उपकरण" : "Equipment"}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>{language === "hindi" ? "फ़िल्टर" : "Filter"}</span>
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-800">
                {language === "hindi" ? "विशेष उत्पाद" : "Featured Products"}
              </h2>
              <Button
                onClick={() => setIsDealerModalOpen(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                {language === "hindi"
                  ? "उत्पाद सूचीबद्ध करें"
                  : "List Your Product"}
              </Button>
            </div>

            {/* Featured products */}
            <div className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden cursor-pointer"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="relative h-48 bg-gray-100">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform hover:scale-105"
                      />
                      {product.discount > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute top-3 left-3"
                        >
                          {product.discount}% OFF
                        </Badge>
                      )}
                      {product.verified && (
                        <div className="absolute top-3 right-3 bg-blue-600 text-white p-1.5 rounded-full">
                          <Shield className="w-4 h-4" />
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute bottom-3 right-3 bg-white text-gray-600 hover:bg-gray-100 rounded-full shadow-md"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <Badge variant="outline">{product.category}</Badge>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="text-xs font-medium">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </div>

                      <h3 className="font-medium text-gray-800 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        {product.brand}
                      </p>

                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-bold text-gray-800">
                            ₹{product.price}
                          </span>
                          <span className="text-xs text-gray-500">
                            /{product.unit}
                          </span>
                        </div>
                        <Badge
                          variant={product.inStock ? "success" : "destructive"}
                          className="text-xs font-medium"
                        >
                          {product.inStock
                            ? language === "hindi"
                              ? "स्टॉक में"
                              : "In Stock"
                            : language === "hindi"
                            ? "स्टॉक में नहीं"
                            : "Out of Stock"}
                        </Badge>
                      </div>

                      <Button
                        className="w-full flex items-center justify-center gap-2"
                        variant="outline"
                      >
                        <Eye className="w-4 h-4" />
                        {language === "hindi" ? "विवरण देखें" : "View Details"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recommended for you */}
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>
                    {language === "hindi"
                      ? "आपके लिए अनुशंसित"
                      : "Recommended for You"}
                  </CardTitle>
                  <Button
                    variant="link"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {language === "hindi" ? "सभी देखें" : "View All"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="hover:bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src="/placeholder.svg?height=80&width=80"
                            alt="Hybrid Rice Seeds"
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">
                            Hybrid Rice Seeds
                          </h3>
                          <p className="text-xs text-gray-500 mb-1">
                            Bayer CropScience
                          </p>
                          <div className="flex items-center gap-1 text-amber-500 mb-2">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="text-xs font-medium">
                              4.6 (52)
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-800">
                              ₹950
                            </span>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              {language === "hindi"
                                ? "विवरण देखें"
                                : "View Details"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src="/placeholder.svg?height=80&width=80"
                            alt="Organic Pesticide"
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">
                            Organic Pesticide
                          </h3>
                          <p className="text-xs text-gray-500 mb-1">
                            Organic Solutions
                          </p>
                          <div className="flex items-center gap-1 text-amber-500 mb-2">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span className="text-xs font-medium">
                              4.3 (38)
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-800">
                              ₹580
                            </span>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              {language === "hindi"
                                ? "विवरण देखें"
                                : "View Details"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compare-prices">
          {/* Compare Prices Tab */}
          <div>
            {/* Search and filter */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder={
                      language === "hindi"
                        ? "उत्पाद खोजें..."
                        : "Search products..."
                    }
                    className="w-full pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue
                      placeholder={
                        language === "hindi"
                          ? "सभी श्रेणियां"
                          : "All Categories"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {language === "hindi"
                        ? "सभी श्रेणियां"
                        : "All Categories"}
                    </SelectItem>
                    <SelectItem value="fertilizer">
                      {language === "hindi" ? "उर्वरक" : "Fertilizer"}
                    </SelectItem>
                    <SelectItem value="seeds">
                      {language === "hindi" ? "बीज" : "Seeds"}
                    </SelectItem>
                    <SelectItem value="pesticides">
                      {language === "hindi" ? "कीटनाशक" : "Pesticides"}
                    </SelectItem>
                    <SelectItem value="equipment">
                      {language === "hindi" ? "उपकरण" : "Equipment"}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>{language === "hindi" ? "फ़िल्टर" : "Filter"}</span>
                </Button>
              </div>
            </div>

            {/* Selected products for comparison */}
            {productsToCompare.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>
                      {language === "hindi"
                        ? "तुलना के लिए चयनित उत्पाद"
                        : "Selected Products for Comparison"}
                    </CardTitle>
                    <Button
                      onClick={() => setShowCompareModal(true)}
                      className="bg-green-600 hover:bg-green-700"
                      disabled={productsToCompare.length < 2}
                    >
                      {language === "hindi" ? "तुलना करें" : "Compare"}
                    </Button>
                  </div>
                  <CardDescription>
                    {language === "hindi"
                      ? `${productsToCompare.length} उत्पाद चयनित (अधिकतम 3)`
                      : `${productsToCompare.length} products selected (max 3)`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {productsToCompare.map((product) => (
                      <div
                        key={product.id}
                        className="relative min-w-[200px] max-w-[200px]"
                      >
                        <Card>
                          <div className="relative h-32">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleProductForComparison(product);
                              }}
                            >
                              <span>×</span>
                            </Button>
                          </div>
                          <CardContent className="p-3">
                            <p className="font-medium text-sm truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {product.brand}
                            </p>
                            <p className="font-bold mt-1">
                              ₹{product.price}/{product.unit}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {language === "hindi"
                  ? "उत्पादों की तुलना करें"
                  : "Compare Products"}
              </h2>
              <p className="text-gray-600 mb-4">
                {language === "hindi"
                  ? "तुलना करने के लिए नीचे से उत्पादों का चयन करें। आप एक साथ अधिकतम 3 उत्पादों की तुलना कर सकते हैं।"
                  : "Select products from below to compare. You can compare up to 3 products at once."}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className={`overflow-hidden cursor-pointer ${
                      productsToCompare.some((p) => p.id === product.id)
                        ? "ring-2 ring-green-500"
                        : ""
                    }`}
                    onClick={() => toggleProductForComparison(product)}
                  >
                    <div className="relative h-48 bg-gray-100">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform hover:scale-105"
                      />
                      {productsToCompare.some((p) => p.id === product.id) && (
                        <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center">
                          <div className="bg-green-500 text-white rounded-full p-2">
                            <CheckCircle className="w-6 h-6" />
                          </div>
                        </div>
                      )}
                      {product.discount > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute top-3 left-3"
                        >
                          {product.discount}% OFF
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <Badge variant="outline">{product.category}</Badge>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="text-xs font-medium">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                      </div>

                      <h3 className="font-medium text-gray-800 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        {product.brand}
                      </p>

                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-bold text-gray-800">
                            ₹{product.price}
                          </span>
                          <span className="text-xs text-gray-500">
                            /{product.unit}
                          </span>
                        </div>
                        <Badge
                          variant={product.inStock ? "success" : "destructive"}
                          className="text-xs font-medium"
                        >
                          {product.inStock
                            ? language === "hindi"
                              ? "स्टॉक में"
                              : "In Stock"
                            : language === "hindi"
                            ? "स्टॉक में नहीं"
                            : "Out of Stock"}
                        </Badge>
                      </div>

                      <Button
                        className="w-full flex items-center justify-center gap-2"
                        variant={
                          productsToCompare.some((p) => p.id === product.id)
                            ? "default"
                            : "outline"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleProductForComparison(product);
                        }}
                      >
                        {productsToCompare.some((p) => p.id === product.id) ? (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            {language === "hindi" ? "चयनित" : "Selected"}
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            {language === "hindi"
                              ? "तुलना के लिए जोड़ें"
                              : "Add to Compare"}
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="group-buying">
          {/* Group Buying Tab */}
          <div>
            {/* Hero section */}
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100 mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-2/3">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {language === "hindi"
                        ? "सामूहिक खरीदारी के साथ बचत करें"
                        : "Save with Group Buying"}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {language === "hindi"
                        ? "अन्य किसानों के साथ मिलकर बड़ी मात्रा में खरीदारी करें और 15-30% तक की बचत करें। सामूहिक खरीदारी से बेहतर कीमतें और गुणवत्ता सुनिश्चित करें।"
                        : "Purchase in bulk together with other farmers and save up to 15-30%. Group buying ensures better prices and quality."}
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>
                        {language === "hindi"
                          ? "समूह में शामिल हों"
                          : "Join a Group"}
                      </span>
                    </Button>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <Image
                      src="/placeholder.svg?height=200&width=200&text=Group+Buying"
                      alt="Group buying"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active group buys */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {language === "hindi"
                    ? "सक्रिय समूह खरीदारी"
                    : "Active Group Buys"}
                </h2>
                <div className="flex gap-3">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder={
                          language === "hindi"
                            ? "सभी श्रेणियां"
                            : "All Categories"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {language === "hindi"
                          ? "सभी श्रेणियां"
                          : "All Categories"}
                      </SelectItem>
                      <SelectItem value="fertilizer">
                        {language === "hindi" ? "उर्वरक" : "Fertilizer"}
                      </SelectItem>
                      <SelectItem value="seeds">
                        {language === "hindi" ? "बीज" : "Seeds"}
                      </SelectItem>
                      <SelectItem value="pesticides">
                        {language === "hindi" ? "कीटनाशक" : "Pesticides"}
                      </SelectItem>
                      <SelectItem value="equipment">
                        {language === "hindi" ? "उपकरण" : "Equipment"}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <span>{language === "hindi" ? "फ़िल्टर" : "Filter"}</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    id: 1,
                    title: "Premium NPK Fertilizer",
                    category: "Fertilizer",
                    brand: "Coromandel",
                    image:
                      "/placeholder.svg?height=192&width=256&text=NPK+Fertilizer",
                    originalPrice: 1200,
                    groupPrice: 950,
                    unit: "50kg bag",
                    minMembers: 10,
                    currentMembers: 7,
                    timeLeft: "2 days 5 hours",
                    discount: 21,
                  },
                  {
                    id: 2,
                    title: "Hybrid Wheat Seeds",
                    category: "Seeds",
                    brand: "Bayer",
                    image:
                      "/placeholder.svg?height=192&width=256&text=Wheat+Seeds",
                    originalPrice: 850,
                    groupPrice: 680,
                    unit: "10kg pack",
                    minMembers: 15,
                    currentMembers: 12,
                    timeLeft: "3 days 12 hours",
                    discount: 20,
                  },
                  {
                    id: 3,
                    title: "Organic Pesticide",
                    category: "Pesticides",
                    brand: "UPL Organic",
                    image:
                      "/placeholder.svg?height=192&width=256&text=Organic+Pesticide",
                    originalPrice: 1500,
                    groupPrice: 1050,
                    unit: "5L container",
                    minMembers: 8,
                    currentMembers: 6,
                    timeLeft: "1 day 8 hours",
                    discount: 30,
                  },
                ].map((group) => (
                  <Card key={group.id} className="overflow-hidden">
                    <div className="relative h-48 bg-gray-100">
                      <Image
                        src={group.image || "/placeholder.svg"}
                        alt={group.title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform hover:scale-105"
                      />
                      <Badge
                        variant="destructive"
                        className="absolute top-3 left-3"
                      >
                        {group.discount}% OFF
                      </Badge>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <Badge variant="outline">{group.category}</Badge>
                        <span className="text-xs font-medium text-gray-500">
                          {group.brand}
                        </span>
                      </div>

                      <h3 className="font-medium text-gray-800 mb-2">
                        {group.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-gray-800">
                          ₹{group.groupPrice}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{group.originalPrice}
                        </span>
                        <span className="text-xs text-gray-500">
                          /{group.unit}
                        </span>
                      </div>

                      <Card className="bg-gray-50 mb-3">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-600">
                              {language === "hindi" ? "सदस्य" : "Members"}:{" "}
                              {group.currentMembers}/{group.minMembers}
                            </span>
                            <span className="text-xs font-medium text-green-600">
                              {Math.round(
                                (group.currentMembers / group.minMembers) * 100
                              )}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-green-600 h-1.5 rounded-full"
                              style={{
                                width: `${
                                  (group.currentMembers / group.minMembers) *
                                  100
                                }%`,
                              }}
                            ></div>
                          </div>
                          <div className="flex items-center gap-1 mt-2 text-amber-600">
                            <Clock className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">
                              {group.timeLeft} left
                            </span>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex gap-2">
                        <Button className="flex-1 bg-green-600 hover:bg-green-700">
                          {language === "hindi"
                            ? "समूह में शामिल हों"
                            : "Join Group"}
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* How it works */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-center">
                  {language === "hindi"
                    ? "यह कैसे काम करता है"
                    : "How It Works"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <Users className="w-6 h-6 text-green-600" />,
                      title:
                        language === "hindi"
                          ? "समूह में शामिल हों या बनाएं"
                          : "Join or Create a Group",
                      description:
                        language === "hindi"
                          ? "मौजूदा समूह खरीदारी में शामिल हों या अपनी आवश्यकता के अनुसार नया समूह बनाएं।"
                          : "Join an existing group buy or create a new one based on your needs.",
                    },
                    {
                      icon: <Users className="w-6 h-6 text-blue-600" />,
                      title:
                        language === "hindi"
                          ? "न्यूनतम सदस्य संख्या पूरी करें"
                          : "Reach Minimum Members",
                      description:
                        language === "hindi"
                          ? "समूह खरीदारी सक्रिय होने के लिए न्यूनतम सदस्य संख्या पूरी होनी चाहिए।"
                          : "The group buy activates once the minimum number of members is reached.",
                    },
                    {
                      icon: <ShoppingBag className="w-6 h-6 text-amber-600" />,
                      title:
                        language === "hindi"
                          ? "छूट पर खरीदें"
                          : "Purchase at Discount",
                      description:
                        language === "hindi"
                          ? "समूह पूरा होने पर, सभी सदस्य छूट मूल्य पर उत्पाद खरीद सकते हैं।"
                          : "Once the group is complete, all members can purchase the product at the discounted price.",
                    },
                  ].map((step, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        {step.icon}
                      </div>
                      <h3 className="font-medium text-gray-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Create your own group buy */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="md:w-2/3">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {language === "hindi"
                        ? "अपनी समूह खरीदारी बनाएं"
                        : "Create Your Own Group Buy"}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {language === "hindi"
                        ? "अपनी आवश्यकताओं के अनुसार समूह खरीदारी शुरू करें। अपने क्षेत्र के अन्य किसानों को आमंत्रित करें और बड़ी बचत करें।"
                        : "Start a group buy according to your needs. Invite other farmers in your area and save big."}
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      <span>
                        {language === "hindi"
                          ? "समूह खरीदारी बनाएं"
                          : "Create Group Buy"}
                      </span>
                    </Button>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <Image
                      src="/placeholder.svg?height=200&width=200&text=Create+Group"
                      alt="Create group buy"
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Dealer Verification Modal */}
      <Dialog open={isDealerModalOpen} onOpenChange={setIsDealerModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {language === "hindi"
                ? "विक्रेता सत्यापन"
                : "Dealer Verification"}
            </DialogTitle>
            <DialogDescription>
              {language === "hindi"
                ? "कृपया अपने विक्रेता खाते को सत्यापित करने के लिए निम्नलिखित विवरण प्रदान करें।"
                : "Please provide the following details to verify your dealer account."}
            </DialogDescription>
          </DialogHeader>
          <Form {...dealerForm}>
            <form
              onSubmit={dealerForm.handleSubmit(onDealerSubmit)}
              className="space-y-4"
            >
              <FormField
                control={dealerForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "hindi" ? "नाम" : "Name"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          language === "hindi" ? "पूरा नाम" : "Full name"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={dealerForm.control}
                name="panCard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "hindi"
                        ? "पैन कार्ड नंबर"
                        : "PAN Card Number"}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="ABCDE1234F" {...field} />
                    </FormControl>
                    <FormDescription>
                      {language === "hindi"
                        ? "10 अक्षरों का अल्फ़ान्यूमेरिक कोड"
                        : "10 character alphanumeric code"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={dealerForm.control}
                name="aadharNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "hindi" ? "आधार नंबर" : "Aadhar Number"}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="123456789012" {...field} />
                    </FormControl>
                    <FormDescription>
                      {language === "hindi"
                        ? "12 अंकों का नंबर"
                        : "12 digit number"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={dealerForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "hindi" ? "पता" : "Address"}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={
                          language === "hindi"
                            ? "व्यापार का पता"
                            : "Business address"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={dealerForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "hindi" ? "फोन नंबर" : "Phone Number"}
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="9876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                >
                  {language === "hindi" ? "सत्यापित करें" : "Verify"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Product Listing Modal */}
      <Dialog open={isListingModalOpen} onOpenChange={setIsListingModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {language === "hindi"
                ? "अपना उत्पाद सूचीबद्ध करें"
                : "List Your Product"}
            </DialogTitle>
            <DialogDescription>
              {language === "hindi"
                ? "अपने उत्पाद के बारे में विस्तृत जानकारी प्रदान करें।"
                : "Provide detailed information about your product."}
            </DialogDescription>
          </DialogHeader>
          <Form {...productForm}>
            <form
              onSubmit={productForm.handleSubmit(onProductSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={productForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === "hindi"
                          ? "उत्पाद का नाम"
                          : "Product Name"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            language === "hindi"
                              ? "उत्पाद का नाम"
                              : "Product name"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={productForm.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === "hindi" ? "श्रेणी" : "Category"}
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                language === "hindi"
                                  ? "श्रेणी चुनें"
                                  : "Select category"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Fertilizer">
                              {language === "hindi" ? "उर्वरक" : "Fertilizer"}
                            </SelectItem>
                            <SelectItem value="Seeds">
                              {language === "hindi" ? "बीज" : "Seeds"}
                            </SelectItem>
                            <SelectItem value="Pesticide">
                              {language === "hindi" ? "कीटनाशक" : "Pesticide"}
                            </SelectItem>
                            <SelectItem value="Equipment">
                              {language === "hindi" ? "उपकरण" : "Equipment"}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={productForm.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === "hindi" ? "ब्रांड" : "Brand"}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={
                            language === "hindi"
                              ? "ब्रांड का नाम"
                              : "Brand name"
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    control={productForm.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === "hindi" ? "मूल्य" : "Price"}
                        </FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="₹" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={productForm.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {language === "hindi" ? "इकाई" : "Unit"}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="kg/liter/packet" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={productForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "hindi" ? "विवरण" : "Description"}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={
                          language === "hindi"
                            ? "उत्पाद का विवरण"
                            : "Product description"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={productForm.control}
                name="ingredients"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "hindi"
                        ? "सामग्री/घटक"
                        : "Ingredients/Components"}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={
                          language === "hindi"
                            ? "उत्पाद की सामग्री या घटक"
                            : "Product ingredients or components"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {language === "hindi"
                        ? "प्रत्येक घटक को अलग पंक्ति में लिखें"
                        : "List each component on a separate line"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={productForm.control}
                  name="manufacturingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === "hindi"
                          ? "निर्माण तिथि"
                          : "Manufacturing Date"}
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={productForm.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {language === "hindi" ? "समाप्ति तिथि" : "Expiry Date"}
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={productForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {language === "hindi" ? "स्थान" : "Location"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={
                          language === "hindi"
                            ? "उत्पाद का स्थान"
                            : "Product location"
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                >
                  {language === "hindi"
                    ? "उत्पाद सूचीबद्ध करें"
                    : "List Product"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Product Detail Modal */}
      <Dialog
        open={isProductDetailModalOpen}
        onOpenChange={setIsProductDetailModalOpen}
      >
        {selectedProduct && (
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {selectedProduct.name}
              </DialogTitle>
              <DialogDescription>
                {selectedProduct.brand} • {selectedProduct.category}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
                {selectedProduct.verified && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white p-1.5 rounded-full">
                    <Shield className="w-4 h-4" />
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {language === "hindi" ? "मूल्य" : "Price"}
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-800">
                      ₹{selectedProduct.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      /{selectedProduct.unit}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {language === "hindi" ? "रेटिंग" : "Rating"}
                  </h3>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-medium">
                      {selectedProduct.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({selectedProduct.reviews}{" "}
                      {language === "hindi" ? "समीक्षाएँ" : "reviews"})
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {language === "hindi" ? "स्थान" : "Location"}
                  </h3>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{selectedProduct.location}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {language === "hindi"
                      ? "निर्माण तिथि"
                      : "Manufacturing Date"}
                  </h3>
                  <span>{selectedProduct.manufacturingDate}</span>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    {language === "hindi" ? "समाप्ति तिथि" : "Expiry Date"}
                  </h3>
                  <span>{selectedProduct.expiryDate}</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">
                  {language === "hindi"
                    ? "सामग्री/घटक"
                    : "Ingredients/Components"}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => speakIngredients(selectedProduct.ingredients)}
                  className="flex items-center gap-1"
                >
                  <Volume2 className="w-4 h-4" />
                  {language === "hindi" ? "सुनें" : "Listen"}
                </Button>
              </div>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm">
                {selectedProduct.ingredients}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500">
                {language === "hindi" ? "विवरण" : "Description"}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {selectedProduct.description}
              </p>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                {language === "hindi" ? "कार्ट में जोड़ें" : "Add to Cart"}
              </Button>
              <Button variant="outline" className="w-full sm:w-auto">
                <Heart className="w-4 h-4 mr-2" />
                {language === "hindi"
                  ? "विशलिस्ट में जोड़ें"
                  : "Add to Wishlist"}
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>

      {/* Compare Products Modal */}
      <Dialog open={showCompareModal} onOpenChange={setShowCompareModal}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>
              {language === "hindi" ? "उत्पादों की तुलना" : "Compare Products"}
            </DialogTitle>
            <DialogDescription>
              {language === "hindi"
                ? "चयनित उत्पादों की विशेषताओं की तुलना करें"
                : "Compare features of selected products"}
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-left border-b"></th>
                  {productsToCompare.map((product) => (
                    <th key={product.id} className="p-2 text-center border-b">
                      <div className="flex flex-col items-center gap-2">
                        <div className="relative w-24 h-24 mx-auto">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-md"
                          />
                        </div>
                        <h3 className="font-medium">{product.name}</h3>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 font-medium border-b">
                    {language === "hindi" ? "श्रेणी" : "Category"}
                  </td>
                  {productsToCompare.map((product) => (
                    <td key={product.id} className="p-2 text-center border-b">
                      {product.category}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 font-medium border-b">
                    {language === "hindi" ? "ब्रांड" : "Brand"}
                  </td>
                  {productsToCompare.map((product) => (
                    <td key={product.id} className="p-2 text-center border-b">
                      {product.brand}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 font-medium border-b">
                    {language === "hindi" ? "मूल्य" : "Price"}
                  </td>
                  {productsToCompare.map((product) => (
                    <td
                      key={product.id}
                      className="p-2 text-center border-b font-bold"
                    >
                      ₹{product.price}/{product.unit}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 font-medium border-b">
                    {language === "hindi" ? "रेटिंग" : "Rating"}
                  </td>
                  {productsToCompare.map((product) => (
                    <td key={product.id} className="p-2 text-center border-b">
                      <div className="flex items-center justify-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span>
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 font-medium border-b">
                    {language === "hindi" ? "स्टॉक में" : "In Stock"}
                  </td>
                  {productsToCompare.map((product) => (
                    <td key={product.id} className="p-2 text-center border-b">
                      <Badge
                        variant={product.inStock ? "success" : "destructive"}
                      >
                        {product.inStock
                          ? language === "hindi"
                            ? "हां"
                            : "Yes"
                          : language === "hindi"
                          ? "नहीं"
                          : "No"}
                      </Badge>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 font-medium border-b">
                    {language === "hindi"
                      ? "निर्माण तिथि"
                      : "Manufacturing Date"}
                  </td>
                  {productsToCompare.map((product) => (
                    <td key={product.id} className="p-2 text-center border-b">
                      {product.manufacturingDate}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 font-medium border-b">
                    {language === "hindi" ? "समाप्ति तिथि" : "Expiry Date"}
                  </td>
                  {productsToCompare.map((product) => (
                    <td key={product.id} className="p-2 text-center border-b">
                      {product.expiryDate}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-2 font-medium border-b">
                    {language === "hindi" ? "स्थान" : "Location"}
                  </td>
                  {productsToCompare.map((product) => (
                    <td key={product.id} className="p-2 text-center border-b">
                      {product.location}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <DialogFooter>
            <Button onClick={() => setShowCompareModal(false)}>
              {language === "hindi" ? "बंद करें" : "Close"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
