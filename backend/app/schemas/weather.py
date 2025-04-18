from pydantic import BaseModel

class WeatherResponse(BaseModel):
    location: str
    current: dict
    forecast: list