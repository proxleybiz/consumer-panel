import React, { useState } from "react";
import { Accordion, Button, Card, Container, Row } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import setAuthToken from "../utils/setAccessToken";
import axios from "axios";
import { toast } from "react-toastify";
import loadScript from "../utils/loadScript";
import userContext from "../context/user/userContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import OrderInfoModal from "./OrderInfoModal";

function OrderItem({ order }) {
  const [loading, setLoading] = useState(false);
  const userCtx = useContext(userContext);
  const navigate = useRouter();
  const id = order._id;
  const date = new Date(order?.order_on).toLocaleDateString();
  const [show, setShow] = useState(false);
  let value = 0;
  const curr = Date.now();
  const pending = (order?.last_repeat - curr) / (1000 * 60 * 60 * 24) >= 30;
  switch (order.order_status) {
    case "ordered":
      {
        value = 25;
      }
      break;
    case "processing":
      {
        value = 50;
      }
      break;
    case "out_for_delivery":
      {
        value = 75;
      }
      break;
    case "delivered":
      {
        value = 100;
      }
      break;
  }
  const pay = async () => {
    try {
      setLoading(true);
      if (
        localStorage.getItem("accessToken") === null ||
        localStorage.getItem("accessToken") === undefined
      ) {
        toast.error("Invalid Token");
        return;
      } else {
        setAuthToken(localStorage.getItem("accessToken"));
      }
      const res = await axios.post(
        "/api/repeatOrder",
        {
          id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (!res.data.status) {
        return toast.error(res.data.msg);
      }
      const order = res.data.data.order;
      const ord_object = res.data.data.ord_object;

      await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      const options = {
        key: "rzp_test_PJfxwmlLINbRMG",
        amount: ord_object.totalAmount.toString(),
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
      toast.error(err.toString());
    }
  };
  return (
    <Card
      className="w-100 border-right-0 border-left-0 rounded bg-transparent mt-4"
      style={{
        borderTop: "3px solid #2160fd",
        borderBottom: "3px solid #2160fd",
        paddingLeft: "1.5px",
        paddingRight: "1.5px",
      }}
    >
      <Card.Body className="bg-white rounded">
        <Card.Title
          className="fs-3"
          style={{ fontFamily: "bold", color: "#2160fd" }}
        >
          Order Reciept
        </Card.Title>
        <Row className="w-100 align-items-start justify-content-between">
          <span style={{ width: "fit-content" }}>
            <p
              className="m-0 text-muted fs-6"
              style={{ fontFamily: "regular" }}
            >
              Date
            </p>
            <p className="m-0 fs-6" style={{ fontFamily: "regular" }}>
              {date}
            </p>
          </span>
          <span style={{ width: "fit-content" }}>
            <p
              className="m-0 text-muted fs-6"
              style={{ fontFamily: "regular" }}
            >
              Order ID
            </p>
            <p className="m-0 fs-6" style={{ fontFamily: "regular" }}>
              {order._id}
            </p>
          </span>
        </Row>
        <Accordion style={{ fontFamily: "regular" }} className="mt-2">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Order Details</Accordion.Header>
            <Accordion.Body>
              <div
                className="w-100 py-4 px-3"
                style={{
                  background: "rgb(211, 211, 211, 0.4)",
                  fontFamily: "regular",
                }}
              >
                <span className="w-100 d-flex justify-content-between">
                  <p> Product Name </p>
                  <p> {order?.product?.filters.catOne} </p>
                </span>
                <span className="w-100 d-flex justify-content-between">
                  <p> Price </p>
                  <p> &#8377; {order?.totalAmount} </p>
                </span>
                <span className="w-100 d-flex justify-content-between">
                  <p> Shipping </p>
                  <p> &#8377; 0 </p>
                </span>
                <span className="w-100 d-flex justify-content-between">
                  <p> Discount </p>
                  <p> - &#8377; {order?.totalAmount - order?.subTotal} </p>
                </span>
                <span className="w-100 d-flex justify-content-between">
                  <p className="fs-5"> Grand Total </p>
                  <p
                    className="fs-5"
                    style={{ fontFamily: "bold", color: "#2160fd" }}
                  >
                    &#8377; {order?.subTotal}
                  </p>
                </span>
              </div>

              <Container
                fluid
                className="mt-4 d-flex justify-content-between"
                style={{ gap: "1rem" }}
              >
                <span>
                  <Card.Title
                    className="fs-3 mt-4"
                    style={{ fontFamily: "bold", color: "#2160fd" }}
                  >
                    Tracking Details
                  </Card.Title>
                  <span style={{ fontFamily: "regular" }}>
                    <p>
                      Order Status: <b>{order?.order_status}</b>
                    </p>
                  </span>
                </span>
                <CircularProgressbar
                  value={value}
                  strokeWidth={50}
                  styles={buildStyles({
                    strokeLinecap: "butt",
                  })}
                  className="w-25 bg-white"
                />
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Button
          variant="warning"
          className="m-2 text-white"
          onClick={(e) => {
            e.preventDefault();
            pay();
          }}
        >
          {loading ? (
            <div class="spinner-border" role="status">
              <span class="sr-only"></span>
            </div>
          ) : (
            "Repeat Order"
          )}
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            setShow(true);
          }}
        >
          {" "}
          View Order{" "}
        </Button>
        {pending && (
          <p className="text-danger"> This Month Order Pending !! </p>
        )}
      </Card.Body>
      <OrderInfoModal
        show={show}
        handleClose={() => {
          setShow(false);
        }}
        order={order}
      />
    </Card>
  );
}

export default OrderItem;
