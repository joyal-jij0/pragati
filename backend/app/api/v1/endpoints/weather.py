from fastapi import APIRouter, status
from app.schemas.weather import WeatherResponse
from app.services import weather_service 
from app.utils.api_models import ApiResponse

router = APIRouter()

@router.get("/weather/{location}", response_model=ApiResponse[WeatherResponse])
async def get_weather(location: str):
    weather_data = await weather_service.fetch_weather_data(location)

    return ApiResponse(
        status_code=status.HTTP_200_OK,
        data=weather_data,
        message="Weather data retrieved successfully"
    )