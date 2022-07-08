import './App.css';
import {useEffect, useState} from "react";
import {io} from 'socket.io-client'
import axios from "axios";


var socket = io('http://localhost:3000/');

function App() {
    const [userName, setUserName] = useState('')
    const [roomId, setRoom] = useState('')
    const [isAuth, setIsAuth] = useState(false)
    const [onlineUsers, setOnlineUsers] = useState([])

    console.log(onlineUsers)

    const onButtonSendIn =  async () => {
        await axios.post(`http://localhost:3000/`, {roomId, userName})
        socket.emit('ROOM:JOIN', {roomId, userName})
        const {data} =  await  axios.get(`http://localhost:3000/rooms/${roomId}`)
        setOnlineUsers(data.users)

        setIsAuth(true)
    }

    useEffect(() => {
        socket.on('ROOM:JOINED', (users) => {
            console.log('new users ==>    ' + users)
            setOnlineUsers(users)
            console.log('we in socket')

        })
        // socket.on('ROOM:LEAVE', (users) => {
        //     console.log('new users ==>    ' + users)
        // })
    },[])


    return (
        <div className="App">
            { !isAuth ?
                <>
                    <div>
                        <span>UserName </span>
                        <input value={userName} placeholder={'username'}
                               onChange={(e) => setUserName(e.currentTarget.value)}/>
                    </div>
                    <div>
                        <span>Room </span><input value={roomId} placeholder={'room'} onChange={(e) => setRoom(e.currentTarget.value)}/>
                    </div>
                    <button onClick={onButtonSendIn}>ACCEPT</button></>
                :

                <div style={{display:'flex',
                    justifyContent:"space-between",
                    width:'400px',
                    alignItems:'flex-start',
                    margin:'0 auto',
                    height:'300px'

                }}>
                    <div>
                        <div>Online Users</div>
                        {onlineUsers.map((user, i) =>  <div key={user + i}>{user}</div>)}
                    </div>
                    <div style={{border:'1px solid black', flex:'2'}}>
                        <div> Messages</div>
                        <div>Message 1</div>
                        <div>Message 1</div>
                        <div>Message 1</div>
                        <div>Message 1</div>
                        <textarea></textarea>
                        <button>Send Message</button>
                    </div>

                </div>

            }
        </div>
    );
}

export default App;
