const fs = require('fs');
const path = require('path');
const mxDir = path.join(__dirname, 'mx');

if (fs.existsSync(mxDir)) {
  const files = fs.readdirSync(mxDir).filter(f => f.endsWith('.html'));

  files.forEach(file => {
    const filePath = path.join(mxDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Regex super agresivo para cazar la bandera mexicana dentro del enlace de Colombia
    const regexBrokenFlag = /<a href="\/co\/[^"]*">[\s\S]*?<img[^>]*src="[^"]*mx\.svg"[^>]*alt="CO"[\s\S]*?>\s*Colombia\s*<\/a>/g;
    
    if (regexBrokenFlag.test(content)) {
      content = content.replace(regexBrokenFlag, (match) => {
        // Reemplazar mx.svg por co.svg SOLO dentro de este bloque
        return match.replace('mx.svg', 'co.svg');
      });
      changed = true;
    }

    // Verificar si en el Dropdown de México se cambió el texto "México" por "Méx"
    // (Por culpa del script global)
    // '<span id="current-country-text">Col</span>', '<span id="current-country-text">Méx</span>'

    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log(`Bandera forzada con éxito en: ${file}`);
    }
  });
}
