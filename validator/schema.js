const joi = require('joi');

const insertAnggota = joi.object().keys({
    codeRoom: joi.string().required(),
    email: joi.string().required().email(),
    nama: joi.string().required(),
});

const findAnggota = joi.object().keys({
    find: joi.object().required(),
    field: joi.object().required(),
});

module.exports = {insertAnggota, findAnggota}