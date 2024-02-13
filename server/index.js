const express = require('express');
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require("cors");

const data = require('./data.js');

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
    });

    socket.on("start_game", ()=>{
        let gameDeck = data.deck;
        
        let data = {
            playerHand1:"",
            playerHand2:""
        };

        const randomCard1 = gameDeck[Math.floor(Math.random() * gameDeck.length)];
        data.playerHand1 = gameDeck[randomCard1].id;
        gameDeck.splice(randomCard1, 1);

        const randomCard2 = gameDeck[Math.floor(Math.random() * gameDeck.length)];
        data.playerHand2 = gameDeck[randomCard2].id;
        gameDeck.splice(randomCard2, 1);

        socket.to(data.room).emit("receive_game_start", data)
    });
})

server.listen(3001, ()=>{
    console.log("Server running on port 3001");
})