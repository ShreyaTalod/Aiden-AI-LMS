from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.user_model import User
from app.schemas.user_schemas import UserCreate, UserLogin
from app.utils.hashing import hash_password, verify_password
from app.utils.token import create_access_token

router = APIRouter(tags=["Authentication"])

# ✅ Register
@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = hash_password(user.password)
    new_user = User(
        username=user.name,
        email=user.email,
        hashed_password=hashed_pw,
        role=user.role,
        is_active=True,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token({"sub": new_user.email})

    # ✅ Return username at top level for frontend consistency
    return {
        "message": "User registered successfully",
        "token": token,
        "username": new_user.username,
        "email": new_user.email,
        "role": new_user.role,
    }

# ✅ Login
@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": db_user.email})

    # ✅ Flatten response for frontend
    return {
        "message": f"Welcome back, {db_user.username}!",
        "token": token,
        "username": db_user.username,
        "email": db_user.email,
        "role": db_user.role,
    }

# ✅ Get User by Email (used by dashboards)
@router.get("/user/{email}")
def get_user_by_email(email: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "username": user.username,
        "email": user.email,
        "role": user.role
    }
