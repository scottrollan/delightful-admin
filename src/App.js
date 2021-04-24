import React, { useState, useEffect } from 'react';
import ChatPopup from './components/ChatPopup';
import { helpChatsCollection } from './firestore/index';
import { newHelpChat } from './firestore/NewHelpChat';
import logo from './dogOnly.png';
import { createRandomString } from './functions/CreateRandomString';
import $ from 'jquery';
import './App.scss';

const App = () => {
  const [showChat, setShowChat] = useState(true);
  const [openChats, setOpenChats] = useState([]);
  const toggleShow = () => setShowChat(!setShowChat);
  const audioURL =
    'https://firebasestorage.googleapis.com/v0/b/delightful-dog-cloud-functions.appspot.com/o/assets%2Fjuntos-607.mp3?alt=media&token=0a779364-5731-44db-b176-dd6b925fe44f';

  useEffect(() => {
    const _ = require('lodash');
    const audio = new Audio(audioURL);
    let allOpenChats = [];
    const playAudio = () => {
      const audioEl = document.getElementsByClassName('audio-element')[0];
      audioEl.play();
    };
    helpChatsCollection
      .where('closed', '==', false)
      .onSnapshot((querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
          let docData = change.doc.data();
          let timeStamp = docData.conversation[0].timestamp;
          let messageSent = timeStamp.toDate();
          if (
            (change.type === 'added' && new Date() - messageSent < 90000) ||
            change.type === 'modified'
          ) {
            playAudio();
            newHelpChat(change.doc.data());
          }
        });
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
      <audio className="audio-element">
        <source src={audioURL}></source>
      </audio>{' '}
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
