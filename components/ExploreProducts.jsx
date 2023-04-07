import React, { useState } from "react";
import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";

function ExploreProducts() {
  const router = useRouter();
  const printingSolutions = [
    {
      img: "https://cdn.pixabay.com/photo/2018/07/26/03/11/offset-printing-3562700_960_720.jpg",
      heading: "Offset Printing",
      text: "We believe that printing is an art and only select few companies knows the intricacies involved to get highest quality offset printing which will let you convey the message to your target audience . We are masters in offset printing We print all sort of books ,diaries ,novels ,calendars , notepads etcs",
    },
    {
      img: "https://3.imimg.com/data3/JY/VV/MY-8390302/14-500x500.jpg",
      heading: "Digital Printing",
      text: "Have you always wanted that exquisite Photo Album for yourself? Do you want to leave longlasting impact on your customers by highest quality custom designed brochures and catalogues? We will help you in getting your story to your customers by providing finest quality digital print",
    },
    {
      img: "https://cdn.pixabay.com/photo/2015/08/20/17/53/book-897834_960_720.jpg",
      heading: "Complete binding and post printing solution",
      text: "Do you have a published book and want the finest quality binding at best price We provide quickest and most cost effective solutions of : Binding, Folding, Sewing, Lamination, Spot UV",
    },
    {
      img: "https://cdn.pixabay.com/photo/2016/05/28/00/06/gift-1420830_960_720.jpg",
      heading: "Customisable packaging and boxes",
      text: "At our all in one solution center we provide end to end solution in making best quality boxes for your company. We are the leading manufacturer of custom printed corrugated boxes , duplex boxes , carry bags. You name your packaging needs and we will be the quickest, most cost efficient and best solution providers",
    },
  ];
  return (
    <Container fluid>
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
      <h1
        className="fs-3 text-center text-light mt-4 mx-auto gradient-text"
        style={{
          fontFamily: "semibold",
        }}
      >
        Complete Printing Solutions
      </h1>
      <Container
        className="p-2 mt-2 rounded rounded-lg"
        style={{ background: "rgba(255,255,255,0.2)", fontFamily: "regular" }}
      >
        {printingSolutions.map((item, key) => {
          return (
            <Row className="w-100 p-3" key={key} style={{ gap: "0rem" }}>
              <Col sm={12} md={6} lg={3} className="p-0">
                <img style={{ width: "100%" }} src={item.img} />
              </Col>
              <Col sm={12} md={6} lg={9} className="pl-4">
                <p className="text-white fs-4">
                  <b> {item.heading}</b>
                </p>
                <p className="text-white"> {item.text} </p>
                <div className="d-flex" style={{ gap: "10px" }}>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/dashboard");
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push("/products");
                    }}
                  >
                    Explore All Options
                  </Button>
                </div>
              </Col>
            </Row>
          );
        })}
      </Container>
    </Container>
  );
}

export default ExploreProducts;
