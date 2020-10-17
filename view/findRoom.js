const express = require('express');
const app = express.Router();

const { findAllRoom, findRoom } = require('../controller/mongo');

app.get('/findAll', findAllRoom);
app.get('/find', findRoom);

module.exports = app;