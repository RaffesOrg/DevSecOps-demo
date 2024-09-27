const http = require('http');
const url = require('url');
const mysql = require('mysql');

// Setup a MySQL connection (example, in reality, the credentials should not be hardcoded)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'testdb'
});

const hostname = '127.0.0.1';
const port = 3000;

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
});

const server = http.createServer((req, res) => {
  const queryObject = url.parse(req.url, true).query;
  const userId = queryObject.id;

  // Vulnerable: Directly concatenating user input into the SQL query (SQL Injection risk)
  const sqlQuery = `SELECT * FROM users WHERE id = ${userId}`;

  connection.query(sqlQuery, (err, results) => {
    if (err) {
      res.statusCode = 500;
      res.end('Database query error');
      throw err;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(results));
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
