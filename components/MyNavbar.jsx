import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import right from "../imgs/right.png";
import ProxleyLogo from "../imgs/proxleyLogo.png";
import ProxleyLogoTest from "../imgs/logodark.jpeg";

import { useRouter } from "next/router";

function MyNavbar({ mode = 0 }) {
  // 2:navbar on login screen
  // 1:navbar on dashboard
  // 0:navbar on home screen
  const router = useRouter();
  return (
    <Navbar bg="black" sticky="top">
      <Container fluid className="justify-content-center">
        <Navbar.Brand
          href="https://www.proxley.in/"
          className="fw-bold fs-1"
          style={{ color: "#2160fd" }}
        >
          <img src={ProxleyLogoTest.src} alt="company-logo" height={60} />
        </Navbar.Brand>
        <Nav className="me-auto"></Nav>

        {mode === 0 && (
          <Nav.Link
            className="btn py-2 px-4 br-2 fs-6 d-flex flex-row justify-content-center btn-hover"
            style={{ fontFamily: "regular" }}
            href="/dashboard"
          >
            Get Started <img src={right.src} />
          </Nav.Link>
        )}
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
