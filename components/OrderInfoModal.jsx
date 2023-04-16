import React, { useRef } from "react";
import { Fragment } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";

function OrderInfoModal({ show, handleClose, order }) {
  const filters = order.product.filters;
  const customization = order.product.customization;
  const address = order.address;
  const temp = () => {
    return (
      <Modal.Body style={{ fontFamily: "regular" }}>
        <h1 className="fs-5">
          <b> Product Category: </b> {filters.catOne}
          {filters.catTwo.trim() !== "" && `/${filters.catTwo}`}
          {filters.catThree.trim() !== "" && `/${filters.catThree}`}
        </h1>
        {customization.map((item, key) => {
          if (item.type === "FILE") {
            return (
              <span key={key} className="d-flex" style={{ gap: "20px" }}>
                <b> {item.name}: </b>
                <div
                  style={{
                    height: "150px",
                    width: "150px",
                    backgroundImage: `url(${item.value})`,
                    backgroundSize: "contain",
                  }}
                ></div>
              </span>
            );
          } else if (item.type === "COLOR") {
            return (
              <span key={key} className="d-flex" style={{ gap: "20px" }}>
                <b> {item.name}: </b>
                <div
                  style={{
                    height: "20px",
                    width: "20px",
                    backgroundColor: item.value,
                  }}
                ></div>
                {item.value}
              </span>
            );
          }
          return (
            <h1 key={key} className="fs-6">
              <b> {item.name}: </b> {item.value}
            </h1>
          );
        })}
        <p className="fs-5 mt-4">
          <b>Amount Paid: </b>
          {order.subTotal}
        </p>
        <Form.Group>
          <Form.Label className="fs-5 mt-4"> Quantity </Form.Label>
          <Form.Control
            style={{ width: "fit-content" }}
            value={order.quantity ? order.quantity : 1}
            type="number"
            disabled={true}
          />
        </Form.Group>
        <p className="fs-5 mt-4">
          <b>Delivery Details </b>
        </p>
        <Card className="w-50 p-2 rounded">
          <Card.Body>
            <Form.Group>
              <Form.Label> Address Title </Form.Label>
              <Form.Control
                disabled={true}
                name="addressTitle"
                value={address.addressTitle}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Address Line 1 </Form.Label>
              <Form.Control
                disabled={true}
                name="lineOne"
                value={address.lineOne}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Address Line 2 </Form.Label>
              <Form.Control
                disabled={true}
                name="lineTwo"
                value={address.lineTwo}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Landmark </Form.Label>
              <Form.Control
                disabled={true}
                name="landmark"
                value={address.landmark}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Pincode </Form.Label>
              <Form.Control
                disabled={true}
                name="pincode"
                value={address.pincode}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> City </Form.Label>
              <Form.Control disabled={true} name="city" value={address.city} />
            </Form.Group>
            <Form.Group>
              <Form.Label> State </Form.Label>
              <Form.Control
                disabled={true}
                name="state"
                value={address.state}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Country </Form.Label>
              <Form.Control
                disabled={true}
                name="country"
                value={address.country}
              />
            </Form.Group>
          </Card.Body>
        </Card>
        <div className="d-flex flex-row mt-4" style={{ gap: "10px" }}></div>
      </Modal.Body>
    );
  };
  return (
    <Fragment>
      <Modal show={show} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>View your order summary</Modal.Title>
        </Modal.Header>
        <Button
          className="mx-auto mb-4"
          onClick={(e) => {
          }}
        >
          Download PDF
        </Button>
        {temp()}
      </Modal>
    </Fragment>
  );
}

export default OrderInfoModal;
