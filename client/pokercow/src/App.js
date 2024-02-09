import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

import Landing from "./components/Landing.js";
import Game from "./components/Game.js";

const socket = io.connect('http://localhost:3001');

function App() {
  const [room, setRoom] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [nickname, setNickname] = useState("Guest");

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(`${data.playerName} : ${data.message}`)
    })
  }, [socket])

  return (
    <div className='App'>
      {!inRoom && <Landing inRoom={inRoom} setRoom={setRoom} setInRoom={setInRoom} socket={socket} room={room} setNickname={setNickname}></Landing>}
      <Game 
      socket={socket}
      room={room}
      messageReceived={messageReceived}
      message={message}
      setMessage={setMessage} 
      inRoom={inRoom}
      playerName={nickname}
      ></Game>
    </div>
  );
}

export default App;
