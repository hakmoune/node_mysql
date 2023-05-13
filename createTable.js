const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs"
});

connection.connect(error => {
  if (error) {
    throw error;
  }

  console.log("Connected to the database!");

  const sql = `
    CREATE TABLE IF NOT EXISTS Cities (
      id INT PRIMARY KEY,
      name VARCHAR(255),
      country VARCHAR(255)
    )
  `;

  connection.query(sql, (error, result) => {
    if (error) {
      throw error;
    }

    console.log("Table created successfully!");

    connection.end(error => {
      if (error) {
        throw error;
      }

      console.log("Connection closed.");
    });
  });
});
