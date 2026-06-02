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
      
      const targetStr = "/* Invertir el Mega Menu a Blanco solo en Nexa */";
      const replacementStr = `/* Navbar siempre blanco incluso en hover del mega menu */
    .navbar:has(.mega-dropdown:hover) { background: #ffffff !important; border-bottom-color: transparent !important; }
    
    /* Invertir el Mega Menu a Blanco solo en Nexa */`;

      if (content.includes(targetStr)) {
        content = content.replace(targetStr, replacementStr);
        fs.writeFileSync(fullPath, content);
        console.log('Fixed hover background in ' + fullPath);
      }
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
