import React, { useContext, useState, useEffect } from "react";

import { DataContext } from "../Context";

import { Button, Badge, Row, Col, Card } from "react-bootstrap";
import ItemsList from "../ItemsList";
import AlertSaveCollections from "../AlertSaveCollections";

const Home = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const allContextProps = useContext(DataContext);
  const {
    items,
    filterType,
    setFilterType,
    setFilterItems,
    itemsSelected,
    setItemsSelected,
  } = { ...allContextProps };

  // console.log(items);
  useEffect(() => {
    filterItemsByType(filterType);
  }, [filterType]);

  function createTypesList() {
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

  function filterItemsByType(filterType) {
    let itemsOfType = [...items];
    if (filterType) {
      itemsOfType = itemsOfType.filter((item) => item.type === filterType);
      setFilterItems(itemsOfType);
    }
  }

  const typesButtons = createTypesList().map((type, index) => {
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

  if (!items) return <h2>Loading...</h2>;
  return (
    <div className="home">
      <AlertSaveCollections />

      <h2>home</h2>
      <div className="typesName">{typesButtons}</div>
      <ItemsList />
    </div>
  );
};

export default Home;
