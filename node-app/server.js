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

// starting the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
