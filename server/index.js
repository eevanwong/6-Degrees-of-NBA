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

app.get("/getConnections", async (req, res) => {
  console.log("Querying neo4j database");
  const results = await session.run(
    "match (m:Player {name: $Player1 }), (n:Player {name: $Player2 }), p=shortestPath((m)-[*..6]-(n)) return p",
    { Player1: player1, Player2: player2 }
  );
  player1 = "";
  player2 = "";

  const record = results.records[0];

  if (record === undefined) {
    res.json({ response: "Connections not found" });
  } else {
    const node = record.get(0);
    console.log("results are:");

    for (let i = 0; i < node.segments.length; i++) {
      console.log(node.segments[i].start);
    }
    console.log(node.segments[node.segments.length - 1].end);

    //this will get all of the nodes

    res.json({ response: results });
  }
});

app.post("/getConnections", (req, res) => {
  player1 = req.query.player1.toLowerCase();
  player2 = req.query.player2.toLowerCase();
  console.log("Request to find connection between:");
  console.log(player1 + " & " + player2);
  res.json({ response: "Successfully initialized values" });
});
