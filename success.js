// PFE Cursor App - Success Page JavaScript
// Interactive functionality for the success screen

document.addEventListener('DOMContentLoaded', async function() {
    const addToCollectionButton = document.getElementById('addToCollectionButton');
    const successPlaqueImage = document.getElementById('successPlaqueImage');
    const successPlaqueText = document.getElementById('successPlaqueText');
    
    // Charger les données de la plaque
    async function loadPlaquesData() {
        try {
            const response = await fetch('plaques-data.json');
            const data = await response.json();
            return data.plaques;
        } catch (error) {
            console.error('Erreur lors du chargement des données des plaques:', error);
            return [];
        }
    }
    
    // Trouver la plaque par ID ou titre
    function findPlaque(plaques, plaqueId, plaqueTitle) {
        if (plaqueId) {
            return plaques.find(p => p.id === plaqueId);
        }
        if (plaqueTitle) {
            return plaques.find(p => p.title === plaqueTitle);
        }
        return plaques[0];
    }
    
    // Charger et afficher les données de la plaque
    const urlParams = new URLSearchParams(window.location.search);
    const plaqueId = urlParams.get('plaqueId');
    const plaqueTitle = urlParams.get('plaque');
    
    const plaques = await loadPlaquesData();
    const plaque = findPlaque(plaques, plaqueId, plaqueTitle);
    
    if (plaque) {
        // Mettre à jour l'image de la plaque
        if (successPlaqueImage) {
            successPlaqueImage.src = plaque.icon;
            successPlaqueImage.alt = plaque.title;
        }
        
        // Mettre à jour le texte avec le titre de la plaque
        if (successPlaqueText) {
            // Extraire le titre en minuscules pour l'affichage
            const plaqueTitleLower = plaque.title.toLowerCase();
            successPlaqueText.innerHTML = `Tu as gagné la plaque <span class="font-bold">${plaque.title}</span> !`;
        }
    }
    
    // Handle add to collection button
    if (addToCollectionButton) {
        addToCollectionButton.addEventListener('click', function() {
            console.log('Add to collection clicked');
            // Here you can:
            // 1. Save the plaque to user's collection
            // 2. Navigate to collection page
            // 3. Show confirmation
            
            // Navigate to collection page
            window.location.href = 'collection.html';
        });
    }
    
    // Responsive adjustments
    function handleResize() {
        const container = document.querySelector('.app-container');
        if (window.innerWidth < 390) {
            if (container) {
                container.style.maxWidth = '100%';
            }
        } else {
            if (container) {
                container.style.maxWidth = '390px';
            }
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
});

