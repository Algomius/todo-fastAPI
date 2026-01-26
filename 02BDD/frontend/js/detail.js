/* Fonction qui affiche les informations d'une tâche dans la page de détail, a remplacer par un appel à l'API */
function genererDetailModification(idTache) {
    let titreH1 = document.getElementById("titreH1");
    titreH1.innerHTML = "Modifier une tâche";
    let tacheJSON = dataTaches.find(t=>t.id === idTache);

    let titreTache = document.getElementById("titre");
    titreTache.value = tacheJSON.titre;

    let descriptionTache = document.getElementById("description");
    descriptionTache.value = tacheJSON.description;

    let etatTache = document.getElementById("etat");
    etatTache.value = tacheJSON.etat;

    let actions = document.getElementById("actions");
    let lienModifier = document.createElement("a");
    lienModifier.innerText = "Modifier";
    lienModifier.href = "index.html?modifier=" + idTache;
    lienModifier.id = "lienModifier";
    lienModifier.addEventListener('click', function(e) {
        // Event listener pour appeler l'API pour modifier
        console.log("Clique sur modifier")
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
    lienAjouter.addEventListener('click', function(e) {
        // Event listener pour appeler l'API pour ajouter
        console.log("Clique sur ajouter")
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