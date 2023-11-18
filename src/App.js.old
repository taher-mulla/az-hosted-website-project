// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import a separate CSS file for styling

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);

  useEffect(() => {
    // Fetch IPv4 address when the component mounts
    axios.get("https://api.ipify.org?format=json").then((response) => {
      setIpAddress(response.data.ip);
    });
  }, []);

  const generateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(newRandomNumber);
  };
  return (
    <div className="app-container">
      <p className="greeting">Hi, my name is Taher</p>
      {/* <p className="ip-address">Your IP address is: {ipAddress}</p> */}
      <button className="random-button" onClick={generateRandomNumber}>
        What is my ip?
      </button>
      {randomNumber && <p className="random-number">{ipAddress}</p>}
    </div>
  );
}

export default App;
