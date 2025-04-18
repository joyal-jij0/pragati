from fastapi import Depends, HTTPException, status 
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials 
from sqlmodel import select 
from sqlmodel.ext.asyncio.session import AsyncSession 

from app.core.security import verify_access_token 
from app.db.session import get_session 
from app.db.models.user import User 
from app.schemas.token import TokenPayload 

resuable_oauth2 = HTTPBearer(
    scheme_name="Authorization"
)

async def get_current_user(
        session: AsyncSession = Depends(get_session), token: HTTPAuthorizationCredentials = Depends(resuable_oauth2)
) -> User: 
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail = "Could not validate credentials", 
        headers={"WWW-Authenticate": "Bearer"},
    )

    token_data = verify_access_token(token.credentials, credentials_exception) 

    user_result = await session.execute(select(User).where(User.id == int(token_data.sub)))
    user = user_result.scalar_one_or_none() 

    if user is None: 
        raise credentials_exception 
    return user 

async def get_current_active_user( 
        current_user: User = Depends(get_current_user),
) -> User: 
    return current_user