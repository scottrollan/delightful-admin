import React, { useState } from 'react';
import { Toast, Button, Form } from 'react-bootstrap';

export default function ChatPopup({ show, toggleShow, name, email, str }) {
  const [message, setMessage] = useState('');

  return (
    <>
      <Toast show={show} onClose={toggleShow} style={styles.toast}>
        <Toast.Header style={styles.toastHeader}>
          <strong>{name}</strong>
          <small>{email}</small>
        </Toast.Header>
        <Toast.Body style={styles.toastBody}>
          <div style={{ display: 'flex' }}>
            <div style={styles.userIcon}>user</div>
            <div
              style={styles.userQuote}
            >{`This is where the chat will take place for chat id: "${str}" Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <div style={styles.adminIcon}>DD</div>
            <div style={styles.adminQuote}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. At
              urna condimentum mattis pellentesque id nibh tortor id aliquet.
            </div>
          </div>
        </Toast.Body>
        <Form id={`form${str}`} style={styles.form}>
          <Form.Group controlId="messageInput">
            <Form.Label srOnly="Enter your message here"></Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              value={message}
              placeholder="Enter your message"
              required
              onChange={(e) => setMessage(e.target.value)}
              style={styles.messageInput}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Toast>
    </>
  );
}

const iconStyles = {
  borderRadius: '50%',
  width: '8vmin',
  height: '8vmin',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const styles = {
  toast: {
    position: 'relative',
    maxHeight: '80vh',
  },
  toastHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  toastBody: {
    maxHeight: '60vh',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '3rem',
  },
  userIcon: {
    ...iconStyles,
    backgroundColor: 'var(--admin-black)',
    color: 'var(--admin-white)',
  },
  userQuote: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    maxWidth: '75%',
    backgroundColor: 'var(--admin-black)',
    color: 'var(--admin-white)',
    padding: '0.25rem 0.375rem',
    borderRadius: '0 0.85rem 0.85rem 0.85rem',
    margin: '0.95rem 0.25rem 0.5rem',
  },
  adminIcon: {
    ...iconStyles,
    backgroundColor: 'var(--admin-white)',
    color: 'var(--admin-black)',
  },
  adminQuote: {
    alignSelf: 'flex-end',
    textAlign: 'right',
    maxWidth: '75%',
    backgroundColor: 'var(--admin-white)',
    color: 'var(--admin-black)',
    padding: '0.25rem 0.375rem',
    borderRadius: '0.85rem 0 0.85rem 0.85rem',
    margin: '0.95rem 0.25rem 0.5rem',
  },
  form: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  messageInput: {
    height: '100%',
    border: 'none',
    padding: '5px',
    minWidth: '0',
    boxShadow: 'none',
    maxHeight: '20vh',
    resize: 'none',
  },
};
