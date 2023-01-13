import React from "react";
import { useRef, useState, useEffect } from "react";

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

import "./App.scss";

async function getData() {
  const actualData = await fetch(
    `https://run.mocky.io/v3/2d06d2c1-5a77-4ecd-843a-53247bcb0b94`
  ).then((response) => response.json());

  return actualData;
}

function App() {
  const [items, setItems] = useState([]);
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    getData().then((data) => setItems(data));
  }, []);

  useEffect(() => {
    if (items) {
      setItems(
        [
          ...items,
          ...collection.map((typeItems) => Object.values(typeItems)),
        ].flat()
      );
    }
    console.log(items);
  }, [collection]);

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
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarTop />
        <Container>
          <Routes>
            <Route
              index
              element={
                <Home
                  items={items ? items : ""}
                  moovCollections={moovCollections}
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
      </BrowserRouter>
    </div>
  );
}

export default App;
