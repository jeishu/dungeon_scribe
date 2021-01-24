// Set up MySQL connection.
var mysql = require("mysql2");

var connection;

if (process.env.JAWSDB_URL) {
  // connect to either a local or the jawsDB heroku database
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD, // use a .env file to store your password
    database: "dungeon_scribe",
  });
}

// Make connection.
connection.connect();

// Export connection for our ORM to use.
module.exports = connection;
