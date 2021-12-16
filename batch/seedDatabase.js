const neo4j = require("neo4j-driver");
const fs = require("fs");

const USER = 'neo4j';
const PASS = 'starwarsclonewars'; // some random pass idk

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic(USER, PASS));

const session = driver.session();

async function batchtoDatabase(PLAYERS, TEAMS, count) {
  for (let i = 0; i < TEAMS.length; i++) {
    let players = PLAYERS[TEAMS[i]];
    await session.run("CREATE (n:Team {name: $name})", { name: TEAMS[i] });
    for (let j = 0; j < players.length; j++) {
      //i guess i have to the team each time for a player
      await session.run(
        "match (m:Team {name: $Team}) MERGE (n:Player {name: $name}) CREATE (n)-[:PLAYED_ON]->(m)",
        { name: PLAYERS[TEAMS[i]][j].toLowerCase(), Team: TEAMS[i] }
      ); //Create if a node with name='3' does not exist else match it
      //.run("") //faster way I could do this would be some for loop inside the string? So that more queries would be added?
      count += 1;
    }
  }
  console.log("Completed");
  await session.close();
}

function main() {
  console.log("Getting json data");
  const DATA = fs.readFileSync("./data/data1.json");
  console.log("Successfully read json file");
  const PLAYERS = JSON.parse(DATA);

  //going through each object key using Objects.key()
  const TEAMS = Object.keys(PLAYERS);

  let count = 0;
  //double for loop to go through all of the teams and each of the players?

  console.log("Batching to database");
  batchtoDatabase(PLAYERS,TEAMS, count);
}

//access each team name, and access players that year

main(); //estimated time of completion, 1-2 minutes
