from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from schemas.utilisateurCreation import UtilisateurCreation
from schemas.utilisateurInfo import UtilisateurInfo
from schemas.demandeRefreshToken import DemandeRefreshToken
from models.utilisateur import Utilisateur
from .hashing import hash_password, verify_password
from .jwt import create_access_token, create_refresh_token, decode_refresh_token

router = APIRouter()

@router.post("/register/")
def register(user: UtilisateurCreation, db: Session = Depends(get_db)):
    user.motDePasse = hash_password(user.motDePasse)
    db_user = Utilisateur(pseudonyme = user.pseudonyme,
                email = user.email,
                motDePasse= user.motDePasse)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "Utilisateur créé", "pseudonyme" : db_user.pseudonyme}

@router.post("/login/")
def login(user: UtilisateurInfo, db: Session = Depends(get_db)):
    db_user = db.query(Utilisateur).filter(Utilisateur.pseudonyme == user.pseudonyme).first()
    if not db_user or not verify_password(user.motDePasse, db_user.motDePasse):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"sub": str(db_user.id), "type": "access"})
    refresh_token = create_refresh_token({"sub": str(db_user.id), "type": "refresh"})
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}

@router.post("/refresh/")
def refresh_token(data : DemandeRefreshToken, db: Session = Depends(get_db)):
    refresh_token = data.refresh_token
    payload = decode_refresh_token(refresh_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Refresh token invalide")
    
    id_user = payload["sub"]
    db_user = db.query(Utilisateur).filter(Utilisateur.id == id_user).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Utilisateur inconnu")

    access_token = create_access_token({"sub":str(db_user.id), "type": "access"})
    refresh_token = create_refresh_token({"sub":str(db_user.id), "type": "refresh"})
    return {"access_token" : access_token, "refresh_token" : refresh_token, "token_type": "bearer"}
