from fastapi import APIRouter, HTTPException
import requests
from typing import Optional
from pydantic import BaseModel

router = APIRouter()

API_KEY = "MM67VSRYJ8KN3Z88YXJUQS27D"
BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline"

class WeatherResponse(BaseModel):
    location: str
    current: dict
    forecast: list

@router.get("/weather/{location}")
async def get_weather(location: str):
    try:
        url = f"{BASE_URL}/{location}?unitGroup=us&key={API_KEY}&contentType=json"
        response = requests.get(url)
        
        if response.status_code != 200:
            raise HTTPException(status_code=404, detail="Location not found")
            
        data = response.json()
        
        return WeatherResponse(
            location=data.get('resolvedAddress', ''),
            current=data.get('currentConditions', {}),
            forecast=data.get('days', [])[:7]  # Get 7 days forecast
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))