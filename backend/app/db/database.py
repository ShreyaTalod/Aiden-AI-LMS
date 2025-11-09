# app/db/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# 🟢 Your PostgreSQL connection URL
DATABASE_URL = "postgresql+psycopg2://aiden_user:aiden123@localhost:5432/aiden_ai"

# 🧩 SQLAlchemy setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ✅ Declarative Base (for models)
Base = declarative_base()


def get_db():
    from sqlalchemy.orm import Session
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_db_and_tables():
    import app.models.user_model
    import app.models.leave_model
    Base.metadata.create_all(bind=engine)

