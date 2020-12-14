const express = require('express');
const app = express.Router();

const { findAnggota, countAnggota, findManyAnggota } = require('../controller/mongo');
const { findRoomAnggotaList, countListAnggota } = require('../validator/index');

app.post('/find', findRoomAnggotaList, findAnggota);
app.post('/countAnggota', countListAnggota, countAnggota);
app.post('/findAll', findRoomAnggotaList, findManyAnggota);

module.exports = app;
