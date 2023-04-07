import React, { useState, useContext } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Loading from "./Loading";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import userContext from "../context/user/userContext";
import { useRouter } from "next/router";

function MobileVerification() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [final, setFinal] = useState(null);
  const [otp, setOTP] = useState("");
  const [mode, setMode] = useState(0);
  const userCtx = useContext(userContext);
  const signIn = async (e) => {
    try {
      e.preventDefault();
      if (phone.length !== 10) {
        return alert("Invalid Phone Number");
      }
      setLoading(true);
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          { size: "invisible" },
          auth
        );
      }
      const res = await signInWithPhoneNumber(
        auth,
        "+91" + phone,
        window.recaptchaVerifier
      );
      setFinal(res);
      alert("OTP Sent");
      setMode(!mode);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await final.confirm(otp);
      userCtx.verifyNumber(
        "+91" + phone,
        () => {
          setLoading(false);
        },
        (err) => {
          alert(err);
          setLoading(false);
        }
      );
    } catch (err) {
      alert("Invalid Code");
      setLoading(false);
    }
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col
          sm={12}
          lg={4}
          className="p-2 rounded"
          style={{ background: "rgba(255,255,255,0.4)" }}
        >
          {loading ? (
            <Loading />
          ) : (
            <Card className="w-100 bg-transparent border-0">
              <Card.Title
                className="text-white text-center "
                style={{ fontFamily: "regular" }}
              >
                Verify Phone Number
              </Card.Title>
              <Card.Body className="w-100">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder={mode ? "Enter OTP" : "Enter Phone Number"}
                    value={mode ? otp : phone}
                    style={{ fontFamily: "regular" }}
                    onChange={(e) => {
                      if (mode) {
                        setOTP(e.target.value);
                      } else {
                        setPhone(e.target.value);
                      }
                    }}
                  />
                </Form.Group>
                <Button
                  onClick={mode ? verifyOtp : signIn}
                  className="w-100 my-2 text-white border-0"
                  style={{ fontFamily: "bold", background: "#2160fd" }}
                >
                  {mode ? "Verify OTP" : "Send OTP"}
                </Button>
                {mode ? (
                  <Button
                    onClick={signIn}
                    className="w-100 my-2 text-white border-0"
                    style={{ fontFamily: "bold" }}
                    variant="success"
                  >
                    {"Resend OTP"}
                  </Button>
                ) : null}
                <Button
                  variant="danger"
                  style={{ fontFamily: "regular" }}
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem("accessToken");
                    router.replace("/auth");
                  }}
                >
                  Logout
                </Button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <div id="recaptcha-container"></div>
    </Container>
  );
}

export default MobileVerification;
