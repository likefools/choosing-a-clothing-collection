import React from "react";
import { useRef, useState, useEffect } from "react";

import { Provider } from './Context';
import { useMessage } from './Context';
import { useCollection } from './Context';

// react-router
import NavbarTop from "./NavbarTop";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// react-bootstrap
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";

// pages
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import NoPage from "./pages/NoPage";

import ItemsSelectedInfo from "./ItemsSelectedInfo";

import "./App.scss";

async function getData() {
  const actualData = await fetch(
    `https://run.mocky.io/v3/2d06d2c1-5a77-4ecd-843a-53247bcb0b94`
  ).then((response) => response.json());

  return actualData;
}

function App() {
  const [items, setItems] = useState([]);
  const [itemsSelected, setItemsSelected] = useState({});
  const [collection, setCollection] = useState([]);

  const messageContext = useMessage();
  const collectionContext = useCollection();

  const contextValue = {...messageContext, ...collectionContext};
  useEffect(() => {
    getData().then((data) => setItems(data));
  }, []);

  useEffect(() => {
    if (items) {
      filterOutSelectedItems();
    }
  }, [collection]);

  function moovToSelectedItems(item) {
    setItemsSelected({ ...itemsSelected, [item.type]: item });
  }

  function removeFromSelectedItems(nameType) {
    let itemsObj = { ...itemsSelected };
    delete itemsObj[nameType];
    setItemsSelected(itemsObj);
  }

  // function saveSelectedItems() {
  //   moovCollections(itemsSelected);
  //   setFilterType("");
  //   setItemsSelected({});
  //   setFilterItems([]);
  //   setshowAlert(true);
  // }

  function moovCollections(collectionObj) {
    // Object.keys(collectionObj).forEach(item => collectionObj[item])
    setCollection((old) => [...old, collectionObj]);
  }

  function filterOutSelectedItems() {
    let itemsOfType = [...items];
    // items, collection
    if (collection.length > 0) {
      collection.forEach((typeItems) => {
        Object.keys(typeItems).forEach((typeItem) => {
          // typeItem[typeItem].id
          itemsOfType = itemsOfType.filter(
            (item) => item.id !== typeItems[typeItem].id
          );
        });
      });
      setItems(itemsOfType);
    }
  }

  const deleteCollection = (n) => {
    const updatedArray = collection.filter((item, index) => index !== n);
    setCollection(updatedArray);
    setItems(
      [
        ...items,
        ...collection.map((typeItems) => Object.values(typeItems)),
      ].flat()
    );
  };

  return (
    <div className="App">
      <BrowserRouter>
      <Provider value={contextValue}>
        <NavbarTop itemsSelected={itemsSelected} />
        <ItemsSelectedInfo itemsSelected={itemsSelected} />
        <Container>
          <Routes>
            <Route
              index
              element={
                <Home
                  items={items ? items : ""}
                  moovCollections={moovCollections}
                  deleteItem={removeFromSelectedItems}
                  moovToSelectedItems={moovToSelectedItems}
                />
              }
            />
            <Route
              path="/collection"
              element={<Collection collection={collection} />}
            />
            <Route path="*" element={<NoPage />} />
          </Routes>
          {/* <div className="test">test</div> */}
        </Container>

        <Button onClick={() => deleteCollection(0)}>Delete</Button>
        </Provider>
      </BrowserRouter>
    </div>
  );
}


export default App;
