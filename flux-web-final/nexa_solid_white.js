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
      
      const startMarker = '.navbar.scrolled { background:rgba(255,255,255,0.95) !important; border-bottom:1px solid rgba(0,0,0,0.05) !important; }';
      const endMarker = '.navbar .dropdown-menu:not(.mega-menu-panel) a:hover { color:#0F172A !important; background:#F0F4F8 !important; }';
      
      const startIndex = content.indexOf(startMarker);
      const endIndex = content.indexOf(endMarker);
      
      if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
        const properCSS = `    .navbar { background:#ffffff !important; border-bottom:1px solid rgba(0,0,0,0.05) !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
    
    .navbar .logo-blanco { display:none; }
    .navbar .logo-negro { display:block; height:32px; width:auto; }
    
    .navbar:has(.mega-dropdown:hover) { background:#050505 !important; border-bottom-color:transparent !important; }
    .navbar:has(.mega-dropdown:hover) .logo-negro { display:none !important; }
    .navbar:has(.mega-dropdown:hover) .logo-blanco { display:block !important; }

    .navbar:not(:has(.mega-dropdown:hover)) .nav-menu > li > a,
    .navbar:not(:has(.mega-dropdown:hover)) .nav-actions .btn-text { color:#0F172A !important; }
    
    .navbar:not(:has(.mega-dropdown:hover)) .nav-menu > li > a:hover,
    .navbar:not(:has(.mega-dropdown:hover)) .nav-actions .btn-text:hover { color:#009B7D !important; }

    .navbar .dropdown-menu:not(.mega-menu-panel) { background:#fff !important; border:1px solid #E2E8F0 !important; box-shadow:0 8px 24px rgba(15,23,42,0.1) !important; z-index:99999 !important; }
    .navbar .dropdown-menu:not(.mega-menu-panel) a { color:#334155 !important; }
    .navbar .dropdown-menu:not(.mega-menu-panel) a:hover { color:#0F172A !important; background:#F0F4F8 !important; }`;
        
        content = content.substring(0, startIndex) + properCSS + content.substring(endIndex + endMarker.length);
        fs.writeFileSync(fullPath, content);
        console.log('Forced Nexa Navbar to SOLID WHITE in ' + fullPath);
      } else {
        console.log('Markers not found in ' + fullPath);
      }
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
