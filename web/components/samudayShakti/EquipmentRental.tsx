"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Tractor, 
  Calendar, 
  Clock, 
  MapPin, 
  ChevronRight, 
  Star, 
  Info, 
  DollarSign, 
  Filter, 
  Search,
  Plus,
  ArrowRight,
  Eye,
  Heart,
  Share2
} from "lucide-react";
import EquipmentDetails from "./rental/EquipmentDetails";
import RentalForm from "./rental/RentalForm";
import ListEquipmentForm from "./rental/ListEquipmentForm";

interface Equipment {
  id: number;
  name: string;
  type: string;
  image: string;
  owner: string;
  rate: string;
  rateType: string;
  location: string;
  availability: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
}

interface EquipmentRentalProps {
  selectedFPO: string;
}

const EquipmentRental = ({ selectedFPO }: EquipmentRentalProps) => {
  const [activeView, setActiveView] = useState<"list" | "details" | "form" | "listEquipment">("list");
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([
    {
      id: 1,
      name: "John Deere 5310",
      type: "Tractor",
      image: "https://assets.khetigaadi.com/new-tractor/John-Deere-53101735727642_OpIDdN3Zb.png",
      owner: "Rajesh Kumar",
      rate: "₹800",
      rateType: "per day",
      location: "Sonipat, Haryana",
      availability: "Available",
      rating: 4.5,
      reviews: 28,
      description: "Powerful 55 HP tractor suitable for all farming operations. Well-maintained with air-conditioned cabin and power steering.",
      features: ["55 HP Engine", "4WD", "Air Conditioned Cabin", "Power Steering", "Hydraulic System"]
    },
    {
      id: 2,
      name: "Mahindra Rotavator",
      type: "Implement",
      image: "https://d2ki7eiqd260sq.cloudfront.net/MAHINDRA-GYROVATOR44271477-28d3-4da2-b7c8-764ee7d830d3.webp",
      owner: "Suresh Singh",
      rate: "₹400",
      rateType: "per day",
      location: "Sonipat, Haryana",
      availability: "Available",
      rating: 4.2,
      reviews: 15,
      description: "Heavy-duty rotavator for efficient soil preparation. Compatible with most tractor models above 35 HP.",
      features: ["48 Blades", "5 feet width", "Gear Driven", "Adjustable Depth", "Heavy Duty Construction"]
    },
    {
      id: 3,
      name: "Harvester Machine",
      type: "Harvester",
      image: "https://media.istockphoto.com/id/1339336243/photo/john-deere-s670-soybean-sunset.jpg?s=612x612&w=0&k=20&c=pH59jG3UG73i2B_hxXH3UEGvOFHuGAxQh1feJ2IuJTM=",
      owner: "FPO Equipment Pool",
      rate: "₹2,500",
      rateType: "per day",
      location: "Sonipat, Haryana",
      availability: "Booked until 15 July",
      rating: 4.8,
      reviews: 32,
      description: "Modern combine harvester for wheat, rice, and other grain crops. Includes operator in the rental price.",
      features: ["Self-Propelled", "Grain Tank", "AC Cabin", "GPS Navigation", "Crop Monitor"]
    },
    {
      id: 4,
      name: "Water Pump Set",
      type: "Irrigation",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJkR99f0wCsl_ee1p0fPG1n48fzU2r51InLw&s",
      owner: "Amit Verma",
      rate: "₹300",
      rateType: "per day",
      location: "Sonipat, Haryana",
      availability: "Available",
      rating: 4.0,
      reviews: 22,
      description: "5 HP electric water pump with pipes for irrigation. Energy efficient and easy to transport.",
      features: ["5 HP Motor", "Includes 100m Pipe", "Electric Operated", "Portable", "Low Maintenance"]
    }
  ]);

  // Toggle favorite status
  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Filter equipment based on search and type filter
  const filteredEquipment = equipmentList.filter(equipment => {
    const matchesSearch = equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          equipment.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || equipment.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Handle equipment selection
  const handleEquipmentSelect = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setActiveView("details");
  };

  // Handle rental request
  const handleRentRequest = (equipment: Equipment) => {
    setSelectedEquipment(equipment);
    setActiveView("form");
  };

  // Handle back to list
  const handleBackToList = () => {
    setActiveView("list");
    setSelectedEquipment(null);
  };

  // Handle form submission
  const handleFormSubmit = (formData: any) => {
    console.log("Rental form submitted:", formData);
    // Here you would typically send this data to your backend
    // Show success message and return to list
    alert("Rental request submitted successfully!");
    setActiveView("list");
  };

  // Handle equipment listing form submission
  const handleListEquipmentSubmit = (formData: any) => {
    console.log("Equipment listing submitted:", formData);
    
    // Add the new equipment to the list
    setEquipmentList(prevList => [
      {
        ...formData,
        id: Date.now(), // Generate a unique ID
        rating: 0,
        reviews: 0
      },
      ...prevList
    ]);
    
    // Show success message and return to list
    alert("Equipment listed successfully!");
    setActiveView("list");
  };

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

  // Get equipment type emoji
  const getEquipmentEmoji = (type: string) => {
    switch(type.toLowerCase()) {
      case 'tractor': return '🚜';
      case 'implement': return '🔧';
      case 'harvester': return '🌾';
      case 'irrigation': return '💧';
      default: return '🚜';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">🚜 Equipment Rental</h2>
          <p className="text-gray-600">Rent farming equipment from {selectedFPO} members</p>
        </div>
        {activeView === "list" && (
          <button 
            onClick={() => setActiveView("listEquipment")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
          >
            <Plus size={16} />
            <span>List Equipment</span>
          </button>
        )}
        {activeView !== "list" && (
          <button 
            onClick={handleBackToList}
            className="text-green-600 hover:text-green-700 flex items-center gap-1 font-medium"
          >
            <ArrowRight size={16} className="rotate-180" />
            <span>Back to List</span>
          </button>
        )}
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {activeView === "list" && (
          <>
            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-md p-5 mb-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search equipment..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="sm:w-48">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <select
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      <option value="tractor">🚜 Tractors</option>
                      <option value="implement">🔧 Implements</option>
                      <option value="harvester">🌾 Harvesters</option>
                      <option value="irrigation">💧 Irrigation</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <ChevronRight className="rotate-90" size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipment List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEquipment.map((equipment) => (
                <motion.div
                  key={equipment.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleEquipmentSelect(equipment)}
                >
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    {equipment.image ? (
                      <img 
                        src={equipment.image} 
                        alt={equipment.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Tractor size={48} className="text-gray-300" />
                      </div>
                    )}
                    <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start">
                      <div className="bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        {getEquipmentEmoji(equipment.type)} {equipment.type}
                      </div>
                      <button 
                        onClick={(e) => toggleFavorite(equipment.id, e)}
                        className={`p-2 rounded-full ${favorites.includes(equipment.id) ? 'bg-red-50 text-red-500' : 'bg-white bg-opacity-90 text-gray-500'} shadow-sm hover:scale-110 transition-transform`}
                      >
                        <Heart size={16} className={favorites.includes(equipment.id) ? 'fill-red-500' : ''} />
                      </button>
                    </div>
                    {equipment.availability !== "Available" && (
                      <div className="absolute bottom-3 right-3 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        ⏳ {equipment.availability}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{equipment.name}</h3>
                        <p className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin size={14} className="mr-1" />
                          <span>{equipment.location}</span>
                        </p>
                      </div>
                      <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        {equipment.rate} <span className="text-xs">{equipment.rateType}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <Star size={14} className="text-amber-400 fill-amber-400" />
                          <span className="ml-1 text-sm font-medium">{equipment.rating}</span>
                        </div>
                        <span className="mx-1 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">{equipment.reviews} reviews</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        👨‍🌾 {equipment.owner}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEquipmentSelect(equipment);
                        }}
                        className="text-sm text-green-600 hover:text-green-700 flex items-center font-medium"
                      >
                        <Eye size={14} className="mr-1" />
                        <span>View Details</span>
                      </button>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (equipment.availability === "Available") {
                            handleRentRequest(equipment);
                          }
                        }}
                        className={`text-sm px-3 py-1.5 rounded-lg flex items-center gap-1 ${
                          equipment.availability === "Available" 
                            ? "bg-green-600 text-white hover:bg-green-700 shadow-sm" 
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                        disabled={equipment.availability !== "Available"}
                      >
                        <Calendar size={14} />
                        <span>Rent Now</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {filteredEquipment.length === 0 && (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Tractor size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">No equipment found 😕</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </>
        )}

        {activeView === "details" && selectedEquipment && (
          <EquipmentDetails
            equipment={selectedEquipment}
            onRentRequest={handleRentRequest}
            onBack={handleBackToList}

          />
        )}

        {activeView === "form" && selectedEquipment && (
          <RentalForm 
            equipment={selectedEquipment}
            onSubmit={handleFormSubmit}
            onCancel={handleBackToList}
          />
        )}

        {activeView === "listEquipment" && (
          <ListEquipmentForm 
            onSubmit={handleListEquipmentSubmit}
            onCancel={handleBackToList}
          />
        )}
      </motion.div>
    </div>
  );
};

export default EquipmentRental;