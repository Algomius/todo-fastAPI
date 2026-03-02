import { donneTaches, supprimer } from "../services/apiTache.js";
import { connexionUtilisateur, tokenOK, logout } from "../services/apiTacheAuth.js";

/* Fonction qui génère une information en cas de modification */
function genererinfo() {
    let info = document.getElementById("info");

    const url = new URL(document.location);
    const searchParams = url.searchParams;

    if (searchParams.has('modifier')) {
        info.innerText = "La tâche " + searchParams.get('modifier') + " a été modifiée avec succès";
    } else if (searchParams.has('annulerModifier')){
        info.innerText = "La tâche " + searchParams.get('annulerModifier') + " n'a pas été modifiée";
    } else if (searchParams.has('ajouter')){
        info.innerText = "La tâche " + searchParams.get('ajouter') + " a été ajoutée avec succès";
    } else if (searchParams.has('annulerAjouter')){
        info.innerText = "Aucune tâche n'a été ajoutée, création annulée";
    } else if (searchParams.has('supprimerTache')){
        info.innerText = "La tâche "+ searchParams.get('supprimerTache') +" a été supprimée avec succès";
    } else if (searchParams.has('nouvelUtilisateur'))   {
        info.innerText = "L'utilisateur "+ searchParams.get('nouvelUtilisateur') +" a été créé avec succès";
    } else {
        info.innerText = "";
    }
}

/* Fonction qui génère les taches sur la page d'accueil à remplacer par un appel à l'API */
async function genererListe() {
    document.getElementById("connexion").remove();
    /* Vider le contenu de la section des taches */
    let taches = document.getElementById("taches");
    while (taches.firstChild) {
        taches.removeChild(taches.firstChild);
    }  

    const dataTaches = await donneTaches();

    let unSeulId = true;
    if (dataTaches.length > 0) {
        let premierId = dataTaches[0].id_utilisateur;
        unSeulId = dataTaches.every(obj => obj.id_utilisateur === premierId);
    }

    /* Création de la liste des taches */
    let tachesTable = document.createElement("table");
    let tachesTableEntete = document.createElement("tr");

    let tachesTableEnteteTitre = document.createElement("th");
    tachesTableEnteteTitre.innerHTML = "Titre";
    tachesTableEntete.appendChild(tachesTableEnteteTitre);

    if (unSeulId == false) {
        let tachesTableEnteteUtilisateur = document.createElement("th");
        tachesTableEnteteUtilisateur.innerHTML = "Utilisateur";
        tachesTableEntete.appendChild(tachesTableEnteteUtilisateur);
    }

    let tachesTableEnteteVide = document.createElement("th");
    tachesTableEntete.appendChild(tachesTableEnteteVide);
    tachesTableEntete.appendChild(tachesTableEnteteVide);
    tachesTable.appendChild(tachesTableEntete);

    /* Parcourir les données d'actualité */
    
    if (dataTaches.length > 0) {

        for (let dataElement of dataTaches) {
            let tachesTableLigne = document.createElement("tr");
            let tachesTableLigneTitre = document.createElement("td");
            tachesTableLigneTitre.innerHTML = dataElement.titre;
            tachesTableLigne.appendChild(tachesTableLigneTitre);

            if (unSeulId == false) {
                let tachesTableLigneUtilisateur = document.createElement("td");
                tachesTableLigneUtilisateur.innerHTML = dataElement.id_utilisateur;
                tachesTableLigne.appendChild(tachesTableLigneUtilisateur);
            }

            let tachesTableLigneModifier = document.createElement("td");
            tachesTableLigneModifier.innerHTML = "<a href=detail.html?tache=" + dataElement.id + ">Modifier</a>";
            tachesTableLigne.appendChild(tachesTableLigneModifier); 

            let tachesTableLigneSupprimer = document.createElement("td");
            let tachesTableLigneSupprimerLien = document.createElement("a");
            tachesTableLigneSupprimerLien.innerText = "Supprimer";
            tachesTableLigneSupprimerLien.href = "index.html?supprimerTache=" + dataElement.id;
            tachesTableLigneSupprimerLien.id = "Suppr" + dataElement.id;
            tachesTableLigneSupprimerLien.classList.add("LienSuppression");
            tachesTableLigneSupprimerLien.addEventListener('click', async (e) => {
                e.preventDefault();
                const data = await supprimer(dataElement.id);
                window.location.href = "index.html?supprimerTache=" + data.id;
            });
            tachesTableLigneSupprimer.appendChild(tachesTableLigneSupprimerLien);
            tachesTableLigne.appendChild(tachesTableLigneSupprimer);   
            tachesTable.appendChild(tachesTableLigne);
        } 
    }
    taches.appendChild(tachesTable);
    genererDeconnexion();
}

function genererDeconnexion() {
    const lienDeconnexion = document.getElementById("deconnexion");
    lienDeconnexion.addEventListener('click', async(e) => {
        e.preventDefault()
        await logout();
        window.location.href = "index.html";
    });
}

function genererConnexion() {
    document.getElementById("contenu").remove();

    const lienConnexion = document.getElementById("lienConnexion");
    lienConnexion.addEventListener('click', async(e) => {
        e.preventDefault()
        let infosConnexion = {
            pseudonyme: document.getElementById("pseudo").value,
            motDePasse: document.getElementById("passe").value
        };
        await connexionUtilisateur(infosConnexion);
        window.location.href = "index.html";
    });
}

genererinfo();
if (await tokenOK()) {
    genererListe();
} else {
    genererConnexion();
}
