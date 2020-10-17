const express = require('express');
const update = require('mongooo/lib/mongo/update');
const app = express.Router();

const { updateRoom } = require('../controller/mongo');

app.put('/update', updateRoom);

module.exports = app;