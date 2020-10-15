const Mongo = require('mongooo').Mongooo;
const conn = require('../env/index');

const { save } = require('mongooo').Save;
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


module.exports = {insertAnggota}