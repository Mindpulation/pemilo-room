const Mongo = require('mongooo').Mongooo;
const conn = require('../env/index');

const { set } = require('mongooo').Update;
const { save } = require('mongooo').Save;
const { findOne, find } = require('mongooo').Find;
const { del } = require('mongooo').Delete;
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
    res.send(data).status(200);
}

const findAnggota = async (req, res) => {
    const { find, field } = req.body;
    const data = await findOne(con, find, field);
    (data === null) ? res.send({message: "Data not found"}) : res.send(data);
}

const updateStatusAnggota = async (req, res) => {
    const { find, update } = req.body;
    const data = await set(con, find, update);
    res.send({res: data}).status(200);
}

const insertRoom = async (req, res) => {
    const param = objRoom(req.body);
    const data = save(con2, param);
    res.send({res:data}).status(200);
}

const findAllRoom = async (req, res) => {
  const { param, field, sort } = req.body;
  const data = await find(con2, param, field, sort);
  (data === null) ? res.send(false) : res.send(data);

// console.log('yey');
}

const findRoom = async (req, res) => {
    const {find, field} = req.body;
    const data = await findOne(con2, find, field);
    res.send({res: data}).status(200);
}

const updateRoom = async (req, res) => {
    const {find, field} = req.body;
    const data = await set(con2, find, field);
    res.send({res: data}).status(200);
}

const deleteRoom = async (req, res) => {
    const { param } = req.body;
    const data = await del(con2, param);
    res.send({res: data}).status(200);
    
}

module.exports = {insertAnggota, findAnggota, updateStatusAnggota, insertRoom, findAllRoom, findRoom, updateRoom, deleteRoom}