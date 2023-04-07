import React, { useState } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import CarouselItem from "./CarouselItem";

function Clients() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Container className="mx-auto w-75">
      <Col className="d-flex flex-column align-items-center justify-content-center">
        <h1
          className="text-light text-center"
          style={{
            fontFamily: "semibold",
            width: "fit-content",
            fontSize: "3rem",
          }}
        >
          Explore our products
        </h1>
        <h1
          className="fs-3 text-muted text-center"
          style={{ fontFamily: "regular", width: "fit-content" }}
        >
          We are the leaders in box manufacturing and all sorts of offset and
          digital printing in India.
        </h1>
      </Col>
      <Container
        fluid
        className="p-2 mt-2 rounded rounded-lg"
        style={{ background: "rgba(255,255,255,0.2)" }}
      >
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          wrap={true}
          indicators={false}
        >
          <Carousel.Item>
            <Container fluid>
              <h1
                className="fs-1 text-center text-light"
                style={{ fontFamily: "semibold" }}
              >
                Complete Printing Solutions
              </h1>
              <h1 className="fs-3 text-muted text-center"> Offset Printing </h1>
              <Row className="w-100 mx-auto justify-content-center">
                <Col lg={6} sm={12} className="h-100"></Col>
                <Col lg={6} sm={12} className="h-100"></Col>
              </Row>
            </Container>
          </Carousel.Item>
        </Carousel>
      </Container>
    </Container>
  );
}

export default Clients;
