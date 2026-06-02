const fs = require('fs');
const path = require('path');
const mxDir = path.join(__dirname, 'mx');

if (fs.existsSync(mxDir)) {
  const files = fs.readdirSync(mxDir).filter(f => f.endsWith('.html'));

  files.forEach(file => {
    const filePath = path.join(mxDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Fix missed isolated "Bre-B"
    const replacements = [
      { find: />Bre-B<\/span>/g, replace: '>SPEI</span>' },
      { find: /billeteras y Bre-B\./g, replace: 'billeteras y SPEI / CoDi.' },
      { find: /Bre-B, PSE y ACH/g, replace: 'SPEI, CoDi y STP' },
      { find: /label: 'BRE-B'/g, replace: "label: 'SPEI'" },
      { find: /<span>Bre-B<\/span>/g, replace: '<span>SPEI</span>' }
    ];

    replacements.forEach(r => {
      if (r.find.test(content)) {
        content = content.replace(r.find, r.replace);
        changed = true;
      }
    });

    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log(`Fijados remanentes financieros en: ${file}`);
    }
  });
}
