from pydantic import BaseModel 
from datetime import date 

class MarketPriceInput(BaseModel):
    date: date
    state: str
    district: str 
    market: str
    commodity: str 
    variety: str
    grade: str

