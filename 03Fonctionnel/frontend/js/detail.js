async function miseAjour(e) {
    event.preventDefault();
    try {
        let id = -1;
        if (searchParams.has('tache')) {
            id = parseInt(searchParams.get('tache'));
        }
        const select = document.getElementById("etat");
        const texte = select.options[select.selectedIndex].text;
        const modifTache = {
            titre: document.getElementById("titre").value,
            description: document.getElementById("description").value,
            etat: texte,
            dateEch: document.getElementById("dateEch").value
        };
        console.log(JSON.stringify(modifTache))
        const response = await fetch(`http://localhost:8000/taches/${id}`, {
            method: "PUT",             
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(modifTache) 
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }

        const data = await response.json();
        window.location.href = "index.html?ajouter=" + data.id;

    } catch (error) {
        console.error("Erreur lors de la création :", error);
    }
}

async function ajouter(e) {
    event.preventDefault();
    try {
        const select = document.getElementById("etat");
        const texte = select.options[select.selectedIndex].text;
        const nouvelleTache = {
            titre: document.getElementById("titre").value,
            description: document.getElementById("description").value,
            etat: texte,
            dateEch: document.getElementById("dateEch").value
        };
        console.log(JSON.stringify(nouvelleTache))
        const response = await fetch("http://localhost:8000/taches/", {
            method: "POST",             
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(nouvelleTache) 
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }

        const data = await response.json();
        window.location.href = "index.html?ajouter=" + data.id;

    } catch (error) {
        console.error("Erreur lors de la création :", error);
    }
}


/* Fonction qui affiche les informations d'une tâche dans la page de détail, a remplacer par un appel à l'API */
async function genererDetailModification(idTache) {
    titreH1 = document.getElementById("titreH1");
    titreH1.innerHTML = "Modifier une tâche";

    let tacheJSON = "";
    let id = -1;
    if (searchParams.has('tache')) {
        id = parseInt(searchParams.get('tache'));
    }

    try {
        const response = await fetch(`http://localhost:8000/taches/${id}`);

        if (!response.ok) {
            throw new Error("Tâche introuvable");
        }

        
        tacheJSON = await response.json();

    } catch (error) {
        console.error(error);
    }    

    let titreTache = document.getElementById("titre");
    titreTache.value = tacheJSON.titre;

    let descriptionTache = document.getElementById("description");
    descriptionTache.value = tacheJSON.description;

    let etatTache = document.getElementById("etat");
    for (const option of etatTache.options) {
        if (option.text === tacheJSON.etat) {
        etatTache.value = option.value;
        break;
        }
    }

    let dateEch = document.getElementById("dateEch");
    dateEch.value = tacheJSON.dateEch;

    let actions = document.getElementById("actions");
    let lienModifier = document.createElement("a");
    lienModifier.innerText = "Modifier";
    lienModifier.href = "index.html?modifier=" + idTache;
    lienModifier.id = "lienModifier";
    lienModifier.addEventListener('click', miseAjour);
    actions.appendChild(lienModifier);
    let lienAnnuler = document.createElement("a");
    lienAnnuler.innerText = "Annuler";
    lienAnnuler.href = "index.html?annulerModifier=" + idTache;
    lienAnnuler.id = "lienAnnulerModification";
    actions.appendChild(lienAnnuler);
}

function genererDetailAjout(idTache) {
    titreH1 = document.getElementById("titreH1");
    titreH1.innerHTML = "Ajouter une nouvelle tâche";
    let actions = document.getElementById("actions");
    let lienAjouter = document.createElement("a");
    lienAjouter.innerText = "Ajouter";
    lienAjouter.href = "index.html?ajouter=1";
    lienAjouter.id = "lienAjouter";
    lienAjouter.addEventListener('click', ajouter);
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