import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Home.css";
import axios from "axios";

export default function Home(props) {
  const [validInput, setValidInput] = useState(true);

  const [player1, setPlayer1] = useState("");

  const [player2, setPlayer2] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (player1 == "" || player2 == "") setValidInput(false);
    else {
      setValidInput(true);

      const data = {
        p1: player1,
        p2: player2,
      };

      let params = new URLSearchParams();
      params.append("player1", player1);
      params.append("player2", player2);

      axios({
        method: "post",
        url: "http://localhost:3001/getConnections",
        params: params,
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3001/getConnections",
          "Access-Control-Allow-Headers": "*",
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      props.history.push("/results");
    }
  }
  return (
    <div className="bgcontainer">
      <div className="home-container">
        <div className="margin">
          <div className="home-text">
            Discover how your <span>favourite NBA players</span> are connected
            within <span>6 degrees</span>
          </div>
          <form
            action="/getConnection"
            method="POST"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
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
            {validInput ? (
              ""
            ) : (
              <div className="invalid">
                Warning: Make sure to have both name boxes filled in!
              </div>
            )}
            <div className="search">
              <button type="submit">
                <p>Search</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
