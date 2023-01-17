import React, { useContext, useState, useEffect } from "react";

import { DataContext } from "../Context";

import { Button, Badge, ListGroup, Row, Col, Card } from "react-bootstrap";
import ItemsSelectedInfo from "../ItemsSelectedInfo";
import AlertSaveCollections from "../AlertSaveCollections";

const Home = ({ moovCollections, deleteItem }) => {
  // const [itemsSelected, setItemsSelected] = useState({});
  const [showAlert, setshowAlert] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const allContextProps = useContext(DataContext);
  const {
    items,
    setItems,
    filterType,
    setFilterType,
    filterItems,
    setFilterItems,
    itemsSelected,
    setItemsSelected,
    itemsCollection,

    setItemsCollection,
  } = { ...allContextProps };

  // console.log(items);
  useEffect(() => {
    filterItemsByType(items, filterType);
  }, [filterType, itemsSelected]);

  function createTypesList(items) {
    const types = [];
    for (const item of items) {
      if (!types.includes(item.type)) {
        types.push(item.type);
      }
    }
    return types;
  }

  function setActiveType(typeName) {
    setFilterType(typeName);
  }

  function filterItemsByType(items, filterType) {
    let itemsOfType = [...items];
    if (filterType) {
      itemsOfType = itemsOfType.filter((item) => item.type === filterType);
      setFilterItems(itemsOfType);
    }
  }

  function addToSelectedItems(item) {
    setItemsSelected({ ...itemsSelected, [item.type]: item });
  }

  const typesButtons = createTypesList(items).map((type, index) => {
    return (
      <Button
        disabled={filterType == type ? true : false}
        key={index}
        onClick={() => {
          setFilterType(type);
          setSelectedTypes([...selectedTypes, type]);
        }}
      >
        {type}{" "}
        <Badge bg="secondary">
          {items.filter((i) => i.type === type).length -
            Object.values(itemsSelected).filter((i) => i.type === type).length}
        </Badge>
      </Button>
    );
  });

  const filteredItemsCards = filterItems.map((item, index) => (
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

          <Button
            disabled={
              itemsSelected[item.type]
                ? itemsSelected[item.type].id === item.id
                : false
            }
            onClick={() => {
              addToSelectedItems(item);
            }}
          >
            Add to selection
          </Button>
        </Card.Body>
      </Card>
    </Col>
  ));

  function removeFromSelectedItems(nameType) {
    let itemsObj = { ...itemsSelected };
    delete itemsObj[nameType];
    setItemsSelected(itemsObj);
  }

  // if (itemsSelected.length === 3) {
  //   setshowAlert(true);
  //   setItemsSelected([]);
  // }

  // const saveSelectedItems = () => {
  //   setFilterItems([]);
  //   setshowAlert(true);
  // };

  if (!items) return <h2>Loading...</h2>;

  return (
    <div className="home">
      {/* <ItemsSelectedInfo deleteItem={deleteItem} /> */}
      <AlertSaveCollections />

      <h2>home</h2>
      <div className="typesName">{typesButtons}</div>
      <div className="itemsCard">
        <Row xs={2} md={3} lg={4} className="g-2">
          {filteredItemsCards}
        </Row>
      </div>
    </div>
  );
};

export default Home;
