const mysql = require("mysql"); // Import Mysql To work with

// Connection Config
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejs"
});

// Connect to the Database
connection.connect(error => {
  if (error) throw error;
  console.log("Well Connected ! ");
});
