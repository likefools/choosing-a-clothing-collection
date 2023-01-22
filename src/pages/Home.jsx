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
  } = { ...allContextProps };

  // console.log(items);
  useEffect(() => {
    filterItemsByType(filterType);
    if(Object.keys(itemsSelected).length > 0 && Object.keys(itemsSelected).length < 3){
      console.log(itemsSelected)
      nextItemsfilter()
    }
  }, [filterType, itemsSelected]);

  const types = createTypesList()

  function createTypesList() {
    const types = [];
    for (const item of items) {
      if (!types.includes(item.type)) {
        types.push(item.type);
      }
    }
    return types;
  }


  // function setActiveType(typeName) {
  //   setFilterType(typeName);
  // }

  const nextItemsfilter = () => {
    const nextItem = types.filter(type => !Object.keys(itemsSelected).includes(type))[0]
    console.log(nextItem)
    itemsOfType = itemsOfType.filter((item) => item.type === nextItem);
    
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

      <h2>home</h2>
      <div className="typesName">{typesButtons}</div>
      <ItemsList />
    </div>
  );
};

export default Home;
