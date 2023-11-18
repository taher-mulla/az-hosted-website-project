import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);
  const [dbData, setDbData] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);

  const formatDateString = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    axios.get("https://api.ipify.org?format=json").then((response) => {
      setIpAddress(response.data.ip);
    });

    // Fetch data from the server when the component mounts
    fetchDbData();
  }, []);

  const generateRandomNumber = async () => {
    const newRandomNumber = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(newRandomNumber);
    setButtonPressed(true);

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
  
  // Function to fetch data from the server
  const fetchDbData = async () => {
    try {
      const response = await axios.get("http://20.228.138.216:5000/getData");
      setDbData(response.data);
      console.log("Data fetched from the server:", response.data);
    } catch (error) {
      console.error("Error fetching data from the server:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="greeting-container">
        <p className="greeting">
           Hi, my name is Taher. Welcome to Level 1 of my Web-App!
        </p>
        <p className="sub-greeting">
          You are exploring <strong>The Monolithic System</strong>.
        </p>
        <button className="random-button" onClick={generateRandomNumber}>
          Become a Click Commander!
        </button>
      </div>

      {randomNumber && <p className="random-number">{ipAddress}</p>}
      
      <div className="outer-box">
        <div className="db-data">
          {buttonPressed && <h2>Click Commanders</h2>}
          {buttonPressed && dbData && (
          <div className="visitor-count">
            <p>Total : {dbData.length}</p>
          </div>
          )}
          {buttonPressed && dbData && (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>IP</th>
                  </tr>
                </thead>
                <tbody>
                  {dbData.map((entry, index) => (
                    <tr key={index}>
                      <td>{formatDateString(entry.time)}</td>
                      <td>{entry.ip_address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
