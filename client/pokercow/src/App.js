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
  const [messagesReceived, setMessagesReceived] = useState("");
  const [nickname, setNickname] = useState("Guest");
 

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesReceived(messagesReceived => [...messagesReceived, {class:"message_receiving", message:`${data.playerName} : ${data.message}`}]);
      console.log(data.playerName);
    });
    return () => socket.off('recieve_message').off();
  }, [])

  useEffect(() => {
    socket.on("player_joined", (data) => {
      setMessagesReceived(messagesReceived => [...messagesReceived, {class:"player_joined", message:`${data.playerName} has joined the room.`}]);
      console.log(data.playerName);
    });
    return () => socket.off('player_joined').off();
  }, [])
  
  return (
    <div className='App'>
      {!inRoom && <Landing inRoom={inRoom} setRoom={setRoom} setInRoom={setInRoom} socket={socket} room={room} setNickname={setNickname} playerName={nickname}></Landing>}
      <Game 
      socket={socket}
      room={room}
      messagesReceived={messagesReceived}
      setMessagesReceived={setMessagesReceived}
      message={message}
      setMessage={setMessage} 
      inRoom={inRoom}
      playerName={nickname}
      setInRoom={setInRoom}
      ></Game>
    </div>
  );
}

export default App;
