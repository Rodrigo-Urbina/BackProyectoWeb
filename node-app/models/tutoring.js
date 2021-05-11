// import libraries
const mysql = require("mysql");
var db = require("../db");

exports.create = async function(data) {
  return new Promise(result => {
    db.query(
      "INSERT INTO tutoring SET ?",
      data,
      function (error, results, fields) {
        result({error, results, fields});
      });
  });
}

exports.read = async function(params) {
  var sql = "SELECT * FROM tutoring";

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
      "UPDATE tutoring SET ? WHERE id = ?",
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
      "DELETE FROM tutoring WHERE id = ?",
      id,
      function (error, results, fields) {
        result({error, results, fields});
      }
    );
  });
}

exports.ofTeacher = async function(params) {
  return new Promise(result => {
    db.query(
      "SELECT * FROM tutoring WHERE teacher = ? AND datetime >= ? AND datetime <= ?",
      [params.teacher, params.from, params.to],
      function (error, results, fields) {
        result({error, results, fields});
      }
    );
  });
}

// type may be 'p' for past, 'u' for upcoming or 'a' for all
exports.myTutorings = async function(params, type) {

  var query = "SELECT * FROM tutoring WHERE";

  if (type == 'p') { // past
    query += " datetime < ? AND"
  } else if (type == 'u') { // upcoming
    query += " datetime >= ? AND"
  }

  if (params.teacher) {
    query += " teacher = ?";
    params.user = params.teacher;
  } else if (params.student) {
    query += " student = ?";
    params.user = params.student;
  } else {
    throw {status: 500, message: "Internal server error"};
  }

  return new Promise(result => {
    db.query(
      query,
      [params.datetime, params.user],
      function (error, results, fields) {
        result({error, results, fields});
      }
    );
  });
}
