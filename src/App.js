// src/App.js
import React, { useState } from "react";
import "./App.css"; // Import a separate CSS file for styling

function App() {
  const [randomNumber, setRandomNumber] = useState(null);

  const generateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(newRandomNumber);
  };

  return (
    <div className="app-container">
      <p className="greeting">Hi, my name is Taher</p>
      <button className="random-button" onClick={generateRandomNumber}>
        Generate Random Number
      </button>
      {randomNumber && (
        <p className="random-number">Random Number: {randomNumber}</p>
      )}
    </div>
  );
}

export default App;
