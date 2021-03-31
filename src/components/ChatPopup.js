import React, { useState, useEffect } from 'react';
import ChatForm from './ChatForm';
import { Toast, Button, Form } from 'react-bootstrap';
import { createRandomString } from '../functions/CreateRandomString';
import $ from 'jquery';
import styles from './ChatPopup.module.scss';

export default function ChatPopup({ str, chat }) {
  const [show, setShow] = useState(true);
  const [chatObj, setChatObj] = useState({});
  const [conversation, setConversation] = useState([]);

  const closeChat = () => {
    setShow(!setShow);
  };

  useEffect(() => {
    setChatObj({ ...chat });
    console.log(chat);
    const q = chat.conversation;
    setConversation([...q]);
    $(`#toastBody${str}`).animate(
      {
        scrollTop: $(`#bottomOfChat${str}`).offset().top,
      },
      500
    );
  }, [chat]);
  return (
    <>
      <Toast show={show} onClose={closeChat} className={styles.toast}>
        <Toast.Header className={styles.toastHeader}>
          <strong>{chatObj.userName}</strong>
          <small>{chatObj.userEmail}</small>
        </Toast.Header>
        <Toast.Body id={`toastBody${str}`} className={styles.toastBody}>
          {conversation.map((c) => {
            return (
              <div
                key={createRandomString(12)}
                style={{
                  display: 'flex',
                  flexDirection: c.fromUser ? 'row' : 'row-reverse',
                }}
              >
                <div
                  className={c.fromUser ? styles.userIcon : styles.adminIcon}
                >
                  {c.fromUser ? 'user' : 'DD'}
                </div>
                <div
                  className={c.fromUser ? styles.userQuote : styles.adminQuote}
                >
                  {c.quote}
                </div>
              </div>
            );
          })}

          <div id={`bottomOfChat${str}`} style={{ minHeight: '10px' }}></div>
        </Toast.Body>
        <ChatForm formStr={`form${str}`} chatID={chat.id} />
      </Toast>
    </>
  );
}
