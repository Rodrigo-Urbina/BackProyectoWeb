const express = require("express");
const jwt = require("jsonwebtoken");

exports.generateToken = function (tokenBody) {
  return jwt.sign(tokenBody, process.env.JWT_SECRET, { expiresIn: "604800" });
}

exports.authenticateToken = function (req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send("Missing token"); // if there isn't any token

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name == 'TokenExpiredError') return res.status(401).send("JWT has expired");
      return res.sendStatus(403); // Forbidden
    }
    req.email = decoded.email;
    next(); // pass the execution off to whatever request the client intended
  });
}
