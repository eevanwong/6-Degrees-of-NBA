import React from "react";
import ReactDOM from "react-dom";
import "./Home.css";

export default function Home() {
  return (
    <>
      <div className="bgcontainer">
        <div className="home-container">
          <div className="margin">
            <div className="home-text">
              Discover how your <span>favourite NBA players</span> are connected
              within <span>6 degrees</span>
            </div>
            <form>
              <div className="inputs">
                <input
                  type="text"
                  placeholder="ex. LeBron James"
                  name="Player1"
                />
                <input
                  type="text"
                  placeholder="ex. James Harden"
                  name="Player2"
                />
              </div>
              <div className="search">
                <button>
                  <p>Search</p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
