from sqlalchemy import Column, Integer, String, Date
from db.database import Base

class Tache(Base):
    __tablename__ = "tache"

    id = Column(Integer, primary_key=True, index=True)
    titre = Column(String)
    description = Column(String)
    etat = Column(String)
    dateEch = Column(Date)
    dateCre = Column(Date)
    dateMaj = Column(Date)
