const express = require('express');
const app = express.Router();

const { findAllRoom, findRoom } = require('../controller/mongo');

app.post('/findAll', findAllRoom);
app.post('/find', findRoom);

module.exports = app;