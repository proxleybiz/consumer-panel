import React from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";

function CarouselItem() {
  return (
    <Carousel.Item style={{ height: "200px" }}>
      <Container fluid style={{ height: "200px" }}>
        <h1 className="fs-1 text-center" style={{ fontFamily: "semibold" }}>
          Complete Printing Solutions
        </h1>
        <Row className="w-100 mx-auto justify-content-center">
          <Col lg={6} sm={12} className="h-100"></Col>
          <Col lg={6} sm={12} className="h-100"></Col>
        </Row>
      </Container>
    </Carousel.Item>
  );
}

export default CarouselItem;
