from fastapi import APIRouter 
from app.schemas.healthcheck import HealthCheckResponse 
from app.services.healthcheck_service import get_health_status

router = APIRouter() 

@router.get('/healthcheck', response_model=HealthCheckResponse)
def healthcheck():
    return get_health_status()

