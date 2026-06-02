const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const folders = ['co', 'mx', 'en'];

// Rename the logo file if it exists with spaces
const badLogoPath = path.join(rootDir, 'assets', 'images', 'logos', 'logo nexa en blanco.svg');
const goodLogoPath = path.join(rootDir, 'assets', 'images', 'logos', 'logo-nexa-en-blanco.svg');
if (fs.existsSync(badLogoPath)) {
  fs.renameSync(badLogoPath, goodLogoPath);
  console.log("Renamed logo to " + goodLogoPath);
}

function processDirectory(dir, folderPrefix) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath, folderPrefix);
    } else if (fullPath.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // 1. Fix bi.svg
      content = content.replace(/icons\/bi\.svg/g, 'icons/capacidades-bi.svg');

      // 2. Fix logo with spaces
      content = content.replace(/logo(?:%20| )nexa(?:%20| )en(?:%20| )blanco\.svg/g, 'logo-nexa-en-blanco.svg');

      // 3. Fix absolute hrefs to relative in menus
      // e.g. href="/co/recaudo.html" -> href="recaudo.html" (since we are inside /co/)
      const prefix = '/' + folderPrefix + '/';
      const regexPrefix = new RegExp('href="' + prefix + '([^"]*)"', 'g');
      content = content.replace(regexPrefix, 'href="$1"');

      // Fix global links like href="/blog"
      content = content.replace(/href="\/blog"/g, 'href="../blog"');
      content = content.replace(/href="\/developers\.html"/g, 'href="../developers.html"');
      content = content.replace(/href="\/politica-privacidad"/g, 'href="../politica-privacidad.html"');
      content = content.replace(/href="\/privacy-policy"/g, 'href="../privacy-policy.html"');

      // 4. Fix Duplicate Vimeo Player ID (in modal vs hero)
      // The second one in the file is usually the modal
      const modalIframe = `id="vimeo-player" src="https://player.vimeo.com/video/1194852660?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;title=0&amp;byline=0&amp;portrait=0"`;
      content = content.replace(modalIframe, `id="vimeo-player-modal" src="https://player.vimeo.com/video/1194852660?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;title=0&amp;byline=0&amp;portrait=0"`);

      fs.writeFileSync(fullPath, content);
      console.log('Fixed bugs in ' + fullPath);
    }
  });
}

folders.forEach(f => processDirectory(path.join(rootDir, f), f));
