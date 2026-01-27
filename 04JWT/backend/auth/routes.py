from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from schemas.utilisateurCreation import UtilisateurCreation
from schemas.utilisateurInfo import UtilisateurInfo
from models.utilisateur import Utilisateur
from .hashing import hash_password, verify_password
from .jwt import create_access_token

router = APIRouter()

@router.post("/register")
def register(user: UtilisateurCreation, db: Session = Depends(get_db)):
    user.motDePasse = hash_password(user.motDePasse)
    db_user = Utilisateur(pseudonyme = user.pseudonyme,
                email = user.email,
                motDePasse=user.motDePasse)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "Utilisateur créé"}

@router.post("/login")
def login(user: UtilisateurInfo, db: Session = Depends(get_db)):
    db_user = db.query(Utilisateur).filter(Utilisateur.pseudonyme == user.pseudonyme).first()
    if not db_user or not verify_password(user.motDePasse, db_user.motDePasse):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": str(db_user.id)})
    return {"access_token": token, "token_type": "bearer"}