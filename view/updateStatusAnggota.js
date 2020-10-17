const express = require('express');
const app = express.Router();

const { updateStatusAnggota } = require('../controller/mongo');
const { updateStatusAnggotaList } = require('../validator/index');

app.put('/update', updateStatusAnggotaList, updateStatusAnggota);

module.exports = app;