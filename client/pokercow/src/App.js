import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:3001');

function App() {

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  function sendMessage(){
    socket.emit("send_message", {message});
  }

  useEffect(()=>{
    socket.on("receive_message", (data)=>{
      setMessageReceived(data.message)
    })
  }, [socket])

  return (
    <div className='App'>
      <input placeholder='Message...' onChange={(event)=>{
        setMessage(event.target.value)}
      }
      ></input>
      <button onClick={sendMessage}>Send Message</button>
      <h1>Messages:</h1>
      <p>{messageReceived}</p>
    </div>
  );
}

export default App;
