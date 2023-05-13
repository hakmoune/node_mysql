const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs"
});

connection.connect(error => {
  // Connect to the database
  if (error) {
    throw error;
  }
  console.log("Connected to the database!");

  // Execute the SQL Query
  const sql = `INSERT INTO cities (name, country) VALUES 
    ("New York", "USA"),
    ("London", "UK"),
    ("Paris", "France");
  `;

  connection.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    console.log(result.affectedRows + " Data is inserted successfully!");

    // Close the Connection to the Database
    connection.end(error => {
      if (error) {
        throw error;
      }
      console.log("Connection closed.");
    });
  });
});
