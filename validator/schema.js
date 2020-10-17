const joi = require('joi');

const insertAnggota = joi.object().keys({
    codeRoom: joi.string().required(),
    email: joi.string().required().email(),
    nama: joi.string().required(),
});

const findAnggota = joi.object().keys({
    find: joi.object().required()
});

const updateStatusAnggota = joi.object().keys({
    find: joi.object().required(),
    update: joi.object().required(),
});

const insertRoom = joi.object().keys({
    emailAdmin: joi.string().required(),
    nama: joi.string().required(),
})

module.exports = {insertAnggota, findAnggota, updateStatusAnggota, insertRoom}