const fs = require('fs');
const path = require('path');

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      if (file !== '.git' && file !== 'node_modules') {
        walk(path.join(dir, file), fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const files = walk('.');
let fixedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // The regex targets the duplicated block that follows the country-selector's closing tags.
  // It matches:
  // </ul>
  // </li>
  // <li><a href="/mx/index.html"><img src="...mx.svg"...> Mxico</a></li>
  // </ul>
  // </li>
  // 
  // We want to KEEP the first </ul> and </li>, and REMOVE the rest up to the next </li>.
  
  const regex = /(<\/ul>\s*<\/li>)\s*<li>\s*<a[^>]*mx\.svg[^>]*>.*?<\/a>\s*<\/li>\s*<\/ul>\s*<\/li>/g;
  content = content.replace(regex, '$1');

  // Also handle en/mx.html variation: href="/en/mx.html" or href="../mx/index.html"
  const regex2 = /(<\/ul>\s*<\/li>)\s*<li>\s*<a[^>]*mx\.svg[^>]*>.*?<\/a>\s*<\/li>/g;
  
  // Wait, let's just make it robust. Any list item with mx.svg right after the country-selector </li>.
  // And the trailing </ul></li> that are orphans.
  // Actually, let's look for exactly what we saw in the terminal:
  const badPattern = /<li><a href="[^"]*mx[^"]*"><img src="[^"]*mx\.svg[^>]*>.*?<\/a><\/li>\s*<\/ul>\s*<\/li>/g;
  
  // Wait! If the original code is:
  // </ul>
  // </li>
  // <li><a href="/mx/index.html"><img ...> Mxico</a></li>
  // </ul>
  // </li>
  //
  // We can just replace the whole mess starting from the correct </li>.
  
  content = content.replace(/(\s*)<\/ul>\s*<\/li>\s*<li><a href="[^"]*"><img src="[^"]*flags\/4x3\/mx\.svg[^>]*>.*?<\/a><\/li>\s*<\/ul>\s*<\/li>/g, '$1</ul>\n        </li>');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    fixedCount++;
    console.log('Fixed:', file);
  }
});

console.log('Total files fixed:', fixedCount);
