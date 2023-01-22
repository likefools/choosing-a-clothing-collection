import React, { useContext } from "react";
import { DataContext } from "./Context";
import { Button, Row, Col, Card } from "react-bootstrap";

import pants from "./assets/pants.jpg";
import shirt from "./assets/shirt.jpg";
import shoes from "./assets/shoes.jpg";

const ItemsList = () => {
  const allContextProps = useContext(DataContext);
  const { itemsSelected, setItemsSelected, filterType, filterItems } = {
    ...allContextProps,
  };

  function addToSelectedItems(item) {
    setItemsSelected({ ...itemsSelected, [item.type]: item });
  }

  const itemsSelectedButtonDisabled = (item) =>
    itemsSelected[item.type] ? itemsSelected[item.type].id === item.id : false;

  const imgType = () => {
    let imgUrl = "";
    if (filterType === "shirt") {
      imgUrl = shirt;
    }
    if (filterType === "pants") {
      imgUrl = pants;
    }
    if (filterType === "shoes") {
      imgUrl = shoes;
    }
    return imgUrl;
  };

  return (
    <div className="itemsCard">
      <Row xs={2} md={3} lg={4} className="g-2">
        {filterItems.map((item, index) => (
          <Col key={index}>
            <Card
              style={itemsSelectedButtonDisabled(item) ? { opacity: 0.6 } : {}}
            >
              <Card.Header className="text-center">
                <h3>{item.brand}</h3>
              </Card.Header>
              <div
                className="cardImg"
                // style={{
                //   backgroundColor: item.color !== "white" ? item.color : "#eee",
                // }}
              >
                <Card.Img variant="top" src={imgType()} />
              </div>
              <Card.Body className="cardBody">
                <div className="properties">
                  <h5>
                    size: <span>{item.size}</span>
                  </h5>
                  <h5>
                    color:{" "}
                    <span
                      className="color"
                      style={{
                        backgroundColor:
                          item.color !== "white" ? item.color : "#eee",
                      }}
                    ></span>
                  </h5>

                  <Button
                    disabled={itemsSelectedButtonDisabled(item)}
                    onClick={() => addToSelectedItems(item)}
                  >
                    Add to selection
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ItemsList;
