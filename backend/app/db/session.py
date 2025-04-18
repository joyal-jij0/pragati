from sqlmodel import SQLModel 
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession 
from sqlalchemy.orm import sessionmaker 
from app.core.config import DATABASE_URL 
from typing import AsyncIterator 

engine = create_async_engine(DATABASE_URL, echo=True, future=True, connect_args={"ssl": "require"})

AsyncSessionLocal = sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False 
)

async def create_db_and_tables():
    async with engine.begin() as conn: 
        from app.db import models 
        await conn.run_sync(SQLModel.metadata.create_all)

async def get_session() -> AsyncIterator[AsyncSession]:
    async_session = AsyncSessionLocal() 
    try: 
        yield async_session
    finally:
        await async_session.close()
