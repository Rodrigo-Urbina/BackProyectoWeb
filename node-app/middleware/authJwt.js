// import libraries
const jwt = require("jsonwebtoken");

exports.authenticateToken = function (req, res, next) {
  // Gather the jwt access token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send("Missing token");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name == 'JsonWebTokenError') return res.status(401).send("Unauthorized");
      if (err.name == 'TokenExpiredError') return res.status(401).send("JWT has expired");
      return res.status(403).send("Forbidden");
    }
    req.token = decoded;
    next(); // pass the execution off to whatever request the client intended
  });
}
