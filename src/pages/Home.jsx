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
    // translateSize("pants", "shirt", 43);
    // itemsOfType = filterBytypeSelected(itemsOfType);
    setFilterType(nextItem);
    setFilterItems(itemsOfType);
  };

  const translateSize = (type, typeTo, size) => {
    // shoes shirt pants
    let pants = {
      S: [30, 31, 32],
      L: [34, 35, 36],
      XL: [39, 42, 43],
      XXL: [48],
    };
    let shoes = {
      S: [36, 37],
      L: [39],
      XL: [43],
      XXL: [45, 46],
    };
    let translatedSize;
    let shirtSize;
    let shoesSize;
    let pantsSize;
    switch (type) {
      case "pants":
        shirtSize = translatedSize = Object.keys(pants).filter((key) =>
          pants[key].includes(size)
        );
        shoesSize = shoes[shirtSize];
        typeTo == "shirt" ? shirtSize : shoesSize;
        break;
      case "shirt":
        typeTo == "pants"
          ? (translatedSize = pants[size])
          : (translatedSize = shoes[size]);
        break;
      case "shoes":
        shirtSize = translatedSize = Object.keys(shoes).filter((key) =>
          shoes[key].includes(size)
        );
        pantsSize = pants[shirtSize];
        typeTo == "shirt" ? shirtSize : pantsSize;
        break;
    }
    return translatedSize;
  };

  function filterBytypeSelected(itemsOfType) {
    const colorItemsSelected = Object.keys(itemsSelected)[0].color;
  }

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

      <h2>Home</h2>
      <div className="typesName">{typesButtons}</div>
      <ItemsList />
    </div>
  );
};

export default Home;
