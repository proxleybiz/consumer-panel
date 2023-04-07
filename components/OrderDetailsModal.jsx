import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import userContext from "../context/user/userContext";
import loadScript from "../utils/loadScript";
import uploadImage from "../utils/uploadImage";
import { useRouter } from "next/router";
import { CUSTOMIZATION, FILTER_ONE, FILTER_TWO } from "../utils/constants";
import setAuthToken from "../utils/setAccessToken";
import ReceiptIcon from "../imgs/tax.png";

function OrderDetailsModal({ show, handleClose, customization, filters }) {
  const [loading, setLoading] = useState(true);
  const navigate = useRouter();
  const userCtx = useContext(userContext);
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
  const [cost, setCost] = useState(0);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (
      filters.catOne === "" ||
      filters.catTwo === "" ||
      filters.catThree === ""
    ) {
      handleClose();
      return;
    }
    let cost = 0;
    const t1 = FILTER_ONE.find((i) => i.name === filters.catOne);
    cost += t1 ? t1.cost : 0;
    let t2 = FILTER_TWO.find((i) => i.category === filters.catOne);
    if (t2) {
      t2 = t2.items.find((i) => i.name === filters.catTwo);
      cost += t2 ? t2.cost : 0;
      t2 = t2.options.find((i) => i.name === filters.catThree);
      if (t2) {
        cost += t2.cost;
      }
    }

    const cust = CUSTOMIZATION.find((i) => i.category === filters.catOne);
    if (cust) {
      for (let i = 0; i < customization.length; i++) {
        let q = customization[i];
        let t = cust.options.find((i) => i.name === q.name);
        if (t) {
          cost += t.cost;
        }
      }
    }
    setCost(cost);
    setLoading(false);
  }, [filters, customization]);
  const handler = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const pay = async () => {
    try {
      if (cost * quantity <= 0) {
        alert("Amount Must be greater than 0.");
        return;
      }
      let s = true;
      Object.keys(newAddress).map((i) => {
        if (newAddress[i].trim() === "") {
          s = false;
        }
        return null;
      });
      if (!s) {
        alert("Please Enter a proper address");
        return;
      }
      setLoading(true);
      let finalCustomizations = [];
      for (let i = 0; i < customization.length; i++) {
        let item = customization[i];
        if (item.type === "FILE") {
          const res = await uploadImage(
            item.selectedValue,
            `${userCtx.user?._id}_${Date.now()}`
          );
          item.selectedValue = res;
        }
        finalCustomizations.push({
          name: item.name,
          value: item.selectedValue,
        });
      }
      if (
        localStorage.getItem("accessToken") === null ||
        localStorage.getItem("accessToken") === undefined
      ) {
        if (error) {
          error("Invalid Token");
        }
        return;
      } else {
        setAuthToken(localStorage.getItem("accessToken"));
      }
      const res = await axios.post(
        "/api/createOrder",
        {
          amount: cost * quantity,
          subTotal: cost * quantity,
          product: { filters, customization: finalCustomizations },
          address: newAddress,
          quantity: quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (!res.data.status) {
        return alert(res.data.msg);
      }
      const order = res.data.data.order;
      const ord_object = res.data.data.ord_object;
      const ord_options = {
        amount: cost * quantity * 100,
        currency: "INR",
        payment_capture: 1,
      };

      await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      const options = {
        key: "rzp_test_PJfxwmlLINbRMG",
        amount: ord_options.amount.toString(),
        currency: "INR",
        name: "Proxley",
        description: "Place Order",
        order_id: order.id,
        handler: async function (response) {
          if (!response.razorpay_payment_id) {
            setLoading(false);
            return;
          }
          userCtx.validateOrder(
            { id: ord_object._id, payment: response },
            () => {
              navigate.push(
                {
                  pathname: "/success",
                  query: { id: ord_object._id },
                },
                "/success"
              );
            },
            (err) => {
              navigate.push(
                {
                  pathname: "/cancel",
                  query: {
                    pid: response.razorpay_payment_id,
                    oid: ord_object._id,
                  },
                },
                "/cancel"
              );
            }
          );
        },
        modal: {
          ondismiss: async function () {
            if (
              localStorage.getItem("accessToken") === null ||
              localStorage.getItem("accessToken") === undefined
            ) {
              if (error) {
                error("Invalid Token");
              }
              return;
            } else {
              setAuthToken(localStorage.getItem("accessToken"));
            }
            await axios.post(
              "/api/deleteOrder",
              { id: ord_object._id },
              {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                },
              }
            );
            setLoading(false);
          },
        },
        prefill: {
          name: userCtx.user?.name,
          email: userCtx.user?.email,
          contact: userCtx.user?.phoneNumber,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      alert(err.toString());
    }
  };
  return (
    <Modal show={show} onHide={handleClose} fullscreen={false}>
      <Modal.Header closeButton style={{background:"#333",color:"yellow"}}>
        <img src={ReceiptIcon.src} style={{width:"30px",marginRight:"20px"}} />
        <Modal.Title>View your order summary</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontFamily: "regular" }}>
        <h1 className="fs-5">
          <b> Product Category: </b> {filters.catOne}
          {filters.catTwo.trim() !== "" && `/${filters.catTwo}`}
          {filters.catThree.trim() !== "" && `/${filters.catThree}`}
        </h1>
        {customization.map((item, key) => {
          if (item.type === "FILE") {
            return (
              <h1 key={key} className="fs-6">
                <b> {item.name}: </b> Uploaded
              </h1>
            );
          }
          return (
            <h1 key={key} className="fs-6">
              <b> {item.name}: </b> {item.selectedValue}
            </h1>
          );
        })}
        <p className="fs-5 mt-4">
          <b>Cost: </b>
          {40 * quantity} ₹
        </p>
        <Form.Group>
          <Form.Label className="fs-5 mt-4"> Quantity </Form.Label>
          <Form.Control
            style={{ width: "fit-content" }}
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            type="number"
          />
        </Form.Group>
        <p className="fs-5 mt-4">
          <b>Delivery Details </b>
        </p>
        <Card className="p-2 rounded">
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
          </Card.Body>
        </Card>
        <p className="fs-5 mt-4">
          <b> Or Select Delivery Address </b>
        </p>
        <Row style={{ gap: "10px" }} className="mt-4">
          {userCtx.user?.address.map((item, key) => {
            return (
              <Col key={key}>
                <Card className="w-100">
                  <Card.Header as="h5"> {item.addressTitle} </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {`${item.lineOne}, ${item.lineTwo}, ${item.landmark}, ${item.city}, ${item.state}, ${item.country}, ${item.pincode}`}
                    </Card.Text>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        setNewAddress({ ...item });
                      }}
                      variant="primary"
                    >
                      Select
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <div className="d-flex flex-row mt-4" style={{ gap: "10px" }}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              pay();
            }}
            disabled={loading}
          >
            {loading ? (
              <div class="spinner-border" role="status">
                <span class="sr-only"></span>
              </div>
            ) : (
              "Pay Now"
            )}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default OrderDetailsModal;
