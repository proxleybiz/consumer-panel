import React, { useContext, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import userContext from "../context/user/userContext";
import Loading from "./Loading";
import UpdatePasswordModal from "./UpdatePasswordModal";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function Profile() {
  const router = useRouter();
  const userCtx = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState({
    newPassword: "",
    oldPassword: "",
    confirmPassword: "",
  });
  const [profile, setProfile] = useState({
    companyName: userCtx.user?.companyName,
    companyGST: userCtx.user?.companyGST,
    businessCategory: userCtx.user?.businessCategory,
    businessAddress: userCtx.user?.businessAddress,
    designation: userCtx.user?.designation,
    accountNumber: userCtx.user?.accountNumber,
    name: userCtx.user?.name,
  });

  const [edit, setEdit] = useState({
    companyName: false,
    companyGST: false,
    businessCategory: false,
    businessAddress: false,
    designation: false,
    accountNumber: false,
    name: false,
  });

  const updatePassword = () => {
    setShow(false);
    setLoading(true);
    userCtx.updatePassword(
      password,
      () => {
        setLoading(false);
        setPassword({
          newPassword: "",
          oldPassword: "",
          confirmPassword: "",
        });
        toast.success("Password Updated");
      },
      (err) => {
        setLoading(false);
        setPassword({
          newPassword: "",
          oldPassword: "",
          confirmPassword: "",
        });
        toast.error(err);
      }
    );
  };

  const changeHandler = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const updateProfile = () => {
    const temp = Object.keys(profile);
    for (let i = 0; i < temp.length; i++) {
      if (profile[temp[i]].trim() === "") {
        toast.error(`Profile Incomplete`);
        return;
      }
    }
    setLoading(true);
    userCtx.updateProfile(
      profile,
      () => {
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        setProfile({
          companyName: userCtx.user?.companyName,
          companyGST: userCtx.user?.companyGST,
          businessCategory: userCtx.user?.businessCategory,
          businessAddress: userCtx.user?.businessAddress,
          designation: userCtx.user?.designation,
          accountNumber: userCtx.user?.accountNumber,
          name: userCtx.user?.name,
        });
      }
    );
  };

  const profileStatus = (profile) => {
    const temp = Object.keys(profile);
    for (let i = 0; i < temp.length; i++) {
      if (profile[temp[i]] !== userCtx.user[temp[i]]) {
        return false;
      }
    }
    return true;
  };
  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col sm={12}>
          {!userCtx.user || loading ? (
            <Loading />
          ) : (
            <Card className="w-100 rounded p-3" style={{ background: "black" }}>
              <Card.Body
                className="d-flex flex-column align-items-start"
                style={{ gap: "1rem" }}
              >
                <Row className="w-100 justify-content-center">
                  <h1
                    className="fs-2 text-white"
                    style={{ fontFamily: "bold", width: "fit-content" }}
                  >
                    Configure your Profile
                  </h1>
                </Row>
                <div
                  style={{ gap: "5px" }}
                  className="d-flex flex-row align-items-center"
                >
                  <p className="text-white"> Profile Status: </p>
                  <p className={"text-warning"}>
                    {profileStatus(profile) ? "Saved" : "Unsaved"}
                  </p>
                </div>
                <Form.Control
                  disabled
                  value={userCtx.user?.email}
                  className=""
                  style={{ fontFamily: "regular", background: "#f9eec4" }}
                />
                <Form.Control
                  disabled
                  value={userCtx.user?.phoneNumber}
                  className=""
                  style={{ fontFamily: "regular", background: "#f9eec4" }}
                />
                <Form.Control
                  disabled
                  value={
                    "Joined On: " +
                    new Date(userCtx.user?.joinedOn).toLocaleDateString()
                  }
                  className=""
                  style={{ fontFamily: "regular", background: "#f9eec4" }}
                />
                <Form.Group className="w-100">
                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "10px" }}
                  >
                    <Form.Label className="text-white"> Username </Form.Label>
                    <button
                      className="bg-transparent border-0 p-2"
                      style={{ color: "blue" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setEdit({ ...edit, name: true });
                      }}
                    >
                      Edit
                    </button>
                  </div>

                  <Form.Control
                    value={profile.name}
                    className=" w-100"
                    style={{ fontFamily: "regular", background: "#f9eec4" }}
                    name="name"
                    placeholder="Username"
                    onChange={changeHandler}
                    disabled={!edit.name}
                  />
                </Form.Group>
                <Form.Group className="w-100">
                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "10px" }}
                  >
                    <Form.Label className="text-white">Company Name</Form.Label>
                    <button
                      className="bg-transparent border-0 p-2"
                      style={{ color: "blue" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setEdit({ ...edit, companyName: true });
                      }}
                    >
                      Edit
                    </button>
                  </div>

                  <Form.Control
                    value={profile.companyName}
                    className=" w-100"
                    style={{ fontFamily: "regular", background: "#f9eec4" }}
                    name="companyName"
                    placeholder="Company Name"
                    onChange={changeHandler}
                    disabled={!edit.companyName}
                  />
                </Form.Group>
                <Form.Group className="w-100">
                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "10px" }}
                  >
                    <Form.Label className="text-white">
                      {" "}
                      Company GST{" "}
                    </Form.Label>
                    <button
                      className="bg-transparent border-0 p-2"
                      style={{ color: "blue" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setEdit({ ...edit, companyGST: true });
                      }}
                    >
                      Edit
                    </button>
                  </div>

                  <Form.Control
                    value={profile.companyGST}
                    className=" w-100"
                    style={{ fontFamily: "regular", background: "#f9eec4" }}
                    name="companyGST"
                    placeholder="Company GST"
                    onChange={changeHandler}
                    disabled={!edit.companyGST}
                  />
                </Form.Group>
                <Form.Group className="w-100">
                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "10px" }}
                  >
                    <Form.Label className="text-white">
                      Business Category
                    </Form.Label>
                    <button
                      className="bg-transparent border-0 p-2"
                      style={{ color: "blue" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setEdit({ ...edit, businessCategory: true });
                      }}
                    >
                      Edit
                    </button>
                  </div>

                  <Form.Control
                    value={profile.businessCategory}
                    className=" w-100"
                    style={{ fontFamily: "regular", background: "#f9eec4" }}
                    name="businessCategory"
                    placeholder="Business Category"
                    onChange={changeHandler}
                    disabled={!edit.businessCategory}
                  />
                </Form.Group>
                <Form.Group className="w-100">
                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "10px" }}
                  >
                    <Form.Label className="text-white">
                      Business Address
                    </Form.Label>
                    <button
                      className="bg-transparent border-0 p-2"
                      style={{ color: "blue" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setEdit({ ...edit, businessAddress: true });
                      }}
                    >
                      Edit
                    </button>
                  </div>

                  <Form.Control
                    value={profile.businessAddress}
                    className=" w-100"
                    style={{ fontFamily: "regular", background: "#f9eec4" }}
                    name="businessAddress"
                    placeholder="Business Address"
                    onChange={changeHandler}
                    disabled={!edit.businessAddress}
                  />
                </Form.Group>
                <Form.Group className="w-100">
                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "10px" }}
                  >
                    <Form.Label className="text-white">
                      {" "}
                      Designation{" "}
                    </Form.Label>
                    <button
                      className="bg-transparent border-0 p-2"
                      style={{ color: "blue" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setEdit({ ...edit, designation: true });
                      }}
                    >
                      Edit
                    </button>
                  </div>

                  <Form.Control
                    value={profile.designation}
                    className=" w-100"
                    style={{ fontFamily: "regular", background: "#f9eec4" }}
                    name="designation"
                    placeholder="Designation"
                    onChange={changeHandler}
                    disabled={!edit.designation}
                  />
                </Form.Group>
                <Form.Group className="w-100">
                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "10px" }}
                  >
                    <Form.Label className="text-white">
                      Bank Account Number
                    </Form.Label>
                    <button
                      className="bg-transparent border-0 p-2"
                      style={{ color: "blue" }}
                      onClick={(e) => {
                        e.preventDefault();
                        setEdit({ ...edit, accountNumber: true });
                      }}
                    >
                      Edit
                    </button>
                  </div>

                  <Form.Control
                    value={profile.accountNumber}
                    className=" w-100"
                    style={{ fontFamily: "regular", background: "#f9eec4" }}
                    name="accountNumber"
                    placeholder="Bank Account Number"
                    onChange={changeHandler}
                    disabled={!edit.accountNumber}
                  />
                </Form.Group>
                <Button
                  style={{ fontFamily: "regular", background: "#2160fd" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setShow(true);
                  }}
                >
                  Update Password
                </Button>
                <Button
                  variant="success"
                  style={{ fontFamily: "regular" }}
                  onClick={(e) => {
                    e.preventDefault();
                    updateProfile();
                  }}
                >
                  Update Profile
                </Button>
                <UpdatePasswordModal
                  show={show}
                  handleClose={(e) => {
                    setShow(false);
                    setPassword({
                      newPassword: "",
                      oldPassword: "",
                      confirmPassword: "",
                    });
                  }}
                  password={password}
                  setPassword={(e) => {
                    setPassword({
                      ...password,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  update={updatePassword}
                />
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
