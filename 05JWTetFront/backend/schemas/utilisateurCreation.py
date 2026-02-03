from pydantic import BaseModel, EmailStr

class UtilisateurCreation(BaseModel):
    pseudonyme : str = None
    email : EmailStr = None
    motDePasse : str = None