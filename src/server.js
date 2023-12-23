const express = require("express");
const bodyParser = require("body-parser");
const sql = require("mssql");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 80;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Configuration for SQL Server
const config = {
  user: "sa",
  password: "Password123456!",
  server: "localhost",
  database: "level1",
  options: {
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.use(cors()); // Enable CORS

// Endpoint to handle database insertion
app.post("/insertData", async (req, res) => {
  const { ip, date } = req.body;

  try {
    // Connect to the database
    await sql.connect(config);

    // Execute the SQL query to insert data
    const result = await sql.query`
      INSERT INTO visitors (time, ip_address)
      VALUES (${date}, ${ip});
    `;

    console.log("Data inserted successfully:", result);

    res.status(200).send("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    // Close the SQL connection
    sql.close();
  }
});


app.get("/getServerNumber", async (req, res) => {
  res.status(200).send("1");
});

// Endpoint to retrieve data from the database
app.get("/getData", async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Execute the SQL query to retrieve data
    const result = await sql.query`
      SELECT time, ip_address
      FROM visitors
      ORDER BY time DESC;
    `;

    console.log("Data retrieved successfully:", result);

    // Send the retrieved data in the response
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    // Close the SQL connection
    sql.close();
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
