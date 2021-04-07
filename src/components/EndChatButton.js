import React, { useState } from 'react';
import { Button, Modal, Toast } from 'react-bootstrap';
import firebase, { helpChatsCollection } from '../firestore/index';

export default function EndChatButton({ str, chatObj }) {
  const [show, setShow] = useState(false);

  const sendEmail = async () => {
    const user = chatObj.userName;
    const userEmail = chatObj.userEmail;
    let conversation = [];
    const convArray = chatObj.conversation;
    const chatStartTime = convArray[0].timestamp;
    const convLength = convArray.length;
    const chatEndTime = convArray[convLength - 1].timestamp;
    const header = `Chat initiated: ${chatStartTime.toDate()}by: ${user} with a provided email of: ${userEmail}Chat ended: ${chatEndTime.toDate()}`;
    convArray.forEach((c) => {
      if (c.fromUser) {
        conversation = [...conversation, `${user} said: ${c.quote}`];
      } else {
        conversation = [...conversation, `DD said: ${c.quote}`];
      }
    });
    const emailContent = `${header}${conversation}`;
    //cloud function to send email data
    const sendTranscripts = firebase
      .functions()
      .httpsCallable('sendTranscripts');
    try {
      sendTranscripts(emailContent).then((result) => {
        console.log(result);
      });
    } catch (error) {
      console.log(error);
    }
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
