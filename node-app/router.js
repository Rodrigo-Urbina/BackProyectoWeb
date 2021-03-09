const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

// get config vars
dotenv.config();

// username is in the form { username: "my cool username" }
function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '604800' });
}

function authenticateToken(req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401); // if there isn't any token
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.email = decoded.email
    next() // pass the execution off to whatever request the client intended
  });
}

function userBoard(req, res) {
  res.status(200).send('User content for ' + req.email);
}

const router = express.Router();
router.use(express.urlencoded({ extended: false }));

// setup database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA
});

router.get('/', (req,res) => {
  return res.send('Hello World');
});

// AUTHENTICATION
router.post('/auth/signup', (req,res) => {
  var email = req.body.email;
  var password = req.body.password;

  connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
    if (results.length == 0) {
      var sql = `INSERT INTO users (email) VALUES ('${email}')`;
      connection.query('INSERT INTO users SET ?', {email: email}, function (error, results, fields) {
        if (error) throw error;
      });

      bcrypt.hash(password, 10, function(err, hash) {
        var sql = mysql.format('UPDATE users SET password = ? WHERE email = ?',[hash,email]);
        connection.query(sql, function (error, results, fields) {
          if (error) throw error;
        });
      });
      return res.send('User was registered succesfully');
    } else {
      return res.status(409).send('User already exists');
    }
  });
});

router.post('/auth/signin', (req,res) => {
  var email = req.body.email;
  var password = req.body.password;

  connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
    if (results.length == 1) {
      bcrypt.compare(password, results[0].password, function(err, result) {
        if (result && results[0].confirmed && !results[0].blocked) {
          let userInfo = {
            email: email,
            role: results[0].role
          };
          return res.send({
            jwt: generateAccessToken(userInfo),
            user: userInfo
          });
        } else {
          return res.status(401).send('Unauthorized');
        }
      });
    } else {
      return res.status(401).send('Unauthorized');
    }
  });
});

router.get('/test/user', [authenticateToken], userBoard);

module.exports = router;
