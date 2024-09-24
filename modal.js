/*document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('photoModal');
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const form = document.getElementById('add-work-form');

    // Ouvrir la modale
    openModalBtn.addEventListener('click', () => {
        modal.showModal();
    });

    // Fermer la modale
    closeModalBtn.addEventListener('click', () => {
        modal.close();
    });

    // Soumission du formulaire pour ajouter une photo
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        confirm('Souhaitez-vous confirmer ?');
        const formData = new FormData(form);

        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Photo ajoutée avec succès:', data);
            modal.close(); // Fermer la modale après ajout
        })
        .catch(error => console.error('Erreur:', error));
    });
});*/

const closeModal = document.getElementById("close-modal")
const modalContainer = document.getElementById("modal-wrapper")

closeModal.addEventListener('click', () => {
    modalContainer.style.display = 'none'
})