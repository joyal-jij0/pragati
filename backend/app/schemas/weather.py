from typing import Optional, List
from pydantic import BaseModel, Field

class Condition(BaseModel):
    text: Optional[str] = None
    icon: Optional[str] = None

class Astro(BaseModel):
    sunrise: Optional[str] = None
    sunset: Optional[str] = None

class Hour(BaseModel):
    time_epoch: Optional[int] = None
    time: Optional[str] = None
    temp_c: Optional[float] = None
    is_day: Optional[int] = None
    condition: Optional[Condition] = None
    wind_kph: Optional[float] = None
    humidity: Optional[float] = None
    precip_mm: Optional[float] = None
    feelslike_c: Optional[float] = None
    uv: Optional[float] = None

class Day(BaseModel):
    maxtemp_c: Optional[float] = None
    mintemp_c: Optional[float] = None
    avgtemp_c: Optional[float] = None
    condition: Optional[Condition] = None
    daily_chance_of_rain: Optional[float] = None
    totalprecip_mm: Optional[float] = None
    maxwind_kph: Optional[float] = None
    avghumidity: Optional[float] = None
    uv: Optional[float] = None

class ForecastDay(BaseModel):
    date: Optional[str] = None
    date_epoch: Optional[int] = None
    day: Optional[Day] = None
    astro: Optional[Astro] = None
    hour: Optional[List[Hour]] = None

class Forecast(BaseModel):
    forecastday: Optional[List[ForecastDay]] = None

class CurrentWeather(BaseModel):
    last_updated_epoch: Optional[int] = None
    last_updated: Optional[str] = None
    temp_c: Optional[float] = None
    feelslike_c: Optional[float] = None
    condition: Optional[Condition] = None
    wind_kph: Optional[float] = None
    wind_dir: Optional[float] = None
    humidity: Optional[float] = None
    precip_mm: Optional[float] = None
    uv: Optional[float] = None
    temp_f: Optional[float] = None
    feelslike_f: Optional[float] = None

class WeatherResponse(BaseModel):
    location: str = Field(..., alias='resolvedAddress')
    current: CurrentWeather
    forecast: Forecast

    class Config:
        validate_by_name = True  # Updated for Pydantic V2