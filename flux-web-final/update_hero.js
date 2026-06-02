const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'co', 'index.html');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Reemplazar Eyebrow actual por el nuevo
content = content.replace(
  '¿Y si todo fuera más fácil?<br>Pagar, cobrar, dispersar.', 
  '¿Y si todo fuera más fácil?'
);

// 2. Reemplazar el H1 actual por el nuevo título (manteniendo la clase original)
// Título viejo: Pagos <span class="text-grad">inteligentes</span> para empresas que no se detienen
const oldTitle = 'Pagos <span class="text-grad">inteligentes</span> para empresas que no se detienen';
const newTitle = 'PAGAR, COBRAR, DISPERSAR';
content = content.replace(oldTitle, newTitle);

// 3. El subtítulo "Recauda, dispersa, concilia..." ya es el mismo, así que no se toca.

fs.writeFileSync(targetFile, content);
console.log('Successfully updated Hero hierarchy in co/index.html');
