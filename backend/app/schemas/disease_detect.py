from pydantic import BaseModel 
from typing import Dict, Any

class DetectionResponse(BaseModel): 
    class_counts: Dict[str, int] 
    llm_response: Any