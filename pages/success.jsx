import Head from "next/head";
import React, { useEffect, useState, useContext } from "react";
import { Button, Card } from "react-bootstrap";
import Loading from "../components/Loading";
import MyNavbar from "../components/MyNavbar";
import success from "../imgs/success.png";
import { withRouter, useRouter } from "next/router";
import userContext from "../context/user/userContext";

function Success(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({});
  const userCtx = useContext(userContext);
  useEffect(() => {
    if (!props.router.query.id) {
      router.replace("/dashboard");
    }
    userCtx.fetchOrderDetails(
      props.router.query.id,
      (data) => {
        setOrder(data);
        setLoading(false);
      },
      (err) => {
        router.replace("/dashboard");
      }
    );
  }, []);
  return (
    <div className="min-vh-100">
      <Head>
        <title> Orders | Proxley </title>
      </Head>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-100" style={{ fontFamily: "regular" }}>
          <MyNavbar />
          <div className="d-flex flex-column align-items-center justify-content-center">
            <img className="m-auto" src={success.src} />
            <Card className="p-0 mt-0">
              <Card.Body>
                <p>
                  <b>Order Id: </b>
                  {order._id}
                </p>
                <p>
                  <b>Payment Id: </b>
                  {order.payment_details.razorpay_payment_id}
                </p>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    router.replace("/dashboard");
                  }}
                >
                  Back To Dashboard
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(Success);
