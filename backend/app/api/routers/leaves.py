# app/api/routers/leaves.py

from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.leave_model import LeaveRequest
from app.schemas.leave_schemas import LeaveRequestCreate, LeaveRequestResponse
import uuid
from datetime import datetime

router = APIRouter(tags=["Leaves"])

# ✅ Create a leave request (Employee)
@router.post("/leave-request", response_model=LeaveRequestResponse)
def create_leave_request(request: LeaveRequestCreate, db: Session = Depends(get_db)):
    try:
        new_leave = LeaveRequest(
            id=str(uuid.uuid4()),
            employee_name=request.employee_name,
            email=request.email,
            reason=request.reason,
            from_date=request.from_date,
            to_date=request.to_date,
            status="Pending",
            created_at=datetime.utcnow(),  # ✅ Timestamp when request created
        )
        db.add(new_leave)
        db.commit()
        db.refresh(new_leave)
        print(f"✅ Leave request created for {request.employee_name} ({request.email})")
        return new_leave
    except Exception as e:
        db.rollback()
        print("❌ Error saving leave request:", e)
        raise HTTPException(status_code=500, detail="Error creating leave request")

# ✅ Get all leave requests (Manager Dashboard)
@router.get("/leave-requests", response_model=list[LeaveRequestResponse])
def get_all_requests(db: Session = Depends(get_db)):
    try:
        leaves = db.query(LeaveRequest).order_by(LeaveRequest.created_at.desc()).all()
        print(f"✅ Retrieved {len(leaves)} total leave requests")
        return leaves
    except Exception as e:
        print("❌ Error fetching all requests:", e)
        raise HTTPException(status_code=500, detail="Error fetching leave requests")

# ✅ Get leave requests for a specific employee
@router.get("/leave-requests/{email}", response_model=list[LeaveRequestResponse])
def get_requests_for_employee(email: str, db: Session = Depends(get_db)):
    try:
        employee_requests = (
            db.query(LeaveRequest)
            .filter(LeaveRequest.email == email)
            .order_by(LeaveRequest.created_at.desc())
            .all()
        )
        print(f"✅ Retrieved {len(employee_requests)} requests for {email}")
        return employee_requests
    except Exception as e:
        print("❌ Error fetching employee leaves:", e)
        raise HTTPException(status_code=500, detail="Error fetching leave requests")

# ✅ Manager approves or rejects a leave
@router.put("/leave-request/{leave_id}")
def update_leave_status(
    leave_id: str,
    db: Session = Depends(get_db),
    payload: dict = Body(...),  # JSON body
):
    try:
        print(f"📩 Incoming update request for leave ID {leave_id}: {payload}")
        status = payload.get("status")

        if not status:
            raise HTTPException(status_code=400, detail="Status is required")
        if status not in ["Approved", "Rejected"]:
            raise HTTPException(status_code=400, detail="Invalid status value")

        leave = db.query(LeaveRequest).filter(LeaveRequest.id == leave_id).first()
        if not leave:
            raise HTTPException(status_code=404, detail="Leave not found")

        leave.status = status
        db.commit()
        db.refresh(leave)

        print(f"✅ Leave {leave_id} updated to {status}")
        return {"message": f"Leave {status.lower()} successfully!"}

    except Exception as e:
        print("❌ Error updating leave status:", e)
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error updating leave status: {e}")
