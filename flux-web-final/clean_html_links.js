const fs = require('fs');
const path = require('path');

const DIRECTORIES_TO_SCAN = ['.', 'co', 'mx', 'en'];

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    // Avoid recursion into node_modules, .git, etc.
    if (file === 'node_modules' || file === '.git' || file === '.claude') return;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = walkDir(__dirname);

htmlFiles.forEach((filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // 1. Replace href="...index.html" or href="...index.html#hash"
  // href="index.html" -> href="./"
  // href="co/index.html" -> href="co/"
  // href="something/index.html#hash" -> href="something/#hash"
  content = content.replace(/(href=")([^"]*?)index\.html(#.*?)?(")/g, (match, p1, p2, p3, p4) => {
    const hash = p3 || '';
    const prefix = p2 || './';
    return `${p1}${prefix}${hash}${p4}`;
  });

  // 2. Replace other href="...something.html" or href="...something.html#hash" (excluding index.html, since we already did that)
  content = content.replace(/(href=")([^"]*?)\.html(#.*?)?(")/g, (match, p1, p2, p3, p4) => {
    const pathPart = p2;
    const hash = p3 || '';
    // If it ends with a slash or is empty, leave it
    if (pathPart.endsWith('/') || pathPart === '') {
      return match;
    }
    return `${p1}${pathPart}${hash}${p4}`;
  });

  // 3. Replace onclick="window.location.href='...index.html'" or similar
  content = content.replace(/(window\.location\.href\s*=\s*['"])([^'"]*?)index\.html(['"])/g, (match, p1, p2, p3) => {
    const prefix = p2 || './';
    return `${p1}${prefix}${p3}`;
  });

  // 4. Replace onclick="window.location.href='...something.html'"
  content = content.replace(/(window\.location\.href\s*=\s*['"])([^'"]*?)\.html(['"])/g, (match, p1, p2, p3) => {
    return `${p1}${p2}${p3}`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated links in: ${path.relative(__dirname, filePath)}`);
  }
});

console.log('Finished updating internal HTML links.');
