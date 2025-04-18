import React from "react";

export default function GyanDharaPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gyan Dhara</h1>
          <p className="text-gray-600">Hyperlocal weather forecasts and farm advisories</p>
        </div>
      </div>

      {/* Weather forecast card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Today's Weather</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Temperature</p>
              <p className="text-3xl font-bold text-gray-800">32°C</p>
              <p className="text-sm text-gray-600">Feels like 34°C</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Humidity</p>
              <p className="text-3xl font-bold text-gray-800">65%</p>
              <p className="text-sm text-gray-600">Moderate</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Wind</p>
              <p className="text-3xl font-bold text-gray-800">12 km/h</p>
              <p className="text-sm text-gray-600">North-East</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-100 pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">7-Day Forecast</h3>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={day} className="text-center">
                <p className="text-sm font-medium text-gray-700">{day}</p>
                <div className="my-2 w-10 h-10 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <p className="text-sm font-bold text-gray-800">{32 - i}°C</p>
                <p className="text-xs text-gray-500">{22 - i}°C</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Farm Advisory */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Farm Advisory</h2>
        
        <div className="bg-white rounded-lg p-4 border border-green-100 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Irrigation Alert</h3>
              <p className="text-gray-600 mt-1">No rain expected for the next 3 days. Irrigate your wheat crop today.</p>
              <div className="mt-2 text-sm text-gray-500">Today, 8:30 AM</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-green-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Crop Management Tip</h3>
              <p className="text-gray-600 mt-1">Current weather conditions are favorable for wheat growth. Maintain regular monitoring for rust disease.</p>
              <div className="mt-2 text-sm text-gray-500">Yesterday, 4:15 PM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}