import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {
  helpChatsCollection,
  timeStamp,
  fsArrayUnion,
} from '../firestore/index';
import '../styles/custom-properties.scss';

export default function ChatForm({ formStr, chatID }) {
  const [newMessage, setNewMessage] = useState('');

  const submitNow = (event) => {
    event.preventDefault();
    const newDate = new Date();
    const newStamp = timeStamp.fromDate(newDate);
    try {
      helpChatsCollection.doc(chatID).update({
        conversation: fsArrayUnion({
          fromUser: false,
          quote: newMessage,
          timestamp: newStamp,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setNewMessage('');
    }
  };

  return (
    <Form id={formStr} style={styles.form} onSubmit={(e) => submitNow(e)}>
      <div style={styles.inputArea}>
        <Form.Group
          controlId={`${formStr}messageInput`}
          style={styles.textareaContainer}
        >
          <Form.Label srOnly="Enter your message here"></Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            value={newMessage}
            placeholder="Enter your message"
            required
            onChange={(e) => setNewMessage(e.target.value)}
            style={styles.messageInput}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" style={styles.flexEndButton}>
          <i className="far fa-paper-plane"></i>
        </Button>
      </div>
    </Form>
  );
}

const styles = {
  form: {
    height: 'var(--top-bottom-space)',
    position: 'absolute',
    bottom: '5px',
    left: '0',
    right: '0',
    width: '100%',
  },
  inputArea: {
    width: '100%',
    position: 'relative',
    backgroundColor: 'var(--admin-white)',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.4vmin 0 0.4vmin 1vmin',
  },
  textareaContainer: {
    flexGrow: 1,
    margin: '0 1rem 0 0',
    display: 'flex',
    alignItems: 'center',
  },
  messageInput: {
    flex: 1,
    border: 'none',
    padding: '0',
    boxShadow: 'none',
    resize: 'none',
    backgroundColor: 'transparent',
  },
  flexEndButton: {
    border: 'none',
    background: 'var(--admin-whte)',
    color: 'var(--admin-black)',
  },
};
