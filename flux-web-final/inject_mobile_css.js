const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'css', 'styles.css');

const mobileCSS = `
/* =========================================================
   UI/UX PREMIUM MOBILE ADAPTATION (MOBILE-FIRST FEEL)
   ========================================================= */
@media (max-width: 768px) {
  /* 1. Respiración del Diseño (Paddings y Márgenes) */
  .nx-section, .nxc-section, section {
    padding: 60px 0 !important; /* Cortar a la mitad los inmensos espacios en blanco */
  }
  
  .nx-hero {
    padding-top: 120px !important;
    padding-bottom: 60px !important;
  }
  
  /* Evitar roturas de palabras en títulos gigantes */
  .nx-title, .nxc-title, h1 {
    font-size: clamp(2rem, 8vw, 2.8rem) !important;
    hyphens: auto;
    word-break: break-word;
  }
  
  /* 2. Botones Touch-Friendly (Gordos y a todo ancho) */
  .btn-primary, .btn-secondary, .nxc-btn {
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
    margin-bottom: 12px;
    box-sizing: border-box;
  }
  
  /* El grupo de botones del hero pasa a columna */
  .nx-hero-buttons {
    flex-direction: column !important;
    gap: 12px !important;
    width: 100%;
  }

  /* 3. Carruseles Horizontales Nativos (Snap Scroll)
     Transforma grids largos en un swipe horizontal muy app-like */
  .nx-grid, .stats-grid-impact, .stats-grid {
    display: flex !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    scroll-snap-type: x mandatory;
    gap: 16px !important;
    padding-bottom: 24px !important; /* Espacio para la barra de scroll invisible */
    -webkit-overflow-scrolling: touch;
    /* Ocultar scrollbar en navegadores WebKit */
    scrollbar-width: none; 
    margin-left: -20px; /* Sacar del contenedor para que toque los bordes del cel */
    margin-right: -20px;
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
  
  .nx-grid::-webkit-scrollbar, 
  .stats-grid-impact::-webkit-scrollbar, 
  .stats-grid::-webkit-scrollbar {
    display: none;
  }

  .nx-feat-card, .stats-card-impact, .stats-card {
    flex: 0 0 85% !important; /* Cada tarjeta ocupa 85% del ancho, revelando un poco de la siguiente */
    scroll-snap-align: center;
    box-sizing: border-box;
    height: auto !important; /* Evitar estiramientos extraños */
  }

  /* 4. Fix Agente WhatsApp (Que no se salga de la pantalla) */
  .wa-phone {
    max-width: 100% !important;
    width: 100% !important;
    box-sizing: border-box !important;
    border-width: 4px !important; /* Borde de cristal más fino en móvil */
    border-radius: 24px !important;
    margin: 0 auto;
  }
  .wa-chat-bg {
    height: 380px !important; /* Un poco más corto para que quepa bien en la pantalla */
  }
  
  /* 5. Ajustes de Navbar y contenedor general */
  .nx-container {
    padding: 0 20px !important;
  }
}

/* Fix para celulares extra pequeños (iPhone SE, etc) */
@media (max-width: 380px) {
  .nx-title, .nxc-title, h1 {
    font-size: 2rem !important;
  }
  .wa-bubble {
    font-size: 0.85rem !important;
  }
}
`;

if (fs.existsSync(cssFile)) {
  let content = fs.readFileSync(cssFile, 'utf8');
  if (!content.includes('UI/UX PREMIUM MOBILE ADAPTATION')) {
    content += '\n' + mobileCSS;
    fs.writeFileSync(cssFile, content);
    console.log('Mobile CSS injected successfully!');
  } else {
    console.log('Mobile CSS already present.');
  }
} else {
  console.log('styles.css not found!');
}
