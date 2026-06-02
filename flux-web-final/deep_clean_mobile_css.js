const fs = require('fs');
const path = require('path');
const cssFile = path.join(__dirname, 'css', 'styles.css');

let styles = fs.readFileSync(cssFile, 'utf8');

// 1. Remover el bloque original de menú móvil
const startMarker = '/* Mobile Menu Toggle - always visible on mobile */';
const endMarker = '/* Badges */';

if (styles.includes(startMarker) && styles.includes(endMarker)) {
  const startIndex = styles.indexOf(startMarker);
  const endIndex = styles.indexOf(endMarker);
  if (startIndex < endIndex) {
    const before = styles.substring(0, startIndex);
    const after = styles.substring(endIndex);
    styles = before + '\n\n' + after;
    console.log('Removed original mobile menu CSS block.');
  }
}

// 2. Remover TODA la basura inyectada recientemente al final
const tailMarker = 'DRAWER MOBILE MENU (CAJÓN LATERAL) UI/UX REDESIGN';
if (styles.includes(tailMarker)) {
  const tailIndex = styles.lastIndexOf('/* ====', styles.indexOf(tailMarker));
  if (tailIndex !== -1) {
    styles = styles.substring(0, tailIndex);
    console.log('Removed broken injected tail CSS.');
  }
}
// Hacer otra limpieza por si acaso
const altTailMarker = 'APPLE-STYLE DRILL-DOWN MENU PANELS';
if (styles.includes(altTailMarker)) {
  const altIndex = styles.lastIndexOf('/* ====', styles.indexOf(altTailMarker));
  if (altIndex !== -1) {
    styles = styles.substring(0, altIndex);
    console.log('Removed alternate broken injected tail CSS.');
  }
}

// 3. Escribir el CSS Ultimate Limpio
const ultimateCSS = `
/* =========================================================
   ULTIMATE MOBILE DRILL-DOWN MENU
   ========================================================= */

/* Mobile Menu Toggle Button */
.menu-toggle {
  display: none; /* hidden on desktop */
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 9999; 
  padding: 0;
  margin-left: 16px;
  flex-shrink: 0;
}
.menu-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background-color: var(--flux-white);
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s;
  border-radius: 2px;
  margin: 3px 0;
  transform-origin: center;
}
@media (max-width: 1024px) {
  .nav-menu { display: none !important; }
  .menu-toggle { display: flex !important; }
}

/* X animation when open */
.menu-toggle.active span:first-child { transform: translateY(8px) rotate(45deg); }
.menu-toggle.active span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.menu-toggle.active span:last-child { transform: translateY(-8px) rotate(-45deg); }

/* Overlay Background */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 20000;
  display: flex;
  justify-content: flex-end; /* Align drawer to the right */
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.mobile-menu-overlay.active {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}

/* The Drawer */
.mobile-menu-drawer {
  width: 85vw;
  max-width: 400px;
  height: 100vh;
  background: #0B1121;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: -10px 0 40px rgba(0,0,0,0.5);
}
.mobile-menu-overlay.active .mobile-menu-drawer {
  transform: translateX(0);
}

/* Header & Logo */
.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  min-height: 72px;
}
.mobile-drawer-logo {
  height: 16px !important;
  max-height: 16px !important;
  width: auto !important;
  display: block;
}
.mobile-menu-close {
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.1);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
}

/* Panels Container */
.menu-content {
  flex: 1;
  display: flex;
  padding: 0;
}
.menu-panels-container {
  position: relative;
  width: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
}
.menu-panel {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s;
  overflow-y: auto;
  padding: 32px;
  box-sizing: border-box;
}

/* Panel Sliding States */
.panel-main { transform: translateX(0); opacity: 1; pointer-events: all; }
.panel-main.slide-out { transform: translateX(-100%); opacity: 0; pointer-events: none; }

.panel-sub { transform: translateX(100%); opacity: 0; pointer-events: none; }
.panel-sub.active { transform: translateX(0); opacity: 1; pointer-events: all; }

/* Navigation Links */
.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
}
.mobile-link, .drilldown-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  font-size: 1.25rem;
  font-weight: 400;
  color: #ffffff;
  text-decoration: none;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  cursor: pointer;
  font-family: inherit;
  outline: none;
}
.drilldown-arrow {
  font-size: 1.5rem;
  color: rgba(255,255,255,0.3);
}

/* Sub-panel UI */
.panel-header {
  margin-bottom: 16px;
}
.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: #00B894;
  font-size: 1rem;
  font-weight: 600;
  padding: 0 0 16px 0;
  cursor: pointer;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  width: 100%;
  font-family: inherit;
}
.panel-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin: 16px 0 24px 0;
}

/* CTAs inside Main Panel */
.mobile-cta-group {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.mobile-cta-group a {
  width: 100%;
  text-align: center;
  padding: 16px;
  box-sizing: border-box;
  text-decoration: none;
  display: block;
}
.mobile-cta-group .btn-text {
  font-weight: 600;
  color: #ffffff;
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
}

/* Footer (Languages) */
.menu-footer {
  margin-top: auto;
  padding-top: 40px;
}
.menu-lang {
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
}
.menu-lang a { color: rgba(255,255,255,0.5); text-decoration: none; }
.menu-lang a.active { color: #ffffff; font-weight: 600; }
.menu-lang .divider { opacity: 0.3; }

/* Global Nexa Hack (Always Dark Burger on light navs) */
.navbar .menu-toggle span { background-color: #0F172A; } /* fallback si fuera global claro */
`;

styles += '\n\n' + ultimateCSS;
fs.writeFileSync(cssFile, styles);
console.log('Ultimate Clean Mobile Menu CSS Injected!');
