from sqlmodel import SQLModel, Field 
from typing import Optional 
from datetime import datetime 

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True) 
    password: str 
    createdAt: datetime = Field(default_factory=datetime.now, nullable=False)
    accessToken: Optional[str] = Field(default=None) 
    refreshToken: Optional[str] = Field(default=None) 