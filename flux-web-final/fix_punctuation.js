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
    } else if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      // 1. Título principal Home
      content = content.replace('PAGAR, COBRAR, DISPERSAR', 'PAGAR, COBRAR, DISPERSAR');
      
      // 2. Stats
      content = content.replace('Liquidación instantánea.<br>El dinero llega, el dinero está disponible.', 'Liquidación instantánea,<br>el dinero llega, el dinero está disponible');
      content = content.replace('Sin horarios bancarios.<br>Sin esperar al día siguiente.', 'Sin horarios bancarios,<br>sin esperar al día siguiente');
      content = content.replace('Todo el ecosistema de pagos<br>de Colombia, integrado.', 'Todo el ecosistema de pagos<br>de Colombia, integrado');
      content = content.replace('El riel de pagos instantáneos<br>del Banco de la República, nativo.', 'El riel de pagos instantáneos<br>del Banco de la República, nativo');
      
      // 3. Título Nexa en el Home
      content = content.replace('EL COBRADOR MÁS INTELIGENTE QUE HAS TENIDO.', 'EL COBRADOR MÁS INTELIGENTE QUE HAS TENIDO');
      
      // 4. Sección "EL SISTEMA COMPLETO."
      content = content.replace('EL SISTEMA COMPLETO.', 'EL SISTEMA COMPLETO');
      content = content.replace('SIN HORARIOS. SIN ESPERAS.', 'SIN HORARIOS, SIN ESPERAS');
      
      // 5. Títulos en Nexa.html
      content = content.replace('Todas las facturas.<br><strong>Un solo clic.</strong>', 'Todas las facturas,<br><strong>un solo clic</strong>');
      content = content.replace('Un agente que cobra por ti.', 'Un agente que cobra por ti');

      // Extras que puedan sentirse como exceso de puntos
      content = content.replace('Sin esperas. Sin errores. Sin límites.', 'Sin esperas, sin errores, sin límites.');
      content = content.replace('Sin tareas manuales. Sin errores. Sin perseguir facturas.', 'Sin tareas manuales, sin errores, sin perseguir facturas.');
      content = content.replace('Sin llamadas. Sin fricción.', 'Sin llamadas, sin fricción.');
      content = content.replace('Sin perseguir a nadie. Sin fricción.', 'Sin perseguir a nadie, sin fricción.');
      content = content.replace('Sin entrar a múltiples portales. Sin esperas. Sin fricciones.', 'Sin entrar a múltiples portales, sin esperas, sin fricciones.');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log('Fixed punctuation in ' + fullPath);
      }
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
