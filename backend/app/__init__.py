# backend/app/schemas/__init__.py
from typing import Optional
from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: Optional[str] = None


class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None

