import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import ItemsSelectedInfo from "./ItemsSelectedInfo";

const NavbarTop = () => {
  const expand = "sm";

  return (
    <Navbar
      sticky="top"
      bg="dark"
      variant="dark"
      expand={expand}
      className="mb-3 shadow"
    >
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>Navbar Offcanvas</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-start flex-grow-1 pe-3">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Collection">
                <Nav.Link>Collection</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <ItemsSelectedInfo/>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarTop;
