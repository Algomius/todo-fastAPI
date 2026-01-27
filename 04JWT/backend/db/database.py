from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

DATABASE_URL = "postgresql+psycopg2://apitacheuser:motDePasse@localhost:5432/apitache?client_encoding=utf8"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

