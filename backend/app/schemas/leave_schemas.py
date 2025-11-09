from pydantic import BaseModel
from datetime import date, datetime

class LeaveRequestCreate(BaseModel):
    employee_name: str
    email: str
    reason: str
    from_date: date
    to_date: date

class LeaveRequestResponse(BaseModel):
    id: str
    employee_name: str
    email: str
    reason: str
    from_date: date
    to_date: date
    status: str
    created_at: datetime  # ✅ include created_at in response

    class Config:
        orm_mode = True

