import React, { Fragment, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import print from "../imgs/print.png";
import box from "../imgs/package.png";
import {
  CUSTOMIZATION,
  FILTER_ONE,
  FILTER_TWO,
  PACKAGING,
  PRINTING,
} from "../utils/constants";
import { SketchPicker } from "react-color";
import OrderDetailsModal from "./OrderDetailsModal";
import Customizations from "./Customizations";

function Dashboard({ index, setIndex, customization, setCustomization }) {
  const [filters, setFilters] = useState({
    catOne: "",
    catTwo: "",
    catThree: "",
  });
  const [showCustoms, setCustoms] = useState(false);

  const getSecondFilters = (catOne) => {
    switch (catOne) {
      case PRINTING: {
        const result = FILTER_TWO.find((i) => i.category === catOne);
        if (!result) {
          return [];
        }
        return result.items;
      }
      case PACKAGING: {
        const result = FILTER_TWO.find((i) => i.category === catOne);
        if (!result) {
          return [];
        }
        return result.items;
      }
      default: {
        return [];
      }
    }
  };

  const getThirdFilter = (catTwo, catOne) => {
    const result = FILTER_TWO.find((i) => i.category === catOne);
    if (!result) {
      return [];
    }
    const temp = result.items.find((i) => i.name === catTwo);
    if (!temp) {
      return [];
    }
    return temp.options;
  };
  return (
    <Container
      className="container-lg"
      style={{ fontFamily: "regular", marginLeft: "0px",marginTop:"10px" }}
    >
      <h1 style={{color:"white",fontWeight:"bold"}}>Please select an option</h1>
      {filters.catOne.trim() !== "" &&
      filters.catTwo.trim() !== "" &&
      filters.catThree.trim() !== "" &&
      showCustoms ? (
        <Customizations
          filters={filters}
          setCustomization={setCustomization}
          customization={customization}
          setIndex={setIndex}
          index={index}
          discard={() => {
            setCustoms(false);
            setFilters({
              catOne: "",
              catTwo: "",
              catThree: "",
            });
            setCustomization([]);
            setIndex(0);
          }}
        />
      ) : (
        <Fragment>
          <Row className="justify-content-around">
            {FILTER_ONE.map((item, key) => {
              return (
                <Col className="p-3" key={key} sm={6} lg={3}>
                  <Card
                    className={
                      "rounded w-100 p-2 d-flex flex-column align-items-center hover-select"
                    }
                    onClick={() => {
                      setFilters({
                        catOne: item.name,
                        catTwo: "",
                        catThree: "",
                      });
                      const result = CUSTOMIZATION.find(
                        (i) => i.category === item.name
                      );

                      if (!result) {
                        setCustomization([]);
                      } else if (item.name === PRINTING) {
                        const temp = [
                          ...result.options.map((i) => {
                            return { ...i, selectedValue: "" };
                          }),
                          {
                            name: "Select Multicolor/Singlecolor",
                            type: "DROP",
                            values: ["SINGLECOLOR", "MULTICOLOR"],
                            selectedValue: "",
                          },
                          {
                            name: "Select Color",
                            type: "DROP",
                            values: ["CYAN", "BLACK", "MAGENTA", "YELLOW"],
                            selectedValue: "",
                          },
                        ];
                        setCustomization(temp);
                      } else {
                        const temp = result.options.map((i) => {
                          return { ...i, selectedValue: "" };
                        });
                        setCustomization(temp);
                      }
                    }}
                    style={{
                      background:
                        filters.catOne === item.name
                          ? "rgb(167, 199, 231, 0.7)"
                          : "",
                    }}
                  >
                    <img
                      src={item.img}
                      style={{ height: "8rem", width: "fit-content" }}
                    />
                    <h2> {item.name} </h2>
                  </Card>
                </Col>
              );
            })}
          </Row>
          {filters.catOne !== "" && (
            <Fragment>
              <h2 className="fs-3 my-4" style={{color:"white"}}>
                Select your {filters.catOne} category
              </h2>
              <Row className="justify-content-center">
                {getSecondFilters(filters.catOne).map((item, key) => {
                  return (
                    <Col key={key} sm={6} md={4} lg={3} className="mb-4">
                      <Card
                        className="w-100 p-2 rounded d-flex flex-column align-items-center hover-select"
                        onClick={() => {
                          setFilters({
                            ...filters,
                            catTwo: item.name,
                            catThree: "",
                          });
                        }}
                        style={{
                          background:
                            filters.catTwo === item.name
                              ? "rgb(167, 199, 231, 0.7)"
                              : "",
                        }}
                      >
                        <img
                          src={item.img}
                          style={{ height: "6rem", width: "fit-content" }}
                        />
                        <h5> {item.name} </h5>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
              <Form.Group>
                <Form.Label className="text-white"> Select Type of {filters.catOne}</Form.Label>
                <Form.Select
                  value={filters.catThree}
                  onChange={(e) => {
                    setFilters({ ...filters, catThree: e.target.value });
                  }}
                >
                  <option value=""> Select </option>
                  {getThirdFilter(filters.catTwo, filters.catOne).map(
                    (i, key) => (
                      <option value={i.name} key={key}>
                        {i.name}
                      </option>
                    )
                  )}
                </Form.Select>
              </Form.Group>
            </Fragment>
          )}
          {filters.catOne && (
            <Button
              variant="primary"
              className="mt-4"
              style={{ width: "fit-content", float: "left" }}
              onClick={(e) => {
                setCustoms(true);
              }}
            >
              {"Let's Customize"}
            </Button>
          )}
          <br />
        </Fragment>
      )}
    </Container>
  );
}

export default Dashboard;
