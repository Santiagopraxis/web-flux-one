const fs = require('fs');
const path = require('path');
const mxDir = path.join(__dirname, 'mx');

if (fs.existsSync(mxDir)) {
  const files = fs.readdirSync(mxDir).filter(f => f.endsWith('.html'));

  files.forEach(file => {
    const filePath = path.join(mxDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Arreglar bandera de Colombia en el dropdown
    const brokenColombiaOption = '<img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/mx.svg" width="18" height="13" style="border-radius:2px;vertical-align:middle;display:inline-block;" alt="CO"> Colombia';
    const fixedColombiaOption = '<img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/co.svg" width="18" height="13" style="border-radius:2px;vertical-align:middle;display:inline-block;" alt="CO"> Colombia';

    if (content.includes(brokenColombiaOption)) {
      content = content.replace(new RegExp(brokenColombiaOption.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), fixedColombiaOption);
      changed = true;
    }

    // Traducir gentilicios y entidades
    const replacements = [
      { find: /colombianos/g, replace: 'mexicanos' },
      { find: /Superintendencia Financiera de Colombia \(SFC\)/g, replace: 'Comisión Nacional Bancaria y de Valores (CNBV)' },
      { find: /Superintendencia Financiera de Colombia/g, replace: 'Comisión Nacional Bancaria y de Valores' }
    ];

    replacements.forEach(r => {
      if (r.find.test(content)) {
        content = content.replace(r.find, r.replace);
        changed = true;
      }
    });

    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log(`Corregido bandera y entidades en MX: ${file}`);
    }
  });
}
