import React from 'react';
// @ts-ignore
import s from './Chat.module.scss'

const Chat = () => {
  return (
    <div>
      <h3 style={{marginTop:'5%'}}>Chat Room: 213213</h3>
      <div className={s.root}>
        <div className={s.sideBar}>
          <h4>Online Users</h4>
          <div className={s.userStyle}>User1</div>
          <div className={s.userStyle}>User1</div>
          <div className={s.userStyle}>User1</div>
        </div>
        <div className={s.mainChat}>
          <div className={s.messageItem}>
            <div className={s.messageStyle}>Message</div>
            <span>Jen</span>
          </div>

          <div className={s.messageItem}>
            <div className={s.messageStyle}>Message</div>
            <span>Jen</span>
          </div>


<div className={s.textAreaBlock}>
  <textarea rows={3} placeholder={'Write new Message....'}></textarea>
  <button>Send </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default Chat;