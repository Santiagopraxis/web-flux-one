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
