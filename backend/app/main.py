import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import weather

# Configure logging
logging.basicConfig(
    level=logging.DEBUG,  # Set to DEBUG to see detailed logs
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Pragati Backend API",
    description="Backend API for the Pragati platform, providing weather and other services.",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(weather, prefix="/api/v1/weather", tags=["weather"])

@app.on_event("startup")
async def startup_event():
    logger.info("Starting up Pragati Backend API...")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down Pragati Backend API...")