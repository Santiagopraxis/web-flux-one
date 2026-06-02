const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'co', 'index.html');
let content = fs.readFileSync(targetFile, 'utf8');

const oldEyebrow = '<p class="hero-eyebrow sr fade-in" style="font-size: 1.1rem; font-weight: 600; color: #00B894; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px;">¿Y si todo fuera más fácil?</p>';

const newEyebrow = '<p class="hero-eyebrow sr fade-in" style="font-size: 1.1rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 16px; margin-bottom: 12px; display: inline-block; background: linear-gradient(135deg, #00B894 0%, #2563EB 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">¿Y si todo fuera más fácil?</p>';

content = content.replace(oldEyebrow, newEyebrow);

fs.writeFileSync(targetFile, content);
console.log('Successfully styled the eyebrow with gradient in co/index.html');
