// PFE Cursor App - Failure Page JavaScript
// Interactive functionality for the failure screen

document.addEventListener('DOMContentLoaded', function() {
    const retryButton = document.getElementById('retryButton');
    
    // Handle retry button
    if (retryButton) {
        retryButton.addEventListener('click', function() {
            console.log('Retry button clicked');
            // Get plaque name from URL if available
            const urlParams = new URLSearchParams(window.location.search);
            const plaqueName = urlParams.get('plaque') || 'Le soldat inconnu';
            
            // Navigate back to quiz
            window.location.href = `quiz.html?plaque=${encodeURIComponent(plaqueName)}`;
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

