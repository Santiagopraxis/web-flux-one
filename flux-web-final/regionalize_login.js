const fs = require('fs');
const path = require('path');

const coFile = path.join(__dirname, 'co', 'login.html');
const mxFile = path.join(__dirname, 'mx', 'login.html');

if (fs.existsSync(coFile)) {
  let coContent = fs.readFileSync(coFile, 'utf8');
  coContent = coContent.replace(
    '<p class="login-subtitle">Ingresa tus credenciales para acceder al dashboard.</p>',
    '<p class="login-subtitle">Ingresa tus credenciales para acceder al Centro de Operaciones Colombia.</p>'
  );
  coContent = coContent.replace(
    '<h2 class="graphic-title">Bienvenido al centro de control de tus finanzas.</h2>',
    '<h2 class="graphic-title">Bienvenido al centro de control de tus finanzas en Colombia.</h2>'
  );
  coContent = coContent.replace(
    '<p class="graphic-desc">Supervisa la salud de tu recaudo, autoriza dispersiones masivas y toma decisiones con inteligencia en tiempo real. Todo desde un solo lugar.</p>',
    '<p class="graphic-desc">Supervisa la salud de tu recaudo, autoriza dispersiones masivas y toma decisiones con inteligencia en tiempo real. Orquestación nativa con Bre-B, PSE y ACH.</p>'
  );
  fs.writeFileSync(coFile, coContent);
  console.log('Regionalized Colombia Login');
}

if (fs.existsSync(mxFile)) {
  let mxContent = fs.readFileSync(mxFile, 'utf8');
  mxContent = mxContent.replace(
    '<p class="login-subtitle">Ingresa tus credenciales para acceder al dashboard.</p>',
    '<p class="login-subtitle">Ingresa tus credenciales para acceder al Centro de Operaciones México <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.11.0/flags/4x3/mx.svg" width="16" style="vertical-align:middle; border-radius:2px; margin-left:4px;" alt="MX"></p>'
  );
  mxContent = mxContent.replace(
    '<h2 class="graphic-title">Bienvenido al centro de control de tus finanzas.</h2>',
    '<h2 class="graphic-title">Bienvenido al centro de control de tus finanzas en México.</h2>'
  );
  mxContent = mxContent.replace(
    '<p class="graphic-desc">Supervisa la salud de tu recaudo, autoriza dispersiones masivas y toma decisiones con inteligencia en tiempo real. Todo desde un solo lugar.</p>',
    '<p class="graphic-desc">Supervisa la salud de tu recaudo, autoriza dispersiones masivas y toma decisiones con inteligencia en tiempo real. Conectividad directa con el ecosistema SPEI.</p>'
  );
  fs.writeFileSync(mxFile, mxContent);
  console.log('Regionalized Mexico Login');
}
