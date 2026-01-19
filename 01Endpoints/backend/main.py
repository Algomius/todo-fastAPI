from fastapi import FastAPI
from schemas.tache import Tache

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
        summary="Récupère toutes les tâches",
        description="On récupère ici toutes les tâches de la base de données",
        response_description="Liste des tâches au format JSON")

def getTaches():
    return {"message" : "Tu va récupérer la liste de toutes les tâches"}

@app.get("/taches/{id}")
def getTache(tache_id : int): 
    return {"tache_id": tache_id, "titre": f"Tache {tache_id}"}

@app.post("/taches/")
def createTache(tache : Tache):
    return {"id":1, "tache":tache}

@app.put("/taches/{id}")
def updateTache(tache : Tache):
    return {"id":1, "tache":tache}

@app.delete("/taches/{id}")
def deleteTache(tache_id : int): 
    return {"tache_id": tache_id, "titre": f"Tache {tache_id}"}

