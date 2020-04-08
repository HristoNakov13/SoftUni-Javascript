import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap"
import { NavLink } from "react-router-dom";

const Navigation: React.FC = () => {
    return <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Resident Evil</Navbar.Brand>
        <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Viruses" id="basic-nav-dropdown">
                <NavLink to="/viruses/all">Show</NavLink>
                <NavLink to="/viruses/add">Add</NavLink>
            </NavDropdown>
        </Nav>
    </Navbar>
};

export default Navigation;