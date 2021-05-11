// import libraries
const mysql = require("mysql");
var db = require("../db");

exports.isAdmin = async function (req, res, next) {
  db.query(
    "SELECT role FROM users WHERE email = ?",
    [req.token.email],
    function (error, results, fields) {
      if (error || results.length == 0) {
        return res.status(500).send("Internal Server Error");
      }
      if (results[0].role != 1) {
        return res.status(403).send("Forbidden")
      }
      next();
    }
  )
}

exports.isTeacher = async function (req, res, next) {
  db.query(
    "SELECT role FROM users WHERE email = ?",
    [req.token.email],
    function (error, results, fields) {
      if (error || results.length == 0) {
        return res.status(500).send("Internal Server Error");
      }
      if (results[0].role != 2) {
        return res.status(403).send("Forbidden")
      }
      next();
    }
  )
}

exports.isStudent = async function (req, res, next) {
  db.query(
    "SELECT role FROM users WHERE email = ?",
    [req.token.email],
    function (error, results, fields) {
      if (error || results.length == 0) {
        return res.status(500).send("Internal Server Error");
      }
      if (results[0].role != 3) {
        return res.status(403).send("Forbidden")
      }
      next();
    }
  )
}

exports.isMinTeacher = async function (req, res, next) {
  db.query(
    "SELECT role FROM users WHERE email = ?",
    [req.token.email],
    function (error, results, fields) {
      if (error || results.length == 0) {
        return res.status(500).send("Internal Server Error");
      }
      if (results[0].role != 1 || results[0].role != 2) {
        return res.status(403).send("Forbidden")
      }
      next();
    }
  )
}

exports.isMinStudent = async function (req, res, next) {
  db.query(
    "SELECT role FROM users WHERE email = ?",
    [req.token.email],
    function (error, results, fields) {
      if (error || results.length == 0) {
        return res.status(500).send("Internal Server Error");
      }
      if (results[0].role != 1 || results[0].role != 3) {
        return res.status(403).send("Forbidden")
      }
      next();
    }
  )
}
