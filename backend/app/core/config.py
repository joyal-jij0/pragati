# app/core/config.py
print("DEBUG: Starting config.py execution") 
import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
print("DEBUG: Imports successful in config.py")

try:
    dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
    print(f"DEBUG: Attempting to load .env from: {dotenv_path}") 
    loaded = load_dotenv(dotenv_path=dotenv_path, verbose=True) 
    print(f"DEBUG: python-dotenv load_dotenv result: {loaded}") 
    if not loaded:
        print(f"DEBUG: .env file not found or not loaded at path: {dotenv_path}")
except Exception as e:
    print(f"ERROR: Exception during load_dotenv: {e}") 


print("DEBUG: Defining Settings class") 
class Settings(BaseSettings):
    PROJECT_NAME: str = "Weather App API"
    API_V1_STR: str = "/api/v1"

    DATABASE_URL: str | None = os.getenv("DATABASE_URL")
    
    ACCESS_TOKEN_SECRET: str = os.getenv("ACCESS_TOKEN_SECRET", "your_access_secret")
    REFRESH_TOKEN_SECRET: str = os.getenv("REFRESH_TOKEN_SECRET", "your_refresh_secret")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRY_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRY_MINUTES", "30"))
    REFRESH_TOKEN_EXPIRE_DAYS: int = int(os.getenv("REFRESH_TOKEN_EXPIRY_DAYS", "7"))

    WEATHER_API_KEY: str | None = os.getenv("WEATHER_API_KEY")

    class Config:
        case_sensitive = True

print("DEBUG: Settings class defined") 



settings = None 
try:
    print("DEBUG: Attempting to instantiate Settings()") 
    settings = Settings()
    print("DEBUG: Settings() instantiated successfully.") 

    if settings and not settings.WEATHER_API_KEY:
        print("WARNING: WEATHER_API_KEY is not set in the application settings!")
    elif settings:
         print(f"DEBUG: settings.WEATHER_API_KEY value: '{settings.WEATHER_API_KEY}'")
except Exception as e:
     print(f"ERROR: Exception during Settings() instantiation: {e}") 


if settings is None:
    print("CRITICAL ERROR: 'settings' object could not be created in config.py.")
else:
     print("DEBUG: Finished config.py execution successfully.") 

DATABASE_URL = os.getenv("DATABASE_URL")
ACCESS_TOKEN_SECRET = os.getenv("ACCESS_TOKEN_SECRET", "your_access_secret")
REFRESH_TOKEN_SECRET = os.getenv("REFRESH_TOKEN_SECRET", "your_refresh_secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRY_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRY_MINUTES", "30"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRY_DAYS", "7"))
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")