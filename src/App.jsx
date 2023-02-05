import React from "react";
import { DataProvider } from "./components/Context";

// react-router
import NavbarTop from "./components/NavbarTop";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// react-bootstrap
import Container from "react-bootstrap/Container";

// pages
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import NoPage from "./pages/NoPage";

import "./App.scss";

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <DataProvider>
        <NavbarTop />
          <Container>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </Container>
        </DataProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
