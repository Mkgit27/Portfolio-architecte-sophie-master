/*const fetch = require('node-fetch');
const url = 'http://localhost:5678/api/works';

fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Utilisez les données comme vous le souhaitez
  })
  .catch(error => console.error('Erreur:', error));*/

/*const galerie = document.querySelector(".gallery");
  console.log(galerie);
let galerie2= document.getElementsByClassName(".gallery");
console.log(galerie2);
// Requête Fetch pour obtenir les données JSON

async function getWorks(){
  try { 
    const response= await fetch("http://localhost:5678/api/works");
    console.log("response: ",response)
    if (!response.ok){
      throw new Error ("erreur dans la réponse");
    }
    const les_travaux= await response.json();
    console.log("response travaux: ", les_travaux);

    les_travaux.forEach(travaux => {
      const figure= document.createElement("figure");
      figure.classList.add("result");
      
      const imageElement = document.createElement("img");
      imageElement.src = travaux.imageUrl;
      figure.appendChild(imageElement);

      const figCaption= document.createElement("figcaption");
      figCaption.textContent= travaux.title;
      figure.appendChild(figCaption);

      galerie2.appendChild(figure);
      
    });

  } catch (error) {
    console.error("erreur du fetch de la fonction networks pour récupérer : ", error)
  }
    
}
getWorks();*/
const categoriesContainer = document.querySelector('.categories');

// Fonction pour récupérer les catégories depuis l'API et les afficher
async function fetchAndDisplayCategories() {
  try {
    // Faire la requête à l'API pour obtenir les catégories
    const response = await fetch("http://localhost:5678/api/categories");

    // Vérifier si la requête a réussi
    if (!response.ok) {
      throw new Error("Erreur dans la récupération des catégories");
    }

    // Convertir la réponse en JSON
    const categories = await response.json();
    console.log("Catégories récupérées :", categories);

    // Vider le conteneur avant d'ajouter les nouvelles catégories
    categoriesContainer.innerHTML = '';

    // Parcourir les catégories et créer des éléments HTML pour chaque catégorie
    categories.forEach(category => {
      const categoryElement = document.createElement('div');
      categoryElement.classList.add('category');
      categoryElement.textContent = category.name;

      // Ajouter l'élément au conteneur
      categoriesContainer.appendChild(categoryElement);
    });
  } catch (error) {
    // Gérer les erreurs éventuelles
    console.error("Erreur lors de la récupération des catégories :", error);
  }
}

// Appeler la fonction pour récupérer et afficher les catégories sur la page
fetchAndDisplayCategories();

async function displayWorks() {
  try {
      // Fetch data from the API
      const response = await fetch('http://localhost:5678/api/works');
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const works = await response.json();

      // Selectionne la gallery container dans le html
      const gallery = document.getElementsByClassName('gallery')[0];

      // Itérer sur chaque œuvre et créer des éléments HTML
      works.forEach(work => {
          // Create a figure element for each work
          const figure = document.createElement('figure');
          figure.classList.add('work-item');

          // Create an img element for the work's image
          const imageElement = document.createElement('img');
          imageElement.src = work.imageUrl;
          imageElement.alt = work.title; // Alt text for accessibility
          figure.appendChild(imageElement);

          // Create a figcaption element for the work's title
          const figCaption = document.createElement('figcaption');
          figCaption.textContent = work.title;
          figure.appendChild(figCaption);

          // Append the figure to the gallery container
          gallery.appendChild(figure);
      });
  } catch (error) {
      console.error('Error fetching or displaying works:', error);
  }
}

// Call the function to fetch and display the works
displayWorks();
