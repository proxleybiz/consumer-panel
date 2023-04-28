import React, { Fragment, useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import RecommendationModal from "./RecommendationModal";
import ThankYouModal from "./ThankYouModal";
import { Button, Col, Form, ProgressBar, Row } from "react-bootstrap";
import { SketchPicker } from "react-color";
import { FILTER_ONE, PRINTING } from "../utils/constants";
import left from "../imgs/left-arrow.png";
import right from "../imgs/right-arrow.png";
import { toast } from "react-toastify";

function Customizations({
  filters,
  customization,
  setCustomization,
  discard,
  index,
  setIndex,
}) {
  const img = FILTER_ONE.find((i) => i.name === filters.catOne)?.img;
  const [show, setShow] = useState(false);
  const [recShow, setRecShow] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [thanksModalShow, setThanksModalShow] = useState(false);
  const validateData = () => {
    if (
      filters.catOne === "" ||
      filters.catTwo === "" ||
      filters.catThree === ""
    ) {
      return toast.error("Please select packaging type and format");
    }

    for (let i = 0; i < customization.length; i++) {
      if (customization[i].selectedValue.toString().trim() === "") {
        toast.error(customization[i].name);
        return;
      }
    }
    setShow(true);
  };

  const render = (index) => {
    const item = customization[index];
    if (filters.catOne === PRINTING && item.name === "Select Color") {
      const temp = customization.find(
        (t) => t.name === "Select Multicolor/Singlecolor"
      );
      if (temp) {
        item.type =
          temp.selectedValue === "SINGLECOLOR"
            ? "COLOR"
            : temp.selectedValue === "MULTICOLOR"
            ? "DROP"
            : "";
      }
    }
    switch (item.type) {
      case "DROP": {
        return (
          <Form.Group className="mt-4">
            <Form.Label className="text-white fs-4">{item.name}</Form.Label>
            {item.values.map((val, k) => (
              <Form.Check
                className="text-white"
                key="k"
                type={"checkbox"}
                label={val}
                checked={item.selectedValue === val}
                onChange={(e) => {
                  if (e.target.checked) {
                    setCustomization(
                      customization.map((i) => {
                        if (i.name === item.name) {
                          return { ...i, selectedValue: val };
                        }
                        return i;
                      })
                    );
                  } else {
                    setCustomization(
                      customization.map((i) => {
                        if (i.name === item.name) {
                          return { ...i, selectedValue: "" };
                        }
                        return i;
                      })
                    );
                  }
                }}
              />
            ))}
          </Form.Group>
        );
      }
      case "NUMBER": {
        return (
          <div
            className="mt-4 d-flex align-items-center"
            style={{ gap: "10px" }}
          >
            <p
              className="text-white mb-0  fs-4"
              style={{ width: "max-content" }}
            >
              {item.name}
            </p>
            <Form.Control
              placeholder={item.name}
              value={
                customization.find((c) => c.name === item.name)?.selectedValue
              }
              type="number"
              style={{ flex: "1" }}
              onChange={(e) => {
                setCustomization(
                  customization.map((c) => {
                    if (c.name === item.name) {
                      return { ...c, selectedValue: e.target.value.toString() };
                    }
                    return c;
                  })
                );
              }}
            />
          </div>
        );
      }
      case "TEXT": {
        return (
          <div
            className="mt-4 d-flex align-items-center"
            style={{ gap: "10px" }}
          >
            <p
              className="text-white mb-0  fs-4"
              style={{ width: "max-content" }}
            >
              {item.name}
            </p>
            <Form.Control
              placeholder={item.name}
              value={
                customization.find((c) => c.name === item.name)?.selectedValue
              }
              style={{ flex: "1" }}
              onChange={(e) => {
                setCustomization(
                  customization.map((c) => {
                    if (c.name === item.name) {
                      return { ...c, selectedValue: e.target.value.toString() };
                    }
                    return c;
                  })
                );
              }}
            />
          </div>
        );
      }
      case "COLOR": {
        return (
          <Form.Group className="mt-4">
            <Form.Label className="text-white fs-4">{item.name}</Form.Label>
            <SketchPicker
              color={
                customization.find((c) => c.name === item.name)?.selectedValue
              }
              onChangeComplete={(e) => {
                setCustomization(
                  customization.map((c) => {
                    if (c.name === item.name) {
                      return { ...c, selectedValue: e.hex };
                    }
                    return c;
                  })
                );
              }}
            />
          </Form.Group>
        );
      }
      case "FILE": {
        return (
          <Form.Group className="mt-4">
            <Form.Label className="text-white fs-4">{item.name}</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={(e) => {
                setCustomization(
                  customization.map((c) => {
                    if (c.name === item.name) {
                      return {
                        ...c,
                        selectedValue: e.target.files[0],
                      };
                    }
                    return c;
                  })
                );
              }}
            />
          </Form.Group>
        );
      }
      default: {
        return null;
      }
    }
  };
  return (
    <Fragment>
      <h2 className="fs-3 my-4" style={{ color: "white" }}>
        Customize your {filters.catOne}
      </h2>
      <Row>
        <Col sm={9}>
          <ProgressBar
            now={((index + 1) / customization.length) * 100}
            variant="success"
          />
          {render(index)}
          <Row
            className="justify-content-start"
            style={{
              flexDirection:
                index + 1 === customization.length && "row-reverse",
              gap: "1rem",
            }}
          >
            <Button
              style={{
                backgroundColor: "red",
                width: "fit-content",
              }}
              className="text-white mt-4 border-0"
              onClick={(e) => {
                e.preventDefault();
                discard();
              }}
            >
              Discard
            </Button>
            <Button
              style={{ backgroundColor: "#2160fd", width: "fit-content" }}
              className="text-white mt-4"
              onClick={(e) => {
                e.preventDefault();
                setIndex(Math.max(index - 1, 0));
              }}
            >
              Previous
            </Button>
            {
              index < customization.length - 1 && (
                <Button
                  style={{ backgroundColor: "#2160fd", width: "fit-content" }}
                  className="text-white mt-4"
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      customization[index].selectedValue.toString().trim() ===
                      ""
                    ) {
                      toast.error(customization[index].name);
                      return;
                    }
                    setIndex(Math.min(index + 1, customization.length - 1));
                  }}
                >
                  Continue
                </Button>
              ) /*  : (
              <Button
                style={{ backgroundColor: "#2160fd", width: "fit-content" }}
                className="text-white mt-4"
                onClick={(e) => {
                  e.preventDefault();
                  validateData();
                }}
              >
                {"Let's Preview"}
              </Button>
            ) */
            }
          </Row>
          <OrderDetailsModal
            show={show}
            handleClose={() => {
              setShow(false);
            }}
            recommendation={recommendation}
            customization={customization}
            filters={filters}
          />
          <RecommendationModal
            show={recShow}
            handleClose={() => {
              setRecShow(false);
            }}
            setRecommendation={(data) => {
              setRecommendation(data);
            }}
            handleThankyouModalOpen={() => {
              setThanksModalShow(true);
            }}
          />
          <ThankYouModal
            show={thanksModalShow}
            handleClose={() => {
              setThanksModalShow(false);
            }}
          />
        </Col>
        <Col
          sm={3}
          className="d-flex flex-column align-items-center"
          style={{
            border: "5px solid white",
            height: "320px",
            marginTop: "3rem",
          }}
        >
          <img src={img} style={{ height: "8rem", width: "fit-content" }} />
          <Button
            style={{ backgroundColor: "#2160fd", width: "fit-content" }}
            className="text-white mt-4"
            onClick={(e) => {
              e.preventDefault();
              validateData();
            }}
            disabled={index < customization.length - 1}
          >
            {"Let's Preview"}
          </Button>
          <Button
            style={{ backgroundColor: "#fda121", width: "fit-content" }}
            className="text-white mt-4"
            onClick={(e) => {
              e.preventDefault();
              if (filters.catOne === "PRINTING") {
                return toast.warning("We are working on it right now");
              } else {
                setRecShow(true);
              }
            }}
            disabled={index < customization.length - 1}
          >
            {"View Recommendations"}
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
}

export default Customizations;
