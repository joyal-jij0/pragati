import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  MapPin,
  Calendar,
  Leaf,
  Phone,
  Mail,
  FileText,
  Upload,
  Check,
  AlertCircle,
} from 'lucide-react'

interface FPOCreationProps {
  onFPOCreated: (fpo: any) => void
}

const FPOCreation: React.FC<FPOCreationProps> = ({ onFPOCreated }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    district: '',
    state: '',
    specializations: [] as string[],
    contactPerson: '',
    phone: '',
    email: '',
    description: '',
    // logo: null as File | null,
    documents: [] as File[],
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const specializations = [
    'Wheat',
    'Rice',
    'Pulses',
    'Vegetables',
    'Fruits',
    'Dairy',
    'Poultry',
    'Organic Farming',
    'Spices',
    'Medicinal Plants',
  ]

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSpecializationToggle = (specialization: string) => {
    setFormData((prev) => {
      const specializations = [...prev.specializations]
      if (specializations.includes(specialization)) {
        return {
          ...prev,
          specializations: specializations.filter((s) => s !== specialization),
        }
      } else {
        return {
          ...prev,
          specializations: [...specializations, specialization],
        }
      }
    })

    // Clear specialization error
    if (errors.specializations) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.specializations
        return newErrors
      })
    }
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: 'logo' | 'documents'
  ) => {
    const files = e.target.files
    if (!files) return

    if (fieldName === 'logo') {
      setFormData((prev) => ({ ...prev, logo: files[0] }))
    } else {
      setFormData((prev) => ({
        ...prev,
        documents: [...Array.from(files)],
      }))
    }
  }

  const validateStep = (stepNumber: number) => {
    const newErrors: Record<string, string> = {}

    if (stepNumber === 1) {
      if (!formData.name.trim()) newErrors.name = 'FPO name is required'
      if (!formData.location.trim()) newErrors.location = 'Location is required'
      if (!formData.district.trim()) newErrors.district = 'District is required'
      if (!formData.state.trim()) newErrors.state = 'State is required'
    } else if (stepNumber === 2) {
      if (formData.specializations.length === 0)
        newErrors.specializations = 'Select at least one specialization'
      if (!formData.description.trim())
        newErrors.description = 'Description is required'
    } else if (stepNumber === 3) {
      if (!formData.contactPerson.trim())
        newErrors.contactPerson = 'Contact person name is required'
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateStep(step)) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        // Create a new FPO object to pass to parent
        const newFPO = {
          name: formData.name,
          location: `${formData.location}, ${formData.district}, ${formData.state}`,
          // members: 1, // Start with 1 member (the creator)
          // rating: 0,
          description: formData.description,
          // specialization: formData.specializations,
          // image: "https://images.unsplash.com/photo-1589244159943-d873f08c3c83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWVycyUyMGluZGlhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
        }

        // Here you would typically send the newFPO to your API
        fetch('/api/samuday-shakti/fpo/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newFPO),
        })

        setIsSubmitting(false)
        setShowSuccess(true)

        // After showing success message, notify parent
        setTimeout(() => {
          onFPOCreated(newFPO)
        }, 2000)
      }, 1500)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Create New FPO
        </h1>
        <p className="text-gray-600">
          Register your Farmer Producer Organization to connect with farmers and
          access benefits
        </p>
      </div>

      {showSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-lg p-6 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            FPO Created Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your Farmer Producer Organization has been registered. You can now
            start inviting members and managing your FPO.
          </p>
          <div className="animate-pulse">
            <p className="text-sm text-gray-500">
              Redirecting to your FPO dashboard...
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Progress Steps */}
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= 1
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  1
                </div>
                <div
                  className={`h-1 w-12 mx-2 ${
                    step > 1 ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                ></div>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= 2
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  2
                </div>
                <div
                  className={`h-1 w-12 mx-2 ${
                    step > 2 ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                ></div>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= 3
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  3
                </div>
                <div
                  className={`h-1 w-12 mx-2 ${
                    step > 3 ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                ></div>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= 4
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  4
                </div>
              </div>
              <div className="text-sm text-gray-600">Step {step} of 4</div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-6">
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Basic Information
                  </h2>
                  <div className="space-y-4">
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        FPO Name*
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="Enter FPO name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Village/Town*
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border ${
                          errors.location ? 'border-red-500' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="Enter village or town"
                      />
                      {errors.location && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.location}
                        </p>
                      )}
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          District*
                        </label>
                        <input
                          type="text"
                          name="district"
                          value={formData.district}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border ${
                            errors.district
                              ? 'border-red-500'
                              : 'border-gray-300'
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                          placeholder="Enter district"
                        />
                        {errors.district && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.district}
                          </p>
                        )}
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State*
                        </label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 border ${
                            errors.state ? 'border-red-500' : 'border-gray-300'
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        >
                          <option value="">Select State</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Punjab">Punjab</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Rajasthan">Rajasthan</option>
                          <option value="Madhya Pradesh">Madhya Pradesh</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="Tamil Nadu">Tamil Nadu</option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                        </select>
                        {errors.state && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.state}
                          </p>
                        )}
                      </motion.div>
                    </div>

                    {/* <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Establishment*</label>
                      <input
                        type="date"
                        name="establishmentDate"
                        value={formData.establishmentDate}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border ${errors.establishmentDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                      />
                      {errors.establishmentDate && <p className="mt-1 text-sm text-red-500">{errors.establishmentDate}</p>}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Registration Type*</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div 
                          className={`border ${formData.registrationType === 'producer_company' ? 'border-green-500 bg-green-50' : 'border-gray-300'} rounded-md p-3 cursor-pointer`}
                          onClick={() => setFormData(prev => ({ ...prev, registrationType: 'producer_company' }))}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Producer Company</span>
                            {formData.registrationType === 'producer_company' && (
                              <div className="h-4 w-4 rounded-full bg-green-500"></div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Under Companies Act</p>
                        </div>
                        <div 
                          className={`border ${formData.registrationType === 'cooperative' ? 'border-green-500 bg-green-50' : 'border-gray-300'} rounded-md p-3 cursor-pointer`}
                          onClick={() => setFormData(prev => ({ ...prev, registrationType: 'cooperative' }))}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Cooperative</span>
                            {formData.registrationType === 'cooperative' && (
                              <div className="h-4 w-4 rounded-full bg-green-500"></div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Under Cooperative Act</p>
                        </div>
                        <div 
                          className={`border ${formData.registrationType === 'society' ? 'border-green-500 bg-green-50' : 'border-gray-300'} rounded-md p-3 cursor-pointer`}
                          onClick={() => setFormData(prev => ({ ...prev, registrationType: 'society' }))}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">Society</span>
                            {formData.registrationType === 'society' && (
                              <div className="h-4 w-4 rounded-full bg-green-500"></div>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Under Societies Act</p>
                        </div>
                      </div>
                    </motion.div> */}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Specialization & Description */}
              {step === 2 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Specialization & Description
                  </h2>
                  <div className="space-y-4">
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specializations*
                      </label>
                      <p className="text-xs text-gray-500 mb-2">
                        Select all that apply to your FPO
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {specializations.map((specialization) => (
                          <div
                            key={specialization}
                            className={`border ${
                              formData.specializations.includes(specialization)
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-300'
                            } rounded-md p-2 cursor-pointer text-center`}
                            onClick={() =>
                              handleSpecializationToggle(specialization)
                            }
                          >
                            <span
                              className={`text-sm ${
                                formData.specializations.includes(
                                  specialization
                                )
                                  ? 'text-green-700'
                                  : 'text-gray-700'
                              }`}
                            >
                              {specialization}
                            </span>
                          </div>
                        ))}
                      </div>
                      {errors.specializations && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.specializations}
                        </p>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        FPO Description*
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full px-3 py-2 border ${
                          errors.description
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="Describe your FPO, its mission, and the services it provides to members..."
                      ></textarea>
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.description}
                        </p>
                      )}
                    </motion.div>

                    {/* <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">FPO Logo (Optional)</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="logo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none">
                              <span>Upload a file</span>
                              <input id="logo-upload" name="logo-upload" type="file" className="sr-only" onChange={(e) => handleFileChange(e, 'logo')} accept="image/*" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 2MB</p>
                        </div>
                      </div>
                      {formData.logo && (
                        <p className="mt-2 text-sm text-green-600">
                          File selected: {formData.logo.name}
                        </p>
                      )}
                    </motion.div> */}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact Information */}
              {step === 3 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Contact Person Name*
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border ${
                          errors.contactPerson
                            ? 'border-red-500'
                            : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="Enter name of primary contact person"
                      />
                      {errors.contactPerson && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.contactPerson}
                        </p>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="Enter phone number"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.phone}
                        </p>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                        placeholder="Enter email address"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Documents */}
              {step === 4 && (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Documents
                  </h2>
                  <div className="space-y-4">
                    <motion.div variants={itemVariants}>
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-yellow-400" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              Please upload relevant documents such as
                              registration certificate, bylaws, or any other
                              supporting documents.
                            </p>
                          </div>
                        </div>
                      </div>

                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Documents (Optional)
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="documents-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none"
                            >
                              <span>Upload files</span>
                              <input
                                id="documents-upload"
                                name="documents-upload"
                                type="file"
                                className="sr-only"
                                onChange={(e) =>
                                  handleFileChange(e, 'documents')
                                }
                                multiple
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PDF, DOC, DOCX up to 10MB each
                          </p>
                        </div>
                      </div>
                      {formData.documents.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700">
                            Uploaded Documents:
                          </h4>
                          <ul className="mt-2 divide-y divide-gray-200 border border-gray-200 rounded-md">
                            {formData.documents.map((doc, index) => (
                              <li
                                key={index}
                                className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                              >
                                <div className="w-0 flex-1 flex items-center">
                                  <FileText className="flex-shrink-0 h-5 w-5 text-gray-400" />
                                  <span className="ml-2 flex-1 w-0 truncate">
                                    {doc.name}
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants} className="pt-4">
                      <div className="relative flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="terms"
                            className="font-medium text-gray-700"
                          >
                            I agree to the terms and conditions
                          </label>
                          <p className="text-gray-500">
                            By creating an FPO, you agree to our Terms of
                            Service and Privacy Policy.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Back
                </button>
              )}
              <div>
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Creating FPO...
                      </>
                    ) : (
                      <>Submit</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default FPOCreation
