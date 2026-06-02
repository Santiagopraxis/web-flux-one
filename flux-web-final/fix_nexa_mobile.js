const fs = require('fs');
const path = require('path');
const folders = ['co', 'mx'];

folders.forEach(f => {
  const file = path.join(__dirname, f, 'index.html');
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // El texto exacto a buscar en el CSS inline
    const oldCss = `#para-quien .scrolling-right {
        width: 58%;
      }`;
      
    const newCss = `#para-quien .scrolling-right {
        width: 58%;
      }
      
      @media (max-width: 900px) {
        #para-quien .sticky-wrapper {
          flex-direction: column !important;
          gap: 24px !important;
        }
        #para-quien .sticky-left {
          width: 100% !important;
          padding-right: 0 !important;
          position: relative !important;
          text-align: center;
        }
        #para-quien .scrolling-right {
          width: 100% !important;
        }
        
        /* Ajustar subtitulo y cta para que se vean bien centrados */
        #para-quien .section-subtitle {
          margin-left: auto;
          margin-right: auto;
        }
        #para-quien .nexa-cta {
          width: 100%;
          justify-content: center;
        }
      }`;

    if (content.includes(oldCss) && !content.includes('#para-quien .sticky-wrapper {\\n          flex-direction: column !important;')) {
      content = content.replace(oldCss, newCss);
      fs.writeFileSync(file, content);
      console.log('Fixed Nexa mobile CSS in ' + file);
    } else {
      // Intento con regex más tolerante si hay diferencias en indentación
      const regex = /#para-quien .scrolling-right\s*\{\s*width:\s*58%;\s*\}/g;
      if (regex.test(content) && !content.includes('flex-direction: column !important;')) {
         content = content.replace(regex, newCss);
         fs.writeFileSync(file, content);
         console.log('Fixed Nexa mobile CSS via regex in ' + file);
      }
    }
  }
});
