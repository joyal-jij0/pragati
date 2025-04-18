from fastapi import HTTPException, status
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.exc import IntegrityError

from app.db.models.user import User
from app.schemas.user import UserCreateRequest, LoginRequest
from app.core.security import get_password_hash, verify_password

async def get_user_by_email(session: AsyncSession, email: str) -> User | None:
    """Fetches a user by email."""
    result = await session.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()

async def create_user(session: AsyncSession, user_in: UserCreateRequest) -> User:
    """Creates a new user in the database."""
    existing_user = await get_user_by_email(session, user_in.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"User with email {user_in.email} already exists"
        )

    hashed_password = get_password_hash(user_in.password)
    new_user = User(
        email=user_in.email,
        password=hashed_password
    )

    try:
        session.add(new_user)
        await session.commit()
        await session.refresh(new_user)
        return new_user
    except IntegrityError as e: # Catch potential race conditions if check fails
        await session.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"User with email {user_in.email} already exists (race condition)."
        ) from e
    except Exception as e:
        await session.rollback()
        # Log the error e
        print(f"Error creating user: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred during user creation."
        ) from e


async def authenticate_user(session: AsyncSession, login_data: LoginRequest) -> User | None:
    """Authenticates a user based on email and password."""
    user = await get_user_by_email(session, login_data.email)
    if not user:
        return None
    if not verify_password(login_data.password, user.password):
        return None
    return user

async def get_user_by_id(session: AsyncSession, user_id: int) -> User | None:
    """Fetches a user by ID."""
    result = await session.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()
