import React, { useContext, useState, useEffect } from "react";

import { DataContext } from "../components/Context";

import { Button, Badge, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ItemsList from "../components/ItemsList";
import AlertSaveCollections from "../components/AlertSaveCollections";

const Home = () => {
  const allContextProps = useContext(DataContext);
  const {
    items,
    filterType,
    setFilterType,
    filterItems,
    setFilterItems,
    itemsSelected,
    itemsCollection,
    createTypesList,
  } = { ...allContextProps };

  useEffect(() => {
    filterItemsByType(filterType);
  }, [filterType]);

  useEffect(() => {
    sortItems();
    renderingNextTypeItems();
  }, [itemsSelected]);

  useEffect(() => {
    setFilterItems(filterItems);
  }, [filterItems]);

  const types = createTypesList();

  const sortItems = () => {
    if (Object.keys(itemsSelected).length == 1) {
      let itemSelect = itemsSelected[Object.keys(itemsSelected)];
      sortAllColors(itemSelect.color);
      const allSizesItme = translateToSizes(itemSelect.type, itemSelect.size);
      sortAllSize(allSizesItme);
    }
  };

  const translateToSizes = (typeItem, sizeItem) => {
    const arrayOfSizes = [
      { shoes: [36, 37], shirt: ["S"], pants: [30, 31, 32] },
      { shoes: [39], shirt: ["L"], pants: [34, 35, 36] },
      { shoes: [43], shirt: ["XL"], pants: [39, 42, 43] },
      { shoes: [45, 46], shirt: ["XXL"], pants: [48] },
    ];

    let allSizesItem;
    arrayOfSizes.forEach((arrayOfSize) => {
      if (arrayOfSize[typeItem].includes(sizeItem)) {
        allSizesItem = arrayOfSize;
      }
    });

    return allSizesItem;
  };
  const sortAllColors = (colorItem) => {
    items.sort((a, b) => {
      if (colorItem === a.color && colorItem !== b.color) return -1;
      else if (colorItem !== a.color && colorItem === b.color) return 1;
      else return 0;
    });
  };

  const sortAllSize = (allSizes) => {
    items.sort((a, b) => {
      if (
        allSizes[a.type].includes(a.size) &&
        !allSizes[b.type].includes(b.size)
      )
        return -1;
      else if (
        !allSizes[a.type].includes(a.size) &&
        allSizes[b.type].includes(b.size)
      )
        return 1;
      else return 0;
    });
  };

  const renderingNextTypeItems = () => {
    if (Object.keys(itemsSelected).length > 0) {
      const nextItems = types.filter(
        (type) => !Object.keys(itemsSelected).includes(type)
      );
      let filterItemsByType = [...items];
      filterItemsByType = filterItemsByType.filter(
        (item) => item.type === nextItems[0]
      );
      setFilterType(nextItems[0]);
      setFilterItems(filterItemsByType);
    }
  };

  const filterItemsByType = (filterType) => {
    let itemsOfType = [...items];
    if (filterType) {
      itemsOfType = itemsOfType.filter((item) => item.type === filterType);
      setFilterItems(itemsOfType);
    }
  };

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
      {itemsCollection.length > 0 ? (
        <Nav className="justify-content-center">
          <Nav.Item>
            <LinkContainer to="/Collection">
              <Nav.Link>Go To Collection</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
      ) : (
        ""
      )}
      <div className="typesName">{typesButtons}</div>
      <ItemsList />
    </div>
  );
};

export default Home;
