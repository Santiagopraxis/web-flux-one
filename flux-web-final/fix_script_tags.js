const fs = require('fs');
const path = require('path');
const folders = ['co', 'mx', 'en', '.'];
const projectRoot = __dirname;

folders.forEach(f => {
  const processDirectory = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if(f === '.' && (file === 'co' || file === 'mx' || file === 'en' || file === 'css' || file === 'js')) return; 
        processDirectory(fullPath);
      } else if (fullPath.endsWith('.html')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let changed = false;

        // Si encontramos la funcion en texto plano (sin script)
        if (content.includes('// Panel Navigation Logic') && !content.includes('<script>\n    // Panel Navigation Logic')) {
          content = content.replace('// Panel Navigation Logic', '<script>\n    // Panel Navigation Logic');
          content = content.replace('originalToggle();\n    };', 'originalToggle();\n    };\n    </script>');
          changed = true;
        }

        if (changed) {
          fs.writeFileSync(fullPath, content);
          console.log('Fixed script tags in ' + fullPath);
        }
      }
    });
  };
  processDirectory(path.join(projectRoot, f));
});
