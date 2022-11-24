const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const routes = require('./routes/index.js');
require('dotenv').config();
require('./db.js');

const server = express();

server.name = 'BACKEND SIBEN';

server.use(express.json());
server.use(cookieParser());
server.use(fileUpload());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

server.use('/api', routes);

server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;