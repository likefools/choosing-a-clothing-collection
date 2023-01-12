import React from "react";
import { useRef, useState, useEffect } from "react";

// react-router
import NavbarTop from "./NavbarTop";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// react-bootstrap
import Container from "react-bootstrap/Container";

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
  const [items, setItems] = useState();
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    getData().then((data) => setItems(data));
  }, []);

  useEffect(() => {
    if (items) {
      filterOutSelectedItems();
    }
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
      console.log(collection[0]["pants"].id);
    }
    setItems(itemsOfType);
  }

  // console.log(collection);

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
            <Route path="/collection" element={<Collection />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
          {/* <div className="test">test</div> */}
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
