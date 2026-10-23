function openModal() {
  const modal = document.getElementById('demo-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
}

function closeModal() {
  const modal = document.getElementById('demo-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

function submitDemoForm(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  
  // Simulation of backend submission
  console.log('Demo form submitted:', data);
  
  const submitBtn = event.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Enviando...';
  submitBtn.disabled = true;

  setTimeout(() => {
    alert('¡Gracias! Nos pondremos en contacto en menos de 24 horas.');
    closeModal();
    event.target.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1000);
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});


// Dynamic language and country options for "Que necesitas" select in modal
document.addEventListener('DOMContentLoaded', function() {
  const modalForm = document.getElementById('modal-demo-form');
  if (modalForm) {
    const paisSelect = modalForm.querySelector('select[name="pais"]');
    const necesidadSelect = modalForm.querySelector('select[name="necesidad"]');
    
    if (paisSelect && necesidadSelect) {
      function updateNecesidadOptions() {
        const country = paisSelect.value;
        const isEnglish = document.documentElement.lang === 'en';
        
        // Find the collection option (it could have value 'recaudo' or 'cobranza')
        let collectionOption = Array.from(necesidadSelect.options).find(opt => opt.value === 'recaudo' || opt.value === 'cobranza');
        
        if (collectionOption) {
          if (country === 'MX') {
            collectionOption.value = 'cobranza';
            collectionOption.textContent = isEnglish ? 'Collection' : 'Cobranza';
          } else {
            // Default to CO / recaudo
            collectionOption.value = 'recaudo';
            collectionOption.textContent = isEnglish ? 'Collection' : 'Recaudo';
          }
        }
      }
      
      paisSelect.addEventListener('change', updateNecesidadOptions);
      // Run once on load to sync initial state
      updateNecesidadOptions();
    }
  }
});


// ---------------------------------------------------------------------------
// Formulario de demo de Automata (/f/praxis) embebido en el pop-up "Comienza hoy".
// Reemplaza el formulario simulado de cada página por el real, que guarda el lead
// en Automata. En local apunta al servidor de desarrollo de Automata.
// ---------------------------------------------------------------------------
(function () {
  var PROD_URL = 'https://128-140-75-134.sslip.io/f/praxis';
  var DEV_URL = 'http://localhost:5173/f/praxis';
  var isLocal = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);

  function formUrl() {
    var url = new URL(isLocal ? DEV_URL : PROD_URL);
    url.searchParams.set('insertado', '1');
    var page = new URLSearchParams(location.search);
    ['utm_source', 'utm_campaign'].forEach(function (key) {
      if (page.get(key)) url.searchParams.set(key, page.get(key));
    });
    if (!page.get('utm_source')) url.searchParams.set('utm_source', 'web');
    return url.toString();
  }

  function mount() {
    var container = document.querySelector('#demo-modal .modal-container');
    if (!container || container.classList.contains('is-automata')) return;
    var close = container.querySelector('.modal-close');
    container.innerHTML = '';
    if (close) container.appendChild(close);
    var iframe = document.createElement('iframe');
    iframe.className = 'automata-form';
    iframe.title = document.documentElement.lang === 'en' ? 'Book your fluX demo' : 'Agenda tu demo de fluX';
    iframe.loading = 'lazy';
    iframe.src = formUrl();
    container.appendChild(iframe);
    container.classList.add('is-automata');
  }

  // El formulario avisa su alto para que el pop-up no tenga doble barra de desplazamiento.
  window.addEventListener('message', function (event) {
    var data = event.data;
    if (!data || data.type !== 'automata-form-height') return;
    var iframe = document.querySelector('#demo-modal iframe.automata-form');
    if (iframe && event.source === iframe.contentWindow) {
      iframe.style.height = Math.max(420, Number(data.height) || 0) + 'px';
    }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
