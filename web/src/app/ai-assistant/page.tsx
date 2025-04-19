'use client'
import { useState } from 'react'
import {
  FaSeedling,
  FaLeaf,
  FaSearch,
  FaPlus,
  FaChevronDown,
} from 'react-icons/fa'
import { BsShield, BsThreeDots } from 'react-icons/bs'
import { GiWheat, GiCorn } from 'react-icons/gi'
import { MdOutlineWaterDrop } from 'react-icons/md'
import { TbPlant } from 'react-icons/tb'

export default function Home() {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="flex h-screen bg-white text-black pt-10">
      {/* Left Sidebar */}
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Main content area */}
        <div className="flex-1 overflow-y-auto bg-white p-4">
          <div className="max-w-3xl mx-auto">
            {/* Header with dropdown */}
            <div className="flex items-center mb-4">
              <span className="text-xl font-medium">Farming</span>
              <FaChevronDown className="ml-2 text-green-600" />
            </div>

            {/* Main content */}
            <div className="flex flex-col items-center mt-8">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <GiWheat className="text-green-600 text-4xl" />
              </div>

              <h1 className="text-3xl font-bold mb-2">Farming</h1>
              <div className="text-sm text-gray-600 mb-2 flex items-center">
                By Krishi Sahayak Team
              </div>

              <p className="text-center text-sm max-w-lg mb-6">
                Farming advice and analysis guide, educating on agricultural
                practices and techniques. Learn how to interpret soil data and
                grow crops like a professional farmer. Crop Generator for
                Vegetables, Fruits, Grains, Herbs, Organic, and Sustainable
                farming.
              </p>

              {/* Action cards */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-3xl">
                <div className="border border-green-200 rounded-lg p-4 hover:bg-green-50 cursor-pointer">
                  <div className="flex items-start">
                    <div className="p-1 bg-green-100 rounded mr-2">
                      <GiCorn className="text-green-600" />
                    </div>
                    <div className="text-sm">Crop plan for corn</div>
                  </div>
                </div>

                <div className="border border-green-200 rounded-lg p-4 hover:bg-green-50 cursor-pointer">
                  <div className="flex items-start">
                    <div className="p-1 bg-green-100 rounded mr-2">
                      <FaLeaf className="text-green-600" />
                    </div>
                    <div className="text-sm">Pest control methods</div>
                  </div>
                </div>

                <div className="border border-green-200 rounded-lg p-4 hover:bg-green-50 cursor-pointer">
                  <div className="flex items-start">
                    <div className="p-1 bg-green-100 rounded mr-2">
                      <MdOutlineWaterDrop className="text-green-600" />
                    </div>
                    <div className="text-sm">Generate irrigation schedule</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-green-100">
          <div className="max-w-3xl mx-auto relative">
            <div className="rounded-lg border border-green-200 bg-white p-2 shadow-sm">
              <input
                type="text"
                placeholder="Ask anything"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full p-2 outline-none"
              />
              <div className="absolute right-4 bottom-4 flex items-center space-x-2">
                <button className="p-2 rounded-full hover:bg-green-100">
                  <FaPlus />
                </button>
                <button className="p-2 rounded-full hover:bg-green-100">
                  <BsThreeDots />
                </button>
                <button className="p-2 rounded-full hover:bg-green-100">
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-52 bg-green-50/50 border-r border-green-100 flex flex-col">
        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto">
          {/* <div className="p-2">
            <div className="flex items-center p-2 rounded-lg hover:bg-green-100 cursor-pointer">
              <div className="w-6 h-6 flex items-center justify-center mr-2">
                <FaSeedling className="text-green-600" />
              </div>
              <span>AI Farming Assistant</span>
            </div>

            <div className="flex items-center p-2 rounded-lg bg-green-200 cursor-pointer">
              <div className="w-6 h-6 flex items-center justify-center mr-2">
                <GiWheat className="text-green-600" />
              </div>
              <span>Content translation</span>
            </div>

            <div className="flex items-center p-2 rounded-lg hover:bg-green-100 cursor-pointer">
              <div className="w-6 h-6 flex items-center justify-center mr-2 text-green-600">
                <TbPlant />
              </div>
              <span>FarmGPT Classic</span>
            </div>

            <div className="flex items-center p-2 rounded-lg hover:bg-green-100 cursor-pointer">
              <div className="w-6 h-6 flex items-center justify-center mr-2">
                <BsShield className="text-green-600" />
              </div>
              <span>Pest Checker</span>
            </div>
          </div> */}

          {/* Yesterday section */}
          <div className="mt-4 px-4 py-2">
            <div className="text-xs text-gray-500 mb-2">Yesterday</div>
            <div className="text-sm py-1 hover:bg-green-100 cursor-pointer rounded px-2">
              Crop Rotation Guide
            </div>
            <div className="text-sm py-1 hover:bg-green-100 cursor-pointer rounded px-2">
              Soil nutrient response
            </div>
            <div className="text-sm py-1 hover:bg-green-100 cursor-pointer rounded px-2">
              Pests and disease risk
            </div>
            <div className="text-sm py-1 hover:bg-green-100 cursor-pointer rounded px-2">
              Organic farming Request
            </div>
            <div className="text-sm py-1 hover:bg-green-100 cursor-pointer rounded px-2">
              Irrigation Routine
            </div>
          </div>

          {/* Previous 7 Days section */}
          <div className="mt-4 px-4 py-2">
            <div className="text-xs text-gray-500 mb-2">Previous 7 Days</div>
            <div className="text-sm py-1 hover:bg-green-100 cursor-pointer rounded px-2">
              Crop Journey Chart
            </div>
            <div className="text-sm py-1 hover:bg-green-100 cursor-pointer rounded px-2">
              Greenhouse Design
            </div>
            <div className="text-sm py-1 hover:bg-green-100 cursor-pointer rounded px-2">
              Enhance Soil Fertility
            </div>
            <div className="text-sm py-1 hover:bg-green-100 cursor-pointer rounded px-2">
              Creating Sheets in Onshape
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
