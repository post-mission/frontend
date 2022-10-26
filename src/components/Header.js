import react, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Header.scss";
import React from "react";

const Header = () => {
  const [isAuthorized, setIsAuthorized] = useState(true);
  const navigate = useNavigate();
  // if (localStorage.getItem("token")) {
  //   setIsAuthorized(true);
  // } else {
  //   setIsAuthorized(false);
  // }

  useEffect(() => {
    const tmp = localStorage.getItem("token");
    // console.log(tmp);
    if (tmp) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  });

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/home");
  };

  // console.log(window.location.pathname);
  return (
    <div>
      {isAuthorized ? (
        <Navbar
          collapseOnSelect
          bg="transparent"
          expand="lg"
          // style={{
          //   position: "fixed",
          //   top: 0,
          //   zIndex: "1030",
          // }}
        >
          <Container>
            <MdArrowBackIosNew
              onClick={() => navigate(-1)}
              style={{ cursor: "pointer" }}
              className="arrow"
            />
            <Navbar.Brand href="/home">POSTMISSION</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="/ticketbook/list">TicketBook</Nav.Link>
                <Nav.Link href="/posts">Board</Nav.Link>

                <NavDropdown
                  title="Profile"
                  id="basic-nav-dropdown"
                  style={{ padding: 0, border: 0 }}
                >
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/character">
                    CharacterTest
                  </NavDropdown.Item>
                  <NavDropdown.Item href="home" onClick={onLogout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : (
        <Navbar
          collapseOnSelect
          bg="transparent"
          expand="lg"
          // style={{
          //   position: "fixed",
          //   top: 0,
          //   zIndex: "1030",
          //   display: "flex",
          //   justifyContent: "between",
          // }}
        >
          <Container>
            <MdArrowBackIosNew
              onClick={() => navigate(-1)}
              style={{ cursor: "pointer" }}
              className="arrow"
            />
            <Navbar.Brand href="/home">POSTMISSION</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link href="/signin">Sign In</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>

                {/* <NavDropdown title="Example" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Ablum</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Pricing</NavDropdown.Item>
              </NavDropdown> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
};

export default Header;
