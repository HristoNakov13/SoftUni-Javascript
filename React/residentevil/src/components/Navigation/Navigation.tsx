import React, { Fragment } from "react";
import "./Navigation.css";

import { Navbar, Nav, NavDropdown } from "react-bootstrap"
import { NavLink } from "react-router-dom";

import LoggedUser from "../../contexts/user/logged-user-interface";

interface Props {
    isLoggedIn: boolean;
    user: LoggedUser;
}

const Navigation: React.FC<Props> = ({ isLoggedIn, user }) => {
    return <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Resident Evil</Navbar.Brand>
        <Nav className="mr-auto">

            <Nav.Link>
                <NavLink to="/" className="navLink">Home</NavLink>
            </Nav.Link>

            <NavDropdown title="Viruses" id="basic-nav-dropdown">
                <NavDropdown.Item>
                    <NavLink to="/viruses/all" className="dropdownLink">Show</NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                    <NavLink to="/viruses/add" className="dropdownLink">Add</NavLink>
                </NavDropdown.Item>
            </NavDropdown>

            {isLoggedIn
                ? user &&
                <Nav.Link>
                    <NavLink to="/profile" className="navLink">{user.username}</NavLink>
                </Nav.Link>
                :
                <Fragment>
                    <Nav.Link>
                        <NavLink to="/register" className="navLink">Register</NavLink>
                    </Nav.Link>
                    <Nav.Link>
                        <NavLink to="/login" className="navLink">Login</NavLink>
                    </Nav.Link>
                </Fragment>
            }
        </Nav>
    </Navbar>
};

export default Navigation;