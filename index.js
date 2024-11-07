const gallery = document.querySelector(".gallery");
console.log('gallery:',gallery);
const filters = document.querySelector(".filters");
// Les travaux

async function getWorks() { // async : marque une fonction comme asynchrone et retourne toujours une promesse
  try {
      const response = await fetch("http://localhost:5678/api/works"); // await : attend la résolution d'une promesse à l'intérieur d'une fonction
      if (!response.ok) {
          throw new Error('Request failed!');
      }
      const works = await response.json();
      console.log('works:',works);
      works.forEach(work => {
          const figure = document.createElement('figure');
          figure.classList.add('result'); // ajoute une class css 'result' à figure
          figure.id = work.categoryId;

          const img = document.createElement('img');
          img.src = work.imageUrl;
          figure.appendChild(img);
        
          const figCaption = document.createElement('figcaption');
          figCaption.textContent = work.title;
          figure.appendChild(figCaption);
        console.log('gallery:',gallery);
        console.log('figure:' ,figure);
          gallery.appendChild(figure);
      });
  } catch (error) {
      console.error('Error fetching works:', error);
  }
}

getWorks();

// Les catégories

async function displayCategories() {
try {
        const response = await fetch("http://localhost:5678/api/categories");
        if (!response.ok) {
            throw new Error('Request failed!');
        }
        const categories = await response.json();
        
        // Rajout du bouton filtre 'Tous'
        categories.unshift({ id: 0, name: 'Tous' });

        categories.forEach(category => {
            const button = document.createElement("button");
            button.classList.add('category_filter');
            button.textContent = category.name;
            button.id = category.id;
            filters.appendChild(button);

            button.addEventListener('click', event => {
                const results = document.querySelectorAll('.result');
                results.forEach(result => {
                    if (button.id === '0' || result.id === button.id) {
                        result.style.display = 'block';
                    } else {
                        result.style.display = 'none';
                    }
                });
                // Supprimer la classe active de tous les boutons
                const activeButtons = document.querySelectorAll('.category_filter.active_button');
                activeButtons.forEach(activeButton => {
                    activeButton.classList.remove('active_button');
                });

                // Ajouter la classe active au bouton cliqué
                button.classList.add('active_button');
            });
        });
         // Ajouter la classe active au bouton "Tous"
         const allButton = document.getElementById('0');
         allButton.classList.add('active_button');

    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// Appelle la fonction pour récupérer et afficher les catégories
displayCategories();

// gestion d'événement 

// Vérifie si l'utilisateur est connecté à chaque chargement de la page
window.addEventListener('load', () => {
    const token = sessionStorage.getItem('token');
    if (token) {
        // Changement du mot "login" en "logout"
        const login = document.getElementById('login');
        login.textContent = 'logout';
        login.href = '#';

        // Disparition des filtres
        const activeButtons = document.querySelectorAll('.filters#filters');
        activeButtons.forEach(button => {
            button.style.display = 'none';
        });
        // ?
        const modeEdition = document.getElementById("mode_edition");
        modeEdition.style.display="block";

        const mdEdition = document.getElementById("md_edition");
        mdEdition.style.display="block";

    }
});

// Action en cliquant sur "logout"
const login = document.getElementById('login');
login.addEventListener('click', () => {
    // Supprime le token d'authentification du localStorage
    sessionStorage.removeItem('token');
    // Redirige l'utilisateur vers la page de connexion
    location.href = 'index.html';
});