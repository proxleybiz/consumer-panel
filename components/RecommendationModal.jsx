import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import BataIcon from "../imgs/bata.png";
import NikeIcon from "../imgs/nike.png";
import LocalIcon from "../imgs/local.png";

function RecommendationModal({ show, handleClose,handleThankyouModalOpen}) {
  const handleRecommendationBtnClick = () => {
    handleClose();
    handleThankyouModalOpen();
  }
  return (
    <Modal show={show} onHide={handleClose} style={{position:"fixed",top:"10px"}}>
      <Modal.Header closeButton>
        <Modal.Title>More like this...</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontFamily: "regular" }}>
      <Card className="w-100" style={{border:"1px solid black"}}>
        <Card.Header as="h5" style={{display:"flex",justifyContent:"flex-start",flexDirection:"column",background:"#333",color:"yellow"}}>
            Recommendation #1
        </Card.Header>
        <Card.Body style={{display:"flex"}}>
            <Card.Text>
                <img src={NikeIcon.src} style={{height:"80px"}}/>
            </Card.Text>
            <Card.Text>
                <div>
                    <span>Quality : </span>
                    <span>Premium</span>
                </div>
                <div>
                    <span>Paper : </span>
                    <span>Virgin Kraft</span>
                </div>
                <div>
                    <span>Paper Weight : </span>
                    <span>300 GSM</span>
                </div>
                <div>
                    <span>Paper Color : </span>
                    <span>Black</span>
                </div>
                <div>
                    <span>Print type : </span>
                    <span>Multicolor</span>
                </div>
                <div>
                    <span>Shape : </span>
                    <span>Rectangle</span>
                </div>
                <div>
                    <span>Coating : </span>
                    <span>Thermal Gloss</span>
                </div>
                <div>
                    <span>Dimensions : </span>
                    <span>13 x 10 x 7 (inches) </span>
                </div>

            </Card.Text>
        </Card.Body>
        <Card.Footer style={{background:"#282c2c",display:"flex",justifyContent:"center"}}>
            <button onClick={handleRecommendationBtnClick} style={{color:"white",background:"crimson",border:"none",borderRadius:"12px",padding:"10px 20px"}}>Select</button>
        </Card.Footer>
        </Card>
        <br />
        <br />
        <Card className="w-100" style={{border:"1px solid black"}}>
        <Card.Header as="h5" style={{display:"flex",justifyContent:"flex-start",flexDirection:"column",background:"#333",color:"yellow"}}>
            Recommendation #2
        </Card.Header>
        <Card.Body style={{display:"flex"}}>
            <Card.Text>
                <img src={BataIcon.src} style={{height:"80px"}}/>
            </Card.Text>
            <Card.Text>
                <div>
                    <span>Quality : </span>
                    <span>Semi Premium</span>
                </div>
                <div>
                    <span>Paper : </span>
                    <span>Partly Recycled Liner</span>
                </div>
                <div>
                    <span>Paper Weight : </span>
                    <span>200 GSM</span>
                </div>
                <div>
                    <span>Paper Color : </span>
                    <span>White</span>
                </div>
                <div>
                    <span>Print type : </span>
                    <span>Multicolor</span>
                </div>
                <div>
                    <span>Shape : </span>
                    <span>Rectangle</span>
                </div>
                <div>
                    <span>Coating : </span>
                    <span>Matt Half</span>
                </div>
                <div>
                    <span>Dimensions : </span>
                    <span>13 x 10 x 7 (inches) </span>
                </div>

            </Card.Text>
        </Card.Body>
        <Card.Footer style={{background:"#282c2c",display:"flex",justifyContent:"center"}}>
            <button onClick={handleRecommendationBtnClick} style={{color:"white",background:"crimson",border:"none",borderRadius:"12px",padding:"10px 20px"}}>Select</button>
        </Card.Footer>
        </Card>
        <br />
        <br />
        <Card className="w-100" style={{border:"1px solid black"}}>
        <Card.Header as="h5" style={{display:"flex",justifyContent:"flex-start",flexDirection:"column",background:"#333",color:"yellow"}}>
            Recommendation #3
        </Card.Header>
        <Card.Body style={{display:"flex"}}>
            <Card.Text>
                <img src={NikeIcon.src} style={{height:"80px"}}/>
            </Card.Text>
            <Card.Text>
                <div>
                    <span>Quality : </span>
                    <span>Economy</span>
                </div>
                <div>
                    <span>Paper : </span>
                    <span>Fully Recycled Liner</span>
                </div>
                <div>
                    <span>Paper Weight : </span>
                    <span>140 GSM</span>
                </div>
                <div>
                    <span>Paper Color : </span>
                    <span>Brown</span>
                </div>
                <div>
                    <span>Print type : </span>
                    <span>Single Color</span>
                </div>
                <div>
                    <span>Shape : </span>
                    <span>Rectangle</span>
                </div>
                <div>
                    <span>Coating : </span>
                    <span>Silver</span>
                </div>
                <div>
                    <span>Dimensions : </span>
                    <span>13 x 10 x 7 (inches) </span>
                </div>

            </Card.Text>
        </Card.Body>
        <Card.Footer style={{background:"#282c2c",display:"flex",justifyContent:"center"}}>
            <button onClick={handleRecommendationBtnClick} style={{color:"white",background:"crimson",border:"none",borderRadius:"12px",padding:"10px 20px"}}>Select</button>
        </Card.Footer>
        </Card>
        <br />
        <br />
      </Modal.Body>
    </Modal>
  );
}

export default RecommendationModal;
