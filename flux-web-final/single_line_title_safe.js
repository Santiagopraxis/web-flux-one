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

      // Limpiar cualquier intento previo
      content = content.replace('white-space:nowrap;', '');
      
      const oldTitleStyle = 'margin:0 auto 20px;max-width:1000px;font-size:clamp(2.25rem,4vw,3.5rem);color:#0F172A;line-height:1.15;';
      const newTitleStyle = 'margin:0 auto 20px;width:100%;max-width:1200px;font-size:clamp(1.5rem,3.8vw,3rem);color:#0F172A;line-height:1.15;';
      
      content = content.replace(oldTitleStyle, newTitleStyle);

      // Si por alguna razon ya aplico el script anterior:
      content = content.replace('max-width:1200px;font-size:clamp(1.5rem,3.5vw,3rem);color:#0F172A;line-height:1.15;', newTitleStyle);

      // Asegurarnos que en desktop se vea en una linea forzada via CSS (usando un media query en el bloque <style> que ya inyectamos)
      const styleInsert = '.nxc-phone { transition:none !important; }';
      const singleLineCSS = `
    @media (min-width: 768px) {
      .nx-title-single { white-space: nowrap !important; }
    }
`;
      if (content.includes(styleInsert) && !content.includes('.nx-title-single')) {
        content = content.replace(styleInsert, styleInsert + singleLineCSS);
      }
      
      // Aplicar la clase al h2
      content = content.replace('<h2 class="nx-title"', '<h2 class="nx-title nx-title-single"');

      fs.writeFileSync(fullPath, content);
      console.log('Fixed title safe single line in ' + fullPath);
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
