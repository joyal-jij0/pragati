from pydantic import BaseModel 
from typing import Dict 

class DetectionResponse(BaseModel): 
    class_counts: Dict[str, int] 