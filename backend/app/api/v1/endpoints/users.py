from fastapi import APIRouter, Depends, HTTPException 
from fastapi.responses import JSONResponse
from sqlmodel import select 
from sqlmodel.ext.asyncio.session import AsyncSession 
from sqlalchemy.exc import IntegrityError 

from app.db.models.user import User 
from app.db.session import get_session 
from app.utils.api_models import ApiResponse, ApiError 

router = APIRouter() 

@router.post("/test-create-user", response_model=ApiResponse[User], status_code=201)
async def test_create_user(session: AsyncSession = Depends(get_session)):
    test_user = User(
        email = "test@example.com",
        password="test"
    )

    try:
        session.add(test_user)
        await session.commit() 
        await session.refresh(test_user)
        return ApiResponse(
            status_code=201, 
            data = test_user,
            message="Test user created successfully"
        )
    except IntegrityError:
        await session.rollback()
        # Corrected method: use session.execute()
        existing_user_result = await session.execute(select(User).where(User.email == test_user.email))
        # Corrected attribute: use scalar_one_or_none()
        existing_user = existing_user_result.scalar_one_or_none()
        error_response = ApiError(
            status_code=409,
            message=f"User with email {test_user.email} already exists"
        )
        return JSONResponse(
            status_code=error_response.status_code,
            content=error_response.model_dump()
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