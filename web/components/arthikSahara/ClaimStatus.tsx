import React from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock, 
  ChevronRight,
  Download,
  MessageSquare,
  Camera,
  Upload,
  Umbrella,
  Calendar
} from "lucide-react";

const ClaimStatus = () => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Sample claims data
  const claims = [
    {
      id: "CLM-2023-1105",
      type: "Crop Insurance - Drought",
      provider: "Agriculture Insurance Company",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Agriculture_Insurance_Company_of_India_logo.svg/200px-Agriculture_Insurance_Company_of_India_logo.svg.png",
      policyId: "POL-2023-0501",
      amount: "₹75,000",
      date: "November 5, 2023",
      status: "processing", // processing, approved, rejected, pending
      progress: 60,
      steps: [
        { name: "Claim Filed", completed: true, date: "November 5, 2023" },
        { name: "Document Verification", completed: true, date: "November 8, 2023" },
        { name: "Field Inspection", completed: false, inProgress: true, date: "In Progress" },
        { name: "Assessment", completed: false, date: "Pending" },
        { name: "Final Decision", completed: false, date: "Pending" },
        { name: "Payment", completed: false, date: "Pending" }
      ]
    },
    {
      id: "CLM-2023-0920",
      type: "Livestock Insurance - Animal Disease",
      provider: "Life Insurance Corporation of India",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Life_Insurance_Corporation_of_India.svg/200px-Life_Insurance_Corporation_of_India.svg.png",
      policyId: "POL-2023-0615",
      amount: "₹20,000",
      date: "September 20, 2023",
      status: "approved",
      progress: 100,
      steps: [
        { name: "Claim Filed", completed: true, date: "September 20, 2023" },
        { name: "Document Verification", completed: true, date: "September 22, 2023" },
        { name: "Veterinary Inspection", completed: true, date: "September 25, 2023" },
        { name: "Assessment", completed: true, date: "September 28, 2023" },
        { name: "Final Decision", completed: true, date: "October 1, 2023" },
        { name: "Payment", completed: true, date: "October 5, 2023" }
      ]
    },
    {
      id: "CLM-2023-0805",
      type: "Crop Insurance - Excessive Rainfall",
      provider: "Agriculture Insurance Company",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Agriculture_Insurance_Company_of_India_logo.svg/200px-Agriculture_Insurance_Company_of_India_logo.svg.png",
      policyId: "POL-2022-0501",
      amount: "₹45,000",
      date: "August 5, 2023",
      status: "rejected",
      progress: 100,
      steps: [
        { name: "Claim Filed", completed: true, date: "August 5, 2023" },
        { name: "Document Verification", completed: true, date: "August 8, 2023" },
        { name: "Field Inspection", completed: true, date: "August 12, 2023" },
        { name: "Assessment", completed: true, date: "August 15, 2023" },
        { name: "Final Decision", completed: true, date: "August 20, 2023", rejected: true }
      ]
    }
  ];

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "processing":
        return (
          <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Processing</span>
          </div>
        );
      case "approved":
        return (
          <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            <span>Approved</span>
          </div>
        );
      case "rejected":
        return (
          <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            <span>Rejected</span>
          </div>
        );
      case "pending":
        return (
          <div className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            <span>Pending</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Claim Status</h2>
        <button className="text-sm bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center gap-1">
          <FileText className="h-4 w-4" />
          <span>File New Claim</span>
        </button>
      </div>

      {/* Claims List */}
      <div className="space-y-4">
        {claims.map((claim) => (
          <motion.div 
            key={claim.id}
            variants={cardVariants}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* Claim Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={claim.logo} alt={claim.provider} className="h-12 w-12 object-contain bg-gray-50 p-1 rounded-md" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-800">{claim.type}</h3>
                      <StatusBadge status={claim.status} />
                    </div>
                    <p className="text-sm text-gray-600">{claim.provider}</p>
                    <p className="text-xs text-gray-500">Policy: {claim.policyId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-800">{claim.amount}</div>
                  <p className="text-xs text-gray-500">Claim Date: {claim.date}</p>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Progress</span>
                <span className="text-xs font-medium text-gray-700">{claim.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className={`h-2 rounded-full ${claim.status === 'rejected' ? 'bg-red-500' : claim.status === 'approved' ? 'bg-green-600' : 'bg-blue-600'}`} 
                  style={{ width: `${claim.progress}%` }}
                ></div>
              </div>
            </div>
            
            {/* Claim Steps */}
            <div className="p-6">
              <h4 className="text-sm font-medium text-gray-800 mb-4">Claim Process</h4>
              
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-6">
                  {claim.steps.map((step, index) => (
                    <div key={index} className="relative flex gap-4">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                        step.completed 
                          ? step.rejected 
                            ? 'bg-red-100 text-red-600' 
                            : 'bg-green-100 text-green-600' 
                          : step.inProgress 
                            ? 'bg-blue-100 text-blue-600' 
                            : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.completed 
                          ? step.rejected 
                            ? <XCircle className="h-5 w-5" /> 
                            : <CheckCircle className="h-5 w-5" /> 
                          : step.inProgress 
                            ? <Clock className="h-5 w-5" /> 
                            : index + 1
                        }
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-800">{step.name}</h5>
                        <p className="text-xs text-gray-500">{step.date}</p>
                        
                        {step.rejected && (
                          <div className="mt-2 bg-red-50 border-l-2 border-red-500 p-2">
                            <p className="text-xs text-red-600">Claim Rejected: According to weather data, rainfall in your area was below the damage threshold.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {claim.status === 'processing' && (
                <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <h5 className="text-sm font-medium text-gray-800">Next Step</h5>
                    <p className="text-xs text-gray-500">Field inspection is scheduled for November 15, 2023</p>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    <span>More Info</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              {claim.status === 'rejected' && (
                <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <h5 className="text-sm font-medium text-gray-800">Appeal</h5>
                    <p className="text-xs text-gray-500">You can appeal against this decision within 30 days</p>
                  </div>
                  <button className="text-sm bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors">
                    File Appeal
                  </button>
                </div>
              )}
              
              {claim.status === 'approved' && (
                <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <h5 className="text-sm font-medium text-gray-800">Payment Details</h5>
                    <p className="text-xs text-gray-500">₹20,000 has been paid to your bank account</p>
                    <p className="text-xs text-gray-500">Transaction ID: TXN-2023100501</p>
                  </div>
                  <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>Download Receipt</span>
                  </button>
                </div>
              )}
            </div>
            
            {/* Document Upload Section - Only for processing claims */}
            {claim.status === 'processing' && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-800">Document Upload</h4>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                    <Upload className="h-3 w-3" />
                    <span>Upload All</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-3 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-medium text-gray-800">Damage Photos</h5>
                      <span className="text-xs text-amber-600 font-medium">Required</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Upload at least 3 photos of crop damage</p>
                    <button className="w-full border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors">
                      <Camera className="h-6 w-6 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">Upload Photos</span>
                      <span className="text-xs text-gray-500 mt-1">or drag and drop files here</span>
                    </button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-3 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-medium text-gray-800">Land Records</h5>
                      <span className="text-xs text-green-600 font-medium">Uploaded</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Proof of your land ownership</p>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">land_record.pdf</span>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Communication Section */}
            <div className="p-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-800">Communication</h4>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  <span>View All Messages</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
              
              <div className="space-y-4">
                {claim.status === 'processing' && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-1 rounded-full">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-medium text-gray-800">Insurance Agent</h5>
                          <span className="text-xs text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Our inspector will visit your farm on November 15. Please be present on that day.</p>
                        
                        <div className="mt-3 flex justify-end">
                          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {claim.status === 'rejected' && (
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-100 p-1 rounded-full">
                        <MessageSquare className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-medium text-gray-800">Claim Manager</h5>
                          <span className="text-xs text-gray-500">10 days ago</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Your claim has been rejected. According to weather data, rainfall in your area was below the damage threshold. View the detailed report for more information.</p>
                        
                        <div className="mt-3 flex justify-end">
                          <button className="text-xs text-red-600 hover:text-red-700 font-medium">
                            View Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {claim.status === 'approved' && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full">
                        <MessageSquare className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-medium text-gray-800">Claim Manager</h5>
                          <span className="text-xs text-gray-500">15 days ago</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Your claim has been approved. ₹20,000 has been transferred to your bank account on October 5, 2023.</p>
                        
                        <div className="mt-3 flex justify-end">
                          <button className="text-xs text-green-600 hover:text-green-700 font-medium">
                            Send Thanks
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Message Input - Only for processing claims */}
              {claim.status === 'processing' && (
                <div className="mt-4">
                  <div className="relative">
                    <input
                      type="text"
                      className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Write a message..."
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button className="text-blue-600 hover:text-blue-700">
                        <MessageSquare className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* New Claim Guide */}
      <motion.div 
        variants={cardVariants}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-800">Claim Filing Guide</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">1. Fill Claim Form</h4>
              <p className="text-xs text-gray-500">Provide all required details including policy number, type of damage, and date.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">2. Upload Documents</h4>
              <p className="text-xs text-gray-500">Upload damage photos, land records, and other required documents.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-3">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-sm font-medium text-gray-800 mb-1">3. Wait for Inspection</h4>
              <p className="text-xs text-gray-500">Our agent will inspect your farm/livestock and evaluate your claim.</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1">
              <Umbrella className="h-4 w-4" />
              <span>File New Claim</span>
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
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">How long do I have to file a claim?</h4>
              <p className="text-sm text-gray-600">Claims must be filed within 7 days of damage. Late claims may require additional documentation and clarification.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">How long does claim settlement take?</h4>
              <p className="text-sm text-gray-600">After receiving all documents and completing inspection, claims are typically settled within 15-30 days.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">Can I appeal against a rejected claim?</h4>
              <p className="text-sm text-gray-600">Yes, you can file an appeal within 30 days of receiving the rejection notice. Provide additional evidence or documentation with your appeal.</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              <span>View More Questions</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClaimStatus;