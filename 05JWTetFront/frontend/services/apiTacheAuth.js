const API_AUTH = "http://localhost:8000/auth/"

// register - Créer un utilisateur
export async function creerUtilisateur(nouvelUtilisateur) {
    try {
        const response = await fetch(`${API_AUTH}register/`, {
            method: "POST",             
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
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(infosConnexion) 
        });
        if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
    } catch (error) {
      console.error(error);
    } 
}

// refresh - refresh des token access et token refresh
export async function rafraichirToken() {
    let token = localStorage.getItem("refresh_token");
    try {
        const response = await fetch(`${API_AUTH}refresh/`, {
            method: "POST",             
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ refresh_token: token })
        });
        if (response.status_code == 401) {
            deconnexion();
        }
        if (!response.ok) throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
    } catch (error) {
      console.error(error);
    } 
}

// LOGOUT - Sortir de l'application
function deconnexion() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refesh_token');
    window.location.href = 'index.html';
}