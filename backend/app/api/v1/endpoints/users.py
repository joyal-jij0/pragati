from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from sqlmodel.ext.asyncio.session import AsyncSession

from app.schemas.user import (
    UserCreateRequest,
    UserPublic,
    UserCreateResponse,
    LoginRequest
)
from app.schemas.token import Token, RefreshTokenRequest, TokenPayload 

from app.services import user_service

from app.db.session import get_session
from app.utils.api_models import ApiResponse, ApiError
from app.core.security import (
    create_access_token,
    create_refresh_token,
    verify_refresh_token
)

from app.api.v1.dependencies import get_current_active_user
from app.db.models.user import User

router = APIRouter()

@router.post("/register", response_model=ApiResponse[UserCreateResponse], status_code=status.HTTP_201_CREATED)
async def register_user(
    user_in: UserCreateRequest,
    session: AsyncSession = Depends(get_session)
):
    try:
        new_user = await user_service.create_user(session=session, user_in=user_in)

        access_token = create_access_token(subject=new_user.id)
        refresh_token = create_refresh_token(subject=new_user.id)

        token_data = Token(access_token=access_token, refresh_token=refresh_token)
        user_public_data = UserPublic(id=new_user.id, email=new_user.email, createdAt=new_user.createdAt)
        response_data = UserCreateResponse(user=user_public_data, tokens=token_data)

        return ApiResponse(
            status_code=status.HTTP_201_CREATED,
            data=response_data,
            message="User registered successfully"
        )
    except HTTPException as http_exc:
        error_response = ApiError(
            status_code=http_exc.status_code,
            message=http_exc.detail
        )
        return JSONResponse(
            status_code=error_response.status_code,
            content=error_response.model_dump()
        )
    except Exception as e: 
        print(f"Unexpected error in register endpoint: {e}")
        error_response = ApiError(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            message="An unexpected server error occurred."
        )
        return JSONResponse(
            status_code=error_response.status_code,
            content=error_response.model_dump()
        )


@router.post("/login", response_model=ApiResponse[Token])
async def login_for_access_token(
    form_data: LoginRequest,
    session: AsyncSession = Depends(get_session)
):
    user = await user_service.authenticate_user(session=session, login_data=form_data)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
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
        token_data: TokenPayload = verify_refresh_token(refresh_request.refresh_token, credentials_exception)

        user = await user_service.get_user_by_id(session=session, user_id=int(token_data.sub))

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


@router.get("/me", response_model=ApiResponse[UserPublic]) 
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    user_public_data = UserPublic(id=current_user.id, email=current_user.email, createdAt=current_user.createdAt)
    return ApiResponse(status_code=status.HTTP_200_OK, data=user_public_data)

## Testing comment sdf sdfds asdfsad kjhk sdfgsd