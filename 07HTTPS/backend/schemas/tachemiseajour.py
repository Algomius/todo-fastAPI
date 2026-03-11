from pydantic import BaseModel, Field
from datetime import date
from schemas.etat import Etat

class TacheMiseajour(BaseModel):
    titre : str = None
    description : str = None
    etat : Etat = None
    dateEch : date = None
    dateMaj : date = date.today()