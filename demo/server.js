// server.js
const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  
  // Vulnerable: Injecting user input directly into the response without sanitization
  const userMessage = queryObject.message || "Welcome to [Your Organization's Name]!";
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`<h1>${userMessage}</h1>`);  // XSS vulnerability here
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
