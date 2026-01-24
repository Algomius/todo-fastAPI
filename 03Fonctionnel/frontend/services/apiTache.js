const API_BASE = "http://localhost:8000/taches/"

// GET - Toutes les tâches
export async function donneTaches() {
    try {
        const res = await fetch(`${API_BASE}`);
        const dataTaches = await res.json();
        return dataTaches
    } catch (err) {
      console.error(err);
    }
}

// GET - Tâche d'après son identifiant 
export async function donneTacheDetail(id) {
    try {
        const response = await fetch(`${API_BASE}${id}`);
        if (!response.ok) {
            throw new Error("Tâche introuvable");
        }
        let tacheJSON = await response.json();
        return tacheJSON;
    } catch (error) {
        console.error(error);
    } 
}

// POST - Nouvelle tâche
export async function ajouter(nouvelleTache) {
    try {
        const response = await fetch(`${API_BASE}`, {
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
        return data;
    } catch (error) {
        console.error(error);
    }
}

// PUT - Modification d'une tâche
export async function miseAjour(id, modifTache) {
    try {
        const response = await fetch(`${API_BASE}${id}`, {
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
        return data;
    } catch (error) {
        console.error(error);
    }
}

// DELETE - Suppression d'une tâche
export async function supprimer(id) {
    try {
        const response = await fetch(`${API_BASE}${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("Erreur suppression");
        const data = await response.json();
        return data;
    } catch  (error) {
        console.error(error);
    }
}