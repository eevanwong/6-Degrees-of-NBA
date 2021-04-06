import React from "react";
import defaultDiacriticsRemovalMap from "./DiacriticsMap";
import Directory from "./Directory";
import "./Node.css";

export default function Node(props) {
  //deal with all accents

  let changes;

  function removeDiacritics(str) {
    //remove trickly symbols
    if (!changes) {
      changes = defaultDiacriticsRemovalMap;
    }
    for (let i = 0; i < changes.length; i++) {
      str = str.replace(changes[i].letters, changes[i].base);
    }
    return str;
  }
  let name = props.name;
  let team = "";
  let player = "";

  if (props.type === "Team") {
    //team = removeDiacritics(name);
    team = name.split("-");
    console.log(team);
  } else {
    player = removeDiacritics(name);
    player = player.split(" ");
    console.log(player);
  }

  switch (team[0]) {
    case "NOP":
      team[0] = "NOH";
      break;
    case "CHO":
      team[0] = "CHO-2020";
      break;
    case "BRK":
      team[0] = "NJN";
      break;
  }

  let teamName = Directory[team[0]];

  return (
    <>
      {props.type === "Player" ? (
        <div className="player-container">
          <div className="player-node">
            <div className="player-img">
              <img
                src={
                  "https://www.basketball-reference.com/req/202103225/images/players/" +
                  player[1].substring(0, 5) +
                  player[0].substring(0, 2) +
                  "01" +
                  ".jpg"
                }
                style={{
                  backgroundImage: `url(${
                    "https://www.basketball-reference.com/req/202103225/images/players/" +
                    player[1].substring(0, 5) +
                    player[0].substring(0, 2) +
                    "02" +
                    ".jpg"
                  })`,
                }}
                alt=""
              />
            </div>
            <div className="player-txt">
              {player[0].substring(0, 1).toUpperCase() +
                player[0].substring(1, player[0].length) +
                " " +
                player[1].substring(0, 1).toUpperCase() +
                player[1].substring(1, player[1].length)}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="text">who played on</div>
          <div className="team-container">
            <div className="team-node">
              <div className="team-img">
                <img
                  src={
                    "https://d2p3bygnnzw9w3.cloudfront.net/req/202103121/tlogo/bbr/" +
                    team[0] +
                    ".png"
                  }
                  alt={"img"}
                />
              </div>
              <div className="team-txt">
                {teamName} <br />
                <br />
                {team[1]}
              </div>
            </div>
          </div>
          <div className="text">with</div>
        </>
      )}
    </>
  );
}
