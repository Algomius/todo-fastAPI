from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from schemas.tachecreation import TacheCreation
from models.utilisateur import Utilisateur
from models.tache import Tache

def createTache(tache : TacheCreation, current_user : Utilisateur, db : Session):
    try:
        db_tache = Tache(titre = tache.titre,
                        description = tache.description,
                        etat=tache.etat.value,
                        dateEch = tache.dateEch,
                        dateCre = tache.dateCre,
                        dateMaj = tache.dateMaj,
                        id_utilisateur = current_user.id
                        )
        db.add(db_tache)
        db.commit()
        db.refresh(db_tache)
        return db_tache
    except SQLAlchemyError as e:
        db.rollback()
        raise

def updateTache(id : int, tache : TacheCreation, current_user : Utilisateur, db : Session):
    try:
        db_tache = db.query(Tache).filter(Tache.id == id, Tache.id_utilisateur == current_user.id).first()
        if not db_tache:
            return None
        
        for cle, valeur in tache.dict(exclude_unset=True).items():
            if cle == "etat":
                setattr(db_tache, cle, valeur.value)
            else:
                setattr(db_tache, cle, valeur)

        db.commit()
        db.refresh(db_tache)
        return db_tache
    except SQLAlchemyError:
        db.rollback()
        raise

def getTache(id : int, current_user : Utilisateur, db : Session):
    try:
        db_tache = db.query(Tache).filter(Tache.id == id, Tache.id_utilisateur == current_user.id).first()
        return db_tache
    except SQLAlchemyError:
        raise

def getTaches(current_user : Utilisateur, db : Session):
    try:
        db_tache = db.query(Tache).filter(Tache.id_utilisateur == current_user.id)
        return db_tache
    except SQLAlchemyError:
        raise 

def deleteTache(id : int, current_user : Utilisateur, db : Session):
    try:
        db_tache = db.query(Tache).filter(Tache.id == id, Tache.id_utilisateur == current_user.id).first()
        if not db_tache:
            return False
        
        db.delete(db_tache)
        db.commit()
        return True
    except SQLAlchemyError:
        db.rollback()
        raise