const {countRoom,countRoomStatus ,insertAnggota, insertAnggotaMany, findAnggota, updateStatusAnggota, insertRoom, countAnggota} = require('./schema');

const countListAnggota = (req, res, next) => {
    const {value, error} = countAnggota.validate(req.body)
    if(error === undefined){
        next();
    }else{
        res.send({message: "Oppss, wrong formatting"}).status(304);
    }
}

const countListRoom = (req, res, next) => {
    const {value, error} = countRoom.validate(req.body)
    if(error === undefined){
        next();
    }else{
        res.send({message: "Oppss, wrong formatting"}).status(304);
    }
}

const countRoomSta = (req, res, next) => {
    const {value, error} = countRoomStatus.validate(req.body)
    if(error === undefined){
        next();
    }else{
        res.send({message: "Oppss, wrong formatting"}).status(304);
    }
}

const inRoomAnggotaList = (req, res, next) => {
    const {value, error} = insertAnggota.validate(req.body)
    if(error === undefined){
        next();
    }else{
        res.send({message: "Oppss, wrong formatting"}).status(304);
    }
}

const inRoomAnggotaManyList = (req, res, next) => {
    const {value, error} = insertAnggotaMany.validate(req.body)
    if(error === undefined){
        next();
    }else{
        res.send({message: "Oppss, wrong formatting"}).status(304);
    }
}

const findRoomAnggotaList = (req, res, next) => {
    const {value, error} = findAnggota.validate(req.body)
    if(error === undefined){
        next();
    }else{
        res.send({message: "Opps, wrong formatting"}).status(304);
    }
}

const updateStatusAnggotaList = (req, res, next) => {
    const {value, error} = updateStatusAnggota.validate(req.body)
    if(error === undefined){
        next();
    }else{
        res.send({message: "Oppss, wrong formatting"});
    }
}

const insertRoomList = (req, res, next) => {
    const {value, error} = insertRoom.validate(req.body)
    if(error === undefined){
        next();
    }else{
        res.send({message: "Oppss, wrong formatting"});
    }
}


module.exports = {countRoomSta,countListRoom, countListAnggota,inRoomAnggotaList, findRoomAnggotaList, updateStatusAnggotaList, insertRoomList, inRoomAnggotaManyList}