const fs = require('fs');
const path = require('path');

const folders = ['co', 'mx'];

const hamburgerBtn = `        <!-- Hamburger Menu -->
        <button class="menu-toggle" id="menu-toggle" aria-label="Menu" aria-expanded="false" onclick="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </button>`;

const mobileMenuOverlay = `  <!-- MOBILE OVERLAY MENU -->
  <div class="mobile-menu-overlay" id="mobile-menu" role="dialog" aria-modal="true">
    <button class="mobile-menu-close" onclick="toggleMenu()" aria-label="Cerrar menú">✕</button>
    
    <div class="menu-content">
      <nav class="mobile-nav" aria-label="Navegación móvil">
        <a href="recaudo.html" class="mobile-link" onclick="toggleMenu()">Productos</a>
        <a href="como-funciona.html" class="mobile-link" onclick="toggleMenu()">Cómo funciona</a>
        <a href="../developers.html" class="mobile-link" onclick="toggleMenu()">Desarrolladores</a>
        <a href="#faq" class="mobile-link" onclick="toggleMenu()">FAQ</a>
        <a href="#contacto" class="mobile-link" onclick="toggleMenu()">Hablemos</a>
      </nav>
      
      <div class="mobile-cta-group" style="display:flex; flex-direction:column; gap:12px; margin-top:32px; padding-top:24px; border-top:1px solid rgba(255,255,255,0.1);">
        <a href="login.html" class="btn-text" style="text-align:center; padding:16px; font-weight:600; text-decoration:none; width:100%; justify-content:center; display:flex;" onclick="toggleMenu()">Iniciar sesión</a>
        <a href="#" class="btn-primary" style="text-align:center; padding:16px; text-decoration:none; width:100%; justify-content:center; display:flex;" onclick="toggleMenu(); openModal();">Comienza hoy</a>
      </div>
    </div>
  </div>`;

const jsScript = `
  <script>
    // Global Mobile Menu Logic
    function toggleMenu() {
      const menu = document.getElementById('mobile-menu');
      const btn = document.getElementById('menu-toggle');
      if(menu) {
        menu.classList.toggle('active');
        if(btn) btn.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
      }
    }
    // Backward compatibility
    function closeMenu() {
      toggleMenu();
    }
  </script>
`;

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // 1. Inyectar botón hamburguesa si no existe
      if (!content.includes('class="menu-toggle"')) {
        content = content.replace('Comienza hoy</button>', 'Comienza hoy</button>\n' + hamburgerBtn);
      } else {
        // Asegurarse de que tiene el onclick (los viejos a veces dependían de event listeners sueltos)
        content = content.replace(/<button class="menu-toggle" id="menu-toggle"[^>]*>/, '<button class="menu-toggle" id="menu-toggle" aria-label="Menu" onclick="toggleMenu()">');
      }

      // 2. Inyectar / Reemplazar el Overlay del menú
      if (content.includes('class="mobile-menu-overlay"')) {
        // Remover el viejo menú entero (usando Regex con precaución, mejor split/join si es un bloque grande)
        const menuStart = content.indexOf('<!-- MOBILE OVERLAY MENU -->');
        const nextTag = content.indexOf('<header', menuStart) !== -1 ? '<header' : '<section';
        const menuEnd = content.indexOf(nextTag, menuStart);
        if(menuStart !== -1 && menuEnd !== -1) {
           const oldMenuChunk = content.substring(menuStart, menuEnd);
           content = content.replace(oldMenuChunk, mobileMenuOverlay + '\n\n  ');
        }
      } else {
        // Inyectar después del nav
        content = content.replace('</nav>', '</nav>\n' + mobileMenuOverlay);
      }

      // 3. Inyectar JS al final del body si no existe
      if (!content.includes('function toggleMenu()')) {
        content = content.replace('</body>', jsScript + '\n</body>');
      }

      fs.writeFileSync(fullPath, content);
      console.log('Mobile menu integrated into ' + fullPath);
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
