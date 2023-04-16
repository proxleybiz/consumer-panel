import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import OrderItem from "./OrderItem";
import filterimg from "../imgs/filter.png";
import userContext from "../context/user/userContext";
import { PACKAGING, PRINTING } from "../utils/constants";

function Orders() {
  const userCtx = useContext(userContext);
  const [filter, setFilter] = useState({
    sort: "",
    filter: "",
    ord_status: "",
  });
  useEffect(() => {
    userCtx.getOrders();
  }, []);

  const filteredData = (data, filter) => {
    let temp = data;
    if (filter.sort !== "") {
      if (filter.sort === "of") {
        temp.sort((a, b) => {
          return a.order_on - b.order_on;
        });
      } else if (filter.sort === "nf") {
        temp.sort((a, b) => {
          return b.order_on - a.order_on;
        });
      }
    }
    if (filter.filter !== "") {
      temp = temp.filter((i) => i?.product?.filters?.catOne === filter.filter);
    }
    if (filter.ord_status !== "") {
      temp = temp.filter((i) => i?.order_status === filter.ord_status);
    }
    return temp;
  };
  return (
    <Container className="container-lg">
      <Row>
        <Col sm={12} md={4} className="p-2">
          <Form.Label className="text-white"> Sort by </Form.Label>
          <Form.Select
            onChange={(e) => {
              setFilter({ ...filter, sort: e.target.value });
            }}
          >
            <option value="">None</option>
            <option value="of">Oldest First</option>
            <option value="nf">Newest First</option>
          </Form.Select>
        </Col>
        <Col sm={12} md={4} className="p-2">
          <Form.Label className="text-white"> Product Category </Form.Label>
          <Form.Select
            onChange={(e) => {
              setFilter({ ...filter, filter: e.target.value });
            }}
          >
            <option value="">None</option>
            <option value={PRINTING}>Printing</option>
            <option value={PACKAGING}>Packaging</option>
          </Form.Select>
        </Col>
        <Col sm={12} md={4} className="p-2">
          <Form.Label className="text-white"> Order Status </Form.Label>
          <Form.Select
            onChange={(e) => {
              setFilter({ ...filter, ord_status: e.target.value });
            }}
          >
            <option value="">None</option>
            <option value="ordered">Ordered</option>
            <option value="processing">Processing</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {filteredData(userCtx.orders, filter).map((order, key) => {
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
