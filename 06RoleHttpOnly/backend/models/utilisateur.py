from sqlalchemy import Column, Integer, String, Enum
import enum
from sqlalchemy.orm import relationship
from db.database import Base

class Role(str, enum.Enum):
    administrateur = "administrateur"
    utilisateur = "utilisateur"

class Utilisateur(Base):
    __tablename__ = "utilisateur"

    id = Column(Integer, primary_key=True, index=True)
    pseudonyme = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    motDePasse = Column(String, nullable=False)
    role = Column(Enum(Role), default=Role.utilisateur)

    taches = relationship("Tache", back_populates="proprio")