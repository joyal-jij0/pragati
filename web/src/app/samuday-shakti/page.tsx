'use client'

import React, { useState, useEffect } from 'react'
import DashboardHeader from '@/components/DashboardHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import { Users, ChevronRight, Loader2 } from 'lucide-react'

// Import Samuday Shakti components
import FPODashboard from '@/components/samudayShakti/FPODashboard'
import GroupPurchases from '@/components/samudayShakti/GroupPurchases'
import CollectiveSales from '@/components/samudayShakti/CollectiveSales'
import ResourceSharing from '@/components/samudayShakti/ResourceSharing'
import CommunityHub from '@/components/samudayShakti/CommunityHub'
import FPODirectory from '@/components/samudayShakti/FPODirectory'
import AICollaborationAssistant from '@/components/samudayShakti/AICollaborationAssistant'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const SamudayShaktiPage = () => {
  const [fpos, setFpos] = useState([])
  const [selectedFpo, setSelectedFpo] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch FPOs from API
  useEffect(() => {
    const fetchFPOs = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/samuday-shakti/fpo')

        if (!response.ok) {
          throw new Error(`Error fetching FPOs: ${response.status}`)
        }

        const data = await response.json()
        setFpos(data)

        // Set the first FPO as default if available
        if (data.length > 0) {
          setSelectedFpo(data[0].id)
        }
      } catch (err) {
        console.error('Failed to fetch FPOs:', err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFPOs()
  }, [])

  // Handle FPO selection change
  const handleFpoChange = (value) => {
    setSelectedFpo(value)
  }

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  }

  // Find the selected FPO object
  const currentFpo = fpos.find((fpo) => fpo.id === selectedFpo)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
      <DashboardHeader
        title="समुदाय शक्ति"
        subtitle="सामूहिक शक्ति के माध्यम से किसानों का सशक्तिकरण"
        icon={<Users className="h-6 w-6 text-green-600" />}
      />

      <div className="container mx-auto px-4 py-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Introduction Card */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg overflow-hidden text-white"
          >
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold mb-3">
                  किसान उत्पादक संगठन (FPO) प्लेटफॉर्म
                </h2>
                <p className="mb-4">
                  समुदाय शक्ति आपके FPO को डिजिटल रूप से प्रबंधित करने, सामूहिक
                  खरीद और बिक्री को सुविधाजनक बनाने, संसाधनों को साझा करने और
                  अपने समुदाय के साथ जुड़ने के लिए एक व्यापक प्लेटफॉर्म प्रदान
                  करता है।
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="bg-white bg-opacity-20 text-muted-foreground px-3 py-1.5 rounded-full text-sm font-semibold">
                    120+ सक्रिय FPO
                  </div>
                  <div className="bg-white bg-opacity-20 text-muted-foreground px-3 py-1.5 rounded-full text-sm font-semibold">
                    ₹2.5 करोड़+ सामूहिक खरीद
                  </div>
                  <div className="bg-white bg-opacity-20 text-muted-foreground px-3 py-1.5 rounded-full text-sm font-semibold">
                    15% औसत मूल्य लाभ
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Farmers working together"
                  className="rounded-lg shadow-md max-w-full h-auto"
                />
              </div>
            </div>
            <div className="bg-green-800 px-6 py-3 flex justify-between items-center">
              <p className="text-sm text-green-100">
                अपने FPO के साथ जुड़ें या नया FPO बनाएँ
              </p>
              <button className="bg-white text-green-700 px-4 py-1.5 rounded-md text-sm font-medium hover:bg-green-50 transition-colors">
                शुरू करें
              </button>
            </div>
          </motion.div>

          {/* Main Tabs */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="dashboard" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList className="grid grid-cols-7 bg-white/50 p-1 rounded-lg">
                  <TabsTrigger
                    value="dashboard"
                    className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
                  >
                    डैशबोर्ड
                  </TabsTrigger>
                  <TabsTrigger
                    value="purchases"
                    className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
                  >
                    सामूहिक खरीद
                  </TabsTrigger>
                  <TabsTrigger
                    value="sales"
                    className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
                  >
                    सामूहिक बिक्री
                  </TabsTrigger>
                  <TabsTrigger
                    value="resources"
                    className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
                  >
                    संसाधन साझाकरण
                  </TabsTrigger>
                  <TabsTrigger
                    value="community"
                    className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
                  >
                    समुदाय हब
                  </TabsTrigger>
                  <TabsTrigger
                    value="directory"
                    className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
                  >
                    FPO निर्देशिका
                  </TabsTrigger>
                  <TabsTrigger
                    value="ai-assistant"
                    className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
                  >
                    AI सहायक
                  </TabsTrigger>
                </TabsList>
                <div className="px-8">
                  {isLoading ? (
                    <div className="w-[180px] h-10 flex items-center justify-center bg-white rounded-md">
                      <Loader2 className="h-4 w-4 animate-spin text-green-600" />
                    </div>
                  ) : error ? (
                    <div className="w-[180px] h-10 flex items-center justify-center bg-white rounded-md">
                      <span className="text-red-500 text-xs">
                        लोड करने में त्रुटि
                      </span>
                    </div>
                  ) : (
                    <Select value={selectedFpo} onValueChange={handleFpoChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="FPO चुनें">
                          {currentFpo ? currentFpo.name : 'FPO चुनें'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {fpos.map((fpo) => (
                          <SelectItem key={fpo.id} value={fpo.id}>
                            <div className="flex flex-col">
                              <span>{fpo.name}</span>
                              <span className="text-xs text-gray-500">
                                {fpo.location}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              <TabsContent value="dashboard" className="mt-0">
                <FPODashboard fpoId={selectedFpo} />
              </TabsContent>

              <TabsContent value="purchases" className="mt-0">
                <GroupPurchases fpoId={selectedFpo} />
              </TabsContent>

              <TabsContent value="sales" className="mt-0">
                <CollectiveSales fpoId={selectedFpo} />
              </TabsContent>

              <TabsContent value="resources" className="mt-0">
                <ResourceSharing fpoId={selectedFpo} />
              </TabsContent>

              <TabsContent value="community" className="mt-0">
                <CommunityHub fpoId={selectedFpo} />
              </TabsContent>

              <TabsContent value="directory" className="mt-0">
                <FPODirectory fpoId={selectedFpo} />
              </TabsContent>

              <TabsContent value="ai-assistant" className="mt-0">
                <AICollaborationAssistant fpoId={selectedFpo} />
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Success Stories */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-medium text-gray-800">सफलता की कहानियां</h3>
              <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                <span>सभी देखें</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
                <div className="flex flex-col h-full">
                  <div className="mb-3">
                    <span className="inline-block px-2.5 py-0.5 bg-amber-200 text-amber-800 rounded-full text-xs font-medium">
                      सामूहिक बिक्री
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    किसान उन्नति FPO ने 15% अधिक मूल्य प्राप्त किया
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
                    हरियाणा के सोनीपत में किसान उन्नति FPO ने 120 टन गेहूं की
                    सामूहिक बिक्री के माध्यम से मंडी मूल्य से 15% अधिक मूल्य
                    प्राप्त किया।
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-500">सितंबर 2023</span>
                    <button className="text-xs text-amber-700 font-medium">
                      और पढ़ें
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="flex flex-col h-full">
                  <div className="mb-3">
                    <span className="inline-block px-2.5 py-0.5 bg-blue-200 text-blue-800 rounded-full text-xs font-medium">
                      सामूहिक खरीद
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    प्रगति किसान FPO ने 12% लागत बचाई
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
                    महाराष्ट्र के नासिक में प्रगति किसान FPO ने उर्वरकों की
                    सामूहिक खरीद के माध्यम से 12% लागत बचाई और गुणवत्ता
                    सुनिश्चित की।
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-500">अगस्त 2023</span>
                    <button className="text-xs text-blue-700 font-medium">
                      और पढ़ें
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="flex flex-col h-full">
                  <div className="mb-3">
                    <span className="inline-block px-2.5 py-0.5 bg-green-200 text-green-800 rounded-full text-xs font-medium">
                      संसाधन साझाकरण
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">
                    जय किसान FPO ने उत्पादकता बढ़ाई
                  </h4>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">
                    मध्य प्रदेश के इंदौर में जय किसान FPO ने कृषि उपकरणों के
                    साझाकरण के माध्यम से सदस्यों की उत्पादकता में 25% की वृद्धि
                    की।
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-500">जुलाई 2023</span>
                    <button className="text-xs text-green-700 font-medium">
                      और पढ़ें
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default SamudayShaktiPage
