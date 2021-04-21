// import libraries
const mysql = require("mysql");
var db = require("../db");

exports.create = async function(data) {
  return new Promise(result => {
    db.query(
      "INSERT INTO users SET ?",
      data,
      function (error, results, fields) {
        result({error, results, fields});
      });
  });
}

exports.read = async function(params) {
  var sql = "SELECT * FROM users";

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
      "UPDATE users SET ? WHERE id = ?",
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
      "DELETE FROM users WHERE id = ?",
      id,
      function (error, results, fields) {
        result({error, results, fields});
      }
    );
  });
}

exports.teacherDetail = async function(id) {
  let query = `SELECT t.id, t.name_first, t.name_last, t.description, t.phone, t.picture, ratings.rating
               FROM (
              	 SELECT u.id, u.name_first, u.name_last, ti.description, ti.phone, ti.picture
              	 FROM users AS u, teacherInfo AS ti
              	 WHERE u.id = ti.teacher
                 ) AS t
               JOIN (
              	 SELECT t.id AS id,  AVG(eval.score) as rating
              	 FROM users AS t, evaluation AS eval
              	 WHERE t.id = ?
                 ) AS ratings
               ON t.id = ratings.id`
  return new Promise(result => {
    db.query(
      query,
      id,
      function (error, results, fields) {
        result({error, results, fields});
      }
    );
  });
}

exports.findTeachers = async function() {
  let query = `SELECT teachers.id, teachers.name_first, teachers.name_last, teachers.subject, ratings.rating
               FROM
              	 (SELECT t.id AS id,  AVG(eval.score) as rating
              	 FROM users AS t, evaluation AS eval
                   WHERE t.role = 2) AS ratings
               JOIN (
              	 SELECT t.id as id, t.name_first as name_first, t.name_last as name_last, subject.name as subject
              	 FROM users AS t
              		 JOIN specialization AS spec ON t.id = spec.teacher
              		 JOIN subject ON  subject.id = spec.subject
              	 WHERE t.role = 2
               ) AS teachers ON teachers.id = ratings.id`
  return new Promise(result => {
    db.query(
      query,
      function (error, results, fields) {
        result({error, results, fields});
      }
    );
  });
}
