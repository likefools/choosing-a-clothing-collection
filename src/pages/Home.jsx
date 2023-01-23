import React, { useContext, useState, useEffect } from "react";

import { DataContext } from "../Context";

import { Button, Badge, Row, Col, Card } from "react-bootstrap";
import ItemsList from "../ItemsList";
import AlertSaveCollections from "../AlertSaveCollections";
import { Next } from "react-bootstrap/esm/PageItem";

const Home = () => {
  const allContextProps = useContext(DataContext);
  const {
    items,
    filterType,
    setFilterType,
    setFilterItems,
    itemsSelected,
    setItemsSelected,
    createTypesList,
  } = { ...allContextProps };

  // console.log(items);
  useEffect(() => {
    filterItemsByType(filterType);
    // nextItemsfilter();
  }, [filterType]);

  useEffect(() => {
    nextItemsfilter();
  }, [itemsSelected]);

  const types = createTypesList();

  const nextItemsfilter = () => {
    let itemsOfType = [...items];
    const nextItem = types.filter(
      (type) => !Object.keys(itemsSelected).includes(type)
    )[0];
    // const colorItemsSelected = Object.keys(itemsSelected);
    console.log(nextItem);
    itemsOfType = itemsOfType.filter((item) => item.type === nextItem);
    // itemsOfType = filterBytypeSelected(itemsOfType)
    setFilterType(nextItem);
    setFilterItems(itemsOfType);
  };

  // function setActiveType(typeName) {
  //   setFilterType(typeName);
  // }

  function filterBytypeSelected(itemsOfType) {
    const colorItemsSelected = Object.keys(itemsSelected)[0].color;
  }
  // if (
  //   Object.keys(itemsSelected).length > 0 &&
  //   Object.keys(itemsSelected).length < 3
  // ) {
  //   console.log(itemsSelected);
  //   nextItemsfilter();
  // }

  function filterItemsByType(filterType) {
    let itemsOfType = [...items];
    if (filterType) {
      itemsOfType = itemsOfType.filter((item) => item.type === filterType);
      setFilterItems(itemsOfType);
    }
  }

  const typesButtons = types.map((type, index) => {
    return (
      <Button
        disabled={filterType == type ? true : false}
        key={index}
        onClick={() => {
          setFilterType(type);
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
