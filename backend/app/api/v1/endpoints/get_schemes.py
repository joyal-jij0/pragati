from fastapi import APIRouter, HTTPException, status 
from app.services.schemes import get_schemes 
from app.schemas.scheme import SchemesResponse

router = APIRouter() 

@router.get("/", response_model=SchemesResponse, status_code=status.HTTP_202_ACCEPTED) 
async def get_schemes_enpoint(): 
    try: 
        schemes = get_schemes() 
    except Exception as e : 
        raise HTTPException(status_code=500, detail=str(e)) 
    
    return schemes