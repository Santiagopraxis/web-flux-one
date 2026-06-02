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

      // Buscar el título y quitar el max-width, además de bajar levemente el font-size máximo para que quepa en una línea
      const oldTitleStyle = 'margin:0 auto 20px;max-width:1000px;font-size:clamp(2.25rem,4vw,3.5rem);color:#0F172A;line-height:1.15;';
      const newTitleStyle = 'margin:0 auto 20px;max-width:1200px;font-size:clamp(1.5rem,3.5vw,3rem);color:#0F172A;line-height:1.15;white-space:nowrap;';
      
      content = content.replace(oldTitleStyle, newTitleStyle);
      
      // Just in case it was already something else
      content = content.replace('max-width:1000px;font-size:clamp(2.25rem,4vw,3.5rem);', 'max-width:1200px;font-size:clamp(1.5rem,3.5vw,3.2rem);white-space:nowrap;');

      fs.writeFileSync(fullPath, content);
      console.log('Fixed title to single line in ' + fullPath);
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
