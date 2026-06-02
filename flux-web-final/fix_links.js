const fs = require('fs');
const path = require('path');

const folders = ['co', 'mx'];

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Fix literal backslashes injected by mistake previously
      const bugStr = 'onclick="window.location.href=\\\'login.html\\\'"';
      const fixStr = 'onclick="window.location.href=\'login.html\'"';
      
      if (content.includes(bugStr)) {
        // Global replace
        content = content.split(bugStr).join(fixStr);
        fs.writeFileSync(fullPath, content);
        console.log('Fixed button link in ' + fullPath);
      }
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
