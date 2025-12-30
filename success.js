// PFE Cursor App - Success Page JavaScript
// Interactive functionality for the success screen

document.addEventListener('DOMContentLoaded', function() {
    const addToCollectionButton = document.getElementById('addToCollectionButton');
    
    // Initialize confetti animation
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load({
            id: "tsparticles",
            options: {
                "fullScreen": {
                    "enable": false,
                    "zIndex": 1
                },
                "particles": {
                    "color": {
                        "value": [
                            "#b5b5c4",
                            "#6d6d8a",
                            "#49485c"
                        ]
                    },
                    "move": {
                        "direction": "bottom",
                        "enable": true,
                        "outModes": {
                            "default": "out"
                        },
                        "size": true,
                        "speed": {
                            "min": 0.5,
                            "max": 2
                        }
                    },
                    "number": {
                        "value": 300,
                        "density": {
                            "enable": true,
                            "area": 800
                        }
                    },
                    "opacity": {
                        "value": 1,
                        "animation": {
                            "enable": false,
                            "startValue": "max",
                            "destroy": "min",
                            "speed": 0.3,
                            "sync": true
                        }
                    },
                    "rotate": {
                        "value": {
                            "min": 0,
                            "max": 360
                        },
                        "direction": "random",
                        "move": true,
                        "animation": {
                            "enable": true,
                            "speed": 30
                        }
                    },
                    "tilt": {
                        "direction": "random",
                        "enable": true,
                        "move": true,
                        "value": {
                            "min": 0,
                            "max": 360
                        },
                        "animation": {
                            "enable": true,
                            "speed": 30
                        }
                    },
                    "shape": {
                        "type": "square",
                        "options": {}
                    },
                    "size": {
                        "value": {
                            "min": 3,
                            "max": 6
                        }
                    },
                    "roll": {
                        "darken": {
                            "enable": true,
                            "value": 20
                        },
                        "enlighten": {
                            "enable": true,
                            "value": 20
                        },
                        "enable": true,
                        "speed": {
                            "min": 10,
                            "max": 20
                        }
                    },
                    "wobble": {
                        "distance": 20,
                        "enable": true,
                        "move": true,
                        "speed": {
                            "min": -10,
                            "max": 10
                        }
                    }
                }
            }
        });
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

