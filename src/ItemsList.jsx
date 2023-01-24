import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./Context";
import { Button, Row, Col, Card} from "react-bootstrap";
import { Dropdown, DropdownButton } from 'react-bootstrap';

import pants from "./assets/pants.jpg";
import shirt from "./assets/shirt.jpg";
import shoes from "./assets/shoes.jpg";

const ItemsList = () => {

  const [filter, setFilter] = useState('aall');
  const allContextProps = useContext(DataContext);

  const {
    items,
    itemsSelected,
    setItemsSelected,
    filterType,
    setFilterItems,
    filterItems,
    setStartTimer,
  } = {
    ...allContextProps,
  };

  function addToSelectedItems(item) {
    setItemsSelected({ ...itemsSelected, [item.type]: item });
    if(!itemsSelected) setStartTimer(new Date().getTime());
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

 

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    console.log('hi')
  };


  return (
    <div className="itemsCard">
{/*       
      <DropdownButton id="dropdown-basic-button" title={filter}>
        <Dropdown.Item onClick={() => handleFilterChange('all')}>All</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterChange('active')}>Active</Dropdown.Item>
        <Dropdown.Item onClick={() => handleFilterChange('completed')}>Completed</Dropdown.Item>
      </DropdownButton>
      <p>Selected filter: {filter}</p> */}
    
      <Row xs={2} md={3} lg={4} className="g-2">
        {filterItems?.map((item, index) => (
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
