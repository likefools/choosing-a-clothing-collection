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

  useEffect(() => {
    getData().then((data) => setItems(data));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarTop />
        <Container>
          <Routes>
            <Route index element={<Home items={items ? items : ""}  />} />
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
