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

      // 1. Remove the extra </div> that broke the layout
      content = content.replace(/<\/div>\s*<\/div>\s*<div class="nx-sep-line"/g, '</div>\n          <div class="nx-sep-line"');

      // 2. Replace the buttons with SVG versions and set Claro as active
      const btnRegex = /<button class="nxc-toggle[^>]*id="nxc-dark-btn"[^>]*>Oscuro<\/button>\s*<button class="nxc-toggle[^>]*id="nxc-light-btn"[^>]*>Claro<\/button>/;
      
      const newButtons = `<button class="nxc-toggle" id="nxc-dark-btn" onclick="setMode('dark')" style="display:flex;align-items:center;justify-content:center;gap:6px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> Oscuro
              </button>
              <button class="nxc-toggle active" id="nxc-light-btn" onclick="setMode('light')" style="display:flex;align-items:center;justify-content:center;gap:6px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> Claro
              </button>`;

      content = content.replace(btnRegex, newButtons);

      // 3. Make sure brandMode is light
      content = content.replace("var brandMode = 'dark';", "var brandMode = 'light';");

      fs.writeFileSync(fullPath, content);
      console.log('Fixed layout and buttons in ' + fullPath);
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
