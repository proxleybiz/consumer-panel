import React from "react";
import { Card } from "react-bootstrap";
import loading from "../imgs/loading.gif";

function Loading() {
  return (
    <Card.Body
      className="p-3 rounded m-auto mt-4"
      style={{ background: "rgba(255, 255, 255, 0.2)", width: "fit-content" }}
    >
      <img src={loading.src} style={{ height: "80px" }} />
    </Card.Body>
  );
}

export default Loading;
