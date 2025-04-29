'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Search,
  Bell,
  Menu,
  BarChart2,
  Users,
  MessageSquare,
  Tractor,
  Plus,
  Globe,
  UserPlus,
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

// Import components
import FPODashboard from '@/components/samudayShakti/FPODashboard'
import FPOSelector from '@/components/samudayShakti/FPOSelector'
import FPOMembers from '@/components/samudayShakti/FPOMembers'
import FPODiscovery from '@/components/samudayShakti/FPODiscovery'
import FPOCreation from '@/components/samudayShakti/FPOCreation'
import GroupChatAnnouncements from '@/components/samudayShakti/GroupChatAnnouncements'
import EquipmentRental from '@/components/samudayShakti/EquipmentRental'
import PageHeader from '@/components/samudayShakti/PageHeader'

// Update FPO type definition to match API schema
export type FPOType = {
  id: string
  name: string
  location: string
  description: string
  _count: {
    members: number
  }
  createdAt: Date
}

export default function SamudayShaktiPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [location, setLocation] = useState('Sonipat, Haryana')
  const [activeTab, setActiveTab] = useState('fpoDashboard')
  const [activeSection, setActiveSection] = useState('myFPO')
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [selectedFPO, setSelectedFPO] = useState('')
  const [joinedFPOs, setJoinedFPOs] = useState<FPOType[]>([])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/samuday-shakti')
    }
  }, [status, router])

  // Update the fetch FPOs function to use the new route
  useEffect(() => {
    const fetchFPOs = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/samuday-shakti/fpo/joined')

        if (!response.ok) {
          throw new Error(`Error fetching joined FPOs: ${response.status}`)
        }

        const data: FPOType[] = await response.json()
        setJoinedFPOs(data)

        // Set the first FPO's ID as default if available
        if (data.length > 0) {
          setSelectedFPO(data[0].id) // Change this line to use ID
          setLocation(data[0].location)
        }
      } catch (err) {
        console.error('Failed to fetch joined FPOs:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (status === 'authenticated') {
      fetchFPOs()
    }
  }, [status])

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  }

  // Handle FPO change
  const handleFPOChange = (fpoId: string) => {
    const fpo = joinedFPOs.find((f) => f.id === fpoId)
    if (fpo) {
      setSelectedFPO(fpo.id) // Change this line to store ID instead of name
      setLocation(fpo.location)
    }
  }

  // Handle joining a new FPO
  const handleJoinFPO = (fpo) => {
    if (!joinedFPOs.some((f) => f.id === fpo.id)) {
      setJoinedFPOs([...joinedFPOs, fpo])
      setSelectedFPO(fpo.name)
      setLocation(fpo.location)
      setActiveSection('myFPO')
      setActiveTab('fpoDashboard')
    }
  }

  // Handle leaving an FPO
  const handleLeaveFPO = (fpoId) => {
    const updatedFPOs = joinedFPOs.filter((f) => f.id !== fpoId)
    setJoinedFPOs(updatedFPOs)

    if (updatedFPOs.length > 0) {
      setSelectedFPO(updatedFPOs[0].name)
      setLocation(updatedFPOs[0].location)
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      {/* Header */}
      <PageHeader
        location={location}
        title="Samuday Shakti"
        subtitle="FPO Management & Community Collaboration"
      />

      {/* FPO Selection Banner */}
      <FPOSelector
        selectedFPO={selectedFPO}
        joinedFPOs={joinedFPOs}
        onChangeFPO={handleFPOChange}
        onLeaveFPO={handleLeaveFPO}
      />

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 flex items-center gap-1 ${
                activeTab === 'fpoDashboard'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('fpoDashboard')}
            >
              <BarChart2 size={16} />
              <span>FPO Dashboard</span>
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 flex items-center gap-1 ${
                activeTab === 'groupChat'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('groupChat')}
            >
              <MessageSquare size={16} />
              <span>Group Chat & Announcements</span>
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 flex items-center gap-1 ${
                activeTab === 'equipment'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('equipment')}
            >
              <Tractor size={16} />
              <span>Equipment Rental</span>
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 flex items-center gap-1 ${
                activeTab === 'members'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('members')}
            >
              <Users size={16} />
              <span>FPO Members</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left Sidebar - FPO Navigation */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1 space-y-4"
            >
              <div className="bg-white rounded-xl shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  FPO Hub
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveSection('myFPO')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left ${
                      activeSection === 'myFPO'
                        ? 'bg-green-50 text-green-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Users size={18} />
                      <span>My FPO Groups</span>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {joinedFPOs.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveSection('discover')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left ${
                      activeSection === 'discover'
                        ? 'bg-green-50 text-green-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Globe size={18} />
                      <span>Discover FPOs</span>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      New
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveSection('create')}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left ${
                      activeSection === 'create'
                        ? 'bg-green-50 text-green-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Plus size={18} />
                      <span>Create New FPO</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Joined FPOs List */}
              {activeSection === 'myFPO' && joinedFPOs.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-4">
                  <h3 className="text-md font-medium text-gray-800 mb-3">
                    My FPO Groups
                  </h3>
                  <div className="space-y-2">
                    {joinedFPOs.map((fpo) => (
                      <div
                        key={fpo.id}
                        className={`p-3 rounded-lg border ${
                          selectedFPO === fpo.id // Change this line to compare IDs
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-100 hover:bg-gray-50'
                        } cursor-pointer`}
                        onClick={() => handleFPOChange(fpo.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                              <Users size={16} />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">
                                {fpo.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {fpo._count.members} members
                              </p>
                            </div>
                          </div>
                          {selectedFPO === fpo.id && ( // Change this line to compare IDs
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Main Content Area */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 space-y-6"
            >
              {/* Conditional rendering based on active section and tab */}
              {activeSection === 'myFPO' && (
                <>
                  {activeTab === 'fpoDashboard' && (
                    <FPODashboard selectedFPO={selectedFPO} />
                  )}
                  {activeTab === 'groupChat' && (
                    <GroupChatAnnouncements selectedFPO={selectedFPO} />
                  )}
                  {activeTab === 'equipment' && (
                    <EquipmentRental selectedFPO={selectedFPO} />
                  )}
                  {activeTab === 'members' && (
                    <FPOMembers selectedFPO={selectedFPO} />
                  )}
                </>
              )}

              {activeSection === 'discover' && (
                <FPODiscovery onJoinFPO={handleJoinFPO} />
              )}
              {activeSection === 'create' && (
                <FPOCreation onFPOCreated={handleJoinFPO} />
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
