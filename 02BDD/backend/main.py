from fastapi import FastAPI, Depends, HTTPException
from schemas.tachecreation import TacheCreation
from schemas.tachemiseajour import TacheMiseajour
from db.database import SessionLocal
from sqlalchemy.orm import Session
import crud.tache

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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

@app.get("/taches/",
         summary="Récupérer toutes les tâches",
         description="Toutes les tâche de la BDD se retrouve dans un JSON",
         response_description="Liste de toutes les tâche au format JSON")
def getAllTache(db : Session = Depends(get_db)):
    return crud.tache.getTaches(db)

@app.get("/taches/{tache_id}")
def getTache(tache_id : int, db : Session = Depends(get_db)):
    db_tache = crud.tache.getTache(tache_id, db)
    if not db_tache:
        raise HTTPException(status_code=404, detail="Tâche non trouvée")
    return db_tache

@app.post("/taches/")
def createTache(t : TacheCreation, db : Session = Depends(get_db)):
    try:
        db_tache = crud.tache.createTache(t, db)
        return db_tache
    except Exception:
        raise HTTPException(status_code=500, detail="Erreur interne")

@app.put("/taches/{tache_id}")
def updateTache(tache_id : int, t : TacheMiseajour, db : Session = Depends(get_db)):
    try:
        db_tache = crud.tache.updateTache(tache_id, t, db)
    except Exception:
        raise HTTPException(status_code=500, detail="Erreur interne")
    if not db_tache:
        raise HTTPException(status_code=404, detail="Tâche non trouvée")
    return db_tache

@app.delete("/taches/{tache_id}")
def deleteTache(tache_id : int, db : Session = Depends(get_db)):
    try:
        deleted = crud.tache.deleteTache(tache_id, db)
    except Exception:
        raise HTTPException(status_code=500, detail="Erreur interne")
    if not deleted:
        raise HTTPException(status_code=404, detail="Tâche non trouvée")

