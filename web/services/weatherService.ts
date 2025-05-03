import axios from 'axios';

// --- TypeScript Interfaces ---
// These MUST exactly match the structure defined in backend's app/schemas/weather.py

export interface Condition {
  text?: string | null; // Allow null for safety
  icon?: string | null;
}

export interface Astro {
  sunrise?: string | null;
  sunset?: string | null;
}

export interface Hour {
  time_epoch?: number | null;
  time?: string | null;
  temp_c?: number | null;
  is_day?: number | null;
  condition?: Condition | null;
  wind_kph?: number | null;
  humidity?: number | null;
  precip_mm?: number | null;
  feelslike_c?: number | null;
  uv?: number | null;
}

export interface Day {
  maxtemp_c?: number | null;
  mintemp_c?: number | null;
  avgtemp_c?: number | null;
  condition?: Condition | null;
  daily_chance_of_rain?: number | null;
  totalprecip_mm?: number | null;
  maxwind_kph?: number | null;
  avghumidity?: number | null;
  uv?: number | null;
}

export interface ForecastDay {
  date?: string | null;
  date_epoch?: number | null;
  day?: Day | null;
  astro?: Astro | null;
  hour?: Hour[] | null; // Allow null array
}

export interface Forecast {
  forecastday?: ForecastDay[] | null; // Allow null array
}

export interface CurrentWeather {
  last_updated_epoch?: number | null;
  last_updated?: string | null;
  temp_c?: number | null;
  feelslike_c?: number | null;
  condition?: Condition | null;
  wind_kph?: number | null;
  wind_dir?: string | null; // Expecting direction string or degrees as string
  humidity?: number | null;
  precip_mm?: number | null;
  uv?: number | null;
  temp_f?: number | null;
  feelslike_f?: number | null;
}

// Main data structure received from the backend
export interface WeatherData {
  resolvedAddress: string; // Matches backend's 'resolvedAddress' field
  current: CurrentWeather;
  forecast: Forecast;
}

// --- API Service ---

// Use environment variable for backend URL (especially in production)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const WEATHER_ENDPOINT = `${API_BASE_URL}/api/v1/weather`;

export const getWeatherData = async (location: string): Promise<WeatherData> => {
  if (!location || location.trim().length === 0) {
    throw new Error("Location cannot be empty.");
  }

  console.log(`Frontend Service: Fetching weather for '${location}' from ${WEATHER_ENDPOINT}`);

  try {
    const response = await axios.get(WEATHER_ENDPOINT, {
      params: { location: location.trim() }, // Send trimmed location as query parameter
      timeout: 10000 // Set a timeout (e.g., 10 seconds)
    });

    console.log(`Frontend Service: Received response status ${response.status}`);
    console.log(`Frontend Service: Raw response data:`, JSON.stringify(response.data, null, 2));

    // Force parse response.data to ensure it's a plain object
    const parsedData = JSON.parse(JSON.stringify(response.data));
    console.log(`Frontend Service: Parsed data:`, JSON.stringify(parsedData, null, 2));

    // Basic validation of the parsed data
    if (!parsedData) {
      console.error("Frontend Service: Parsed data is null or undefined:", parsedData);
      throw new Error("Received invalid data format from the weather API.");
    }

    // Transform to WeatherData
    const transformedData: WeatherData = {
      resolvedAddress: parsedData.resolvedAddress,
      current: parsedData.current,
      forecast: parsedData.forecast
    };

    // Check for required fields
    if (!transformedData.resolvedAddress || typeof transformedData.resolvedAddress !== 'string') {
      console.error("Frontend Service: Missing or invalid 'resolvedAddress' field:", transformedData);
      throw new Error("Response missing valid 'resolvedAddress' field.");
    }

    if (!transformedData.current || typeof transformedData.current !== 'object' || transformedData.current === null) {
      console.error("Frontend Service: Missing or invalid 'current' field:", transformedData);
      throw new Error("Response missing valid 'current' weather data.");
    }

    if (!transformedData.forecast || typeof transformedData.forecast !== 'object' || transformedData.forecast === null) {
      console.error("Frontend Service: Missing or invalid 'forecast' field:", transformedData);
      throw new Error("Response missing valid 'forecast' data.");
    }

    console.log("Frontend Service: Successfully received and validated weather data for", transformedData.resolvedAddress);
    return transformedData;

  } catch (error) {
    console.error('Frontend Service: Error fetching weather data:', error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const responseData = error.response?.data;
      let message = `Failed to fetch weather data for '${location}'.`;

      if (status === 400) {
        message = responseData?.message || `Invalid location or request for '${location}'. Please check the name.`;
      } else if (status === 404) {
        message = responseData?.message || `Weather API endpoint not found. Please check if the backend server is running and the endpoint is correct.`;
      } else if (status === 500 || status === 502 || status === 503) {
        message = responseData?.message || 'The weather service is temporarily unavailable or experiencing issues. Please try again later.';
      } else if (error.code === 'ECONNABORTED') {
        message = 'The request to the weather service timed out. Please try again.';
      }
      console.error(`API Error Details: Status=${status}, Response=${JSON.stringify(responseData)}`);
      throw new Error(message);
    } else if (error instanceof Error) {
      throw new Error(`An unexpected error occurred: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while fetching weather data.');
    }
  }
};