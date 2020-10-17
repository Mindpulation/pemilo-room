const express = require('express');
const app = express.Router();

const { deleteRoom } = require('../controller/mongo');

app.delete('/delete', deleteRoom);

module.exports = app;