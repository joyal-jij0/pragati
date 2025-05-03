"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Tractor, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Info,
  CheckCircle,
  AlertTriangle,
  Upload,
  FileText,
  Camera,
  CreditCard,
  FileCheck,
  Shield
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

interface RentalFormProps {
  equipment: Equipment | null;
  onSubmit: (formData: any) => void;
  onCancel: () => void;
}

const RentalForm = ({ equipment, onSubmit, onCancel }: RentalFormProps) => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    purpose: "",
    deliveryOption: "pickup",
    deliveryAddress: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    additionalNotes: "",
    idType: "aadhar",
    idNumber: "",
    userImage: null as string | null,
    equipmentImage: null as string | null,
    termsAccepted: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [previewImage, setPreviewImage] = useState<{user: string | null, equipment: string | null}>({
    user: null,
    equipment: null
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const equipmentFileInputRef = useRef<HTMLInputElement>(null);

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
    
    // Clear error when user checks
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'user' | 'equipment') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        if (type === 'user') {
          setFormData(prev => ({ ...prev, userImage: result }));
          setPreviewImage(prev => ({ ...prev, user: result }));
        } else {
          setFormData(prev => ({ ...prev, equipmentImage: result }));
          setPreviewImage(prev => ({ ...prev, equipment: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const triggerFileInput = (type: 'user' | 'equipment') => {
    if (type === 'user' && fileInputRef.current) {
      fileInputRef.current.click();
    } else if (type === 'equipment' && equipmentFileInputRef.current) {
      equipmentFileInputRef.current.click();
    }
  };

  const validateIdNumber = (type: string, value: string): boolean => {
    if (!value.trim()) return false;
    
    switch (type) {
      case "aadhar":
        // Aadhar is 12 digits
        return /^\d{12}$/.test(value);
      case "pan":
        // PAN is 10 alphanumeric characters
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value);
      case "voter":
        // Voter ID typically has 10 characters
        return /^[A-Z]{3}[0-9]{7}$/.test(value);
      case "ration":
        // Ration card varies by state, using a general pattern
        return /^[A-Z0-9]{8,12}$/.test(value);
      default:
        return false;
    }
  };

  const validateForm = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.startDate) newErrors.startDate = "Start date is required";
      if (!formData.endDate) newErrors.endDate = "End date is required";
      if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
        newErrors.endDate = "End date must be after start date";
      }
      if (!formData.purpose.trim()) newErrors.purpose = "Purpose is required";
      if (formData.deliveryOption === "delivery" && !formData.deliveryAddress.trim()) {
        newErrors.deliveryAddress = "Delivery address is required";
      }
    } else if (step === 2) {
      if (!formData.contactName.trim()) newErrors.contactName = "Name is required";
      if (!formData.contactPhone.trim()) {
        newErrors.contactPhone = "Phone number is required";
      } else if (!/^[6-9]\d{9}$/.test(formData.contactPhone)) {
        newErrors.contactPhone = "Enter a valid 10-digit Indian mobile number";
      }
      if (!formData.contactEmail.trim()) {
        newErrors.contactEmail = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
        newErrors.contactEmail = "Email is invalid";
      }
    } else if (step === 3) {
      if (!validateIdNumber(formData.idType, formData.idNumber)) {
        newErrors.idNumber = `Enter a valid ${formData.idType === 'aadhar' ? 'Aadhar' : 
          formData.idType === 'pan' ? 'PAN' : 
          formData.idType === 'voter' ? 'Voter ID' : 'Ration Card'} number`;
      }
      if (!formData.userImage) {
        newErrors.userImage = "Please upload your photo for verification";
      }
      if (!formData.equipmentImage) {
        newErrors.equipmentImage = "Please upload a photo of the equipment location";
      }
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = "You must accept the terms and conditions";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateForm(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm(currentStep)) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        onSubmit({
          equipmentId: equipment?.id,
          equipmentName: equipment?.name,
          ...formData,
          status: "pending",
          requestDate: new Date().toISOString(),
          requestId: `REQ-${Date.now().toString().slice(-6)}`
        });
        setIsSubmitting(false);
      }, 1000);
    }
  };

  // Calculate rental duration and cost
  const calculateRentalDetails = () => {
    if (!formData.startDate || !formData.endDate) return { days: 0, cost: 0 };
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Extract rate value from string (e.g., "₹800/day" -> 800)
    const rateValue = equipment?.rate ? parseInt(equipment.rate.replace(/[^0-9]/g, '')) : 0;
    
    // Calculate cost based on rate type
    let totalCost = 0;
    if (equipment?.rateType === 'hourly') {
      totalCost = rateValue * diffDays * 8; // Assuming 8 hours per day
    } else if (equipment?.rateType === 'daily') {
      totalCost = rateValue * diffDays;
    } else if (equipment?.rateType === 'weekly') {
      totalCost = rateValue * Math.ceil(diffDays / 7);
    }
    
    return { days: diffDays, cost: totalCost };
  };
  
  const { days, cost } = calculateRentalDetails();

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

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    exit: { 
      opacity: 0, 
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  if (!equipment) return null;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            {/* Equipment Details Summary */}
            <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                {equipment.image ? (
                  <img 
                    src={equipment.image} 
                    alt={equipment.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Tractor className="h-10 w-10 text-gray-300" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{equipment.name}</h3>
                <p className="text-sm text-gray-600">{equipment.owner}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-medium text-gray-800">{equipment.rate}</span>
                  <span className="text-xs text-gray-500">{equipment.rateType}</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3" />
                  <span>{equipment.location}</span>
                </div>
              </div>
            </div>
            
            {/* Rental Period */}
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-3">Rental Period</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      className={`w-full px-4 py-2 border ${errors.startDate ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                      value={formData.startDate}
                      onChange={handleInputChange}
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
                  {errors.startDate && <p className="mt-1 text-xs text-red-500">{errors.startDate}</p>}
                </div>
                
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      className={`w-full px-4 py-2 border ${errors.endDate ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                      value={formData.endDate}
                      onChange={handleInputChange}
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
                  {errors.endDate && <p className="mt-1 text-xs text-red-500">{errors.endDate}</p>}
                </div>
              </div>
            </div>
            
            {/* Purpose of Rental */}
            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">
                Purpose of Rental <span className="text-red-500">*</span>
              </label>
              <textarea
                id="purpose"
                name="purpose"
                rows={3}
                placeholder="Briefly describe why you need this equipment"
                className={`w-full px-4 py-2 border ${errors.purpose ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                value={formData.purpose}
                onChange={handleInputChange}
              />
              {errors.purpose && <p className="mt-1 text-xs text-red-500">{errors.purpose}</p>}
            </div>
            
            {/* Delivery Options */}
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-3">Delivery Options</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pickup"
                    name="deliveryOption"
                    value="pickup"
                    checked={formData.deliveryOption === "pickup"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <label htmlFor="pickup" className="ml-2 block text-sm text-gray-700">
                    I'll pick up from owner's location
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="delivery"
                    name="deliveryOption"
                    value="delivery"
                    checked={formData.deliveryOption === "delivery"}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <label htmlFor="delivery" className="ml-2 block text-sm text-gray-700">
                    Request delivery (additional charges may apply)
                  </label>
                </div>
                
                {formData.deliveryOption === "delivery" && (
                  <div className="pl-6 pt-2">
                    <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="deliveryAddress"
                      name="deliveryAddress"
                      rows={2}
                      placeholder="Enter your full delivery address"
                      className={`w-full px-4 py-2 border ${errors.deliveryAddress ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                      value={formData.deliveryAddress}
                      onChange={handleInputChange}
                    />
                    {errors.deliveryAddress && <p className="mt-1 text-xs text-red-500">{errors.deliveryAddress}</p>}
                  </div>
                )}
              </div>
            </div>
            
            {/* Rental Summary */}
            {days > 0 && (
              <div className="bg-green-50 rounded-xl p-4">
                <h3 className="text-md font-medium text-gray-800 mb-2">Rental Summary</h3>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{days} days</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                  <span className="text-gray-600">Rate:</span>
                  <span className="font-medium">{equipment.rate} {equipment.rateType}</span>
                </div>
                <div className="border-t border-green-100 my-2 pt-2 flex justify-between items-center">
                  <span className="font-medium">Estimated Cost:</span>
                  <span className="text-lg font-bold text-green-700">₹{cost.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Final cost may vary based on actual usage and additional services.</p>
              </div>
            )}
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            {/* Contact Information */}
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-3">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className={`w-full pl-10 border ${errors.contactName ? 'border-red-300' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    />
                  </div>
                  {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
                </div>
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 border ${errors.contactPhone ? 'border-red-300' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  {errors.contactPhone && <p className="text-red-500 text-xs mt-1">{errors.contactPhone}</p>}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className={`w-full pl-10 border ${errors.contactEmail ? 'border-red-300' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                    />
                  </div>
                  {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
                </div>
              </div>
            </div>
            
            {/* Additional Notes */}
            <div>
              <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Any special requirements or information for the owner"
              />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            {/* ID Verification */}
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-3">ID Verification</h3>
              <div className="bg-yellow-50 p-3 rounded-md mb-4 text-sm text-yellow-800 flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>For security purposes, we need to verify your identity. Please provide a valid government ID.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="idType" className="block text-sm font-medium text-gray-700 mb-1">
                    ID Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard className="h-4 w-4 text-gray-400" />
                    </div>
                    <select
                      id="idType"
                      name="idType"
                      value={formData.idType}
                      onChange={handleInputChange}
                      className="w-full pl-10 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="aadhar">Aadhar Card</option>
                      <option value="pan">PAN Card</option>
                      <option value="voter">Voter ID</option>
                      <option value="ration">Ration Card</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    ID Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="idNumber"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      className={`w-full pl-10 border ${errors.idNumber ? 'border-red-300' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                      placeholder={formData.idType === 'aadhar' ? '12-digit Aadhar number' : 
                        formData.idType === 'pan' ? 'PAN number (e.g., ABCDE1234F)' : 
                        formData.idType === 'voter' ? 'Voter ID number' : 'Ration card number'}
                    />
                  </div>
                  {errors.idNumber && <p className="text-red-500 text-xs mt-1">{errors.idNumber}</p>}
                  <div className="mt-1 text-xs text-gray-500">
                    {formData.idType === 'aadhar' && 'Format: 12 digits (e.g., 123456789012)'}
                    {formData.idType === 'pan' && 'Format: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)'}
                    {formData.idType === 'voter' && 'Format: 3 letters + 7 digits (e.g., ABC1234567)'}
                    {formData.idType === 'ration' && 'Format: 8-12 alphanumeric characters'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Photo Verification */}
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-3">Photo Verification</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Photo <span className="text-red-500">*</span>
                  </label>
                  <div 
                    className={`border-2 border-dashed ${errors.userImage ? 'border-red-300' : 'border-gray-300'} rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors`}
                    onClick={() => triggerFileInput('user')}
                  >
                    {previewImage.user ? (
                      <div className="relative w-full">
                        <img 
                          src={previewImage.user} 
                          alt="User preview" 
                          className="w-full h-48 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData(prev => ({ ...prev, userImage: null }));
                            setPreviewImage(prev => ({ ...prev, user: null }));
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <Camera className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 text-center">
                          Click to upload your photo
                        </p>
                        <p className="text-xs text-gray-400 mt-1 text-center">
                          JPG, PNG or JPEG (max. 5MB)
                        </p>
                      </>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={(e) => handleImageUpload(e, 'user')}
                    />
                  </div>
                  {errors.userImage && <p className="text-red-500 text-xs mt-1">{errors.userImage}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Equipment Location Photo <span className="text-red-500">*</span>
                  </label>
                  <div 
                    className={`border-2 border-dashed ${errors.equipmentImage ? 'border-red-300' : 'border-gray-300'} rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors`}
                    onClick={() => triggerFileInput('equipment')}
                  >
                    {previewImage.equipment ? (
                      <div className="relative w-full">
                        <img 
                          src={previewImage.equipment} 
                          alt="Equipment location preview" 
                          className="w-full h-48 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData(prev => ({ ...prev, equipmentImage: null }));
                            setPreviewImage(prev => ({ ...prev, equipment: null }));
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 text-center">
                          Click to upload a photo of where the equipment will be used
                        </p>
                        <p className="text-xs text-gray-400 mt-1 text-center">
                          JPG, PNG or JPEG (max. 5MB)
                        </p>
                      </>
                    )}
                    <input
                      type="file"
                      ref={equipmentFileInputRef}
                      className="hidden"
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={(e) => handleImageUpload(e, 'equipment')}
                    />
                  </div>
                  {errors.equipmentImage && <p className="text-red-500 text-xs mt-1">{errors.equipmentImage}</p>}
                </div>
              </div>
            </div>
            
            {/* Terms and Conditions */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                    I agree to the terms and conditions <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-500">
                    By checking this box, you agree to our{" "}
                    <a href="#" className="text-green-600 hover:text-green-500">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-green-600 hover:text-green-500">
                      Privacy Policy
                    </a>
                    , and confirm that you have read our{" "}
                    <a href="#" className="text-green-600 hover:text-green-500">
                      Rental Agreement
                    </a>
                    .
                  </p>
                  {errors.termsAccepted && <p className="text-red-500 text-xs mt-1">{errors.termsAccepted}</p>}
                </div>
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      onClick={onCancel}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        variants={formVariants}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Rent Equipment</h2>
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          
          {/* Progress Steps */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep === step ? 'bg-green-500 text-white' : 
                    currentStep > step ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {currentStep > step ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span>{step}</span>
                    )}
                  </div>
                  <span className="text-xs mt-1 text-gray-500">
                    {step === 1 ? 'Rental Details' : step === 2 ? 'Contact Info' : 'Verification'}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full">
                <div 
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStepContent()}
            
            {/* Form Navigation */}
            <div className="flex justify-between pt-4 border-t border-gray-200">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Previous
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancel
                </button>
              )}
              
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RentalForm;
                