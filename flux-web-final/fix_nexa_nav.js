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
      
      const targetCSS = `.navbar.scrolled .logo-negro  { display:none; }
    .navbar.scrolled .logo-blanco { display:block; }
    .navbar:not(.scrolled) .nav-menu > li > a,
    .navbar:not(.scrolled) .nav-actions .btn-text { color:#0F172A; }
    .navbar:not(.scrolled) .nav-menu > li > a:hover,
    .navbar:not(.scrolled) .nav-actions .btn-text:hover { color:#009B7D; }
    .navbar:not(.scrolled) .dropdown-menu { background:#fff !important; border:1px solid #E2E8F0 !important; box-shadow:0 8px 24px rgba(15,23,42,0.1) !important; z-index:99999 !important; }
    .navbar:not(.scrolled) .dropdown-menu a { color:#334155 !important; }
    .navbar:not(.scrolled) .dropdown-menu a:hover { color:#0F172A !important; background:#F0F4F8 !important; }`;

      const replacementCSS = `.navbar.scrolled .logo-negro, .navbar:has(.mega-dropdown:hover) .logo-negro { display:none; }
    .navbar.scrolled .logo-blanco, .navbar:has(.mega-dropdown:hover) .logo-blanco { display:block; }
    .navbar:not(.scrolled):not(:has(.mega-dropdown:hover)) .nav-menu > li > a,
    .navbar:not(.scrolled):not(:has(.mega-dropdown:hover)) .nav-actions .btn-text { color:#0F172A; }
    .navbar:not(.scrolled):not(:has(.mega-dropdown:hover)) .nav-menu > li > a:hover,
    .navbar:not(.scrolled):not(:has(.mega-dropdown:hover)) .nav-actions .btn-text:hover { color:#009B7D; }
    .navbar:not(.scrolled) .dropdown-menu:not(.mega-menu-panel) { background:#fff !important; border:1px solid #E2E8F0 !important; box-shadow:0 8px 24px rgba(15,23,42,0.1) !important; z-index:99999 !important; }
    .navbar:not(.scrolled) .dropdown-menu:not(.mega-menu-panel) a { color:#334155 !important; }
    .navbar:not(.scrolled) .dropdown-menu:not(.mega-menu-panel) a:hover { color:#0F172A !important; background:#F0F4F8 !important; }`;

      if (content.includes(targetCSS)) {
        content = content.replace(targetCSS, replacementCSS);
        fs.writeFileSync(fullPath, content);
        console.log('Fixed CSS in ' + fullPath);
      } else {
        console.log('Could not find target CSS in ' + fullPath);
      }
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
