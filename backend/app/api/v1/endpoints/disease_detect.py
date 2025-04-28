from fastapi import APIRouter, UploadFile, File, HTTPException, status 
from app.schemas.disease_detect import DetectionResponse 
from app.services.disease_detect_service import detect_image 
from app.utils.helpers import save_upload_file 

router = APIRouter() 

@router.post("/", status_code=status.HTTP_202_ACCEPTED)
async def detect(file: UploadFile = File(...)):
    
    try: 
        path = await save_upload_file(file) 
    except HTTPException as he: 
        raise he 
    
    try:
        counts = detect_image(path) 
    except Exception as e: 
        raise HTTPException(status_code=500, detail=str(e)) 
    
    return DetectionResponse(class_counts=counts) 