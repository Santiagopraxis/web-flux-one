const fs = require('fs');
const path = require('path');
const dirs = [path.join(__dirname, 'co'), path.join(__dirname, 'mx')];

dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    const indexPath = path.join(dir, 'index.html');
    if (fs.existsSync(indexPath)) {
      let content = fs.readFileSync(indexPath, 'utf8');
      
      // Añadir o actualizar el cache buster en el iframe de la animación
      content = content.replace(/src="eco-anim\.html(\?v=\d+)?"/g, 'src="eco-anim.html?v=' + Date.now() + '"');
      
      fs.writeFileSync(indexPath, content);
      console.log(`Cache buster aplicado al iframe en: ${indexPath}`);
    }
  }
});
