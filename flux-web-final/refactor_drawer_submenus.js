const fs = require('fs');
const path = require('path');
const folders = ['co', 'mx'];
const projectRoot = __dirname;
const cssFile = path.join(projectRoot, 'css', 'styles.css');

// 1. Modificar CSS: Ajustar logo e inyectar estilos de acordeón
if (fs.existsSync(cssFile)) {
  let styles = fs.readFileSync(cssFile, 'utf8');
  
  // Ajuste logo (reducir altura de 24 a 14)
  if (styles.includes('height: 24px;')) {
    // Solo cambiar el del mobile-drawer-logo
    styles = styles.replace(/\.mobile-drawer-logo\s*\{\s*height:\s*24px;/g, '.mobile-drawer-logo {\n  height: 14px;');
  }

  // Estilos del Acordeón
  const accordionCSS = `
/* Acordeones del Drawer */
.mobile-accordion {
  display: flex;
  flex-direction: column;
}
.mobile-accordion-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 300;
  color: #ffffff;
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  width: 100%;
  text-align: left;
}
.mobile-accordion-icon {
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  transition: transform 0.3s;
}
.mobile-accordion.open .mobile-accordion-icon {
  transform: rotate(180deg);
}
.mobile-accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 16px; /* indentación */
  border-left: 1px solid rgba(255,255,255,0.1);
  margin-left: 8px;
}
.mobile-accordion.open .mobile-accordion-content {
  margin-top: 16px;
}
.mobile-sublink {
  font-size: 1.15rem;
  font-weight: 300;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
}
.mobile-sublink:hover { color: #ffffff; }
`;
  if (!styles.includes('.mobile-accordion-btn')) {
    styles += '\n' + accordionCSS;
  }
  
  fs.writeFileSync(cssFile, styles);
  console.log('Drawer CSS updated (Logo size & Accordions)');
}

// 2. Nueva estructura HTML del nav
const newNavHtml = `      <nav class="mobile-nav" aria-label="Navegación móvil">
        
        <!-- Acordeón Productos -->
        <div class="mobile-accordion">
          <button class="mobile-accordion-btn" onclick="toggleAccordion(this)">
            Productos <span class="mobile-accordion-icon">▼</span>
          </button>
          <div class="mobile-accordion-content">
            <a href="nexa.html" class="mobile-sublink" onclick="toggleMenu()">Nexa</a>
            <a href="recaudo.html" class="mobile-sublink" onclick="toggleMenu()">Recaudo</a>
            <a href="dispersion.html" class="mobile-sublink" onclick="toggleMenu()">Dispersión</a>
            <a href="conciliacion.html" class="mobile-sublink" onclick="toggleMenu()">Conciliación</a>
          </div>
        </div>

        <!-- Acordeón Recursos -->
        <div class="mobile-accordion">
          <button class="mobile-accordion-btn" onclick="toggleAccordion(this)">
            Recursos <span class="mobile-accordion-icon">▼</span>
          </button>
          <div class="mobile-accordion-content">
            <a href="como-funciona.html" class="mobile-sublink" onclick="toggleMenu()">Cómo funciona</a>
            <a href="#faq" class="mobile-sublink" onclick="toggleMenu()">FAQ</a>
            <a href="../blog" class="mobile-sublink" onclick="toggleMenu()">Blog</a>
          </div>
        </div>

        <!-- Links directos -->
        <a href="../developers.html" class="mobile-link" style="opacity:1; transform:none;" onclick="toggleMenu()">Desarrolladores</a>
        <a href="#contacto" class="mobile-link" style="opacity:1; transform:none;" onclick="toggleMenu()">Hablemos</a>
      </nav>`;

const jsAccordion = `
    function toggleAccordion(btn) {
      const accordion = btn.parentElement;
      const content = accordion.querySelector('.mobile-accordion-content');
      const isOpen = accordion.classList.contains('open');
      
      // Cerrar otros si queremos (opcional, aquí permitimos abrir múltiples)
      
      if (isOpen) {
        accordion.classList.remove('open');
        content.style.maxHeight = null;
      } else {
        accordion.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 16 + "px"; // 16 por el margin top simulado
      }
    }
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
        
        // Reemplazar la navegacion vieja
        const navRegex = /<nav class="mobile-nav"[\s\S]*?<\/nav>/;
        if (navRegex.test(content)) {
          content = content.replace(navRegex, newNavHtml);
        }
        
        // Inyectar el script del accordion si no existe
        if (!content.includes('function toggleAccordion')) {
          content = content.replace('function toggleMenu()', jsAccordion + '\n    function toggleMenu()');
        }
        
        fs.writeFileSync(fullPath, content);
      }
    });
  };
  processDirectory(path.join(projectRoot, f));
});
console.log('Mobile submenus structured applied.');
