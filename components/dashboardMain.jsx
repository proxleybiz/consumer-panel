import React, { useEffect, useContext, useState, Fragment } from "react";
import { useRouter } from "next/router";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import Head from "next/head";
import userContext from "../context/user/userContext";
import dynamic from "next/dynamic";
import Loading from "./Loading";
import Orders from "./orders";
import Address from "./Address";
const Dashboard = dynamic(() => import("./dashboard"), { ssr: false });
const Profile = dynamic(() => import("./profile"), { ssr: false });
const MobileVerification = dynamic(() => import("./mobileVerification"), {
  ssr: false,
});

function DashboardMain() {
  const router = useRouter();
  const userCtx = useContext(userContext);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("");
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [renderElement, setRenderElement] = useState(null);
  const [customization, setCustomization] = useState([]);
  const tabs = ["Profile", "Dashboard", "Orders", "Addresses"];
  const getUser = () => {
    setLoading(true);
    userCtx.getUser(
      () => {
        setLoading(false);
        setSelectedTab("Profile");
      },
      (err) => {
        setLoading(false);
        localStorage.removeItem("accessToken");
        router.replace("/auth");
      }
    );
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setIndex(0);
    setCustomization([]);
    switch (selectedTab) {
      case "Profile":
        {
          setRenderElement(<Profile />);
        }
        break;
      case "Orders":
        {
          setRenderElement(<Orders />);
        }
        break;
      case "Dashboard":
        {
          setRenderElement(
            <Dashboard
              setCust={(data) => {
                setCustomization(data);
              }}
              setIndex={setIndex}
              index={index}
            />
          );
        }
        break;
      case "Addresses":
        {
          setRenderElement(<Address />);
        }
        break;
      default: {
        setRenderElement(null);
      }
    }
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab === "Dashboard") {
      setRenderElement(
        <Dashboard
          setCustomization={setCustomization}
          customization={customization}
          setIndex={setIndex}
          index={index}
        />
      );
    }
  }, [index, customization]);
  return (
    <Container fluid className="min-vh-100" style={{ fontFamily: "regular" }}>
      <Head>
        <title> Dashboard | Proxley </title>
      </Head>
      <MyNavbar mode={1} />
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {userCtx.user && userCtx.user.phoneNumber.trim() !== "" ? (
            <Row style={{marginTop:"10px"}}>
              <Col sm={0} md={4}>
                <div
                  className="d-flex flex-column rounded p-2"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    overflow: "auto",
                    marginRight:'1.5rem'
                  }}
                >
                  <h1 className="text-white" style={{fontSize:"30px"}}>
                    Hello, <br /> <span style={{color:"#a2cfa2"}}> {userCtx.user?.name} </span>
                  </h1>
                  <Button
                    className="border-0 fs-5 mt-3 py-3 text-start hover-dark"
                    style={{
                      background:
                        "Profile" === selectedTab
                          ? "#2160fd"
                          : "rgba(255,255,255,0.2)",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      if ("Profile" === selectedTab) {
                        return;
                      }
                      if (!userCtx.user?.profileCompleted) {
                        alert("Please complete your profile");
                        return;
                      }
                      setSelectedTab("Profile");
                    }}
                  >
                    {"Profile"}
                  </Button>
                  <Button
                    className="border-0 fs-5 mt-3 py-3 text-start hover-dark"
                    style={{
                      background:
                        "Dashboard" === selectedTab
                          ? "#2160fd"
                          : "rgba(255,255,255,0.2)",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      if ("Dashboard" === selectedTab) {
                        return;
                      }
                      if (!userCtx.user?.profileCompleted) {
                        alert("Please complete your profile");
                        return;
                      }
                      setSelectedTab("Dashboard");
                    }}
                  >
                    {"Dashboard"}
                  </Button>
                  <div
                    className="w-100 d-flex flex-column align-items-end"
                    style={{
                      backgroundColor: "transparent",
                      maxHeight: "40vh",
                      overflow: "auto",
                    }}
                  >
                    {customization.map((item, key) => {
                      return (
                        <Button
                          key={key}
                          className="border-0 fs-5 mt-3 py-3 text-start hover-dark"
                          style={{
                            width: "90%",
                            float: "right",
                            background:
                              key === index
                                ? "#2160fd"
                                : customization[key].selectedValue
                                    .toString()
                                    .trim() !== ""
                                ? "#508d50"
                                : "rgba(255,255,255,0.2)",
                          }}
                        >
                          {item.name}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    className="border-0 fs-5 mt-3 py-3 text-start hover-dark"
                    style={{
                      background:
                        "Orders" === selectedTab
                          ? "#2160fd"
                          : "rgba(255,255,255,0.2)",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      if ("Orders" === selectedTab) {
                        return;
                      }
                      if (!userCtx.user?.profileCompleted) {
                        alert("Please complete your profile");
                        return;
                      }
                      setSelectedTab("Orders");
                    }}
                  >
                    {"Orders"}
                  </Button>
                  <Button
                    className="border-0 fs-5 mt-3 py-3 text-start hover-dark"
                    style={{
                      background:
                        "Addresses" === selectedTab
                          ? "#2160fd"
                          : "rgba(255,255,255,0.2)",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      if ("Addresses" === selectedTab) {
                        return;
                      }
                      if (!userCtx.user?.profileCompleted) {
                        alert("Please complete your profile");
                        return;
                      }
                      setSelectedTab("Addresses");
                    }}
                  >
                    {"Addresses"}
                  </Button>
                  <Button
                    className="border-0 fs-5 mt-3 py-3 text-start logout-hover"
                    style={{
                      background: "rgba(255,255,255,0.2)",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.removeItem("accessToken");
                      router.replace("/auth");
                    }}
                  >
                    Logout
                  </Button>
                </div>
              </Col>
              <Col sm={12} md={8}>
                {renderElement}
              </Col>
            </Row>
          ) : (
            <MobileVerification />
          )}
        </Fragment>
      )}
    </Container>
  );
}

export default DashboardMain;
