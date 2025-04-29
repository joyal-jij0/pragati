"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function DashboardHeader() {
  const session = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [weatherData, setWeatherData] = useState({
    temp: "28°C",
    condition: "Sunny",
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".profile-menu") &&
        !target.closest(".profile-button")
      ) {
        setIsProfileOpen(false);
      }
      if (
        !target.closest(".notifications-menu") &&
        !target.closest(".notifications-button")
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-white to-green-50 border-b border-green-100 py-3 px-4 md:px-6 flex items-center justify-between fixed top-0 right-0 left-0 md:left-72 z-50 h-16 shadow-sm transition-all duration-300">
      {/* Left side - Mobile menu toggle, breadcrumb and weather widget */}
      <div className="flex items-center gap-4">
        {/* Enhanced mobile menu toggle button */}
        <button
          className="md:hidden p-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-green-200/50 transition-all duration-300 transform hover:scale-105"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <div className="w-5 h-5 flex items-center justify-center">
              <span className="text-lg">✖️</span>
            </div>
          ) : (
            <div className="w-5 h-5 flex items-center justify-center">
              <span className="text-lg">🍔</span>
            </div>
          )}
        </button>

        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1 text-green-600">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-green-100 transition-all duration-300">
              <span className="text-base">🌱</span>
            </div>
            <span className="text-sm font-['Poppins',_sans-serif] font-medium">
              Dashboard
            </span>
          </div>
          <span className="text-green-300">/</span>
          <span className="text-sm font-['Poppins',_sans-serif] font-medium text-green-700">
            Overview
          </span>
        </div>

        {/* Weather widget - now visible on both mobile and desktop */}
        <div className="flex items-center gap-2 ml-2 bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-green-100 shadow-sm">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
            <span className="text-sm">☁️</span>
          </div>
          <div className="text-xs">
            <span className="font-medium text-gray-700">
              {weatherData.temp}
            </span>
            <span className="text-gray-500 ml-1">{weatherData.condition}</span>
          </div>
          <div className="w-1 h-1 bg-gray-300 rounded-full mx-1 hidden md:block"></div>
          <div className="hidden md:flex items-center gap-1">
            <span className="text-sm text-blue-500">💧</span>
            <span className="text-xs text-gray-600">68%</span>
          </div>
        </div>
      </div>

      {/* Right side - Search, notifications, settings, profile */}
      <div className="flex items-center gap-2 md:gap-4">
        <div className="relative hidden md:block group">
          <input
            type="text"
            placeholder="Search crops, markets..."
            className="w-64 py-2 px-4 pl-10 rounded-lg border border-green-100 focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-transparent text-sm bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-md"
          />
          <div className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 group-hover:text-green-500 flex items-center justify-center">
            <span className="text-base text-gray-400 group-hover:text-green-500">
              🔍
            </span>
          </div>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            className="notifications-button relative p-2 text-gray-600 hover:bg-green-100 rounded-full transition-all duration-300 hover:text-green-600 transform"
            onClick={toggleNotifications}
            aria-label="Notifications"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-50 hover:bg-amber-100 transition-all duration-300">
              <span className="text-lg">🔔</span>
            </div>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* Notifications dropdown */}
          {isNotificationsOpen && (
            <div className="notifications-menu absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-green-100 z-50 overflow-hidden transform origin-top-right transition-all duration-200 animate-dropdown">
              <div className="p-3 border-b border-green-100 flex justify-between items-center bg-gradient-to-r from-green-50 to-white">
                <h3 className="font-medium text-green-800 font-['Poppins',_sans-serif] flex items-center gap-2">
                  <span className="text-base">🔔</span>
                  Notifications
                </h3>
                <button className="text-xs text-green-600 hover:text-green-700 transition-colors">
                  Mark all as read
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto">
                <div className="p-3 border-b border-green-100 hover:bg-green-50 bg-green-50/50 transition-colors">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 flex-shrink-0 shadow-sm">
                      <span className="text-base">☁️</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 font-['Poppins',_sans-serif]">
                        Weather Alert
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Heavy rainfall expected in your region
                      </p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        10 minutes ago
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 border-b border-green-100 hover:bg-green-50 transition-colors">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 flex-shrink-0 shadow-sm">
                      <span className="text-base">🚜</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 font-['Poppins',_sans-serif]">
                        Market Update
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Wheat prices increased by 5% today
                      </p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                        2 hours ago
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 border-b border-green-100 hover:bg-green-50 transition-colors">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0 shadow-sm">
                      <span className="text-base">💧</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 font-['Poppins',_sans-serif]">
                        Irrigation Reminder
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Time to water your rice fields
                      </p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        5 hours ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2 border-t border-green-100 bg-gradient-to-r from-white to-green-50">
                <button className="w-full py-2 text-sm text-green-600 hover:text-green-700 font-medium transition-colors font-['Poppins',_sans-serif]">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Replace the current Button component */}
        {session.status === "authenticated" ? (
          <Button
            onClick={() => signOut()}
            variant="outline"
            className="flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline">Sign Out</span>
          </Button>
        ) : (
          <Button
            onClick={() => signIn()}
            className="flex items-center gap-2 cursor-pointer"
          >
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Sign In</span>
          </Button>
        )}

        {/* Profile dropdown - Only show when authenticated */}
        {session.status === "authenticated" && (
          <div className="relative">
            <button
              className="profile-button flex items-center gap-2 ml-2 focus:outline-none group"
              onClick={toggleProfile}
              aria-label="User profile"
            >
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-medium text-sm shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105 overflow-hidden">
                {/* Plant stem */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-green-800 transition-all duration-500 group-hover:h-3"></div>

                {/* Plant leaves */}
                <div className="absolute bottom-2 left-1/2 -translate-x-2 w-1.5 h-1.5 bg-green-300 rounded-full transform -rotate-45 transition-all duration-500 group-hover:scale-110"></div>
                <div className="absolute bottom-2.5 left-1/2 -translate-x-0 w-1.5 h-1.5 bg-green-300 rounded-full transform rotate-45 transition-all duration-500 group-hover:scale-110"></div>

                {session.data?.user?.image ? (
                  <Image
                    src={session.data.user.image || "/placeholder.svg"}
                    alt="User Avatar"
                    className="w-full h-full rounded-full object-cover"
                    width={36}
                    height={36}
                  />
                ) : (
                  <span className="relative z-10 text-white font-bold text-lg">
                    RK
                  </span>
                )}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-800 text-left font-['Poppins',_sans-serif] transition-all duration-300 group-hover:text-green-700">
                  {session.data?.user?.name }
                </p>
                <p className="text-xs text-gray-500 text-left flex items-center gap-1">
                  <span className="text-xs text-green-500">🌿</span>
                  <span className="font-['Poppins',_sans-serif]">Farmer</span>
                </p>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 hidden md:block transition-all duration-300 group-hover:text-green-500 ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Profile menu */}
            {isProfileOpen && (
              <div className="profile-menu absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-green-100 z-50 overflow-hidden transform origin-top-right transition-all duration-200 animate-dropdown">
                <div className="p-3 border-b border-green-100 bg-gradient-to-r from-green-50 to-white">
                  <p className="text-sm font-medium text-gray-800 font-['Poppins',_sans-serif]">
                    {session.data?.user?.name }
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    {session.data?.user?.email}
                  </p>
                </div>

                <div className="py-1">
                  <Link
                    href="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors"
                  >
                    <span className="text-base text-green-500 mr-3">👤</span>
                    <span className="font-['Poppins',_sans-serif]">
                      Your Profile
                    </span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors"
                  >
                    <span className="text-base text-green-500 mr-3">⚙️</span>
                    <span className="font-['Poppins',_sans-serif]">
                      Settings
                    </span>
                  </Link>
                </div>

                <div className="py-1 border-t border-green-100">
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                    className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                  >
                    <span className="text-base text-red-500 mr-3 transition-all duration-300 group-hover:translate-x-1">
                      👋
                    </span>
                    <span className="font-['Poppins',_sans-serif] transition-all duration-300 group-hover:translate-x-1">
                      Sign out
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-opacity duration-300 animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile menu - Integrated with sidebar style */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-green-100 shadow-lg z-30 transform transition-all duration-300 ease-in-out overflow-y-auto animate-slide-in-left">
          {/* User profile section */}
          <div className="p-4 border-b border-green-100">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md shadow-green-200 overflow-hidden group">
                {/* Sun */}
                <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-yellow-300 animate-pulse"></div>

                {/* Field/ground */}
                <div className="absolute bottom-0 left-0 w-full h-3 bg-green-700/50"></div>

                {/* Plant stem */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1 h-4 bg-green-800"></div>

                {/* Plant leaves */}
                <div className="absolute bottom-5 left-1/2 -translate-x-3 w-2 h-2 bg-green-400 rounded-full transform -rotate-45"></div>
                <div className="absolute bottom-6 left-1/2 -translate-x-0 w-2 h-2 bg-green-400 rounded-full transform rotate-45"></div>

                <span className="relative z-10 text-white font-bold text-lg">
                  RK
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-800 font-['Poppins',_sans-serif]">
                  Ram Kumar
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="text-xs text-green-500">🌿</span>
                  <span className="font-['Poppins',_sans-serif]">Farmer</span>
                </p>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="px-3 py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm border border-green-100 focus:outline-none focus:ring-2 focus:ring-green-500/30 text-sm text-gray-700 placeholder-gray-400"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <span className="text-base">🔍</span>
              </div>
            </div>
          </div>

          {/* Weather widget for mobile */}
          <div className="px-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg border border-blue-100 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <span className="text-xl">☁️</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {weatherData.temp}
                  </p>
                  <p className="text-xs text-gray-600">
                    {weatherData.condition}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-blue-500">💧</span>
                  <span>68% Humidity</span>
                </div>
                <span className="text-green-600 font-medium">View Details</span>
              </div>
            </div>
          </div>

          {/* Decorative farm element */}
          <div className="px-3 mb-2">
            <div className="h-2 bg-gradient-to-r from-green-200 via-yellow-200 to-green-200 rounded-full opacity-60 relative overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-10 bg-white/30 animate-pulse"></div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2 flex items-center font-['Poppins',_sans-serif]">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Main Menu
            </h2>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-3 px-3 py-2.5 text-green-600 bg-green-50 rounded-lg font-medium relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-80 rounded-lg"></span>
                  <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-lg bg-green-100 transition-transform duration-300 group-hover:scale-110">
                    <span className="text-lg">🏡</span>
                  </span>
                  <span className="relative z-10 font-['Poppins',_sans-serif] transition-all duration-300 group-hover:translate-x-1">
                    Dashboard
                  </span>
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-r-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  href="/gyan-dhara"
                  className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-green-50 rounded-lg transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-100">
                    <span className="text-lg">🌧️</span>
                  </span>
                  <span className="relative z-10 font-['Poppins',_sans-serif] transition-all duration-300 group-hover:translate-x-1">
                    Gyan Dhara
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/fasal-doctor"
                  className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-green-50 rounded-lg transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 transition-transform duration-300 group-hover:scale-110 group-hover:bg-green-100">
                    <span className="text-lg">🌱</span>
                  </span>
                  <span className="relative z-10 font-['Poppins',_sans-serif] transition-all duration-300 group-hover:translate-x-1">
                    Fasal Doctor
                  </span>
                </Link>
              </li>
            </ul>

            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2 mt-6 flex items-center font-['Poppins',_sans-serif]">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              Services
            </h2>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/bazaar-bridge"
                  className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-green-50 rounded-lg transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 transition-transform duration-300 group-hover:scale-110 group-hover:bg-yellow-100">
                    <span className="text-lg">🛒</span>
                  </span>
                  <span className="relative z-10 font-['Poppins',_sans-serif] transition-all duration-300 group-hover:translate-x-1">
                    Bazaar Bridge
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/arthik-sahara"
                  className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-green-50 rounded-lg transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 transition-transform duration-300 group-hover:scale-110 group-hover:bg-green-100">
                    <span className="text-lg">💰</span>
                  </span>
                  <span className="relative z-10 font-['Poppins',_sans-serif] transition-all duration-300 group-hover:translate-x-1">
                    Arthik Sahara
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/samuday-shakti"
                  className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-green-50 rounded-lg transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 transition-transform duration-300 group-hover:scale-110 group-hover:bg-purple-100">
                    <span className="text-lg">👨‍👩‍👧‍👦</span>
                  </span>
                  <span className="relative z-10 font-['Poppins',_sans-serif] transition-all duration-300 group-hover:translate-x-1">
                    Samuday Shakti
                  </span>
                </Link>
              </li>
            </ul>

            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2 mt-6 flex items-center font-['Poppins',_sans-serif]">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Support
            </h2>

            <ul className="space-y-2">
              <li>
                <Link
                  href="/ai-assistant"
                  className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-green-50 rounded-lg transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-100">
                    <span className="text-lg">🤖</span>
                  </span>
                  <span className="relative z-10 font-['Poppins',_sans-serif] transition-all duration-300 group-hover:translate-x-1">
                    AI Assistant
                  </span>
                </Link>
              </li>
              <li></li>
              <li></li>
            </ul>
          </nav>

          {session.status === "authenticated" && (
            <div className="p-4 border-t border-green-100 mt-auto">
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
                className="flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-lg">👋</span>
                </span>
                <span className="font-['Poppins',_sans-serif] transition-all duration-300 group-hover:translate-x-1">
                  Sign out
                </span>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Add animation classes */}
      <style jsx global>{`
        @keyframes dropdown {
          0% {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-dropdown {
          animation: dropdown 0.2s ease-out forwards;
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }

        @keyframes slide-in-left {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
}
