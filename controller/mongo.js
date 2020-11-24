const Mongo = require('mongooo').Mongooo;
const conn = require('../env/index');

const { set } = require('mongooo').Update;
const { save, saveMany } = require('mongooo').Save;
const { findOne, find } = require('mongooo').Find;
const { del, delMany } = require('mongooo').Delete;
const {generateAnggota, objRoom} = require('./helper');

const mongo = new Mongo;

let con;
let con2;

(async() => {
    con = await mongo.setup(conn.MONGO_URL, conn.MONGO_DB, conn.MONGO_COL);
    con2 = await mongo.setup(conn.MONGO_URL, conn.MONGO_DB, conn.MONGO_COL2);
})();

const insertAnggota = async (req, res) => {
    const param = generateAnggota(req.body);
    const data = await save(con, param);
    res.send({res:data}).status(200);
}

const insertAnggotaMany = async (req, res) => {
    const param = generateAnggota(req.body);
    const data = await saveMany(con, param);
    res.send({res:data}).status(200);
}


const findAnggota = async (req, res) => {
    const { find, field } = req.body;
    const data = await findOne(con, find, field);
    return (data === null) ? res.send({message: "Data not found"}) : res.send(data);
}

const updateStatusAnggota = async (req, res) => {
    const { find, update } = req.body;
    const cari = await findOne(con, find);
    const data = await set(con, find, update);
    
    if(cari === null){
        res.send({message: "Data not found"}).status(404);
    }else{
        res.send({res: data}).status(200);
    }
}

const insertRoom = async (req, res) => {
    const param = objRoom(req.body);
    const data = save(con2, param);
    res.send({
        res: data,
        roomCode: param.codeRoom
    }).status(200);
}

const findAllRoom = async (req, res) => {
  const { param, field, sort } = req.body;
  const data = await find(con2, param, field, sort);
  return (data === null) ? res.send(false) : res.send(data);

}

const findRoom = async (req, res) => {
    const {find, field} = req.body;
    const data = await findOne(con2, find, field);
    return res.send({res: data}).status(200);
}

const updateRoom = async (req, res) => {
    const {find, field} = req.body;
    const cari = await findOne(con2, find);
    const data = await set(con2, find, field);

    if(cari === null){
        return res.send({message: "Data not found"}).status(404);
    }else{
        return res.send({res: data}).status(200);
    }
   
}

const deleteRoom = async (req, res) => {
    const { param, find } = req.body;
    const cari = await findOne(con2, find);
    const data = await del(con2, find, param);

    if(cari === null){
        return res.send({message: "Data not found"}).status(404);
    }else{
        return res.send({res: data}).status(200);
    }
    
    
}

const deleteAllRoom = async (req, res) => {
    const { param } = req.body;
    const data = await delMany(con2, param);
    res.send({res:data}).status(200);
}


module.exports = {insertAnggota, findAnggota, updateStatusAnggota, insertRoom, findAllRoom, findRoom, updateRoom, deleteRoom, deleteAllRoom, insertAnggotaMany}