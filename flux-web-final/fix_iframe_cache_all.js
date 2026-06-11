const fs = require('fs');
const path = require('path');
const folders = ['co', 'mx', 'en', '.'];
const projectRoot = __dirname;
const ts = Date.now();

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
        
        // Match src="eco-anim.html" or src="eco-anim.html?v=something"
        const regex = /src="eco-anim\.html(\?v=[^"]*)?"/g;
        if (regex.test(content)) {
          content = content.replace(regex, 'src="eco-anim.html?v=' + ts + '"');
          changed = true;
        }

        if (changed) {
          fs.writeFileSync(fullPath, content);
          console.log('Iframe cache buster applied to ' + fullPath);
        }
      }
    });
  };
  processDirectory(path.join(projectRoot, f));
});
