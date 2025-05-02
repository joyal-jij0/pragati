from fastapi import APIRouter, File, UploadFile, HTTPException, status
from app.services.pest_detect_service import PredictService 
from app.schemas.pest_detect import PestResposne 

router = APIRouter() 

@router.post("/", status_code=status.HTTP_202_ACCEPTED) 
async def detect_pest(file: UploadFile = File(...)):
    content = await file.read() 
    try: 
        pest_name = PredictService.predict(content) 
        return PestResposne(pest=pest_name) 
    except Exception as e: 
        raise HTTPException(status_code=500, detail=str(e))
