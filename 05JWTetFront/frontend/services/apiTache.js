import { rafraichirToken } from "./apiTacheAuth.js";

const API_BASE = "http://localhost:8000/taches/"

// GET - Toutes les tâches
export async function donneTaches(retry = false) {
    let token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE}`, {
        method: 'GET',
        headers: {
            'Authorization': `${token}`
        }
    });
    if (response.status == 401 && retry == false) {
        await rafraichirToken();
        return donneTaches(true);
    }
    if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    const data = await response.json();
    return data;
}

// GET - Tâche d'après son identifiant 
export async function donneTacheDetail(id, retry = false) {
    let token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE}${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `${token}`
        }
    });
    if (response.status == 401 && retry == false) {
        await rafraichirToken();
        return donneTacheDetail(id, true);
    }
    if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    const data = await response.json();
    return data;
}

// POST - Nouvelle tâche
export async function ajouter(nouvelleTache, retry = false) {
    let token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE}`, {
        method: "POST",             
        headers: {
            "Content-Type": "application/json", 
            'Authorization': `${token}`
        },
        body: JSON.stringify(nouvelleTache) 
    });
    if (response.status == 401 && retry == false) {
        await rafraichirToken();
        return ajouter(nouvelleTache, true);
    }
    if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    const data = await response.json();
    return data;
}

// PUT - Modification d'une tâche
export async function miseAjour(id, modifTache, retry = false) {
    let token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE}${id}`, {
        method: "PUT",             
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${token}` 
        },
        body: JSON.stringify(modifTache) 
    });
    if (response.status == 401 && retry == false) {
        await rafraichirToken();
        return miseAjour(id, modifTache, true);
    }
    if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    const data = await response.json();
    return data;
}

// DELETE - Suppression d'une tâche
export async function supprimer(id, retry = false) {
    let token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE}${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `${token}` 
        },
    });
    if (response.status == 401 && retry == false) {
        await rafraichirToken();
        return supprimer(id, true);
    }
    if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    const data = await response.json();
    return data;
}