import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function EndChatButton({ str, chatObj }) {
  const [show, setShow] = useState(true);

  const sendEmail = () => {
    const user = chatObj.userName;
    const userEmail = chatObj.userEmail;
    let conversation = [];
    const convArray = chatObj.conversation;
    const chatStartTime = convArray[0].timestamp;
    const convLength = convArray.length;
    const chatEndTime = convArray[convLength - 1].timestamp;
    const header = `This chat was initiated with Delightful Dog at ${chatStartTime.toDate()} by ${user} (with a provided email of ${userEmail}) and ended at ${chatEndTime.toDate()}: `;
    convArray.forEach((c) => {
      if (c.fromUser) {
        conversation = [...conversation, `<p>${user} said: ${c.quote}</p><br>`];
      } else {
        conversation = [...conversation, `<p>DD said: ${c.quote}</p><br>`];
      }
    });
    console.log(`${header}${conversation}`);
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <div style={styles.buttonDiv}>
            <Button
              variant="outline-info"
              style={styles.button}
              onClick={() => sendEmail()}
            >
              Email Transcript to Delightful Dog
            </Button>
            <Button variant="outline-danger" style={styles.button}>
              Close Conversation Permanently
            </Button>
          </div>
        </Modal.Body>
      </Modal>
      <Button
        variant="outline-info"
        onClick={() => console.log(chatObj)}
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
    justifyContent: 'space-between',
  },
  button: {
    margin: '25px 10px',
  },
};
