from fastapi import FastAPI, Depends
from fastapi.requests import Request
from app.utils.api_models import ApiError
from app.api.v1.endpoints import healthcheck 

app = FastAPI() 

@app.exception_handler(Exception)
async def global_exception_handler(request:Request, exc: Exception):
    error = ApiError(
        status_code=500,
        message=str(exc)
    )
    return error.to_response()

app.include_router(healthcheck, prefix="/api/v1")