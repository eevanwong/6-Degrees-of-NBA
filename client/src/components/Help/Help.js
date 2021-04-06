import React from "react";
import "./Help.css";

export default function Help() {
  return (
    <div className="help-container">
      <div className="margin">
        <div className="help-txt">
          If the 2 players you put in were valid (which most likely were), and
          you somehow found the error message. Congrats! You probably found a
          connection that exceeded 6 connections!
          <br />
          <br />
          Ultimately, all players are connected in some way, even if they exceed
          6 degrees. Nevertheless, an actual error could have occurred regarding
          the connection to the database.
          <br />
          <br />
          If you think this was a mistake, feel free to{" "}
          <span>
            <a href="mailto:e92wong@uwaterloo.ca">contact me</a>
          </span>
          !
        </div>
      </div>
    </div>
  );
}
