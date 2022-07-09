import './App.css';
import React, { useCallback, useEffect, useState } from "react";
import { io } from 'socket.io-client'
import { Auth } from "../src/pages/Auth/Auth";
import Chat from "../src/pages/Chat/Chat";
import { BigHead } from "@bigheads/core";
import { getRandomOptions } from "../src/utils/avatarRandomaizer";


var socket = io('http://localhost:3000/');

export function App() {

  const [isAuth, setIsAuth] = useState(false)

  const [roomId, setRoom] = useState('')
  const [userName, setUserName] = useState('')


  const [onlineUsers, setOnlineUsers] = useState<any[]>([])
  const [messages, setMessages] = useState<any[]>([])



  useEffect(() => {

  },[])



  return (
    <div className="App">
      { !isAuth ?
        <>
          <Auth
            setIsAuth={setIsAuth} userName={userName}
            setUserName={setUserName} roomId={roomId}
            setRoom={setRoom} isAuth={isAuth}
            setOnlineUsers={setOnlineUsers}
            setMessages={setMessages}
          />
        </>
        :

        <>
          <Chat roomId={roomId} userName={userName}
                messages={messages} onlineUsers={onlineUsers}
                setMessages={setMessages}
          />
        </>
      }
    </div>
  );
}

export default App;
