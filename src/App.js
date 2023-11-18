import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);

  useEffect(() => {
    axios.get("https://api.ipify.org?format=json").then((response) => {
      setIpAddress(response.data.ip);
    });
  }, []);

  const generateRandomNumber = async () => {
    const newRandomNumber = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(newRandomNumber);

    try {
      // Send a request to the server to insert data
      await axios.post("http://20.228.138.216:5000/insertData", {
        ip: ipAddress,
        date: new Date(),
      });

      console.log("Data inserted on the server");
    } catch (error) {
      console.error("Error inserting data on the server:", error);
    }
  };

  return (
    <div className="app-container">
      <p className="greeting">Hi, my name is Taher</p>
      <button className="random-button" onClick={generateRandomNumber}>
        What is my ip?
      </button>
      {randomNumber && <p className="random-number">{ipAddress}</p>}
    </div>
  );
}

export default App;
