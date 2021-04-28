import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import Button from "../Button/Button";
import axios from "axios";
import "./Results.css";
require("dotenv").config();

export default function Results() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      // url: "http://localhost:3001/" + "getConnections",
      url: "http://127.0.0.1:5000/" + "getConnections",
      headers: {
        "Access-Control-Allow-Origin":
          // "http://localhost:3001/" + "getConnections",
          "http://127.0.0.1:5000/" + "getConnections",
        "Access-Control-Allow-Headers": "*",
      },
    })
      .then((resp) => {
        setNodes(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //console.log(getReq);
  //console.log(path);
  console.log(nodes);

  if (nodes === null || nodes === undefined || nodes.length === 0) {
    return (
      <div className="results-container">
        <div className="margin">
          <Loading />
        </div>
      </div>
    );
  } else if (nodes === "NMF" || nodes.length === 0) {
    return (
      <div className="results-container">
        <div className="margin">
          <div className="results-text">
            Oop. Something went wrong.
            <br />
            <span>
              {" "}
              <Link to="/help">What happened?</Link>
            </span>
          </div>
          <Link to="/">
            <Button text="Discover a new connection" />
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="results-container">
          {nodes.length === 0 || nodes === null || nodes === undefined ? (
            <Loading />
          ) : (
            <div className="margin">
              <div className="results-text">
                How is <span>{nodes[0].properties.name.toUpperCase()}</span> and
                <span>
                  {"  " + nodes[nodes.length - 1].properties.name.toUpperCase()}
                </span>
                {"  "}
                connected?
              </div>
              {nodes.map((node, i) => {
                return (
                  <Node
                    type={node.labels} //with javascript backend, labels[0]
                    name={node.properties.name}
                    key={i}
                  />
                );
              })}
            </div>
          )}
        </div>
        <Link to="/">
          <Button text="Discover a new connection" />
        </Link>
      </>
    );
  }
}
