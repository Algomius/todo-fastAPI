from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas.tachecreation import TacheCreation
from schemas.tachemiseajour import TacheMiseajour
from schemas.tacheSortie import TacheSortie
from models.utilisateur import Utilisateur
from db.database import get_db
from sqlalchemy.orm import Session
import crud.tache
from auth.depedencies import get_current_user
from auth.routes import router as auth_router

app = FastAPI(title="API de gestion des tâches", 
              description=
              """
                Cette application permet de :
                - Lister les tâches
                - Récupérer les détails d'une tâche
                - Ajouter une tâche
                - Mettre à jour une tâche
                - Supprimer une tâche
              """)

app.include_router(auth_router, prefix="/auth", tags=["auth"])

origins = [
    "http://localhost:3000",  # React
    "http://127.0.0.1:5500",  # fichier HTML ouvert directement
    "*"                       #  '*' pour autoriser tous les fronts (dev seulement)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # quelles origines sont autorisées
    allow_credentials=True,
    allow_methods=["*"],          # GET, POST, PUT, DELETE etc.
    allow_headers=["*"],          # autoriser tous les headers
)

@app.get("/taches/", response_model=list[TacheSortie])
def getAllTache(current_user : Utilisateur = Depends(get_current_user), db : Session = Depends(get_db)):
    try: 
        db_tache = crud.tache.getTaches(current_user, db)
    except Exception:
        raise HTTPException(status_code=500, detail="Erreur interne")
    return db_tache

@app.get("/taches/{tache_id}", response_model=TacheSortie)
def getTache(tache_id : int, current_user : Utilisateur = Depends(get_current_user), db : Session = Depends(get_db)):
    try:
        db_tache = crud.tache.getTache(tache_id, current_user, db)
    except Exception:
        raise HTTPException(status_code=500, detail="Erreur interne")
    if not db_tache:
        raise HTTPException(status_code=404, detail="Tâche non trouvée")
    return db_tache

@app.post("/taches/", response_model=TacheSortie)
def createTache(t : TacheCreation, current_user : Utilisateur = Depends(get_current_user), db : Session = Depends(get_db)):
    try:
        db_tache = crud.tache.createTache(t, current_user, db)
    except Exception:
        raise HTTPException(status_code=500, detail="Erreur interne")
    return db_tache

@app.put("/taches/{tache_id}", response_model=TacheSortie)
def updateTache(tache_id : int, t : TacheMiseajour, current_user : Utilisateur = Depends(get_current_user), db : Session = Depends(get_db)):
    try:
        db_tache = crud.tache.updateTache(tache_id, t,current_user, db)
    except Exception:
        raise HTTPException(status_code=500, detail="Erreur interne")
    if not db_tache:
        raise HTTPException(status_code=404, detail="Tâche non trouvée")
    return db_tache

@app.delete("/taches/{tache_id}")
def deleteTache(tache_id : int, current_user : Utilisateur = Depends(get_current_user), db : Session = Depends(get_db)):
    try:
        deleted = crud.tache.deleteTache(tache_id, current_user,db)
    except Exception:
        raise HTTPException(status_code=500, detail="Erreur interne")
    if not deleted:
        raise HTTPException(status_code=404, detail="Tâche non trouvée")
    return {"message": "La tache a été supprimée avec succès", "id": tache_id}