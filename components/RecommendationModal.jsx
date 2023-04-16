import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import BataIcon from "../imgs/bata.png";
import NikeIcon from "../imgs/nike.png";
import LocalIcon from "../imgs/local.png";

function RecommendationModal({
  show,
  handleClose,
  handleThankyouModalOpen,
  setRecommendation,
}) {
  const handleRecommendationBtnClick = (item) => {
    setRecommendation(item);
    handleClose();
    handleThankyouModalOpen();
  };
  const data = [
    {
      quality: "Premium",
      paper: "Virgin Kraft",
      paper_weight: "300 GSM",
      paper_color: "Black",
      print_type: "Multicolor",
      shape: "Rectangle",
      coating: "Thermal Gloss",
      dimensions: "13 x 10 x 7 (inches)",
    },
    {
      quality: "Semi Premium",
      paper: "Partly Recycled Liner",
      paper_weight: "200 GSM",
      paper_color: "White",
      print_type: "Multicolor",
      shape: "Rectangle",
      coating: "Matt Half",
      dimensions: "13 x 10 x 7 (inches)",
    },
    {
      quality: "Economy",
      paper: "Fully Recycled Liner",
      paper_weight: "140 GSM",
      paper_color: "Brown",
      print_type: "Single Color",
      shape: "Rectangle",
      coating: "Silver",
      dimensions: "13 x 10 x 7 (inches)",
    },
  ];
  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={{ position: "fixed", top: "10px" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>More like this...</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontFamily: "regular" }}>
        {data.map((i, key) => {
          return (
            <Card
              key={key}
              className="w-100"
              style={{ border: "1px solid black" }}
            >
              <Card.Header
                as="h5"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  background: "#333",
                  color: "yellow",
                }}
              >
                Recommendation #{key + 1}
              </Card.Header>
              <Card.Body style={{ display: "flex" }}>
                <Card.Text>
                  <img src={NikeIcon.src} style={{ height: "80px" }} />
                </Card.Text>
                <Card.Text>
                  <div>
                    <span>Quality : </span>
                    <span>{i.quality}</span>
                  </div>
                  <div>
                    <span>Paper : </span>
                    <span>{i.paper}</span>
                  </div>
                  <div>
                    <span>Paper Weight : </span>
                    <span>{i.paper_weight}</span>
                  </div>
                  <div>
                    <span>Paper Color : </span>
                    <span>{i.paper_color}</span>
                  </div>
                  <div>
                    <span>Print type : </span>
                    <span> {i.print_type} </span>
                  </div>
                  <div>
                    <span>Shape : </span>
                    <span> {i.shape} </span>
                  </div>
                  <div>
                    <span>Coating : </span>
                    <span> {i.coating} </span>
                  </div>
                  <div>
                    <span>Dimensions : </span>
                    <span>{i.dimensions} </span>
                  </div>
                </Card.Text>
              </Card.Body>
              <Card.Footer
                style={{
                  background: "#282c2c",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRecommendationBtnClick();
                  }}
                  style={{
                    color: "white",
                    background: "crimson",
                    border: "none",
                    borderRadius: "12px",
                    padding: "10px 20px",
                  }}
                >
                  Select
                </button>
              </Card.Footer>
            </Card>
          );
        })}
      </Modal.Body>
    </Modal>
  );
}

export default RecommendationModal;
