import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from 'firebase/database';
import './App.css';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClB6TCQ2ZvVYHSdh0B6rWHArD3WQXJORY",
  authDomain: "pallet-dfcd8.firebaseapp.com",
  databaseURL: "https://pallet-dfcd8-default-rtdb.firebaseio.com",
  projectId: "pallet-dfcd8",
  storageBucket: "pallet-dfcd8.appspot.com",
  messagingSenderId: "58140037966",
  appId: "1:58140037966:web:c52730e2bd70a70e00c41f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const App = () => {
  const [pallets, setPallets] = useState({});
  const [selectedSpace, setSelectedSpace] = useState('1a');
  const [recipientName, setRecipientName] = useState('');

  useEffect(() => {
    const dbRef = ref(database, 'Pallets');
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        setPallets(snapshot.val());
      } else {
        setPallets({});
      }
    });
  }, []);

  const handleSpaceChange = (event) => {
    setSelectedSpace(event.target.value);
    setRecipientName(pallets[event.target.value] || '');
  };

  const handleRecipientChange = (event) => {
    setRecipientName(event.target.value);
  };

  const handleSubmit = () => {
    const palletRef = ref(database, `Pallets/${selectedSpace}`);
    set(palletRef, recipientName);
    setPallets({ ...pallets, [selectedSpace]: recipientName });
  };

  const handleDelete = () => {
    const palletRef = ref(database, `Pallets/${selectedSpace}`);
    remove(palletRef);
    setPallets(prev => ({ ...prev, [selectedSpace]: '' }));
    setRecipientName('');
  };

  const palletSpaces = [];
  for (let i = 1; i <= 2; i++) {
    for (let j = 'a'.charCodeAt(0); j <= 'i'.charCodeAt(0); j++) {
      palletSpaces.push(i + String.fromCharCode(j));
    }
  }

  const renderPalletGrid = () => (
    <div className="grid-container">
      {palletSpaces.map((space) => (
        <div key={space} className="space-container">
          <div className="space-number">{space.toUpperCase()}</div>
          <div className="space-name">{pallets[space]}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container">
      <h1>Pallet Management System</h1>
      {renderPalletGrid()}
      <div className="controls">
        <div>
          <label>Select Pallet Space: </label>
          <select value={selectedSpace} onChange={handleSpaceChange}>
            {palletSpaces.map((space) => (
              <option key={space} value={space}>{space.toUpperCase()}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Recipient Name: </label>
          <input type="text" value={recipientName} onChange={handleRecipientChange} />
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default App;