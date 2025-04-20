import aiohttp
import logging
from fastapi import HTTPException
from app.core.config import settings
from app.schemas.weather import WeatherResponse, CurrentWeather, Forecast, ForecastDay, Hour, Day, Condition, Astro

logger = logging.getLogger(__name__)

async def fetch_weather_data(location: str) -> WeatherResponse:
    """
    Fetch weather data from the Visual Crossing Weather API for a given location.

    Args:
        location (str): The location to fetch weather data for (e.g., "Delhi").

    Returns:
        WeatherResponse: Parsed and structured weather data.

    Raises:
        HTTPException: If the API request fails or data parsing fails.
    """
    if not location or location.strip() == "":
        logger.warning("Received empty or invalid location")
        raise HTTPException(status_code=400, detail="Location cannot be empty")

    # Construct the API URL
    api_key = settings.WEATHER_API_KEY
    if not api_key:
        logger.error("Weather API key is not configured")
        raise HTTPException(status_code=500, detail="Weather API key is not configured")

    base_url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline"
    url = f"{base_url}/{location}?key={api_key}&unitGroup=metric&include=days,hours,current"
    logger.info(f"Fetching weather data for '{location}' from {url}")

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, timeout=10) as response:
                if response.status != 200:
                    logger.error(f"API request failed with status {response.status}: {await response.text()}")
                    raise HTTPException(
                        status_code=response.status,
                        detail=f"Weather API request failed with status {response.status}"
                    )

                data = await response.json()
                logger.debug(f"Raw API response: {data}")

                # Map Visual Crossing response to WeatherResponse schema
                try:
                    # Map currentConditions to CurrentWeather
                    current_conditions = data.get('currentConditions', {})
                    current_weather = CurrentWeather(
                        last_updated=current_conditions.get('datetime'),
                        last_updated_epoch=current_conditions.get('datetimeEpoch'),
                        temp_c=current_conditions.get('temp'),
                        feelslike_c=current_conditions.get('feelslike'),
                        condition=Condition(
                            text=current_conditions.get('conditions'),
                            icon=current_conditions.get('icon')
                        ),
                        wind_kph=float(current_conditions.get('windspeed', 0)) * 3.6,  # Convert mph to kph
                        wind_dir=current_conditions.get('winddir'),
                        humidity=current_conditions.get('humidity'),
                        precip_mm=current_conditions.get('precip'),
                        uv=current_conditions.get('uvindex'),
                        temp_f=current_conditions.get('temp') * 9/5 + 32 if current_conditions.get('temp') else None,
                        feelslike_f=current_conditions.get('feelslike') * 9/5 + 32 if current_conditions.get('feelslike') else None
                    )

                    # Map days to Forecast.forecastday
                    forecast_days = []
                    for day_data in data.get('days', []):
                        # Map hourly data
                        hours = [
                            Hour(
                                time_epoch=hour.get('datetimeEpoch'),
                                time=hour.get('datetime'),
                                temp_c=hour.get('temp'),
                                is_day=1 if hour.get('icon').endswith('-day') else 0,
                                condition=Condition(
                                    text=hour.get('conditions'),
                                    icon=hour.get('icon')
                                ),
                                wind_kph=float(hour.get('windspeed', 0)) * 3.6,
                                humidity=hour.get('humidity'),
                                precip_mm=hour.get('precip'),
                                feelslike_c=hour.get('feelslike'),
                                uv=hour.get('uvindex')
                            )
                            for hour in day_data.get('hours', [])
                        ]

                        # Map day data
                        day = Day(
                            maxtemp_c=day_data.get('tempmax'),
                            mintemp_c=day_data.get('tempmin'),
                            avgtemp_c=day_data.get('temp'),
                            condition=Condition(
                                text=day_data.get('conditions'),
                                icon=day_data.get('icon')
                            ),
                            daily_chance_of_rain=day_data.get('precipprob'),
                            totalprecip_mm=day_data.get('precip'),
                            maxwind_kph=float(day_data.get('windspeed', 0)) * 3.6,
                            avghumidity=day_data.get('humidity'),
                            uv=day_data.get('uvindex')
                        )

                        # Map astro data
                        astro = Astro(
                            sunrise=day_data.get('sunrise'),
                            sunset=day_data.get('sunset')
                        )

                        forecast_day = ForecastDay(
                            date=day_data.get('datetime'),
                            date_epoch=day_data.get('datetimeEpoch'),
                            day=day,
                            astro=astro,
                            hour=hours
                        )
                        forecast_days.append(forecast_day)

                    forecast = Forecast(forecastday=forecast_days)

                    # Create WeatherResponse
                    weather_response = WeatherResponse(
                        resolvedAddress=data.get('resolvedAddress', location),
                        current=current_weather,
                        forecast=forecast
                    )

                    logger.debug(f"Processed WeatherResponse: {weather_response.dict()}")
                    return weather_response

                except Exception as e:
                    logger.error(f"Failed to parse weather data: {str(e)}")
                    raise HTTPException(
                        status_code=500,
                        detail=f"Failed to process weather data structure for {location}: {str(e)}"
                    )

    except aiohttp.ClientError as e:
        logger.error(f"Network error while fetching weather data for '{location}': {str(e)}")
        raise HTTPException(status_code=503, detail=f"Weather service unavailable: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error while fetching weather data for '{location}': {str(e)}")
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")