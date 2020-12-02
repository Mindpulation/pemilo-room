const Mongo = require('mongooo').Mongooo;
const conn = require('../env/index');
const multer = require('multer');

const excelToJson = require('convert-excel-to-json');
var XLSX = require('xlsx');


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

async function uploadAndInsert(req, res){    
    
  const file = req.files.excel_file;

  file.mv('./uploads/' + file.name, function(err) {
      
    if(err) throw err;

    let workbook = XLSX.readFile('./uploads/' + file.name);
    let sheet_name_list = workbook.SheetNames;                

    const resjs = excelToJson({
    sourceFile: './uploads/' + file.name,header:{rows:1},
    columnToKey: { C:'nama',E:'email' }, 
    sheets: sheet_name_list });

    let arrAll = [];        

    let leng = sheet_name_list.length;        

    let j = 0;
    while(j<leng){
     
      let tmp = Object.values(resjs)[j];            
      let len = tmp.length;
      for(let i=0;i<len;i++){                                
        tmp[i].codeRoom = req.body.code_room;
        tmp[i].status = false;
      }
      j++;
      arrAll = arrAll.concat(tmp);
    }

     const hasil = saveMany(con, arrAll);

     res.send({success:hasil});

  });
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
        console.log(req.body.code_room)
        //console.log(req);
        console.log(req);

        if(err) {
            res.status(400).send("Something went wrong!\nmsg : "+ err);
        }
        var result = excelToJson({
            sourceFile: req.file.path,
            header: {
                rows: 1
            },
            columnToKey: {
                '*': '{{columnHeader}}'
            }
        });
        var keys = Object.keys(result);
        console.log(keys);
        const hasil = [];
        for(let i = 0; i < keys.length; i++){
            hasil.push(result[keys[i]])
        }
        const data2 = { status:false, codeRoom: req.body.code_room }
        var finalData = [].concat.apply([], hasil);
        finalData.map(data => Object.assign(data, data2));
        finalData.map( function( item ){
            for(var key in item){
                item[ key.toLowerCase() ] = item[key];
                delete item[key];
            }
            return item;
        });
        // const resultSaveMany = await saveMany(con, finalData);

        console.log(finalData);

        // res.send({"res" : resultSaveMany});
        
    });




}

module.exports = {uploadAndInsert,processExcel,countAnggota, countRoom, countRoomWithSta,insertAnggota, findAnggota, updateStatusAnggota, insertRoom, findAllRoom, findRoom, updateRoom, deleteRoom, deleteAllRoom, insertAnggotaMany}