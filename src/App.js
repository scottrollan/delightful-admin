import React, { useState, useEffect } from 'react';
import ChatPopup from './components/ChatPopup';
import { helpChatsCollection } from './firestore/index';
import logo from './dogOnly.png';
import { createRandomString } from './functions/CreateRandomString';
import './App.scss';

const App = () => {
  const [showChat, setShowChat] = useState(true);
  const [openChats, setOpenChats] = useState([]);
  const toggleShow = () => setShowChat(!setShowChat);

  useEffect(() => {
    const _ = require('lodash');
    let allOpenChats = [];
    helpChatsCollection
      .where('closed', '==', false)
      .onSnapshot((querySnapshot) => {
        allOpenChats = [];
        querySnapshot.forEach((doc) => {
          const data = { ...doc.data(), id: doc.id };
          allOpenChats = [...allOpenChats, { ...data }];
        });
        // allOpenChats = _.uniqBy(allOpenChats, 'id');
        allOpenChats.sort((a, b) => {
          return a.conversation[0].timestamp > b.conversation[0].timestamp
            ? 1
            : -1;
        });
        setOpenChats([...allOpenChats]);
      });
    const unsubscribe = helpChatsCollection.onSnapshot(() => {});
    unsubscribe();
  }, []);
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="App-title">Delightful Dog Admin Tools</div>
      <div
        style={{
          display: 'flex',
          flexFlow: 'row wrap',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {openChats.map((c) => {
          const str4 = createRandomString(4);
          return (
            <ChatPopup
              key={c.id}
              chat={c}
              show={showChat}
              toggleShow={toggleShow}
              str={str4}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
