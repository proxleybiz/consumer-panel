import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import OrderItem from "./OrderItem";
import filterimg from "../imgs/filter.png";
import userContext from "../context/user/userContext";

function Orders() {
  const userCtx = useContext(userContext);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    userCtx.getOrders();
  }, []);
  return (
    <Container className="container-lg">
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">
          <img src={filterimg.src} style={{ height: "20px" }} />
        </InputGroup.Text>
        <Form.Control
          placeholder="Filter by Date/Product Name/Order ID"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </InputGroup>
      <Row className="justify-content-center">
        {userCtx.orders.map((order, key) => {
          return (
            <Col sm={12} md={8} key={key}>
              <OrderItem order={order} />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Orders;
