import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/imgs/sixdeglogo1.png";

export default function Header() {
  return (
    <div className="bgcontainer">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="sixlogo" />
          </Link>
        </div>
        <div className="about">
          <h2>ABOUT</h2>
        </div>
      </div>
    </div>
  );
}
