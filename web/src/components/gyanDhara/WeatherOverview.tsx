"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Sun, Cloud, CloudRain, Wind, Droplets, Thermometer, 
  Sunrise, Sunset, ArrowUp, ArrowDown, RefreshCw
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getWeatherData, WeatherData, Hour } from "../../services/weatherService";

// Helper to format date in Hindi
const formatDateInHindi = (date: Date) => {
  const days = ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'];
  const months = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
  return `${days[date.getDay()]}वार, ${date.getDate()} ${months[date.getMonth()]}`;
};

// Helper to convert time to 12-hour format
const formatTime = (time: string | null) => {
  if (!time) return "";
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${period}`;
};

const WeatherOverview = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch weather data on mount
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const data = await getWeatherData("Delhi"); // Replace with dynamic location if needed
        setWeatherData(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to fetch weather data.");
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, []);

  if (loading) {
    return <div className="text-center text-xl">लोड हो रहा है...</div>;
  }

  if (error || !weatherData) {
    return <div className="text-center text-red-500">त्रुटि: {error || "कोई डेटा उपलब्ध नहीं।"}</div>;
  }

  // Prepare hourly data for chart
  const hourlyData: { time: string; temp: number }[] = weatherData.forecast.forecastday?.[0]?.hour?.map((hour: Hour) => ({
    time: formatTime(hour.time?.split(' ')[1] || null),
    temp: hour.temp_c || 0,
  })) || [];

  // Current weather details
  const current = weatherData.current;
  const today = weatherData.forecast.forecastday?.[0]?.day;
  const astro = weatherData.forecast.forecastday?.[0]?.astro;

  return (
    <div className="space-y-6">
      {/* Current Weather Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl overflow-hidden text-white shadow-lg"
      >
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">आज का मौसम</h2>
              <p className="text-blue-100">{weatherData.resolvedAddress}</p>
              <p className="text-blue-100">{formatDateInHindi(new Date())}</p>
            </div>
            <button 
              className="p-2 rounded-full bg-white/10 hover:bg-white/20"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center">
              {current.condition?.text?.includes("Sunny") && <Sun className="h-20 w-20 mr-4 text-amber-300" />}
              {current.condition?.text?.includes("Cloud") && <Cloud className="h-20 w-20 mr-4 text-gray-300" />}
              {current.condition?.text?.includes("Rain") && <CloudRain className="h-20 w-20 mr-4 text-blue-300" />}
              <div>
                <span className="text-5xl font-bold">{Math.round(current.temp_c || 0)}°</span>
                <div className="flex items-center text-blue-100 mt-1">
                  <span className="flex items-center mr-3">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    {Math.round(today?.maxtemp_c || 0)}°
                  </span>
                  <span className="flex items-center">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    {Math.round(today?.mintemp_c || 0)}°
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-xl font-medium">{current.condition?.text || "साफ़"}</div>
              <div className="text-blue-100">महसूस होता है: {Math.round(current.feelslike_c || 0)}°</div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center">
              <Wind className="h-6 w-6 mb-2 text-blue-100" />
              <div className="text-sm text-blue-100">हवा</div>
              <div className="font-medium">{Math.round(current.wind_kph || 0)} km/h</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center">
              <Droplets className="h-6 w-6 mb-2 text-blue-100" />
              <div className="text-sm text-blue-100">नमी</div>
              <div className="font-medium">{current.humidity || 0}%</div>
            </div>
            <div className="bg-white/10 rounded-xl p-3 flex flex-col items-center">
              <CloudRain className="h-6 w-6 mb-2 text-blue-100" />
              <div className="text-sm text-blue-100">वर्षा</div>
              <div className="font-medium">{current.precip_mm || 0} mm</div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-center text-sm">
            <div className="flex items-center">
              <Sunrise className="h-5 w-5 mr-2 text-amber-300" />
              <span>{astro?.sunrise || "6:15 AM"}</span>
            </div>
            <div className="w-1/3 h-1 bg-white/20 rounded-full relative">
              <div className="absolute w-2 h-2 bg-amber-300 rounded-full" style={{ left: '60%', top: '-2px' }}></div>
            </div>
            <div className="flex items-center">
              <Sunset className="h-5 w-5 mr-2 text-amber-300" />
              <span>{astro?.sunset || "6:45 PM"}</span>
            </div>
          </div>
        </div>
        
        {/* Hourly Forecast Chart */}
        <div className="px-6 pb-6">
          <h3 className="text-lg font-medium mb-4">आज का घंटेवार पूर्वानुमान</h3>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={hourlyData}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fill: '#ffffff', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                  tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                />
                <YAxis 
                  hide={true}
                  domain={['dataMin - 2', 'dataMax + 2']}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(26, 86, 219, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#ffffff" 
                  strokeWidth={2}
                  fill="url(#tempGradient)" 
                  activeDot={{ r: 6, fill: '#ffffff', stroke: '#1E40AF', strokeWidth: 2 }}
                  dot={{ r: 4, fill: '#ffffff', stroke: '#1E40AF', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>
      
      {/* Weekly Forecast Preview */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-3xl shadow-md p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">साप्ताहिक पूर्वानुमान</h2>
          <button className="text-sm text-emerald-600 font-medium flex items-center">
            पूर्ण पूर्वानुमान देखें
            <ArrowUp className="h-4 w-4 ml-1 rotate-90" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {weatherData.forecast.forecastday?.map((day, index) => (
            <div 
              key={day.date || index} 
              className={`flex flex-col items-center p-2 rounded-xl ${index === 0 ? 'bg-emerald-50 border border-emerald-100' : ''}`}
            >
              <div className={`text-sm font-medium ${index === 0 ? 'text-emerald-700' : 'text-gray-700'}`}>
                {['सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि', 'रवि'][index % 7]}
              </div>
              <div className="my-2">
                {day.day?.condition?.text?.includes("Sunny") && <Sun className="h-8 w-8 text-amber-500" />}
                {day.day?.condition?.text?.includes("Cloud") && <Cloud className="h-8 w-8 text-gray-500" />}
                {day.day?.condition?.text?.includes("Rain") && <CloudRain className="h-8 w-8 text-blue-500" />}
              </div>
              <div className={`text-sm font-bold ${index === 0 ? 'text-emerald-700' : 'text-gray-700'}`}>
                {Math.round(day.day?.maxtemp_c || 0)}°
              </div>
              <div className={`text-xs ${index === 0 ? 'text-emerald-600' : 'text-gray-500'}`}>
                {Math.round(day.day?.mintemp_c || 0)}°
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Current Conditions Details */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-3xl shadow-md p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">वर्तमान स्थिति विवरण</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Thermometer className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-sm text-gray-600">अधिकतम तापमान</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{Math.round(today?.maxtemp_c || 0)}°C</div>
            <div className="text-xs text-gray-500">सामान्य से {Math.round((today?.maxtemp_c || 0) - 30)}° अधिक</div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Thermometer className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm text-gray-600">न्यूनतम तापमान</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{Math.round(today?.mintemp_c || 0)}°C</div>
            <div className="text-xs text-gray-500">सामान्य से {Math.round((today?.mintemp_c || 0) - 22)}° अधिक</div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Wind className="h-5 w-5 text-emerald-500 mr-2" />
              <span className="text-sm text-gray-600">हवा</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{Math.round(current.wind_kph || 0)} km/h</div>
            <div className="text-xs text-gray-500">{current.wind_dir || "उत्तर-पश्चिम से"}</div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Droplets className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm text-gray-600">आर्द्रता</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{current.humidity || 0}%</div>
            <div className="text-xs text-gray-500">सामान्य</div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <CloudRain className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-sm text-gray-600">वर्षा संभावना</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{today?.daily_chance_of_rain || 0}%</div>
            <div className="text-xs text-gray-500">{(today?.daily_chance_of_rain || 0) > 0 ? "बारिश संभव" : "आज बारिश नहीं"}</div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Sun className="h-5 w-5 text-amber-500 mr-2" />
              <span className="text-sm text-gray-600">UV सूचकांक</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{Math.round(current.uv || 0)}</div>
            <div className="text-xs text-gray-500">{(current.uv || 0) > 5 ? "उच्च - सुरक्षा आवश्यक" : "सामान्य"}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherOverview;