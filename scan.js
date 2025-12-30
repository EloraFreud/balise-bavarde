// PFE Cursor App - Scan Page JavaScript
// Interactive functionality for the scan interface with camera access

document.addEventListener('DOMContentLoaded', function() {
    const scanButton = document.getElementById('scanButton');
    const scanHeaderFromModal = document.getElementById('scanHeaderFromModal');
    const backButton = document.getElementById('backButton');
    const scanTitle = document.getElementById('scanTitle');
    const cameraPlaceholder = document.querySelector('.camera-placeholder');
    let stream = null;
    let videoElement = null;
    let isCameraActive = false;
    
    // Check if we're coming from modal
    const urlParams = new URLSearchParams(window.location.search);
    const fromModal = urlParams.get('from') === 'modal';
    const title = urlParams.get('title');
    
    if (fromModal && scanHeaderFromModal) {
        // Show the header with back button and title
        scanHeaderFromModal.classList.remove('hidden');
        if (title && scanTitle) {
            scanTitle.textContent = decodeURIComponent(title);
        }
        
        // Hide the bottom navigation bar
        const bottomNavBar = document.getElementById('bottomNavBar');
        if (bottomNavBar) {
            bottomNavBar.style.display = 'none';
        }
        
        // Handle back button
        if (backButton) {
            backButton.addEventListener('click', function() {
                // Go back to previous page (map)
                window.location.href = 'index.html';
            });
        }
    }
    
    // Vérifier si l'API MediaDevices est disponible
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('L\'API de caméra n\'est pas disponible dans ce navigateur');
        alert('Votre navigateur ne supporte pas l\'accès à la caméra. Veuillez utiliser un navigateur moderne.');
        return;
    }
    
    // Fonction pour activer la caméra arrière
    async function activateCamera() {
        try {
            // Demander l'accès à la caméra arrière (back camera)
            // facingMode: 'environment' = caméra arrière
            // facingMode: 'user' = caméra avant
            const constraints = {
                video: {
                    facingMode: 'environment', // Caméra arrière
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };
            
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            
            // Créer un élément vidéo si il n'existe pas
            if (!videoElement) {
                videoElement = document.createElement('video');
                videoElement.setAttribute('autoplay', '');
                videoElement.setAttribute('playsinline', ''); // Important pour iOS
                videoElement.style.width = '100%';
                videoElement.style.height = '100%';
                videoElement.style.objectFit = 'cover';
                videoElement.style.borderRadius = '24px';
                
                // Remplacer le placeholder par la vidéo
                if (cameraPlaceholder) {
                    cameraPlaceholder.innerHTML = '';
                    cameraPlaceholder.appendChild(videoElement);
                    cameraPlaceholder.style.background = 'transparent';
                }
            }
            
            // Connecter le stream à la vidéo
            videoElement.srcObject = stream;
            isCameraActive = true;
            
            console.log('Caméra activée avec succès');
            
        } catch (error) {
            console.error('Erreur lors de l\'activation de la caméra:', error);
            
            let errorMessage = 'Impossible d\'accéder à la caméra. ';
            
            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                errorMessage += 'Veuillez autoriser l\'accès à la caméra dans les paramètres de votre navigateur.';
            } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
                errorMessage += 'Aucune caméra n\'a été trouvée sur cet appareil.';
            } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
                errorMessage += 'La caméra est déjà utilisée par une autre application.';
            } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
                errorMessage += 'Les contraintes de la caméra ne peuvent pas être satisfaites.';
            } else {
                errorMessage += error.message;
            }
            
            alert(errorMessage);
        }
    }
    
    // Fonction pour désactiver la caméra
    function deactivateCamera() {
        if (stream) {
            stream.getTracks().forEach(track => {
                track.stop();
            });
            stream = null;
        }
        
        if (videoElement) {
            videoElement.srcObject = null;
        }
        
        isCameraActive = false;
        console.log('Caméra désactivée');
    }
    
    // Fonction pour prendre une photo
    function capturePhoto() {
        if (!videoElement || !isCameraActive) {
            alert('Veuillez d\'abord activer la caméra');
            return;
        }
        
        try {
            // Créer un canvas pour capturer l'image
            const canvas = document.createElement('canvas');
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            
            // Convertir en blob puis en URL
            canvas.toBlob(function(blob) {
                if (blob) {
                    const imageUrl = URL.createObjectURL(blob);
                    
                    // Ici vous pouvez :
                    // 1. Afficher l'image capturée
                    // 2. L'envoyer à un serveur
                    // 3. La sauvegarder localement
                    // 4. La traiter avec une API de reconnaissance
                    
                    console.log('Photo capturée:', imageUrl);
                    
                    // Afficher l'écran d'informations sur la plaque
                    showPlaqueInfo(imageUrl);
                    
                    // Optionnel : désactiver la caméra après la capture
                    // deactivateCamera();
                }
            }, 'image/jpeg', 0.95);
            
        } catch (error) {
            console.error('Erreur lors de la capture:', error);
            alert('Erreur lors de la capture de la photo');
        }
    }
    
    // Fonction pour afficher l'écran d'informations sur la plaque
    function showPlaqueInfo(imageUrl) {
        // Désactiver la caméra
        deactivateCamera();
        
        // Créer l'écran d'informations
        const infoScreen = document.createElement('div');
        infoScreen.id = 'plaqueInfoScreen';
        infoScreen.className = 'plaque-info-screen';
        infoScreen.innerHTML = `
            <div class="plaque-info-container">
                <!-- Header -->
                <div class="plaque-info-header">
                    <div class="plaque-info-spacer"></div>
                    <button class="plaque-info-close" id="closeInfoScreen">
                        <img src="http://localhost:3845/assets/8241868549c082ec4b85ccb0abf805e6a3eb5052.svg" alt="Close" />
                    </button>
                </div>
                
                <!-- Main Content -->
                <div class="plaque-info-main">
                    <!-- Content Card -->
                    <div class="plaque-info-card">
                        <!-- Icon positioned absolutely on top of card -->
                        <div class="plaque-info-icon-absolute">
                            <div class="plaque-info-icon">
                                <img src="http://localhost:3845/assets/eeeee256c1d92acffac4bd640874b1f8e9283196.png" alt="Plaque" />
                            </div>
                        </div>
                        
                        <div class="plaque-info-text">
                            <h1 class="plaque-info-title" id="plaqueTitle">Le soldat inconnu</h1>
                            <div class="plaque-info-description" id="plaqueDescription">
                                <p>Devant toi, la dalle du Soldat inconnu et cette flamme qui ne s'éteint jamais. Elle brûle depuis 1923. Chaque soir, à 18h30, une association vient la raviver. C'est un geste simple — une torche, quelques mots, parfois une sonnerie — mais il se répète tous les jours. C'est l'idée de ce monument : un souvenir qui ne devient pas un décor, un hommage qui vit grâce à un rituel.</p>
                                <p>&nbsp;</p>
                                <p>Sous l'arc de triomphe repose un soldat non identifié de la Première Guerre mondiale, transféré ici en 1921. On a voulu que son identité soit inconnue pour qu'il représente tous les disparus.</p>
                            </div>
                        </div>
                        <button class="plaque-info-audio" id="audioButton">
                            <img src="http://localhost:3845/assets/1f7216c4411c09ff4927da9ca81097ab6382056f.svg" alt="Play" />
                            <span>1 MIN 30</span>
                        </button>
                    </div>
                </div>
                
                <!-- Bottom Button -->
                <div class="plaque-info-footer">
                    <button class="plaque-info-next" id="nextButton">SUIVANT</button>
                </div>
            </div>
        `;
        
        // Ajouter les styles si pas déjà présents
        if (!document.getElementById('plaqueInfoStyles')) {
            const styles = document.createElement('style');
            styles.id = 'plaqueInfoStyles';
            styles.textContent = `
                .plaque-info-screen {
                    position: fixed;
                    inset: 0;
                    background: #f9f9fb;
                    z-index: 1000;
                    overflow-y: auto;
                }
                
                .plaque-info-container {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    max-width: 390px;
                    margin: 0 auto;
                    background: #f9f9fb;
                }
                
                .plaque-info-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px 20px 0;
                }
                
                .plaque-info-spacer {
                    width: 48px;
                }
                
                .plaque-info-close {
                    background: white;
                    border: 1px solid #eeeef1;
                    border-radius: 8px;
                    padding: 12px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s;
                }
                
                .plaque-info-close:hover {
                    background: #f9f9fb;
                }
                
                .plaque-info-close img {
                    width: 16px;
                    height: 16px;
                }
                
                .plaque-info-main {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 24px;
                    position: relative;
                    z-index: 1;
                }
                
                .plaque-info-card {
                    background: white;
                    border: 1px solid #d7d7e0;
                    border-radius: 24px;
                    padding: 96px 24px 24px;
                    width: 100%;
                    box-shadow: 
                        6px 21px 9px 0px rgba(181, 181, 196, 0.01),
                        2px 5px 5px 0px rgba(181, 181, 196, 0.08);
                    position: relative;
                    z-index: 1;
                }
                
                .plaque-info-icon-absolute {
                    position: absolute;
                    left: 50%;
                    top: -31px;
                    transform: translateX(-50%);
                    z-index: 2;
                }
                
                .plaque-info-icon {
                    width: 100px;
                    height: 100px;
                    border: 2.5px solid #eeeef1;
                    border-radius: 2500px;
                    overflow: hidden;
                    background: white;
                    padding: 4px;
                    box-shadow: 
                        6px 21px 9px 0px rgba(181, 181, 196, 0.06),
                        3px 12px 7px 0px rgba(181, 181, 196, 0.12),
                        3px 5px 5px 0px rgba(181, 181, 196, 0.16),
                        0px 1px 3px 0px rgba(181, 181, 196, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .plaque-info-icon img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 50%;
                }
                
                .plaque-info-text {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-bottom: 16px;
                }
                
                .plaque-info-title {
                    font-family: 'Red Hat Display', sans-serif;
                    font-weight: 800;
                    font-size: 20px;
                    line-height: 1.2;
                    color: #24242e;
                    text-align: center;
                    letter-spacing: -0.6px;
                    margin: 0;
                }
                
                .plaque-info-description {
                    font-family: 'Red Hat Display', sans-serif;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 1.6;
                    color: #3e3e4e;
                    letter-spacing: -0.32px;
                }
                
                .plaque-info-description p {
                    margin: 0 0 1em 0;
                }
                
                .plaque-info-audio {
                    background: white;
                    border: 1px solid #eeeef1;
                    border-radius: 8px;
                    padding: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: background 0.2s;
                    width: fit-content;
                    margin: 0 auto;
                }
                
                .plaque-info-audio:hover {
                    background: #f9f9fb;
                }
                
                .plaque-info-audio img {
                    width: 16px;
                    height: 16px;
                }
                
                .plaque-info-audio span {
                    font-family: 'Red Hat Display', sans-serif;
                    font-weight: 600;
                    font-size: 12px;
                    line-height: 1.4;
                    color: #3e3e4e;
                    letter-spacing: 0.72px;
                    text-transform: uppercase;
                }
                
                .plaque-info-footer {
                    padding: 32px 24px;
                    background: #f9f9fb;
                }
                
                .plaque-info-next {
                    width: 100%;
                    background: linear-gradient(181.39deg, #24242e 7.38%, #09090b 92.62%);
                    border: 1px solid #131217;
                    border-radius: 16px;
                    padding: 12px 20px;
                    color: white;
                    font-family: 'Red Hat Display', sans-serif;
                    font-weight: 700;
                    font-size: 14px;
                    line-height: 1.4;
                    letter-spacing: 0.28px;
                    text-transform: uppercase;
                    cursor: pointer;
                    box-shadow: inset 0px 2px 0px 0px rgba(181, 181, 196, 0.16);
                    transition: opacity 0.2s;
                }
                
                .plaque-info-next:hover {
                    opacity: 0.9;
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(infoScreen);
        
        // Gestionnaires d'événements
        document.getElementById('closeInfoScreen').addEventListener('click', () => {
            document.body.removeChild(infoScreen);
            URL.revokeObjectURL(imageUrl);
        });
        
        document.getElementById('nextButton').addEventListener('click', () => {
            console.log('Bouton Suivant cliqué');
            // Naviguer vers le quiz
            const title = document.getElementById('plaqueTitle').textContent;
            document.body.removeChild(infoScreen);
            URL.revokeObjectURL(imageUrl);
            window.location.href = `quiz.html?plaque=${encodeURIComponent(title)}`;
        });
        
        document.getElementById('audioButton').addEventListener('click', () => {
            console.log('Bouton audio cliqué');
            // Ici vous pouvez ajouter la fonctionnalité de lecture audio
            // Par exemple : playAudio('url-du-fichier-audio.mp3');
        });
    }
    
    // Gestion du clic sur le bouton de scan
    if (scanButton) {
        scanButton.addEventListener('click', function() {
            if (!isCameraActive) {
                // Activer la caméra au premier clic
                activateCamera();
            } else {
                // Prendre une photo si la caméra est déjà active
                capturePhoto();
            }
        });
    }
    
    // Désactiver la caméra quand on quitte la page
    window.addEventListener('beforeunload', function() {
        deactivateCamera();
    });
    
    // Gestion de la visibilité de la page (pour PWA)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isCameraActive) {
            // Optionnel : désactiver la caméra quand l'app passe en arrière-plan
            // deactivateCamera();
        }
    });
    
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
    
    // Note pour PWA :
    // Pour que la caméra fonctionne dans une PWA, assurez-vous d'avoir :
    // 1. Un manifest.json avec les permissions appropriées
    // 2. HTTPS (ou localhost pour le développement)
    // 3. Les permissions de caméra dans le manifest si nécessaire
});

