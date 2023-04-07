import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function UpdatePasswordModal({
  show,
  handleClose,
  password,
  setPassword,
  update,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-info">
          {" "}
          Passwords must be atleast minimum 6 charachters long.{" "}
        </p>
        <Form.Control
          value={password.newPassword}
          type="password"
          placeholder="New Password"
          name="newPassword"
          onChange={(e) => {
            setPassword(e);
          }}
        />
        <Form.Group className="mt-3">
          <Form.Control
            type="password"
            value={password.confirmPassword}
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => {
              setPassword(e);
            }}
          />
          <Form.Text className="text-danger">Passwords do not match!</Form.Text>
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control
            type="password"
            value={password.oldPassword}
            placeholder="Old Password"
            name="oldPassword"
            onChange={(e) => {
              setPassword(e);
            }}
          />
          <Form.Text>
            Leave this field empty if updating for the first time
          </Form.Text>
        </Form.Group>
        <Button
          className="mt-3"
          variant="success"
          style={{ fontFamily: "regular" }}
          disabled={
            password.confirmPassword !== password.newPassword ||
            password.newPassword.length < 6
          }
          onClick={update}
        >
          Update
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default UpdatePasswordModal;
