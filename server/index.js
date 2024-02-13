const express = require('express');
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require("cors");

const deckData = require('./data.js');

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

    socket.on("start_game", (data)=>{
        let gameDeck = deckData.deck;
        
        let hand = {
            playerHand1:"ace_s",
            playerHand2:"king_s"
        };

        // const randomCard1 = gameDeck[Math.floor(Math.random() * gameDeck.length)];
        // hand.playerHand1 = randomCard1.id;
        // gameDeck.splice(randomCard1, 1);

        // const randomCard2 = gameDeck[Math.floor(Math.random() * gameDeck.length)];
        // hand.playerHand2 = randomCard2.id;
        // gameDeck.splice(randomCard2, 1);

        console.log(hand);

        socket.to(data.room).emit("receive_game_start", hand);
        socket.emit("receive_game_start", hand);
    });
})

server.listen(3001, ()=>{
    console.log("Server running on port 3001");
})