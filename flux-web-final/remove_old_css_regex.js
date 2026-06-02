const fs = require('fs');
const path = require('path');
const cssFile = path.join(__dirname, 'css', 'styles.css');

let styles = fs.readFileSync(cssFile, 'utf8');
const lines = styles.split(/\r?\n/);

let startIdx = -1;
let endIdx = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].match(/Mobile Menu Toggle/i)) {
    startIdx = i;
  }
  if (lines[i].match(/Badges/i) && i > startIdx && startIdx !== -1) {
    endIdx = i;
    break;
  }
}

if (startIdx !== -1 && endIdx !== -1) {
  lines.splice(startIdx, endIdx - startIdx);
  fs.writeFileSync(cssFile, lines.join('\n'));
  console.log('Removed old mobile CSS by regex match on lines: ' + startIdx + ' to ' + endIdx);
} else {
  console.log('Could not find markers', startIdx, endIdx);
}
