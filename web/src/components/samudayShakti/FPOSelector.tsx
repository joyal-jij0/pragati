import React, { useState } from "react";
import { Users, Settings, ChevronDown, LogOut } from "lucide-react";

interface FPO {
  id: number;
  name: string;
  members: number;
  location: string;
}

interface FPOSelectorProps {
  selectedFPO: string;
  joinedFPOs: FPO[];
  onChangeFPO: (fpoId: number) => void;
  onLeaveFPO: (fpoId: number) => void;
}

const FPOSelector = ({ selectedFPO, joinedFPOs, onChangeFPO, onLeaveFPO }: FPOSelectorProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  
  const currentFPO = joinedFPOs.find(fpo => fpo.name === selectedFPO);
  
  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Current FPO</p>
              <h3 className="font-medium text-gray-800">{selectedFPO}</h3>
            </div>
          </div>
          <div className="relative">
            <button 
              className="text-sm bg-green-100 text-green-700 px-3 py-1.5 rounded-md hover:bg-green-200 transition-colors flex items-center gap-1"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Settings className="h-4 w-4" />
              <span>Manage FPO</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-20 border border-gray-100">
                <div className="p-2">
                  <p className="text-xs text-gray-500 px-3 py-1">Switch FPO</p>
                  {joinedFPOs.map(fpo => (
                    <button
                      key={fpo.id}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md flex items-center justify-between ${fpo.name === selectedFPO ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'}`}
                      onClick={() => {
                        onChangeFPO(fpo.id);
                        setShowDropdown(false);
                      }}
                    >
                      <span>{fpo.name}</span>
                      {fpo.name === selectedFPO && (
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      )}
                    </button>
                  ))}
                  
                  {currentFPO && (
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md flex items-center gap-2"
                        onClick={() => {
                          if (confirm(`Are you sure you want to leave ${selectedFPO}?`)) {
                            onLeaveFPO(currentFPO.id);
                            setShowDropdown(false);
                          }
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Leave this FPO</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FPOSelector;