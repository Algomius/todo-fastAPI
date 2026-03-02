from pydantic import BaseModel, EmailStr

class UtilisateurInfo(BaseModel):
    pseudonyme : str = None
    motDePasse : str = None