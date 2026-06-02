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
        if(f === '.' && (file === 'co' || file === 'mx' || file === 'en' || file === 'css' || file === 'js')) return; // Skip these if processing root
        processDirectory(fullPath);
      } else if (fullPath.endsWith('.html')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let changed = false;
        
        // Cache buster for styles.css
        // Reemplaza "?v=ultra_v64" o similar por la nueva version
        const cssRegex = /href="([^"]*?)styles\.css(\?v=[^"]*)?"/g;
        if (cssRegex.test(content)) {
          content = content.replace(cssRegex, 'href="$1styles.css?v=ultra_v66"');
          changed = true;
        }

        if (changed) {
          fs.writeFileSync(fullPath, content);
          console.log('Cache buster applied to ' + fullPath);
        }
      }
    });
  };
  processDirectory(path.join(projectRoot, f));
});
