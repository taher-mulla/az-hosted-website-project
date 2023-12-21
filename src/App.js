import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);
  const [dbData, setDbData] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [backendServerNumber, setBackendServerNumber] = useState(false);

  const formatDateString = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    axios.get("https://api.ipify.org?format=json").then((response) => {
      setIpAddress(response.data.ip);
    });
  }, []);

  const generateRandomNumber = async () => {
    const newRandomNumber = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(newRandomNumber);
    setButtonPressed(true);

    try {
      // Send a request to the server to insert data
      await axios.post("http://20.228.138.216:5000/insertData", {
        ip: ipAddress,
        date: new Date().toISOString(),
      });

      console.log("Data inserted on the server");
    } catch (error) {
      console.error("Error inserting data on the server:", error);
    }

    // Fetch data from the server when the component mounts
    await fetchDbData();
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

  const fetchServerNumber = async () => {
    try {
      const resp = await axios.get("https://<ipaddress>/getServerNumber");
      setBackendServerNumber(resp.data);
      console.log("backend server number fetched ", resp.data);
    } catch (error) {
      console.error("Error fetching data from the server:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="greeting-container">
        <p className="greeting">
          Hey there! Taher here. You're currently on Nginx Server 1.
        </p>
        <p className="sub-greeting">
          We're transitioning from a monolithic system, where everything is on a
          single VM, to a more distributed architecture.
        </p>
        <p className="sub-greetings">
          Various services will operate on multiple VMs, resembling a
          microservices setup. Reload this page to have more fun!
        </p>
        <button className="random-button" onClick={generateRandomNumber}>
          Explore Level 2!
        </button>
      </div>

      {randomNumber && <p className="random-number">{ipAddress}</p>}
      {randomNumber && (
        <p className="random-number">
          Reply was taken from server {backendServerNumber}, visitors log:
        </p>
      )}

      <div className="outer-box">
        <div className="db-data">
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
