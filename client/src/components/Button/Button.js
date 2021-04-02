import React from "react";
import "./Button.css";

export default function Button(props) {
  return (
    <div className="search">
      <button type="submit">
        <p>{props.text}</p>
      </button>
    </div>
  );
}
