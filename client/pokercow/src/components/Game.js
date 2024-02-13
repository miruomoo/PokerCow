
import { useState, useEffect } from "react";
import table from "../assets/Table.png";
import handback from "../assets/handback.png";
import "../styles/Game.css";

import two_s from "../assets/cards/2s.png";
import three_s from "../assets/cards/3s.png";
import four_s from "../assets/cards/4s.png";
import five_s from "../assets/cards/5s.png";
import six_s from "../assets/cards/6s.png";
import seven_s from "../assets/cards/7s.png";
import eight_s from "../assets/cards/8s.png";
import nine_s from "../assets/cards/9s.png";
import ten_s from "../assets/cards/10s.png";
import jack_s from "../assets/cards/js.png";
import queen_s from "../assets/cards/qs.png";
import king_s from "../assets/cards/ks.png";
import ace_s from "../assets/cards/as.png";
import sevenh from "../assets/cards/7h.png";


import leaveroom from "../assets/leaveroom.png";
import leaveroom_hover from "../assets/leaveroom_hover.png";

function Game({ socket, room, messagesReceived, setMessagesReceived, message, setMessage, inRoom, playerName, setInRoom }) {

    const deck_refs = {
        "ace_s": ace_s,
        "king_s": king_s
    }

    const [peek, setPeek] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [running, setRunning] = useState(false);
    const [hand, setHand] = useState([]);

    useEffect(() => {
        socket.on("receive_game_start", (data) => {
            setHand([data.playerHand1, data.playerHand2]);
            console.log(hand)
            setRunning(true);
        });
    }, [])

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

    function startGame(){
        socket.emit("start_game", {room});
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
                        <img className="card" alt="handcard-1" src={deck_refs[hand[0]]}></img>
                        <img className="card" alt="handcard-2" src={deck_refs[hand[1]]}></img>
                    </div>}
                </>
                }
                {!leaving && <img className="leaveroom" src={leaveroom} alt="leave-room" onMouseEnter={handleLeaving}></img>}
                {leaving && <img className="leaveroom" src={leaveroom_hover} alt="leave-room" onClick={handleLeaveRoom} onMouseLeave={handleNotLeaving}></img>}
                {!running && <button onClick={startGame}>Deal Now</button>}
            </div>}
        </>
    )
}

export default Game; 