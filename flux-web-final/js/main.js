// ── CONFIGURACIÓN GLOBAL DE ANALYTICS ─────────────────────────────────────────
// José: Reemplaza 'G-XXXXXXXXXX' con tu ID real de Google Analytics 4 (GA4).
// Si lo dejas como 'G-XXXXXXXXXX' o vacío, no se cargará ningún script de rastreo.
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Función para cargar Google Analytics dinámicamente
function loadGoogleAnalytics(id) {
  if (!id || id === 'G-XXXXXXXXXX') {
    return;
  }
  // 1. Cargar script externo de gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  // 2. Inicializar la capa de datos (dataLayer)
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
}

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Fade-in on scroll using Intersection Observer
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

  document.querySelectorAll('.fade-in, .blur-reveal, .sr, .sr-stats').forEach(el => observer.observe(el));

  // Navbar Stickiness (Always visible, changes style on scroll)
  const navbar = document.querySelector('.navbar');

  function getThemeUnderNavbar() {
    if (!navbar) return 'dark';
    
    // Check the theme of the section situated at y = 40px (middle of navbar)
    const y = 40;
    const x = window.innerWidth / 2;
    
    // Temporarily disable pointer events on the navbar so we don't hit it or its children
    const origPointerEvents = navbar.style.pointerEvents;
    navbar.style.pointerEvents = 'none';
    const el = document.elementFromPoint(x, y);
    navbar.style.pointerEvents = origPointerEvents;
    
    if (!el) return 'dark';
    
    // Find the closest ancestor section, footer, or body that has a non-transparent background
    let current = el;
    let bgColor = 'rgba(0, 0, 0, 0)';
    
    while (current) {
      // Check explicit class identifiers
      if (current.classList.contains('section-light') || current.classList.contains('footer-light')) {
        return 'light';
      }
      if (current.classList.contains('hero') || current.classList.contains('kickoff-section') || current.classList.contains('impact-stats-section') || current.classList.contains('ecosystem-hub-section') || current.classList.contains('dashboard-showcase-section') || current.classList.contains('footer-dark')) {
        return 'dark';
      }
      
      const computedBg = window.getComputedStyle(current).backgroundColor;
      if (computedBg && computedBg !== 'transparent' && computedBg !== 'rgba(0, 0, 0, 0)') {
        const rgbaMatch = computedBg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (rgbaMatch) {
          const alpha = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1.0;
          if (alpha >= 0.3) {
            bgColor = computedBg;
            break;
          }
        } else {
          bgColor = computedBg;
          break;
        }
      }
      current = current.parentElement;
    }
    
    // Fallback parsing of background color
    const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (match) {
      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      
      // Compute perceived brightness (Luminance)
      const brightness = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
      );
      
      return brightness > 130 ? 'light' : 'dark';
    }
    
    return 'dark';
  }

  function updateNavbar() {
    if (!navbar) return;
    const currentScrollY = window.scrollY;

    // Fondo más oscuro al scrollear
    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    if (currentScrollY > 200) {
      navbar.classList.add('scrolled-200');
    } else {
      navbar.classList.remove('scrolled-200');
    }

    // Smart light theme for navbar over light content sections
    const theme = getThemeUnderNavbar();
    if (theme === 'light') {
      navbar.classList.add('scrolled-light');
    } else {
      navbar.classList.remove('scrolled-light');
    }
  }

  // Run initial check on page load
  updateNavbar();

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      window.requestAnimationFrame(() => {
        updateNavbar();
        scrollTimeout = null;
      });
      scrollTimeout = true;
    }
  });

  // Accordion FAQ
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-answer').style.maxHeight = null;
      });
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // FAQ Collapse/Expand with gradient
  const faqWrapper = document.getElementById('faq-wrapper');
  const faqToggleBtn = document.getElementById('faq-toggle-btn');
  const faqToggleLabel = document.getElementById('faq-toggle-label');

  if (faqWrapper && faqToggleBtn) {
    // Calcular altura de las primeras 3 preguntas
    const allFaqItems = faqWrapper.querySelectorAll('.faq-item');
    let collapsedHeight = 0;
    allFaqItems.forEach((item, index) => {
      if (index < 3) collapsedHeight += item.offsetHeight + 24; // 24px es el padding-bottom
    });

    // Establecer altura colapsada inicial
    faqWrapper.style.maxHeight = collapsedHeight + 'px';

    let isExpanded = false;

    faqToggleBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;

      if (isExpanded) {
        faqWrapper.style.maxHeight = faqWrapper.scrollHeight + 'px';
        faqWrapper.classList.remove('collapsed');
        faqWrapper.classList.add('expanded');
        faqToggleBtn.classList.add('expanded');
        faqToggleLabel.textContent = 'Ver menos';
      } else {
        faqWrapper.style.maxHeight = collapsedHeight + 'px';
        faqWrapper.classList.add('collapsed');
        faqWrapper.classList.remove('expanded');
        faqToggleBtn.classList.remove('expanded');
        faqToggleLabel.textContent = 'Ver más preguntas';
      }
    });
  }

  // Sticky Scroll Section Logic
  const scrollCards = document.querySelectorAll('.scroll-card');
  if (scrollCards.length > 0) {
    const cardObserverOptions = { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 };
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          scrollCards.forEach(c => c.classList.remove('active'));
          entry.target.classList.add('active');
        }
      });
    }, cardObserverOptions);
    scrollCards.forEach(card => cardObserver.observe(card));

    const section = document.getElementById('para-quien');
    const progressBarContainer = document.querySelector('.scroll-progress-container');
    const progressBar = document.getElementById('scroll-progress');

    if (section && progressBarContainer && progressBar) {
      window.addEventListener('scroll', () => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        if (sectionTop <= windowHeight && sectionTop + sectionHeight >= 0) {
          progressBarContainer.classList.add('visible');
          let scrolled = (windowHeight - sectionTop) / (sectionHeight + windowHeight);
          scrolled = Math.max(0, Math.min(1, scrolled));
          progressBar.style.width = `${scrolled * 100}%`;
        } else {
          progressBarContainer.classList.remove('visible');
        }
      });
    }
  }

  // --- SMOOTH BRAND PORTAL ANIMATION (FAST FLOW) ---
  const brandSection = document.getElementById('brand-transition');
  const growingText = document.getElementById('growing-text');
  const transitionBg = document.getElementById('transition-bg');
  
  if (brandSection && growingText && transitionBg) {
    let currentProgress = 0;
    let targetProgress = 0;
    
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

    const updatePortal = () => {
      // Smoother LERP for a more premium, "heavy" feel
      currentProgress = lerp(currentProgress, targetProgress, 0.05);
      
      const startThreshold = 0.08; 
      let animProgress = 0;
      if (currentProgress > startThreshold) {
        animProgress = (currentProgress - startThreshold) / (1 - startThreshold);
      }
      
      // Reduced max scale to keep text readable for longer
      const maxScale = window.innerWidth < 768 ? 8 : 15;
      
      // Use a power curve so it grows slowly at the start and faster at the end
      const curvedProgress = Math.pow(animProgress, 1.5);
      const scale = 1 + (curvedProgress * maxScale);
      growingText.style.transform = `scale(${scale})`;
      
      // More gradual opacity transition
      const fadeStart = 0.3; 
      if (animProgress > fadeStart) {
        const fadeProgress = (animProgress - fadeStart) / 0.5;
        const opacity = Math.max(0, 1 - fadeProgress);
        transitionBg.style.opacity = opacity;
        
        // Smoothly transition background of parent section from black to white to prevent white leak gap
        const rgbVal = Math.round((1 - opacity) * 255);
        brandSection.style.backgroundColor = `rgb(${rgbVal}, ${rgbVal}, ${rgbVal})`;
      } else {
        transitionBg.style.opacity = 1;
        brandSection.style.backgroundColor = '#000000';
      }
      
      requestAnimationFrame(updatePortal);
    };

    window.addEventListener('scroll', () => {
      const rect = brandSection.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      let progress = 0;
      if (sectionTop <= 0) {
        progress = Math.abs(sectionTop) / (sectionHeight - windowHeight);
      }
      targetProgress = Math.max(0, Math.min(1.1, progress));
    });

    requestAnimationFrame(updatePortal);
  }

  // Mobile Menu Logic
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isActive = mobileMenu.classList.contains('active');
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', !isActive);
      document.body.style.overflow = !isActive ? 'hidden' : '';
    });
  }

  window.closeMenu = function() {
    if (menuToggle) menuToggle.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('active');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

    // Typewriter Effect Logic (HTML Preserving)
    const typewriterElements = document.querySelectorAll('.typewriter-text');
    if (typewriterElements.length > 0) {
      const typeObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            if (el.dataset.typed === "true") return;
            el.dataset.typed = "true";
            
            // Extract text nodes safely
            const textNodes = [];
            function walk(node) {
              if (node.nodeType === 3) {
                // If it's a text node that's not just whitespace
                textNodes.push(node);
              } else if (node.nodeType === 1) {
                for (let child of node.childNodes) walk(child);
              }
            }
            walk(el);
            
            // Store original text and clear it
            const originalTexts = textNodes.map(n => n.nodeValue);
            textNodes.forEach(n => n.nodeValue = "");
            
            // Append cursor INSIDE the element so it inherits the correct font-size
            const cursor = document.createElement('span');
            cursor.className = 'typewriter-cursor';
            el.appendChild(cursor);
            
            let nIdx = 0;
            let cIdx = 0;
            const speed = parseInt(el.dataset.speed) || 40;
            
            function type() {
              if (nIdx >= textNodes.length) {
                el.parentElement.classList.add('typewriter-complete');
                return;
              }
              const node = textNodes[nIdx];
              const text = originalTexts[nIdx];
              
              // Mueve el cursor justo después del nodo (o su contenedor) que se está escribiendo
              let currentElement = node;
              while (currentElement.parentNode !== el && currentElement.parentNode) {
                currentElement = currentElement.parentNode;
              }
              el.insertBefore(cursor, currentElement.nextSibling);
              
              if (cIdx < text.length) {
                node.nodeValue += text.charAt(cIdx);
                cIdx++;
                setTimeout(type, speed);
              } else {
                nIdx++;
                cIdx = 0;
                type();
              }
            }
            setTimeout(type, parseInt(el.dataset.delay) || 300);
            obs.unobserve(el);
          }
        });
      }, { rootMargin: "0px 0px -10% 0px" });

      typewriterElements.forEach(el => typeObserver.observe(el));
    }

    // ── Video Modal para mobile ──────────────────────────────────────────────
    // En iOS/Android NO usamos la API nativa de fullscreen porque causa zoom
    // extremo. En su lugar mostramos el video en un modal CSS propio.
    const isIOS    = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isMobile = isIOS || /Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 1024;

    // Crear el overlay del modal una sola vez
    if (!document.getElementById('video-modal-overlay')) {
      const overlay = document.createElement('div');
      overlay.id = 'video-modal-overlay';
      overlay.innerHTML = [
        '<div id="video-modal-inner">',
        '  <button id="video-modal-close" aria-label="Cerrar">&#x2715;</button>',
        '  <video id="video-modal-player" controls playsinline></video>',
        '</div>'
      ].join('');
      document.body.appendChild(overlay);

      overlay.addEventListener('click', function(e) {
        if (e.target === overlay || e.target.id === 'video-modal-close') {
          closeVideoModal();
        }
      });
    }

    function openVideoModal(src) {
      var overlay = document.getElementById('video-modal-overlay');
      var player  = document.getElementById('video-modal-player');
      player.src = src;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      player.play().catch(function() {});
    }

    function closeVideoModal() {
      var overlay = document.getElementById('video-modal-overlay');
      var player  = document.getElementById('video-modal-player');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      player.pause();
      player.src = '';
    }

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeVideoModal();
    });

    document.querySelectorAll('.showcase-video').forEach(function(video) {
      if (isMobile) {
        video.style.cursor = 'zoom-in';
        video.addEventListener('click', function(e) {
          e.stopPropagation();
          openVideoModal(video.src || video.currentSrc);
        });
      } else {
        video.style.cursor = 'pointer';
        video.addEventListener('click', function(e) {
          e.stopPropagation();
          if (video.requestFullscreen) {
            video.requestFullscreen();
          } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
          } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
          }
        });
      }
    });

    // ── Vimeo Modal (Kickoff Video) ───────────────────────────────────────────
    window.openVimeoModal = function(vimeoId) {
      let overlay = document.getElementById('vimeo-modal-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'vimeo-modal-overlay';
        overlay.innerHTML = [
          '<div id="vimeo-modal-inner">',
          '  <button id="vimeo-modal-close" aria-label="Cerrar">&#x2715;</button>',
          '  <div id="vimeo-modal-iframe-container" style="position:relative; width:100%; height:0; padding-top:56.25%;"></div>',
          '</div>'
        ].join('');
        document.body.appendChild(overlay);

        overlay.addEventListener('click', function(e) {
          if (e.target === overlay || e.target.id === 'vimeo-modal-close') {
            window.closeVimeoModal();
          }
        });
        
        // Escape key to close
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') window.closeVimeoModal();
        });
      }

      const container = document.getElementById('vimeo-modal-iframe-container');
      container.innerHTML = '<iframe src="https://player.vimeo.com/video/' + vimeoId + '?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:12px;" title="Vimeo Player"></iframe>';
      
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    window.closeVimeoModal = function() {
      const overlay = document.getElementById('vimeo-modal-overlay');
      if (overlay) {
        overlay.classList.remove('active');
        const container = document.getElementById('vimeo-modal-iframe-container');
        if (container) container.innerHTML = '';
        document.body.style.overflow = '';
      }
    };

    // ── Highlight Active Page & Auto-Open Subpanel in Mobile Menu ──
    const currentPath = window.location.pathname;
    const currentFile = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    
    // Highlight Active Page in Desktop Nav Menu
    document.querySelectorAll('.nav-menu a').forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref) {
        const linkFile = linkHref.substring(linkHref.lastIndexOf('/') + 1);
        if (linkFile === currentFile && currentFile !== 'index.html' && currentFile !== '') {
          link.classList.add('active-nav-link');
          link.style.fontWeight = '700'; // bold active link
          link.style.color = 'var(--cyan, #3CB8EB)'; // brand cyan color
          
          // Also highlight the parent dropdown trigger (Productos, Recursos)
          const dropdownParent = link.closest('.dropdown');
          if (dropdownParent) {
            const parentTrigger = dropdownParent.querySelector('a');
            if (parentTrigger) {
              parentTrigger.classList.add('active-parent-link');
              parentTrigger.style.fontWeight = '700';
              parentTrigger.style.color = '#ffffff'; // Ensure white text for parent Category
            }
          }
        }
      }
    });

    let activePanelId = null;

    document.querySelectorAll('.mobile-menu-overlay a').forEach(link => {
      const linkHref = link.getAttribute('href');
      if (linkHref) {
        const linkFile = linkHref.substring(linkHref.lastIndexOf('/') + 1);
        if (linkFile === currentFile) {
          link.classList.add('active-mobile-link');
          link.style.fontWeight = '700'; // bold active link
          link.style.color = 'var(--cyan, #3CB8EB)'; // brand cyan color
          
          // Find parent sub-panel
          const parentPanel = link.closest('.menu-panel');
          if (parentPanel && parentPanel.id !== 'panel-main') {
            activePanelId = parentPanel.id;
          }
        }
      }
    });

    // Automatically transition to the active sub-panel when mobile menu overlay is opened
    const mobMenu = document.getElementById('mobile-menu');
    if (mobMenu && activePanelId) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            const isActive = mobMenu.classList.contains('active');
            if (isActive) {
              const mainPanel = document.getElementById('panel-main');
              const subPanel = document.getElementById(activePanelId);
              if (mainPanel && subPanel) {
                mainPanel.classList.add('slide-out');
                subPanel.classList.add('active');
              }
            }
          }
        });
      });
      observer.observe(mobMenu, { attributes: true });
    }

    // ── Cookie Consent Banner System ──────────────────────────────────────────
    function initCookieBanner() {
      const consent = localStorage.getItem('flux_cookie_consent');
      if (consent === 'accepted') {
        loadGoogleAnalytics(GA_MEASUREMENT_ID);
        return;
      } else if (consent === 'rejected') {
        return;
      }

      // First time visitor: show banner
      const isEnglish = window.location.pathname.includes('/en/');
      let pathPrefix = './';
      if (window.location.pathname.includes('/en/mx/')) {
        pathPrefix = '../../';
      } else if (
        window.location.pathname.includes('/co/') ||
        window.location.pathname.includes('/mx/') ||
        window.location.pathname.includes('/en/')
      ) {
        pathPrefix = '../';
      }

      const cookiePolicyUrl = isEnglish 
        ? `${pathPrefix}cookies-policy.html` 
        : `${pathPrefix}politica-cookies.html`;

      const titleText = isEnglish ? 'Cookie Consent' : 'Consentimiento de Cookies';
      const bodyText = isEnglish
        ? `We use cookies to optimize your experience and analyze our website traffic. By clicking "Accept", you consent to our use of cookies in accordance with our <a href="${cookiePolicyUrl}" target="_blank">Cookie Policy</a>.`
        : `Utilizamos cookies para optimizar tu experiencia y analizar el tráfico de nuestro sitio. Al hacer clic en "Aceptar", permites el uso de cookies de acuerdo con nuestra <a href="${cookiePolicyUrl}" target="_blank">Política de Cookies</a>.`;
      const acceptLabel = isEnglish ? 'Accept' : 'Aceptar';
      const rejectLabel = isEnglish ? 'Reject' : 'Rechazar';

      // 1. Inject Styles
      const styles = `
        #flux-cookie-banner {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: calc(100% - 48px);
          max-width: 420px;
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 16px;
          padding: 20px 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          z-index: 99999;
          display: flex;
          flex-direction: column;
          gap: 14px;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          color: rgba(255, 255, 255, 0.9);
          text-align: left;
        }
        #flux-cookie-banner.show {
          opacity: 1;
          transform: translateY(0);
        }
        #flux-cookie-banner.hide {
          opacity: 0;
          transform: translateY(40px);
          pointer-events: none;
        }
        .flux-cookie-title {
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .flux-cookie-icon {
          color: var(--cyan, #3CB8EB);
          font-size: 1.2rem;
        }
        .flux-cookie-text {
          font-size: 0.875rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 400;
        }
        .flux-cookie-text a {
          color: var(--cyan, #3CB8EB);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
          border-bottom: 1px solid transparent;
        }
        .flux-cookie-text a:hover {
          color: #ffffff;
          border-bottom-color: var(--cyan, #3CB8EB);
        }
        .flux-cookie-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 4px;
        }
        .flux-cookie-btn {
          padding: 10px 20px;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          font-family: inherit;
          outline: none;
        }
        .flux-cookie-btn-reject {
          background: transparent;
          color: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .flux-cookie-btn-reject:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.3);
          color: #ffffff;
        }
        .flux-cookie-btn-accept {
          background: transparent;
          color: #ffffff;
          border: 1px solid transparent;
          background-image: linear-gradient(#08080c, #08080c), linear-gradient(135deg, var(--cyan, #3CB8EB) 0%, #ab4b96 50%, #F5B5D2 100%);
          background-origin: border-box;
          background-clip: padding-box, border-box;
          box-shadow: 0 4px 12px rgba(60, 184, 235, 0.15);
        }
        .flux-cookie-btn-accept:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 20px rgba(60, 184, 235, 0.35);
          filter: brightness(1.1);
        }
        .flux-cookie-btn-accept:active {
          transform: translateY(0) scale(1);
        }
        @media (max-width: 500px) {
          #flux-cookie-banner {
            bottom: 16px;
            right: 16px;
            width: calc(100% - 32px);
            padding: 16px 20px;
          }
          .flux-cookie-actions {
            flex-direction: column-reverse;
          }
          .flux-cookie-btn {
            width: 100%;
            text-align: center;
          }
        }
      `;

      const styleEl = document.createElement('style');
      styleEl.innerHTML = styles;
      document.head.appendChild(styleEl);

      // 2. Inject HTML
      const banner = document.createElement('div');
      banner.id = 'flux-cookie-banner';
      banner.innerHTML = `
        <div class="flux-cookie-title">
          <span class="flux-cookie-icon">🍪</span>
          <span>${titleText}</span>
        </div>
        <div class="flux-cookie-text">${bodyText}</div>
        <div class="flux-cookie-actions">
          <button class="flux-cookie-btn flux-cookie-btn-reject" id="flux-cookie-reject">${rejectLabel}</button>
          <button class="flux-cookie-btn flux-cookie-btn-accept" id="flux-cookie-accept">${acceptLabel}</button>
        </div>
      `;
      document.body.appendChild(banner);

      // 3. Trigger Slide-in Animation
      setTimeout(() => {
        banner.classList.add('show');
      }, 1000);

      // 4. Set Event Listeners
      const acceptBtn = document.getElementById('flux-cookie-accept');
      const rejectBtn = document.getElementById('flux-cookie-reject');

      function hideBanner() {
        banner.classList.remove('show');
        banner.classList.add('hide');
        // Remove from DOM after transition completes
        setTimeout(() => {
          banner.remove();
        }, 500);
      }

      acceptBtn.addEventListener('click', () => {
        localStorage.setItem('flux_cookie_consent', 'accepted');
        hideBanner();
        loadGoogleAnalytics(GA_MEASUREMENT_ID);
      });

      rejectBtn.addEventListener('click', () => {
        localStorage.setItem('flux_cookie_consent', 'rejected');
        hideBanner();
      });
    }

    // Initialize Banner
    initCookieBanner();

    // ── Dynamic Mobile Carousel Indicators ─────────────────────────────────────
    function initMobileCarousels() {
      const targets = document.querySelectorAll('.stats-grid-impact, .stats-grid, .nx-grid');
      if (targets.length === 0) return;

      // Inject CSS Styles for Dots (only once)
      const dotsStyles = `
        .carousel-dots-container {
          display: none;
        }
        @media (max-width: 768px) {
          .carousel-dots-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 8px;
            margin: 0 auto;
            padding: 10px 0 20px;
            width: 100%;
          }
          .carousel-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.25);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .carousel-dot.active {
            background: var(--cyan, #3CB8EB);
            transform: scale(1.3);
            box-shadow: 0 0 8px var(--cyan, #3CB8EB);
          }
        }
      `;
      const styleEl = document.createElement('style');
      styleEl.innerHTML = dotsStyles;
      document.head.appendChild(styleEl);

      targets.forEach(container => {
        if (!container.children || container.children.length <= 1) return;
        if (container.nextElementSibling && container.nextElementSibling.classList.contains('carousel-dots-container')) return;

        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots-container';
        
        const count = container.children.length;
        const dots = [];
        
        for (let i = 0; i < count; i++) {
          const dot = document.createElement('span');
          dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
          dotsContainer.appendChild(dot);
          dots.push(dot);
        }
        
        container.parentNode.insertBefore(dotsContainer, container.nextSibling);
        
        let scrollTimeout;
        container.addEventListener('scroll', () => {
          if (scrollTimeout) {
            cancelAnimationFrame(scrollTimeout);
          }
          scrollTimeout = requestAnimationFrame(() => {
            const containerRect = container.getBoundingClientRect();
            const children = container.children;
            let activeIndex = 0;
            let minDistance = Infinity;

            for (let i = 0; i < children.length; i++) {
              if (children[i].classList.contains('carousel-dots-container')) continue;
              
              const childRect = children[i].getBoundingClientRect();
              const childCenter = childRect.left + childRect.width / 2;
              const containerCenter = containerRect.left + containerRect.width / 2;
              const distance = Math.abs(childCenter - containerCenter);
              
              if (distance < minDistance) {
                minDistance = distance;
                activeIndex = i;
              }
            }

            dots.forEach((dot, idx) => {
              if (idx === activeIndex) {
                dot.classList.add('active');
              } else {
                dot.classList.remove('active');
              }
            });
          });
        });
      });
    }

    initMobileCarousels();

    // ── Preloader Dismissal Logic ─────────────────────────────────────────────
    const preloader = document.getElementById('flux-preloader');
    if (preloader) {
      const hidePreloader = () => {
        if (!preloader.classList.contains('fade-out')) {
          preloader.classList.add('fade-out');
          document.body.classList.remove('preloader-active');
        }
      };

      // Hide preloader when everything is loaded
      window.addEventListener('load', hidePreloader);

      // Safety timeout (max 1000ms)
      setTimeout(hidePreloader, 1000);
    }
});
