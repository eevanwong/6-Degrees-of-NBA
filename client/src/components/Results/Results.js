import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import Button from "../Button/Button";
import axios from "axios";
import "./Results.css";

export default function Results() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3001/getConnections",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3001/getConnections",
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

  return (
    <div className="results-container">
      {nodes.length === 0 || nodes === null || nodes === undefined ? (
        <Loading />
      ) : (
        <div className="margin">
          <div className="home-text">
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
                type={node.labels[0]}
                name={node.properties.name}
                index={i}
              />
            );
          })}
        </div>
      )}
      <Link to="/">
        <Button text="Discover a new connection" />
      </Link>
    </div>
  );
}
