const express = require("express");
const bodyParser = require("body-parser");
const neo4j = require("neo4j-driver");
const axios = require("axios");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const USER = process.env.USER;
const PASS = process.env.PASS;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
const driver = neo4j.driver(process.env.URI, neo4j.auth.basic(USER, PASS));

const session = driver.session();

let player1 = ""; //theres gotta be a better way to do this lol
let player2 = "";

app.listen(PORT, () => {
  console.log("listening");
});

app.get("/", (req, res) => {
  res.json({ message: "welcome" });
});

app.get("/getConnections", (req, res) => {
  res.send("wat");
});

app.post("/getConnections", (req, res) => {
  console.log(req.query); //why tf is it query?
  player1 = req.query.player1;
  player2 = req.query.player2;
});
