import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import Table from "./assets/Table.png";

const socket = io.connect('http://localhost:3001');

function App() {
  const [room, setRoom] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  function sendMessage() {
    socket.emit("send_message", { message, room });
  }

  function joinRoom() {
    socket.emit("join_room", room);
    setInRoom(true);
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])

  return (
    <div className='App'>
      {!inRoom && <div className='room-input'>
        <input placeholder='Enter Room Number'
          onChange={(event) => {
            setRoom(event.target.value)
          }}></input>
        <button onClick={joinRoom}>Join</button>
      </div>}
      {inRoom && <h1>Room: {room}</h1>}
      <input placeholder='Message...' onChange={(event) => {
        setMessage(event.target.value)
      }
      }
      ></input>
      <button onClick={sendMessage}>Send Message</button>
      <h1>Message:</h1>
      <p>{messageReceived}</p>
      <img className="pokertable" src={Table}></img>
    </div>
  );
}

export default App;
