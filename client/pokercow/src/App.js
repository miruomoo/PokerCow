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
    });
    return () => socket.off('recieve_message').off();
  }, [])

  return (
    <div className='App'>
      {!inRoom && <Landing inRoom={inRoom} setRoom={setRoom} setInRoom={setInRoom} socket={socket} room={room} setNickname={setNickname}></Landing>}
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
