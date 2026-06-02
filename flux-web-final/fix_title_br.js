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

      // Remover el <br> que estaba forzando el salto de línea en el título
      content = content.replace('Tu marca.<br><strong>Nuestra tecnología.</strong>', 'Tu marca. <strong>Nuestra tecnología.</strong>');

      fs.writeFileSync(fullPath, content);
      console.log('Fixed title break in ' + fullPath);
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
