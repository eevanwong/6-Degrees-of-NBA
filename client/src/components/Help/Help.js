import React from "react";
import "./Help.css";

export default function Help() {
  return (
    <div className="help-container">
      <div className="margin">
        <div className="help-tit">
          Seems the search didn't work out. What might have happened?
        </div>
        <div className="help-txt">
          Many different things could have caused a player search to result in
          an error:
          <ul>
            <li>Player name was mispelled</li>
            <li>
              Player's overall career ended before 1983 (player is not found)
            </li>
          </ul>
          If you think this was a mistake, feel free to contact me or make an
          issue on the github repo!
        </div>
      </div>
    </div>
  );
}
