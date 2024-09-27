// server.js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Hardcoded API Key - Vulnerability
const API_KEY = "1234567890abcdef";  // Insecure: Hardcoded credentials

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
