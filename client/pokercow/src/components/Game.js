
import Table from "../assets/Table.png";

function Game({ socket, room, messagesReceived, message, setMessage, inRoom, playerName}) {

    function sendMessage() {
        socket.emit("send_message", { message, room, playerName });
    }

    return (
        <>
        {inRoom && <div>
        <h1>Room: {room}</h1>
        <input placeholder='Message...' onChange={(event) => {
            setMessage(event.target.value)
        }
        }
        ></input>
        <button onClick={sendMessage}>Send Message</button>
        < h1 > Messages:</h1 >
        <div className="chatbox">
            {messagesReceived.length? messagesReceived.map((message)=>
                (<p>{message}</p>)
            ):<p></p>}
        </div>
        <img className="pokertable" src={Table} alt="pokertable"></img>
    </div>}
    </>
    )
}

export default Game;