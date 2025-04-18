import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, Bell, Settings, ChevronDown, Menu, X, 
  User, LogOut, HelpCircle, Sun, Moon
} from "lucide-react";

export default function DashboardHeader() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-100 py-3 px-4 md:px-6 flex items-center justify-between fixed top-0 right-0 left-0 md:left-64 z-50 h-16 shadow-sm">
      {/* Left side - Mobile menu toggle and breadcrumb */}
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm text-gray-500">Dashboard</span>
          <span className="text-gray-400">/</span>
          <span className="text-sm font-medium text-gray-700">Overview</span>
        </div>
      </div>
      
      {/* Right side - Search, notifications, settings, profile */}
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-64 py-2 px-4 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        
        {/* Notifications */}
        <div className="relative">
          <button 
            className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            onClick={toggleNotifications}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Notifications dropdown */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
              <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-medium text-gray-800">Notifications</h3>
                <button className="text-xs text-green-600 hover:text-green-700">Mark all as read</button>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50 bg-green-50">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Weather Alert</p>
                      <p className="text-xs text-gray-600 mt-1">Heavy rainfall expected in your region</p>
                      <p className="text-xs text-gray-500 mt-1">10 minutes ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 flex-shrink-0">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Market Update</p>
                      <p className="text-xs text-gray-600 mt-1">Wheat prices increased by 5% today</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-2 border-t border-gray-100">
                <button className="w-full py-2 text-sm text-green-600 hover:text-green-700 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Settings */}
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        
        {/* Theme toggle */}
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Sun className="w-5 h-5" />
        </button>
        
        {/* Profile dropdown */}
        <div className="relative">
          <button 
            className="flex items-center gap-2 ml-2 focus:outline-none"
            onClick={toggleProfile}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-medium text-sm">
              RK
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-800 text-left">Ram Kumar</p>
              <p className="text-xs text-gray-500 text-left">Farmer</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
          </button>
          
          {/* Profile menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
              <div className="p-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800">Ram Kumar</p>
                <p className="text-xs text-gray-500 mt-0.5">ram.kumar@example.com</p>
              </div>
              
              <div className="py-1">
                <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <User className="w-4 h-4 mr-3 text-gray-500" />
                  Your Profile
                </Link>
                <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Settings className="w-4 h-4 mr-3 text-gray-500" />
                  Settings
                </Link>
                <Link href="/help" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <HelpCircle className="w-4 h-4 mr-3 text-gray-500" />
                  Help Center
                </Link>
                <Link href="/theme" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Moon className="w-4 h-4 mr-3 text-gray-500" />
                  Dark Mode
                </Link>
              </div>
              
              <div className="py-1 border-t border-gray-100">
                <Link href="/logout" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                  <LogOut className="w-4 h-4 mr-3 text-red-500" />
                  Sign out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-64 h-full bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-medium">
                RK
              </div>
              <div>
                <p className="font-medium text-gray-800">Ram Kumar</p>
                <p className="text-xs text-gray-500">Farmer</p>
              </div>
            </div>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/" className="flex items-center gap-3 px-3 py-2 text-green-600 bg-green-50 rounded-lg font-medium">
                  <span className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </span>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <span className="w-5 h-5 flex items-center justify-center text-gray-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </span>
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/reports" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <span className="w-5 h-5 flex items-center justify-center text-gray-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  Reports
                </Link>
              </li>
              <li>
                <Link href="/community" className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <span className="w-5 h-5 flex items-center justify-center text-gray-500">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </span>
                  Community
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}