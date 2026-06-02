const fs = require('fs');
const path = require('path');
const folders = ['co', 'mx', 'en'];
const projectRoot = __dirname;

// Este es el bloque nav-menu PERFECTO de index.html
const perfectNavMenu = `      <ul class="nav-menu">
        <li class="dropdown mega-dropdown">
          <a href="#">Productos <span>▾</span></a>
          <div class="dropdown-menu mega-menu-panel">
            <div class="mega-menu-content">
              <div class="mega-menu-phrase">
                <h3>INFRAESTRUCTURA DE NUEVA GENERACIÓN</h3>
              </div>
              <div class="mega-menu-divider"></div>
              <div class="mega-menu-list-container">
                <span class="mega-menu-subtitle">PRODUCTOS</span>
                <ul class="mega-menu-links vertical-links">
                  <li><a href="nexa.html">Nexa by fluX</a></li>
                  <li><a href="recaudo.html">Recaudo</a></li>
                  <li><a href="dispersion.html">Dispersión</a></li>
                  <li><a href="conciliacion.html">Conciliación</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        <li><a href="../developers.html">Desarrolladores</a></li>
        <li class="dropdown mega-dropdown">
          <a href="#">Recursos <span>▾</span></a>
          <div class="dropdown-menu mega-menu-panel">
            <div class="mega-menu-content">
              <div class="mega-menu-phrase">
                <h3>CONOCIMIENTO Y SOPORTE</h3>
              </div>
              <div class="mega-menu-divider"></div>
              <div class="mega-menu-list-container">
                <span class="mega-menu-subtitle">RECURSOS</span>
                <ul class="mega-menu-links vertical-links">
                  <li><a href="como-funciona.html">Cómo funciona</a></li>
                  <li><a href="#faq">Preguntas Frecuentes</a></li>
                  <li><a href="../blog">Blog</a></li>
                </ul>
              </div>
            </div>
          </div>
        </li>
        
        <!-- COUNTRY SELECTOR -->
        <li class="country-selector dropdown">
          <a href="#" id="current-country">
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/co.svg" width="18" height="13" style="border-radius:2px;vertical-align:middle;display:inline-block;" alt="CO" id="current-flag-img"> <span id="current-country-text">Col</span> <span>▾</span>
          </a>
          <ul class="dropdown-menu" style="background: #0B1121;">
            <li><a href="/co/index.html"><img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/co.svg" width="18" height="13" style="border-radius:2px;vertical-align:middle;display:inline-block;" alt="CO"> Colombia</a></li>
            <li><a href="/mx/index.html"><img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/mx.svg" width="18" height="13" style="border-radius:2px;vertical-align:middle;display:inline-block;" alt="MX"> México</a></li>
          </ul>
        </li>
      </ul>`;

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
        let changed = false;

        // Reemplazar la seccion nav-menu
        const navMenuRegex = /<ul class="nav-menu">[\s\S]*?<\/ul>\s*<div class="nav-actions">/;
        if (navMenuRegex.test(content)) {
          
          let replacement = perfectNavMenu;
          // Ajustar el país actual basado en la carpeta
          if (f === 'mx') {
            replacement = replacement.replace('id="current-flag-img"', 'id="current-flag-img" src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/mx.svg"');
            replacement = replacement.replace('<span id="current-country-text">Col</span>', '<span id="current-country-text">Méx</span>');
            // Hack para remover el src duplicado original si lo hubiera, pero es más facil solo reemplazar el string exacto:
            replacement = replacement.replace('<img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/co.svg" width="18" height="13" style="border-radius:2px;vertical-align:middle;display:inline-block;" alt="CO" id="current-flag-img">', '<img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/mx.svg" width="18" height="13" style="border-radius:2px;vertical-align:middle;display:inline-block;" alt="MX" id="current-flag-img">');
          }

          content = content.replace(navMenuRegex, replacement + '\n      <div class="nav-actions">');
          changed = true;
        }

        if (changed) {
          fs.writeFileSync(fullPath, content);
          console.log('Fixed navbar in ' + fullPath);
        }
      }
    });
  };
  processDirectory(path.join(projectRoot, f));
});
