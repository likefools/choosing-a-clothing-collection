import React from "react";
import { useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";

import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import Badge from "react-bootstrap/Badge";

function createTypeGroup(items) {
  const types = [];
  for (const item of items) {
    if (!types.includes(item.type)) {
      types.push(item.type);
    }
  }
  return { types };
}

const Home = (props) => {
  const { items } = props;
  const [filterType, setFilterType] = useState("");
  const [filterItems, setFilterItems] = useState([]);

  useEffect(() => {
    createItemsGroup(items, filterType);
  }, [filterType]);

  function applyFilterType(typeName) {
    setFilterType(typeName);
  }

  function createItemsGroup(items, filterType) {
    let itemsOfType = [...items];
    if (filterType) {
      itemsOfType = itemsOfType.filter((item) => item.type === filterType);
      setFilterItems(itemsOfType);
    }
  }

  const typesName = createTypeGroup(items).types.map((typeName, index) => {
    return (
      <Button
        key={index}
        className="btn"
        disabled={filterType == typeName ? true : false}
        onClick={() => applyFilterType(typeName)}
      >
        {typeName}{" "}
        <Badge bg="secondary">
          {filterItems.length > 0 ? filterItems.length : 0}
        </Badge>
      </Button>
    );
  });

  const itemsCard = filterItems.map((item, index) => (
    <Col key={index}>
      <Card>
        <Card.Header className="text-center">
          <h3>{item.brand}</h3>
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

          <Button onClick={() => console.log(item.id)}>Add to selection</Button>
        </Card.Body>
      </Card>
    </Col>
  ));

  if (!items) return <h2>Loading...</h2>;

  return (
    <div className="home">
      <h2>home</h2>
      <div className="typesName">{typesName}</div>
      <div className="itemsCard">
        <Row xs={2} md={3} lg={4} className="g-2">
          {itemsCard}
        </Row>
      </div>
    </div>
  );
};

export default Home;
