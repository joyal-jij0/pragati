from pydantic import BaseModel, EmailStr 
from datetime import datetime 
from app.schemas.token import Token

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserCreateRequest(BaseModel):
    email: EmailStr
    password: str 

class UserPublic(BaseModel): 
    id: int 
    email: EmailStr
    createdAt: datetime

class UserCreateResponse(BaseModel): 
    user: UserPublic
    tokens: Token