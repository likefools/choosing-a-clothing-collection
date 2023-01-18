import React from "react";
import { useRef, useContext, useState, useEffect } from "react";

import { DataContext } from "../Context";

import { Button, Col, Card, Row } from "react-bootstrap";

const Collection = () => {
  const allContextProps = useContext(DataContext);
  const { itemsCollection, setItemsCollection, setItems } = {
    ...allContextProps,
  };
  // const collection = itemsCollection;

  const [collection, setCollection] = useState();

  useEffect(() => {
    setCollection(itemsCollection);
  }, []);

  const deletecollectionSeat = (collectionSeat, index) => {
    setItems((old) => [...old, ...collectionSeat]);

    const newCollection = itemsCollection;
    newCollection.splice(index, 1);
    setItemsCollection(newCollection);

    const currentCollection =
      JSON.parse(localStorage.getItem("collection")) || [];
    currentCollection.splice(index, 1);
    localStorage.setItem("collection", JSON.stringify(currentCollection));
  };

  if (!collection) return <h2>no items</h2>;
  const getCollection = itemsCollection?.map((items, index) => {
    return (
      <div key={index} className="itemsCard">
        <h4>collection {index + 1}</h4>
        <Row xs={3} md={3} lg={4} className="g-2">
          {items.map((item) => {
            return (
              <Col key={item.id}>
                <Card>
                  <Card.Header className="text-center">
                    <h4>{item.type}</h4>
                  </Card.Header>
                  <Card.Img
                    variant="top"
                    src="https://store.mbit.co.il/wp-content/uploads/2020/09/tshirt-2.jpg"
                  />
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
        <Button
          variant="danger"
          className="my-2"
          onClick={() => deletecollectionSeat(items, index)}
        >
          Delete
        </Button>
      </div>
    );
  });

  return (
    <div className="collection">
      <h2>
        {Object.keys(collection).length > 0
          ? "collection"
          : "no collection items"}
      </h2>
      {getCollection}
    </div>
  );
};

export default Collection;
