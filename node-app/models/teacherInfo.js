// import libraries
const mysql = require("mysql");
var db = require("../db");

exports.create = async function(data) {
  return new Promise(result => {
    db.query(
      "INSERT INTO teacherInfo SET ?",
      data,
      function (error, results, fields) {
        result({error, results, fields});
      });
  });
}

exports.read = async function(params) {
  var sql = "SELECT * FROM teacherInfo";

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

exports.update = async function(data, teacherId) { //receives teacher ID
  return new Promise(result => {
    db.query(
      "UPDATE specialization SET ? WHERE teacher = ?",
      [data, teacherId],
      function (error, results, fields) {
        result({error, results, fields});
      }
    );
  });
}

exports.delete = async function(teacherId) { //receives teacher ID
  return new Promise(result => {
    db.query(
      "DELETE FROM teacherInfo WHERE teacher = ?",
      teacherId,
      function (error, results, fields) {
        result({error, results, fields});
      }
    );
  });
}
