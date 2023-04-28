import React, { useState, useContext, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import googleLogo from "../imgs/google.png";
import userContext from "../context/user/userContext";
import { useRouter } from "next/router";
import {
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

function LoginCard({ switchFn }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const userCtx = useContext(userContext);
  const router = useRouter();

  useEffect(() => {
    if (
      localStorage.getItem("accessToken") !== null &&
      localStorage.getItem("accessToken") !== undefined
    ) {
      router.replace("/dashboard");
    }
  }, []);

  const login = () => {
    setLoading(true);
    userCtx.login(
      { ...credentials },
      () => {
        setLoading(false);
        router.replace("/dashboard");
      },
      (err) => {
        toast.error(err.toString());
        setLoading(false);
      }
    );
  };

  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      if (!res) {
        throw new Error("Could not complete signup");
      }

      const user = res.user;
      if (user.accessToken) {
        localStorage.setItem("accessToken", user.accessToken);
        router.replace("/dashboard");
      } else {
        localStorage.removeItem("accessToken");
      }
    } catch (err) {
      localStorage.removeItem("accessToken");
    }
  };
  return (
    <Card className="bg-transparent p-2">
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title
          className="fs-1 authentication-heading"
          style={{ fontFamily: "regular", marginBottom: "30px" }}
        >
          Welcome Back!
        </Card.Title>
        <div>
          <Form.Group className="mb-3 w-100">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={credentials.email}
              onChange={(e) => {
                setCredentials({ ...credentials, email: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3 w-100">
            <Form.Control
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => {
                setCredentials({ ...credentials, password: e.target.value });
              }}
            />
          </Form.Group>
          <Button
            className="btn-hover w-100 mb-3"
            style={{ fontFamily: "regular" }}
            onClick={(e) => {
              e.preventDefault();
              login();
            }}
          >
            LOGIN
          </Button>
        </div>
        <p className="w-100 text-center fs-6 text-light"> OR </p>
        <Button
          onClick={(e) => {
            e.preventDefault();
            googleLogin();
          }}
          className="d-flex flex-row align-items-center"
          style={{ gap: "10px", fontFamily: "regular" }}
          variant="dark"
        >
          <img
            src={googleLogo.src}
            style={{ height: "30px", width: "30px" }}
            className="bg-light rounded-circle p-0"
          />
          Continue with Google
        </Button>
        <span
          className="d-flex flex-row align-items-center text-white mt-5"
          style={{ gap: "10px", fontFamily: "regular" }}
        >
          Don&apos;t have an account?
          <Button
            onClick={switchFn}
            className="p-0 m-0 bg-transparent border-0"
            style={{ color: "yellow" }}
          >
            Regsiter
          </Button>
        </span>
      </Card.Body>
    </Card>
  );
}

export default LoginCard;
