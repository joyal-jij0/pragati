"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Tractor,
  Leaf,
  Star,
  MoreHorizontal,
  Trash2,
  Edit,
  UserMinus
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { FPOMember } from "../FPOMembers";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MembersListProps {
  members: FPOMember[];
  onRemoveMember: (id: number) => void;
}

const MembersList = ({ members, onRemoveMember }: MembersListProps) => {
  const [memberToRemove, setMemberToRemove] = React.useState<number | null>(null);

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

  const handleRemoveClick = (id: number) => {
    setMemberToRemove(id);
  };

  const confirmRemove = () => {
    if (memberToRemove !== null) {
      onRemoveMember(memberToRemove);
      setMemberToRemove(null);
    }
  };

  const cancelRemove = () => {
    setMemberToRemove(null);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {members.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-500">No members found matching your criteria.</p>
        </div>
      ) : (
        members.map((member) => (
          <motion.div
            key={member.id}
            variants={itemVariants}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14 border-2 border-green-100">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-green-100 text-green-800">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium text-gray-800">{member.name}</h3>
                      <Badge className={`${
                        member.role === "President" || member.role === "Vice President" 
                          ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                          : member.role === "Secretary" || member.role === "Treasurer"
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}>
                        {member.role}
                      </Badge>
                      {member.active ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                          Inactive
                        </Badge>
                      )}
                    </div>
                    
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{member.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Joined: {member.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex flex-col items-end">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${star <= Math.floor(member.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} 
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-1">{member.rating}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{member.contributions}</span> contributions
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger className="mt-2 p-2 rounded-full hover:bg-gray-100">
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        <span>Edit Member</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="flex items-center gap-2 text-red-600"
                        onClick={() => handleRemoveClick(member.id)}
                      >
                        <UserMinus className="h-4 w-4" />
                        <span>Remove Member</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                    <Leaf className="h-3 w-3 mr-1" />
                    <span>Land: {member.landHolding}</span>
                  </div>
                  {member.crops.map((crop, index) => (
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

      {/* Confirmation Dialog for Member Removal */}
      <AlertDialog open={memberToRemove !== null} onOpenChange={cancelRemove}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this member from the FPO? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmRemove}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default MembersList;