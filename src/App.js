import React, { useState } from 'react';
import ChatPopup from './components/ChatPopup';
import logo from './dogOnly.png';
import { createRandomString } from './functions/CreateRandomString';
import './App.scss';

const App = () => {
  const [showChat, setShowChat] = useState(true);
  const toggleShow = () => setShowChat(!setShowChat);

  const str4 = createRandomString(4);
  console.log(str4);

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="App-title">Delightful Dog Admin Tools</div>
      <ChatPopup
        show={showChat}
        toggleShow={toggleShow}
        email="barry.rollan@gmail.com"
        name="Barry"
        str={str4}
      />
    </div>
  );
};

export default App;
