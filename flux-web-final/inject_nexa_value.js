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
    } else if (fullPath.endsWith('nexa.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      const targetParagraph = '<p class="nx-desc" style="margin:0 auto;text-align:center;max-width:580px;color:#475569;">Nexa se adapta completamente a la identidad visual de tu empresa. Tus usuarios nunca saben que hay un motor fluX detrás — solo ven tu marca en acción.</p>';
      
      const valueGridHTML = `
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:24px; margin: 60px auto; max-width:1080px; text-align:left;">
          
          <div style="background:#ffffff; border:1px solid #E2E8F0; padding:24px; border-radius:16px; box-shadow:0 4px 20px rgba(15,23,42,0.03); transition:transform 0.3s; cursor:default;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
            <div style="width:40px; height:40px; border-radius:10px; background:rgba(0,184,148,0.1); display:flex; align-items:center; justify-content:center; margin-bottom:16px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00B894" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z"/></svg>
            </div>
            <h3 style="font-size:1.125rem; color:#0F172A; font-weight:600; margin-bottom:8px;">Identidad Absoluta</h3>
            <p style="font-size:0.875rem; color:#475569; line-height:1.6; margin:0;">Tu app lleva tu nombre, tu logo y tus colores. Tus usuarios interactúan contigo, no con un tercero.</p>
          </div>

          <div style="background:#ffffff; border:1px solid #E2E8F0; padding:24px; border-radius:16px; box-shadow:0 4px 20px rgba(15,23,42,0.03); transition:transform 0.3s; cursor:default;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
            <div style="width:40px; height:40px; border-radius:10px; background:rgba(37,99,235,0.1); display:flex; align-items:center; justify-content:center; margin-bottom:16px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </div>
            <h3 style="font-size:1.125rem; color:#0F172A; font-weight:600; margin-bottom:8px;">Ecosistema Modular</h3>
            <p style="font-size:0.875rem; color:#475569; line-height:1.6; margin:0;">Activa únicamente los servicios que tu negocio necesita, desde pagos hasta recargas de movilidad.</p>
          </div>

          <div style="background:#ffffff; border:1px solid #E2E8F0; padding:24px; border-radius:16px; box-shadow:0 4px 20px rgba(15,23,42,0.03); transition:transform 0.3s; cursor:default;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
            <div style="width:40px; height:40px; border-radius:10px; background:rgba(245,158,11,0.1); display:flex; align-items:center; justify-content:center; margin-bottom:16px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h3 style="font-size:1.125rem; color:#0F172A; font-weight:600; margin-bottom:8px;">Time-to-Market</h3>
            <p style="font-size:0.875rem; color:#475569; line-height:1.6; margin:0;">Sin meses de desarrollo ni altos costos de ingeniería. Tecnología lista para salir a producción.</p>
          </div>

          <div style="background:#ffffff; border:1px solid #E2E8F0; padding:24px; border-radius:16px; box-shadow:0 4px 20px rgba(15,23,42,0.03); transition:transform 0.3s; cursor:default;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
            <div style="width:40px; height:40px; border-radius:10px; background:rgba(0,184,148,0.1); display:flex; align-items:center; justify-content:center; margin-bottom:16px;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00B894" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>
            </div>
            <h3 style="font-size:1.125rem; color:#0F172A; font-weight:600; margin-bottom:8px;">Seguridad Bancaria</h3>
            <p style="font-size:0.875rem; color:#475569; line-height:1.6; margin:0;">Conciliación automática, seguridad ISO 27001 y procesamiento en tiempo real integrado.</p>
          </div>

        </div>
`;

      if (content.includes(targetParagraph) && !content.includes('Identidad Absoluta')) {
        content = content.replace(targetParagraph, targetParagraph + '\n' + valueGridHTML);
        fs.writeFileSync(fullPath, content);
        console.log('Inyectadas las tarjetas de valor en ' + fullPath);
      } else {
        console.log('No se inyectó en ' + fullPath + ' (Ya existen o no se encontró el target)');
      }
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
