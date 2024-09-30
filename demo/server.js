const http = require('http');
const url = require('url');
const validator = require('validator');  // Using a library to escape input

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const message = queryObject.message ? validator.escape(queryObject.message) : "Hello World";
  res.end(`<h1>${message}</h1>`);  // XSS is now mitigated
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
