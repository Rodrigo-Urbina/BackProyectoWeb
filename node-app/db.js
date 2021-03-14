// import libraries
const mysql = require("mysql");
const dotenv = require("dotenv");

// get config vars
dotenv.config();

// initialize connection pool
var pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA
});

// export query function
exports.query = function(sqlString, values, callback) {
  pool.query(sqlString, values, callback);
}
