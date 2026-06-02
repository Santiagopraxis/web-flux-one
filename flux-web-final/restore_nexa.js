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
      
      const startMarker = '.nx-wl-brand-name { font-size:14px; font-weight:600; color:var(--nexa-text-1); }';
      const endMarker = '.nxc-preset { width:26px; height:26px; border-radius:50%; cursor:pointer; border:2px solid rgba(255,255,255,0.1); transition:transform 0.15s,border-color 0.15s; }';
      
      const startIndex = content.indexOf(startMarker);
      const endIndex = content.indexOf(endMarker);
      
      if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
        const properCSS = `${startMarker}
    .nx-wl-brand-sub  { font-size:11px; color:var(--nexa-text-3); margin-top:1px; }
    .nx-color-dots { display:flex; gap:6px; margin-top:8px; }
    .nx-color-dot { width:16px; height:16px; border-radius:50%; }
    .nx-wl-tag { margin-left:auto; font-size:10px; font-weight:600; padding:3px 8px; border-radius:6px; }
    .nx-check-list { list-style:none; display:flex; flex-direction:column; gap:16px; margin-top:32px; }
    .nx-check-list li { display:flex; align-items:flex-start; gap:12px; font-size:0.9375rem; color:var(--nexa-text-2); line-height:1.55; }
    .nx-check { width:20px; height:20px; border-radius:6px; flex-shrink:0; background:rgba(0,184,148,0.1); display:flex; align-items:center; justify-content:center; margin-top:1px; }
    .nx-powered-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; margin-top:56px; }
    .nx-powered-card { background:rgba(255,255,255,0.03); border:1px solid var(--nexa-dark-border); border-radius:18px; padding:28px; text-align:center; transition:border-color 0.2s; }
    .nx-powered-card:hover { border-color:rgba(0,184,148,0.3); }
    .nx-powered-icon { width:48px; height:48px; border-radius:14px; display:flex; align-items:center; justify-content:center; margin:0 auto 16px; }
    .nx-powered-title { font-size:0.9375rem; font-weight:500; color:var(--nexa-dark-text-1); margin-bottom:8px; }
    .nx-powered-desc  { font-size:0.8125rem; color:var(--nexa-dark-text-2); line-height:1.6; }
    .logo-negro  { display:block; height:32px; width:auto; }
    .logo-blanco { display:none;  height:32px; width:auto; }
    .navbar.scrolled .logo-negro, .navbar:has(.mega-dropdown:hover) .logo-negro { display:none; }
    .navbar.scrolled .logo-blanco, .navbar:has(.mega-dropdown:hover) .logo-blanco { display:block; }
    .navbar:not(.scrolled):not(:has(.mega-dropdown:hover)) .nav-menu > li > a,
    .navbar:not(.scrolled):not(:has(.mega-dropdown:hover)) .nav-actions .btn-text { color:#0F172A; }
    .navbar:not(.scrolled):not(:has(.mega-dropdown:hover)) .nav-menu > li > a:hover,
    .navbar:not(.scrolled):not(:has(.mega-dropdown:hover)) .nav-actions .btn-text:hover { color:#009B7D; }
    .navbar:not(.scrolled) .dropdown-menu:not(.mega-menu-panel) { background:#fff !important; border:1px solid #E2E8F0 !important; box-shadow:0 8px 24px rgba(15,23,42,0.1) !important; z-index:99999 !important; }
    .navbar:not(.scrolled) .dropdown-menu:not(.mega-menu-panel) a { color:#334155 !important; }
    .navbar:not(.scrolled) .dropdown-menu:not(.mega-menu-panel) a:hover { color:#0F172A !important; background:#F0F4F8 !important; }
    .nxc-section { background:var(--nexa-dark-bg); padding:100px 0; }
    .nxc-grid { display:grid; grid-template-columns:360px 1fr; gap:60px; align-items:start; }
    .nxc-controls { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:24px; padding:32px; }
    .nxc-field { margin-bottom:24px; }
    .nxc-label { display:block; font-size:0.75rem; font-weight:600; text-transform:uppercase; letter-spacing:0.1em; color:#64748B; margin-bottom:10px; }
    .nxc-input { width:100%; padding:12px 16px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:12px; color:#F1F5F9 !important; -webkit-text-fill-color:#F1F5F9 !important; font-size:0.9375rem; font-family:inherit; outline:none; caret-color:#00B894; transition:border-color 0.2s; box-sizing:border-box; }
    .nxc-input::placeholder { color:#475569; -webkit-text-fill-color:#475569; }
    .nxc-input:focus { border-color:rgba(0,184,148,0.5); background:rgba(255,255,255,0.09); -webkit-text-fill-color:#F1F5F9 !important; }
    .nxc-color-row { display:flex; gap:12px; align-items:center; }
    .nxc-color { width:44px; height:44px; border-radius:12px; border:2px solid rgba(255,255,255,0.1); cursor:pointer; padding:3px; background:transparent; }
    .nxc-color-presets { display:flex; gap:8px; flex-wrap:wrap; }
    ${endMarker}`;
        
        content = content.substring(0, startIndex) + properCSS + content.substring(endIndex + endMarker.length);
        fs.writeFileSync(fullPath, content);
        console.log('Restored and Fixed CSS in ' + fullPath);
      } else {
        console.log('Markers not found in ' + fullPath);
      }
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
