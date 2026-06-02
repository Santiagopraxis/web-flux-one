const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const folders = ['co', 'mx', 'en'];

let errors = [];

function checkFileExists(filePath, context) {
  if (!fs.existsSync(filePath)) {
    errors.push(`Broken link/image in ${context}: ${filePath}`);
  }
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // 1. Check Duplicate IDs
      const idMatches = content.match(/id="([^"]+)"/g) || [];
      const ids = idMatches.map(m => m.replace('id="', '').replace('"', ''));
      const idCounts = {};
      ids.forEach(id => {
        idCounts[id] = (idCounts[id] || 0) + 1;
        if (idCounts[id] === 2) {
          errors.push(`Duplicate ID '${id}' found in ${fullPath.replace(rootDir, '')}`);
        }
      });

      // 2. Check local images
      const imgMatches = content.match(/<img[^>]+src="([^"]+)"/g) || [];
      imgMatches.forEach(imgStr => {
        const src = imgStr.match(/src="([^"]+)"/)[1];
        if (src && !src.startsWith('http') && !src.startsWith('data:')) {
          // Resolve path
          // If it starts with '../assets', resolve from current dir
          const assetPath = path.resolve(dir, src);
          checkFileExists(assetPath, fullPath.replace(rootDir, ''));
        }
      });

      // 3. Check local links
      const aMatches = content.match(/<a[^>]+href="([^"]+)"/g) || [];
      aMatches.forEach(aStr => {
        const href = aStr.match(/href="([^"]+)"/)[1];
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
          // Handle query params or hashes in local links
          const cleanHref = href.split('#')[0].split('?')[0];
          if (cleanHref) {
            const linkPath = path.resolve(dir, cleanHref);
            checkFileExists(linkPath, fullPath.replace(rootDir, ''));
          }
        }
      });
    }
  });
}

folders.forEach(f => processDirectory(path.join(rootDir, f)));

if (errors.length > 0) {
  console.log("=== BUGS FOUND ===");
  errors.forEach(e => console.log(e));
} else {
  console.log("=== NO OBVIOUS BUGS FOUND ===");
}
