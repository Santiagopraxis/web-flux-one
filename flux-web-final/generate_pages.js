const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname);
const coDir = path.join(__dirname, 'co');
const mxDir = path.join(__dirname, 'mx');

// 1. Crear 404.html
const html404 = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error 404 — fluX One</title>
  <link rel="icon" type="image/svg+xml" href="assets/images/logos/xo%20banco.svg">
  <link rel="stylesheet" href="css/styles.css?v=ultra">
  <style>
    body, html { margin: 0; padding: 0; height: 100%; font-family: 'Inter', sans-serif; background: #050505; color: white; overflow: hidden; }
    .bg-404 { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url('assets/images/backgrounds/404-bg.png') no-repeat center center; background-size: cover; z-index: 0; opacity: 0.6; filter: contrast(1.1) brightness(0.9); }
    .overlay-404 { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(to right, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.8) 100%); z-index: 1; }
    .content-404 { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 0 20px; }
    .logo-404 { position: absolute; top: 40px; left: 40px; width: 140px; }
    .eyebrow-404 { font-size: 1rem; font-weight: 700; letter-spacing: 0.2em; color: #2563EB; text-transform: uppercase; margin-bottom: 24px; padding: 8px 16px; border: 1px solid rgba(37, 99, 235, 0.3); border-radius: 100px; background: rgba(37, 99, 235, 0.1); }
    .title-404 { font-size: clamp(3rem, 6vw, 5rem); font-weight: 700; line-height: 1.1; margin-bottom: 24px; max-width: 800px; text-shadow: 0 10px 30px rgba(0,0,0,0.5); letter-spacing: -0.02em; }
    .desc-404 { font-size: 1.25rem; color: rgba(255,255,255,0.7); max-width: 600px; line-height: 1.6; margin-bottom: 48px; }
    .btn-404 { display: inline-flex; align-items: center; padding: 16px 32px; background: white; color: #050505; font-weight: 600; text-decoration: none; border-radius: 100px; transition: transform 0.3s, box-shadow 0.3s; }
    .btn-404:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(255,255,255,0.2); }
  </style>
</head>
<body>
  <div class="bg-404"></div>
  <div class="overlay-404"></div>
  <a href="co/index.html"><img src="assets/images/logos/flux one en blanco_1.svg" alt="fluX One" class="logo-404"></a>
  
  <div class="content-404">
    <div class="eyebrow-404">ERROR 404</div>
    <h1 class="title-404">Transacción declinada:<br>Esta página no existe.</h1>
    <p class="desc-404">Incluso los rieles de pago más rápidos no pueden llevarte a un lugar que no está en el mapa. Te has salido de la ruta, pero tranquilo, tu dinero y tus datos están seguros en nuestros servidores.</p>
    <a href="co/index.html" class="btn-404">Volver a la bóveda principal →</a>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(rootDir, '404.html'), html404);
console.log('Created 404.html');

// 2. Crear login.html template
const getLoginHtml = (countryCode) => `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iniciar Sesión — fluX One</title>
  <link rel="icon" type="image/svg+xml" href="../assets/images/logos/xo%20banco.svg">
  <link rel="stylesheet" href="../css/styles.css?v=login">
  <style>
    body, html { margin: 0; padding: 0; height: 100%; font-family: 'Inter', sans-serif; background: #ffffff; }
    .login-layout { display: flex; height: 100vh; width: 100%; }
    
    /* Lado Izquierdo - Formulario */
    .login-form-side { flex: 1; display: flex; flex-direction: column; padding: 40px; position: relative; background: #ffffff; }
    .login-header { display: flex; justify-content: space-between; align-items: center; width: 100%; }
    .login-logo { width: 120px; }
    .back-link { color: #64748B; text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: color 0.3s; }
    .back-link:hover { color: #0F172A; }
    
    .login-form-container { margin: auto; width: 100%; max-width: 400px; }
    .login-title { font-size: 2rem; font-weight: 700; color: #0F172A; margin-bottom: 8px; letter-spacing: -0.02em; }
    .login-subtitle { font-size: 1rem; color: #64748B; margin-bottom: 40px; }
    
    .form-group { margin-bottom: 24px; position: relative; }
    .form-label { display: block; font-size: 0.85rem; font-weight: 600; color: #334155; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; }
    .form-input { width: 100%; padding: 14px 16px; border: 1px solid #E2E8F0; border-radius: 12px; font-size: 1rem; color: #0F172A; transition: all 0.3s; box-sizing: border-box; background: #F8FAFC; }
    .form-input:focus { outline: none; border-color: #2563EB; background: #ffffff; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
    
    .forgot-link { position: absolute; right: 0; top: 0; font-size: 0.85rem; color: #2563EB; text-decoration: none; font-weight: 500; }
    .forgot-link:hover { text-decoration: underline; }
    
    .login-btn { width: 100%; padding: 16px; background: #0F172A; color: white; border: none; border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; margin-top: 8px; }
    .login-btn:hover { background: #1E293B; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(15,23,42,0.1); }
    
    .login-footer { text-align: center; margin-top: 40px; font-size: 0.9rem; color: #64748B; }
    .login-footer a { color: #2563EB; font-weight: 600; text-decoration: none; }
    
    /* Lado Derecho - Gráfico */
    .login-graphic-side { flex: 1; background: linear-gradient(135deg, #050505 0%, #111827 100%); position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; padding: 60px; color: white; }
    .graphic-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url('../assets/images/backgrounds/fondo%202.png') no-repeat center center; background-size: cover; opacity: 0.2; mix-blend-mode: luminosity; }
    .graphic-content { position: relative; z-index: 2; max-width: 500px; }
    .graphic-title { font-size: 2.5rem; font-weight: 300; line-height: 1.2; margin-bottom: 16px; }
    .graphic-desc { font-size: 1.1rem; color: rgba(255,255,255,0.7); line-height: 1.6; }
    
    @media (max-width: 900px) {
      .login-graphic-side { display: none; }
      .login-form-side { padding: 24px; }
    }
  </style>
</head>
<body>
  <div class="login-layout">
    <!-- Panel de Formulario -->
    <div class="login-form-side">
      <div class="login-header">
        <a href="index.html"><img src="../assets/images/logos/xo%20negro.svg" alt="fluX One" class="login-logo"></a>
        <a href="index.html" class="back-link">Volver al sitio</a>
      </div>
      
      <div class="login-form-container">
        <h1 class="login-title">Iniciar sesión</h1>
        <p class="login-subtitle">Ingresa tus credenciales para acceder al dashboard.</p>
        
        <form onsubmit="event.preventDefault(); alert('Portal de acceso en entorno seguro. Redirigiendo...');">
          <div class="form-group">
            <label class="form-label">Email Corporativo</label>
            <input type="email" class="form-input" placeholder="nombre@empresa.com" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Contraseña</label>
            <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
            <input type="password" class="form-input" placeholder="••••••••" required>
          </div>
          
          <button type="submit" class="login-btn">Ingresar al Dashboard →</button>
        </form>
        
        <div class="login-footer">
          ¿No tienes una cuenta? <a href="index.html#contacto">Agenda una demo</a>
        </div>
      </div>
    </div>
    
    <!-- Panel Visual -->
    <div class="login-graphic-side">
      <div class="graphic-overlay"></div>
      <div class="graphic-content">
        <h2 class="graphic-title">Bienvenido al centro de control de tus finanzas.</h2>
        <p class="graphic-desc">Supervisa la salud de tu recaudo, autoriza dispersiones masivas y toma decisiones con inteligencia en tiempo real. Todo desde un solo lugar.</p>
      </div>
    </div>
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(coDir, 'login.html'), getLoginHtml('co'));
fs.writeFileSync(path.join(mxDir, 'login.html'), getLoginHtml('mx'));
console.log('Created login.html in co and mx');

// 3. Actualizar enlaces en todos los HTML
function processDirectoryLinks(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectoryLinks(fullPath);
    } else if (fullPath.endsWith('.html') && !fullPath.endsWith('login.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const originalContent = content;

      // Reemplazar boton Iniciar Sesion para que enlace al login
      content = content.replace(
        '<button class="btn-text hide-mobile">Iniciar sesión</button>', 
        '<button class="btn-text hide-mobile" onclick="window.location.href=\\\'login.html\\\'">Iniciar sesión</button>'
      );
      
      // Manejar el caso si ya lo tiene o usa comillas dobles
      content = content.replace(
        '<button class="btn-text hide-mobile" onclick="window.location.href=\'login.html\'">Iniciar sesión</button>',
        '<button class="btn-text hide-mobile" onclick="window.location.href=\'login.html\'">Iniciar sesión</button>' // No-op, just fallback
      );

      // Si no usó replace exacto, usamos regex
      const regex = /<button class="btn-text hide-mobile">Iniciar sesi(o|ó)n<\/button>/g;
      content = content.replace(regex, '<button class="btn-text hide-mobile" onclick="window.location.href=\'login.html\'">Iniciar sesión</button>');

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated login button links in ' + fullPath);
      }
    }
  });
}

processDirectoryLinks(coDir);
processDirectoryLinks(mxDir);
