import React, { useState } from "react";
import { Button, Card, Form, Modal, ModalBody } from "react-bootstrap";

function NewAddressModal({ show, handleClose, add }) {
  const [newAddress, setNewAddress] = useState({
    addressTitle: "",
    lineOne: "",
    lineTwo: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });

  const handler = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="w-100 p-0 rounded border-0">
          <Card.Title className="fs-6"> Enter a new address </Card.Title>
          <Card.Body>
            <Form.Group>
              <Form.Label> Address Title </Form.Label>
              <Form.Control
                name="addressTitle"
                value={newAddress.addressTitle}
                onChange={handler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Address Line 1 </Form.Label>
              <Form.Control
                name="lineOne"
                value={newAddress.lineOne}
                onChange={handler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Address Line 2 </Form.Label>
              <Form.Control
                name="lineTwo"
                value={newAddress.lineTwo}
                onChange={handler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Landmark </Form.Label>
              <Form.Control
                name="landmark"
                value={newAddress.landmark}
                onChange={handler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Pincode </Form.Label>
              <Form.Control
                name="pincode"
                value={newAddress.pincode}
                onChange={handler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> City </Form.Label>
              <Form.Control
                name="city"
                value={newAddress.city}
                onChange={handler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> State </Form.Label>
              <Form.Control
                name="state"
                value={newAddress.state}
                onChange={handler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Country </Form.Label>
              <Form.Control
                name="country"
                value={newAddress.country}
                onChange={handler}
              />
            </Form.Group>
            <Button
              onClick={(e) => {
                e.preventDefault();
                add(newAddress);
              }}
            >
              Add
            </Button>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}

export default NewAddressModal;
