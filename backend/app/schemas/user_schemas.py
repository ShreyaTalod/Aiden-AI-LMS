# app/schemas/user_schemas.py

from pydantic import BaseModel, EmailStr
from enum import Enum

class UserRole(str, Enum):
    manager = "manager"
    employee = "employee"

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: UserRole

class UserLogin(BaseModel):
    email: EmailStr
    password: str
