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
         summary="Récupérer toutes les tâches",
         description="Toutes les tâche de la BDD se retrouve dans un JSON",
         response_description="Liste de toutes les tâche au format JSON")
def getAllTache():
    return {"message" :"Fonction qui va récupérer toutes les tâches"}

@app.get("/taches/{tache_id}")
def getTache(tache_id : int):
    return {"message" : f"Récupération des infos de la tache {tache_id}"}

@app.post("/taches/")
def createTache(t : Tache):
    return {"message" : "Tache recue", "tache" : t}

@app.put("/taches/{tache_id}")
def updateTache(tache_id : int, t : Tache):
    return {"message" : f"Je vais modifier la tache {tache_id}", "nouvelleValeur": t}

@app.delete("/taches/{tache_id}")
def deleteTache(tache_id : int):
    return {"message" : f"Je vais supprimer la tache {tache_id}"}

