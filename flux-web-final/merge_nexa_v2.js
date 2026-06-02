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

      // 1. Eliminar White Label
      const wlStart = '<!-- WHITE LABEL -->';
      const wlEnd = '<!-- BRAND CONFIGURATOR';
      const wlStartIndex = content.indexOf(wlStart);
      const wlEndIndex = content.indexOf(wlEnd);
      if (wlStartIndex !== -1 && wlEndIndex !== -1 && wlStartIndex < wlEndIndex) {
        content = content.substring(0, wlStartIndex) + content.substring(wlEndIndex);
      }

      // 2. Reemplazar el header del configurador y añadir el value grid
      const gridMarker = '<div class="nxc-grid">';
      const startReplace = content.indexOf('<div style="text-align:center;margin-bottom:60px;" class="nx-fade-up">');
      const endReplace = content.indexOf(gridMarker);

      if (startReplace !== -1 && endReplace !== -1) {
        const valueGridHTML = `
      <style>
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
    .nxc-phone { transition:none !important; } 
</style>
      <div style="text-align:center;margin-bottom:60px;" class="nx-fade-up">
        <h2 class="nx-title" style="margin:0 auto 20px;max-width:600px;font-size:clamp(2.25rem,4vw,3.5rem);color:#0F172A;line-height:1.15;">Tu marca.<br><strong>Nuestra tecnología.</strong></h2>
        <p class="nx-desc" style="margin:0 auto;text-align:center;max-width:580px;color:#475569;">Nexa se adapta completamente a la identidad visual de tu empresa. Tus usuarios nunca saben que hay un motor fluX detrás — solo ven tu marca en acción.</p>
        
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
      </div>
      `;
        content = content.substring(0, startReplace) + valueGridHTML + content.substring(endReplace);
        console.log('Injected Header + Value Grid in ' + fullPath);
      }

      // 3. Modificar label del icono y WhatsApp
      const iconLabelTarget = 'background:rgba(255,255,255,0.06);border:1px dashed rgba(255,255,255,0.2);';
      content = content.replace(iconLabelTarget, 'class="nxc-icon-upload-label" style="');

      const sepTarget = '<div style="margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);">';
      const sepReplacement = `<div class="nx-sep-line" style="margin-top:32px;padding-top:24px;">`;
      content = content.replace(sepTarget, sepReplacement);

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

      content = content.replace('<div class="nxc-phone dark-mode"', '<div class="nxc-phone light-mode"');

      fs.writeFileSync(fullPath, content);
      console.log('Successfully completed full restructure of ' + fullPath);
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
