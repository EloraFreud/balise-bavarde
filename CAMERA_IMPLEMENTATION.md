# Implémentation de la Caméra pour PWA

## Vue d'ensemble

Ce document explique comment implémenter l'accès à la caméra arrière d'un téléphone dans une Progressive Web App (PWA).

## Prérequis

### 1. HTTPS (Obligatoire)
- L'API `getUserMedia()` nécessite une connexion HTTPS
- Exception : `localhost` et `127.0.0.1` fonctionnent en HTTP pour le développement
- Pour la production, utilisez HTTPS ou un service comme GitHub Pages, Netlify, Vercel

### 2. Permissions du navigateur
- L'utilisateur doit autoriser l'accès à la caméra
- La première fois, une popup de permission apparaîtra
- Les permissions peuvent être gérées dans les paramètres du navigateur

## Configuration PWA

### Manifest.json

Créez un fichier `manifest.json` à la racine de votre projet :

```json
{
  "name": "PFE Cursor App",
  "short_name": "Cursor App",
  "description": "Application de scan et cartographie",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#f9f9fb",
  "theme_color": "#24242e",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "permissions": [
    "camera"
  ]
}
```

### HTML - Lien vers le manifest

Ajoutez dans le `<head>` de vos pages HTML :

```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#24242e">
```

## API MediaDevices.getUserMedia()

### Syntaxe de base

```javascript
const stream = await navigator.mediaDevices.getUserMedia(constraints);
```

### Contraintes pour caméra arrière

```javascript
const constraints = {
  video: {
    facingMode: 'environment', // 'environment' = arrière, 'user' = avant
    width: { ideal: 1280 },
    height: { ideal: 720 }
  }
};
```

### Gestion des erreurs

| Erreur | Description | Solution |
|--------|-------------|----------|
| `NotAllowedError` | Permission refusée | Demander à l'utilisateur d'autoriser dans les paramètres |
| `NotFoundError` | Aucune caméra trouvée | Vérifier la disponibilité de la caméra |
| `NotReadableError` | Caméra déjà utilisée | Fermer les autres applications utilisant la caméra |
| `OverconstrainedError` | Contraintes non satisfaites | Ajuster les contraintes |

## Fonctionnalités implémentées

### 1. Activation de la caméra
- Détection de la disponibilité de l'API
- Demande d'accès à la caméra arrière
- Affichage du flux vidéo dans le placeholder

### 2. Capture de photo
- Capture de l'image depuis le flux vidéo
- Conversion en format JPEG
- Affichage dans une modale
- Option de sauvegarde

### 3. Gestion de la vie de l'application
- Désactivation automatique à la fermeture
- Gestion de la visibilité (background/foreground)

## Améliorations possibles

### 1. Scanner QR Code / Code-barres
Utilisez une bibliothèque comme :
- `jsQR` pour les QR codes
- `QuaggaJS` ou `ZXing` pour les codes-barres

```javascript
// Exemple avec jsQR
import jsQR from 'jsqr';

function scanQRCode(videoElement) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  ctx.drawImage(videoElement, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const code = jsQR(imageData.data, imageData.width, imageData.height);
  
  if (code) {
    console.log('QR Code détecté:', code.data);
    return code.data;
  }
}
```

### 2. Traitement d'image
- Détection de texte (OCR) avec Tesseract.js
- Reconnaissance d'objets avec TensorFlow.js
- Filtres et améliorations d'image

### 3. Sauvegarde locale
Utilisez l'API IndexedDB ou localStorage pour sauvegarder les photos :

```javascript
// Exemple avec IndexedDB
function savePhotoToIndexedDB(imageBlob) {
  const request = indexedDB.open('PhotoDB', 1);
  
  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(['photos'], 'readwrite');
    const store = transaction.objectStore('photos');
    store.add({ image: imageBlob, timestamp: Date.now() });
  };
}
```

### 4. Upload vers serveur
```javascript
async function uploadPhoto(imageBlob) {
  const formData = new FormData();
  formData.append('photo', imageBlob, 'scan.jpg');
  
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur upload:', error);
  }
}
```

## Compatibilité navigateurs

| Navigateur | Support | Notes |
|------------|---------|-------|
| Chrome (Android) | ✅ | Excellent support |
| Safari (iOS) | ✅ | Nécessite `playsinline` attribute |
| Firefox (Android) | ✅ | Bon support |
| Edge | ✅ | Bon support |
| Opera | ✅ | Bon support |

### Notes iOS
- Ajoutez `playsinline` à l'élément `<video>`
- Les contraintes peuvent être limitées sur iOS
- Testez sur un appareil réel (les simulateurs peuvent avoir des limitations)

## Sécurité et confidentialité

1. **Permissions explicites** : Demandez toujours la permission avant d'accéder à la caméra
2. **HTTPS obligatoire** : Ne fonctionne pas en HTTP (sauf localhost)
3. **Indicateur visuel** : Montrez clairement quand la caméra est active
4. **Arrêt automatique** : Désactivez la caméra quand elle n'est plus nécessaire
5. **Gestion des données** : Ne stockez pas les images sans consentement

## Ressources

- [MDN - MediaDevices.getUserMedia()](https://developer.mozilla.org/fr/docs/Web/API/MediaDevices/getUserMedia)
- [Web.dev - Camera API](https://web.dev/camera-pan-tilt-zoom/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)

