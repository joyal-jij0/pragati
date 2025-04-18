from fastapi import APIRouter, Depends, HTTPException, status 
from fastapi.responses import JSONResponse
from sqlmodel import select 
from sqlmodel.ext.asyncio.session import AsyncSession 
from sqlalchemy.exc import IntegrityError 
from datetime import datetime

from app.db.models.user import User 
from app.db.session import get_session 
from app.utils.api_models import ApiResponse, ApiError 

from app.core.security import get_password_hash, create_access_token, create_refresh_token, verify_password, verify_refresh_token
from app.schemas.token import Token , RefreshTokenRequest
from app.api.v1.dependencies import get_current_active_user

from pydantic import BaseModel, EmailStr

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

router = APIRouter() 

@router.post("/register", response_model=ApiResponse[UserCreateResponse], status_code=status.HTTP_201_CREATED)
async def register_user(
    user_in: UserCreateRequest, 
    session: AsyncSession = Depends(get_session)):
    email = user_in.email
    plain_password = user_in.password
    
    existing_user_result = await session.execute(select(User).where(User.email == email))
    if existing_user_result.scalar_one_or_none():
        error_response = ApiError(
            status_code=status.HTTP_409_CONFLICT,
            message = f"User with email {email} already exists"
        )
        return JSONResponse(
            status_code=error_response.status_code,
            content=error_response.model_dump()
        )
    
    hashed_password = get_password_hash(plain_password) 
    
    new_user = User(
        email=email ,
        password=hashed_password
    )

    try:
        session.add(new_user)
        await session.commit() 
        await session.refresh(new_user)

        access_token = create_access_token(subject=new_user.id)
        refresh_token = create_refresh_token(subject=new_user.id)
        
        token_data = Token(access_token=access_token, refresh_token=refresh_token) 
        user_public_data = UserPublic(id=new_user.id, email=new_user.email, createdAt=new_user.createdAt)
        response_data = UserCreateResponse(user=user_public_data, tokens=token_data) 

        return ApiResponse(
            status_code=status.HTTP_201_CREATED,
            data = response_data,
            message="User registered successfully"
        )

    except Exception as e: 
        await session.rollback() 
        print(f"An unexpected error occurred: {e}") 
        error_response = ApiError(
            status_code=500,
            message="An unexpected error occurred during user creation"
        )
        return JSONResponse(
            status_code=error_response.status_code,
            content=error_response.model_dump()
        )
    
@router.post("/login", response_model=ApiResponse[Token])
async def login_for_access_token(
    form_data: User, 
    session: AsyncSession = Depends(get_session)
    ):
    user_result = await session.execute(select(User).where(User.email == form_data.email)) 
    user = user_result.scalar_one_or_none() 

    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    access_token = create_access_token(subject=user.id) 
    refresh_token = create_refresh_token(subject=user.id) 

    token_data = Token(access_token=access_token, refresh_token=refresh_token) 
    return ApiResponse(status_code=status.HTTP_200_OK, data=token_data, message="Login successful") 

@router.post("/refresh", response_model=ApiResponse[Token])
async def refresh_access_token(
    refresh_request: RefreshTokenRequest,
    session: AsyncSession = Depends(get_session)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate refresh token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token_data = verify_refresh_token(refresh_request.refresh_token, credentials_exception)

        # Fetch user based on refresh token subject
        user_result = await session.execute(select(User).where(User.id == int(token_data.sub)))
        user = user_result.scalar_one_or_none()

        if not user:
            raise credentials_exception
        
        new_access_token = create_access_token(subject=user.id)
        new_refresh_token = create_refresh_token(subject=user.id) 

        new_token_data = Token(access_token=new_access_token, refresh_token=new_refresh_token)
        return ApiResponse(status_code=status.HTTP_200_OK, data=new_token_data, message="Token refreshed successfully")

    except HTTPException as http_exc:
        raise http_exc 
    except Exception as e:
        print(f"Error refreshing token: {e}") 
        raise credentials_exception