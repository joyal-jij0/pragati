'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  Filter,
  ChevronDown,
  Users,
  Star,
  UserPlus,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Import sub-components
import MembersList from './members/MembersList'
import MemberAnalytics from './members/MemberAnalytics'
import MembershipRequests from './members/MembershipRequests'
import AddMemberForm from './members/AddMemberForm'
import { Badge } from '@/components/ui/badge'
import { FPOMemberType } from '@/app/api/samuday-shakti/fpo/[id]/members/route'

// FPO members data interface
export interface FPOMember {
  id: number
  name: string
  role: string
  avatar: string
  location: string
  joinDate: string
  phone: string
  email: string
  landHolding: string
  crops: string[]
  active: boolean
  contributions: number
  rating: number
}

// Sample data for membership requests
export const membershipRequests = [
  {
    id: 101,
    name: 'Rajesh Verma',
    avatar: 'https://randomuser.me/api/portraits/men/72.jpg',
    location: 'Panipat, Haryana',
    phone: '+91 87654 32109',
    email: 'rajesh@example.com',
    landHolding: '4.2 Acres',
    crops: ['Wheat', 'Barley'],
    requestDate: 'June 15, 2023',
    status: 'pending',
  },
  {
    id: 102,
    name: 'Kavita Sharma',
    avatar: 'https://randomuser.me/api/portraits/women/62.jpg',
    location: 'Sonipat, Haryana',
    phone: '+91 76543 21098',
    email: 'kavita@example.com',
    landHolding: '2.8 Acres',
    crops: ['Vegetables', 'Flowers'],
    requestDate: 'June 18, 2023',
    status: 'pending',
  },
]

interface FPOMembersProps {
  selectedFPO: string
}

const FPOMembers = ({ selectedFPO }: FPOMembersProps) => {
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

  // State for filters and tabs
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState('members')
  const [showAddMemberForm, setShowAddMemberForm] = useState(false)
  const [members, setMembers] = useState<FPOMember[]>([])
  const [requests, setRequests] = useState(membershipRequests)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentFpoId, setCurrentFpoId] = useState<string | null>(null)

  // Member roles are now dynamic based on fetched data
  const [memberRoles, setMemberRoles] = useState([
    { id: 'all', name: 'All Members', count: 0 },
    { id: 'board', name: 'Executive Members', count: 0 },
    { id: 'active', name: 'Active Members', count: 0 },
    { id: 'inactive', name: 'Inactive Members', count: 0 },
  ])

  // Fetch FPO ID based on selected FPO name
  useEffect(() => {
    const fetchFpoId = async () => {
      if (!selectedFPO) return

      try {
        setIsLoading(true)
        const response = await fetch('/api/samuday-shakti/fpo')

        if (!response.ok) {
          throw new Error(`Error fetching FPOs: ${response.status}`)
        }

        const data = await response.json()
        const fpo = data.find((f) => f.name === selectedFPO)

        if (fpo) {
          setCurrentFpoId(fpo.id)
        } else {
          setError('Selected FPO not found')
        }
      } catch (err) {
        console.error('Error fetching FPO ID:', err)
        setError('Failed to fetch FPO data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFpoId()
  }, [selectedFPO])

  // Fetch members data when FPO ID is available
  useEffect(() => {
    const fetchMembers = async () => {
      if (!currentFpoId) return

      try {
        setIsLoading(true)
        const response = await fetch(
          `/api/samuday-shakti/fpo/${currentFpoId}/members`
        )

        if (!response.ok) {
          throw new Error(`Error fetching members: ${response.status}`)
        }

        const data: FPOMemberType[] = await response.json()

        // Transform API data to component format
        const transformedMembers: FPOMember[] = data.map((member) => ({
          id: member.id,
          name: member.details?.name || 'Unknown',
          role: member.role,
          avatar: member.details?.avatar || '',
          location: member.details?.location || '',
          joinDate: new Date(member.joinedAt).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          }),
          phone: member.details?.phone || '',
          email: member.user?.email || '',
          landHolding: member.details?.landHolding || 'Unknown',
          crops: member.details?.crops || [],
          active: member.details?.active || false,
          contributions: member.details?.contributions || 0,
          rating: member.details?.rating || 3.0,
        }))

        setMembers(transformedMembers)

        // Update member role counts
        const allCount = transformedMembers.length
        const boardMembers = transformedMembers.filter((m) =>
          ['President', 'Vice President', 'Secretary', 'Treasurer'].includes(
            m.role
          )
        ).length
        const activeMembers = transformedMembers.filter((m) => m.active).length
        const inactiveMembers = transformedMembers.filter(
          (m) => !m.active
        ).length

        setMemberRoles([
          { id: 'all', name: 'All Members', count: allCount },
          { id: 'board', name: 'Executive Members', count: boardMembers },
          { id: 'active', name: 'Active Members', count: activeMembers },
          { id: 'inactive', name: 'Inactive Members', count: inactiveMembers },
        ])
      } catch (err) {
        console.error('Error fetching members:', err)
        setError('Failed to fetch members data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMembers()
  }, [currentFpoId])

  // Filter members based on search term and role
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole =
      roleFilter === 'all' ||
      (roleFilter === 'board' &&
        ['President', 'Vice President', 'Secretary', 'Treasurer'].includes(
          member.role
        )) ||
      (roleFilter === 'active' && member.active) ||
      (roleFilter === 'inactive' && !member.active)
    return matchesSearch && matchesRole
  })

  // Handle adding a new member
  const handleAddMember = (newMember: Omit<FPOMember, 'id'>) => {
    // In a real application, this would make an API call to add the member
    const id = members.length + 1
    setMembers([...members, { ...newMember, id }])
    setShowAddMemberForm(false)
  }

  // Handle removing a member
  const handleRemoveMember = (memberId: number) => {
    // In a real application, this would make an API call to remove the member
    setMembers(members.filter((member) => member.id !== memberId))
  }

  // Handle accepting a membership request
  const handleAcceptRequest = (requestId: number) => {
    const request = requests.find((req) => req.id === requestId)
    if (request) {
      // Add to members - in a real app, make an API call
      const newMember: FPOMember = {
        id: members.length + 1,
        name: request.name,
        role: 'Member',
        avatar: request.avatar,
        location: request.location,
        joinDate: new Date().toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        }),
        phone: request.phone,
        email: request.email,
        landHolding: request.landHolding,
        crops: request.crops,
        active: true,
        contributions: 0,
        rating: 3.0,
      }
      setMembers([...members, newMember])

      // Remove from requests
      setRequests(requests.filter((req) => req.id !== requestId))
    }
  }

  // Handle rejecting a membership request
  const handleRejectRequest = (requestId: number) => {
    setRequests(requests.filter((req) => req.id !== requestId))
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-red-700">
        <h3 className="font-medium">Error</h3>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {selectedFPO} Members
            </h2>
            <p className="text-gray-600 mt-1">
              Information and management of all FPO members
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="bg-white"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
              <ChevronDown
                className={`h-4 w-4 ml-1 transition-transform ${
                  showFilters ? 'rotate-180' : ''
                }`}
              />
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setShowAddMemberForm(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Member
            </Button>
          </div>
        </motion.div>

        {/* Add Member Form Modal */}
        {showAddMemberForm && (
          <AddMemberForm
            onAdd={handleAddMember}
            onCancel={() => setShowAddMemberForm(false)}
          />
        )}

        {/* Tabs */}
        <motion.div variants={itemVariants}>
          <Tabs
            defaultValue="members"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="members" className="text-sm">
                <Users className="h-4 w-4 mr-2" />
                Member List
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-sm">
                <Star className="h-4 w-4 mr-2" />
                Member Analytics
              </TabsTrigger>
              <TabsTrigger value="requests" className="text-sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Membership Requests
                {requests.length > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white">
                    {requests.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="space-y-4">
              {/* Search and Filters */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search member name or role..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {showFilters && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Filter by member role
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {memberRoles.map((role) => (
                        <button
                          key={role.id}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                            roleFilter === role.id
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => setRoleFilter(role.id)}
                        >
                          <span>{role.name}</span>
                          <Badge
                            variant="secondary"
                            className="ml-1 bg-white text-gray-600"
                          >
                            {role.count}
                          </Badge>
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => setRoleFilter('all')}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Loading State */}
              {isLoading ? (
                <div className="flex justify-center items-center p-12 bg-white rounded-lg shadow-md">
                  <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
                  <span className="ml-3 text-gray-600">
                    Loading member data...
                  </span>
                </div>
              ) : (
                <>
                  {members.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <h3 className="text-lg font-medium text-gray-800">
                        No Members Found
                      </h3>
                      <p className="text-gray-600 mt-1">
                        This FPO doesn't have any members yet or your search
                        filters don't match any members.
                      </p>
                      <Button
                        className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => setShowAddMemberForm(true)}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add New Member
                      </Button>
                    </div>
                  ) : (
                    /* Members List Component */
                    <MembersList
                      members={filteredMembers}
                      onRemoveMember={handleRemoveMember}
                    />
                  )}
                </>
              )}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center items-center p-12 bg-white rounded-lg shadow-md">
                  <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
                  <span className="ml-3 text-gray-600">
                    Loading analytics data...
                  </span>
                </div>
              ) : (
                <MemberAnalytics members={members} />
              )}
            </TabsContent>

            <TabsContent value="requests" className="space-y-4">
              <MembershipRequests
                requests={requests}
                onAccept={handleAcceptRequest}
                onReject={handleRejectRequest}
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default FPOMembers
