import React from "react";
import "./About.css";

export default function About() {
  return (
    <>
      <div className="about-cont">
        <div className="margin">
          <div className="about-tit">About</div>
          <div className="about-txt">
            This project was inspired by{" "}
            <span>
              <a
                href="https://github.com/emilyslouie/six-degrees"
                target="_blank"
              >
                Emily Louie's 6 Degrees of Spotify
              </a>
            </span>{" "}
            and{" "}
            <span>
              <a
                href="http://content.fanatics.com/six-degrees-nba/"
                target="_blank"
              >
                Fanatics.com social network of NBA players
              </a>
            </span>
            . This website illustrates the 6 degrees of seperation, the idea
            that all people on average are six, or fewer, social connections
            away from each other.
            <br />
            <br />
            Six Degrees of NBA showcases that players are interconnected no
            matter what decade and team they play in, from Michael Jordan to
            Kyle Lowry to Lebron James.
            <br />
            <br />
            Data used for this site was all web scraped from{" "}
            <span>
              <a href="https://www.basketball-reference.com/" target="_blank">
                basketball-reference.com
              </a>
            </span>{" "}
            using Puppeteer as of March 2021. Site was created with React,
            Express, and Neo4j.
            <br />
            <br />
            If there's anything that seems off, feel free to{" "}
            <span>
              <a href="mailto:evan.wong@uwaterloo.ca" target="_blank">
                contact me!
              </a>
            </span>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
