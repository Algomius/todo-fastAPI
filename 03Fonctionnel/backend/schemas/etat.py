from enum import Enum

class Etat(str, Enum):
    AFAIRE = "A faire"
    ENCOURS = "En Cours"
    TERMINE = "Terminée"