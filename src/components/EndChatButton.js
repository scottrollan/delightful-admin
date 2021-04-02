import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { helpChatsCollection } from '../firestore/index';

export default function EndChatButton({ str, chatObj }) {
  const [show, setShow] = useState(false);

  const sendEmail = () => {
    const user = chatObj.userName;
    const userEmail = chatObj.userEmail;
    let conversation = [];
    const convArray = chatObj.conversation;
    const chatStartTime = convArray[0].timestamp;
    const convLength = convArray.length;
    const chatEndTime = convArray[convLength - 1].timestamp;
    const header = `Chat initiated: ${chatStartTime.toDate()} // by: ${user} //with a provided email of: ${userEmail} // Chat ended: ${chatEndTime.toDate()}: `;
    convArray.forEach((c) => {
      if (c.fromUser) {
        conversation = [...conversation, `<p>${user} said: ${c.quote}</p><br>`];
      } else {
        conversation = [...conversation, `<p>DD said: ${c.quote}</p><br>`];
      }
    });
    console.log(`${header}${conversation}`);
  };

  const endConversation = () => {
    setShow(true);
  };

  const deleteChat = () => {
    const id = chatObj.id;
    helpChatsCollection
      .doc(id)
      .delete()
      .then(() => {
        alert('Chat permanently deleted');
      });
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header
          closeButton
        >{`Chat with ${chatObj.userName}`}</Modal.Header>
        <Modal.Body>
          <div style={styles.buttonDiv}>
            <Button
              variant="outline-info"
              style={styles.button}
              onClick={() => sendEmail()}
            >
              Email Chat Transcript to Delightful Dog
            </Button>
            <Button
              variant="outline-danger"
              style={styles.button}
              onClick={() => deleteChat()}
            >
              Delete Chat Permanently
            </Button>
          </div>
          <div style={styles.buttonDiv}>
            <Button
              variant="outline-primary"
              style={styles.button}
              onClick={() => setShow(false)}
            >
              Close This Window
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Button
        variant="outline-info"
        onClick={() => endConversation()}
        id={`bottomOfChat${str}`}
        style={{
          margin: '3vmin 0',
        }}
      >
        End This Conversation
      </Button>
    </>
  );
}

const styles = {
  buttonDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: '25px 10px',
    flexGrow: 1,
  },
};
