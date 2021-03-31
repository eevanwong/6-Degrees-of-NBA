const express = require("express");
const bodyParser = require("body-parser");
const neo4j = require("neo4j-driver");

const PORT = process.env.PORT || 3001;
const USER = process.env.USER;
const PASS = process.env.PASS;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const driver = neo4j.driver(process.env.URI, neo4j.auth.basic(USER, PASS));

const session = driver.session();

app.listen(PORT, () => {
  console.log("listening");
});

app.get("/", (req, res) => {
  res.json({ message: "welcome" });
});

app.get("/getPlayers", (req, res) => {
  res.json({ message: "Yooooo" });
});
