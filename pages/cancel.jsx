import Head from "next/head";
import React, { useEffect, useState, useContext } from "react";
import { Button, Card } from "react-bootstrap";
import Loading from "../components/Loading";
import MyNavbar from "../components/MyNavbar";
import cancel from "../imgs/cancel.png";
import { withRouter, useRouter } from "next/router";
import userContext from "../context/user/userContext";

function Cancel(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({ oid: "", pid: "" });
  const userCtx = useContext(userContext);
  useEffect(() => {
    setOrder({ oid: props.router.query?.oid, pid: props.router.query?.pid });
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
            <img
              className="m-auto"
              style={{ height: "160px" }}
              src={cancel.src}
            />
            <Card className="p-0 mt-4">
              <Card.Body>
                <p>
                  <b>Order Id: </b>
                  {order.oid}
                </p>
                <p>
                  <b>Payment Id: </b>
                  {order.pid}
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

export default withRouter(Cancel);
