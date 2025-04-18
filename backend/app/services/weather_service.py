import httpx
from fastapi import HTTPException, status
from app.schemas.weather import WeatherResponse
from app.core.config import WEATHER_API_KEY

BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline"

async def fetch_weather_data(location: str) -> WeatherResponse:

    if not WEATHER_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Weather API key is not configured."
        )
    
    url = f"{BASE_URL}/{location}?unitGroup=us&key={WEATHER_API_KEY}&contentType=json"
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url)
            response.raise_for_status() 

            data = response.json()

            if 'resolvedAddress' not in data or 'currentConditions' not in data or 'days' not in data:
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail="Unexpected response format from weather API."
                )

            return WeatherResponse(
                location=data.get('resolvedAddress', ''),
                current=data.get('currentConditions', {}),
                forecast=data.get('days', [])[:7]  # Get 7 days forecast
            )
        
        except httpx.HTTPStatusError as http_err:
            if http_err.response.status_code == 404 or http_err.response.status_code == 400: # 400 can mean invalid location
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Weather data not found for location: {location}"
                ) from http_err
            
            else:
                print(f"HTTP error fetching weather: {http_err}")
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail="Error communicating with the weather service."
                ) from http_err

        except httpx.RequestError as req_err:
            print(f"Request error fetching weather: {req_err}")
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Could not connect to the weather service."
            ) from req_err

        except Exception as e:
            print(f"Unexpected error fetching weather: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="An internal error occurred while fetching weather data."
            ) from e