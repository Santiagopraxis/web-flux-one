const fs = require('fs');
const path = require('path');

const folders = ['co', 'mx'];

const newCss = `
    .country-switcher {
      align-self: flex-start;
      display: inline-flex;
      background: var(--input-bg);
      border: 1px solid var(--input-border);
      border-radius: 100px;
      padding: 4px;
      margin-bottom: 24px;
      transition: all 0.3s;
    }
    .country-btn {
      padding: 8px 16px;
      border-radius: 100px;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-muted);
      text-decoration: none;
      transition: all 0.3s;
      cursor: pointer;
    }
    .country-btn:hover { color: var(--text-main); }
    .country-btn.active {
      background: var(--btn-bg);
      color: var(--btn-text);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
`;

folders.forEach(f => {
  const file = path.join(__dirname, f, 'login.html');
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Inyectar CSS si no existe
    if (!content.includes('.country-switcher {')) {
      content = content.replace('</style>', newCss + '\n  </style>');
    }
    
    // Definir qué botón está activo
    const coActive = f === 'co' ? 'active' : '';
    const mxActive = f === 'mx' ? 'active' : '';
    
    const switcherHtml = `<div class="country-switcher">
          <a href="../co/login.html" class="country-btn ${coActive}">🇨🇴 Colombia</a>
          <a href="../mx/login.html" class="country-btn ${mxActive}">🇲🇽 México</a>
        </div>`;
    
    // Reemplazar el viejo regional-badge (usando Regex por si varían)
    content = content.replace(/<div class="regional-badge">.*?<\/div>/, switcherHtml);
    
    fs.writeFileSync(file, content);
    console.log('Added country switcher to ' + file);
  }
});
