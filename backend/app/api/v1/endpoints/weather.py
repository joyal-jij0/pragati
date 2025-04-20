from fastapi import APIRouter, HTTPException
from app.services.weather_service import fetch_weather_data
from app.schemas.weather import WeatherResponse
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/", response_model=WeatherResponse)
async def get_weather(location: str):
    """
    Fetch weather data for a given location.

    Args:
        location (str): The location to fetch weather data for (e.g., "Delhi").

    Returns:
        WeatherResponse: The weather data in the defined schema.

    Raises:
        HTTPException: If the request fails or the location is invalid.
    """
    logger.info(f"Received request for weather data: location='{location}'")
    try:
        weather_data = await fetch_weather_data(location)
        logger.debug(f"Returning weather data for '{location}'")
        return weather_data
    except HTTPException as e:
        logger.warning(f"HTTPException: Status={e.status_code}, Detail={e.detail}")
        raise e
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))