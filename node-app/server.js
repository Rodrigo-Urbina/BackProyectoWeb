const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');

const PORT = 3000;

const router = require('./router');

const app = express();

//Middleware
app.use('/', bodyParser.json(), router);
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cors());


// starting the server
app.listen( PORT , () => console.log(`Server started on port ${PORT}`));
