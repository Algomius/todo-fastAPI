from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
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
    id_utilisateur = Column(Integer, ForeignKey("utilisateur.id"))

    proprio = relationship("Utilisateur", back_populates="taches")
