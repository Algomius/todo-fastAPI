import { donneTacheDetail, ajouter, miseAjour } from "../services/apiTache.js";

/* Fonction qui affiche les informations d'une tâche dans la page de détail, a remplacer par un appel à l'API */
async function genererDetailModification(idTache) {
    let titreH1 = document.getElementById("titreH1");
    titreH1.innerHTML = "Modifier une tâche";

    let tacheJSON = await donneTacheDetail(idTache);

    let titreTache = document.getElementById("titre");
    titreTache.value = tacheJSON.titre;

    let descriptionTache = document.getElementById("description");
    descriptionTache.value = tacheJSON.description;
    
    let etatTache = document.getElementById("etat");
    etatTache.value = tacheJSON.etat;
    let dateEch = document.getElementById("dateEch");
    dateEch.value = tacheJSON.dateEch;

    let actions = document.getElementById("actions");
    let lienModifier = document.createElement("a");
    lienModifier.innerText = "Modifier";
    lienModifier.href = "index.html?modifier=" + idTache;
    lienModifier.id = "lienModifier";
    lienModifier.addEventListener('click', async (e) => {
        e.preventDefault();
        const modifTache = {
            titre: document.getElementById("titre").value,
            description: document.getElementById("description").value,
            etat: document.getElementById("etat").value,
            dateEch: document.getElementById("dateEch").value
        };
        const data = await miseAjour(idTache, modifTache);
        window.location.href = "index.html?ajouter=" + data.id;
    });

    actions.appendChild(lienModifier);
    let lienAnnuler = document.createElement("a");
    lienAnnuler.innerText = "Annuler";
    lienAnnuler.href = "index.html?annulerModifier=" + idTache;
    lienAnnuler.id = "lienAnnulerModification";
    actions.appendChild(lienAnnuler);
}

function genererDetailAjout(idTache) {
    let titreH1 = document.getElementById("titreH1");
    titreH1.innerHTML = "Ajouter une nouvelle tâche";
    let actions = document.getElementById("actions");
    let lienAjouter = document.createElement("a");
    lienAjouter.innerText = "Ajouter";
    lienAjouter.href = "index.html?ajouter=1";
    lienAjouter.id = "lienAjouter";
    lienAjouter.addEventListener('click', async (e) => {
        e.preventDefault();
        const nouvelleTache = {
            titre: document.getElementById("titre").value,
            description: document.getElementById("description").value,
            etat: document.getElementById("etat").value,
            dateEch: document.getElementById("dateEch").value
        };
        const data = await ajouter(nouvelleTache);
        window.location.href = "index.html?ajouter=" + data.id;
    });
    actions.appendChild(lienAjouter);
    
    let lienAnnuler = document.createElement("a");
    lienAnnuler.innerText = "Annuler";
    lienAnnuler.href = "index.html?annulerAjouter=1";
    lienAnnuler.id = "lienAnnulerAjouter";
    actions.appendChild(lienAnnuler);
}

const url = new URL(document.location);
const searchParams = url.searchParams;

if (searchParams.has('tache')) {
    genererDetailModification(searchParams.get('tache'));
} else {
    genererDetailAjout();
}