"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Tractor, 
  Calendar, 
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
  Tag,
  DollarSign,
  ListFilter,
  FileCheck,
  Shield
} from "lucide-react";

interface ListEquipmentFormProps {
  onSubmit: (formData: any) => void;
  onCancel: () => void;
}

const ListEquipmentForm = ({ onSubmit, onCancel }: ListEquipmentFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Tractor",
    image: null as string | null,
    owner: "",
    rate: "",
    rateType: "per day",
    location: "",
    availability: "Available",
    description: "",
    features: [] as string[],
    contactPhone: "",
    contactEmail: "",
    termsAccepted: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [featureInput, setFeatureInput] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setFormData(prev => ({ ...prev, image: result }));
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Equipment name is required";
      if (!formData.type.trim()) newErrors.type = "Equipment type is required";
      if (!formData.rate.trim()) newErrors.rate = "Rental rate is required";
      if (!formData.location.trim()) newErrors.location = "Location is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
      if (formData.features.length === 0) newErrors.features = "At least one feature is required";
    } else if (step === 2) {
      if (!formData.owner.trim()) newErrors.owner = "Owner name is required";
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
      if (!formData.image) {
        newErrors.image = "Please upload an image of the equipment";
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
          ...formData,
          id: Date.now(),
          rating: 0,
          reviews: 0,
          listingDate: new Date().toISOString()
        });
        setIsSubmitting(false);
      }, 1000);
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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        variants={formVariants}
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-gray-800">List Your Equipment for Rent</h2>
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4">
          {/* Progress Steps */}
          <div className="flex items-center mb-6">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Equipment Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-800">Equipment Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Equipment Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Equipment Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                      placeholder="e.g., John Deere 5310 Tractor"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  
                  {/* Equipment Type */}
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                      Equipment Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border ${errors.type ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                    >
                      <option value="Tractor">🚜 Tractor</option>
                      <option value="Implement">🔧 Implement</option>
                      <option value="Harvester">🌾 Harvester</option>
                      <option value="Irrigation">💧 Irrigation</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
                  </div>
                  
                  {/* Rental Rate */}
                  <div>
                    <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-1">
                      Rental Rate <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        ₹
                      </span>
                      <input
                        type="text"
                        id="rate"
                        name="rate"
                        value={formData.rate}
                        onChange={handleInputChange}
                        className={`flex-1 px-4 py-2 border ${errors.rate ? 'border-red-300' : 'border-gray-300'} rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="e.g., 800"
                      />
                    </div>
                    {errors.rate && <p className="mt-1 text-sm text-red-500">{errors.rate}</p>}
                  </div>
                  
                  {/* Rate Type */}
                  <div>
                    <label htmlFor="rateType" className="block text-sm font-medium text-gray-700 mb-1">
                      Rate Type
                    </label>
                    <select
                      id="rateType"
                      name="rateType"
                      value={formData.rateType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="per hour">per hour</option>
                      <option value="per day">per day</option>
                      <option value="per week">per week</option>
                      <option value="per month">per month</option>
                    </select>
                  </div>
                  
                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <MapPin size={16} />
                      </span>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={`flex-1 px-4 py-2 border ${errors.location ? 'border-red-300' : 'border-gray-300'} rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="e.g., Sonipat, Haryana"
                      />
                    </div>
                    {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                  </div>
                  
                  {/* Availability */}
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                      Availability
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="Available">Available</option>
                      <option value="Available from specific date">Available from specific date</option>
                      <option value="Limited Availability">Limited Availability</option>
                    </select>
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                    placeholder="Describe your equipment, its condition, and any special features..."
                  ></textarea>
                  {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>
                
                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g., 55 HP Engine"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-4 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700 focus:outline-none"
                    >
                      Add
                    </button>
                  </div>
                  {errors.features && <p className="mt-1 text-sm text-red-500">{errors.features}</p>}
                  
                  {formData.features.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm flex items-center">
                          <CheckCircle size={14} className="mr-1" />
                          {feature}
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(index)}
                            className="ml-2 text-green-600 hover:text-green-800"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Step 2: Owner Details and Verification */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-800">Owner Details & Verification</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Owner Name */}
                  <div>
                    <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-1">
                      Owner Name <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        id="owner"
                        name="owner"
                        value={formData.owner}
                        onChange={handleInputChange}
                        className={`flex-1 px-4 py-2 border ${errors.owner ? 'border-red-300' : 'border-gray-300'} rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="Your full name"
                      />
                    </div>
                    {errors.owner && <p className="mt-1 text-sm text-red-500">{errors.owner}</p>}
                  </div>
                  
                  {/* Contact Phone */}
                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Phone size={16} />
                      </span>
                      <input
                        type="text"
                        id="contactPhone"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        className={`flex-1 px-4 py-2 border ${errors.contactPhone ? 'border-red-300' : 'border-gray-300'} rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    {errors.contactPhone && <p className="mt-1 text-sm text-red-500">{errors.contactPhone}</p>}
                  </div>
                  
                  {/* Contact Email */}
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                        <Mail size={16} />
                      </span>
                      <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        className={`flex-1 px-4 py-2 border ${errors.contactEmail ? 'border-red-300' : 'border-gray-300'} rounded-r-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="Your email address"
                      />
                    </div>
                    {errors.contactEmail && <p className="mt-1 text-sm text-red-500">{errors.contactEmail}</p>}
                  </div>
                </div>
                
                {/* Equipment Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Equipment Image <span className="text-red-500">*</span>
                  </label>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 ${
                      errors.image ? 'border-red-300' : 'border-gray-300'
                    }`}
                    onClick={triggerFileInput}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    
                    {previewImage ? (
                      <div className="space-y-3 w-full">
                        <img 
                          src={previewImage} 
                          alt="Equipment preview" 
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center justify-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            triggerFileInput();
                          }}
                        >
                          <Camera size={16} className="mr-2" />
                          Change Image
                        </button>
                      </div>
                    ) : (
                      <>
                        <Camera size={36} className="text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 text-center">
                          Click to upload an image of your equipment
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          JPG, PNG or GIF, max 5MB
                        </p>
                      </>
                    )}
                  </div>
                  {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                </div>
                
                {/* Terms and Conditions */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="termsAccepted"
                        name="termsAccepted"
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                        I agree to the terms and conditions <span className="text-red-500">*</span>
                      </label>
                      <p className="text-gray-500">
                        By listing your equipment, you agree to our rental terms, including verification of equipment condition, maintenance responsibility, and payment processing.
                      </p>
                    </div>
                  </div>
                  {errors.termsAccepted && <p className="mt-1 text-sm text-red-500">{errors.termsAccepted}</p>}
                </div>
              </div>
            )}
            
            {/* Form Navigation */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  Back
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  Cancel
                </button>
              )}
              
              {currentStep < 2 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'List Equipment'
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

export default ListEquipmentForm;