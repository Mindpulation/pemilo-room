const express = require('express');
const cors = require('cors');
const http = require('http');

const conn = require('./env/index');
const insertAnggota = require('./view/insertAnggota');
const findAnggota = require('./view/findAnggota');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/anggota', insertAnggota);
app.use('/api/anggota', findAnggota);

app.all("*", (req, res) => {
    res.send({message: "The router or endpoint you entered was not found"});
});

const server = http.createServer(app);
server.listen(conn.PORT);