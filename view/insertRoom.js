const express = require('express');
const insert = require('mongooo/lib/mongo/insert');
const app = express.Router();

const { insertRoom } = require('../controller/mongo');
const { insertRoomList } = require('../validator/index');

app.post('/insert', insertRoomList, insertRoom);

module.exports = app;