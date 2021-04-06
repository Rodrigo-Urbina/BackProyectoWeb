// import libraries
const jwt = require("jsonwebtoken");

exports.generateToken = function (tokenBody) {
  return jwt.sign(tokenBody, process.env.JWT_SECRET, { expiresIn: "1h" });
}
