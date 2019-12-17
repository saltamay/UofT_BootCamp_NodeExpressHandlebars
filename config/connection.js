// Set up MySQL connection.
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'bqmayq5x95g1sgr9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'xolniokoqegqzogj',
  password: 'eaz5pxrn007zgxmp',
  database: 'gcpq9icuqdb7cejh'
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
