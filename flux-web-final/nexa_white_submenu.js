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
      
      const startMarker = '.navbar { background:#ffffff !important; border-bottom:1px solid rgba(0,0,0,0.05) !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }';
      const endMarker = '.navbar .dropdown-menu:not(.mega-menu-panel) a:hover { color:#0F172A !important; background:#F0F4F8 !important; }';
      
      const startIndex = content.indexOf(startMarker);
      const endIndex = content.indexOf(endMarker);
      
      if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
        const properCSS = `    /* Navbar siempre blanco en Nexa */
    .navbar { background:#ffffff !important; border-bottom:1px solid rgba(0,0,0,0.05) !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
    
    /* Logo oscuro siempre */
    .navbar .logo-blanco { display:none !important; }
    .navbar .logo-negro { display:block !important; height:32px; width:auto; }

    /* Enlaces oscuros siempre */
    .navbar .nav-menu > li > a,
    .navbar .nav-actions .btn-text { color:#0F172A !important; }
    
    .navbar .nav-menu > li > a:hover,
    .navbar .nav-actions .btn-text:hover { color:#009B7D !important; }

    /* Dropdowns estandar blancos */
    .navbar .dropdown-menu { background:#ffffff !important; border:1px solid #E2E8F0 !important; box-shadow:0 8px 24px rgba(15,23,42,0.1) !important; z-index:99999 !important; }
    .navbar .dropdown-menu a { color:#334155 !important; }
    .navbar .dropdown-menu a:hover { color:#0F172A !important; background:#F0F4F8 !important; }

    /* Invertir el Mega Menu a Blanco solo en Nexa */
    .navbar .mega-menu-panel { background:#ffffff !important; border-bottom: 1px solid rgba(0,0,0,0.05) !important; }
    .navbar .mega-menu-phrase h3 { color: #0F172A !important; }
    .navbar .mega-menu-divider { background: rgba(0,0,0,0.1) !important; }
    .navbar .mega-menu-subtitle { color: #64748B !important; }
    .navbar .mega-menu-links a { color: #334155 !important; }
    .navbar .mega-menu-links a:hover { color: #009B7D !important; background: #F0F4F8 !important; }`;
        
        content = content.substring(0, startIndex) + properCSS + content.substring(endIndex + endMarker.length);
        fs.writeFileSync(fullPath, content);
        console.log('Forced Nexa Navbar and Mega Menu to SOLID WHITE in ' + fullPath);
      } else {
        console.log('Markers not found in ' + fullPath);
      }
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
