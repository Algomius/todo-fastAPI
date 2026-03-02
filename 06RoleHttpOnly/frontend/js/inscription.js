import { creerUtilisateur} from "../services/apiTacheAuth.js";

let lienInscription = document.getElementById("inscription")

lienInscription.addEventListener('click', async (e) => {
    e.preventDefault();
    let motDePasse = document.getElementById("passe").value;
    let confPass  = document.getElementById("confpasse").value;
    if (motDePasse == confPass) {
        const nouvelUtilisateur = {
            pseudonyme: document.getElementById("pseudo").value,
            email: document.getElementById("mail").value,
            motDePasse: motDePasse
        };
        const data = await creerUtilisateur(nouvelUtilisateur);
        window.location.href = "index.html?nouvelUtilisateur=" + data.pseudonyme;
    } else {
        console.log("Les mots de passes " + motDePasse + " et " + confPass + " ne concordent pas - inscription annulée");
    }
});