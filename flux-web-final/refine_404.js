const fs = require('fs');
const path = require('path');

const file404 = path.join(__dirname, '404.html');

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
    .bg-404 { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url('assets/images/backgrounds/404-bg.png') no-repeat right center; background-size: cover; z-index: 0; opacity: 0.8; filter: contrast(1.1); }
    .overlay-404 { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.6) 40%, rgba(5,5,5,0.1) 100%); z-index: 1; }
    .content-404 { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: 0 10%; }
    .logo-404 { position: absolute; top: 40px; left: 10%; width: 140px; z-index: 3;}
    
    .eyebrow-404 { font-size: 0.85rem; font-weight: 500; letter-spacing: 0.3em; color: rgba(255,255,255,0.6); text-transform: uppercase; margin-bottom: 16px; border-left: 2px solid #2563EB; padding-left: 12px; }
    .title-404 { font-size: clamp(4rem, 10vw, 9rem); font-weight: 300; line-height: 1; margin-bottom: 16px; color: #ffffff; letter-spacing: -0.05em; }
    .desc-404 { font-size: 1.1rem; color: rgba(255,255,255,0.5); max-width: 400px; line-height: 1.7; margin-bottom: 40px; font-weight: 300; }
    .btn-404 { display: inline-flex; align-items: center; padding: 14px 28px; background: transparent; color: white; font-weight: 500; text-decoration: none; border: 1px solid rgba(255,255,255,0.2); border-radius: 100px; transition: all 0.3s; font-size: 0.9rem; }
    .btn-404:hover { background: white; color: #050505; }
    
    @media (max-width: 768px) {
      .bg-404 { background-position: center; }
      .overlay-404 { background: radial-gradient(circle at center, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.95) 100%); }
      .content-404 { align-items: center; text-align: center; padding: 0 20px; }
      .logo-404 { left: 50%; transform: translateX(-50%); }
      .eyebrow-404 { border-left: none; border-bottom: 2px solid #2563EB; padding-left: 0; padding-bottom: 8px; }
      .desc-404 { max-width: 100%; }
    }
  </style>
</head>
<body>
  <div class="bg-404"></div>
  <div class="overlay-404"></div>
  <a href="co/index.html"><img src="assets/images/logos/flux one en blanco_1.svg" alt="fluX One" class="logo-404"></a>
  
  <div class="content-404">
    <div class="eyebrow-404">Vaya...</div>
    <h1 class="title-404">404</h1>
    <p class="desc-404">Parece que te has salido de la ruta. La página que buscas no existe, pero tus datos siguen a salvo en nuestros servidores.</p>
    <a href="co/index.html" class="btn-404">Volver al inicio</a>
  </div>
</body>
</html>`;

fs.writeFileSync(file404, html404);
console.log('Updated 404.html to be more minimalist');
