// PFE Cursor App - JavaScript
// Interactive functionality for the map interface

document.addEventListener('DOMContentLoaded', function() {
    // Navigation bar interaction
    const navItems = document.querySelectorAll('.nav-item');
    const activeNavItem = document.querySelector('[data-node-id="1:554"]'); // Carte is active by default
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active state from all items
            navItems.forEach(nav => {
                const icon = nav.querySelector('img');
                const text = nav.querySelector('p');
                if (icon) {
                    // Reset icon opacity or color
                    icon.style.filter = 'brightness(0.7)';
                }
                if (text) {
                    text.classList.remove('text-[#24242e]');
                    text.classList.add('text-[#b5b5c4]');
                }
            });
            
            // Add active state to clicked item
            const icon = this.querySelector('img');
            const text = this.querySelector('p');
            if (icon) {
                icon.style.filter = 'brightness(1)';
            }
            if (text) {
                text.classList.remove('text-[#b5b5c4]');
                text.classList.add('text-[#24242e]');
            }
        });
    });
    
    // Search bar interaction - no focus effects, just handle input
    const searchInput = document.querySelector('[data-node-id="1:638"]');
    
    if (searchInput) {
        // Remove any default browser focus styles
        searchInput.addEventListener('focus', function() {
            this.style.outline = 'none';
            this.style.border = 'none';
            this.style.boxShadow = 'none';
        });
        
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = this.value.trim();
                console.log('Searching for:', searchTerm);
                // Add search functionality here
            }
        });
    }
    
    // Filter button interaction
    const filterButton = document.querySelector('[data-node-id="1:643"]');
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            // Add filter functionality here
            console.log('Filter button clicked');
            // You can add a modal or dropdown for filters
        });
    }
    
    // Modal functionality
    const modal = document.getElementById('pinModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const scanButton = document.getElementById('scanButton');
    
    // Pin data - you can customize this for each pin
    const pinData = {
        '1:527': {
            title: 'Sous vos pieds',
            description: 'Eau de Paris : un réseau invisible qui tient la ville éveillée.',
            address: '156-170 Av. des Champs-Élysées, 75008 Paris',
            icon: 'assets/Plaque-3.png'
        },
        '1:534': {
            title: 'Le soldat inconnu',
            description: 'La plaque du Soldat inconnu et cette flamme qui ne s\'éteint jamais !',
            address: 'Pl. Charles de Gaulle, 75008 Paris',
            icon: 'assets/Plaque-1.png'
        },
        '1:541': {
            title: 'Une étoile, douze avenues',
            description: 'Une étoile, douze avenues : la mémoire de la France rayonne.',
            address: '67 Av. d\'Iéna, 75116 Paris',
            icon: 'assets/Plaque-2.png'
        }
    };
    
    function openModal(pinId) {
        const data = pinData[pinId];
        if (data) {
            // Update modal content
            document.getElementById('modalTitle').textContent = data.title;
            document.getElementById('modalDescription').textContent = data.description;
            document.getElementById('modalAddress').textContent = data.address;
            document.querySelector('#modalCategoryIcon img').src = data.icon;
            
            // Show modal
            modal.classList.add('active');
            modalBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal() {
        modal.classList.remove('active');
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Close modal handlers
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }
    
    // Scan button handler - redirect to scan page
    if (scanButton) {
        scanButton.addEventListener('click', function() {
            console.log('Scan button clicked from modal');
            const title = document.getElementById('modalTitle').textContent;
            // Close modal and redirect to scan page with title parameter
            closeModal();
            window.location.href = `scan.html?from=modal&title=${encodeURIComponent(title)}`;
        });
    }
    
    // Map pin interactions
    const mapPins = document.querySelectorAll('[data-name="Map Pin"]');
    mapPins.forEach(pin => {
        pin.style.cursor = 'pointer';
        
        pin.addEventListener('click', function(e) {
            e.stopPropagation();
            const pinId = this.getAttribute('data-node-id');
            openModal(pinId);
        });
        
        // Add hover effect
        pin.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        pin.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Location pin button interaction
    const locationButton = document.querySelector('[data-node-id="1:550"]');
    if (locationButton) {
        locationButton.addEventListener('click', function() {
            // Center map on user location
            console.log('Location button clicked');
            // You can add geolocation API here
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    console.log('Latitude:', position.coords.latitude);
                    console.log('Longitude:', position.coords.longitude);
                    // Update map center based on user location
                });
            }
        });
    }
    
    
    // Map image centering adjustment
    function centerMapImage() {
        const mapImage = document.querySelector('.map-image');
        if (mapImage) {
            // The image is already centered with transform: translateX(-50%) and left: 50%
            // But we can fine-tune if needed based on the actual image dimensions
            const container = document.querySelector('.app-container');
            if (container) {
                const containerWidth = container.offsetWidth;
                // Adjust if needed - the image should be centered
                mapImage.style.left = '50%';
                mapImage.style.transform = 'translateX(-50%)';
            }
        }
    }
    
    // Responsive adjustments
    function handleResize() {
        centerMapImage();
    }
    
    window.addEventListener('resize', handleResize);
    // Initial centering
    setTimeout(centerMapImage, 100);
});
