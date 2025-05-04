'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Tractor,
  Leaf,
  Cloud,
  Droplets,
  ArrowLeft,
  Shield,
  Bell,
  Settings,
  Activity,
  ArrowDownToLine,
  Globe,
  Trash2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/utils/supabase/client'

export default function ProfilePage() {
  const supabase = createClient()
  const [user, setUser] = useState(false)

  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'Ram Kumar',
    email: 'ram.kumar@example.com',
    phone: '+91 98765 43210',
    address: 'Village Greenfield, District Harvest, State Agriculture',
    bio: 'Passionate farmer with 15 years of experience in sustainable farming practices. Specializing in organic rice and wheat cultivation.',
    farmSize: '25 acres',
    mainCrops: 'Rice, Wheat, Pulses',
    farmingExperience: '15 years',
    preferredLanguage: 'Hindi',
    joinedDate: 'January 2023',
  })

  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      if (session.data.session?.user) {
        setUser(session.data.session.user)
      }
    })
  }, [supabase.auth])

  // Update profile data if session exists
  useEffect(() => {
    if (user) {
      setProfileData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
      }))
    }
  }, [user])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    // Here you would typically save the data to your backend
    setIsEditing(false)
    // Show success message
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-white">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-green-200 border-opacity-50"></div>
            <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-green-700 font-medium">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-white pt-20 pb-10 px-4 md:px-6">
      {/* Back button */}
      <div className="max-w-6xl mx-auto mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="font-['Poppins',_sans-serif]">
            Back to Dashboard
          </span>
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Profile header */}
        <div className="relative mb-8 bg-white rounded-xl shadow-md overflow-hidden">
          {/* Cover image */}
          <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-10 bg-center bg-cover"></div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium flex items-center">
              <Leaf className="h-4 w-4 mr-1" />
              <span>Farmer Profile</span>
            </div>

            {/* Decorative plant elements */}
            <div className="absolute bottom-0 left-10 w-16 h-24">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-green-800"></div>
              <div className="absolute bottom-12 left-1/2 -translate-x-4 w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="absolute bottom-14 left-1/2 -translate-x-0 w-3 h-3 bg-green-400 rounded-full"></div>
            </div>

            <div className="absolute bottom-0 right-10 w-16 h-20">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-12 bg-green-800"></div>
              <div className="absolute bottom-10 left-1/2 -translate-x-3 w-2 h-2 bg-green-400 rounded-full"></div>
              <div className="absolute bottom-12 left-1/2 -translate-x-0 w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
          </div>

          {/* Profile info */}
          <div className="relative px-4 sm:px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-20 mb-6 gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  {user?.image ? (
                    <Image
                      src={user?.image || '/placeholder.svg'}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-3xl font-bold">
                      {getInitials(user?.user_metadata.full_name)}
                    </span>
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-green-100 hover:bg-green-200 text-green-600 rounded-full p-2 shadow-md transition-colors">
                  <Camera className="h-5 w-5" />
                </button>
              </div>

              <div className="text-center sm:text-left flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 font-['Poppins',_sans-serif]">
                  {user?.user_metadata.full_name}
                </h1>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>{user?.user_metadata.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    <span>Farmer</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Member since {profileData.joinedDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(false)}
                      className="gap-1"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 gap-1"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="gap-1 border-green-200 hover:border-green-300 hover:bg-green-50"
                  >
                    <Edit className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Edit Profile</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <Tabs defaultValue="profile" className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-1 inline-block">
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger
                value="profile"
                className="font-['Poppins',_sans-serif]"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="farm"
                className="font-['Poppins',_sans-serif]"
              >
                Farm Details
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="font-['Poppins',_sans-serif]"
              >
                Settings
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Personal Information */}
              <Card className="md:col-span-2 border-green-100 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-green-100">
                  <CardTitle className="text-green-800 flex items-center gap-2 font-['Poppins',_sans-serif]">
                    <User className="h-5 w-5 text-green-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700">
                          Full Name
                        </Label>
                        <div className="relative">
                          <Input
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`pl-9 ${!isEditing ? 'bg-gray-50' : ''}`}
                          />
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`pl-9 ${!isEditing ? 'bg-gray-50' : ''}`}
                          />
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700">
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Input
                            id="phone"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`pl-9 ${!isEditing ? 'bg-gray-50' : ''}`}
                          />
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="preferredLanguage"
                          className="text-gray-700"
                        >
                          Preferred Language
                        </Label>
                        <div className="relative">
                          <Input
                            id="preferredLanguage"
                            name="preferredLanguage"
                            value={profileData.preferredLanguage}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`pl-9 ${!isEditing ? 'bg-gray-50' : ''}`}
                          />
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-700">
                        Address
                      </Label>
                      <div className="relative">
                        <Textarea
                          id="address"
                          name="address"
                          value={profileData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`pl-9 pt-2 min-h-[80px] ${
                            !isEditing ? 'bg-gray-50' : ''
                          }`}
                        />
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-gray-700">
                        Bio
                      </Label>
                      <div className="relative">
                        <Textarea
                          id="bio"
                          name="bio"
                          value={profileData.bio}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`pl-9 pt-2 min-h-[120px] ${
                            !isEditing ? 'bg-gray-50' : ''
                          }`}
                        />
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity & Stats */}
              <Card className="border-green-100 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-green-100">
                  <CardTitle className="text-green-800 flex items-center gap-2 font-['Poppins',_sans-serif]">
                    <Activity className="h-5 w-5 text-green-600" />
                    Activity & Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            <Tractor className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">
                              Farming Experience
                            </h3>
                            <p className="text-sm text-gray-600">
                              {profileData.farmingExperience}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-800 border-b border-gray-200 pb-2">
                        Recent Activity
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 mt-0.5">
                            <Cloud className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              Weather Alert Viewed
                            </p>
                            <p className="text-xs text-gray-500">2 hours ago</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-100 flex-shrink-0 flex items-center justify-center text-amber-600 mt-0.5">
                            <Leaf className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              Crop Advisory Accessed
                            </p>
                            <p className="text-xs text-gray-500">Yesterday</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-green-100 flex-shrink-0 flex items-center justify-center text-green-600 mt-0.5">
                            <Droplets className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              Irrigation Schedule Updated
                            </p>
                            <p className="text-xs text-gray-500">3 days ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Farm Details Tab */}
          <TabsContent value="farm" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Farm Information */}
              <Card className="md:col-span-2 border-green-100 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-green-100">
                  <CardTitle className="text-green-800 flex items-center gap-2 font-['Poppins',_sans-serif]">
                    <Tractor className="h-5 w-5 text-green-600" />
                    Farm Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="farmSize" className="text-gray-700">
                          Farm Size
                        </Label>
                        <div className="relative">
                          <Input
                            id="farmSize"
                            name="farmSize"
                            value={profileData.farmSize}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`pl-9 ${!isEditing ? 'bg-gray-50' : ''}`}
                          />
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="farmingExperience"
                          className="text-gray-700"
                        >
                          Farming Experience
                        </Label>
                        <div className="relative">
                          <Input
                            id="farmingExperience"
                            name="farmingExperience"
                            value={profileData.farmingExperience}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`pl-9 ${!isEditing ? 'bg-gray-50' : ''}`}
                          />
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mainCrops" className="text-gray-700">
                        Main Crops
                      </Label>
                      <div className="relative">
                        <Input
                          id="mainCrops"
                          name="mainCrops"
                          value={profileData.mainCrops}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`pl-9 ${!isEditing ? 'bg-gray-50' : ''}`}
                        />
                        <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    {/* Farm Location Map Placeholder */}
                    <div className="mt-6 border border-green-100 rounded-lg overflow-hidden">
                      <div className="bg-green-50 p-3 border-b border-green-100 flex justify-between items-center">
                        <h3 className="font-medium text-green-800">
                          Farm Location
                        </h3>
                        {isEditing && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs border-green-200 text-green-700"
                          >
                            Update Location
                          </Button>
                        )}
                      </div>
                      <div className="aspect-video bg-gray-100 relative">
                        <Image
                          src="/placeholder.svg?height=400&width=800"
                          alt="Farm location map"
                          width={800}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <p className="text-gray-500 bg-white/80 px-4 py-2 rounded-md backdrop-blur-sm">
                            Map view of your farm location
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weather & Soil */}
              <Card className="border-green-100 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-green-100">
                  <CardTitle className="text-green-800 flex items-center gap-2 font-['Poppins',_sans-serif]">
                    <Cloud className="h-5 w-5 text-green-600" />
                    Weather & Soil
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* Weather Widget */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg border border-blue-100 p-4 relative overflow-hidden">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                          <span className="text-2xl">☁️</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            28°C
                          </p>
                          <p className="text-xs text-gray-600">Sunny</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-600 mt-3">
                        <div className="flex items-center gap-1">
                          <span className="text-blue-500">💧</span>
                          <span>68% Humidity</span>
                        </div>
                        <span className="text-green-600 font-medium">
                          View Details
                        </span>
                      </div>

                      {/* Forecast */}
                      <div className="mt-4 pt-4 border-t border-blue-200/50">
                        <p className="text-xs font-medium text-gray-700 mb-2">
                          5-Day Forecast
                        </p>
                        <div className="flex justify-between">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
                            <div key={day} className="text-center">
                              <p className="text-xs font-medium">{day}</p>
                              <div className="my-1">
                                {i === 0 && <span>☀️</span>}
                                {i === 1 && <span>⛅</span>}
                                {i === 2 && <span>🌧️</span>}
                                {i === 3 && <span>🌧️</span>}
                                {i === 4 && <span>☁️</span>}
                              </div>
                              <p className="text-xs">{28 - i}°</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Soil Health */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-800 border-b border-gray-200 pb-2">
                        Soil Health
                      </h3>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium text-gray-700">
                              Moisture
                            </span>
                            <span className="text-xs text-gray-600">65%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: '65%' }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium text-gray-700">
                              Nitrogen
                            </span>
                            <span className="text-xs text-gray-600">42%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: '42%' }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-xs font-medium text-gray-700">
                              pH Level
                            </span>
                            <span className="text-xs text-gray-600">6.5</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-amber-500 h-2 rounded-full"
                              style={{ width: '70%' }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2 text-green-700 border-green-200"
                      >
                        View Detailed Soil Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Account Settings */}
              <Card className="md:col-span-2 border-green-100 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-green-100">
                  <CardTitle className="text-green-800 flex items-center gap-2 font-['Poppins',_sans-serif]">
                    <Settings className="h-5 w-5 text-green-600" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* Password Section */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-800 border-b border-gray-200 pb-2">
                        Password
                      </h3>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="currentPassword"
                            className="text-gray-700"
                          >
                            Current Password
                          </Label>
                          <div className="relative">
                            <Input
                              id="currentPassword"
                              type="password"
                              placeholder="••••••••"
                              className="pl-9"
                            />
                            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="newPassword"
                              className="text-gray-700"
                            >
                              New Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="newPassword"
                                type="password"
                                placeholder="••••••••"
                                className="pl-9"
                              />
                              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="confirmPassword"
                              className="text-gray-700"
                            >
                              Confirm New Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="••••••••"
                                className="pl-9"
                              />
                              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>

                        <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                          Update Password
                        </Button>
                      </div>
                    </div>

                    {/* Email Preferences */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-800 border-b border-gray-200 pb-2">
                        Email Preferences
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-gray-800">
                              Weather Alerts
                            </Label>
                            <p className="text-xs text-gray-500">
                              Receive alerts about weather conditions
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-gray-800">
                              Market Updates
                            </Label>
                            <p className="text-xs text-gray-500">
                              Get notified about price changes
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-gray-800">Newsletter</Label>
                            <p className="text-xs text-gray-500">
                              Receive our monthly newsletter
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    {/* Language & Region */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-800 border-b border-gray-200 pb-2">
                        Language & Region
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="language" className="text-gray-700">
                            Language
                          </Label>
                          <select
                            id="language"
                            className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                          >
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Punjabi</option>
                            <option>Bengali</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="region" className="text-gray-700">
                            Region
                          </Label>
                          <select
                            id="region"
                            className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                          >
                            <option>India</option>
                            <option>Pakistan</option>
                            <option>Bangladesh</option>
                            <option>Nepal</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-green-100 bg-green-50/50">
                  <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                    Save Settings
                  </Button>
                </CardFooter>
              </Card>

              {/* Notifications & Privacy */}
              <Card className="border-green-100 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-green-50 to-white border-b border-green-100">
                  <CardTitle className="text-green-800 flex items-center gap-2 font-['Poppins',_sans-serif]">
                    <Bell className="h-5 w-5 text-green-600" />
                    Notifications & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* Notification Settings */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-800 border-b border-gray-200 pb-2">
                        Notification Settings
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-gray-800">
                              Push Notifications
                            </Label>
                            <p className="text-xs text-gray-500">
                              Receive alerts on your device
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-gray-800">
                              SMS Notifications
                            </Label>
                            <p className="text-xs text-gray-500">
                              Get text messages for important updates
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    {/* Privacy Settings */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-800 border-b border-gray-200 pb-2">
                        Privacy Settings
                      </h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-gray-800">
                              Profile Visibility
                            </Label>
                            <p className="text-xs text-gray-500">
                              Allow others to see your profile
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-gray-800">
                              Location Sharing
                            </Label>
                            <p className="text-xs text-gray-500">
                              Share your farm location
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label className="text-gray-800">
                              Data Analytics
                            </Label>
                            <p className="text-xs text-gray-500">
                              Help improve our services
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>

                    {/* Account Actions */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-800 border-b border-gray-200 pb-2">
                        Account Actions
                      </h3>

                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full justify-start text-amber-600 border-amber-200"
                        >
                          <ArrowDownToLine className="mr-2 h-4 w-4" />
                          Download My Data
                        </Button>

                        <Button
                          variant="outline"
                          className="w-full justify-start text-red-600 border-red-200"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
