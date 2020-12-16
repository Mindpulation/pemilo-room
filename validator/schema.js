const joi = require('joi');

const insertAnggota = joi.object().keys({
    codeRoom: joi.string().required(),
    email: joi.string().required().email(),
    nama: joi.string().required()
});

const insertAnggotaMany = joi.array().items(
    joi.object().keys({
        codeRoom: joi.string().required(),
        email: joi.string().required().email(),
        nama: joi.string().required()
    })
);

const findAnggota = joi.object().keys({
    find: joi.object().required()
});

const findRangeAnggota = joi.object().keys({
    find: joi.object().required(),
    start : joi.number().required(),
    count : joi.number().required()
})

const countAnggota = joi.object().keys({
    codeRoom : joi.string().required()
});

const countRoom = joi.object().keys({
    emailAdmin : joi.string().email().required()
});

const countRoomStatus = joi.object().keys({
    emailAdmin : joi.string().email().required(),
    sta : joi.boolean().required()
});

const updateStatusAnggota = joi.object().keys({
    find: joi.object().required(),
    update: joi.object().required(),
});

const insertRoom = joi.object().keys({
    emailAdmin: joi.string().required(),
    nama: joi.string().required(),
    password : joi.string().optional(),
    deskripsi : joi.string().required(),    
})

module.exports = {findRangeAnggota,countRoom,countRoomStatus,insertAnggota, findAnggota, updateStatusAnggota, insertRoom, insertAnggotaMany, countAnggota}
