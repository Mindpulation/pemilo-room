const Mongo = require('mongooo').Mongooo;
const conn = require('../env/index');
const multer = require('multer');

const { set } = require('mongooo').Update;
const { save, saveMany } = require('mongooo').Save;
const { findOne, find, getCount } = require('mongooo').Find;
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

const countAnggota = async (req, res) => {
    const ress = await getCount(con, {codeRoom:req.body.codeRoom});    
    res.send({count:ress});
}

const countRoom = async (req, res) => {    
    const ress =  await getCount(con2, {emailAdmin : req.body.emailAdmin});    
    res.send({count:ress});
}

const countRoomWithSta = async (req, res) => {
    const ress = await getCount(con2, {emailAdmin : req.body.emailAdmin, status:req.body.sta});
    res.send({count:ress});
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

const processExcel = async (req, res) => {
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, '../uploads');
        },
        filename: function (req, file, cb) {
            cb(null , file.originalname);
        }
    });
    const upload = multer({storage: storage, limits : {fileSize : 250000000}}).single("excel_file");

    upload(req, res, (err) => {

        if(err) {
            res.status(400).send("Something went wrong!\nmsg : "+ err);
        }
        var XLSX = require('xlsx');
        var workbook = XLSX.readFile(req.file.path);
        var sheet_name_list = workbook.SheetNames;
        var data = [];
        sheet_name_list.forEach(function(y) {
            var worksheet = workbook.Sheets[y];
            var headers = {};
            for(z in worksheet) {
                if(z[0] === '!') continue;
                //parse out the column, row, and value
                var tt = 0;
                for (var i = 0; i < z.length; i++) {
                    if (!isNaN(z[i])) {
                        tt = i;
                        break;
                    }
                };
                var col = z.substring(0,tt);
                var row = parseInt(z.substring(tt));
                var value = worksheet[z].v;

                //store header names
                if(row == 1 && value) {
                    headers[col] = value;
                    continue;
                }

                if(!data[row]) data[row]={};
                data[row][headers[col]] = value;
            }
            //drop those first two rows which are empty
            data.shift();
            data.shift();
            // console.log(data);
        });
        const data2 = { status:false, codeRoom: req.body.code_room }
        data.map(data => Object.assign(data, data2));
        const resultSaveMany = saveMany(con, data)
        res.send({"res" : resultSaveMany});
    });
}

module.exports = {processExcel,countAnggota, countRoom, countRoomWithSta,insertAnggota, findAnggota, updateStatusAnggota, insertRoom, findAllRoom, findRoom, updateRoom, deleteRoom, deleteAllRoom, insertAnggotaMany}