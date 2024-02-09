
import Table from "../assets/Table.png";

import "../styles/Game.css";

function Game({ socket, room, messagesReceived, setMessagesReceived, message, setMessage, inRoom, playerName }) {

    function sendMessage() {
        socket.emit("send_message", { message, room, playerName });
        // setMessagesReceived([...messagesReceived, `${playerName} : ${message}`])
    }

    return (
        <>
            {inRoom && <div>
                <h1>Room: {room}</h1>
                <div className="chatroom">
                    < h1 > Messages:</h1 >
                    <div className="chatbox">
                        {messagesReceived.length ? messagesReceived.map((message) =>
                            (<p>{message}</p>)
                        ) : <p></p>}
                    </div>
                    <input className="text-input" placeholder='Message...' onChange={(event) => {
                        setMessage(event.target.value)
                    }
                    }
                    ></input>
                    <button onClick={sendMessage}>Send Message</button>
                </div>
                <img className="pokertable" src={Table} alt="pokertable"></img>
            </div>}
        </>
    )
}

export default Game;