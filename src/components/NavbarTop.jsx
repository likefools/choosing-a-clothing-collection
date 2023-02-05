import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import ItemsSelectedInfo from "./ItemsSelectedInfo";

const NavbarTop = () => {
  const expand = "sm";

  return (
    <Navbar
      collapseOnSelect
      sticky="top"
      bg="dark"
      variant="dark"
      expand={expand}
      className="mb-3 shadow"
    >
      <Container fluid='sm'>
        <LinkContainer to="/">
          <Navbar.Brand>Select Collection</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="justify-content-start flex-grow-1 pe-3">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Collection">
                <Nav.Link>Collection</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <ItemsSelectedInfo />
            </Nav>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
};

export default NavbarTop;
