// Weather forecast data
export const weatherData = [
  { day: 'Mon', temp: 32, humidity: 45, rainfall: 0, icon: '☀️' },
  { day: 'Tue', temp: 30, humidity: 50, rainfall: 0, icon: '☀️' },
  { day: 'Wed', temp: 28, humidity: 60, rainfall: 0, icon: '⛅' },
  { day: 'Thu', temp: 27, humidity: 70, rainfall: 12, icon: '🌧️' },
  { day: 'Fri', temp: 29, humidity: 55, rainfall: 2, icon: '⛅' },
  { day: 'Sat', temp: 31, humidity: 45, rainfall: 0, icon: '☀️' },
  { day: 'Sun', temp: 33, humidity: 40, rainfall: 0, icon: '☀️' },
]

// Crop health data
export const cropHealthData = [
  { name: 'Wheat', value: 85, color: '#22c55e' },
  { name: 'Rice', value: 70, color: '#84cc16' },
  { name: 'Maize', value: 60, color: '#facc15' },
]

// Market price data
export const marketPriceData = [
  { date: 'Jan', wheat: 2100, rice: 1800, maize: 1600 },
  { date: 'Feb', wheat: 2200, rice: 1850, maize: 1650 },
  { date: 'Mar', wheat: 2150, rice: 1900, maize: 1700 },
  { date: 'Apr', wheat: 2300, rice: 1950, maize: 1750 },
  { date: 'May', wheat: 2400, rice: 2000, maize: 1800 },
  { date: 'Jun', wheat: 2350, rice: 2050, maize: 1850 },
]

// Advisory data
export const advisoryData = [
  {
    id: 1,
    title: 'Irrigation Alert',
    description: 'अगले 3 दिनों तक बारिश नहीं होगी। गेहूं की फसल को पानी दें।',
    translation: 'No rain for next 3 days. Irrigate wheat.',
    icon: '💧',
    color: 'blue',
    timestamp: '2 hours ago',
    severity: 'medium',
    actionRequired: 'Irrigate within 24 hours',
    source: 'Weather Station'
  },
  {
    id: 2,
    title: 'Pest Alert',
    description: 'धान की फसल में भूरा फुदका का प्रकोप देखा गया है। निरीक्षण करें।',
    translation: 'Brown planthopper infestation observed in rice. Inspect your crop.',
    icon: '🐛',
    color: 'amber',
    timestamp: '1 day ago',
    severity: 'high',
    actionRequired: 'Inspect and spray recommended pesticide',
    source: 'Pest Monitoring Network'
  },
]

// Activity feed data
export const activityData = [
  {
    id: 1,
    type: 'weather',
    title: 'Weather Alert Acknowledged',
    description: 'You acknowledged the heavy rainfall alert',
    timestamp: '10 minutes ago',
    icon: '🌧️',
  },
  {
    id: 2,
    type: 'market',
    title: 'Crop Listed for Sale',
    description: 'You listed 2 quintals of wheat for sale at ₹2,400/quintal',
    timestamp: '2 hours ago',
    icon: '🌾',
  },
  {
    id: 3,
    type: 'diagnosis',
    title: 'Disease Diagnosis',
    description: 'Tomato leaf curl virus detected with 92% confidence',
    timestamp: '1 day ago',
    icon: '🍅',
  },
  {
    id: 4,
    type: 'purchase',
    title: 'Input Purchase',
    description: 'Purchased 50kg NPK fertilizer from Agro Solutions',
    timestamp: '2 days ago',
    icon: '🛒',
  },
]

// Recommendation data
export const recommendationData = [
  {
    id: 1,
    title: 'Market Opportunity',
    description: 'Wheat prices in Sonipat Mandi are predicted to rise next week. Consider delaying sale if possible.',
    icon: '📈',
    category: 'market',
    action: 'View Market Trends',
    link: '/bazaar-bridge/market-trends',
    priority: 'medium',
    timeToImplement: '1-2 weeks',
    potentialBenefit: '+₹200/quintal'
  },
  {
    id: 2,
    title: 'Crop Protection',
    description: 'High humidity predicted; scout your tomato plants for early blight signs in the next 3 days.',
    icon: '🍅',
    category: 'advisory',
    action: 'Learn About Early Blight',
    link: '/fasal-doctor/diseases/early-blight',
    priority: 'high',
    timeToImplement: '1-3 days',
    potentialBenefit: 'Prevent 30% crop loss'
  },
  {
    id: 3,
    title: 'Input Recommendation',
    description: 'Your soil report indicates low Nitrogen. Consider applying urea within the next week.',
    icon: '🌱',
    category: 'input',
    action: 'Shop Fertilizers',
    link: '/bazaar-bridge/inputs/fertilizers',
    priority: 'medium',
    timeToImplement: '1 week',
    potentialBenefit: '+15% yield'
  },
  {
    id: 4,
    title: 'Irrigation Schedule',
    description: 'Based on soil moisture sensors, your wheat field needs irrigation in the next 2 days.',
    icon: '💧',
    category: 'advisory',
    action: 'View Irrigation Plan',
    link: '/farm-manager/irrigation',
    priority: 'high',
    timeToImplement: '2 days',
    potentialBenefit: 'Optimal growth'
  },
  {
    id: 5,
    title: 'Equipment Maintenance',
    description: 'Your tractor is due for regular maintenance. Schedule a service to avoid harvest delays.',
    icon: '🚜',
    category: 'advisory',
    action: 'Find Service Centers',
    link: '/resources/equipment-service',
    priority: 'low',
    timeToImplement: '2 weeks',
    potentialBenefit: 'Prevent breakdowns'
  },
  {
    id: 6,
    title: 'Crop Rotation Plan',
    description: 'Consider planting legumes in Field 3 next season to improve soil nitrogen levels naturally.',
    icon: '🔄',
    category: 'advisory',
    action: 'View Rotation Plans',
    link: '/farm-manager/crop-rotation',
    priority: 'medium',
    timeToImplement: '3-4 months',
    potentialBenefit: 'Improved soil health'
  },
  {
    id: 7,
    title: 'Bulk Purchase Opportunity',
    description: 'Cooperative society is organizing bulk purchase of seeds. Register before 15th to get 12% discount.',
    icon: '🛍️',
    category: 'input',
    action: 'Register Now',
    link: '/bazaar-bridge/bulk-purchase',
    priority: 'medium',
    timeToImplement: '1 week',
    potentialBenefit: 'Save ₹1,200 on inputs'
  },
]

// Financial data
export const financialData = [
  { month: 'Jan', income: 15000, expenses: 8000 },
  { month: 'Feb', income: 12000, expenses: 7500 },
  { month: 'Mar', income: 8000, expenses: 6000 },
  { month: 'Apr', income: 5000, expenses: 4500 },
  { month: 'May', income: 20000, expenses: 9000 },
  { month: 'Jun', income: 18000, expenses: 8500 },
]

// Farm statistics data
export const farmStatData = {
  cropYield: [
    { year: '2020', yield: 18 },
    { year: '2021', yield: 22 },
    { year: '2022', yield: 26 },
    { year: '2023', yield: 30 },
  ],
  waterUsage: [
    { month: 'Jan', usage: 120 },
    { month: 'Feb', usage: 140 },
    { month: 'Mar', usage: 160 },
    { month: 'Apr', usage: 180 },
    { month: 'May', usage: 200 },
    { month: 'Jun', usage: 220 },
  ],
  soilHealth: {
    nitrogen: 65,
    phosphorus: 45,
    potassium: 80,
    organic: 55,
  }
}

// Community data
export const communityData = [
  {
    id: 1,
    name: 'Sonipat Kisan Sangathan',
    members: 124,
    activity: 'High',
    events: 3,
    icon: '👨‍🌾',
  },
  {
    id: 2,
    name: 'Haryana Wheat Growers',
    members: 89,
    activity: 'Medium',
    events: 1,
    icon: '🌾',
  },
  {
    id: 3,
    name: 'Organic Farming Group',
    members: 56,
    activity: 'High',
    events: 2,
    icon: '🌱',
  },
]