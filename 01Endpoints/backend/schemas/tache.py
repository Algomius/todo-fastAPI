from enum import Enum
from pydantic import BaseModel, Field

class Etat(str, Enum):
    AFAIRE = "A faire"
    ENCOURS = "En Cours"
    TERMINE = "Terminée"

class Tache(BaseModel):
    titre : str = Field(min_length=1)
    description : str = Field(min_length=1)
    etat : Etat


