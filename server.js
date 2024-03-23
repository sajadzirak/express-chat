const http = require("http")
const path = require("path");
require("dotenv").config();
const express = require("express");
const socketio = require("socket.io")

const app = express();
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log("new websoket connection...")

    socket.emit('message', 'Welcome to expresschat')
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
