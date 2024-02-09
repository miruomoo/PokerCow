import "../styles/Landing.css";

function Landing({ inRoom, setInRoom, setRoom, socket, room, setNickname }) {

    function joinRoom() {
        socket.emit("join_room", room);
        setInRoom(true);
    }

    return (<>
        {!inRoom && <div className='landing-input'>
            <h1>Name:</h1>
            <input placeholder='Enter Nickname'
            onChange={
                (event)=>{
                    setNickname(event.target.value);
                }
            }></input>
            <h1>Room Number:</h1>
            <input placeholder='Enter Room Number'
                onChange={(event) => {
                    setRoom(event.target.value);
                }}></input>
            <button onClick={joinRoom}>Join</button>
        </div>}
    </>)
}

export default Landing;