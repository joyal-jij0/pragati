from datetime import datetime, timedelta, timezone
from typing import Any, Union

from jose import jwt, JWTError
from passlib.context import CryptContext

from app.core.config import (
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRY_MINUTES,
    REFRESH_TOKEN_EXPIRE_DAYS
)

from app.schemas.token import TokenPayload

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(subject: Union[str, Any], expires_delta: timedelta | None = None) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + \
            timedelta(minutes=ACCESS_TOKEN_EXPIRY_MINUTES)
        to_encode = {"exp": expire, "sub": str(
            subject), "token_type": "access"}
        encoded_jwt = jwt.encode(
            to_encode, ACCESS_TOKEN_SECRET, algorithm=ALGORITHM)
        return encoded_jwt


def create_refresh_token(subject: Union[str, Any], expires_delta: timedelta | None = None) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + \
            timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS) 
        to_encode = {"exp": expire, "sub": str(subject), "token_type": "refresh"} 
        encoded_jwt = jwt.encode(to_encode, REFRESH_TOKEN_SECRET, algorithm=ALGORITHM) 
        return encoded_jwt 

def verify_access_token(token: str, credentials_exception: Exception) -> TokenPayload: 
    try: 
        payload = jwt.decode(token, ACCESS_TOKEN_SECRET, algorithms=[ALGORITHM]) 
        if payload.get("token_type") != "refresh": 
            raise credentials_exception
        token_data = TokenPayload(**payload) 
        
        if token_data.sub is None: 
            raise credentials_exception 
    
    except JWTError: 
        raise credentials_exception 
    
    return token_data

def verify_refresh_token(token: str, credentials_exception: Exception) -> TokenPayload:
    try:
        # Use REFRESH_TOKEN_SECRET_KEY
        payload = jwt.decode(token, REFRESH_TOKEN_SECRET, algorithms=[ALGORITHM])
        if payload.get("token_type") != "refresh": # Verify token type
             raise credentials_exception
        token_data = TokenPayload(**payload)
        if token_data.sub is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return token_data
