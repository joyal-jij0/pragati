from pydantic import BaseModel, HttpUrl 
from typing import List, Optional 

class Scheme(BaseModel):
    name: str
    description: str
    eligibility: str
    requiredDocuments: List[str]
    forms: Optional[str] = None
    applicationProcess: str
    helpline: Optional[str] = None
    tracking: Optional[str] = None
    url: Optional[HttpUrl] = None

class SchemesResponse(BaseModel):
    schemes: List[Scheme]