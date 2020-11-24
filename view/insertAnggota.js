const express = require('express');
const app = express.Router();

const { insertAnggota , insertAnggotaMany} = require('../controller/mongo');
const {inRoomAnggotaList, inRoomAnggotaManyList} = require('../validator/index');

app.post('/insert', inRoomAnggotaList, insertAnggota);
app.post('/insertAll', inRoomAnggotaManyList, insertAnggotaMany);

module.exports = app;