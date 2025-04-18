"use client"
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Custom icons for each navigation item
const navItems = [
  {
    name: "Dashboard",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-green-600" : "text-gray-500"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6C4 4.89543 4.89543 4 6 4H8C9.10457 4 10 4.89543 10 6V8C10 9.10457 9.10457 10 8 10H6C4.89543 10 4 9.10457 4 8V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 6C14 4.89543 14.8954 4 16 4H18C19.1046 4 20 4.89543 20 6V8C20 9.10457 19.1046 10 18 10H16C14.8954 10 14 9.10457 14 8V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M4 16C4 14.8954 4.89543 14 6 14H8C9.10457 14 10 14.8954 10 16V18C10 19.1046 9.10457 20 8 20H6C4.89543 20 4 19.1046 4 18V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 16C14 14.8954 14.8954 14 16 14H18C19.1046 14 20 14.8954 20 16V18C20 19.1046 19.1046 20 18 20H16C14.8954 20 14 19.1046 14 18V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    href: "/",
  },
  {
    name: "Gyan Dhara",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-green-600" : "text-gray-500"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 13.6493C3 16.6044 5.41766 19 8.4 19L16.5 19C18.9853 19 21 16.9839 21 14.4969C21 12.6503 19.8893 10.9449 18.3 10.25C18.1317 7.32251 15.684 5 12.6893 5C10.4692 5 8.5233 6.20472 7.5 8C4.83086 8.3876 3 10.5975 3 13.6493Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M13 14L11 16.5M11 14L13 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    href: "/gyan-dhara",
  },
  {
    name: "Fasal Doctor",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-green-600" : "text-gray-500"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M8.5 15C8.5 15 10 16.5 12 16.5C14 16.5 15.5 15 15.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 10C7.55228 10 8 9.55228 8 9C8 8.44772 7.55228 8 7 8C6.44772 8 6 8.44772 6 9C6 9.55228 6.44772 10 7 10Z" fill="currentColor"/>
        <path d="M17 10C17.5523 10 18 9.55228 18 9C18 8.44772 17.5523 8 17 8C16.4477 8 16 8.44772 16 9C16 9.55228 16.4477 10 17 10Z" fill="currentColor"/>
        <path d="M2 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 4V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    href: "/fasal-doctor",
  },
  {
    name: "Bazaar Bridge",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-green-600" : "text-gray-500"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 6L15.8 5.6C15.4 4.8 14.5 4 13.3 4H10.7C9.5 4 8.6 4.8 8.2 5.6L8 6" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 12L8.2 12.4C8.6 13.2 9.5 14 10.7 14H13.3C14.5 14 15.4 13.2 15.8 12.4L16 12" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 18L15.8 18.4C15.4 19.2 14.5 20 13.3 20H10.7C9.5 20 8.6 19.2 8.2 18.4L8 18" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    href: "/bazaar-bridge",
  },
  {
    name: "Arthik Sahara",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-green-600" : "text-gray-500"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 8.5H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 16.5H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M11 16.5H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <rect x="2" y="4.5" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    href: "/arthik-sahara",
  },
  {
    name: "Samuday Shakti",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-green-600" : "text-gray-500"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    href: "/samuday-shakti",
  },
  {
    name: "AI Assistant",
    icon: (active) => (
      <svg className={`w-5 h-5 ${active ? "text-green-600" : "text-gray-500"}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 3V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 20V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.34326 6.34326L7.05037 7.05037" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.9497 16.9497L17.6568 17.6568" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.34326 17.6568L7.05037 16.9497" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.9497 7.05037L17.6568 6.34326" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    href: "/ai-assistant",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="w-64 bg-gradient-to-b from-white to-green-50 border-r border-green-100 shadow-sm flex flex-col transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5 border-b border-green-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md shadow-green-200 transform transition-transform duration-300 hover:scale-105">
            <span className="text-white font-bold text-lg">KS</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">Krishi Sahayak</h1>
            <p className="text-xs text-green-600">AI for Indian Farmers</p>
          </div>
        </div>
      </div>
      
      <div className="px-3 py-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm border border-green-100 focus:outline-none focus:ring-2 focus:ring-green-500/30 text-sm text-gray-700 placeholder-gray-400"
          />
          <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-2 px-3">
        <div className="mb-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Main Menu</h2>
          <ul className="space-y-1">
            {navItems.slice(0, 3).map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden ${
                      isActive 
                        ? "bg-gradient-to-r from-green-500/10 to-green-600/5 text-green-700 font-medium" 
                        : "text-gray-700 hover:bg-green-50"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-80 rounded-lg"></span>
                    )}
                    <span className="relative z-10 flex items-center justify-center w-6 h-6">
                      {item.icon(isActive)}
                    </span>
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-r-full"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="mb-4">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Services</h2>
          <ul className="space-y-1">
            {navItems.slice(3, 6).map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden ${
                      isActive 
                        ? "bg-gradient-to-r from-green-500/10 to-green-600/5 text-green-700 font-medium" 
                        : "text-gray-700 hover:bg-green-50"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-80 rounded-lg"></span>
                    )}
                    <span className="relative z-10 flex items-center justify-center w-6 h-6">
                      {item.icon(isActive)}
                    </span>
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-r-full"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div>
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Support</h2>
          <ul className="space-y-1">
            {navItems.slice(6).map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden ${
                      isActive 
                        ? "bg-gradient-to-r from-green-500/10 to-green-600/5 text-green-700 font-medium" 
                        : "text-gray-700 hover:bg-green-50"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-80 rounded-lg"></span>
                    )}
                    <span className="relative z-10 flex items-center justify-center w-6 h-6">
                      {item.icon(isActive)}
                    </span>
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-r-full"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
      
      <div className="p-3 mt-auto">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-medium text-sm">RK</span>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Ram Kumar</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Online
              </p>
            </div>
            <button className="ml-auto text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div> 
        </div>
  );
}