import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Users, 
  Filter, 
  ChevronDown, 
  Star, 
  UserPlus,
  Calendar,
  Tractor,
  Leaf
} from "lucide-react";

interface FPO {
  id: number;
  name: string;
  location: string;
  members: number;
  rating: number;
  description: string;
  established: string;
  specialization: string[];
  image: string;
}

interface FPODiscoveryProps {
  onJoinFPO: (fpo: FPO) => void;
}

const FPODiscovery = ({ onJoinFPO }: FPODiscoveryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFPO, setSelectedFPO] = useState<FPO | null>(null);
  
  // Sample FPO data
  const fpoList: FPO[] = [
    {
      id: 3,
      name: "Panipat Farmers Collective",
      location: "Panipat, Haryana",
      members: 312,
      rating: 4.7,
      description: "A progressive FPO focused on sustainable farming practices and market linkages for small farmers.",
      established: "2018",
      specialization: ["Wheat", "Rice", "Vegetables"],
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFybWVycyUyMGluZGlhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 4,
      name: "Rohtak Kisan Sangathan",
      location: "Rohtak, Haryana",
      members: 186,
      rating: 4.2,
      description: "Specializing in organic farming and direct consumer marketing through farmer markets.",
      established: "2020",
      specialization: ["Organic Produce", "Pulses", "Dairy"],
      image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhcm1lcnMlMjBpbmRpYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 1,
      name: "Sonipat Kisan Producer Company",
      location: "Sonipat, Haryana",
      members: 450,
      rating: 4.8,
      description: "One of the largest FPOs in the region with focus on wheat, rice, and vegetable production. Offers equipment sharing and bulk purchasing benefits.",
      established: "2015",
      specialization: ["Wheat", "Rice", "Vegetables"],
      image: "https://images.unsplash.com/photo-1589244159943-d873f08c3c83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFybWVycyUyMGluZGlhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      name: "Karnal Organic Farmers Collective",
      location: "Karnal, Haryana",
      members: 215,
      rating: 4.5,
      description: "Specializing in organic farming practices with certification support and premium market access.",
      established: "2017",
      specialization: ["Organic Farming", "Fruits", "Medicinal Herbs"],
      image: "https://images.unsplash.com/photo-1593014159610-8b5c698999ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFybWVycyUyMGluZGlhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
  ];

  const filteredFPOs = fpoList.filter(fpo => 
    fpo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fpo.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fpo.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleViewDetails = (fpo: FPO) => {
    setSelectedFPO(fpo);
  };

  const handleJoinFPO = (fpo: FPO) => {
    onJoinFPO(fpo);
    setSelectedFPO(null);
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Discover Farmer Producer Organizations</h1>
        <p className="text-gray-600">Find and join FPOs in your area to access collective benefits and resources</p>
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
              <ChevronDown size={16} className={`transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
            </button>
            {filterOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 p-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <select className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option value="">All Locations</option>
                      <option value="sonipat">Sonipat</option>
                      <option value="karnal">Karnal</option>
                      <option value="panipat">Panipat</option>
                      <option value="rohtak">Rohtak</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Rating</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button key={rating} className="text-yellow-400 hover:text-yellow-500">
                          <Star size={20} fill="currentColor" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2 flex justify-end gap-2">
                    <button className="text-sm text-gray-600 hover:text-gray-800">Reset</button>
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
          <div className="relative h-48 bg-gray-200">
            <img 
              src={selectedFPO.image} 
              alt={selectedFPO.name} 
              className="w-full h-full object-cover"
            />
            <button 
              onClick={() => setSelectedFPO(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{selectedFPO.name}</h2>
                <div className="flex items-center gap-4 mt-1">
                  <span className="flex items-center gap-1 text-gray-600">
                    <MapPin size={16} />
                    {selectedFPO.location}
                  </span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <Users size={16} />
                    {selectedFPO.members} members
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    {selectedFPO.rating}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => handleJoinFPO(selectedFPO)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
              >
                <UserPlus size={18} />
                Join FPO
              </button>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
              <p className="text-gray-600">{selectedFPO.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={18} className="text-green-600" />
                  <h4 className="font-medium text-gray-800">Established</h4>
                </div>
                <p className="text-gray-600">{selectedFPO.established}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf size={18} className="text-green-600" />
                  <h4 className="font-medium text-gray-800">Specialization</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedFPO.specialization.map((spec, index) => (
                    <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Tractor size={18} className="text-green-600" />
                  <h4 className="font-medium text-gray-800">Equipment Sharing</h4>
                </div>
                <p className="text-gray-600">15 equipment items available</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Benefits of Joining</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Access to shared farming equipment and machinery</li>
                <li>Bulk purchasing of seeds, fertilizers, and other inputs</li>
                <li>Collective marketing and better price negotiation</li>
                <li>Knowledge sharing and training opportunities</li>
                <li>Government scheme benefits through the FPO</li>
              </ul>
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
                <div className="h-48 bg-gray-200">
                  <img 
                    src={fpo.image} 
                    alt={fpo.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800">{fpo.name}</h3>
                  <div className="flex items-center gap-4 mt-1 mb-2">
                    <span className="flex items-center gap-1 text-gray-600 text-sm">
                      <MapPin size={14} />
                      {fpo.location}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-500 text-sm">
                      <Star size={14} fill="currentColor" />
                      {fpo.rating}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{fpo.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {fpo.specialization.map((spec, index) => (
                      <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Users size={16} />
                      {fpo.members} members
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700">No FPOs Found</h3>
              <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FPODiscovery;