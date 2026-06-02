const fs = require('fs');
const path = require('path');
const folders = ['co', 'mx'];
const projectRoot = __dirname;
const cssFile = path.join(projectRoot, 'css', 'styles.css');

// 1. Inyectar CSS estructural del Drill-down Menu
if (fs.existsSync(cssFile)) {
  let styles = fs.readFileSync(cssFile, 'utf8');
  
  // Limpiar CSS anterior del accordion y forzar el logo
  const logoFix = `\n.mobile-drawer-logo { max-height: 16px !important; width: auto !important; max-width: 60px !important; display: block; }\n`;
  if (!styles.includes('max-height: 16px !important; width: auto !important;')) {
    styles += logoFix;
  }

  const drilldownCSS = `
/* =========================================================
   APPLE-STYLE DRILL-DOWN MENU PANELS
   ========================================================= */
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
  padding-bottom: 40px;
}
.panel-main { transform: translateX(0); opacity: 1; }
.panel-main.slide-out { transform: translateX(-100%); opacity: 0; pointer-events: none; }

.panel-sub { transform: translateX(100%); opacity: 0; pointer-events: none; }
.panel-sub.active { transform: translateX(0); opacity: 1; pointer-events: all; }

.drilldown-btn {
  display: flex; justify-content: space-between; align-items: center;
  width: 100%; text-align: left; background: none; border: none; padding: 0;
  font-size: 1.5rem; font-weight: 300; color: #ffffff; cursor: pointer; text-decoration: none;
}
.drilldown-arrow { font-size: 1.2rem; color: rgba(255,255,255,0.4); }

.panel-header {
  margin-bottom: 24px;
}
.back-btn {
  display: flex; align-items: center; gap: 8px;
  background: none; border: none; padding: 0 0 16px 0;
  font-size: 1rem; color: rgba(255,255,255,0.6); cursor: pointer;
  border-bottom: 1px solid rgba(255,255,255,0.05); width: 100%; text-align: left;
}
.panel-title {
  font-size: 1.5rem; font-weight: 600; color: #ffffff; margin-top: 16px; margin-bottom: 8px;
}
.mobile-nav { display: flex; flex-direction: column; gap: 24px; }
`;
  if (!styles.includes('APPLE-STYLE DRILL-DOWN')) {
    styles += '\n' + drilldownCSS;
  }
  fs.writeFileSync(cssFile, styles);
  console.log('Drilldown CSS injected.');
}

// 2. Nuevo HTML del Drawer Menu con Paneles Deslizantes
const newMenuHtml = `  <!-- MOBILE OVERLAY MENU (DRILL-DOWN) -->
  <div class="mobile-menu-overlay" id="mobile-menu" role="dialog" aria-modal="true">
    <div class="mobile-menu-drawer">
      <div class="mobile-menu-header">
        <img src="../assets/images/logos/xo%20banco.svg" alt="fluX One" class="mobile-drawer-logo">
        <button class="mobile-menu-close" onclick="toggleMenu()" aria-label="Cerrar menú">✕</button>
      </div>
      
      <div class="menu-content" style="padding: 0; flex: 1; display: flex;">
        <div class="menu-panels-container">
          
          <!-- PANEL 1: MAIN MENU -->
          <div class="menu-panel panel-main" id="panel-main" style="padding: 32px;">
            <nav class="mobile-nav">
              <button class="drilldown-btn" onclick="openPanel('panel-productos')">
                Productos <span class="drilldown-arrow">›</span>
              </button>
              <button class="drilldown-btn" onclick="openPanel('panel-recursos')">
                Recursos <span class="drilldown-arrow">›</span>
              </button>
              <a href="../developers.html" class="mobile-link" onclick="toggleMenu()">Desarrolladores</a>
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
          
          <!-- PANEL 2: PRODUCTOS -->
          <div class="menu-panel panel-sub" id="panel-productos" style="padding: 32px;">
            <div class="panel-header">
              <button class="back-btn" onclick="closePanel('panel-productos')">‹ Volver</button>
              <div class="panel-title">Productos</div>
            </div>
            <nav class="mobile-nav">
              <a href="nexa.html" class="mobile-link" onclick="toggleMenu()">Nexa by fluX</a>
              <a href="recaudo.html" class="mobile-link" onclick="toggleMenu()">Recaudo Inteligente</a>
              <a href="dispersion.html" class="mobile-link" onclick="toggleMenu()">Dispersión Automática</a>
              <a href="conciliacion.html" class="mobile-link" onclick="toggleMenu()">Conciliación en tiempo real</a>
            </nav>
          </div>

          <!-- PANEL 3: RECURSOS -->
          <div class="menu-panel panel-sub" id="panel-recursos" style="padding: 32px;">
            <div class="panel-header">
              <button class="back-btn" onclick="closePanel('panel-recursos')">‹ Volver</button>
              <div class="panel-title">Recursos</div>
            </div>
            <nav class="mobile-nav">
              <a href="como-funciona.html" class="mobile-link" onclick="toggleMenu()">Cómo funciona</a>
              <a href="#faq" class="mobile-link" onclick="toggleMenu()">Preguntas Frecuentes (FAQ)</a>
              <a href="../blog" class="mobile-link" onclick="toggleMenu()">Blog</a>
            </nav>
          </div>

        </div>
      </div>
    </div>
  </div>`;

const jsDrilldown = `
    // Panel Navigation Logic
    function openPanel(panelId) {
      document.getElementById('panel-main').classList.add('slide-out');
      document.getElementById(panelId).classList.add('active');
    }
    function closePanel(panelId) {
      document.getElementById(panelId).classList.remove('active');
      document.getElementById('panel-main').classList.remove('slide-out');
    }
    
    // Override toggleMenu to reset panels on close
    const originalToggle = toggleMenu;
    toggleMenu = function() {
      const menu = document.getElementById('mobile-menu');
      if (menu && menu.classList.contains('active')) {
         // Reset panels when closing
         document.getElementById('panel-main').classList.remove('slide-out');
         document.querySelectorAll('.panel-sub').forEach(p => p.classList.remove('active'));
      }
      originalToggle();
    };
`;

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
        
        // Reemplazar la navegacion vieja por Paneles
        const menuRegex = /<!-- MOBILE OVERLAY MENU(?: \(DRAWER\))? -->[\s\S]*?(?=<section|<footer|<script|<\/body)/;
        if (menuRegex.test(content)) {
          content = content.replace(menuRegex, newMenuHtml + '\n\n  ');
        }

        // Inyectar JS
        if (!content.includes('function openPanel')) {
          content = content.replace('</body>', jsDrilldown + '\n</body>');
        }

        fs.writeFileSync(fullPath, content);
        console.log('Drilldown menu applied to ' + fullPath);
      }
    });
  };
  processDirectory(path.join(projectRoot, f));
});
