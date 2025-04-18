from fastapi import FastAPI 
from app.api.v1.endpoints import healthcheck 

app = FastAPI() 

app.include_router(healthcheck, prefix="/api/v1")