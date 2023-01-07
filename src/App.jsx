import React from "react";

// react-router
import NavbarTop from "./NavbarTop";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// react-bootstrap
import Container from "react-bootstrap/Container";

// pages
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import NoPage from "./pages/NoPage";

// import reactLogo from './assets/react.svg'
import "./App.scss";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarTop />
        <Container>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
