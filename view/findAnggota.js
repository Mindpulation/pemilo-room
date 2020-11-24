const express = require('express');
const app = express.Router();

const { findAnggota } = require('../controller/mongo');
const { findRoomAnggotaList } = require('../validator/index');

app.post('/find', findRoomAnggotaList, findAnggota);

module.exports = app;
