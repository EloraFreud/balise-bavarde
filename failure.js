// PFE Cursor App - Failure Page JavaScript
// Interactive functionality for the failure screen

document.addEventListener('DOMContentLoaded', async function() {
    const retryButton = document.getElementById('retryButton');
    const failurePlaqueImage = document.getElementById('failurePlaqueImage');
    const failurePlaqueText = document.getElementById('failurePlaqueText');
    
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
        if (failurePlaqueImage) {
            failurePlaqueImage.src = plaque.icon;
            failurePlaqueImage.alt = plaque.title;
        }
        
        // Mettre à jour le texte avec le titre de la plaque
        if (failurePlaqueText) {
            failurePlaqueText.textContent = `La réponse est incorrecte, tu ne peux pas encore ajouter cette plaque à ta collection...`;
        }
    }
    
    // Handle retry button
    if (retryButton) {
        retryButton.addEventListener('click', function() {
            console.log('Retry button clicked');
            // Get plaque name and ID from URL if available
            const plaqueName = plaqueTitle || plaque?.title || 'Le soldat inconnu';
            const plaqueIdParam = plaqueId || plaque?.id || '';
            
            // Navigate back to quiz with plaque ID
            window.location.href = `quiz.html?plaque=${encodeURIComponent(plaqueName)}&plaqueId=${encodeURIComponent(plaqueIdParam)}`;
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

