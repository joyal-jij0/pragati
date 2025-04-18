from fastapi import FastAPI, Depends
from fastapi.requests import Request
from contextlib import asynccontextmanager
from sqlmodel.ext.asyncio.session import AsyncSession

from app.utils.api_models import ApiError
from app.db.session import create_db_and_tables
from app.api.v1.endpoints import healthcheck, users


@asynccontextmanager
async def lifespan(app:FastAPI):
    print("Creating database tables...") 
    await create_db_and_tables() 
    print("Database tables created.") 
    yield 
    print("Shutting down...") 

app = FastAPI(lifespan=lifespan) 

@app.exception_handler(Exception)
async def global_exception_handler(request:Request, exc: Exception):
    error = ApiError(
        status_code=500,
        message=str(exc)
    )
    return error.to_response()

app.include_router(healthcheck, prefix="/api/v1")
app.include_router(users, prefix="/api/v1")
