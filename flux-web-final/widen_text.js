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

      // Expand the title width
      content = content.replace('max-width:600px;', 'max-width:1000px;');
      
      // Expand the description width
      content = content.replace('max-width:580px;', 'max-width:800px;font-size:1.1rem;');

      fs.writeFileSync(fullPath, content);
      console.log('Expanded text widths in ' + fullPath);
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
