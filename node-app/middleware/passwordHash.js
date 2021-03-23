// import libraries
const bcrypt = require("bcrypt");

// manejar error con status
exports.hashPassword = function (req, res, next) {
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      return res.status(500).send("Internal server error");
    }
    req.body.password = hash;
    next();
  });
}
