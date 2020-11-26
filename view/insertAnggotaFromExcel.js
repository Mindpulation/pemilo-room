const express = require('express');
const insert = require('mongooo/lib/mongo/insert');
const app = express.Router();

const { processExcel } = require('../controller/mongo');
const { insertRoomList } = require('../validator/index');

app.post('/upload', processExcel);

module.exports = app;