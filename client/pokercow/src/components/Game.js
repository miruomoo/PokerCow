
import { useState, useEffect } from "react";
import table from "../assets/Table.png";
import handback from "../assets/handback.png";
import "../styles/Game.css";

import ace_s from "../assets/cards/as.png";
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

import ace_d from "../assets/cards/ad.png";
import two_d from "../assets/cards/2d.png";
import three_d from "../assets/cards/3d.png";
import four_d from "../assets/cards/4d.png";
import five_d from "../assets/cards/5d.png";
import six_d from "../assets/cards/6d.png";
import seven_d from "../assets/cards/7d.png";
import eight_d from "../assets/cards/8d.png";
import nine_d from "../assets/cards/9d.png";
import ten_d from "../assets/cards/10d.png";
import jack_d from "../assets/cards/jd.png";
import queen_d from "../assets/cards/qd.png";
import king_d from "../assets/cards/kd.png";

import ace_c from "../assets/cards/ac.png";
import two_c from "../assets/cards/2c.png";
import three_c from "../assets/cards/3c.png";
import four_c from "../assets/cards/4c.png";
import five_c from "../assets/cards/5c.png";
import six_c from "../assets/cards/6c.png";
import seven_c from "../assets/cards/7c.png";
import eight_c from "../assets/cards/8c.png";
import nine_c from "../assets/cards/9c.png";
import ten_c from "../assets/cards/10c.png";
import jack_c from "../assets/cards/jc.png";
import queen_c from "../assets/cards/qc.png";
import king_c from "../assets/cards/kc.png";

import ace_h from "../assets/cards/ah.png";
import two_h from "../assets/cards/2h.png";
import three_h from "../assets/cards/3h.png";
import four_h from "../assets/cards/4h.png";
import five_h from "../assets/cards/5h.png";
import six_h from "../assets/cards/6h.png";
import seven_h from "../assets/cards/7h.png";
import eight_h from "../assets/cards/8h.png";
import nine_h from "../assets/cards/9h.png";
import ten_h from "../assets/cards/10h.png";
import jack_h from "../assets/cards/jh.png";
import queen_h from "../assets/cards/qh.png";
import king_h from "../assets/cards/kh.png";



import leaveroom from "../assets/leaveroom.png";
import leaveroom_hover from "../assets/leaveroom_hover.png";

function Game({ socket, room, messagesReceived, setMessagesReceived, message, setMessage, inRoom, playerName, setInRoom }) {

    const deck_refs = {
        "ace_s": ace_s,
        "two_s": two_s,
        "three_s": three_s,
        "four_s": four_s,
        "five_s": five_s,
        "six_s": six_s,
        "seven_s": seven_s,
        "eight_s": eight_s,
        "nine_s": nine_s,
        "ten_s": ten_s,
        "jack_s": jack_s,
        "queen_s": queen_s,
        "king_s": king_s,
        "ace_c": ace_c,
        "two_c": two_c,
        "three_c": three_c,
        "four_c": four_c,
        "five_c": five_c,
        "six_c": six_c,
        "seven_c": seven_c,
        "eight_c": eight_c,
        "nine_c": nine_c,
        "ten_c": ten_c,
        "jack_c": jack_c,
        "queen_c": queen_c,
        "king_c": king_c,
        "ace_d": ace_d,
        "two_d": two_d,
        "three_d": three_d,
        "four_d": four_d,
        "five_d": five_d,
        "six_d": six_d,
        "seven_d": seven_d,
        "eight_d": eight_d,
        "nine_d": nine_d,
        "ten_d": ten_d,
        "jack_d": jack_d,
        "queen_d": queen_d,
        "king_d": king_d,
        "ace_h": ace_h,
        "two_h": two_h,
        "three_h": three_h,
        "four_h": four_h,
        "five_h": five_h,
        "six_h": six_h,
        "seven_h": seven_h,
        "eight_h": eight_h,
        "nine_h": nine_h,
        "ten_h": ten_h,
        "jack_h": jack_h,
        "queen_h": queen_h,
        "king_h": king_h,
    }

    const [peek, setPeek] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [running, setRunning] = useState(false);
    const [hand, setHand] = useState([]);
    const [flop, setFlop] = useState([]);

    useEffect(() => {
        socket.on("receive_game_start", (data) => {
            setHand([data.playerHand1, data.playerHand2]);
            setFlop(data.flop);
            console.log(hand);
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
        setMessagesReceived([...messagesReceived, { class: "message_sending", message: `${playerName} : ${message}` }]);
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

    function startGame() {
        socket.emit("start_game", { room });
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
                {running &&
                    <div className="flop">
                        <img alt="flop-1" className="card" src={deck_refs[flop[0]]}></img>
                        <img alt="flop-2" className="card" src={deck_refs[flop[1]]}></img>
                        <img alt="flop-3" className="card" src={deck_refs[flop[2]]}></img>
                    </div>
                }
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
                {<button onClick={startGame}>Deal Now</button>}
            </div>}
        </>
    )
}

export default Game; 