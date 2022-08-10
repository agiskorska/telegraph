const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const postRoutes = require('./routers/postRouter');
server.use('/posts', postRoutes);

server.get('/', (req, res) => {
    res.status(200).send("Welcome to our API");
});

module.exports = server;