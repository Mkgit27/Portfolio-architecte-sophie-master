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

  const galerie = document.querySelector(".gallery");
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
getWorks();
