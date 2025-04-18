from fastapi import APIRouter 
from app.schemas.healthcheck import HealthCheckResponse 
from app.services.healthcheck_service import get_health_status
from app.utils.api_models import ApiResponse

router = APIRouter() 

@router.get('/healthcheck', response_model=ApiResponse[HealthCheckResponse])
def healthcheck():
    data = get_health_status()
    return ApiResponse(
        status_code=200,
        data = HealthCheckResponse(**data)
    ).to_response()

