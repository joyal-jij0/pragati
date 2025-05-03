"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Custom icons for each navigation item with emojis and colorful styling
const navItems = [
  {
    name: "Dashboard",
    icon: (active) => (
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? "bg-green-100" : "bg-gray-50"} transition-all duration-300`}>
        <span className="text-xl">🏡</span>
      </div>
    ),
    href: "/",
  },
  {
    name: "Gyan Dhara",
    icon: (active) => (
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? "bg-blue-100" : "bg-gray-50"} transition-all duration-300`}>
        <span className="text-xl">🌧️</span>
      </div>
    ),
    href: "/gyan-dhara",
  },
  {
    name: "Fasal Doctor",
    icon: (active) => (
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? "bg-green-100" : "bg-gray-50"} transition-all duration-300`}>
        <span className="text-xl">🌱</span>
      </div>
    ),
    href: "/fasal-doctor",
  },
  {
    name: "Arthik Sahara",
    icon: (active) => (
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? "bg-green-100" : "bg-gray-50"} transition-all duration-300`}>
        <span className="text-xl">💰</span>
      </div>
    ),
    href: "/arthik-sahara",
  },
  {
    name: "Samuday Shakti",
    icon: (active) => (
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? "bg-purple-100" : "bg-gray-50"} transition-all duration-300`}>
        <span className="text-xl">👨‍👩‍👧‍👦</span>
      </div>
    ),
    href: "/samuday-shakti",
  },
  {
    name: "AI Assistant",
    icon: (active) => (
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? "bg-blue-100" : "bg-gray-50"} transition-all duration-300`}>
        <span className="text-xl">🤖</span>
      </div>
    ),
    href: "/ai-assistant",
  },
  {
    name: "Logout",
    icon: (active) => (
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${active ? "bg-red-100" : "bg-gray-50"} transition-all duration-300`}>
        <span className="text-xl">👋</span>
      </div>
    ),
    href: "/logout",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Check if screen is mobile on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsCollapsed(window.innerWidth < 1024);
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button - only visible on small screens */}
      {isMobile && (
        <button 
          onClick={toggleMobileMenu}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-green-200/50 transition-all duration-300 transform hover:scale-105"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      )}
      
      {/* Sidebar container - Added pt-16 for mobile view */}
      <div 
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out transform ${
          isMobile 
            ? isOpen ? 'translate-x-0' : '-translate-x-full' 
            : 'translate-x-0'
        } ${
          isCollapsed && !isMobile ? 'w-24' : 'w-72'
        } ${
          isMobile ? 'pt-16' : ''
        } bg-gradient-to-b from-white to-green-50 border-r border-green-100 shadow-lg flex flex-col`}
      >
        {/* Logo and collapse button */}
        <div className={`p-4 border-b border-green-100 flex items-center justify-between ${isMobile ? 'mt-0' : ''}`}>
          <div className={`flex items-center gap-3 ${isCollapsed && !isMobile ? 'justify-center' : ''}`}>
            <div 
              className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md shadow-green-200 transform transition-all duration-300 hover:scale-110 overflow-hidden group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Animated logo with farming theme */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 transition-all duration-500 group-hover:opacity-90"></div>
              
              {/* Sun */}
              <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-yellow-300 transition-all duration-500 group-hover:scale-125 group-hover:animate-pulse"></div>
              
              {/* Field/ground */}
              <div className="absolute bottom-0 left-0 w-full h-4 bg-green-700/50 transition-all duration-500"></div>
              
              {/* Plant stem */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-5 bg-green-800 transition-all duration-500 group-hover:h-6"></div>
              
              {/* Plant leaves */}
              <div className="absolute bottom-6 left-1/2 -translate-x-3.5 w-2.5 h-2.5 bg-green-400 rounded-full transform -rotate-45 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-30"></div>
              <div className="absolute bottom-7 left-1/2 -translate-x-0 w-2.5 h-2.5 bg-green-400 rounded-full transform rotate-45 transition-all duration-500 group-hover:scale-110 group-hover:rotate-30"></div>
            </div>
            
            {(!isCollapsed || isMobile) && (
              <div className="transition-all duration-300 transform hover:translate-x-1">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent font-['Poppins',_sans-serif] tracking-wide">Krishi Sahayak</h1>
                <p className="text-sm text-green-600 font-['Poppins',_sans-serif] italic">Empowering Indian Farmers</p>
              </div>
            )}
          </div>
          
          {/* Collapse toggle button - only visible on desktop */}
          {!isMobile && (
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition-all duration-300 hover:rotate-180"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                  isCollapsed 
                    ? "M13 5l7 7-7 7M5 5l7 7-7 7" 
                    : "M11 19l-7-7 7-7M19 19l-7-7 7-7"
                } />
              </svg>
            </button>
          )}
        </div>
        
        {/* Search bar */}
        {(!isCollapsed || isMobile) && (
          <div className="px-4 py-4">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-sm border border-green-100 focus:outline-none focus:ring-2 focus:ring-green-500/30 text-sm text-gray-700 placeholder-gray-400 transition-all duration-300 group-hover:shadow-md"
              />
              <svg className="w-5 h-5 absolute left-3 top-3 text-gray-400 transition-all duration-300 group-hover:text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        )}
        
        {/* Decorative farm element */}
        <div className="px-4 mb-3">
          <div className="h-2.5 bg-gradient-to-r from-green-200 via-yellow-200 to-green-200 rounded-full opacity-70 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-12 bg-white/40 animate-pulse-slow"></div>
          </div>
        </div>
        
        {/* Navigation - Hide scrollbar in web view */}
        <nav className="flex-1 overflow-y-auto py-2 px-3 scrollbar-hide">
          {/* Main Menu */}
          <div className="mb-6">
            {!isCollapsed || isMobile ? (
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3 flex items-center font-['Poppins',_sans-serif]">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Main Menu
              </h2>
            ) : (
              <div className="flex justify-center mb-3">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            )}
            
            <ul className="space-y-2">
              {navItems.slice(0, 3).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center' : ''} gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                        isActive 
                          ? "bg-gradient-to-r from-green-500/10 to-green-600/5 text-green-700 font-medium" 
                          : "text-gray-700 hover:bg-green-50"
                      }`}
                      title={isCollapsed && !isMobile ? item.name : ""}
                    >
                      {isActive && (
                        <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-80 rounded-xl"></span>
                      )}
                      <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        {item.icon(isActive)}
                      </span>
                      {(!isCollapsed || isMobile) && (
                        <span className="relative z-10 font-['Poppins',_sans-serif] text-base transition-all duration-300 group-hover:translate-x-1">{item.name}</span>
                      )}
                      {isActive && (
                        <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500 rounded-r-full"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* Services */}
          <div className="mb-6">
            {!isCollapsed || isMobile ? (
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3 flex items-center font-['Poppins',_sans-serif]">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Services
              </h2>
            ) : (
              <div className="flex justify-center mb-3">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              </div>
            )}
            
            <ul className="space-y-2">
              {navItems.slice(3, 6).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center' : ''} gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                        isActive 
                          ? "bg-gradient-to-r from-green-500/10 to-green-600/5 text-green-700 font-medium" 
                          : "text-gray-700 hover:bg-green-50"
                      }`}
                      title={isCollapsed && !isMobile ? item.name : ""}
                    >
                      {isActive && (
                        <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-80 rounded-xl"></span>
                      )}
                      <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        {item.icon(isActive)}
                      </span>
                      {(!isCollapsed || isMobile) && (
                        <span className="relative z-10 font-['Poppins',_sans-serif] text-base transition-all duration-300 group-hover:translate-x-1">{item.name}</span>
                      )}
                      {isActive && (
                        <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500 rounded-r-full"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            {!isCollapsed || isMobile ? (
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-3 flex items-center font-['Poppins',_sans-serif]">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Support
              </h2>
            ) : (
              <div className="flex justify-center mb-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              </div>
            )}
            
            <ul className="space-y-2">
              {navItems.slice(6).map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className={`flex items-center ${isCollapsed && !isMobile ? 'justify-center' : ''} gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                        isActive 
                          ? "bg-gradient-to-r from-green-500/10 to-green-600/5 text-green-700 font-medium" 
                          : item.name === "Logout" 
                            ? "text-gray-700 hover:bg-red-50 hover:text-red-600" 
                            : "text-gray-700 hover:bg-green-50"
                      }`}
                      title={isCollapsed && !isMobile ? item.name : ""}
                    >
                      {isActive && (
                        <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-80 rounded-xl"></span>
                      )}
                      <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        {item.icon(isActive)}
                      </span>
                      {(!isCollapsed || isMobile) && (
                        <span className="relative z-10 font-['Poppins',_sans-serif] text-base transition-all duration-300 group-hover:translate-x-1">{item.name}</span>
                      )}
                      {isActive && (
                        <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500 rounded-r-full"></span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
        
        {/* Decorative farm element */}
        <div className="px-4 mt-2 mb-3">
          <div className="h-2.5 bg-gradient-to-r from-green-200 via-yellow-200 to-green-200 rounded-full opacity-70 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-full w-12 bg-white/40 animate-pulse-slow-reverse"></div>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile menu */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={toggleMobileMenu}
        ></div>
      )}
      
      {/* Main content padding - adjust based on sidebar state */}
      <div className={`${
        isMobile ? 'pl-0' : (isCollapsed ? 'pl-24' : 'pl-72')
      } transition-all duration-300`}>
        {/* Your main content goes here */}
      </div>
      
      {/* Add custom animation classes to tailwind */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0; transform: translateX(-100%); }
          50% { opacity: 1; transform: translateX(100%); }
        }
        @keyframes pulse-slow-reverse {
          0%, 100% { opacity: 0; transform: translateX(100%); }
          50% { opacity: 1; transform: translateX(-100%); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite;
        }
        .animate-pulse-slow-reverse {
          animation: pulse-slow-reverse 8s infinite;
        }
        
        /* Hide scrollbar but allow scrolling */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
        
        /* Add Poppins font for agricultural feel */
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
      `}</style>
    </>
  );
}