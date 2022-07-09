import React, { ChangeEvent, FC, useEffect, useState } from 'react';
// @ts-ignore
import s from './Chat.module.scss'
import { io } from "socket.io-client";
import { getRandomOptions } from "../../utils/avatarRandomaizer";

type ChatType = {
  roomId:string
  userName:string
  messages: any[]
  onlineUsers:any
  setMessages: (arr:any) => void


}

var socket = io('http://localhost:3000/');

const Chat:FC<ChatType> = ({roomId, userName, messages, onlineUsers, setMessages}) => {


  const [messageArea, setMessageArea] = useState('')

  const sendMessageAreaHandle = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setMessageArea(e.currentTarget.value)
  }

  const sendMessage = () => {
    socket.emit('ROOM:SEND_MESSAGE',  {userName, messageArea, roomId})
    let randomAva = getRandomOptions()
    setMessages([...messages,{userName: userName, messageArea:messageArea, avatar: {...randomAva} }])
    setMessageArea('')
  }




  useEffect(() => {

  },[])

  return (
    <div>

      <div className={s.root}>

        <div className={s.sideBar}>
          <h4>Online Users</h4>
          <input type={'text'} placeholder={'Search Users'}/>
          {onlineUsers.map((user:any, i:number) =>
            <div key={user + i} className={s.userStyle}>
              <div className={s.userAva}>
              </div>
              <span>{user}</span>

            </div>
          )}

        </div>
        <div className={s.mainChat}>
          {messages.map((messages:any, index:number) =>
            <div key={index} className={s.messageItem}>
              <div className={s.userMessageBox}>
                <div className={s.userMessageAva}></div>
                <div className={s.messageStyle}>{messages.messageArea}</div>
              </div>
              <span>{messages.userName}</span>

            </div>
          )}
          <div className={s.textAreaBlock}>
            <textarea rows={2} placeholder={'Write new Message....'} onChange={sendMessageAreaHandle} value={messageArea}></textarea>
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>


      </div>

    </div>
  );
};

export default Chat;