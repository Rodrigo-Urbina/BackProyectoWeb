// import libraries
const mysql = require("mysql");
var db = require("../db");

exports.create = async function(data) {
  return new Promise(result => {
    db.query(
      "INSERT INTO subject SET ?",
      data,
      function (error, results, fields) {
        result({error, results, fields});
      });
  });
}

exports.read = async function(params) {
  var sql = "SELECT * FROM subject";

  if (Object.keys(params).length != 0) { // if query is not empty
    sql += " WHERE ?"; // add where clause for query
  }

  return new Promise(result => {
      db.query(
      sql,
      params, // if query is empty it won't even be used because of missing WHERE clause
      function (error, results, fields) {
        result({error, results, fields});
      });
  });
}

exports.update = async function(data, id) {
  return new Promise(result => {
    db.query(
      "UPDATE subject SET ? WHERE id = ?",
      [data, id],
      function (error, results, fields) {
        result({error, results, fields});
      }
    );
  });
}

exports.delete = async function(id) {
  return new Promise(result => {
    db.query(
      "DELETE FROM subject WHERE id = ?",
      id,
      function (error, results, fields) {
        result({error, results, fields});
      }
    );
  });
}
