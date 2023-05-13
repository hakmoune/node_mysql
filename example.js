const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// MySQL configuration
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs"
});

// Connect to MySQL
connection.connect(error => {
  if (error) {
    console.error("Error connecting to MySQL:", error);
  } else {
    console.log("Connected to MySQL!");
  }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get("/cities", (req, res) => {
  const sql = "SELECT * FROM cities";

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.post("/cities", (req, res) => {
  const { name, country } = req.body;
  const sql = "INSERT INTO cities (name, country) VALUES (?, ?)";
  const values = [name, country];

  connection.query(sql, values, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const newCityId = result.insertId;
      res.status(201).json({ id: newCityId, name, country });
    }
  });
});

app.put("/cities/:id", (req, res) => {
  const cityId = req.params.id;
  const { name, country } = req.body;
  const sql = "UPDATE cities SET name = ?, country = ? WHERE id = ?";
  const values = [name, country, cityId];

  connection.query(sql, values, (error, result) => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ id: cityId, name, country });
    }
  });
});

app.delete("/cities/:id", (req, res) => {
  const cityId = req.params.id;
  const sql = "DELETE FROM cities WHERE id = ?";

  connection.query(sql, cityId, error => {
    if (error) {
      console.error("Error executing MySQL query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(204).send();
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
