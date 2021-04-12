import React, { useState, useEffect } from 'react';
import ChatForm from './ChatForm';
import EndChatButton from './EndChatButton';
import { Toast } from 'react-bootstrap';
import { createRandomString } from '../functions/CreateRandomString';
import $ from 'jquery';
import styles from './ChatPopup.module.scss';

export default function ChatPopup({ str, chat }) {
  const [show, setShow] = useState(true);
  const [chatObj, setChatObj] = useState({});
  const [conversation, setConversation] = useState([]);
  const [startTime, setStartTime] = useState('');
  const closeChat = () => {
    setShow(!setShow);
  };

  // let startTime, endTime;

  useEffect(() => {
    if ($(`#toastBodyContent${str}`).length > 0) {
      //get height of content inside toastBody...
      const contentDiv = $(`#toastBodyContent${str}`);
      let contentHeight = contentDiv[0].scrollHeight;
      //scroll toastBody... that distance (happens when new comment added)
      $(`#toastBody${str}`).animate(
        {
          scrollTop: contentHeight,
        },
        800
      );
    }
    setChatObj({ ...chat });
    const q = chat.conversation;
    setConversation([...q]);
    const qStart = q[0].timestamp;
    const qStartTime = qStart.toDate();
    const localTime = qStartTime.toString();
    setStartTime(localTime);
  }, [chat]);

  return (
    <>
      <Toast show={show} onClose={closeChat} className={styles.toast}>
        <Toast.Header className={styles.toastHeader}>
          <strong>{chatObj.userName}</strong>
          <small>{chatObj.userEmail}</small>
        </Toast.Header>
        <Toast.Body id={`toastBody${str}`} className={styles.toastBody}>
          <div style={{ color: 'black' }}>Chat initiated: {startTime}</div>

          <div id={`toastBodyContent${str}`}>
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
                    {c.fromUser ? chatObj.userName.substr(0, 1) : 'DD'}
                  </div>
                  <div
                    className={
                      c.fromUser ? styles.userQuote : styles.adminQuote
                    }
                  >
                    {c.quote}
                  </div>
                </div>
              );
            })}
            <div
              style={{
                marginBottom: '3vmin',
              }}
            >
              <EndChatButton str={str} chatObj={chatObj} />
            </div>
          </div>
        </Toast.Body>
        <ChatForm formStr={`form${str}`} chatID={chat.id} />
      </Toast>
    </>
  );
}
