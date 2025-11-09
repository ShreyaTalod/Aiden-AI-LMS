from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
import uuid

# 🧩 User table: For both Manager & Employee
class User(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: str = Field(unique=True)
    hashed_password: str
    role: str = Field(default="employee")  # 'manager' or 'employee'
    is_active: bool = Field(default=True)

    # relationship with leave requests
    #leave_requests: List["LeaveRequest"] = Relationship(back_populates="employee")

