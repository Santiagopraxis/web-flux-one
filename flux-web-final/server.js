const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

const server = http.createServer((req, res) => {
  console.log(`${new Date().toLocaleTimeString()} - ${req.method} ${req.url}`);
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Resolve file path
  let safeUrl = req.url.split('?')[0];
  if (safeUrl === '/') {
    // Redirect (not just serve) so relative links/iframes resolve against /co/
    res.writeHead(302, { Location: '/co/index.html' });
    res.end();
    return;
  }

  // Decode percent-encoded URLs (e.g. fondo%202.png -> fondo 2.png)
  let decodedUrl;
  try {
    decodedUrl = decodeURIComponent(safeUrl);
  } catch (e) {
    decodedUrl = safeUrl;
  }
  
  const filePath = path.join(__dirname, decodedUrl);
  
  // Check if file exists and is not a directory
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Clean URL support: Try appending .html
      const htmlFilePath = filePath + '.html';
      fs.stat(htmlFilePath, (errHtml, statsHtml) => {
        if (!errHtml && statsHtml.isFile()) {
          serveFile(htmlFilePath, req, res);
        } else {
          serve404(res);
        }
      });
    } else if (!stats.isFile()) {
      // If it's a directory, check for index.html inside it
      if (stats.isDirectory()) {
        const indexPatch = path.join(filePath, 'index.html');
        fs.stat(indexPatch, (errIndex, statsIndex) => {
          if (!errIndex && statsIndex.isFile()) {
            serveFile(indexPatch, req, res);
          } else {
            serve404(res);
          }
        });
      } else {
        serve404(res);
      }
    } else {
      serveFile(filePath, req, res);
    }
  });
});

function serveFile(filePath, req, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error: ' + err.code);
      return;
    }
    
    const range = req.headers.range;
    if (range && contentType.startsWith('video/')) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
      
      if (start >= stats.size || end >= stats.size) {
        res.writeHead(416, { 'Content-Range': `bytes */${stats.size}` });
        res.end();
        return;
      }
      
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
      file.on('error', (streamErr) => {
        console.error('Stream error:', streamErr);
      });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });
      file.pipe(res);
    } else {
      res.writeHead(200, { 
        'Content-Length': stats.size,
        'Content-Type': contentType,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'Surrogate-Control': 'no-store'
      });
      const stream = fs.createReadStream(filePath);
      stream.on('error', (streamErr) => {
        console.error('Stream error:', streamErr);
      });
      stream.pipe(res);
    }
  });
}

function serve404(res) {
  const custom404Path = path.join(__dirname, '404.html');
  fs.readFile(custom404Path, (err, data) => {
    if (!err) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  });
}

server.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 STATIC HTTP SERVER RUNNING ON PORT ${PORT}`);
  console.log(`👉 http://localhost:${PORT}/co/index.html (Colombia)`);
  console.log(`👉 http://localhost:${PORT}/mx/index.html (México)`);
  console.log(`==================================================\n`);
});
