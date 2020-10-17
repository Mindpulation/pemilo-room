const express = require('express');
const cors = require('cors');
const http = require('http');

const conn = require('./env/index');
const insertAnggota = require('./view/insertAnggota');
const findAnggota = require('./view/findAnggota');
const updateStatusAnggota = require('./view/updateStatusAnggota');
const insertRoom = require('./view/insertRoom');
const find = require('./view/findRoom');
const updateRoom = require('./view/updateRoom');
const deleteRoom = require('./view/deleteRoom');



const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/anggota', insertAnggota);
app.use('/api/anggota', findAnggota);
app.use('/api/anggota', updateStatusAnggota);
app.use('/api/room', insertRoom);
app.use('/api/room', find);
app.use('/api/room', updateRoom);
app.use('/api/room', deleteRoom);


app.all("*", (req, res) => {
    res.send({message: "The router or endpoint you entered was not found"});
});

const server = http.createServer(app);
server.listen(conn.PORT);

console.log('Server listen on port', conn.PORT);