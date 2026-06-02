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

      // Inyectar CSS para re-equilibrar la cuadrícula
      const styleInsertPoint = '.nxc-phone { transition:none !important; }';
      const balanceCSS = `
    /* Balance de Grid */
    .nxc-grid { grid-template-columns: 440px 1fr !important; gap: 80px !important; max-width: 1040px !important; margin: 0 auto !important; align-items: center !important; }
    @media (max-width: 900px) {
      .nxc-grid { grid-template-columns: 1fr !important; }
    }
`;
      if (content.includes(styleInsertPoint) && !content.includes('/* Balance de Grid */')) {
        content = content.replace(styleInsertPoint, styleInsertPoint + balanceCSS);
        fs.writeFileSync(fullPath, content);
        console.log('Successfully injected balance CSS in ' + fullPath);
      } else {
        console.log('Skipped or already balanced in ' + fullPath);
      }
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
