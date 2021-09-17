//HUGE REFACTOR NEEDED:
//1. remove post req (we dont need that)
//2. use get req, in body of req have the names of the players instead
//3. organize backend into sections (need to research bit more on this)

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
  res.setHeader("Access-Control-Allow-Origin", "*");
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

app.post("/getConnections", async (req, res) => {
  console.log("Querying neo4j database");
  console.log(req.params);

  playerOne = req.params.player1.toLowerCase().trim();
  playerTwo = req.params.player2.toLowerCase().trim();

  // req.params = { playerOne, playerTwo };

  let path = {}; //arbitrary null value
  try {
    // console.log("?");
    path = await session.run(
      "match (m:Player {name: $Player1 }), (n:Player {name: $Player2 }), p=shortestPath((m)-[*]-(n)) return p",
      { Player1: playerOne, Player2: playerTwo }
    );
  } catch (err) {
    res.send("NMF");
  } finally {
    players = {};

    console.log(path);
    if (path.records.length === 0) {
      res.status(404).send("NMF"); //NO MATCHES FOUND
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
      res.status(200).send(RESULTS);
    }
  }
});
