from pydantic import BaseModel 
from typing import List, Optional, Dict, Any

class PestResposne(BaseModel): 
    pest: str 
    data: Optional[Dict[str, Any]] 
    images: Optional[List[str]] 
    