const Mongo = require('mongooo').Mongooo;
const conn = require('../env/index');

const { save } = require('mongooo').Save;
const { findOne } = require('mongooo').Find;
const {generateAnggota} = require('./helper');

const mongo = new Mongo;

let con;

(async() => {
    con = await mongo.setup(conn.MONGO_URL, conn.MONGO_DB, conn.MONGO_COL);
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


module.exports = {insertAnggota, findAnggota}