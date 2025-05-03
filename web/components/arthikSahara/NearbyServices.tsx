"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Search, 
  Phone, 
  Clock, 
  Star, 
  ExternalLink, 
  ChevronRight,
  Filter,
  Tractor,
  Building,
  ShoppingBag,
  Truck,
  Droplets
} from "lucide-react";

interface NearbyServicesProps {
  location: string;
}

const NearbyServices = ({ location }: NearbyServicesProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [selectedService, setSelectedService] = useState<number | null>(null);
  
  // Sample data for nearby services
  const services = [
    {
      id: 1,
      name: "Sonipat Krishi Kendra",
      category: "supplies",
      distance: "2.5 km",
      address: "Main Market Road, Sonipat",
      phone: "+91 98765 43210",
      hours: "9:00 AM - 7:00 PM",
      rating: 4.5,
      reviews: 28,
      services: ["Seeds", "Fertilizers", "Pesticides", "Farm Tools"],
      image: "https://static.langimg.com/photo/101825517/101825517.jpg?imgsize=302594"
    },
    {
      id: 2,
      name: "Haryana Agro Machinery",
      category: "equipment",
      distance: "4.2 km",
      address: "Industrial Area, Sonipat",
      phone: "+91 87654 32109",
      hours: "10:00 AM - 6:00 PM",
      rating: 4.2,
      reviews: 15,
      services: ["Tractor Repair", "Equipment Rental", "Spare Parts", "New Machinery"],
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: 3,
      name: "Sonipat Mandi",
      category: "market",
      distance: "3.8 km",
      address: "Mandi Road, Sonipat",
      phone: "+91 76543 21098",
      hours: "6:00 AM - 8:00 PM",
      rating: 4.7,
      reviews: 42,
      services: ["Crop Selling", "Wholesale Market", "Price Information", "Storage Facilities"],
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: 4,
      name: "Kisan Transport Services",
      category: "transport",
      distance: "5.1 km",
      address: "Highway Bypass, Sonipat",
      phone: "+91 65432 10987",
      hours: "24 hours",
      rating: 4.0,
      reviews: 18,
      services: ["Crop Transport", "Cold Storage", "Logistics", "Rental Vehicles"],
      image: "https://indiainfrahub.com/wp-content/uploads/2021/02/goods-train-1580537992.jpg"
    },
    {
      id: 5,
      name: "Irrigation Solutions",
      category: "irrigation",
      distance: "3.5 km",
      address: "Agricultural Zone, Sonipat",
      phone: "+91 54321 09876",
      hours: "9:00 AM - 5:00 PM",
      rating: 4.3,
      reviews: 22,
      services: ["Drip Irrigation", "Sprinklers", "Water Pumps", "Installation Services"],
      image: "https://content.jdmagicbox.com/comp/def_content/irrigation-service/v3lvfn4tfj-irrigation-service-4-y9me0.jpg"
    }
  ];

  // Filter services based on search term and category
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "supplies":
        return <ShoppingBag className="h-4 w-4" />;
      case "equipment":
        return <Tractor className="h-4 w-4" />;
      case "market":
        return <Building className="h-4 w-4" />;
      case "transport":
        return <Truck className="h-4 w-4" />;
      case "irrigation":
        return <Droplets className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "supplies":
        return "bg-green-100 text-green-800";
      case "equipment":
        return "bg-blue-100 text-blue-800";
      case "market":
        return "bg-amber-100 text-amber-800";
      case "transport":
        return "bg-purple-100 text-purple-800";
      case "irrigation":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search for services..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            className="bg-transparent border-none focus:outline-none text-sm text-gray-700"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="supplies">Farm Supplies</option>
            <option value="equipment">Equipment</option>
            <option value="market">Markets</option>
            <option value="transport">Transport</option>
            <option value="irrigation">Irrigation</option>
          </select>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center bg-gray-50 p-3 rounded-lg">
        <MapPin className="h-5 w-5 text-green-600 mr-2" />
        <div>
          <span className="text-sm text-gray-500">Current Location:</span>
          <span className="ml-2 font-medium text-gray-800">{location}</span>
        </div>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service) => (
          <motion.div
            key={service.id}
            className={`bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
              selectedService === service.id ? "ring-2 ring-green-500" : ""
            }`}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedService(service.id === selectedService ? null : service.id)}
          >
            <div className="h-40 overflow-hidden relative">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                  {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                </span>
              </div>
              <div className="absolute top-3 right-3">
                <span className="bg-white/90 px-2 py-1 rounded-full text-xs font-medium text-gray-800 flex items-center">
                  <MapPin className="h-3 w-3 text-gray-500 mr-1" />
                  {service.distance}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800">{service.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-amber-500 mr-1" />
                  <span className="text-sm font-medium">{service.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({service.reviews})</span>
                </div>
              </div>
              
              <div className="mt-2 flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                <span>{service.address}</span>
              </div>
              
              <div className="mt-1 flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 text-gray-400 mr-1" />
                <span>{service.hours}</span>
              </div>
              
              {selectedService === service.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-3"
                >
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Services Offered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.services.map((item, index) => (
                        <span key={index} className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-green-600 mr-1" />
                    <a href={`tel:${service.phone}`} className="text-sm text-green-600 font-medium">
                      {service.phone}
                    </a>
                  </div>
                  
                  <div className="flex justify-between">
                    <button className="text-sm text-green-600 font-medium flex items-center">
                      Get Directions
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                    <button className="text-sm text-blue-600 font-medium flex items-center">
                      View Details
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredServices.length === 0 && (
        <div className="text-center py-10">
          <div className="text-gray-400 mb-2">No services found matching your criteria</div>
          <button 
            className="text-green-600 font-medium"
            onClick={() => {
              setSearchTerm("");
              setFilterCategory("all");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default NearbyServices;