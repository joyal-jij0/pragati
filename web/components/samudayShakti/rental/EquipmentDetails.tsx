import React from "react";
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
  User,
  ArrowLeft,
  Check,
  AlertTriangle,
  Heart,
  Share2
} from "lucide-react";

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

interface EquipmentDetailsProps {
  equipment: Equipment;
  onRentRequest: (equipment: Equipment) => void;
  onBack: () => void;
}

const EquipmentDetails = ({ equipment, onRentRequest, onBack }: EquipmentDetailsProps) => {
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
    <motion.div
      variants={containerVariants}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      {/* Equipment Image */}
      <div className="aspect-video bg-gray-100 relative overflow-hidden">
        {equipment.image ? (
          <img 
            src={equipment.image} 
            alt={equipment.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Tractor size={64} className="text-gray-300" />
          </div>
        )}
        <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start">
          <div className="bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
            {getEquipmentEmoji(equipment.type)} {equipment.type}
          </div>
          <div className="flex gap-2">
            <button 
              className="p-2 rounded-full bg-white bg-opacity-90 text-gray-500 shadow-sm hover:scale-110 transition-transform"
            >
              <Heart size={16} />
            </button>
            <button 
              className="p-2 rounded-full bg-white bg-opacity-90 text-gray-500 shadow-sm hover:scale-110 transition-transform"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>
        {equipment.availability !== "Available" && (
          <div className="absolute bottom-3 right-3 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
            ⏳ {equipment.availability}
          </div>
        )}
      </div>

      {/* Equipment Details */}
      <div className="p-6">
        <motion.div variants={itemVariants} className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{equipment.name}</h2>
            <p className="text-gray-500 flex items-center gap-1">
              {getEquipmentEmoji(equipment.type)} {equipment.type}
            </p>
          </div>
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-lg font-medium shadow-sm">
            {equipment.rate} <span className="text-sm">{equipment.rateType}</span>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Owner Info */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-full">
                <User size={20} className="text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Owner</p>
                <p className="font-medium flex items-center">👨‍🌾 {equipment.owner}</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-full">
                <MapPin size={20} className="text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{equipment.location}</p>
              </div>
            </div>

            {/* Availability */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-full">
                <Calendar size={20} className="text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Availability</p>
                <p className={`font-medium ${equipment.availability === "Available" ? "text-green-600" : "text-amber-600"}`}>
                  {equipment.availability === "Available" ? "✅ Available" : equipment.availability}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-full">
                <Star size={20} className="text-gray-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Rating</p>
                <div className="flex items-center">
                  <div className="flex items-center">
                    <Star size={16} className="text-amber-400 fill-amber-400" />
                    <span className="ml-1 font-medium">{equipment.rating}</span>
                  </div>
                  <span className="mx-1 text-gray-300">•</span>
                  <span className="text-gray-500">{equipment.reviews} reviews</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            {/* Description */}
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600">{equipment.description}</p>
            </motion.div>

            {/* Features */}
            <motion.div variants={itemVariants} className="mt-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {equipment.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Rental Guidelines */}
        <motion.div variants={itemVariants} className="mt-8">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info size={20} className="text-blue-500 mt-0.5" />
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">Rental Guidelines</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Security deposit required (refundable)</li>
                  <li>• Valid ID proof needed for rental</li>
                  <li>• Operator available at additional cost</li>
                  <li>• Fuel not included in rental price</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Warning for unavailable equipment */}
        {equipment.availability !== "Available" && (
          <motion.div variants={itemVariants} className="mt-4">
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-amber-500 mt-0.5" />
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Currently Unavailable</h3>
                  <p className="text-gray-600">This equipment is currently {equipment.availability.toLowerCase()}. You can check back later or browse other available equipment.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to List</span>
          </button>
          
          <button
            onClick={() => onRentRequest(equipment)}
            disabled={equipment.availability !== "Available"}
            className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 flex-1 ${
              equipment.availability === "Available"
                ? "bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Calendar size={18} />
            <span>Rent Now</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EquipmentDetails;