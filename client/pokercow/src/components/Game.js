
import { useState } from "react";
import table from "../assets/Table.png";
import handback from "../assets/handback.png";
import "../styles/Game.css";
import twos from "../assets/cards/2s.png";
import sevenh from "../assets/cards/7h.png";
import leaveroom from "../assets/leaveroom.png";
import leaveroom_hover from "../assets/leaveroom_hover.png";


function Game({ socket, room, messagesReceived, setMessagesReceived, message, setMessage, inRoom, playerName, setInRoom }) {

    const [peek, setPeek] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [running, setRunning] = useState(false);

    function peekHand() {
        setPeek(true);
    }
    function hideHand() {
        setPeek(false);
    }

    function sendMessage(event) {
        event.preventDefault();
        socket.emit("send_message", { message, room, playerName });
        setMessagesReceived([...messagesReceived, {class:"message_sending", message:`${playerName} : ${message}`}]);
        setMessage("");
    }

    function handleLeaveRoom() {
        setInRoom(false);
        //clears chatbox
        setMessagesReceived([]);
    }

    function handleLeaving() {
        setLeaving(true);
    }

    function handleNotLeaving() {
        setLeaving(false);
    }

    return (
        <>
            {inRoom && <div>
                <h1>Room: {room}</h1>
                <div className="chatroom">
                    <h1 className="message-title"> Messages:</h1 >
                    <div className="chatbox">
                        {messagesReceived.length ? messagesReceived.map((message, index) =>
                            (<p key={index} className={message.class}>{message.message}</p>)
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
                {running && <>
                    {!peek && <img className="handback" src={handback} onMouseEnter={peekHand}
                    ></img>}
                    {peek && <div className="hand" onMouseLeave={hideHand}>
                        <img className="card" alt="handcard-1" src={twos}></img>
                        <img className="card" alt="handcard-2" src={sevenh}></img>
                    </div>}
                </>
                }
                {!leaving && <img class="leaveroom" src={leaveroom} alt="leave-room" onMouseEnter={handleLeaving}></img>}
                {leaving && <img class="leaveroom" src={leaveroom_hover} alt="leave-room" onClick={handleLeaveRoom} onMouseLeave={handleNotLeaving}></img>}
            </div>}
        </>
    )
}

export default Game; 