
import { useState } from "react";
import table from "../assets/Table.png";
import handback from "../assets/handback.png";
import "../styles/Game.css";
import twos from "../assets/cards/2s.png";
import sevenh from "../assets/cards/7h.png";


function Game({ socket, room, messagesReceived, setMessagesReceived, message, setMessage, inRoom, playerName }) {

    const [peek, setPeek] = useState(false);

    function peekHand() {
        setPeek(true);
    }

    function hideHand() {
        setPeek(false);
    }

    function sendMessage(event) {
        event.preventDefault();
        socket.emit("send_message", { message, room, playerName });
        setMessagesReceived([...messagesReceived, `${playerName} : ${message}`]);
        setMessage("");
    }

    return (
        <>
            {inRoom && <div>
                <h1>Room: {room}</h1>
                <div className="chatroom">
                    <h1 className="message-title"> Messages:</h1 >
                    <div className="chatbox">
                        {messagesReceived.length ? messagesReceived.map((message, index) =>
                            (<p className="message" key={index}>{message}</p>)
                        ) : <p></p>}
                    </div>
                    <form onSubmit={sendMessage}>
                        <input className="text-input" placeholder='Message...' onChange={(event) => {
                            setMessage(event.target.value)
                        }
                        } value={message}
                        ></input>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
                <img className="pokertable" src={table} alt="pokertable"></img>
                {!peek && <img className="handback" src={handback} onMouseEnter={peekHand}
                ></img>}
                {peek && <div className="hand" onMouseLeave={hideHand}>
                    <img className="card" src={twos}></img>
                    <img className="card" src={sevenh}></img>
                </div>}
            </div>}
        </>
    )
}

export default Game;