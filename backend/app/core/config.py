# app/core/config.py
print("DEBUG: Starting config.py execution") # Debug print
import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv
print("DEBUG: Imports successful in config.py") # Debug print

# --- Load .env file ---
try:
    # Assumes .env is in the 'backend' directory, two levels above 'app/core'
    # backend/
    # |- app/
    # |  |- core/
    # |  |  |- config.py  <-- __file__ is here
    # |- .env
    dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
    print(f"DEBUG: Attempting to load .env from: {dotenv_path}") # Debug print
    loaded = load_dotenv(dotenv_path=dotenv_path, verbose=True) # Add verbose=True for more info
    print(f"DEBUG: python-dotenv load_dotenv result: {loaded}") # Debug print
    if not loaded:
        print(f"DEBUG: .env file not found or not loaded at path: {dotenv_path}")
except Exception as e:
    print(f"ERROR: Exception during load_dotenv: {e}") # Debug print

# --- Define Settings Class ---
print("DEBUG: Defining Settings class") # Debug print
class Settings(BaseSettings):
    PROJECT_NAME: str = "Weather App API"
    API_V1_STR: str = "/api/v1"

    # Database settings (preserved from original)
    DATABASE_URL: str | None = os.getenv("DATABASE_URL")
    
    # Token settings (preserved from original)
    ACCESS_TOKEN_SECRET: str = os.getenv("ACCESS_TOKEN_SECRET", "your_access_secret")
    REFRESH_TOKEN_SECRET: str = os.getenv("REFRESH_TOKEN_SECRET", "your_refresh_secret")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRY_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRY_MINUTES", "30"))
    REFRESH_TOKEN_EXPIRE_DAYS: int = int(os.getenv("REFRESH_TOKEN_EXPIRY_DAYS", "7"))

    # Visual Crossing API Key - Loaded from .env or environment
    WEATHER_API_KEY: str | None = os.getenv("WEATHER_API_KEY")
    # Check the value immediately after os.getenv
    print(f"DEBUG: Value of WEATHER_API_KEY from os.getenv: '{os.getenv('WEATHER_API_KEY')}'") # Debug print

    class Config:
        case_sensitive = True
        # If you prefer pydantic-settings to handle .env loading directly:
        # env_file = dotenv_path # Use the calculated path
        # env_file_encoding = 'utf-8'
print("DEBUG: Settings class defined") # Debug print


# --- Instantiate Settings ---
settings = None # Initialize to None for safety
try:
    print("DEBUG: Attempting to instantiate Settings()") # Debug print
    settings = Settings()
    print("DEBUG: Settings() instantiated successfully.") # Debug print
    # Basic check after instantiation
    if settings and not settings.WEATHER_API_KEY:
        print("WARNING: WEATHER_API_KEY is not set in the application settings!")
    elif settings:
         print(f"DEBUG: settings.WEATHER_API_KEY value: '{settings.WEATHER_API_KEY}'")
except Exception as e:
     print(f"ERROR: Exception during Settings() instantiation: {e}") # Debug print
     # Keep settings as None if instantiation fails


# --- Final Check ---
if settings is None:
    print("CRITICAL ERROR: 'settings' object could not be created in config.py.")
else:
     print("DEBUG: Finished config.py execution successfully.") # Debug print

# Fallback for backward compatibility
DATABASE_URL = os.getenv("DATABASE_URL")
ACCESS_TOKEN_SECRET = os.getenv("ACCESS_TOKEN_SECRET", "your_access_secret")
REFRESH_TOKEN_SECRET = os.getenv("REFRESH_TOKEN_SECRET", "your_refresh_secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRY_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRY_MINUTES", "30"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRY_DAYS", "7"))
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")