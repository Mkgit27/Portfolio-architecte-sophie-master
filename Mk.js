fetch('http://localhost:5678/api/categories', {
    method: 'GET', // Méthode HTTP
    headers: {
        'accept': 'application/json', // Spécifie que l'on veut une réponse au format JSON
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Erreur réseau : ${response.status}`);
    }
    return response.json(); // Convertit la réponse en JSON
})
.then(data => {
    console.log('Données récupérées :', data); // Affiche les données dans la console
})
.catch(error => {
    console.error('Erreur lors de la récupération des données :', error); // Gère les erreurs
});