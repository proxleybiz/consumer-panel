import React, { useState, useContext } from "react";
import userContext from "../context/user/userContext";
import { Fragment } from "react";
import Loading from "./Loading";
import { Button, Card, Col, Row } from "react-bootstrap";
import NewAddressModal from "./NewAddressModal";
import DeleteIcon from "../imgs/delete.png";
import EditIcon from "../imgs/edit.png";
import HomeIcon from "../imgs/home.png";
import { toast } from "react-toastify";
import EditAddressModal from "./editAddressModal";

function Address() {
  const userCtx = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="d-flex flex-column mt-4"
          style={{ fontFamily: "regular" }}
        >
          <h1 className="text-white"> Addresses </h1>
          <div className="d-flex" style={{ marginTop: "10px" }}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setShow(true);
              }}
              variant="success"
            >
              Add New
            </Button>
          </div>
          <Row style={{ gap: "10px" }} className="mt-4">
            {userCtx.user?.address.map((item, key) => {
              return (
                <Col key={key} sm={4}>
                  <Card className="w-100" style={{ border: "none" }}>
                    <Card.Header
                      as="h5"
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                        background: "#333",
                        color: "yellow",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          marginBottom: "0.5em",
                        }}
                      >
                        <img src={HomeIcon.src} style={{ height: "1em" }} />
                        <br />
                      </div>

                      {item.addressTitle}
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        {`${item.lineOne}, ${item.lineTwo}, ${item.landmark}, ${item.city}, ${item.state}, ${item.country}, ${item.pincode}`}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        className="hover-select"
                        onClick={(e) => {
                          e.preventDefault();
                          userCtx.deleteAddress(
                            item._id,
                            () => {
                              toast.success("Address Deleted");
                            },
                            (err) => {
                              toast.error(err);
                            }
                          );
                        }}
                      >
                        <img src={DeleteIcon.src} style={{ height: "1.5em" }} />
                      </span>
                      <span
                        className="hover-select"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedAddress(item);
                          setShow2(true);
                        }}
                      >
                        <img src={EditIcon.src} style={{ height: "1.5em" }} />
                      </span>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
          </Row>
          <NewAddressModal
            show={show}
            handleClose={() => {
              setShow(false);
            }}
            add={(data) => {
              const keys = Object.keys(data);
              for (let i = 0; i < keys.length; i++) {
                if (keys[i] === "lineTwo") {
                  continue;
                }
                if (data[keys[i]].trim() === "") {
                  toast.error(`Please enter ${keys[i]}`);
                  return;
                }
              }
              setLoading(true);
              userCtx.addAddress(
                data,
                () => {
                  setShow(false);
                  setLoading(false);
                  toast.success("Address Added");
                },
                (err) => {
                  setShow(false);
                  setLoading(false);
                  toast.error(err);
                }
              );
            }}
          />
          {selectedAddress && (
            <EditAddressModal
              show={show2}
              handleClose={() => {
                setShow2(false);
              }}
              newAddress={selectedAddress}
              setNewAddress={setSelectedAddress}
              add={(data) => {
                const keys = Object.keys(data);
                for (let i = 0; i < keys.length; i++) {
                  if (keys[i] === "lineTwo") {
                    continue;
                  }
                  if (data[keys[i]].trim() === "") {
                    toast.error(`Please enter ${keys[i]}`);
                    return;
                  }
                }
                setLoading(true);
                userCtx.updateAddress(
                  data,
                  () => {
                    setShow2(false);
                    setLoading(false);
                    toast.success("Address Updated");
                  },
                  (err) => {
                    setShow2(false);
                    setLoading(false);
                    toast.error(err);
                  }
                );
              }}
            />
          )}
        </div>
      )}
    </Fragment>
  );
}

export default Address;
