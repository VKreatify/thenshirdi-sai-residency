import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../styles/main.css';
import { ACTIVE_CONFIG } from './config';
import saiFaviconLogo from '../sai web logo.png?url';

// Auto-crop & enhance logo emblem for maximum clarity in browser URL tab
if (typeof document !== 'undefined') {
  const faviconSource = ACTIVE_CONFIG?.assets?.favicon || ACTIVE_CONFIG?.assets?.logo || saiFaviconLogo;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    try {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(img, 0, 0);

      const imageData = tempCtx.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;

      // Find tight bounding box around logo emblem pixels (alpha threshold > 40)
      let minX = img.width, minY = img.height, maxX = 0, maxY = 0;
      for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
          const alpha = data[(y * img.width + x) * 4 + 3];
          if (alpha > 40) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (minX < maxX && minY < maxY) {
        const fullW = maxX - minX + 1;
        const fullH = maxY - minY + 1;
        
        // Focus tightly on the core circular emblem (inset 8% to crop outer thin spikes)
        const insetX = Math.round(fullW * 0.08);
        const insetY = Math.round(fullH * 0.08);
        
        const cropX = minX + insetX;
        const cropY = minY + insetY;
        const cropW = Math.max(1, fullW - (insetX * 2));
        const cropH = Math.max(1, fullH - (insetY * 2));

        const size = 128; // Standard HD favicon resolution
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Draw dark subtle rounded circular backdrop for crisp contrast against any tab bar theme
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
        ctx.fillStyle = '#14110E';
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = ACTIVE_CONFIG?.theme?.colors?.goldAccent || '#C9A063';
        ctx.stroke();

        // Apply contrast and brightness filter to make gold & portrait super sharp & clear
        ctx.filter = 'brightness(1.18) contrast(1.25) saturate(1.2)';

        // Draw cropped emblem maximized inside the 128x128 canvas
        const pad = 6;
        const targetSize = size - (pad * 2);
        const aspect = cropW / cropH;

        let dW = targetSize;
        let dH = targetSize;
        let oX = pad;
        let oY = pad;

        if (aspect > 1) {
          dH = targetSize / aspect;
          oY = pad + (targetSize - dH) / 2;
        } else {
          dW = targetSize * aspect;
          oX = pad + (targetSize - dW) / 2;
        }

        ctx.drawImage(img, cropX, cropY, cropW, cropH, oX, oY, dW, dH);

        const croppedFaviconUrl = canvas.toDataURL('image/png');
        
        // Update all icon link tags in head
        let links = document.querySelectorAll("link[rel*='icon']");
        if (links.length === 0) {
          const link = document.createElement('link');
          link.rel = 'icon';
          document.head.appendChild(link);
          links = [link];
        }
        links.forEach((l) => {
          l.type = 'image/png';
          l.href = croppedFaviconUrl;
        });
      }
    } catch (e) {
      console.warn('Favicon crop fallback:', e);
    }
  };
  img.src = faviconSource;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
