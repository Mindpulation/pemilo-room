const express = require('express');
const app = express.Router();

const { findAnggota } = require('../controller/mongo');
const { findRoomAnggotaList } = require('../validator/index');

app.get('/find', findRoomAnggotaList, findAnggota);

module.exports = app;