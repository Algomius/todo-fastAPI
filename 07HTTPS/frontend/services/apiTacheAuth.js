const API_AUTH = "https://127.0.0.1:8000/auth/"

// register - Créer un utilisateur
export async function creerUtilisateur(nouvelUtilisateur) {
    try {
        const response = await fetch(`${API_AUTH}register/`, {
            method: "POST",  
            credentials: "include",              
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(nouvelUtilisateur) 
        });
        if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
      console.error(error);
    }
}

// login - connexion et récupération d'un token JWT
export async function connexionUtilisateur(infosConnexion) {
    try {
        const response = await fetch(`${API_AUTH}login/`, {
            method: "POST", 
            credentials: "include",            
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(infosConnexion) 
        });
        if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        const data = await response.json();
    } catch (error) {
      console.error(error);
    } 
}

// refresh - refresh des token access et token refresh
export async function rafraichirToken() {
    try {
        const response = await fetch(`${API_AUTH}refresh/`, {
            method: "POST",  
            credentials: "include",              
        });
        if (response.status == 401) {
            
            logout();
        }
        if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        const data = await response.json();
    } catch (error) {
      console.error(error);
    } 
}

// LOGOUT - Sortir de l'application
export async function logout() {
    try {
        const response = await fetch(`${API_AUTH}logout/`, {
            method: "POST",  
            credentials: "include"
        });
        if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        window.location.href = 'index.html';
    } catch (error) {
      console.error(error);
    }
}

// Fonction qui vérifie si l'utilisateur possède un token d'accès valide 
export async function tokenOK() {
    try {
        const response = await fetch(`${API_AUTH}me/`, {
            method: "GET",  
            credentials: "include"
        });
        if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        return true;
    } catch (error) {
      console.error(error);
      return false;
    }
}