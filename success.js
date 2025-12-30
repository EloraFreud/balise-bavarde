// PFE Cursor App - Success Page JavaScript
// Interactive functionality for the success screen

document.addEventListener('DOMContentLoaded', function() {
    const addToCollectionButton = document.getElementById('addToCollectionButton');
    
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

