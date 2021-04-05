import React, { useState } from "react";
import "./Home.css";
import axios from "axios";
import Button from "../Button/Button";
require("dotenv").config();

export default function Home(props) {
  const [validInput, setValidInput] = useState(true);
  const [message, setMessage] = useState("");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (player1 === "" || player2 === "") {
      setMessage("Warning: Make sure to have both name boxes filled in!");
      setValidInput(false);
    } else if (player1 === player2) {
      setMessage(
        "Warning: Connections can not be made between the same player!"
      );
    } else {
      setValidInput(true);

      let params = new URLSearchParams();
      params.append("player1", player1);
      params.append("player2", player2);

      axios({
        method: "POST",
        url: process.env.URL + "getConnections",
        params: params,
        headers: {
          "Access-Control-Allow-Origin": process.env.URL + "getConnections",
          "Access-Control-Allow-Headers": "*",
        },
      })
        .then((res) => {
          props.history.push("/results");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div className="home-container">
      <div className="margin">
        <div className="home-text">
          Discover how your <span>favourite NBA players</span> are connected
          within <span>6 degrees</span>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="inputs">
            <input
              type="text"
              placeholder="ex. LeBron James"
              name="player1"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
            />
            <input
              type="text"
              placeholder="ex. James Harden"
              name="player2"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
            />
          </div>
          {validInput ? "" : <div className="invalid">{message}</div>}
          <Button text="Search" />
        </form>
      </div>
    </div>
  );
}
