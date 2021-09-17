import React, { useState } from "react";
import "./Home.css";
import axios from "axios";
import Button from "../Button/Button";
import Options from "./Options/Names";
import Select, { createFilter } from "react-select";
import { FixedSizeList as List } from "react-window";

//account for apostrophes and dashes
//acc. for charlotte hornets

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
      setValidInput(false);
      setMessage(
        "Warning: Connections can not be made between the same player!"
      );
    } else {
      setValidInput(true);
      let params = new URLSearchParams();
      params.append("player1", player1.value);
      params.append("player2", player2.value);

      axios({
        method: "POST",
        // url: "http://localhost:3001/" + "getConnections",
        url: "http://127.0.0.1:5000/" + "getConnections", 
        params: params,
        headers: {
          "Access-Control-Allow-Origin":
            // "http://localhost:3001/" + "getConnections",
            "http://127.0.0.1:5000/" + "getConnections",
          "Access-Control-Allow-Headers": "*",
        },
      })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          props.history.push("/results", { nodes: res.data });
        })
        .catch((err) => {
          console.log(err);
          setMessage("Hmm, something went wrong, please try again.")
          setValidInput(false);
          // props.history.push("/results", { nodes: "what"} );
        });
    }
  }

  const height = 35;

  function MenuList(props) {
    const { options, children, maxHeight, getValue } = props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;
    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
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
            <div className="input">
              <Select
                components={{ MenuList }}
                value={player1}
                onChange={(selected) => setPlayer1(selected)}
                options={Options}
                filterOption={createFilter({ ignoreAccents: false })}
                placeholder="ex. Lebron James"
              />
            </div>
            <div className="spacer"></div>
            <div className="input">
              <Select
                components={{ MenuList }}
                value={player2}
                onChange={(selected) => setPlayer2(selected)}
                options={Options}
                filterOption={createFilter({ ignoreAccents: false })}
                placeholder="ex. James Harden"
              />
            </div>
          </div>
          {validInput ? "" : <div className="invalid">{message}</div>}
          <Button text="Search" />
        </form>
      </div>
    </div>
  );
}
