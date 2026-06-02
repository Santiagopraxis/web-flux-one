const fs = require('fs');
const path = require('path');

const folders = ['co', 'mx'];

folders.forEach(f => {
  const file = path.join(__dirname, f, 'login.html');
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Remove the CSS filter
    content = content.replace(
      '[data-theme="dark"] .login-logo { filter: brightness(0) invert(1); }',
      '/* Removed CSS filter for logo */'
    );
    
    // 2. Add an ID to the logo img
    content = content.replace(
      '<img src="../assets/images/logos/xo%20negro.svg" alt="fluX One" class="login-logo">',
      '<img src="../assets/images/logos/xo%20negro.svg" alt="fluX One" class="login-logo" id="login-logo-img">'
    );
    
    // 3. Update the JavaScript updateToggleUI function
    const oldJs = `    function updateToggleUI(theme) {
      if (theme === 'dark') {
        btnDark.classList.add('active');
        btnLight.classList.remove('active');
      } else {
        btnLight.classList.add('active');
        btnDark.classList.remove('active');
      }
    }`;
    
    const newJs = `    function updateToggleUI(theme) {
      const logoImg = document.getElementById('login-logo-img');
      if (theme === 'dark') {
        btnDark.classList.add('active');
        btnLight.classList.remove('active');
        if(logoImg) logoImg.src = '../assets/images/logos/xo banco.svg';
      } else {
        btnLight.classList.add('active');
        btnDark.classList.remove('active');
        if(logoImg) logoImg.src = '../assets/images/logos/xo negro.svg';
      }
    }`;
    
    content = content.replace(oldJs, newJs);
    
    fs.writeFileSync(file, content);
    console.log('Fixed logo switching in ' + file);
  }
});
