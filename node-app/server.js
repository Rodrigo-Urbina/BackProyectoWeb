// import libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./router");

// define application port
const PORT = process.env.PORT || 3000;

// initialize express server
const app = express();

// middleware for cors, urlencoded and json
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static("public"));

// api router
app.use("/", router);

// Error handler
app.use((err, req, res, next) => {
  console.log('Error status: ', err.status);
  console.log('Message: ', err.message);
  if (err.status && err.message) {
    res.status(err.status).send(err.message);
  } else {
    res.status(500).send("Internal server error");
  }
});

// starting the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
