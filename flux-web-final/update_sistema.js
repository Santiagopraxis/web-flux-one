const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'co', 'index.html');
let content = fs.readFileSync(targetFile, 'utf8');

// Title and Subtitle
const oldHeader = `<div class="section-header sr fade-in">
        <h2 class="section-title">¿Por qué elegir fluX?</h2>
      </div>`;
const newHeader = `<div class="section-header sr fade-in">
        <h2 class="section-title" style="text-transform: uppercase;">EL SISTEMA COMPLETO.</h2>
        <p class="section-subtitle">No es una herramienta. Es el ciclo entero del dinero — con inteligencia en cada paso.</p>
      </div>`;
content = content.replace(oldHeader, newHeader);

// Card 1
content = content.replace(
  '<h3 class="card-title">Pagos que piensan</h3>\n          <p class="card-desc">No solo procesamos — anticipamos mora, optimizamos canales, informamos decisiones. Eso es un pago inteligente.</p>',
  '<h3 class="card-title" style="text-transform: uppercase;">MULTI-RIEL INTELIGENTE</h3>\n          <p class="card-desc">Orquesta PSE, BreB, billeteras y ACH automáticamente. Si un canal falla, otro toma el relevo sin que el pagador haga nada. El pago siempre llega.</p>'
);

// Card 2
content = content.replace(
  '<h3 class="card-title">Ejecución en tiempo real, 24/7/365</h3>\n          <p class="card-desc">Procesa pagos y recaudos en segundos, sin importar el banco, el día o la hora. El dinero no se detiene.</p>',
  '<h3 class="card-title" style="text-transform: uppercase;">SIN HORARIOS. SIN ESPERAS.</h3>\n          <p class="card-desc">T+0, 24/7/365. El dinero se mueve cuando debe moverse — no cuando el banco lo permite. Liquidación instantánea, siempre.</p>'
);

// Card 3
content = content.replace(
  '<h3 class="card-title">Visibilidad total</h3>\n          <p class="card-desc">Dashboards ejecutivos en tiempo real. Sabes quién pagó, quién no, y quién va a fallar. Información accionable, no solo reportes.</p>',
  '<h3 class="card-title" style="text-transform: uppercase;">DONDE YA ESTÁ TU CLIENTE</h3>\n          <p class="card-desc">WhatsApp, portal, email, app. Nexa cobra en el canal correcto, en el momento correcto. Sin perseguir a nadie. Sin fricción.</p>'
);

// Card 4
content = content.replace(
  '<h3 class="card-title">Automatización de punta a punta</h3>\n          <p class="card-desc">Desde recaudo hasta conciliación contable. Sin tareas manuales. Sin errores. Sin perseguir facturas.</p>',
  '<h3 class="card-title" style="text-transform: uppercase;">EL SISTEMA QUE APRENDE</h3>\n          <p class="card-desc">fluX BI conecta cada pago con una decisión. Sabes quién va a pagar, cuándo, y qué hacer si no lo hace. Información accionable, no solo reportes.</p>'
);

fs.writeFileSync(targetFile, content);
console.log('Successfully updated "Por qué elegir fluX" section in co/index.html');
