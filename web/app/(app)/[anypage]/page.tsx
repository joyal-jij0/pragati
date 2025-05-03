import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChevronDownIcon } from 'lucide-react'

export default function Page() {
  return (
    // <Card className="relative overflow-hidden bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white border-green-400/20">
    //   {/* Decorative elements */}
    //   <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-2xl"></div>
    //   <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-green-300/10 rounded-full blur-2xl"></div>

    //   {/* Animated plant decorations */}
    //   <div className="absolute bottom-0 right-0 text-7xl opacity-20">🌾</div>
    //   <div className="absolute top-0 left-20 text-4xl opacity-20">🌱</div>

    //   {/* Subtle pattern overlay */}
    //   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 mix-blend-overlay"></div>

    //   <CardContent className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center p-6">
    //     <div>
    //       <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
    //         <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-green-100">
    //           'Hello, farmerName!'
    //         </span>
    //         <span>👋</span>
    //       </h1>

    //       <p className="text-green-100 max-w-xl font-light">
    //         Welcome to your farm dashboard. Here's everything you need to know
    //         about your crops, weather, and market today.
    //       </p>
    //     </div>

    //     <div className="mt-4 md:mt-0 flex items-center bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300">
    //       <div className="mr-3 text-4xl">{'todayWeather.icon'}</div>
    //       <div>
    //         <p className="text-xs text-green-100 uppercase tracking-wider font-semibold">
    //           Today's Weather
    //         </p>
    //         {/* <p className="text-xl font-semibold">
    //           {todayWeather.temp}°C |{' '}
    //           {todayWeather.rainfall > 0
    //             ? 'Rain'
    //             : todayWeather.humidity > 60
    //             ? 'Cloudy'
    //             : 'Sunny'}
    //         </p> */}
    //         <div className="flex items-center gap-3 mt-1 text-xs text-green-100">
    //           <span className="flex items-center gap-1">
    //             <span className="w-2 h-2 rounded-full bg-blue-300"></span>
    //             Humidity: {'todayWeather.humidity'}%
    //           </span>
    //           <span className="flex items-center gap-1">
    //             <span className="w-2 h-2 rounded-full bg-blue-400"></span>
    //             Rainfall: {'todayWeather.rainfall'}mm
    //           </span>
    //         </div>
    //       </div>
    //     </div>
    //   </CardContent>
    // </Card>

    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"></div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 rounded-xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center justify-between gap-x-2">
                  <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                    ⚠️
                  </div>
                  <h3 className="text-lg font-medium text-red-600">
                    Alerts & Advisories
                  </h3>
                </div>
                <Badge
                  variant="outline"
                  className="rounded-full bg-red-100 text-red-600 border-red-200"
                >
                  🔔 2 Alerts
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </div>

        <div className="bg-muted/50 rounded-xl">
          <div className="col-span-12 md:col-span-3 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                  ⚠️
                </div>
                <h3 className="text-lg font-medium text-red-600">
                  Alerts & Advisories
                </h3>
              </div>
              <div className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                2 Alerts
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <button className="px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                All
              </button>
              <button className="px-4 py-1 bg-white border border-red-200 text-gray-600 rounded-full text-sm flex items-center gap-1">
                High<span className="h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="px-4 py-1 bg-white border border-yellow-200 text-gray-600 rounded-full text-sm flex items-center gap-1">
                Medium
                <span className="h-2 w-2 bg-yellow-500 rounded-full"></span>
              </button>
              <button className="px-4 py-1 bg-white border border-green-200 text-gray-600 rounded-full text-sm flex items-center gap-1">
                Low<span className="h-2 w-2 bg-green-500 rounded-full"></span>
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">
                      💧
                    </div>
                    <h4 className="text-sm font-medium">Irrigation Alert</h4>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-700 border-yellow-200"
                  >
                    Medium
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-gray-600">
                  अगले 3 दिनों तक सिंचाई नहीं करनी है। पूर्व की वर्षा को ध्यान
                  में रखें।
                </p>
                <p className="mt-1 text-xs text-gray-500 italic">
                  No rain for next 3 days. Irrigate wheat.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">2 hours ago</span>
                  <button className="text-xs text-red-600 flex items-center gap-0.5">
                    View Details <ChevronDownIcon className="h-3 w-3" />
                  </button>
                </div>
              </div>

              <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                      🐛
                    </div>
                    <h4 className="text-sm font-medium">Pest Alert</h4>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-red-100 text-red-700 border-red-200"
                  >
                    High
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-gray-600">
                  धान की फसल में भूरा फुदका का संक्रमण देखा गया है। निरीक्षण
                  करें।
                </p>
                <p className="mt-1 text-xs text-gray-500 italic">
                  Brown planthopper infestation observed in rice. Inspect your
                  crop.
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">1 day ago</span>
                  <button className="text-xs text-red-600 flex items-center gap-0.5">
                    View Details <ChevronDownIcon className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
