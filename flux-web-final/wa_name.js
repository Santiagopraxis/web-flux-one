const fs = require('fs');
const path = require('path');

const folders = ['co', 'mx', 'en'];

folders.forEach(f => {
  const filePath = path.join(__dirname, f, 'nexa.html');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace('<div class="wa-name">Nexa de fluX</div>', '<div class="wa-name">Nexa - Tu Agente</div>');
    fs.writeFileSync(filePath, content);
    console.log('Fixed WhatsApp name in ' + filePath);
  }
});
