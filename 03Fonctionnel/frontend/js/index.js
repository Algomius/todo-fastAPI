async function supprimer(e) {
    if (e.target.classList.contains('LienSuppression')) {
        event.preventDefault();
        try {
            const todoId = parseInt(e.target.getAttribute('id').slice(5));
            const response = await fetch(`http://localhost:8000/taches/${todoId}`, {
                method: "DELETE"
            });
            if (!response.ok) throw new Error("Erreur suppression");
            console.log(`Tâche ${todoId} supprimée`);
            window.location.href = "index.html?supprimerTache=" + todoId;
        } catch  (error) {
            console.error(error);
        }
    }
}

/* Fonction qui génère une information en cas de modification */
function genererinfo() {
    info = document.getElementById("info");

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
    } else {
        info.innerText = "";
    }

}

/* Fonction qui génère les taches sur la page d'accueil à remplacer par un appel à l'API */
async function genererListe() {
    /* Vider le contenu de la section des taches */
    let taches = document.getElementById("taches");
    while (taches.firstChild) {
        taches.removeChild(taches.firstChild);
    }  

    /* Création de la liste des taches */
    let tachesTable = document.createElement("table");
    let tachesTableEntete = document.createElement("tr");
    let tachesTableEnteteTitre = document.createElement("th");
    tachesTableEnteteTitre.innerHTML = "Titre";
    tachesTableEntete.appendChild(tachesTableEnteteTitre);
    let tachesTableEnteteVide = document.createElement("th");
    tachesTableEntete.appendChild(tachesTableEnteteVide);
    tachesTableEntete.appendChild(tachesTableEnteteVide);
    tachesTable.appendChild(tachesTableEntete);

    /* Parcourir les données d'actualité */
    try {
        const res = await fetch("http://localhost:8000/taches/");
        const dataTaches = await res.json();

        for (let dataElement of dataTaches) {
            let tachesTableLigne = document.createElement("tr");
            let tachesTableLigneTitre = document.createElement("td");
            tachesTableLigneTitre.innerHTML = dataElement.titre;
            tachesTableLigne.appendChild(tachesTableLigneTitre);
            let tachesTableLigneModifier = document.createElement("td");
            tachesTableLigneModifier.innerHTML = "<a href=detail.html?tache=" + dataElement.id + ">Modifier</a>";
            tachesTableLigne.appendChild(tachesTableLigneModifier);   
            let tachesTableLigneSupprimer = document.createElement("td");
            let tachesTableLigneSupprimerLien = document.createElement("a");
            tachesTableLigneSupprimerLien.innerText = "Supprimer";
            tachesTableLigneSupprimerLien.href = "index.html?supprimerTache=" + dataElement.id;
            tachesTableLigneSupprimerLien.id = "Suppr" + dataElement.id;
            tachesTableLigneSupprimerLien.classList.add("LienSuppression");
            tachesTableLigneSupprimer.appendChild(tachesTableLigneSupprimerLien);
            tachesTableLigne.appendChild(tachesTableLigneSupprimer);   
            tachesTable.appendChild(tachesTableLigne);
        } 
    } catch (err) {
      console.error(err);
    }
    taches.addEventListener('click', supprimer);
    taches.appendChild(tachesTable);
}

genererinfo();
genererListe();