import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useRouter } from "next/router";
import googleLogo from "../imgs/google.png";
import userContext from "../context/user/userContext";
import {
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

function RegsiterCard({ switchFn }) {
  const router = useRouter();
  const userCtx = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirm: "",
    name: "",
  });
  useEffect(() => {
    if (
      localStorage.getItem("accessToken") !== null &&
      localStorage.getItem("accessToken") !== undefined
    ) {
      router.replace("/dashboard");
    }
  }, []);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const register = () => {
    if (
      credentials.email.trim() === "" ||
      credentials.password.length < 7 ||
      credentials.name.trim() === ""
    ) {
      return toast.error(
        "Email, name and a password greater than 6 charachters is needed."
      );
    }
    if (!validateEmail(credentials.email)) {
      return toast.error("Please enter a valid email");
    }
    if (credentials.password !== credentials.confirm) {
      return toast.error("Passwords do not match.");
    }
    setLoading(true);
    userCtx.register(
      { ...credentials },
      () => {
        setLoading(false);
        router.replace("/dashboard");
      },
      (err) => {
        toast.error(err);
        setLoading(false);
      }
    );
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
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
        setLoading(false);
        localStorage.removeItem("accessToken");
      }
    } catch (err) {
      setLoading(false);
      localStorage.removeItem("accessToken");
    }
  };
  return (
    <Card className="bg-transparent p-2">
      <Card.Body
        className="d-flex flex-column align-items-center"
        id="logindiv"
      >
        <Card.Title
          className="fs-1 authentication-heading mb-4"
          style={{ fontFamily: "regular" }}
        >
          Create your Proxley account
        </Card.Title>
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
        <p
          className="w-100 text-center fs-6 text-light"
          style={{ marginTop: "10px" }}
        >
          {" "}
          OR{" "}
        </p>
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
              type="name"
              placeholder="Enter your name"
              value={credentials.name}
              onChange={(e) => {
                setCredentials({ ...credentials, name: e.target.value });
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
          <Form.Group className="mb-3 w-100">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={credentials.confirm}
              onChange={(e) => {
                setCredentials({ ...credentials, confirm: e.target.value });
              }}
            />
          </Form.Group>

          <Button
            className="btn-hover w-100 mb-3"
            style={{ fontFamily: "regular" }}
            onClick={(e) => {
              e.preventDefault();
              register();
            }}
            disabled={loading}
          >
            Register
          </Button>
        </div>
        <span
          className="d-flex flex-row align-items-center text-white mt-5"
          style={{ gap: "10px", fontFamily: "regular" }}
        >
          Already have an account?
          <Button
            onClick={switchFn}
            style={{ color: "yellow" }}
            className="p-0 m-0 bg-transparent border-0"
          >
            Login
          </Button>
        </span>
      </Card.Body>
    </Card>
  );
}

export default RegsiterCard;
