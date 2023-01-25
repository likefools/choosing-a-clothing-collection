import React, { useContext, useState, useEffect } from "react";

import { DataContext } from "../Context";

import { Button, Badge, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ItemsList from "../ItemsList";
import AlertSaveCollections from "../AlertSaveCollections";

const Home = () => {
  const [allItems, setAllItems] = useState();
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
    setAllItems(items);
  }, [allItems]);

  useEffect(() => {
    filterItemsByType(filterType);
  }, [filterType]);

  useEffect(() => {
    // nextItemsfilter();
    sortItems();
    renderingNextItems();
  }, [itemsSelected]);

  useEffect(() => {
    setFilterItems(filterItems);
  }, [filterItems]);

  const types = createTypesList();

  const nextItemsfilter = () => {
    let filterItemsByType = [...items];
    const nextItems = types.filter(
      (type) => !Object.keys(itemsSelected).includes(type)
    );
    const firstNextItem = nextItems[0];
    filterItemsByType = filterItemsByType.filter(
      (item) => item.type === firstNextItem
    );
    if (Object.keys(itemsSelected).length == 1) {
      let itemSelected = itemsSelected[Object.keys(itemsSelected)[0]];

      const nextItemSizes = translateSize(
        itemSelected.type,
        firstNextItem.type,
        itemSelected.size
      );
      filterItemsByType = sortBytypeSelected(
        "color",
        itemSelected.color,
        filterItemsByType
      );
      filterItemsByType = sortBytypeSelected(
        "size",
        nextItemSizes,
        filterItemsByType
      );
    }
    setFilterType(firstNextItem);
    setFilterItems(filterItemsByType);
  };

  const sortItems = () => {
    if (Object.keys(itemsSelected).length == 1) {
      let itemSelected = itemsSelected[Object.keys(itemsSelected)];
      const allSizesItme = translateToSize(
        itemSelected.type,
        itemSelected.size
      );
      sortAllSize(allSizesItme);
    }
    // rendering the items after the sort
  };

  const translateToSize = (typeItem, sizeItem) => {
    // shoes shirt pants
    const arrayOfSizes = [
      { shoes: [36, 37], shirt: ["S"], pants: [30, 31, 32] },
      { shoes: [39], shirt: ["L"], pants: [34, 35, 36] },
      { shoes: [43], shirt: ["XL"], pants: [39, 42, 43] },
      { shoes: [45, 46], shirt: ["XXL"], pants: [48] },
    ];
    let allSizesItme;
    arrayOfSizes.forEach((arrayOfSize) => {
      if (arrayOfSize[typeItem].includes(sizeItem)) {
        allSizesItme = arrayOfSize;
      }
    });

    return allSizesItme;
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
    setAllItems(items);
  };

  const renderingNextItems = () => {
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
