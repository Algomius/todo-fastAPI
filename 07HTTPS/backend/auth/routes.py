from fastapi import APIRouter, Depends, HTTPException, Cookie, Response, Request
from sqlalchemy.orm import Session
from db.database import get_db
from schemas.utilisateurCreation import UtilisateurCreation
from schemas.utilisateurInfo import UtilisateurInfo
from schemas.demandeRefreshToken import DemandeRefreshToken
from models.utilisateur import Utilisateur, Role
from .hashing import hash_password, verify_password
from .jwt import create_access_token, create_refresh_token, decode_refresh_token, decode_access_token

router = APIRouter()

@router.post("/register/")
def register(user: UtilisateurCreation, db: Session = Depends(get_db)):
    user.motDePasse = hash_password(user.motDePasse)
    db_user = Utilisateur(pseudonyme = user.pseudonyme,
                email = user.email,
                motDePasse= user.motDePasse,
                role = Role.utilisateur)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return {"message": "Utilisateur créé", "pseudonyme" : db_user.pseudonyme}

@router.post("/login/")
def login(user: UtilisateurInfo, response : Response, db: Session = Depends(get_db)):
    db_user = db.query(Utilisateur).filter(Utilisateur.pseudonyme == user.pseudonyme).first()
    if not db_user or not verify_password(user.motDePasse, db_user.motDePasse):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"sub": str(db_user.id), "type": "access"})
    refresh_token = create_refresh_token({"sub": str(db_user.id), "type": "refresh"})

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,  
        samesite="None"
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="None"
    )

    return {"message": "Connecté !"}

@router.post("/refresh/")
def refresh_token(request : Request, response : Response, db: Session = Depends(get_db)):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=401, detail="Refresh token invalide")
    payload = decode_refresh_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Refresh token invalide")
    id_user = payload["sub"]
    db_user = db.query(Utilisateur).filter(Utilisateur.id == id_user).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Utilisateur inconnu")

    access_token = create_access_token({"sub":str(db_user.id), "type": "access"})
    refresh_token = create_refresh_token({"sub":str(db_user.id), "type": "refresh"})

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=True,
        samesite="None"
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="None"
    )

    return {"message": "Connecté !"}

@router.get("/me/")
def get_me( access_token: str = Cookie(None)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Non connecté")
    try:
        payload = decode_access_token(access_token)
        return {"username": payload["sub"]}
    except Exception:
        raise HTTPException(status_code=401, detail="Token invalide")
    
@router.post("/logout/")
def logout(response: Response):
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "Logged out"}