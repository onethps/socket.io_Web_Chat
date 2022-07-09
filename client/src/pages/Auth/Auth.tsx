import React, { ChangeEvent, FC } from "react";
// @ts-ignore
import s from './Auth.module.scss'
import axios from "axios";
import { io } from "socket.io-client";

var socket = io('http://localhost:3000/');


type AuthType =   {
  isAuth:boolean,
  setIsAuth: (bool:boolean) => void
  setUserName: (name:string) => void
  setRoom: (name:string) => void
  userName:string
  roomId: string
  setOnlineUsers: (arr:any[]) => void
  setMessages: (arr:any[]) => void
}

export const Auth:FC<AuthType> = (
  {setIsAuth, setUserName, setRoom, userName, roomId, setOnlineUsers, setMessages}) => {




  const onChangeUserNameHandle = (e:ChangeEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value)
  }

  const onChangeRoomIdHandle = (e:ChangeEvent<HTMLInputElement>) => {
    setRoom(e.currentTarget.value)
  }

  const onButtonSendIn =  async (e:any) => {
    await axios.post(`http://localhost:3000/`, {roomId, userName})
    socket.emit('ROOM:JOIN', {roomId, userName})

    const {data} =  await  axios.get(`http://localhost:3000/rooms/${roomId}`)
    setOnlineUsers(data.users)
    setMessages(data.messages)

    socket.on('ROOM:JOINED', (users) => {
      setOnlineUsers(users)

    })
    socket.on('ROOM:MESSAGE_SENT', (messages) => {
      setMessages(messages)
    })


    setIsAuth(true)
  }


  return (
    <div className={s.root}>
      <h3>Sign In to Chat</h3>
      <div className={s.chat}>
        <form  onSubmit={e => e.preventDefault()}>
          <label htmlFor="fname">User Name:</label>
          <input type="text" placeholder={'Enter User Name'}
                 value={userName} onChange={onChangeUserNameHandle}/>
          <label htmlFor="lname">Room ID:</label>
          <input type="text" placeholder={'Enter Room ID'}
                 value={roomId} onChange={onChangeRoomIdHandle}/>
          <input type="submit" value="Chat" onClick={onButtonSendIn}/>
        </form>
      </div>
    </div>
  );
};
