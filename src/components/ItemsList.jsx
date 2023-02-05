import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "./Context";
import { Button, Row, Col, Card } from "react-bootstrap";
import { Dropdown, DropdownButton } from "react-bootstrap";

import pants from "../assets/pants.jpg";
import shirt from "../assets/shirt.jpg";
import shoes from "../assets/shoes.jpg";

const ItemsList = () => {
  const [itemsFilter, setItemsFilter] = useState([]);
  const allContextProps = useContext(DataContext);

  const {
    itemsSelected,
    setItemsSelected,
    filterType,
    filterItems,
    setStartTimer,
  } = {
    ...allContextProps,
  };
  useEffect(() => {
    setItemsFilter(filterItems);
  }, [filterItems]);

  function addToSelectedItems(item) {
    setItemsSelected({ ...itemsSelected, [item.type]: item });
    if (Object.keys(itemsSelected).length === 0) setStartTimer(new Date().getTime());
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

  const filterItemsPropertie = () => {
    let All = ["all"];
    let Sizes = [];
    let Colors = [];
    let Brands = [];

    for (const filterItem of filterItems) {
      if (!Sizes.includes(filterItem.size)) {
        Sizes.push(filterItem.size);
      }
      if (!Colors.includes(filterItem.color)) {
        Colors.push(filterItem.color);
      }
      if (!Brands.includes(filterItem.brand)) {
        Brands.push(filterItem.brand);
      }
    }
    // console.log(arrsizes, arrColors, arrBrands);
    return { All, Sizes, Colors, Brands };
  };

  const handleFilterChange = (namePropertie, selectedPropertie) => {
    let itemsOfFilter = [...filterItems];
    const properties = {
      All: "all",
      Sizes: "size",
      Colors: "color",
      Brands: "brand",
    };
    if (namePropertie === "All") setItemsFilter(itemsOfFilter);
    else
      itemsOfFilter = itemsOfFilter.filter(
        (item) => item[properties[namePropertie]] === selectedPropertie
      );
    setItemsFilter(itemsOfFilter);
  };

  const filterButtons = Object.keys(filterItemsPropertie()).map(
    (itemPropertie, index) => {
      return itemPropertie === "All" ? (
        <Button
          variant="success"
          key={index}
          onClick={() => handleFilterChange(itemPropertie)}
        >
          set All
        </Button>
      ) : (
        <div key={index} className="dropdownButton">
          <DropdownButton
            variant="secondary"
            id="dropdown-basic-button"
            title={itemPropertie}
          >
            {filterItemsPropertie()[itemPropertie].map((propertie, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleFilterChange(itemPropertie, propertie)}
              >
                {propertie}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
      );
    }
  );

  return (
    <div className="itemsCard">
      {itemsFilter.length > 0 ? (
        <div className="dropdownButtons">{filterButtons}</div>
      ) : (
        ""
      )}
      <Row xs={2} md={3} lg={5} className="g-2">
        {itemsFilter?.map((item, index) => (
          <Col key={index}>
            <Card
              style={itemsSelectedButtonDisabled(item) ? { opacity: 0.6 } : {}}
            >
              <Card.Header className="text-center">
                <h5>{item.brand}</h5>
              </Card.Header>
              <div
                className="cardImg"
                // מוסיף צבע למסגרת של התמונה
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
