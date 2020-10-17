const {insertAnggota, findAnggota, updateStatusAnggota, insertRoom} = require('./schema');

const inRoomAnggotaList = (req, res, next) => {
    const {value, error} = insertAnggota.validate(req.body)
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


module.exports = {inRoomAnggotaList, findRoomAnggotaList, updateStatusAnggotaList, insertRoomList}