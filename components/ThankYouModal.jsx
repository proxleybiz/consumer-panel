import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import SuccessIcon from "../imgs/success.png";
import NikeIcon from "../imgs/nike.png";
import LocalIcon from "../imgs/local.png";

function RecommendationModal({ show, handleClose}) {

  return (
    <Modal show={show} onHide={handleClose} style={{position:"fixed",top:"150px"}}>
        <div style={{display:"flex",flexDirection:"column",padding:"3rem"}}>
            <div className="success-img" style={{display:"flex",justifyContent:"space-evenly"}}>
                <img src={SuccessIcon.src} style={{width:"60%"}} />
            </div>
            <div className="text" style={{display:"flex",justifyContent:"space-evenly"}}> 
                <h1>Sure! We got it!!</h1>
            </div> 
        </div>   
    </Modal>
  );
}

export default RecommendationModal;
