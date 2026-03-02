from pydantic import BaseModel, Field
from datetime import date
from schemas.etat import Etat

class TacheCreation(BaseModel):
    titre : str = Field(min_length=1)
    description : str = Field(min_length=1)
    etat : Etat
    dateEch : date
    dateCre : date = date.today()
    dateMaj : date = date.today()