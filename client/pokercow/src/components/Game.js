
import Table from "../assets/Table.png";

function Game({ socket, room, messageReceived, message, setMessage, inRoom, playerName}) {

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
        < h1 > Message:</h1 >
        <p>{messageReceived}</p>
        <img className="pokertable" src={Table} alt="pokertable"></img>
    </div>}
    </>
    )
}

export default Game;