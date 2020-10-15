const joi = require('joi');

const insertAnggota = joi.object().keys({
    codeRoom: joi.string().required(),
    email: joi.string().required().email(),
    nama: joi.string().required(),
});

module.exports = {insertAnggota}