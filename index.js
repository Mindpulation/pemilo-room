const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');

const {uploadAndInsert} = require("./controller/mongo");

const conn = require('./env/index');
const insertAnggota = require('./view/insertAnggota');
const insertAnggotaFromExcel = require('./view/insertAnggotaFromExcel')
const findAnggota = require('./view/findAnggota');
const updateStatusAnggota = require('./view/updateStatusAnggota');
const insertRoom = require('./view/insertRoom');
const find = require('./view/findRoom');
const updateRoom = require('./view/updateRoom');
const deleteRoom = require('./view/deleteRoom');
const fileupload = require('express-fileupload');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

app.use('/api/anggota', insertAnggota);
app.use('/api/anggota', findAnggota);
app.use('/api/anggota', updateStatusAnggota);
app.use('/api/anggota', insertAnggotaFromExcel)
app.use('/api/room', insertRoom);
app.use('/api/room', find);
app.use('/api/room', updateRoom);
app.use('/api/room', deleteRoom);

app.post('/api/anggota/uploads', uploadAndInsert);


app.all("*", (req, res) => {
    res.send({message: "The router or endpoint you entered was not found"});
});

const server = http.createServer(app);
server.listen(conn.PORT);

console.log("Ini yang baru coy");

console.log('Server listen on port', conn.PORT);