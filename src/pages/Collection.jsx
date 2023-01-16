import React from "react";
import { useRef, useContext, useState, useEffect } from "react";

import { DataContext } from '../Context';

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

const Collection = () => {
  const allContextProps = useContext(DataContext);
  const {itemsCollection} = {...allContextProps};
  // const collection = itemsCollection;

  const [collection, setCollection] = useState();

  useEffect(() => {
    setCollection(itemsCollection);
  }, [collection]);

  if (!collection) return <h2>no items</h2>;
  const getCollection = collection?.map((item) =>
    // items collection id 1 / 2

    Object.keys(item).map((typeItem, index) => {
      // return <div key={index}>{item[typeItem].brand}</div>
      return (
        <Col key={index}>
          <Card>
            <Card.Header className="text-center">
              <h4>{item[typeItem].type}</h4>
            </Card.Header>
            <Card.Img
              variant="top"
              src="https://store.mbit.co.il/wp-content/uploads/2020/09/tshirt-2.jpg"
            />
            <Card.Body>
              <div className="properties">
                <h5>
                  size: <span>{item[typeItem].size}</span>
                </h5>
                <h5>
                  color:{" "}
                  <span
                    className="color"
                    style={{ backgroundColor: item[typeItem].color }}
                  ></span>
                </h5>
              </div>
            </Card.Body>
          </Card>
        </Col>
      );
    })
  );

  return (
    <div className="collection">
      <h2>collection</h2>
      <div className="itemsCard">
        <Row xs={3} md={3} lg={4} className="g-2">
          {getCollection}
        </Row>
      </div>
    </div>
  );
};

export default Collection;
