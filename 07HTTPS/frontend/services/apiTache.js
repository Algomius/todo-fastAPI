import { rafraichirToken } from "./apiTacheAuth.js";

const API_BASE = "https://127.0.0.1:8000/taches/"

// GET - Toutes les tâches
export async function donneTaches(retry = false) {
    try {
        const response = await fetch(`${API_BASE}`, {
            method: 'GET',
            credentials: "include"
        });
        if (response.status == 401 && retry == false) {
            await rafraichirToken();
            return donneTaches(true);
        }
        if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
      console.error(error);
    } 
}

// GET - Tâche d'après son identifiant 
export async function donneTacheDetail(id, retry = false) {
    try {
        const response = await fetch(`${API_BASE}${id}`, {
            method: 'GET',
            credentials: "include"
        });
        if (response.status == 401 && retry == false) {
            await rafraichirToken();
            return donneTacheDetail(id, true);
        }
        if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
      console.error(error);
    } 
}

// POST - Nouvelle tâche
export async function ajouter(nouvelleTache, retry = false) {
    try {
        const response = await fetch(`${API_BASE}`, {
            method: "POST",  
            credentials: "include",             
            headers: {
                "Content-Type": "application/json"
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
    } catch (error) {
      console.error(error);
    } 
}

// PUT - Modification d'une tâche
export async function miseAjour(id, modifTache, retry = false) {
    try {
        const response = await fetch(`${API_BASE}${id}`, {
            method: "PUT",  
            credentials: "include",             
            headers: {
                "Content-Type": "application/json"
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
    } catch (error) {
      console.error(error);
    } 
}

// DELETE - Suppression d'une tâche
export async function supprimer(id, retry = false) {
    try {
        const response = await fetch(`${API_BASE}${id}`, {
            method: "DELETE",
            credentials: "include"
        });
        if (response.status == 401 && retry == false) {
            await rafraichirToken();
            return supprimer(id, true);
        }
        if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
      console.error(error);
    } 
}