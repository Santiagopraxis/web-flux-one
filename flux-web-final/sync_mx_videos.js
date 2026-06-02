const fs = require('fs');
const path = require('path');

const srcVideoFolderCO = 'E:\\PRAXIS\\FLUX\\VIDEO_OUTPUT\\CO';
const srcVideoFolderMX = 'E:\\PRAXIS\\FLUX\\VIDEO_OUTPUT\\MX';
const destVideoFolder = path.join(__dirname, 'assets', 'videos');
const destCO = path.join(destVideoFolder, 'co');
const destMX = path.join(destVideoFolder, 'mx');

// 1. Crear carpetas si no existen
if (!fs.existsSync(destCO)) fs.mkdirSync(destCO, { recursive: true });
if (!fs.existsSync(destMX)) fs.mkdirSync(destMX, { recursive: true });

// 2. Copiar Videos
const copyVideos = (srcFolder, targetFolder) => {
  if (fs.existsSync(srcFolder)) {
    const files = fs.readdirSync(srcFolder);
    files.forEach(file => {
      if (file.endsWith('.mp4')) {
        fs.copyFileSync(path.join(srcFolder, file), path.join(targetFolder, file));
        console.log(`Copiado: ${file} a ${targetFolder}`);
      }
    });
  } else {
    console.log(`Ruta origen de video no encontrada: ${srcFolder}`);
  }
};
copyVideos(srcVideoFolderCO, destCO);
copyVideos(srcVideoFolderMX, destMX);

// 3. Sincronizar HTML: Clonar CO a MX y Traducir
const coDir = path.join(__dirname, 'co');
const mxDir = path.join(__dirname, 'mx');

const filesToSync = fs.readdirSync(coDir).filter(f => f.endsWith('.html'));

filesToSync.forEach(file => {
  const coPath = path.join(coDir, file);
  const mxPath = path.join(mxDir, file);
  
  // Clonar archivo de CO a MX para sincronizar layouts y estructuras
  let content = fs.readFileSync(coPath, 'utf8');

  // TRADUCCIONES PARA MÉXICO (Mapeo Cuidadoso)
  // Banderas (Navbar, Footer, etc)
  content = content.replace(/co\.svg/g, 'mx.svg');
  // Selector de Navbar
  content = content.replace(/<span id="current-country-text">Col<\/span>/g, '<span id="current-country-text">Méx</span>');
  
  // Terminología Financiera (De Colombia a México)
  content = content.replace(/Bre-B \/ PSE/g, 'SPEI / CoDi');
  content = content.replace(/PSE\/Bre-B/g, 'SPEI/CoDi');
  content = content.replace(/<span class="badge-new-sml">PSE<\/span>/g, '<span class="badge-new-sml">SPEI</span>');
  content = content.replace(/TX anuales en PSE/g, 'TX anuales en SPEI');
  // Enlaces de videos en MX
  content = content.replace(/src="\.\.\/assets\/videos\//g, 'src="../assets/videos/mx/');
  
  fs.writeFileSync(mxPath, content);
  console.log(`Sincronizado y Traducido: ${file} a MX`);

  // 4. Actualizar rutas de video en CO (ya que el loop recorre todo)
  let coContent = fs.readFileSync(coPath, 'utf8');
  coContent = coContent.replace(/src="\.\.\/assets\/videos\/([^m][^x][^\/])/g, 'src="../assets/videos/co/$1'); // El regex evita tocar 'mx/' o 'co/'
  // Manera más segura:
  coContent = coContent.replace(/src="\.\.\/assets\/videos\/(?!co\/|mx\/)/g, 'src="../assets/videos/co/');
  fs.writeFileSync(coPath, coContent);
  console.log(`Videos regionalizados en CO: ${file}`);
});
