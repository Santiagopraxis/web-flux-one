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

      // 1. Eliminar la sección "White Label" completa
      const wlStart = '<!-- WHITE LABEL -->';
      const wlEnd = '<!-- BRAND CONFIGURATOR';
      
      const wlStartIndex = content.indexOf(wlStart);
      const wlEndIndex = content.indexOf(wlEnd);
      
      if (wlStartIndex !== -1 && wlEndIndex !== -1 && wlStartIndex < wlEndIndex) {
        content = content.substring(0, wlStartIndex) + content.substring(wlEndIndex);
      }

      // 2. Reemplazar el header del configurador por el texto de la sección de marca
      const confHeaderStart = '<div style="text-align:center;margin-bottom:60px;" class="nx-fade-up">';
      const confHeaderEnd = '</div>\n      <div class="nxc-grid">';
      
      const headStartIndex = content.indexOf(confHeaderStart);
      const headEndIndex = content.indexOf(confHeaderEnd);

      if (headStartIndex !== -1 && headEndIndex !== -1) {
        const newHeader = `<style>
    /* Forzar modo claro en el configurador */
    .nxc-section { background:#ffffff !important; padding:120px 0 !important; }
    .nxc-controls { background:#ffffff !important; border:1px solid #E2E8F0 !important; box-shadow:0 24px 48px rgba(15,23,42,0.05) !important; }
    .nxc-label { color:#64748B !important; }
    .nxc-input { background:#F8FAFC !important; border:1px solid #E2E8F0 !important; color:#0F172A !important; -webkit-text-fill-color:#0F172A !important; }
    .nxc-input:focus { border-color:#00B894 !important; background:#ffffff !important; box-shadow:0 0 0 3px rgba(0,184,148,0.1) !important; }
    .nxc-input::placeholder { color:#94A3B8 !important; -webkit-text-fill-color:#94A3B8 !important; }
    .nxc-icon-upload-label { background:#F8FAFC !important; border:1px dashed #CBD5E1 !important; color:#475569 !important; }
    .nxc-color { border-color:#E2E8F0 !important; }
    .nxc-preset { border-color:#E2E8F0 !important; }
    .nxc-toggle-row { gap:0 !important; padding:4px !important; background:#F1F5F9 !important; border-radius:12px !important; border:1px solid #E2E8F0 !important; }
    .nxc-toggle { color:#64748B !important; border:none !important; }
    .nxc-toggle.active { background:#ffffff !important; color:#00B894 !important; box-shadow:0 2px 8px rgba(15,23,42,0.05) !important; border-radius:8px !important; border:none !important; }
    .nx-sep-line { border-top:1px solid #E2E8F0 !important; }
    .nxc-phone { transition:none !important; } /* Evitar glitch al cargar */
</style>
      <div style="text-align:center;margin-bottom:70px;" class="nx-fade-up">
        <h2 class="nx-title" style="margin:0 auto 20px;max-width:600px;font-size:clamp(2.25rem,4vw,3.5rem);color:#0F172A;line-height:1.15;">Tu marca.<br><strong>Nuestra tecnología.</strong></h2>
        <p class="nx-desc" style="margin:0 auto;text-align:center;max-width:580px;color:#475569;">Nexa se adapta completamente a la identidad visual de tu empresa. Tus usuarios nunca saben que hay un motor fluX detrás — solo ven tu marca en acción.</p>
      `;
        content = content.substring(0, headStartIndex) + newHeader + content.substring(headEndIndex);
      }

      // 3. Modificar el label de ícono para que agarre el CSS light
      const iconLabelTarget = 'background:rgba(255,255,255,0.06);border:1px dashed rgba(255,255,255,0.2);';
      content = content.replace(iconLabelTarget, 'class="nxc-icon-upload-label" style="');

      // 4. Modificar el separador inferior
      const sepTarget = '<div style="margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);">';
      const sepReplacement = `<div class="nx-sep-line" style="margin-top:32px;padding-top:24px;">`;
      content = content.replace(sepTarget, sepReplacement);

      // 5. Inyectar el Agente de WhatsApp encima del separador
      const waContainer = `
          <!-- Agente de WhatsApp Placeholder -->
          <div style="margin-top:20px;margin-bottom:32px;padding:24px;background:#F8FAFC;border-radius:16px;border:1px dashed #CBD5E1;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00B894" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            <div style="font-weight:600;color:#0F172A;font-size:14px;">Espacio reservado para Agente WhatsApp</div>
          </div>
          `;
      
      const insertWaBefore = '<div class="nx-sep-line"';
      if (content.includes(insertWaBefore) && !content.includes('Espacio reservado para Agente WhatsApp')) {
        content = content.replace(insertWaBefore, waContainer + insertWaBefore);
      }

      // 6. Forzar que el teléfono cargue en Light Mode por defecto
      content = content.replace('<div class="nxc-phone dark-mode"', '<div class="nxc-phone light-mode"');
      // Ocultar botones de toggle mode para dejarlo limpio en blanco o mantenerlos? Mantengámoslos por si quieren ver el oscuro.

      fs.writeFileSync(fullPath, content);
      console.log('Successfully merged and styled sections in ' + fullPath);
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
