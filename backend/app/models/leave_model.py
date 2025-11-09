from sqlalchemy import Column, String, Date, DateTime
from app.db.database import Base
from datetime import datetime

class LeaveRequest(Base):
    __tablename__ = "leaverequest"

    id = Column(String, primary_key=True, index=True)
    employee_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    reason = Column(String, nullable=False)
    from_date = Column(Date, nullable=False)
    to_date = Column(Date, nullable=False)
    status = Column(String, default="Pending")
    created_at = Column(DateTime, default=datetime.utcnow)
