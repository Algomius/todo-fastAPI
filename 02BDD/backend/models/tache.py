from sqlalchemy import Column, Integer, String, Date, Enum
from db.database import Base
import enum

class EtatEnum(enum.Enum):
    AFAIRE = "A faire"
    ENCOURS = "En cours"
    TERMINE = "Terminé"

class Tache(Base):
    __tablename__ = "tache"

    id = Column(Integer, primary_key=True, index=True)
    titre = Column(String)
    description = Column(String)
    etat = Column(String)
    dateEch = Column(Date)
    dateCre = Column(Date)
    dateMaj = Column(Date)
