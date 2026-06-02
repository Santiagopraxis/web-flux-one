const fs = require('fs');
const path = require('path');

const folders = ['co', 'mx', 'en'];

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('nexa.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // 1. Quitar Agente WhatsApp
      const waStart = '<!-- Agente de WhatsApp Placeholder -->';
      const waSearchPhrase = 'Espacio reservado para Agente WhatsApp';
      const waMiddleIndex = content.indexOf(waSearchPhrase);
      
      if (content.includes(waStart) && waMiddleIndex !== -1) {
        const waEndIndex = content.indexOf('</div>', waMiddleIndex) + 6;
        content = content.substring(0, content.indexOf(waStart)) + content.substring(waEndIndex);
      }

      // 2. Sombra de la app más suave
      const oldShadow = '.nxc-phone { width:300px; border-radius:36px; padding:16px 16px 24px; box-shadow:0 32px 64px rgba(0,0,0,0.5); transition:background 0.4s,border-color 0.4s; }';
      const newShadow = '.nxc-phone { width:300px; border-radius:36px; padding:16px 16px 24px; box-shadow:0 24px 48px rgba(15,23,42,0.12); transition:background 0.4s,border-color 0.4s; }';
      content = content.replace(oldShadow, newShadow);

      // 3. Empiece en claro
      content = content.replace("var brandMode = 'dark';", "var brandMode = 'light';");

      // 4. Iconos sol/luna y botones
      const oldButtons = `<button class="nxc-toggle active" id="nxc-dark-btn" onclick="setMode('dark')">Oscuro</button>
              <button class="nxc-toggle" id="nxc-light-btn" onclick="setMode('light')">Claro</button>`;
      
      const newButtons = `<button class="nxc-toggle" id="nxc-dark-btn" onclick="setMode('dark')" style="display:flex;align-items:center;justify-content:center;gap:6px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> Oscuro
              </button>
              <button class="nxc-toggle active" id="nxc-light-btn" onclick="setMode('light')" style="display:flex;align-items:center;justify-content:center;gap:6px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> Claro
              </button>`;
              
      content = content.replace(oldButtons, newButtons);

      fs.writeFileSync(fullPath, content);
      console.log('Successfully tweaked UI in ' + fullPath);
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
