import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CreditCard, 
  Filter, 
  ChevronDown, 
  Star, 
  Clock, 
  Calendar, 
  Percent, 
  CheckCircle, 
  XCircle
} from "lucide-react";

const LoanMarketplace = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [loanType, setLoanType] = useState("all");
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const loanProducts = [
    {
      id: 1,
      name: "Kisan Credit Card",
      provider: "State Bank of India",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/200px-SBI-logo.svg.png",
      interestRate: "7.0%",
      maxAmount: "₹3,00,000",
      duration: "12 months",
      eligible: true,
      featured: true,
      type: "crop"
    },
    {
      id: 2,
      name: "Crop Production Loan",
      provider: "Punjab National Bank",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Punjab_National_Bank_logo.svg/200px-Punjab_National_Bank_logo.svg.png",
      interestRate: "9.5%",
      maxAmount: "₹2,00,000",
      duration: "24 months",
      eligible: true,
      featured: false,
      type: "crop"
    },
    {
      id: 3,
      name: "Small Farmer Development Loan",
      provider: "NABARD",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/NABARD_Logo.svg/200px-NABARD_Logo.svg.png",
      interestRate: "8.75%",
      maxAmount: "₹1,50,000",
      duration: "36 months",
      eligible: true,
      featured: false,
      type: "development"
    },
    {
      id: 4,
      name: "Agricultural Equipment Loan",
      provider: "HDFC Bank",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/200px-HDFC_Bank_Logo.svg.png",
      interestRate: "10.5%",
      maxAmount: "₹5,00,000",
      duration: "48 months",
      eligible: false,
      featured: false,
      type: "equipment"
    },
    {
      id: 5,
      name: "Irrigation Project Loan",
      provider: "Bank of Baroda",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Bank_of_Baroda_logo.svg/200px-Bank_of_Baroda_logo.svg.png",
      interestRate: "8.25%",
      maxAmount: "₹2,50,000",
      duration: "36 months",
      eligible: true,
      featured: false,
      type: "infrastructure"
    }
  ];

  const filteredLoans = loanType === "all" 
    ? loanProducts 
    : loanProducts.filter(loan => loan.type === loanType);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Loan Market</h2>
        <button 
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-1 text-sm bg-white px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50"
        >
          <Filter className="h-4 w-4" />
          <span>Filter</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filters */}
      {filterOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-xl shadow-md p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loan Type</label>
              <select 
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={loanType}
                onChange={(e) => setLoanType(e.target.value)}
              >
                <option value="all">All Loans</option>
                <option value="crop">Crop Loan</option>
                <option value="equipment">Equipment Loan</option>
                <option value="development">Development Loan</option>
                <option value="infrastructure">Infrastructure Loan</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Interest Rate</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>No Limit</option>
                <option>7%</option>
                <option>8%</option>
                <option>9%</option>
                <option>10%</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loan Duration</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>No Preference</option>
                <option>Up to 12 months</option>
                <option>Up to 24 months</option>
                <option>Up to 36 months</option>
                <option>36+ months</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end gap-2">
            <button className="text-sm text-gray-600 hover:text-gray-800">Reset</button>
            <button className="text-sm bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700">Apply</button>
          </div>
        </motion.div>
      )}

      {/* Featured Loan */}
      {filteredLoans.some(loan => loan.featured) && (
        <motion.div 
          variants={cardVariants}
          className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl shadow-md overflow-hidden border border-amber-200"
        >
          <div className="px-6 py-3 bg-amber-500 text-white flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">Featured Loan</span>
            </div>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Recommended for you</span>
          </div>
          
          {filteredLoans.filter(loan => loan.featured).map(loan => (
            <div key={loan.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={loan.logo} alt={loan.provider} className="h-12 w-12 object-contain bg-white p-1 rounded-md" />
                  <div>
                    <h3 className="font-medium text-gray-800">{loan.name}</h3>
                    <p className="text-sm text-gray-600">{loan.provider}</p>
                  </div>
                </div>
                <div className="bg-white px-3 py-1 rounded-full text-sm font-medium text-green-600 border border-green-200">
                  Eligible
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-1">
                    <Percent className="h-4 w-4" />
                    <span>Interest Rate</span>
                  </div>
                  <div className="font-semibold text-gray-800">{loan.interestRate}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-1">
                    <CreditCard className="h-4 w-4" />
                    <span>Maximum Amount</span>
                  </div>
                  <div className="font-semibold text-gray-800">{loan.maxAmount}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>Duration</span>
                  </div>
                  <div className="font-semibold text-gray-800">{loan.duration}</div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-md text-sm font-medium transition-colors">
                  Apply Now
                </button>
                <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded-md text-sm font-medium transition-colors">
                  More Info
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Other Loans */}
      <div className="space-y-4">
        {filteredLoans.filter(loan => !loan.featured).map(loan => (
          <motion.div 
            key={loan.id}
            variants={cardVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={loan.logo} alt={loan.provider} className="h-12 w-12 object-contain bg-gray-50 p-1 rounded-md" />
                  <div>
                    <h3 className="font-medium text-gray-800">{loan.name}</h3>
                    <p className="text-sm text-gray-600">{loan.provider}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${loan.eligible ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-gray-50 text-gray-600 border border-gray-200'}`}>
                  {loan.eligible ? 'Eligible' : 'Not Eligible'}
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
                    <Percent className="h-3 w-3" />
                    <span>Interest Rate</span>
                  </div>
                  <div className="font-semibold text-gray-800">{loan.interestRate}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
                    <CreditCard className="h-3 w-3" />
                    <span>Maximum Amount</span>
                  </div>
                  <div className="font-semibold text-gray-800">{loan.maxAmount}</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-1">
                    <Calendar className="h-3 w-3" />
                    <span>Duration</span>
                  </div>
                  <div className="font-semibold text-gray-800">{loan.duration}</div>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <button 
                  className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-colors ${loan.eligible ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                  disabled={!loan.eligible}
                >
                  Apply Now
                </button>
                <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-1.5 rounded-md text-sm font-medium transition-colors">
                  Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Eligibility Info */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">Loan Eligibility Requirements</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">Minimum Credit Score</p>
                <p className="text-xs text-gray-600">Most loans require a score of 60/100 or higher</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">Crop Production Record</p>
                <p className="text-xs text-gray-600">Proof of crop production for the last 2 seasons</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">Land Records</p>
                <p className="text-xs text-gray-600">Proof of ownership or lease of farming land</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-800">Outstanding Loans</p>
                <p className="text-xs text-gray-600">Most lenders will not provide a new loan if you have outstanding loans</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <div className="bg-green-100 p-1 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Your Current Score: 68/100</p>
                <p className="text-xs text-gray-600">You are eligible for most loans. Update your crop sales record and follow advice to improve your score.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Application Process */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">Application Process</h3>
        </div>
        
        <div className="p-6">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="space-y-8">
              <div className="relative flex gap-4">
                <div className="bg-green-600 text-white h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 z-10">1</div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Choose Loan</h4>
                  <p className="mt-1 text-xs text-gray-600">Select the appropriate loan option based on your needs</p>
                </div>
              </div>
              
              <div className="relative flex gap-4">
                <div className="bg-green-600 text-white h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 z-10">2</div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Fill Application Form</h4>
                  <p className="mt-1 text-xs text-gray-600">Provide your personal, crop, and land information</p>
                </div>
              </div>
              
              <div className="relative flex gap-4">
                <div className="bg-green-600 text-white h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 z-10">3</div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Upload Documents</h4>
                  <p className="mt-1 text-xs text-gray-600">Upload Aadhaar card, land records, and crop production proof</p>
                </div>
              </div>
              
              <div className="relative flex gap-4">
                <div className="bg-green-600 text-white h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 z-10">4</div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Digital Verification</h4>
                  <p className="mt-1 text-xs text-gray-600">Verify your identity through a video call</p>
                </div>
              </div>
              
              <div className="relative flex gap-4">
                <div className="bg-green-600 text-white h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 z-10">5</div>
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Approval and Disbursement</h4>
                  <p className="mt-1 text-xs text-gray-600">Once approved, the amount will be directly deposited into your bank account</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Start Application Now
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* FAQ Section */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">Frequently Asked Questions</h3>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-800">Can I apply for more than one loan?</h4>
            <p className="mt-1 text-xs text-gray-600">Yes, you can apply for more than one loan, but your total loan amount should not exceed your eligibility limit.</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-800">How long does the loan application process take?</h4>
            <p className="mt-1 text-xs text-gray-600">Typically, the application process is completed within 3-5 working days, provided all documents are correct.</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-800">Can I repay my loan early?</h4>
            <p className="mt-1 text-xs text-gray-600">Yes, most loans have an option for prepayment, and some do not even charge a prepayment fee.</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-800">What if my credit score is low?</h4>
            <p className="mt-1 text-xs text-gray-600">There are special loan schemes available for farmers with low credit scores, but the interest rate may be higher.</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-800">Can I apply for a loan from my mobile?</h4>
            <p className="mt-1 text-xs text-gray-600">Yes, you can apply for a loan from anywhere using our mobile app or website.</p>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Other questions?</p>
            <button className="text-sm text-green-600 font-medium hover:text-green-700">
              Contact Us →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoanMarketplace;