// import libraries
const express = require("express");
const bcrypt = require("bcrypt");

exports.hashPassword = function (req, res, next) {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) throw err;
    req.body.password = hash;
    next();
  });
}
