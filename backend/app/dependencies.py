# backend/app/dependencies.py
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlmodel import Session, select

from app.db.database import get_session
from app.db.models import User
from app.schemas import TokenData

# These should be secure in env/config
SECRET_KEY = "REPLACE_ME_WITH_A_VERY_SECRET_KEY"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


def decode_access_token(token: str) -> Optional[TokenData]:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        role: str | None = payload.get("role")
        if email is None:
            return None
        return TokenData(email=email, role=role)
    except JWTError:
        return None


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_session),
):
    """
    Dependency to extract the current user from a JWT access token.
    Raises 401 on failure.
    """
    token_data = decode_access_token(token)
    if not token_data or not token_data.email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    statement = select(User).where(User.email == token_data.email)
    user = db.exec(statement).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    if not user.is_active:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Inactive user")

    return user
