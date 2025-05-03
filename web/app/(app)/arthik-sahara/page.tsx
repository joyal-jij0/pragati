'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Search,
  Bell,
  Menu,
  CreditCard,
  TrendingUp,
  FileText,
  Umbrella,
  BarChart2,
  AlertTriangle,
} from 'lucide-react'

// Import components
import CreditDashboard from '@/components/arthikSahara/CreditDashboard'
import LoanMarketplace from '@/components/arthikSahara/LoanMarketplace'
import ApplicationStatus from '@/components/arthikSahara/ApplicationStatus'
import CreditImprovement from '@/components/arthikSahara/CreditImprovement'
import InsuranceDashboard from '@/components/arthikSahara/InsuranceDashboard'
import InsuranceProducts from '@/components/arthikSahara/InsuranceProducts'
import ClaimStatus from '@/components/arthikSahara/ClaimStatus'
import FinancialEducation from '@/components/arthikSahara/FinancialEducation'
import HeroSection from '@/components/HeroSection'

export default function ArthikSaharaPage() {
  const [location, setLocation] = useState('Sonipat, Haryana')
  const [activeTab, setActiveTab] = useState('creditDashboard')
  const [showAIAssistant, setShowAIAssistant] = useState(false)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50">
      {/* Header */}
      <div className="pb-4 px-4">
        <HeroSection
          title="Arthik"
          secondaryTitle="Sahara"
          info="Your trusted companion for financial guidance, helping you find the best loan options while ensuring transparency, affordability, and protection from scams."
          badges={['Verified Lenders', 'No Hidden Fees', 'Tailored Advice']}
          floatingIcon="💰"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            {/* Credit Scoring Tabs */}
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 flex items-center gap-1 ${
                activeTab === 'creditDashboard'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('creditDashboard')}
            >
              <CreditCard size={16} />
              <span>Credit Profile</span>
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 flex items-center gap-1 ${
                activeTab === 'loanMarketplace'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('loanMarketplace')}
            >
              <BarChart2 size={16} />
              <span>Loan Marketplace</span>
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 flex items-center gap-1 ${
                activeTab === 'applications'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('applications')}
            >
              <FileText size={16} />
              <span>Application Status</span>
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 flex items-center gap-1 ${
                activeTab === 'improve'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('improve')}
            >
              <TrendingUp size={16} />
              <span>Improve Score</span>
            </button>

            {/* Divider */}
            <div className="border-r border-gray-200 mx-2"></div>

            {/* Insurance Tabs */}
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 flex items-center gap-1 ${
                activeTab === 'insuranceDashboard'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('insuranceDashboard')}
            >
              <Umbrella size={16} />
              <span>Insurance Dashboard</span>
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 flex items-center gap-1 ${
                activeTab === 'insuranceProducts'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('insuranceProducts')}
            >
              <AlertTriangle size={16} />
              <span>Insurance Plans</span>
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 flex items-center gap-1 ${
                activeTab === 'claims'
                  ? 'border-green-600 text-green-700'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => setActiveTab('claims')}
            >
              <FileText size={16} />
              <span>Claim Status</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 space-y-6"
          >
            {activeTab === 'creditDashboard' && <CreditDashboard />}
            {activeTab === 'loanMarketplace' && <LoanMarketplace />}
            {activeTab === 'applications' && <ApplicationStatus />}
            {activeTab === 'improve' && <CreditImprovement />}

            {/* Insurance Feature Tabs */}
            {activeTab === 'insuranceDashboard' && <InsuranceDashboard />}
            {activeTab === 'insuranceProducts' && <InsuranceProducts />}
            {activeTab === 'claims' && <ClaimStatus />}
          </motion.div>

          {/* Right Sidebar - Always visible */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Financial Education Section */}
            <FinancialEducation />

            {/* AI Financial Assistant */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-3">
                <h3 className="text-white font-medium flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M16.5 7.5h-9v9h9v-9z" />
                    <path
                      fillRule="evenodd"
                      d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Financial Assistant AI
                </h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-3">
                  Get answers to your financial questions or learn about loans
                  and insurance.
                </p>
                <button
                  onClick={() => setShowAIAssistant(true)}
                  className="w-full bg-green-100 hover:bg-green-200 text-green-800 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                    <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                  </svg>
                  Chat with Assistant
                </button>
              </div>
            </div>

            {/* Personalized Recommendations */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3">
                <h3 className="text-white font-medium flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Recommendations for You
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CreditCard size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Eligible for Crop Loan
                    </p>
                    <p className="text-xs text-gray-500">
                      Your credit score now qualifies for crop loans
                    </p>
                    <button className="mt-1 text-green-600 text-xs font-medium">
                      View →
                    </button>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Umbrella size={16} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Weather-based Insurance
                    </p>
                    <p className="text-xs text-gray-500">
                      Get crop insurance for the upcoming monsoon
                    </p>
                    <button className="mt-1 text-amber-600 text-xs font-medium">
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50 p-4">
          <div className="bg-white rounded-t-lg md:rounded-lg max-w-lg w-full max-h-[80vh] flex flex-col">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-3 rounded-t-lg flex justify-between items-center">
              <h3 className="text-white font-medium flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                  <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                </svg>
                Financial Assistant AI
              </h3>
              <button
                onClick={() => setShowAIAssistant(false)}
                className="text-white hover:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* AI Messages */}
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-green-600"
                  >
                    <path d="M16.5 7.5h-9v9h9v-9z" />
                    <path
                      fillRule="evenodd"
                      d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700 max-w-[85%]">
                  Hello! I am your financial assistant. I can provide
                  information about loans, insurance, or your credit score. What
                  would you like to ask me?
                </div>
              </div>

              <div className="flex items-start gap-3 justify-end">
                <div className="bg-green-600 rounded-lg p-3 text-sm text-white max-w-[85%]">
                  I need information about crop loans
                </div>
                <div className="bg-green-100 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-green-600"
                  >
                    <path d="M16.5 7.5h-9v9h9v-9z" />
                    <path
                      fillRule="evenodd"
                      d="M8.25 2.25A.75.75 0 019 3v.75h2.25V3a.75.75 0 011.5 0v.75H15V3a.75.75 0 011.5 0v.75h.75a3 3 0 013 3v.75H21A.75.75 0 0121 9h-.75v2.25H21a.75.75 0 010 1.5h-.75V15H21a.75.75 0 010 1.5h-.75v.75a3 3 0 01-3 3h-.75V21a.75.75 0 01-1.5 0v-.75h-2.25V21a.75.75 0 01-1.5 0v-.75H9V21a.75.75 0 01-1.5 0v-.75h-.75a3 3 0 01-3-3v-.75H3A.75.75 0 013 15h.75v-2.25H3a.75.75 0 010-1.5h.75V9H3a.75.75 0 010-1.5h.75v-.75a3 3 0 013-3h.75V3a.75.75 0 01.75-.75zM6 6.75A.75.75 0 016.75 6h10.5a.75.75 0 01.75.75v10.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V6.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-700 max-w-[85%]">
                  <p>
                    Crop loans are specially designed loans for farmers to cover
                    the expenses required for crop production.
                  </p>
                  <p className="mt-2">Crop loans available on our platform:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Farmer Credit Card (KCC) - 7% interest rate</li>
                    <li>Crop Production Loan - 9.5% interest rate</li>
                    <li>Small Farmer Development Loan - 8.75% interest rate</li>
                  </ul>
                  <p className="mt-2">
                    Your current credit score is 68/100, which makes you
                    eligible for these loans.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
                      View Loan Marketplace
                    </button>
                    <button className="bg-white border border-gray-300 text-gray-700 text-xs px-3 py-1 rounded-full">
                      Check Eligibility
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your question here..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data Consent Modal - For Alternative Credit Scoring */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
          false ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-bold text-gray-800">Data Consent</h2>
            <button className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              To build your alternative credit score, we need to use your
              platform data. This will help you access financial services even
              without a traditional credit history.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-amber-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-700">
                    Your data will only be shared with your consent and only
                    with financial institutions you apply for loans with.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-800 mb-2">
                We will collect the following data:
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-green-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    Crop and farming details
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-green-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    Market transactions and sales records
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-green-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    History of advice adoption
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-green-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    App usage and engagement
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 text-green-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    FPO membership and activities
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm font-medium transition-colors">
              I Agree and Want to Proceed
            </button>
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 py-2 rounded-md text-sm font-medium transition-colors">
              Not Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
