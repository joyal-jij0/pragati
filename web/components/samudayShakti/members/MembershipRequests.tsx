"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Check,
  X,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Leaf,
  Tractor
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MembershipRequest {
  id: number;
  name: string;
  avatar: string;
  location: string;
  phone: string;
  email: string;
  landHolding: string;
  crops: string[];
  requestDate: string;
  status: string;
}

interface MembershipRequestsProps {
  requests: MembershipRequest[];
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}

const MembershipRequests = ({ requests, onAccept, onReject }: MembershipRequestsProps) => {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {requests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No Pending Requests</h3>
          <p className="text-gray-500">There are no membership requests at this time.</p>
        </div>
      ) : (
        requests.map((request) => (
          <motion.div
            key={request.id}
            variants={itemVariants}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14 border-2 border-blue-100">
                    <AvatarImage src={request.avatar} alt={request.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-800">
                      {request.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium text-gray-800">{request.name}</h3>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        New Request
                      </Badge>
                    </div>
                    
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{request.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{request.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{request.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Requested: {request.requestDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full md:w-auto bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
                    onClick={() => onAccept(request.id)}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Accept
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full md:w-auto bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700"
                    onClick={() => onReject(request.id)}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <Leaf className="h-3 w-3 mr-1" />
                    <span>Land: {request.landHolding}</span>
                  </div>
                  {request.crops.map((crop, index) => (
                    <div key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <Tractor className="h-3 w-3 mr-1" />
                      <span>{crop}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

export default MembershipRequests;