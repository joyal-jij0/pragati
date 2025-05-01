"use client";

import React from "react";
import { motion } from "framer-motion";
import { Camera, Leaf, ArrowRight, Upload, Image } from "lucide-react";
import Link from "next/link";

const FasalDoctorPreview = () => {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-4 text-white">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
            <Leaf className="h-5 w-5" />
          </div>
          <h3 className="text-lg font-bold">फसल डॉक्टर</h3>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-4">
          अपनी फसल की समस्या का पता लगाएं। बस एक तस्वीर अपलोड करें और हमारा AI आपकी फसल की स्थिति का विश्लेषण करेगा।
        </p>
        
        <div className="bg-emerald-50 rounded-xl p-3 mb-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-2">
              <Camera className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-800">फसल की तस्वीर अपलोड करें</div>
              <div className="text-xs text-gray-500">रोग या कीट का पता लगाएं</div>
            </div>
          </div>
        </div>
        
        <Link href="/fasal-doctor" className="block">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium flex items-center justify-center"
          >
            फसल डॉक्टर पर जाएं
            <ArrowRight className="h-4 w-4 ml-1" />
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default FasalDoctorPreview;