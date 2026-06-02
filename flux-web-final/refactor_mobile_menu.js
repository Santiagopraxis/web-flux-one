const fs = require('fs');
const path = require('path');

const folders = ['co', 'mx'];
const projectRoot = __dirname;
const cssFile = path.join(projectRoot, 'css', 'styles.css');

// 1. Inyectar CSS estructural del Drawer Menu
const drawerCSS = `
/* =========================================================
   DRAWER MOBILE MENU (CAJÓN LATERAL) UI/UX REDESIGN
   ========================================================= */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5) !important;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  z-index: 20000;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  justify-content: flex-end; /* Alinear a la derecha */
}

.mobile-menu-overlay.active {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}

.mobile-menu-drawer {
  width: 85%;
  max-width: 400px;
  height: 100%;
  background: #0B1121;
  border-left: 1px solid rgba(255,255,255,0.05);
  box-shadow: -10px 0 40px rgba(0,0,0,0.5);
  transform: translateX(100%);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}

.mobile-menu-overlay.active .mobile-menu-drawer {
  transform: translateX(0);
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.mobile-drawer-logo {
  height: 24px;
  width: auto;
}

.mobile-menu-close {
  position: static;
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.1);
  border: none;
  border-radius: 50%;
  color: #ffffff;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.menu-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 32px;
  overflow-y: auto;
  text-align: left; /* UI UX Alineado a la izquierda */
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.mobile-link {
  font-size: 1.5rem;
  font-weight: 300;
  color: #ffffff;
  text-decoration: none;
  opacity: 0;
  transform: translateX(20px);
  transition: all 0.4s;
}

.mobile-menu-overlay.active .mobile-link {
  opacity: 1;
  transform: translateX(0);
}

.mobile-cta-group {
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid rgba(255,255,255,0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s 0.3s;
}

.mobile-menu-overlay.active .mobile-cta-group {
  opacity: 1;
  transform: translateY(0);
}

.mobile-login-btn {
  width: 100%;
  padding: 16px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  color: white !important;
  text-align: center;
  font-weight: 600;
  display: flex;
  justify-content: center;
}

.mobile-signup-btn {
  width: 100%;
  padding: 16px;
  text-align: center;
  display: flex;
  justify-content: center;
}

.menu-footer {
  margin-top: auto;
  padding-top: 40px;
}
`;

if (fs.existsSync(cssFile)) {
  let styles = fs.readFileSync(cssFile, 'utf8');
  if (!styles.includes('DRAWER MOBILE MENU (CAJÓN LATERAL)')) {
    fs.appendFileSync(cssFile, '\n' + drawerCSS);
    console.log('Drawer CSS injected.');
  }
}

// 2. Nuevo HTML del Drawer Menu
const newMenuHtml = `  <!-- MOBILE OVERLAY MENU (DRAWER) -->
  <div class="mobile-menu-overlay" id="mobile-menu" role="dialog" aria-modal="true">
    <div class="mobile-menu-drawer">
      <div class="mobile-menu-header">
        <img src="../assets/images/logos/xo%20banco.svg" alt="fluX One" class="mobile-drawer-logo">
        <button class="mobile-menu-close" onclick="toggleMenu()" aria-label="Cerrar menú">✕</button>
      </div>
      
      <div class="menu-content">
        <nav class="mobile-nav" aria-label="Navegación móvil">
          <a href="recaudo.html" class="mobile-link" onclick="toggleMenu()">Productos</a>
          <a href="como-funciona.html" class="mobile-link" onclick="toggleMenu()">Cómo funciona</a>
          <a href="../developers.html" class="mobile-link" onclick="toggleMenu()">Desarrolladores</a>
          <a href="#faq" class="mobile-link" onclick="toggleMenu()">FAQ</a>
          <a href="#contacto" class="mobile-link" onclick="toggleMenu()">Hablemos</a>
        </nav>
        
        <div class="mobile-cta-group">
          <a href="login.html" class="btn-text mobile-login-btn" style="text-decoration:none;" onclick="toggleMenu()">Iniciar sesión</a>
          <a href="#" class="btn-primary mobile-signup-btn" style="text-decoration:none;" onclick="toggleMenu(); openModal();">Comienza hoy</a>
        </div>
        
        <div class="menu-footer">
          <div class="menu-lang">
            <a href="index.html" class="active">ES</a>
            <span class="divider">|</span>
            <a href="../en/index.html">EN</a>
          </div>
        </div>
      </div>
    </div>
  </div>`;

// 3. Procesar HTMLs
folders.forEach(f => {
  const processDirectory = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        processDirectory(fullPath);
      } else if (fullPath.endsWith('.html')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Reemplazar el viejo menú por el nuevo Drawer
        const oldMenuStart = content.indexOf('<!-- MOBILE OVERLAY MENU -->');
        if (oldMenuStart !== -1) {
          const bodyEnd = content.indexOf('</body>'); // buscar final de manera mas segura
          // El menú está justo antes de los scripts de footer
          const oldMenuRegex = /<!-- MOBILE OVERLAY MENU -->[\s\S]*?(?=<section|<footer|<script|<\/body)/;
          content = content.replace(oldMenuRegex, newMenuHtml + '\n\n  ');
          
          fs.writeFileSync(fullPath, content);
          console.log('Replaced menu HTML in ' + fullPath);
        }
        
        // Si es nexa.html, aplicar la solución de colores al botón hamburguesa
        if (file === 'nexa.html') {
          const nexaStyleFix = '/* Navbar siempre blanco en Nexa */\n    .navbar .menu-toggle span { background-color: #0F172A !important; }\n';
          if (!content.includes('.navbar .menu-toggle span { background-color: #0F172A !important; }')) {
            content = content.replace('/* Navbar siempre blanco en Nexa */', nexaStyleFix);
            fs.writeFileSync(fullPath, content);
            console.log('Fixed Nexa hamburger color bug in ' + fullPath);
          }
        }
      }
    });
  };
  processDirectory(path.join(projectRoot, f));
});
