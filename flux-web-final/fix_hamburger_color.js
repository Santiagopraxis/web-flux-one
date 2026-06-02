const fs = require('fs');
const path = require('path');
const cssFile = path.join(__dirname, 'css', 'styles.css');

let styles = fs.readFileSync(cssFile, 'utf8');

// Remover el hack global defectuoso
styles = styles.replace('.navbar .menu-toggle span { background-color: #0F172A; }', 
  '.navbar .menu-toggle span { background-color: #ffffff; }\nbody.nexa-page .navbar:not(.scrolled) .menu-toggle span { background-color: #0F172A !important; }');

fs.writeFileSync(cssFile, styles);
console.log('Fixed hamburger CSS in styles.css');

// Añadir clase nexa-page a nexa.html
const nexaFiles = [
  path.join(__dirname, 'co', 'nexa.html'),
  path.join(__dirname, 'mx', 'nexa.html')
];

nexaFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('<body class="nexa-page"')) {
      content = content.replace('<body>', '<body class="nexa-page">');
      fs.writeFileSync(file, content);
      console.log('Added body class to ' + file);
    }
  }
});
