const fs = require('fs');
const path = require('path');

const folders = ['co', 'mx'];

folders.forEach(f => {
  const file = path.join(__dirname, f, 'login.html');
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Change justify-content from flex-end to flex-start
    content = content.replace(
      'display: flex; flex-direction: column; justify-content: flex-end;',
      'display: flex; flex-direction: column; justify-content: flex-start;'
    );
    
    // Reverse the gradient overlay so it darkens the top instead of the bottom
    content = content.replace(
      'background: linear-gradient(to bottom, transparent 40%, rgba(5,5,5,0.9) 100%);',
      'background: linear-gradient(to bottom, rgba(5,5,5,0.9) 0%, transparent 60%);'
    );
    
    // Add some top padding so it doesn't stick completely to the edge
    // Actually, padding is already 60px (`padding: 60px;`). Maybe we need to shift it slightly down if the theme toggle is there.
    // The theme toggle is top: 30px; right: 40px; 
    // Wait, let's just make sure the graphic-content has margin-top if needed, or leave it as is with 60px padding.
    // 60px padding is fine. The toggle is at 30px, so it won't perfectly overlap, but the text is on the left usually.
    
    fs.writeFileSync(file, content);
    console.log('Moved text to top in ' + file);
  }
});
