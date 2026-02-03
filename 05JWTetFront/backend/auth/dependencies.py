from fastapi import Depends, HTTPException, Security
from fastapi.security.api_key import APIKeyHeader
from sqlalchemy.orm import Session
from db.database import get_db
from models.utilisateur import Utilisateur
from .jwt import decode_access_token

api_key_header = APIKeyHeader(name="Authorization")

def get_current_user(token: str = Security(api_key_header), db: Session = Depends(get_db)) -> Utilisateur:
    #if token.startswith("Bearer "):
    #    token = token[7:]
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")

    user_id = payload.get("sub")
    user = db.query(Utilisateur).filter(Utilisateur.id == int(user_id)).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user