const fs = require('fs');
const path = require('path');

const folders = ['co', 'mx', 'en'];

const whatsappSection = `
  <!-- WHATSAPP AGENT SECTION -->
  <section class="nx-section" id="whatsapp-agent" style="background:#ffffff; padding: 120px 0; border-top: 1px solid rgba(15,23,42,0.05);">
    <style>
      .wa-container { display:flex; flex-wrap:wrap; align-items:center; gap:60px; max-width:1200px; margin:0 auto; padding: 0 40px; }
      .wa-text-col { flex: 1; min-width: 320px; }
      .wa-eyebrow { display:inline-block; padding: 6px 16px; background: rgba(37, 211, 102, 0.1); color: #25D366; border-radius: 100px; font-weight: 600; font-size: 0.85rem; margin-bottom: 24px; border: 1px solid rgba(37, 211, 102, 0.2); text-transform: uppercase; letter-spacing: 0.05em;}
      .wa-title { font-size: clamp(2.5rem, 4vw, 3.2rem); color: #0F172A; line-height: 1.1; margin-bottom: 24px; font-weight: 700; letter-spacing:-1px;}
      .wa-desc { font-size: 1.125rem; color: #475569; line-height: 1.6; margin-bottom: 32px; max-width: 500px; }
      
      .wa-graphic-col { flex: 1; min-width: 320px; display:flex; justify-content:center; }
      .wa-phone { width: 340px; background: #F0F2F5; border-radius: 40px; padding: 12px; box-shadow: 0 24px 48px rgba(15,23,42,0.12); border: 8px solid #ffffff; position: relative; overflow:hidden;}
      
      .wa-header { background: #075E54; color: white; padding: 20px 20px 16px 20px; display:flex; align-items:center; gap: 12px; border-radius: 28px 28px 0 0; margin: -12px -12px 0 -12px;}
      .wa-avatar { width: 44px; height: 44px; background: #25D366; border-radius: 50%; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size: 20px; color:white; flex-shrink:0;}
      .wa-name { font-weight: 600; font-size: 1.15rem; line-height: 1.2; }
      .wa-status { font-size: 0.85rem; color: rgba(255,255,255,0.8); }
      
      .wa-chat-bg { background: #efeae2; padding: 20px 16px; height: 420px; display:flex; flex-direction: column; gap: 16px; overflow-y:auto; border-radius: 0 0 28px 28px; margin: 0 -12px -12px -12px; position:relative;}
      .wa-chat-bg::before { content:''; position:absolute; top:0;left:0;right:0;bottom:0; opacity:0.06; background-image: radial-gradient(#000 1px, transparent 1px); background-size: 10px 10px; z-index:0; pointer-events:none;}
      
      .wa-bubble { padding: 12px 16px; border-radius: 12px; font-size: 0.95rem; line-height: 1.4; max-width: 85%; position:relative; z-index:1; box-shadow: 0 1px 2px rgba(0,0,0,0.05); opacity: 0; transform: translateY(10px); animation: bubblePop 0.4s forwards; }
      .wa-bubble.in { background: #ffffff; color: #111b21; align-self: flex-start; border-top-left-radius: 0; }
      .wa-bubble.out { background: #d9fdd3; color: #111b21; align-self: flex-end; border-top-right-radius: 0; }
      
      .wa-time { display:block; text-align:right; font-size: 0.7rem; color: rgba(17,27,33,0.5); margin-top: 6px; }
      .wa-btn { display:block; text-align:center; color: #00A884; font-weight: 600; text-decoration: none; padding: 12px 0 4px 0; border-top: 1px solid #E9EDEF; margin-top: 12px; margin-left: -16px; margin-right: -16px; margin-bottom: -4px; cursor: pointer;}
      
      .wa-typing { display:inline-flex; gap: 4px; padding: 12px 16px; background: #ffffff; border-radius: 12px; align-self:flex-start; margin-top: 8px; opacity: 0; animation: waFadeIn 0.5s 2.5s forwards; border-top-left-radius:0; z-index:1; box-shadow: 0 1px 2px rgba(0,0,0,0.05);}
      .wa-dot { width: 6px; height: 6px; background: #8696a0; border-radius: 50%; animation: waTyping 1.4s infinite ease-in-out both;}
      .wa-dot:nth-child(1) { animation-delay: -0.32s; }
      .wa-dot:nth-child(2) { animation-delay: -0.16s; }
      
      @keyframes waTyping { 0%, 80%, 100% { transform: scale(0.6); opacity:0.5;} 40% { transform: scale(1); opacity:1;} }
      @keyframes waFadeIn { to { opacity: 1; } }
      @keyframes bubblePop { to { opacity: 1; transform: translateY(0); } }
      
      .wa-bubble:nth-child(1) { animation-delay: 0.5s; }
      .wa-bubble:nth-child(2) { animation-delay: 2s; }
      .wa-bubble:nth-child(4) { animation-delay: 4.5s; }
      
      @media(max-width: 900px) {
        .wa-container { flex-direction:column; gap:40px; }
        .wa-text-col, .wa-graphic-col { width: 100%; min-width:100%; }
      }
    </style>
    
    <div class="nx-container wa-container">
      <div class="wa-text-col nx-fade-up">
        <span class="wa-eyebrow">El canal que todos usan</span>
        <h2 class="wa-title">Un agente que cobra por ti.</h2>
        <p class="wa-desc">Nexa no envía correos que nadie lee. Gestiona el recaudo directamente por WhatsApp, recordando facturas, resolviendo dudas y permitiendo el pago en el mismo chat sin fricción.</p>
        <ul style="list-style:none; padding:0; margin-bottom:32px; color:#475569; font-size: 1.05rem;">
          <li style="margin-bottom:16px; display:flex; align-items:center; gap:12px;"><span style="color:#25D366; font-weight:bold; font-size:1.2rem;">✓</span> Pago en un solo clic desde el chat</li>
          <li style="margin-bottom:16px; display:flex; align-items:center; gap:12px;"><span style="color:#25D366; font-weight:bold; font-size:1.2rem;">✓</span> Notificaciones proactivas de mora</li>
          <li style="margin-bottom:16px; display:flex; align-items:center; gap:12px;"><span style="color:#25D366; font-weight:bold; font-size:1.2rem;">✓</span> Conciliación automatizada en tiempo real</li>
        </ul>
      </div>
      
      <div class="wa-graphic-col nx-fade-up">
        <div class="wa-phone">
          <div class="wa-header">
            <div class="wa-avatar">N</div>
            <div>
              <div class="wa-name">Nexa de fluX</div>
              <div class="wa-status">Cuenta de empresa oficial</div>
            </div>
          </div>
          <div class="wa-chat-bg">
            <div class="wa-bubble in">
              Hola Carlos 👋. Tu factura de energía de este mes por <strong>$45.200</strong> vence mañana. ¿Deseas pagarla ahora con tu método guardado?
              <a class="wa-btn">Sí, pagar ahora</a>
              <span class="wa-time">10:42 a.m.</span>
            </div>
            
            <div class="wa-bubble out">
              Sí, pagar ahora
              <span class="wa-time">10:45 a.m.</span>
            </div>
            
            <div class="wa-typing">
              <div class="wa-dot"></div><div class="wa-dot"></div><div class="wa-dot"></div>
            </div>
            
            <div class="wa-bubble in">
              ¡Pago exitoso! ✅ Aquí tienes tu comprobante. Gracias por estar al día.
              <span class="wa-time">10:45 a.m.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('nexa.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Buscar el punto de inyección
      const injectionPoint = '<!-- BRAND CONFIGURATOR';
      
      // Asegurarse de no inyectarlo dos veces
      if (content.includes(injectionPoint) && !content.includes('WHATSAPP AGENT SECTION')) {
        content = content.replace(injectionPoint, whatsappSection + '\n  ' + injectionPoint);
        fs.writeFileSync(fullPath, content);
        console.log('Successfully injected WhatsApp Agent Section in ' + fullPath);
      } else {
        console.log('Skipped or already present in ' + fullPath);
      }
    }
  });
}

folders.forEach(f => processDirectory(path.join(__dirname, f)));
