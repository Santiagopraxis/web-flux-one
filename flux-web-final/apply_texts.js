const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'co', 'index.html');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. HERO
const heroEyebrow = `<p class="hero-eyebrow sr fade-in" style="font-size: 1.1rem; font-weight: 600; color: #00B894; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px;">¿Y si todo fuera más fácil?<br>Pagar, cobrar, dispersar.</p>\n          <h1 class="hero-title sr fade-in">`;
content = content.replace('<h1 class="hero-title sr fade-in">', heroEyebrow);

// 2. PRODUCTOS
const oldProdTitle = `<h2 class="section-title typewriter-text" data-delay="200" data-speed="40">Recaudo, Dispersión, Inteligencia.<br><span class="text-grad">Todo en un solo lugar</span></h2>`;
const newProdTitle = `<h2 class="section-title typewriter-text" data-delay="200" data-speed="40" style="text-transform: uppercase;">PAGAR, COBRAR, DISPERSAR</h2>\n        <p class="section-subtitle" style="margin-top:20px; max-width:800px; margin-left:auto; margin-right:auto;">Tres momentos del dinero que fluX One conecta — con inteligencia integrada en cada paso.</p>`;
content = content.replace(oldProdTitle, newProdTitle);

// 3. STATS
const statsContainerStr = `<div class="container" style="margin-top: 40px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 60px; padding-bottom: 40px;">`;
const statsHeader = `      <div class="section-header sr fade-in" style="margin-bottom: 40px;">\n        <h2 class="section-title" style="font-size: 2.2rem; font-weight: 300;">El tiempo es el nuevo interés</h2>\n        <p class="section-subtitle" style="color: rgba(255,255,255,0.7);">Cada hora que un pago tarda es dinero que no está trabajando para tu empresa.</p>\n      </div>\n`;
if (!content.includes('El tiempo es el nuevo interés')) {
  content = content.replace(statsContainerStr, statsContainerStr + '\n' + statsHeader);
}

// Stats metrics
content = content.replace('<p class="stat-caption">Liquidación instantánea</p>', '<p class="stat-caption" style="font-size: 0.95rem; line-height: 1.5; opacity: 0.8;">Liquidación instantánea.<br>El dinero llega, el dinero está disponible.</p>');
content = content.replace('<p class="stat-caption">Sin horarios bancarios</p>', '<p class="stat-caption" style="font-size: 0.95rem; line-height: 1.5; opacity: 0.8;">Sin horarios bancarios.<br>Sin esperar al día siguiente.</p>');

const oldStat3 = `<h3 class="stat-number">3.8B</h3>
          <p class="stat-caption">TX anuales en SPEI</p>`;
const newStat3 = `<h3 class="stat-number" style="font-size:3rem;">1 API</h3>
          <p class="stat-caption" style="font-size: 0.95rem; line-height: 1.5; opacity: 0.8;">Todo el ecosistema de pagos<br>de Colombia, integrado.</p>`;
content = content.replace(oldStat3, newStat3);

const oldStat4 = `<h3 class="stat-number">80%</h3>
          <p class="stat-caption">del valor B2B en CO</p>`;
const newStat4 = `<h3 class="stat-number" style="font-size:3rem;">BreB</h3>
          <p class="stat-caption" style="font-size: 0.95rem; line-height: 1.5; opacity: 0.8;">El riel de pagos instantáneos<br>del Banco de la República, nativo.</p>`;
content = content.replace(oldStat4, newStat4);

// 4. NEXA
const oldNexaTitle = `Una app que hace el trabajo<br><span style="background: linear-gradient(135deg, #00B894 0%, #2563EB 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">financiero</span> por tus clientes.`;
const newNexaTitle = `EL COBRADOR MÁS INTELIGENTE QUE HAS TENIDO.`;
content = content.replace(oldNexaTitle, newNexaTitle);

const oldNexaSub = `Nexa centraliza todos los pagos recurrentes de tus clientes en un solo lugar: facturas, domiciliaciones, recargas y alertas inteligentes — todo automatizado, todo en tiempo real.`;
const newNexaSub = `Nexa centraliza todos los pagos recurrentes de tus clientes: facturas, domiciliaciones, recargas y alertas inteligentes. Todo automatizado, todo en tiempo real. Y cuando llega el momento de cobrar, Nexa no manda un link — abre una conversación.`;
content = content.replace(oldNexaSub, newNexaSub);

// Nexa Cards
content = content.replace('1. COBRO PROACTIVO', '1. AGENTE DE WHATSAPP');
content = content.replace('Alertas inteligentes vía WhatsApp y Push que reducen la morosidad antes del vencimiento. Tus clientes reciben recordatorios personalizados en el momento justo.', 'El 98% de los colombianos tiene WhatsApp. Nexa cobra ahí. No manda recordatorios — gestiona el cobro: consulta saldos, resuelve dudas y cierra el pago sin que ningún humano intervenga. Un cobro por WhatsApp tiene 5 veces más apertura que uno por email.');

content = content.replace('Cobro automático mensual vía tokenización. Evita corte de servicio y asegura puntualidad del recaudo sin ninguna intervención manual.', 'Cobro automático mensual vía tokenización. Evita corte de servicio y asegura puntualidad del recaudo sin ninguna intervención manual.'); // practically same

content = content.replace('Tus clientes cargan todos sus recibos y pagan con un solo clic. Sin entrar a múltiples portales. Sin esperas. Sin fricciones.', 'Tus clientes ven todas sus facturas pendientes en un solo lugar y pagan con un toque. Sin entrar a múltiples portales. Sin esperas. Sin fricciones.');

content = content.replace('Sabe qué factura pagó cada cliente, cuándo y cómo. Detecta patrones de mora antes de que ocurran con dashboards analíticos en tiempo real.', 'Sabe qué factura pagó cada cliente, cuándo y cómo. Detecta patrones de mora antes de que ocurran — con dashboards en tiempo real conectados a fluX BI.');

// 5. NUEVA SECCIÓN
const newSection = `
  <!-- SECCIÓN NUEVA: INDUSTRIA -->
  <section class="section-light" id="industrias" style="padding: 100px 0;">
    <div class="container">
      <div class="section-header sr fade-in">
        <h2 class="section-title">MISMO SISTEMA. RESULTADOS PARA TU INDUSTRIA.</h2>
        <p class="section-subtitle">fluX One no es una herramienta genérica. Cada sector tiene su dinámica de pago — y fluX One la conoce.</p>
      </div>

      <div class="grid-3 sr fade-in">
        <div class="card glass d1">
          <h3 class="card-title">Servicios públicos</h3>
          <p class="card-desc">Factura digital, recordatorio inteligente por Nexa, pago en 4 clics y conciliación automática. Sin call center de cobro. Sin mora acumulada.</p>
        </div>
        <div class="card glass d2">
          <h3 class="card-title">Instituciones financieras</h3>
          <p class="card-desc">Gestión de cartera con BI predictivo. Mora detectada antes de que ocurra. Nexa gestiona el cobro por WhatsApp cuando el sistema identifica riesgo — sin intervención del equipo.</p>
        </div>
        <div class="card glass d3">
          <h3 class="card-title">ISPs y telecomunicaciones</h3>
          <p class="card-desc">Sincronización directa con tu CRM. El suscriptor recibe el mensaje de Nexa, paga antes del corte, y el sistema se actualiza solo. Sin llamadas. Sin fricción.</p>
        </div>
      </div>
    </div>
  </section>
`;

if (!content.includes('MISMO SISTEMA. RESULTADOS PARA TU INDUSTRIA.')) {
  content = content.replace('<!-- SECCIÓN 5: SEGURIDAD Y CUMPLIMIENTO -->', newSection + '\n  <!-- SECCIÓN 5: SEGURIDAD Y CUMPLIMIENTO -->');
}

fs.writeFileSync(targetFile, content);
console.log('Successfully applied all text changes to co/index.html');
