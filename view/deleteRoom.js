const express = require('express');
const app = express.Router();

const { deleteRoom, deleteAllRoom } = require('../controller/mongo');

app.delete('/delete', deleteRoom);
app.delete('/deleteAll', deleteAllRoom);

module.exports = app;