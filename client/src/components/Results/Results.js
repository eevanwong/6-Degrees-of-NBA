import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Results.css";

export default function Results() {
  const [path, setPath] = useState({});

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
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //console.log(getReq);
  //console.log(path);

  return (
    <>
      <div className="wtf"></div>
    </>
  );
}
