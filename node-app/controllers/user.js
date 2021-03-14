// import libraries
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var db = require("../db");
const { generateToken } = require("../middleware/authJWT");

exports.create = async function(req, res) {
  db.query(
    "INSERT INTO users SET ?",
    {
      email: req.body.email,
      password: req.body.password
    },
    function (error, results, fields) {
      if (error) {
        if (error.errno == 1062) return res.status(409).send("User already exists");
        return res.status(500).send("Internal Server Error");
      }
      return res.status(200).send("User was registered succesfully");
    }
  );
}

exports.read = async function(req, res) {}

exports.update = async function(req, res) {}

exports.delete = async function(req, res) {}

exports.signin = async function(req, res) {
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [req.body.email],
    function (error, results, fields) {
      if (error) {
        return res.status(500).send("Internal Server Error");
      }
      if (results.length == 0) {
        return res.status(401).send("Unauthorized");
      } else {
        let user = results[0];
        bcrypt.compare(req.body.password, user.password, function (err, result) {
          if (result && user.confirmed && !user.blocked) {
            return res.status(200).send({
              jwt: generateToken({
                email: user.email,
                role: user.role
              })
            });
          } else {
            return res.status(401).send("Unauthorized");
          }
        });
      }
    }
  );
}
