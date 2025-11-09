# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import create_db_and_tables
from app.api.routers import auth, leaves  # your routers

app = FastAPI(
    title="Aiden AI Backend",
    version="1.0",
    description="Backend for Aiden AI Leave Management System"
)

# ✅ FIXED: CORS now supports both localhost and 127.0.0.1 for Vite
# ✅ CORS Setup — final working configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # frontend dev server
        "http://127.0.0.1:5173",  # alternate localhost
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.on_event("startup")
def on_startup():
    print("🔹 Creating database tables (if not exist)...")
    create_db_and_tables()

@app.get("/")
def root():
    return {"message": "Welcome to Aiden AI Backend!"}

@app.get("/ping")
def ping():
    return {"message": "Aiden AI Backend is running successfully!"}

# ✅ Register your routers
app.include_router(auth.router, prefix="/api", tags=["Authentication"])
app.include_router(leaves.router, prefix="/api", tags=["Leaves"])


