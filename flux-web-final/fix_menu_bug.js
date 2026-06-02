const fs = require('fs');
const path = require('path');
const folders = ['co', 'mx'];

folders.forEach(f => {
  const processDirectory = (dir) => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        processDirectory(fullPath);
      } else if (fullPath.endsWith('.html')) {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // El problema es que el botón tiene onclick="toggleMenu()" 
        // pero js/main.js también tiene un event listener, causando un doble toggle inmediato.
        // Vamos a remover el onclick solo del botón hamburguesa.
        const badBtn1 = '<button class="menu-toggle" id="menu-toggle" aria-label="Menu" onclick="toggleMenu()">';
        const goodBtn1 = '<button class="menu-toggle" id="menu-toggle" aria-label="Menu">';
        
        const badBtn2 = '<button class="menu-toggle" id="menu-toggle" aria-label="Menu" aria-expanded="false" onclick="toggleMenu()">';
        const goodBtn2 = '<button class="menu-toggle" id="menu-toggle" aria-label="Menu" aria-expanded="false">';
        
        let changed = false;
        if (content.includes(badBtn1)) {
          content = content.replace(badBtn1, goodBtn1);
          changed = true;
        }
        if (content.includes(badBtn2)) {
          content = content.replace(badBtn2, goodBtn2);
          changed = true;
        }
        
        if (changed) {
          fs.writeFileSync(fullPath, content);
          console.log('Fixed double-toggle bug in ' + fullPath);
        }
      }
    });
  };
  processDirectory(path.join(__dirname, f));
});
