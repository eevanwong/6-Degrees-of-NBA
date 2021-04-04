const express = require("express");
const bodyParser = require("body-parser");
const neo4j = require("neo4j-driver");
require("dotenv").config();

const PORT = parseInt(process.env.PORT) || 3001;
const USER = process.env.USER;
const PASS = process.env.PASS;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

const driver = neo4j.driver(process.env.URI, neo4j.auth.basic(USER, PASS), {
  maxConnectionPoolSize: 10,
  connectionAcquisitionTimeout: 30000,
  maxTransactionRetryTime: 10000,
});

const session = driver.session();

let players = {};

app.listen(PORT, () => {
  console.log("listening" + " " + PORT);
});

app.get("/", (req, res) => {
  res.send({ message: "welcome" });
});

app.get("/getConnections", async (req, res) => {
  //console.log("Querying neo4j database");
  let path = null; //arbitrary null value
  try {
    path = await session.run(
      "match (m:Player {name: $Player1 }), (n:Player {name: $Player2 }), p=shortestPath((m)-[*..6]-(n)) return p",
      { Player1: players.P1, Player2: players.P2 }
    );
  } catch (err) {
    res.send("NMF");
  } finally {
    players = {};

    console.log(path);
    if (path.records.length === 0) {
      res.send("NMF"); //NO MATCHES FOUND
    }

    const record = path.records[0];

    if (record === undefined) {
      res.send(null);
    } else {
      const node = record.get(0);

      const RESULTS = [];

      for (let i = 0; i < node.segments.length; i++) {
        RESULTS.push(node.segments[i].start);
      }
      RESULTS.push(node.segments[node.segments.length - 1].end);
      res.send(RESULTS);
    }
  }
});

app.post("/getConnections", (req, res) => {
  console.log(".");
  let player1 = req.query.player1.toLowerCase().trim(); //why is it the query?
  let player2 = req.query.player2.toLowerCase().trim();

  players = { P1: player1, P2: player2 };
  console.log("Request to find connection between:");
  console.log(players.P1 + " & " + players.P2);
  res.send("Success");
});
