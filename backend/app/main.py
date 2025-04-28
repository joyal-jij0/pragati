import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.requests import Request

from contextlib import asynccontextmanager 

from app.utils.api_models import ApiError
from app.db.session import create_db_and_tables
from app.api.v1.endpoints import healthcheck, users, weather, market_price_predict, disease_detect

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,  # Set to DEBUG to see detailed logs
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app:FastAPI):
    logger.info("Starting up Pragati Backend API....")
    print("Creating database tables") 
    await create_db_and_tables()
    print("Database tables created") 
    yield 
    logger.info("Shutting down Pragati Backend API")
    print("Shutting down...") 

app = FastAPI(
    title="Pragati Backend API",
    description="Backend API for the Pragati platform, providing weather and other services.",
    version="1.0.0",
    lifespan=lifespan
)

@app.exception_handler(Exception)
async def global_exception_handler(request:Request, exc:Exception):
    error = ApiError(
        status_code=500,
        message=str(exc)
    )
    return error.to_response()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(healthcheck, prefix="/api/v1", tags=["Health"])
app.include_router(users, prefix="/api/v1/users", tags=["Users"])
app.include_router(weather, prefix="/api/v1/weather", tags=["Weather"])
app.include_router(market_price_predict, prefix="/api/v1/market-price", tags=["Market-Price"])
app.include_router(disease_detect, prefix="/api/v1/disease-detect", tags=["Disease-Detect"])