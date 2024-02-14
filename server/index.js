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
        
        let roundData = {
            playerHand1:"ace_s",
            playerHand2:"king_s",
            flop: [],
        };

        const randomCard1 = Math.floor(Math.random() * gameDeck.length);
        roundData.playerHand1 = gameDeck[randomCard1].id;
        gameDeck.splice(randomCard1, 1);
        const randomCard2 = Math.floor(Math.random() * gameDeck.length);
        roundData.playerHand2 = gameDeck[randomCard2].id;
        gameDeck.splice(randomCard2, 1);

        //Flop
        for (let i = 0; i<3; i++){
            let randomCard = Math.floor(Math.random() * gameDeck.length);
            roundData.flop.push(gameDeck[randomCard].id);
            gameDeck.splice(randomCard, 1);
        };

        console.log(roundData);

        socket.to(data.room).emit("receive_game_start", roundData);
        socket.emit("receive_game_start", roundData);
    });
})

server.listen(3001, ()=>{
    console.log("Server running on port 3001");
})