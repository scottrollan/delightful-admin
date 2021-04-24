import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {
  helpChatsCollection,
  timeStamp,
  fsArrayUnion,
} from '../firestore/index';
import $ from 'jquery';
import '../styles/custom-properties.scss';

export default function ChatForm({ str, chatID }) {
  const [newMessage, setNewMessage] = useState('');

  const textArea = $(`#form${str}messageInput`);
  const spacer = $(`#bottomOfChat${str}`);

  const autoExpandMe = () => {
    setTimeout(() => {
      if (textArea[0].scrollHeight > 24) {
        textArea.attr('rows', 2);
        spacer.attr('margin-bottom', 'calc(3vmin + 25px)');
      }
      if (textArea[0].scrollHeight > 70) {
        textArea.attr('rows', 3);
        spacer.attr('margin-bottom', 'calc(3vmin + 71px)');
      }
      // if (textArea[0].scrollHeight < 24) {
      //   textArea.attr('rows', 1);
      //   spacer.attr('height', '3px');
      // }
    }, 0);
  };

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
      textArea.attr('rows', 1);
    }
  };

  return (
    <Form id={`form${str}`} style={styles.form} onSubmit={(e) => submitNow(e)}>
      <div style={styles.inputArea}>
        <Form.Group
          controlId={`form${str}messageInput`}
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
            onKeyDown={() => autoExpandMe()}
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
    // height: 'var(--top-bottom-space)',
    position: 'absolute',
    bottom: '0',
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
    borderRadius: '0 0 0.25rem 0.25rem',
  },
  textareaContainer: {
    flexGrow: 1,
    margin: '0 1rem 0 0',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '0 0 0.25rem 0.25rem',
  },
  messageInput: {
    flex: 1,
    border: 'none',
    padding: '0',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    marginBottom: 0,
    borderRadius: '0 0 0.25rem 0.25rem',
    resize: 'none',
  },
  flexEndButton: {
    border: 'none',
    background: 'var(--admin-whte)',
    color: 'var(--admin-black)',
  },
};
