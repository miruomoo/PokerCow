const express = require('express');
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require("cors");

const deck = require('./deck.js');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket)=>{
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
    });

    socket.on("send_message", (data)=>{
        socket.to(data.room).emit("receive_message", data)
    })

    socket.on("start_game", ()=>{
        socket.to(data.room).emit("receive_game_start", deck.deck)
    })
})

server.listen(3001, ()=>{
    console.log("Server running on port 3001");
})