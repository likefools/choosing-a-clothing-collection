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
    filterItems,
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

  useEffect(() => {
    setFilterItems(filterItems);
  }, [filterItems]);

  const types = createTypesList();

  const nextItemsfilter = () => {
    let itemsOfType = [...items];
    const nextItems = types.filter(
      (type) => !Object.keys(itemsSelected).includes(type)
    );
    const firstNextItem = nextItems[0];
    itemsOfType = itemsOfType.filter((item) => item.type === firstNextItem);
    if (Object.keys(itemsSelected).length == 1) {
      let itemSelected = itemsSelected[Object.keys(itemsSelected)[0]];

      const nextItemSizes = translateSize(
        itemSelected.type,
        firstNextItem.type,
        itemSelected.size
      );
      itemsOfType = sortBytypeSelected(
        "color",
        itemSelected.color,
        itemsOfType
      );
      itemsOfType = sortBytypeSelected("size", nextItemSizes, itemsOfType);
    }
    setFilterType(firstNextItem);
    setFilterItems(itemsOfType);
  };

  const translateSize = (typeSelected, typeTo, size) => {
    // shoes shirt pants
    let pantsArrSize = {
      S: [30, 31, 32],
      L: [34, 35, 36],
      XL: [39, 42, 43],
      XXL: [48],
    };
    let shoesArrSize = {
      S: [36, 37],
      L: [39],
      XL: [43],
      XXL: [45, 46],
    };

    let translatedSize;
    let shirtSize;
    let shoesSize;
    let pantsSize;

    switch (typeSelected) {
      case "pants":
        shirtSize = translatedSize = Object.keys(pantsArrSize).filter((key) =>
          pantsArrSize[key].includes(size)
        );
        shoesSize = shoesArrSize[shirtSize];
        typeTo == "shirt"
          ? (translatedSize = shirtSize)
          : (translatedSize = shoesSize);
        break;
      case "shirt":
        typeTo == "pants"
          ? (translatedSize = pantsArrSize[size])
          : (translatedSize = shoesArrSize[size]);
        break;
      case "shoes":
        shirtSize = translatedSize = Object.keys(shoesArrSize).filter((key) =>
          shoesArrSize[key].includes(size)
        );
        pantsSize = pantsArrSize[shirtSize];
        typeTo == "shirt" ? shirtSize : pantsSize;
        break;
    }
    return translatedSize;
  };

  function sortBytypeSelected(type, matchTypes, array) {
    array.sort((a, b) => {
      if (matchTypes.includes(a[type]) && !matchTypes.includes(b[type]))
        return -1;
      else if (!matchTypes.includes(a[type]) && matchTypes.includes(b[type]))
        return 1;
      else return 0;
    });
    return array;
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
