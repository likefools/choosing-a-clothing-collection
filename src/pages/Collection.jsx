import React from "react";
import { useRef, useContext, useState, useEffect } from "react";

import { DataContext } from "../Context";

import { Button, Col, Card, Row, Badge, Alert } from "react-bootstrap";

import pants from "../assets/pants.jpg";
import shirt from "../assets/shirt.jpg";
import shoes from "../assets/shoes.jpg";

const Collection = () => {
  const allContextProps = useContext(DataContext);
  const {
    itemsCollection,
    setItemsCollection,
    setItems,
    startTimeDate,
    setStartTimeDate,
  } = {
    ...allContextProps,
  };
  // const collection = itemsCollection;

  const [collection, setCollection] = useState();
  const [dataTime, setDatatime] = useState();

  useEffect(() => {
    setCollection(itemsCollection);
    setDatatime(startTimeDate);
  }, [itemsCollection]);
  console.log(dataTime);
  const deletecollectionSeat = (collectionSeat, index) => {
    setItems((old) => [...old, ...collectionSeat]);
    const newCollection = itemsCollection;
    newCollection.splice(index, 1);
    setItemsCollection(newCollection);

    const newDateTime = startTimeDate;
    newDateTime.splice(index, 1);
    setStartTimeDate(newDateTime);

    const currentCollection =
      JSON.parse(localStorage.getItem("collection")) || [];
    currentCollection.splice(index, 1);
    localStorage.setItem("collection", JSON.stringify(currentCollection));

    const currentDateTime = JSON.parse(localStorage.getItem("dataTime")) || [];
    currentDateTime.splice(index, 1);
    localStorage.setItem("dataTime", JSON.stringify(currentDateTime));
  };

  const imgType = (itemType) => {
    let imgUrl = "";
    if (itemType === "shirt") {
      imgUrl = shirt;
    }
    if (itemType === "pants") {
      imgUrl = pants;
    }
    if (itemType === "shoes") {
      imgUrl = shoes;
    }
    return imgUrl;
  };

  if (!collection) return <h2>no items</h2>;
  const getCollection = collection?.map((items, index) => {
    return (
      <div key={index} className="itemsCard">
        <h4>Collection {index + 1}</h4>
        <Row xs={3} md={3} lg={4} className="g-2">
          {items.map((item) => {
            return (
              <Col key={item.id}>
                <Card>
                  <Card.Header className="text-center">
                    <h4>{item.type}</h4>
                  </Card.Header>
                  <div className="cardImg">
                    <Card.Img variant="top" src={imgType(item.type)} />
                  </div>
                  <Card.Body>
                    <div className="properties">
                      <h5>
                        size: <span>{item.size}</span>
                      </h5>
                      <h5>
                        color:{" "}
                        <span
                          className="color"
                          style={{ backgroundColor: item.color }}
                        ></span>
                      </h5>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
        <div className="infoTimeOrDelete">
          <Button
            size="lg"
            variant="danger"
            onClick={() => deletecollectionSeat(items, index)}
          >
            Delete
          </Button>
          <Alert variant="secondary">
            {dataTime ? (
              <div key={index} className="dataTime">
                <div className="fw-bold">
                  Time Selected:{" "}
                  <span className="text-success">{dataTime[index][0]}</span>
                </div>
                <div className="fw-bold">
                  Time to Select:{" "}
                  <span className="text-success">{dataTime[index][1]}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </Alert>
        </div>
      </div>
    );
  });

  return (
    <div className="collection">
      <h2>
        {Object.keys(collection).length > 0
          ? "Collection"
          : "no collection items"}
      </h2>

      {getCollection}
    </div>
  );
};

export default Collection;
