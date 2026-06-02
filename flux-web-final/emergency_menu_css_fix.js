const fs = require('fs');
const path = require('path');
const cssFile = path.join(__dirname, 'css', 'styles.css');

if (fs.existsSync(cssFile)) {
  let styles = fs.readFileSync(cssFile, 'utf8');
  
  // Nuevo CSS Blindado
  const robustCSS = `
/* =========================================================
   EMERGENCY UI FIX: DRILL-DOWN MENU OVERRIDES
   ========================================================= */

/* 1. Forzar el Drawer Lateral en lugar de pantalla completa */
.mobile-menu-overlay {
  display: flex !important;
  justify-content: flex-end !important;
  align-items: stretch !important;
  background: rgba(0, 0, 0, 0.6) !important;
}
.mobile-menu-drawer {
  width: 85vw !important;
  max-width: 380px !important;
  height: 100vh !important;
  background: #0B1121 !important;
  margin: 0 !important;
  padding: 0 !important;
  box-shadow: -10px 0 50px rgba(0,0,0,0.8) !important;
  display: flex !important;
  flex-direction: column !important;
}

/* 2. Forzar estrictamente el tamaño del Logo XO */
.mobile-menu-header {
  padding: 24px !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  border-bottom: 1px solid rgba(255,255,255,0.1) !important;
  min-height: 80px !important;
  box-sizing: border-box !important;
}
img.mobile-drawer-logo {
  height: 24px !important;
  width: 50px !important;
  max-height: 24px !important;
  max-width: 50px !important;
  object-fit: contain !important;
  display: block !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* 3. Resetear enlaces viejos (Eliminar mayusculas gigantes) */
nav.mobile-nav {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 0 !important;
  width: 100% !important;
}
a.mobile-link {
  font-size: 1.25rem !important;
  font-weight: 400 !important;
  letter-spacing: normal !important;
  text-transform: none !important;
  text-align: left !important;
  padding: 18px 0 !important;
  color: #ffffff !important;
  width: 100% !important;
  border-bottom: 1px solid rgba(255,255,255,0.03) !important;
  opacity: 1 !important;
  transform: none !important;
  display: block !important;
  transition: none !important; /* Matar animaciones viejas */
}

/* 4. Arreglar el fondo blanco de los botones */
button.drilldown-btn {
  background: transparent !important;
  border: none !important;
  color: #ffffff !important;
  font-size: 1.25rem !important;
  font-weight: 400 !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  padding: 18px 0 !important;
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 100% !important;
  border-bottom: 1px solid rgba(255,255,255,0.03) !important;
  cursor: pointer !important;
  outline: none !important;
  font-family: inherit !important;
}
.drilldown-arrow {
  color: rgba(255,255,255,0.3) !important;
  font-size: 1.5rem !important;
}

/* 5. CTAs */
.mobile-cta-group {
  margin-top: 32px !important;
  padding-top: 24px !important;
  border-top: 1px solid rgba(255,255,255,0.1) !important;
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
  width: 100% !important;
  opacity: 1 !important;
  transform: none !important;
}
.mobile-cta-group a {
  width: 100% !important;
  text-align: center !important;
  padding: 16px !important;
  font-size: 1rem !important;
  box-sizing: border-box !important;
  display: block !important;
}

/* Panel Header */
.panel-header {
  margin-bottom: 16px !important;
}
.panel-title {
  font-size: 1.75rem !important;
  font-weight: 600 !important;
  color: #ffffff !important;
  margin: 16px 0 24px 0 !important;
}
button.back-btn {
  background: transparent !important;
  border: none !important;
  color: #00B894 !important; /* Color primario para volver */
  font-size: 1rem !important;
  padding: 0 !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  font-weight: 600 !important;
}
`;

  styles += '\n' + robustCSS;
  fs.writeFileSync(cssFile, styles);
  console.log('Emergency CSS Fix Applied!');
}
