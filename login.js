// Sélection des éléments du DOM
const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorDiv = document.getElementById('errorMessage');

console.log("Éléments du DOM sélectionnés");

// Ajout d'un écouteur d'événements pour la soumission du formulaire
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut
    console.log("Soumission du formulaire empêchée");

    // Récupération des valeurs des champs email et mot de passe au moment de la soumission
    const email = emailInput.value;
    const password = passwordInput.value;
    console.log("Valeurs récupérées - Email:", email, "Mot de passe:", password);

    try {
        // Envoi de la requête de connexion à l'API
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Correction de l'en-tête Content-Type
            },
            body: JSON.stringify({ email, password })
        });

        console.log("Réponse reçue du serveur");

        if (response.ok) {
            console.log("Authentification réussie");
            // Si la réponse est positive (status 200), traitement des données
            const data = await response.json(); // asynchrone synchrone await ?
            sessionStorage.setItem('token', data.token); // Stockage du token ?
            sessionStorage.setItem('userId', data.userId); // Stockage de l'ID utilisateur ?
            console.log("Token et userId stockés dans sessionStorage");
            window.location.href = './index.html'; // Redirection vers la page d'accueil
            console.log("Redirection vers la page d'accueil");
        } else if (response.status === 401) {
            console.log("Erreur 401: Accès non autorisé");
            // Si la réponse indique un accès non autorisé (status 401)
            errorDiv.textContent = "Erreur dans l'identifiant ou le mot de passe";
        } else if (response.status === 404) {
            console.log("Erreur 404: Utilisateur non trouvé");
            // Si l'utilisateur n'est pas trouvé (status 404)
            errorDiv.textContent = "Erreur dans l'identifiant ou le mot de passe";
        } else {
            console.log("Erreur inconnue:", response.status);
            errorDiv.textContent = "Une erreur est survenue lors de la connexion";
        }
    } catch (error) {
        // Gestion des erreurs de la requête
        console.error("Erreur lors de la requête:", error);
        errorDiv.textContent = 'Une erreur est survenue sur le site';
    }
});