const express = require('express');
const app = express.Router();

const { insertAnggota } = require('../controller/mongo');
const {inRoomAnggotaList} = require('../validator/index');

app.post('/insert', inRoomAnggotaList, insertAnggota);

module.exports = app;