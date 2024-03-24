const http = require("http");
const path = require("path");
require("dotenv").config();
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

const botName = "Express-chat";

io.on("connection", (socket) => {
  socket.emit("message", formatMessage(botName, "Welcome to ExpressChat"));

  socket.broadcast.emit(
    "message",
    formatMessage(botName, "A user has joined the chat")
  );

  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A user has left the chat"));
  });

  socket.on("chatMessage", (msg) => {
    io.emit("message", formatMessage("USER", msg));
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
