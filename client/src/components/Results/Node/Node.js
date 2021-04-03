import React, { useState, useEffect } from "react";
import Loading from "../../Loading/Loading";
import "./Node.css";

export default function Node(props) {
  let splitName = props.name.split(" ");
  console.log(splitName);

  let splitTeam = props.name.split("-");

  return (
    <>
      {props.type === "Player" ? (
        <div className="player-container">
          <div className="player-node">
            <div className="player-img">
              <img
                src={
                  "https://www.basketball-reference.com/req/202103225/images/players/" +
                  splitName[1].substring(0, 5) +
                  splitName[0].substring(0, 2) +
                  "01" +
                  ".jpg"
                }
                style={{
                  backgroundImage: `url(${
                    "https://www.basketball-reference.com/req/202103225/images/players/" +
                    splitName[1].substring(0, 5) +
                    splitName[0].substring(0, 2) +
                    "02" +
                    ".jpg"
                  })`,
                }}
              />
            </div>
            <div className="player-txt">{props.name.toUpperCase()}</div>
          </div>
        </div>
      ) : (
        <div className="team-container">
          <div className="team-node">
            <div className="team-img">
              <img
                src={
                  "https://d2p3bygnnzw9w3.cloudfront.net/req/202103121/tlogo/bbr/" +
                  splitTeam[0] +
                  ".png"
                }
                alt={"img"}
              />
            </div>
            <div className="team-txt">{props.name.toUpperCase()}</div>
          </div>
        </div>
      )}
    </>
  );
}
