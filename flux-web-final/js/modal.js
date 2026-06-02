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
