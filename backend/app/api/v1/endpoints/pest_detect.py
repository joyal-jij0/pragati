from fastapi import APIRouter, File, UploadFile, HTTPException, status
from app.services.pest_detect_service import PredictService 
from app.schemas.pest_detect import PestResposne 
from app.utils.pests import pests 
from app.utils.pest_name import pest_name

router = APIRouter() 

@router.post("/", status_code=status.HTTP_202_ACCEPTED) 
async def detect_pest(file: UploadFile = File(...)):
    content = await file.read() 
    try: 
        pest_name_pred, pest_data, images = PredictService.get_pest_info(content) 

        return PestResposne(
            pest=pest_name_pred,
            data = pest_data, 
            images=images
            ) 

    except Exception as e: 
        raise HTTPException(status_code=500, detail=str(e))
