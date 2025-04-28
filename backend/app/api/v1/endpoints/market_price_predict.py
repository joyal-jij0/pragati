from fastapi import APIRouter, HTTPException, status 
from fastapi.responses import JSONResponse 
from app.schemas.market_price import MarketPriceInput
from app.services.market_price_service import predict_market_price

router = APIRouter() 

@router.get("/", status_code=status.HTTP_202_ACCEPTED)
async def predict_price(input_data: MarketPriceInput):
    
    try:
        predicted_price = predict_market_price(input_data)
        return JSONResponse(
            status_code=status.HTTP_202_ACCEPTED,
            content={"predicted_price": predicted_price}
        )
    except RuntimeError as e:
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction failed: {e}") 
    