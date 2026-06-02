# fluX One — Documento Maestro para Desarrollo Web
**Versión:** 1.0  
**Fecha:** Abril 2026  
**Destino:** Antigravity (Claude Code)

---

## ÍNDICE

1. [Arquitectura de Marca](#1-arquitectura-de-marca)
2. [Estructura de Archivos](#2-estructura-de-archivos)
3. [Especificaciones Técnicas](#3-especificaciones-técnicas)
4. [Copy Completo — Home Colombia](#4-copy-completo-home-colombia)
5. [Copy Completo — Home México](#5-copy-completo-home-méxico)
6. [Páginas Individuales](#6-páginas-individuales)
7. [Portal de Desarrolladores](#7-portal-de-desarrolladores)
8. [FAQ Completas](#8-faq-completas)
9. [Formulario y Modal](#9-formulario-y-modal)
10. [Guía de Uso de Onomatopeyas](#10-guía-de-uso-de-onomatopeyas)
11. [Instrucciones para Antigravity](#11-instrucciones-para-antigravity)

---

## 1. ARQUITECTURA DE MARCA

### La Gran Idea
**"fluX One. Pagos inteligentes."**

### El Claim
**"El dinero no se detiene."**

### La Promesa
Pagos que no solo procesan — **piensan, predicen, optimizan**.

### Posicionamiento
| Elemento | Definición |
|---|---|
| **Gran Idea** | Pagos inteligentes |
| **Promesa** | fluX One existe para hacer todo el mundo de pagos más fácil |
| **Rol de Marca** | Motor de pagos inteligente que democratiza la inmediatez |
| **Diferenciador** | No solo procesamos — anticipamos mora, optimizamos canales, informamos decisiones |
| **Tono** | Directo, retador sin ser agresivo, con personalidad (usa onomatopeyas estratégicamente) |
| **Certificaciones** | ISO 27001:2022 + PCI DSS |

### Pilares Narrativos
**Tiempo + Inmediatez + Crecimiento + Inteligencia**

---

## 2. ESTRUCTURA DE ARCHIVOS

```
flux-web-final/
├── index.html                      # Landing global (redirige o muestra selector)
├── co/                            # Colombia
│   ├── index.html                 # Home Colombia
│   ├── recaudo.html              # Pay-ins
│   ├── dispersion.html           # Pay-outs
│   ├── conciliacion.html         # Conciliación automática
│   ├── bi.html                   # Business Intelligence
│   ├── nexa.html                 # White Label
│   ├── como-funciona.html        # Video/Demo del dashboard
│   └── developers.html           # Portal API Reference
├── mx/                            # México
│   ├── index.html                 # Home México
│   ├── recaudo.html
│   ├── dispersion.html
│   ├── conciliacion.html
│   ├── bi.html
│   ├── nexa.html
│   ├── como-funciona.html
│   └── developers.html
├── css/
│   ├── styles.css                # Estilos principales
│   └── developers.css            # Estilos específicos para /developers
├── js/
│   ├── main.js                   # Funciones generales (smooth scroll, animaciones)
│   ├── modal.js                  # Modal del formulario
│   └── country-selector.js       # Lógica del selector de país
└── assets/
    ├── images/
    │   ├── logos/                # Logos de certificaciones, bancos
    │   ├── icons/                # Iconografía
    │   └── hero/                 # Imágenes del hero
    └── videos/
        └── dashboard-demo.mp4    # Video del dashboard (si aplica)
```

---

## 3. ESPECIFICACIONES TÉCNICAS

### Paleta de Colores fluX
```css
:root {
  /* Colores principales */
  --flux-primary: #0066FF;        /* Azul principal fluX */
  --flux-secondary: #00D9FF;      /* Azul claro/cyan */
  --flux-dark: #0A0E27;          /* Azul oscuro casi negro */
  --flux-gradient: linear-gradient(135deg, #0066FF 0%, #00D9FF 100%);
  
  /* Colores de acento */
  --flux-success: #00D084;
  --flux-warning: #FFB800;
  --flux-error: #FF3B30;
  
  /* Neutrales */
  --flux-white: #FFFFFF;
  --flux-gray-100: #F5F7FA;
  --flux-gray-200: #E4E9F0;
  --flux-gray-300: #C5CEE0;
  --flux-gray-700: #4A5568;
  --flux-gray-900: #1A202C;
  
  /* Para portal developers (dark theme) */
  --dev-bg: #0D1117;
  --dev-sidebar: #161B22;
  --dev-code-bg: #0D1117;
  --dev-text: #C9D1D9;
  --dev-highlight: #58A6FF;
}
```

### Tipografía
```css
/* Fuente principal */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Pesos */
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Tamaños */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
```

### Animaciones a Mantener (del HTML actual)
```css
/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Fade-in al hacer scroll */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Gradient animado en el hero */
.hero-gradient {
  background: linear-gradient(135deg, #0066FF 0%, #00D9FF 100%);
  background-size: 200% 200%;
  animation: gradientShift 8s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Hover en botones */
.btn-primary {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 102, 255, 0.3);
}
```

### Navbar (con selector de país)
```html
<nav class="navbar">
  <div class="container">
    <a href="/" class="logo">
      <img src="/assets/images/logos/flux-logo.svg" alt="fluX One">
    </a>
    
    <ul class="nav-menu">
      <li class="dropdown">
        <a href="#">Productos <span>▾</span></a>
        <ul class="dropdown-menu">
          <li><a href="/recaudo">Recaudo (Pay-ins)</a></li>
          <li><a href="/dispersion">Dispersión (Pay-outs)</a></li>
          <li><a href="/conciliacion">Conciliación</a></li>
          <li><a href="/bi">Business Intelligence</a></li>
          <li><a href="/nexa">Nexa (White Label)</a></li>
        </ul>
      </li>
      <li><a href="/developers">Desarrolladores</a></li>
      <li class="dropdown">
        <a href="#">Recursos <span>▾</span></a>
        <ul class="dropdown-menu">
          <li><a href="/como-funciona">Cómo funciona</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </li>
      
      <!-- Selector de país -->
      <li class="country-selector dropdown">
        <a href="#" id="current-country">
          <img src="/assets/images/flags/co.svg" class="flag-icon"> Col <span>▾</span>
        </a>
        <ul class="dropdown-menu">
          <li><a href="/co"><img src="/assets/images/flags/co.svg" class="flag-icon"> Colombia</a></li>
          <li><a href="/mx"><img src="/assets/images/flags/mx.svg" class="flag-icon"> México</a></li>
        </ul>
      </li>
    </ul>
    
    <div class="nav-actions">
      <a href="#" class="btn-text">Iniciar sesión</a>
      <a href="#" class="btn-primary" onclick="openModal()">Comienza hoy</a>
    </div>
  </div>
</nav>
```

---

## 4. COPY COMPLETO — HOME COLOMBIA

### **SECCIÓN 1: HERO**

**Headline (H1):**
```
Pagos inteligentes para empresas que no se detienen.
```

**Subheadline:**
```
Recauda, dispersa, concilia y toma decisiones con inteligencia de negocio integrada. 
Todo en una sola API. Sin esperas. Sin errores. Sin límites.
```

**CTAs (dos botones lado a lado):**
```html
<button class="btn-primary" onclick="openModal()">Agenda una demo →</button>
<button class="btn-secondary" onclick="window.location.href='/co/como-funciona'">Ver cómo funciona →</button>
```

**Badges de certificaciones (debajo del subheadline):**
```html
<div class="certifications">
  <img src="/assets/images/logos/iso-27001.svg" alt="ISO 27001:2022">
  <img src="/assets/images/logos/pci-dss.svg" alt="PCI DSS">
</div>
```

**Visual:**
Figura azul/morada en movimiento (del HTML actual) con overlay de micro-animaciones de datos fluyendo, gráficas predictivas, alertas — sugiriendo "inteligencia en acción".

---

### **SECCIÓN 2: PRODUCTOS EN BLOQUES**

**Headline (H2):**
```
Recaudo. Dispersión. Inteligencia. Todo en un solo lugar.
```

**3 Bloques (tarjetas):**

#### **Bloque 1: Recaudo Inteligente**
**Título:**
```
Recaudo Inteligente
```

**Copy:**
```
• Acepta dinero de cualquier fuente en una sola integración
• Conciliación automática en tiempo real
• Predicción de comportamiento de pago
```

**Badge (opcional):**
```html
<span class="badge-new">Bre-B</span>
```

**CTA:**
```html
<a href="/co/recaudo" class="link-arrow">Conoce más →</a>
```

---

#### **Bloque 2: Dispersión sin Límites**
**Título:**
```
Dispersión sin Límites
```

**Copy:**
```
• Miles de pagos en un solo clic
• Liquidación inmediata 24/7
• Optimización de canales en tiempo real
```

**CTA:**
```html
<a href="/co/dispersion" class="link-arrow">Conoce más →</a>
```

---

#### **Bloque 3: Inteligencia de Negocio**
**Título:**
```
Inteligencia de Negocio
```

**Copy:**
```
• Predicción de mora antes de que ocurra
• Dashboards ejecutivos en tiempo real
• Optimización de canales de recaudo
```

**Badge:**
```html
<span class="badge-new">NUEVO</span>
```

**CTA:**
```html
<a href="/co/bi" class="link-arrow">Conoce más →</a>
```

---

### **SECCIÓN 3: UNA API, TODO EL ECOSISTEMA**

**Headline (H2):**
```
Una API. Todo el ecosistema de pagos.
```

**Copy:**
```
Conecta tu ERP, bases de datos y reglas de negocio con bancos, billeteras y Bre-B. 
fluX orquesta todos los rieles de pago en tiempo real para que tu operación nunca se detenga.
```

**Números destacados (4 bloques):**

```html
<div class="stats-grid">
  <div class="stat">
    <h3>&lt;20s</h3>
    <p>por transacción</p>
  </div>
  
  <div class="stat">
    <h3>1</h3>
    <p>sola integración</p>
  </div>
  
  <div class="stat">
    <h3>0</h3>
    <p>conciliaciones manuales</p>
  </div>
  
  <div class="stat">
    <h3>24/7</h3>
    <p>siempre disponible</p>
  </div>
</div>
```

**Visual:**
Diagrama de conectividad:
```
[ERPs / Bases de datos] → [fluX] → [Bancos / Billeteras / Bre-B]
```

---

### **SECCIÓN 4: PARA QUIÉN ES fluX**

**Headline (H2):**
```
Diseñado para empresas que mueven dinero en serio.
```

**Copy introductorio:**
```
Para empresas con alto volumen transaccional que necesitan:
```

**Lista de necesidades (bullets o checkmarks):**
```
✓ Recaudar y dispersar con inmediatez 24/7
✓ Conciliar automáticamente sin Excel ni errores
✓ Predecir mora y optimizar canales con inteligencia de negocio
✓ Integrar vía API o gestionar desde un dashboard ejecutivo
```

**3 Segmentos (bloques con íconos):**

#### **Segmento 1:**
**Título:**
```
Empresas con nóminas masivas
```

**Copy:**
```
Dispersa a miles de empleados en un clic. Con predicción de rebotes, 
optimización de canales y conciliación automática.
```

---

#### **Segmento 2:**
**Título:**
```
Plataformas y marketplaces
```

**Copy:**
```
Recauda de miles, dispersa a miles. Conciliación en tiempo real para 
que sepas quién pagó y cuándo, sin perseguir facturas.
```

---

#### **Segmento 3:**
**Título:**
```
Empresas de servicios públicos y suscripciones
```

**Copy:**
```
Predice mora antes de que ocurra. Optimiza recaudo por canal. 
Reduce cartera vencida con inteligencia aplicada.
```

**CTA:**
```html
<button class="btn-primary" onclick="openModal()">Contacta a ventas →</button>
```

---

### **SECCIÓN 5: SEGURIDAD Y CUMPLIMIENTO**

**Headline (H2):**
```
Seguridad de nivel bancario.
```

**Logos de certificaciones (destacados):**
```html
<div class="certifications-row">
  <div class="cert-badge">
    <img src="/assets/images/logos/iso-27001-full.svg" alt="ISO 27001:2022">
    <p>ISO 27001:2022</p>
    <span class="cert-desc">Gestión integral de la seguridad de la información</span>
  </div>
  
  <div class="cert-badge">
    <img src="/assets/images/logos/pci-dss-full.svg" alt="PCI DSS">
    <p>PCI DSS</p>
    <span class="cert-desc">Cumplimiento para la protección de información de tarjetas</span>
  </div>
</div>
```

**3 Bloques de seguridad:**

#### **Bloque 1:**
**Título:**
```
Cumplimiento regulatorio
```

**Copy:**
```
Operamos bajo supervisión de la Superintendencia Financiera de Colombia (SFC). 
Cumplimos todas las normativas SARLAFT y protección de datos aplicables.
```

---

#### **Bloque 2:**
**Título:**
```
Protección de datos certificada
```

**Copy:**
```
ISO 27001 y PCI DSS validan nuestros controles de seguridad. Encriptación end-to-end. 
Almacenamiento seguro. Auditorías continuas.
```

---

#### **Bloque 3:**
**Título:**
```
Monitoreo 24/7
```

**Copy:**
```
Detección de anomalías en tiempo real. Alertas automáticas. 
Trazabilidad total de cada transacción.
```

---

### **SECCIÓN 6: POR QUÉ ELEGIR fluX**

**Headline (H2):**
```
¿Por qué elegir fluX?
```

**4 Diferenciadores (bloques con íconos):**

#### **Diferenciador 1:**
**Título:**
```
Pagos que piensan
```

**Copy:**
```
No solo procesamos — anticipamos mora, optimizamos canales, informamos decisiones. 
Eso es un pago inteligente.
```

---

#### **Diferenciador 2:**
**Título:**
```
Ejecución en tiempo real, 24/7/365
```

**Copy:**
```
Procesa pagos y recaudos en segundos, sin importar el banco, el día o la hora. 
El dinero no se detiene.
```

---

#### **Diferenciador 3:**
**Título:**
```
Visibilidad total
```

**Copy:**
```
Dashboards ejecutivos en tiempo real. Sabes quién pagó, quién no, y quién va a fallar. 
Información accionable, no solo reportes.
```

---

#### **Diferenciador 4:**
**Título:**
```
Automatización de punta a punta
```

**Copy:**
```
Desde recaudo hasta conciliación contable. Sin tareas manuales. Sin errores. 
Sin perseguir facturas.
```

---

### **SECCIÓN 7: FAQ (PREGUNTAS FRECUENTES)**

**Headline (H2):**
```
Preguntas Frecuentes
```

**Formato:**
Acordeón expandible.

*(Ver sección completa de FAQ más adelante en este documento)*

---

### **SECCIÓN 8: CTA FINAL + FORMULARIO**

**Headline (H2):**
```
Psst... ¿listo para ver fluX en acción?
```

**Copy:**
```
Agenda una demo de 15 minutos y descubre cómo fluX se integra con tu operación. 
Te mostramos cómo funciona con tus datos reales.
```

**Formulario:**

```html
<form id="demo-form" class="demo-form">
  <div class="form-row">
    <input type="text" name="nombre" placeholder="Nombre completo" required>
    <input type="email" name="email" placeholder="Email corporativo" required>
  </div>
  
  <div class="form-row">
    <input type="text" name="empresa" placeholder="Empresa" required>
    <select name="pais" required>
      <option value="">País</option>
      <option value="CO" selected>Colombia</option>
      <option value="MX">México</option>
    </select>
  </div>
  
  <div class="form-row">
    <input type="tel" name="telefono" placeholder="Teléfono (opcional)">
    <select name="necesidad" required>
      <option value="">¿Qué necesitas?</option>
      <option value="recaudo">Recaudo</option>
      <option value="dispersion">Dispersión</option>
      <option value="conciliacion">Conciliación</option>
      <option value="bi">Inteligencia de Negocio</option>
      <option value="todo">Todo lo anterior</option>
    </select>
  </div>
  
  <button type="submit" class="btn-primary btn-large">Agenda tu demo →</button>
</form>
```

**PSS (debajo del formulario):**
```html
<p class="pss">
  <strong>P.S.</strong> El futuro de los pagos empresariales ya llegó. 
  La pregunta es: ¿cuándo lo vas a usar?
</p>
```

**Texto legal:**
```html
<p class="legal-text">
  Al enviar este formulario aceptas nuestra 
  <a href="/politica-privacidad">política de privacidad</a>. 
  Nos pondremos en contacto en menos de 24 horas hábiles.
</p>
```

---

## 5. COPY COMPLETO — HOME MÉXICO

**Nota:** La estructura es idéntica a Colombia. Solo cambian:

### **Diferencias México vs Colombia:**

#### **Sección 2 — Productos en Bloques**
**Bloque 1: Recaudo Inteligente**

Badge cambia de "Bre-B" a:
```html
<span class="badge-new">SPEI</span>
```

#### **Sección 3 — Una API, Todo el Ecosistema**

**Copy:**
```
Conecta tu ERP, bases de datos y reglas de negocio con bancos, billeteras y SPEI. 
fluX orquesta todos los rieles de pago en tiempo real para que tu operación nunca se detenga.
```

**Visual del diagrama:**
```
[ERPs / Bases de datos] → [fluX] → [Bancos / Billeteras / SPEI / CoDi]
```

#### **Sección 5 — Seguridad y Cumplimiento**

**Bloque 1: Cumplimiento regulatorio**

**Copy:**
```
Operamos bajo supervisión de la Comisión Nacional Bancaria y de Valores (CNBV). 
Cumplimos todas las normativas de Prevención de Lavado de Dinero (PLD) y protección de datos aplicables.
```

#### **Footer**

Cambia datos legales:
- Dirección México
- Teléfono México
- Razón social México

---

## 6. PÁGINAS INDIVIDUALES

### **6.1 — /RECAUDO (Pay-ins)**

#### **Hero**

**Headline:**
```
Recaudo inteligente. Conciliación automática.
```

**Subheadline:**
```
Acepta dinero de cualquier fuente a través de una sola integración. 
Conciliación en tiempo real. Sin Excel. Sin errores. Sin perseguir facturas.
```

**CTA:**
```html
<button class="btn-primary" onclick="openModal()">Agenda una demo →</button>
```

---

#### **Sección: ¿Qué hace inteligente al recaudo?**

**3 Capacidades:**

**1. Aceptación universal**
```
Recibe pagos desde cualquier banco, billetera o rail de pago. 
Una sola API conecta todo el ecosistema financiero.
```

**2. Conciliación en tiempo real**
```
Cruce automático de pagos con facturas. Sabes quién pagó al instante. 
Sin intervención manual. Sin errores humanos.
```

**3. Predicción de comportamiento**
```
Modelos predictivos que identifican patrones de pago. Sabes quién paga a tiempo, 
quién paga tarde, y quién va a fallar antes de que ocurra.
```

---

#### **Sección: Casos de uso**

**Caso 1: Empresas de servicios públicos**
```
Recauda de millones de usuarios a través de múltiples canales. 
Concilia automáticamente. Reduce mora con alertas proactivas.
```

**Caso 2: Plataformas de suscripción**
```
Cobra automáticamente vía domiciliación. Evita corte de servicio. 
Asegura puntualidad del recaudo.
```

**Caso 3: Marketplaces**
```
Recauda de miles de compradores. Dispersa a miles de vendedores. 
Todo conciliado en tiempo real.
```

---

#### **CTA Final**
```html
<h2>Psst... ¿quieres ver cómo funciona la conciliación automática?</h2>
<button class="btn-primary" onclick="window.location.href='/como-funciona'">Ver demo →</button>
```

---

### **6.2 — /DISPERSION (Pay-outs)**

#### **Hero**

**Headline:**
```
Dispersión masiva. En un clic.
```

**Subheadline:**
```
Miles de pagos procesados en segundos. Liquidación inmediata 24/7. 
Optimización de canales en tiempo real.
```

**CTA:**
```html
<button class="btn-primary" onclick="openModal()">Agenda una demo →</button>
```

---

#### **Sección: ¿Qué hace inteligente a la dispersión?**

**3 Capacidades:**

**1. Dispersión masiva sin límites**
```
Paga a miles de empleados, proveedores o beneficiarios en un solo clic. 
Sin límites de volumen. Sin esperar horarios bancarios.
```

**2. Optimización de canales**
```
fluX elige automáticamente el canal más eficiente para cada transacción. 
Optimiza costos sin sacrificar velocidad.
```

**3. Predicción de rebotes**
```
Modelos predictivos que identifican cuentas con alta probabilidad de rechazo. 
Te alertamos antes de dispersar.
```

---

#### **Sección: Casos de uso**

**Caso 1: Nóminas masivas**
```
Dispersa a miles de empleados en minutos. Con predicción de rebotes y 
optimización de canales. Sin errores.
```

**Caso 2: Proveedores y aliados**
```
Paga a cientos de proveedores en un solo archivo. Conciliación automática. 
Trazabilidad total.
```

**Caso 3: Marketplaces y plataformas**
```
Dispersa a miles de vendedores después de cada transacción. 
Liquidación inmediata. Sin fricciones.
```

---

#### **CTA Final**
```html
<h2>¿Listo para dispersar sin límites?</h2>
<button class="btn-primary" onclick="openModal()">Agenda tu demo →</button>
```

---

### **6.3 — /BI (Business Intelligence)**

#### **Hero**

**Headline:**
```
Inteligencia que convierte datos en decisiones.
```

**Subheadline:**
```
Cada transacción genera información. fluX la convierte en inteligencia accionable 
para optimizar tu operación, reducir cartera vencida y tomar decisiones basadas en datos.
```

**CTA:**
```html
<button class="btn-primary" onclick="openModal()">Agenda una demo →</button>
```

---

#### **Sección: Capacidades de Business Intelligence**

**6 Capacidades (acordeón o tabs):**

**1. Analítica de comportamiento de pago**
```
Frecuencia, días de pago, historial de mora, ciclo de recaudo, ticket promedio. 
Entiende hábitos para diseñar estrategias de fidelización y cobranza.
```

**2. Modelos predictivos de cartera**
```
Identificación de riesgo de mora, probabilidad de pago tardío, segmentos de recuperación. 
Anticipa cartera vencida antes de que ocurra.
```

**3. Segmentación inteligente de usuarios**
```
Clasificación por canal preferido, recurrencia, cumplimiento, volumen de pago. 
Personaliza campañas y mejora efectividad comercial.
```

**4. Optimización de canales de recaudo**
```
Medición de KPIs por canal: tasa de éxito, costos transaccionales, tiempo promedio. 
Decide dónde invertir y dónde optimizar.
```

**5. Geointeligencia comercial**
```
Visualización territorial de zonas de mora, concentración de pagos, cobertura comercial. 
Toma decisiones con criterio geográfico.
```

**6. Dashboards ejecutivos en tiempo real**
```
Recaudo diario, cumplimiento presupuestal, cartera vencida, recuperación, efectividad por canal. 
Visibilidad inmediata para CFOs y gerentes.
```

---

#### **Sección: Visualización del dashboard**

```html
<div class="dashboard-preview">
  <img src="/assets/images/dashboard-screenshot.png" alt="Dashboard fluX BI">
  <p class="caption">Dashboard ejecutivo en tiempo real</p>
  <a href="/como-funciona" class="link-arrow">Ver en acción →</a>
</div>
```

---

#### **CTA Final**
```html
<h2>Psst... ¿quieres predecir mora antes de que ocurra?</h2>
<button class="btn-primary" onclick="openModal()">Descubre cómo →</button>
```

---

### **6.4 — /NEXA (White Label)**

#### **Hero**

**Headline:**
```
Nexa: Tu ecosistema financiero con tu marca.
```

**Subheadline:**
```
Nexa no es solo una app. Es el universo donde el ecosistema financiero de tu empresa vive. 
White label, totalmente personalizable, respaldado por toda la infraestructura de fluX.
```

**CTA:**
```html
<button class="btn-primary" onclick="openModal()">Conoce Nexa →</button>
```

---

#### **Sección: 3 Beneficios clave**

**1. Interfaz de usuario (Front-end)**
```
La cara visible de fluX para que tus clientes paguen en segundos. 
Con tu marca, tus colores, tu identidad.
```

**2. Lanzamiento inmediato**
```
Experiencia financiera de alto nivel desde el día 1. Sin desarrollar desde cero. 
Sin meses de implementación.
```

**3. Poder fluX integrado**
```
Conexión total con recaudo, conciliación, dispersión e inteligencia de negocio. 
Todo el poder de fluX bajo tu marca.
```

---

#### **Sección: Casos de uso de Nexa**

**Cobro proactivo**
```
Alertas inteligentes vía WhatsApp y Push que reducen la morosidad antes del vencimiento.
```

**Domiciliación o débito automático**
```
Cobro automático mensual vía tokenización. Evita corte de servicio y asegura 
puntualidad del recaudo.
```

**Pago de facturas en un clic**
```
Tus clientes cargan todos sus recibos y pagan con un solo clic. 
Sin entrar a múltiples portales. Sin esperas.
```

---

#### **Nota White Label**
```html
<div class="white-label-note">
  <p>
    Nuestra billetera móvil Nexa también está disponible bajo un modelo White Label. 
    Esto permite que su empresa despliegue una solución financiera propia, con su identidad 
    de marca y totalmente personalizada, respaldada por toda la potencia tecnológica y la 
    infraestructura de fluX.
  </p>
</div>
```

---

#### **CTA Final**
```html
<h2>¿Tu marca merece su propio ecosistema financiero?</h2>
<button class="btn-primary" onclick="openModal()">Hablemos →</button>
```

---

### **6.5 — /COMO-FUNCIONA (Video/Demo)**

#### **Hero**

**Headline:**
```
Así funciona fluX en tiempo real.
```

**Copy:**
```
Mira cómo fluX recauda, dispersa, concilia y genera inteligencia de negocio — 
todo desde un solo dashboard. Sin edición. Sin filtros. Así es la operación real.
```

---

#### **Sección: Video del dashboard**

```html
<div class="video-container">
  <video controls poster="/assets/images/dashboard-poster.jpg">
    <source src="/assets/videos/dashboard-demo.mp4" type="video/mp4">
    Tu navegador no soporta el elemento de video.
  </video>
</div>
```

**Duración sugerida del video:** 90-120 segundos

**Qué debería mostrar:**
1. Recaudo en tiempo real — transacciones entrando, conciliación automática
2. Dispersión masiva — un clic, miles de pagos procesándose
3. Alertas de mora predictiva — dashboard mostrando cuentas en riesgo
4. BI en acción — gráficas de comportamiento, mapas de calor, KPIs actualizándose

---

#### **Sección: Lo que acabas de ver**

**Headline:**
```
Lo que acabas de ver en 90 segundos:
```

**4 Bloques:**

**Recaudo inteligente**
```
Aceptamos pagos de cualquier fuente. Conciliación automática en tiempo real. 
Sin perseguir facturas.
```

**Dispersión sin límites**
```
Miles de pagos en un clic. Optimización de canales. Predicción de rebotes 
antes de que ocurran.
```

**Inteligencia predictiva**
```
Identificamos quién va a entrar en mora antes de que pase. Modelos de 
comportamiento aplicados al recaudo.
```

**Dashboards ejecutivos**
```
KPIs en tiempo real. Visibilidad total de recaudo, cartera vencida, 
efectividad por canal.
```

---

#### **CTA Final**
```html
<h2>¿Listo para ver fluX en acción con tus datos?</h2>
<p>Agenda una demo personalizada de 15 minutos. Te mostramos cómo fluX se integra 
con tu ERP y optimiza tu operación desde el día 1.</p>
<button class="btn-primary" onclick="openModal()">Agenda tu demo →</button>
```

---

## 7. PORTAL DE DESARROLLADORES

**Ruta:** `/developers`

### **Diseño:**
- **Estética dark theme** (como la imagen de referencia)
- **Sidebar de navegación fija** (izquierda)
- **Contenido principal** (centro-derecha)
- **Syntax highlighting** para código

### **Estructura del Sidebar:**

```html
<aside class="dev-sidebar">
  <div class="sidebar-header">
    <a href="/">
      <img src="/assets/images/logos/flux-logo-white.svg" alt="fluX">
    </a>
    <span class="badge">DEV v1.0</span>
  </div>
  
  <nav class="sidebar-nav">
    <div class="nav-section">
      <h4>Getting Started</h4>
      <ul>
        <li><a href="#introduction">Introduction</a></li>
        <li class="active"><a href="#authentication">Authentication</a></li>
        <li><a href="#errors">Errors</a></li>
      </ul>
    </div>
    
    <div class="nav-section">
      <h4>Core Resources</h4>
      <ul>
        <li><a href="#payments">Payments (Payouts)</a></li>
        <li><a href="#collections">Collections (Pay-ins)</a></li>
        <li><a href="#webhooks">Webhooks</a></li>
      </ul>
    </div>
  </nav>
  
  <div class="sidebar-footer">
    <div class="api-status">
      <span class="status-indicator online"></span>
      <span>API Systems</span>
      <span class="uptime">24ms</span>
    </div>
  </div>
</aside>
```

---

### **Contenido Principal:**

#### **Breadcrumb:**
```html
<div class="breadcrumb">
  <a href="/">← Back to Home</a> / 
  <a href="/developers">Developers</a> / 
  <a href="/developers/partners">Partners</a> / 
  <span>API Reference</span>
</div>
```

---

#### **Hero:**

**Headline:**
```
FluX Partners API
```

**Subheadline:**
```
Documentación de referencia para la API de Partners. Autenticación vía header X-API-Key. 
Todas las peticiones deben realizarse sobre HTTPS.
```

---

#### **Sección: Inicio Rápido**

**Base URL:**
```
https://api.flux.finance
```

**Auth Header:**
```
X-API-Key: <FLUX_API_KEY>
```

---

#### **Tu API Key (con reveal):**

```html
<div class="api-key-box">
  <h4>Your API Key</h4>
  <div class="key-container">
    <span class="mode-badge">Live Mode</span>
    <code id="api-key">sk_live_••••••••••••••••••••</code>
    <button onclick="revealKey()" class="btn-reveal">👁 Reveal</button>
  </div>
  <p class="warning">
    ⚠️ Keep your API key secure. Never share it in public repositories or client-side code.
  </p>
</div>
```

---

#### **Tu Primera Petición:**

**Tabs de lenguajes:**

```html
<div class="code-tabs">
  <button class="tab active" onclick="showCode('curl')">cURL</button>
  <button class="tab" onclick="showCode('node')">Node.js</button>
  <button class="tab" onclick="showCode('python')">Python</button>
</div>

<div class="code-container">
  <pre class="code-block curl active"><code>curl -X GET https://api.flux.finance/partners/banks \
  -H "X-API-Key: &lt;FLUX_API_KEY&gt;" \
  -H "Content-Type: application/json"</code></pre>
  
  <pre class="code-block node"><code>const axios = require('axios');

const response = await axios.get('https://api.flux.finance/partners/banks', {
  headers: {
    'X-API-Key': '&lt;FLUX_API_KEY&gt;',
    'Content-Type': 'application/json'
  }
});

console.log(response.data);</code></pre>
  
  <pre class="code-block python"><code>import requests

response = requests.get(
  'https://api.flux.finance/partners/banks',
  headers={
    'X-API-Key': '&lt;FLUX_API_KEY&gt;',
    'Content-Type': 'application/json'
  }
)

print(response.json())</code></pre>
</div>
```

---

#### **Sección: Endpoints**

**Formato de tabla:**

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/partners/banks` | Catálogo SPEI. Query opcional: page, page_size |
| `GET` | `/partners/clients/{clientId}/accounts` | Listar cuentas de un cliente |
| `POST` | `/partners/clients/{clientId}/private-accounts` | Crear cuenta privada para un cliente |
| `GET` | `/partners/clients/{clientId}/instruments` | Listar instrumentos de un cliente |
| `GET` | `/partners/clients/{clientId}/instruments/{instrumentId}` | Obtener detalle de un instrumento |
| `POST` | `/partners/clients/{clientId}/instruments` | Crear un instrumento para un cliente |
| `POST` | `/partners/transactions/money-out` | Transferencia SPEI. Recomendado: Idempotency-Key |
| `POST` | `/partners/clients/{clientId}/transactions/{transactionId}/refund` | Reembolsar una transacción |
| `GET` | `/partners/clients/{clientId}/webhooks` | Listar webhooks configurados |
| `POST` | `/partners/clients/{clientId}/webhooks` | Crear un webhook |
| `PATCH` | `/partners/clients/{clientId}/webhooks/{id}` | Actualizar un webhook |
| `DELETE` | `/partners/clients/{clientId}/webhooks/{id}` | Eliminar un webhook |
| `POST` | `/partners/webhooks/money-in` | Endpoint llamado por Monato. Valida X-Webhook-Token |

---

#### **Sección: Notas de Seguridad**

```
• No loguear tokens ni API Keys en texto plano
• Aplicar rate-limit por API Key
• Validación estricta de UUIDs y montos en el borde
• Idempotencia obligatoria en money-out para integradores
```

---

## 8. FAQ COMPLETAS

**Formato:** Acordeón expandible (cada pregunta se puede expandir/colapsar)

---

### **FAQ 1:**
**Pregunta:**
```
¿Qué es fluX One?
```

**Respuesta:**
```
fluX One es una plataforma de pagos inteligentes que centraliza recaudo, dispersión, 
conciliación e inteligencia de negocio en una sola API. Conecta tu ERP con todos los 
rieles de pago (bancos, billeteras, Bre-B en Colombia / SPEI en México) y convierte 
cada transacción en información accionable.
```

---

### **FAQ 2:**
**Pregunta:**
```
¿Qué hace "inteligente" a un pago?
```

**Respuesta:**
```
Un pago inteligente no solo se procesa — anticipa comportamientos (predice mora), 
optimiza canales (elige la ruta más eficiente), concilia automáticamente (sin Excel) 
e informa decisiones (dashboards en tiempo real). Eso es lo que diferencia a fluX de 
un motor de pagos tradicional.
```

---

### **FAQ 3:**
**Pregunta:**
```
¿fluX One es solo para empresas grandes?
```

**Respuesta:**
```
No. fluX One está construido para empresas que mueven dinero en serio, independientemente 
de su tamaño. Desde PYMES en crecimiento hasta corporativos con miles de transacciones 
diarias. Si tienes alto volumen transaccional y necesitas automatización, fluX es para ti.
```

---

### **FAQ 4:**
**Pregunta:**
```
¿Cuánto tiempo toma la integración?
```

**Respuesta:**
```
La integración técnica (Fase 1) toma entre 2-4 semanas dependiendo de la complejidad de 
tu ERP y tus reglas de negocio. En Fase 2 ya estás procesando transacciones en producción. 
El proceso completo hasta tener inteligencia de negocio operativa toma aproximadamente 
8-12 semanas.
```

---

### **FAQ 5:**
**Pregunta:**
```
¿Qué es Nexa y cómo funciona?
```

**Respuesta:**
```
Nexa es el ecosistema financiero white label de fluX. Permite que tu empresa despliegue 
su propia solución financiera (con tu marca, tus colores, tu identidad) respaldada por 
toda la infraestructura de fluX. No es solo una app — es el universo donde tus clientes 
interactúan con pagos, alertas, domiciliaciones y más. Todo bajo tu marca.
```

---

### **FAQ 6:**
**Pregunta:**
```
¿fluX reemplaza mi banco?
```

**Respuesta:**
```
No. fluX no es un banco. Es un middleware que orquesta todos tus rieles de pago 
(incluidos bancos) en una sola plataforma. Puedes seguir trabajando con tus bancos 
actuales mientras fluX optimiza y centraliza toda la operación financiera.
```

---

### **FAQ 7:**
**Pregunta:**
```
¿Cómo funciona la predicción de mora?
```

**Respuesta:**
```
fluX analiza el comportamiento histórico de pago de cada cliente (frecuencia, días de pago, 
montos, patrones estacionales) y genera modelos predictivos que identifican quién tiene 
alta probabilidad de entrar en mora antes de que ocurra. Esto te permite tomar acción 
preventiva: enviar alertas, ajustar estrategias de cobranza, o priorizar seguimiento.
```

---

### **FAQ 8:**
**Pregunta:**
```
¿fluX tiene API para desarrolladores?
```

**Respuesta:**
```
Sí. fluX tiene una API REST completa con documentación para partners y desarrolladores. 
Autenticación vía X-API-Key. Consulta nuestro portal de desarrolladores para más información 
y ejemplos de código en cURL, Node.js y Python.
```

---

### **FAQ 9:**
**Pregunta:**
```
¿Qué rieles de pago soporta fluX?
```

**Respuesta:**
```
En Colombia: ACH, Bre-B, PSE, bancos tradicionales, billeteras digitales (Nequi, Daviplata, etc.).
En México: SPEI, CoDi, bancos tradicionales, billeteras digitales.
La lista completa y actualizada está disponible en nuestra documentación técnica.
```

---

### **FAQ 10:**
**Pregunta:**
```
¿Cómo agenda una demo?
```

**Respuesta:**
```
Haz clic en "Agenda una demo" en cualquier parte del sitio, completa el formulario con 
tus datos, y nos pondremos en contacto en menos de 24 horas hábiles. La demo dura 15 minutos 
y te mostramos cómo fluX se integra con tu operación usando tus datos reales.
```

---

## 9. FORMULARIO Y MODAL

### **Formulario Embebido (en home, sección 8):**

Ya incluido en la Sección 8 del home.

---

### **Modal (popup que se abre desde cualquier botón "Agenda demo"):**

```html
<!-- Modal Structure -->
<div id="demo-modal" class="modal">
  <div class="modal-overlay" onclick="closeModal()"></div>
  
  <div class="modal-container">
    <button class="modal-close" onclick="closeModal()">✕</button>
    
    <div class="modal-header">
      <h2>Agenda tu demo de fluX</h2>
      <p>Te contactamos en menos de 24 horas hábiles</p>
    </div>
    
    <form id="modal-demo-form" class="demo-form" onsubmit="submitDemoForm(event)">
      <div class="form-row">
        <input type="text" name="nombre" placeholder="Nombre completo" required>
        <input type="email" name="email" placeholder="Email corporativo" required>
      </div>
      
      <div class="form-row">
        <input type="text" name="empresa" placeholder="Empresa" required>
        <select name="pais" required>
          <option value="">País</option>
          <option value="CO">Colombia</option>
          <option value="MX">México</option>
        </select>
      </div>
      
      <div class="form-row">
        <input type="tel" name="telefono" placeholder="Teléfono (opcional)">
        <select name="necesidad" required>
          <option value="">¿Qué necesitas?</option>
          <option value="recaudo">Recaudo</option>
          <option value="dispersion">Dispersión</option>
          <option value="conciliacion">Conciliación</option>
          <option value="bi">Inteligencia de Negocio</option>
          <option value="todo">Todo lo anterior</option>
        </select>
      </div>
      
      <button type="submit" class="btn-primary btn-large">Enviar solicitud →</button>
      
      <p class="legal-text">
        Al enviar este formulario aceptas nuestra 
        <a href="/politica-privacidad">política de privacidad</a>.
      </p>
    </form>
  </div>
</div>
```

---

### **JavaScript del Modal:**

```javascript
// modal.js

function openModal() {
  document.getElementById('demo-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('demo-modal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function submitDemoForm(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  
  // Aquí va la lógica de envío al backend
  console.log('Demo form submitted:', data);
  
  // Simulación de envío exitoso
  alert('¡Gracias! Nos pondremos en contacto en menos de 24 horas.');
  closeModal();
  event.target.reset();
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});
```

---

### **CSS del Modal:**

```css
/* Modal */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.modal.active {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 14, 39, 0.8);
  backdrop-filter: blur(8px);
}

.modal-container {
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 40px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease;
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: var(--flux-gray-700);
  transition: color 0.2s;
}

.modal-close:hover {
  color: var(--flux-primary);
}

.modal-header {
  margin-bottom: 30px;
}

.modal-header h2 {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  margin-bottom: 8px;
}

.modal-header p {
  color: var(--flux-gray-700);
}
```

---

## 10. GUÍA DE USO DE ONOMATOPEYAS

### **Cuándo SÍ usar onomatopeyas:**

✅ **Para captar atención** — al inicio de un headline o copy importante
```
Ejemplo: "Psst... ¿listo para ver fluX en acción?"
```

✅ **Para revelar algo sorprendente**
```
Ejemplo: "Pssst... ¿sabías que puedes predecir mora antes de que ocurra?"
```

✅ **Para crear complicidad con el cliente**
```
Ejemplo: "Ey, ey... tu competencia ya dejó de esperar al lunes."
```

✅ **En posts de redes para romper el scroll**
```
Ejemplo: "Psst... tu equipo está gastando 60% de su tiempo conciliando. ¿En qué lo invertirías?"
```

---

### **Cuándo NO usar onomatopeyas:**

❌ **Documentación técnica** (API Reference, especificaciones)

❌ **Textos legales** (políticas de privacidad, términos y condiciones)

❌ **Secciones de seguridad/certificaciones** (esas deben ser serias y profesionales)

❌ **Más de 1-2 veces por página** (el exceso las vuelve molestas)

---

### **Onomatopeyas permitidas en fluX:**

- **Psst...** / **Pssst...** (revelar un secreto, captar atención)
- **Ey, ey...** (tono casual, cómplice)
- **Oye...** (llamar la atención de forma directa)

---

### **Ejemplos de uso correcto:**

**En web:**
```
Headline: "Psst... ¿tu motor de pagos piensa, o solo obedece?"
```

**En redes:**
```
Post: "Pssst... mientras tu banco duerme, tu competencia ya procesó 1,000 pagos. 
fluX no se detiene. Nunca. 🚀"
```

**En emails:**
```
Subject: "Psst... ¿sigues conciliando en Excel?"
```

---

## 11. INSTRUCCIONES PARA ANTIGRAVITY

### **Paso 1: Crear estructura de archivos**

Genera la estructura completa de carpetas y archivos según la sección 2 de este documento.

---

### **Paso 2: Configurar estilos base**

Crear `/css/styles.css` con:
- Variables CSS (colores, tipografía) según sección 3
- Estilos del navbar con dropdown de país
- Estilos de botones, formularios, modal
- Clases de animación (fade-in, gradient shift, etc.)

---

### **Paso 3: Crear páginas principales**

#### **3.1 — Home Colombia (`/co/index.html`)**
Usar el copy completo de la sección 4.

**Componentes a incluir:**
- Navbar con selector de país
- Hero con gradiente animado
- 8 secciones según estructura
- FAQ en acordeón
- Formulario embebido en sección 8
- Footer con datos de Colombia

#### **3.2 — Home México (`/mx/index.html`)**
Clonar estructura de Colombia, aplicar cambios de la sección 5.

---

### **Paso 4: Crear páginas individuales**

Según sección 6, crear:
- `/co/recaudo.html`
- `/co/dispersion.html`
- `/co/bi.html`
- `/co/nexa.html`
- `/co/como-funciona.html`

Y sus equivalentes en `/mx/`

---

### **Paso 5: Crear portal de desarrolladores**

Según sección 7:
- Crear `/css/developers.css` (dark theme)
- Estructura de sidebar + contenido principal
- Syntax highlighting para bloques de código
- Tabs de lenguajes (cURL, Node.js, Python)
- API Key reveal functionality

---

### **Paso 6: Implementar FAQ**

Según sección 8:
- Acordeón expandible con JavaScript
- 10 preguntas con sus respuestas
- Accesible vía teclado (ARIA compliant)

---

### **Paso 7: Implementar formulario y modal**

Según sección 9:
- Formulario embebido en home (sección 8)
- Modal reutilizable que se abre desde cualquier botón "Agenda demo"
- JavaScript para abrir/cerrar modal
- Validación de campos
- Integración con backend (preparar endpoint, dejar comentado por ahora)

---

### **Paso 8: JavaScript principal**

Crear `/js/main.js` con:

```javascript
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Fade-in on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Country selector
function setCountry(country) {
  // Lógica para cambiar país (redirigir a /co o /mx)
  window.location.href = `/${country}`;
}
```

---

### **Paso 9: Responsive Design**

Asegurar que todos los componentes sean responsive:
- Navbar colapsa en hamburger menu en móvil
- Formulario en 1 columna en móvil
- Tablas de endpoints con scroll horizontal en móvil
- Sidebar del portal developers se oculta en móvil (toggle button)

---

### **Paso 10: Testing y validación**

- [ ] Todas las páginas cargan correctamente en localhost
- [ ] Animaciones funcionan en scroll
- [ ] Modal se abre y cierra correctamente
- [ ] Formulario valida campos antes de enviar
- [ ] Selector de país funciona
- [ ] Syntax highlighting en portal developers
- [ ] FAQ acordeón se expande/colapsa
- [ ] Links internos funcionan
- [ ] Responsive en móvil, tablet, desktop

---

### **Paso 11: Preparar para producción**

- Minificar CSS y JS
- Optimizar imágenes
- Configurar meta tags (SEO)
- Configurar Open Graph para redes sociales
- Preparar sitemap.xml
- Configurar Google Analytics (si aplica)

---

## FIN DEL DOCUMENTO MAESTRO

**Notas finales:**

- Este documento contiene TODO el copy, estructura y especificaciones necesarias para desarrollar la web completa de fluX.
- Antigravity debe generar código limpio, comentado y bien estructurado.
- Prioridad 1: Home Colombia + modal funcionando
- Prioridad 2: Páginas individuales
- Prioridad 3: Portal de desarrolladores
- Prioridad 4: Home México (clonar y ajustar)

**Cualquier duda o ajuste, consultar antes de generar código.**

---

**fluX One. El dinero no se detiene.**
