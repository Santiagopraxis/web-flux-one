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

  window.addEventListener('scroll', () => {
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
        transitionBg.style.opacity = Math.max(0, 1 - fadeProgress);
      } else {
        transitionBg.style.opacity = 1;
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
});
