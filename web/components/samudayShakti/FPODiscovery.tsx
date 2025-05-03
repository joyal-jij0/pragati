import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Search,
  MapPin,
  Users,
  Filter,
  ChevronDown,
  Star,
  UserPlus,
  Calendar,
  InfoIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import { createClient } from '@/utils/supabase/client'

interface FPO {
  id: string
  name: string
  location: string
  description: string
  _count: {
    members: number
  }
  createdAt: Date
}

interface FPODiscoveryProps {
  onJoinFPO: (fpo: FPO) => void
}

const FPODiscovery = ({ onJoinFPO }: FPODiscoveryProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedFPO, setSelectedFPO] = useState<FPO | null>(null)
  const [fpos, setFpos] = useState<FPO[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // const { data: session, status } = useSession();
  const supabase = createClient()
  const [session, setSession] = useState()

  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      if (session.data.session) {
        setSession(session.data.session)
      }
      // do something here with the session like  ex: setState(session)
    })
  }, [])

  // Fetch FPOs when component mounts
  useEffect(() => {
    const fetchFPOs = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/samuday-shakti/fpo')

        if (!response.ok) {
          throw new Error('Failed to fetch FPOs')
        }

        const data = await response.json()
        setFpos(data)
      } catch (error) {
        console.error('Error fetching FPOs:', error)
        setError('Failed to load FPOs')
      } finally {
        setIsLoading(false)
      }
    }

    fetchFPOs()
  }, [])

  // Filter FPOs based on search term
  const filteredFPOs = fpos.filter(
    (fpo) =>
      fpo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fpo.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fpo.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleViewDetails = (fpo: FPO) => {
    setSelectedFPO(fpo)
  }

  const handleJoinFPO = async (fpo: FPO) => {
    if (!session) {
      toast.error('Please sign in to join an FPO')
      return
    }

    try {
      const response = await fetch(`/api/samuday-shakti/fpo/${fpo.id}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join FPO')
      }

      toast.success(`Successfully joined ${fpo.name}`)
      onJoinFPO(fpo)
    } catch (error) {
      console.error('Error joining FPO:', error)
      toast.error(error.message || 'Failed to join FPO')
    }
  }

  const renderJoinButton = (fpo: FPO) => {
    if (!session) {
      return (
        <button
          onClick={() => toast.error('Please sign in to join')}
          className="bg-gray-100 text-gray-600 px-4 py-2 rounded-md"
          disabled
        >
          Sign in to Join
        </button>
      )
    }

    return (
      <button
        onClick={() => handleJoinFPO(fpo)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
      >
        <UserPlus size={18} />
        Join FPO
      </button>
    )
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <InfoIcon className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-xl font-medium text-gray-700">{error}</h3>
        <p className="text-gray-500 mt-1">Please try again later</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Discover Farmer Producer Organizations
        </h1>
        <p className="text-gray-600">
          Find and join FPOs in your area to access collective benefits and
          resources
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name, location, or specialization..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md transition-colors"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter size={18} />
              <span>Filters</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  filterOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {filterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 p-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <select className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option value="">All Locations</option>
                      <option value="sonipat">Sonipat</option>
                      <option value="karnal">Karnal</option>
                      <option value="panipat">Panipat</option>
                      <option value="rohtak">Rohtak</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specialization
                    </label>
                    <select className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option value="">All Specializations</option>
                      <option value="wheat">Wheat</option>
                      <option value="rice">Rice</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="organic">Organic Farming</option>
                      <option value="dairy">Dairy</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Rating
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          className="text-yellow-400 hover:text-yellow-500"
                        >
                          <Star size={20} fill="currentColor" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 flex justify-end gap-2">
                    <button className="text-sm text-gray-600 hover:text-gray-800">
                      Reset
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FPO Listings */}
      {selectedFPO ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedFPO.name}
                </h2>
                <div className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1 text-gray-600">
                    <MapPin size={16} />
                    {selectedFPO.location}
                  </span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <Users size={16} />
                    {selectedFPO._count.members} members
                  </span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <Calendar size={16} />
                    {new Date(selectedFPO.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              {renderJoinButton(selectedFPO)}
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                About
              </h3>
              <p className="text-gray-600">{selectedFPO.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredFPOs.length > 0 ? (
            filteredFPOs.map((fpo) => (
              <motion.div
                key={fpo.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {fpo.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-1 mb-2">
                    <span className="flex items-center gap-1 text-gray-600 text-sm">
                      <MapPin size={14} />
                      {fpo.location}
                    </span>
                    <span className="flex items-center gap-1 text-gray-600 text-sm">
                      <Users size={14} />
                      {fpo._count.members} members
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {fpo.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Created {new Date(fpo.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleViewDetails(fpo)}
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-3">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-700">
                No FPOs Found
              </h3>
              <p className="text-gray-500 mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

export default FPODiscovery
