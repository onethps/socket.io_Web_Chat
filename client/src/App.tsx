import './App.css';
import React, { ChangeEvent, useEffect, useState } from "react";
import { io } from 'socket.io-client'
import { Auth } from "../src/pages/Auth/Auth";
import Chat from "../src/pages/Chat/Chat";


var socket = io('http://localhost:3000/');

export function App() {
    const [userName, setUserName] = useState('')
    const [roomId, setRoom] = useState('')
    const [isAuth, setIsAuth] = useState(true)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [messages, setMessages] = useState<any>([])
    const [messageArea, setMessageArea] = useState('')




    const sendMessageAreaHandle = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setMessageArea(e.currentTarget.value)
    }

    const sendMessage = () => {
        socket.emit('ROOM:SEND_MESSAGE',  {userName, messageArea, roomId})
        setMessages([...messages,{userName: userName, messageArea:messageArea}])
    }

    useEffect(() => {
        socket.on('ROOM:JOINED', (users) => {
            setOnlineUsers(users)
        })
        socket.on('ROOM:MESSAGE_SENT', (messages) => {
            console.log(messages)
            setMessages(messages)
        })

    },[])


    return (
      <div className="App">
          { !isAuth ?
            <>
                <Auth isAuth={isAuth}
                      setMessages={setMessages}
                      setIsAuth={setIsAuth}
                      setOnlineUsers={setOnlineUsers}/>
            </>
            :

            <>
            <Chat/>
            <div style={{display:'none',
                justifyContent:"space-between",
                width:'400px',
                alignItems:'flex-start',
                margin:'0 auto',
                height:'300px',

            }}>
                <div>
                    <div>Online Users</div>
                    {onlineUsers.map((user, i) =>  <div key={user + i}>{user}</div>)}
                </div>
                <div style={{border:'1px solid black', flex:'2'}}>
                    {messages.map((el:any) =>
                      <><span>{el.userName}</span><div>{el.messageArea}</div></>
                    )}
                    <textarea value={messageArea} onChange={sendMessageAreaHandle}></textarea>
                    <button onClick={sendMessage}>Send Message</button>
                </div>

            </div>
            </>
          }
      </div>
    );
}

export default App;
