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
    } else if (fullPath.endsWith('index.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const targetStr = "{ rootMargin: '0px 0px 300px 0px' }";
      const replacementStr = "{ rootMargin: '0px 0px 1200px 0px' }";

      if (content.includes(targetStr)) {
        content = content.replace(targetStr, replacementStr);
        fs.writeFileSync(fullPath, content);
        console.log('Fixed video preload margin in ' + fullPath);
      }
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
