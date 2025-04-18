import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

ACCESS_TOKEN_SECRET = os.getenv("ACCESS_TOKEN_SECRET", "your_access_secret")
REFRESH_TOKEN_SECRET = os.getenv("REFRESH_TOKEN_SECRET", "your_refresh_secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRY_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRY_MINUTES"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRY_DAYS"))

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable not set")

if ACCESS_TOKEN_SECRET == "your_access_secret":
    print("WARNING: Using default ACCESS_TOKEN_SECRET. Please set a strong key in your environment.")

if REFRESH_TOKEN_SECRET == "your_refresh_secret":
    print("WARNING: Using default REFRESH_TOKEN_SECRET. Please set a strong key in your environment.")

if not WEATHER_API_KEY:
    raise ValueError("WEATHER_API_KEY environment variable not set")
