from fastapi import FastAPI 
from fastapi.requests import Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from app.utils.api_models import ApiError
from app.api.v1.endpoints import healthcheck, weather

app = FastAPI() 

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.exception_handler(Exception)
async def global_exception_handler(request:Request, exc: Exception):
    error = ApiError(
        status_code=500,
        message=str(exc)
    )

app.include_router(healthcheck, prefix="/api/v1")
app.include_router(weather.router, prefix="/api/v1")

@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("weather.html", {"request": request})