const express = require('express');
const app = express.Router();

const { findAllRoom, findRoom, countRoom, countRoomWithSta } = require('../controller/mongo');
const { countListRoom, countRoomSta } = require('../validator/index');

app.post('/findAll', findAllRoom);
app.post('/find', findRoom);
app.post('/countRoom', countListRoom, countRoom);
app.post('/countRoomSta', countRoomSta, countRoomWithSta);

module.exports = app;
