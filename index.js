const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const port = 30;
const app = express();
app.use(bodyParser.json());

//connecting to mysql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "dbname",
});

connection.connect((err) => {
  if (err) {
    console.log("Error while connecting to mysql");
    throw err;
  }
  console.log("Connected to mysql");
});

module.exports = connection;

//importing controller
const controller = require("./controller/api");
app.use("/api", controller);

app.listen(port, () => {
  console.log(`Listening on the port ${port}`);
});
