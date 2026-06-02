const fs = require('fs');
const path = require('path');

const templateHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iniciar Sesión — fluX One</title>
  <link rel="icon" type="image/svg+xml" href="../assets/images/logos/xo%20banco.svg">
  <link rel="stylesheet" href="../css/styles.css?v=immersive">
  <style>
    /* Base Reset & Variables */
    :root {
      --glass-bg: rgba(15, 23, 42, 0.75);
      --glass-border: rgba(255, 255, 255, 0.08);
      --text-main: #ffffff;
      --text-muted: rgba(255,255,255,0.7);
      --input-bg: rgba(255, 255, 255, 0.05);
      --input-border: rgba(255, 255, 255, 0.15);
      --input-text: #ffffff;
      --btn-bg: #2563EB;
      --btn-text: #ffffff;
      --btn-hover: #1D4ED8;
    }

    [data-theme="light"] {
      --glass-bg: rgba(255, 255, 255, 0.85);
      --glass-border: rgba(15, 23, 42, 0.1);
      --text-main: #0F172A;
      --text-muted: #475569;
      --input-bg: rgba(0, 0, 0, 0.03);
      --input-border: rgba(0, 0, 0, 0.15);
      --input-text: #0F172A;
      --btn-bg: #0F172A;
      --btn-text: #ffffff;
      --btn-hover: #1E293B;
    }

    body, html { margin: 0; padding: 0; height: 100%; font-family: 'Inter', sans-serif; overflow: hidden; background: #050505;}
    
    /* Fondo inmersivo */
    .immersive-bg {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: url('../assets/images/backgrounds/login.png') no-repeat center center;
      background-size: cover;
      z-index: 0;
      transition: filter 0.5s ease;
    }
    
    [data-theme="dark"] .immersive-bg { filter: brightness(0.6) contrast(1.1); }
    [data-theme="light"] .immersive-bg { filter: brightness(0.95) contrast(1.05); }

    /* Theme Toggle */
    .theme-toggle {
      position: absolute;
      top: 30px; right: 40px;
      z-index: 10;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
      border-radius: 100px;
      padding: 6px;
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .theme-btn {
      width: 32px; height: 32px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 14px;
      color: var(--text-muted);
      transition: all 0.3s;
    }
    .theme-btn.active { background: var(--text-main); color: var(--glass-bg); box-shadow: 0 2px 10px rgba(0,0,0,0.1); }

    /* Layout & Glass Panel */
    .login-container {
      position: relative;
      z-index: 2;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }
    
    .glass-panel {
      background: var(--glass-bg);
      backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
      border: 1px solid var(--glass-border);
      border-radius: 28px;
      padding: 48px;
      width: 100%;
      max-width: 440px;
      box-shadow: 0 30px 60px rgba(0,0,0,0.3);
      transition: all 0.5s ease;
      display: flex;
      flex-direction: column;
    }

    .glass-header { margin-bottom: 32px; text-align: center; }
    .glass-logo { width: 140px; margin-bottom: 24px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
    [data-theme="dark"] .glass-logo { filter: brightness(0) invert(1); }
    [data-theme="light"] .glass-logo { filter: none; }

    .glass-title { font-size: 1.85rem; font-weight: 700; color: var(--text-main); margin: 0 0 12px 0; letter-spacing: -0.02em; }
    .glass-subtitle { font-size: 0.95rem; color: var(--text-muted); margin: 0; line-height: 1.6; }
    
    .regional-badge {
      display: inline-flex; align-items: center; justify-content: center;
      gap: 6px; padding: 6px 16px;
      background: rgba(37, 99, 235, 0.15); border: 1px solid rgba(37, 99, 235, 0.3);
      color: #60A5FA; border-radius: 100px;
      font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;
      margin-bottom: 24px;
    }
    [data-theme="light"] .regional-badge { color: #2563EB; border-color: rgba(37, 99, 235, 0.2); }

    /* Forms */
    .form-group { margin-bottom: 20px; text-align: left; position: relative;}
    .form-label { display: block; font-size: 0.8rem; font-weight: 600; color: var(--text-main); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.9;}
    .form-input { 
      width: 100%; padding: 14px 16px; 
      background: var(--input-bg); border: 1px solid var(--input-border); 
      border-radius: 12px; font-size: 1rem; color: var(--input-text); 
      transition: all 0.3s; box-sizing: border-box; 
    }
    .form-input:focus { outline: none; border-color: #3B82F6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15); background: var(--glass-bg);}
    .form-input::placeholder { color: var(--text-muted); opacity: 0.5; }
    
    .forgot-link { position: absolute; right: 0; top: 0; font-size: 0.8rem; color: #60A5FA; text-decoration: none; font-weight: 500; }
    [data-theme="light"] .forgot-link { color: #2563EB; }
    .forgot-link:hover { text-decoration: underline; }
    
    .btn-login { 
      width: 100%; padding: 16px; 
      background: var(--btn-bg); color: var(--btn-text); 
      border: none; border-radius: 12px; 
      font-size: 1rem; font-weight: 600; cursor: pointer; 
      transition: all 0.3s; margin-top: 12px; 
    }
    .btn-login:hover { background: var(--btn-hover); transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.15); }
    
    .glass-footer { margin-top: 32px; text-align: center; font-size: 0.85rem; color: var(--text-muted); border-top: 1px solid var(--glass-border); padding-top: 24px;}
    .glass-footer a { color: #60A5FA; font-weight: 600; text-decoration: none; }
    [data-theme="light"] .glass-footer a { color: #2563EB; }
    
    .back-link { position: absolute; top: 30px; left: 40px; z-index: 10; color: white; text-decoration: none; font-weight: 500; display:flex; align-items:center; gap:8px; text-shadow: 0 2px 4px rgba(0,0,0,0.5); font-size:0.95rem;}
    .back-link:hover { opacity: 0.8; }
    [data-theme="light"] .back-link { color: #0F172A; text-shadow: none; font-weight:600;}
    
    @media(max-width: 600px) {
      .glass-panel { padding: 32px 24px; border-radius: 20px;}
      .theme-toggle { top: 20px; right: 20px; }
      .back-link { top: 20px; left: 20px; }
    }
  </style>
</head>
<body data-theme="dark">

  <div class="immersive-bg"></div>
  
  <a href="index.html" class="back-link">← Volver al sitio</a>
  
  <div class="theme-toggle" id="theme-toggle">
    <div class="theme-btn active" id="btn-dark">🌙</div>
    <div class="theme-btn" id="btn-light">☀️</div>
  </div>

  <div class="login-container">
    <div class="glass-panel">
      <div class="glass-header">
        <a href="index.html"><img src="../assets/images/logos/xo%20negro.svg" alt="fluX One" class="glass-logo"></a>
        <div class="regional-badge">{{REGIONAL_BADGE}}</div>
        <h1 class="glass-title">Iniciar sesión</h1>
        <p class="glass-subtitle">{{REGIONAL_DESC}}</p>
      </div>
      
      <form onsubmit="event.preventDefault(); alert('Conectando a la bóveda segura...');">
        <div class="form-group">
          <label class="form-label">Email Corporativo</label>
          <input type="email" class="form-input" placeholder="nombre@empresa.com" required>
        </div>
        
        <div class="form-group">
          <label class="form-label">Contraseña</label>
          <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
          <input type="password" class="form-input" placeholder="••••••••" required>
        </div>
        
        <button type="submit" class="btn-login">Acceder al Dashboard →</button>
      </form>
      
      <div class="glass-footer">
        ¿No tienes una cuenta? <a href="index.html#contacto">Agenda una demo</a>
      </div>
    </div>
  </div>

  <script>
    const toggle = document.getElementById('theme-toggle');
    const btnDark = document.getElementById('btn-dark');
    const btnLight = document.getElementById('btn-light');
    
    // Comprobar preferencia guardada
    const savedTheme = localStorage.getItem('flux-theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateToggleUI(savedTheme);

    toggle.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.body.setAttribute('data-theme', next);
      localStorage.setItem('flux-theme', next);
      updateToggleUI(next);
    });

    function updateToggleUI(theme) {
      if (theme === 'dark') {
        btnDark.classList.add('active');
        btnLight.classList.remove('active');
      } else {
        btnLight.classList.add('active');
        btnDark.classList.remove('active');
      }
    }
  </script>
</body>
</html>`;

const coFile = path.join(__dirname, 'co', 'login.html');
const mxFile = path.join(__dirname, 'mx', 'login.html');

// CO version
const coHtml = templateHtml
  .replace('{{REGIONAL_BADGE}}', 'Operaciones Colombia')
  .replace('{{REGIONAL_DESC}}', 'Orquestación nativa con Bre-B, PSE y ACH.');
fs.writeFileSync(coFile, coHtml);
console.log('Created immersive co/login.html');

// MX version
const mxHtml = templateHtml
  .replace('{{REGIONAL_BADGE}}', 'Operaciones México <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/mx.svg" width="16" style="vertical-align:middle; border-radius:2px; margin-left:6px;" alt="MX">')
  .replace('{{REGIONAL_DESC}}', 'Conectividad directa con el ecosistema SPEI.');
fs.writeFileSync(mxFile, mxHtml);
console.log('Created immersive mx/login.html');
