import React, { ChangeEvent, FC, MouseEventHandler, useState } from "react";
// @ts-ignore
import s from './Auth.module.scss'
import axios from "axios";
import { io } from "socket.io-client";

var socket = io('http://localhost:3000/');


type AuthType =   {
  isAuth:boolean,
  setIsAuth: (bool:boolean) => void
  setMessages: (arr:any) => void
  setOnlineUsers: (arr:any) => void
}

export const Auth:FC<AuthType> = (
  {isAuth, setIsAuth, setMessages, setOnlineUsers}) => {

  const [userName, setUserName] = useState('')
  const [roomId, setRoom] = useState('')

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
    setIsAuth(true)
  }


  return (
    <div>
      <div className={s.root}>
        <form  onSubmit={e => e.preventDefault()}>
          <label htmlFor="fname">User Name:</label>
          <input type="text" placeholder={'User Name'}
                 value={userName} onChange={onChangeUserNameHandle}/>
          <label htmlFor="lname">Room ID:</label>
          <input type="text" placeholder={'Room ID'}
                 value={roomId} onChange={onChangeRoomIdHandle}/>
          <input type="submit" value="Chat" onClick={onButtonSendIn}/>
        </form>
      </div>
    </div>
  );
};
