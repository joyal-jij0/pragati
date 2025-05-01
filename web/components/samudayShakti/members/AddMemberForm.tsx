"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, User, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FPOMember } from "../FPOMembers";

interface AddMemberFormProps {
  onAdd: (member: Omit<FPOMember, "id">) => void;
  onCancel: () => void;
}

const AddMemberForm = ({ onAdd, onCancel }: AddMemberFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "Member",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    location: "",
    joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    phone: "",
    email: "",
    landHolding: "",
    crops: [] as string[],
    active: true,
    contributions: 0,
    rating: 3.0
  });

  const [cropInput, setCropInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, active: checked }));
  };

  const handleAddCrop = () => {
    if (cropInput.trim()) {
      setFormData(prev => ({
        ...prev,
        crops: [...prev.crops, cropInput.trim()]
      }));
      setCropInput("");
    }
  };

  const handleRemoveCrop = (index: number) => {
    setFormData(prev => ({
      ...prev,
      crops: prev.crops.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.landHolding.trim()) newErrors.landHolding = "Land holding is required";
    if (formData.crops.length === 0) newErrors.crops = "At least one crop is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAdd(formData);
    }
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      onClick={onCancel}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        variants={formVariants}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Add New Member</h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? "border-red-300" : ""}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="Member">Member</option>
                <option value="Secretary">Secretary</option>
                <option value="Treasurer">Treasurer</option>
                <option value="Vice President">Vice President</option>
                <option value="President">President</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={errors.location ? "border-red-300" : ""}
              />
              {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? "border-red-300" : ""}
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "border-red-300" : ""}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="landHolding">Land Holding (in Acres) <span className="text-red-500">*</span></Label>
              <Input
                id="landHolding"
                name="landHolding"
                value={formData.landHolding}
                onChange={handleInputChange}
                className={errors.landHolding ? "border-red-300" : ""}
              />
              {errors.landHolding && <p className="text-red-500 text-xs">{errors.landHolding}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="crops">Crops <span className="text-red-500">*</span></Label>
            <div className="flex gap-2">
              <Input
                id="cropInput"
                value={cropInput}
                onChange={(e) => setCropInput(e.target.value)}
                placeholder="Add a crop"
                className={errors.crops ? "border-red-300" : ""}
              />
              <Button type="button" onClick={handleAddCrop}>Add</Button>
            </div>
            {errors.crops && <p className="text-red-500 text-xs">{errors.crops}</p>}
            
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.crops.map((crop, index) => (
                <div key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium flex items-center">
                  <span>{crop}</span>
                  <button 
                    type="button" 
                    className="ml-2 text-blue-500 hover:text-blue-700"
                    onClick={() => handleRemoveCrop(index)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="active" 
              checked={formData.active}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="active">Active Member</Label>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              <Check className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddMemberForm;