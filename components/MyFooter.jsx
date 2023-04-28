import Link from "next/link";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import location from "../imgs/location.png";
import email from "../imgs/email.png";
import mobile from "../imgs/mobile.png";
import twitter from "../imgs/twitter.png";
import facebook from "../imgs/facebook.png";
import instagram from "../imgs/instagram.png";
import logodark from "../imgs/logodark.jpeg";
import axios from "axios";
import { toast } from "react-toastify";

function MyFooter() {
  const [emailadd, setEmail] = useState("");
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const addSubscription = async () => {
    if (!validateEmail(emailadd)) {
      return toast.error("Invalid Email");
    }
    const res = await axios.post(
      "/api/addSubscription",
      { email: emailadd },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (res.data.status) {
      toast.success("Subscription Added");
      setEmail("");
    } else {
      toast.error(res.data.msg);
    }
  };
  return (
    <Container className="px-4 py-2 mt-4">
      <Row className="justify-content-center align-items-start">
        <Col lg={4} md={6} sm={12} className="p-2">
          <Card className="w-100 bg-transparent">
            <Card.Body>
              <Card.Title>
                <Link
                  href="/dashboard"
                  className="fw-bold fs-1"
                  style={{ color: "#2160fd" }}
                >
                  <img src={logodark.src} style={{ height: "60px" }} />
                </Link>
              </Card.Title>
              <Card.Text
                className="d-flex flex-column mt-4"
                style={{ gap: "10px" }}
              >
                <span
                  className="d-flex flex-row align-items-center text-white fs-6"
                  style={{ gap: "5px", fontFamily: "regular" }}
                >
                  <img src={location.src} style={{ height: "20px" }} />
                  F-34/5 , Okhla Phase 2 Industrial Area , 110020
                </span>
                <span
                  className="d-flex flex-row align-items-center text-white fs-6"
                  style={{ gap: "5px", fontFamily: "regular" }}
                >
                  <img src={email.src} style={{ height: "20px" }} />
                  support@proxley.in
                </span>
                <span
                  className="d-flex flex-row align-items-center text-white fs-6"
                  style={{ gap: "5px", fontFamily: "regular" }}
                >
                  <img src={mobile.src} style={{ height: "20px" }} />
                  +91 8800102513 , 8130121639
                </span>
                <span className="mt-3" style={{ color: "yellow" }}>
                  Connect with us on
                </span>
                <span
                  className="d-flex flex-row align-items-center"
                  style={{ gap: "20px" }}
                >
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://facebook.com"
                  >
                    <img src={twitter.src} style={{ height: "30px" }} />
                  </Link>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://facebook.com"
                  >
                    <img src={instagram.src} style={{ height: "30px" }} />
                  </Link>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://facebook.com"
                  >
                    <img src={facebook.src} style={{ height: "30px" }} />
                  </Link>
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={6} sm={12} className="p-2">
          <Card className="w-100 bg-transparent">
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">Support</Card.Subtitle>
              <Card.Text
                className="d-flex flex-column mt-4"
                style={{ gap: "5px" }}
              >
                <Link
                  href="/"
                  className="text-white fs-6"
                  style={{ fontFamily: "regular", width: "fit-content" }}
                >
                  Contact Us
                </Link>
                <Link
                  href="/"
                  className="text-white fs-6"
                  style={{ fontFamily: "regular", width: "fit-content" }}
                >
                  Terms and Conditions
                </Link>
                <Link
                  href="/"
                  className="text-white fs-6"
                  style={{ fontFamily: "regular", width: "fit-content" }}
                >
                  Privacy Policy
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} md={6} sm={12} className="p-2">
          <Card className="w-100 bg-transparent">
            <Card.Body>
              <Card.Text>
                <span
                  className="d-flex flex-row align-items-center text-white fs-5"
                  style={{ gap: "10px", fontFamily: "regular" }}
                >
                  <img src={email.src} style={{ height: "20px" }} />
                  Stay up to date from Proxley
                </span>
              </Card.Text>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  value={emailadd}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email"
                />
              </Form.Group>
              <Button
                style={{ backgroundColor: "#2160fd", fontFamily: "regular" }}
                onClick={(e) => {
                  addSubscription();
                }}
              >
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MyFooter;
