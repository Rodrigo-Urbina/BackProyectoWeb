// import libraries
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var db = require("../db");
const { generateToken } = require("../services/authJWT");

exports.create = async function(req, res) {
  db.query(
    "INSERT INTO users SET ?",
    {
      email: req.body.email,
      password: req.body.password,
      name_first: req.body.firstName,
      name_last: req.body.lastName
    },
    function (error, results, fields) {
      if (error) {
        if (error.errno == 1062) return res.status(409).send("User already exists");
        return res.status(500).send("Internal Server Error");
      }
      return res.status(200).send({message: "User was registered succesfully"});
    }
  );
}

exports.read = async function(req, res) {
  db.query(
    "SELECT * FROM users",
    function (error, results, fields) {
      if (error) {
        return res.status(500).send("Internal Server Error");
      }
      return res.status(200).send(results);
    }
  );
}

exports.update = async function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res.status(422).send("req.body is empty")
  }
  db.query(
    "UPDATE users SET ? WHERE id = ?",
    [req.body, req.params.id],
    function (error, results, fields) {
      if (error) {
        return res.status(500).send("Internal Server Error");
      }
      return res.status(200).send("User updated succesfully");
    }
  )
}

exports.delete = async function(req, res) {
  db.query(
    "DELETE FROM users WHERE id = ?",
    [req.params.id],
    function (error, results, fields) {
      if (error) {
        return res.status(500).send("Internal Server Error");
      }
      if (results.affectedRows == 0) {
        return res.status(404).send("User not found");
      }
      return res.status(200).send("User deleted succesfully")
    }
  );
}

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
                email: user.email
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
