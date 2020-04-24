import React, { useContext } from "react";
import Container from "react-bootstrap/Container";

import Navigation from "../Navigation/Navigation";
import Jumbotron from "./Jumbotron";
import Routes from "../Routes/Routes";

import { UserContext } from "../../contexts/user/UserContext";

const Layout: React.FC = () => {
    const { isLoggedIn, user } = useContext(UserContext);

    return <Container fluid={true}>
        <Navigation isLoggedIn={isLoggedIn} user={user} />
        <Jumbotron>
            <Routes isLoggedIn={isLoggedIn} />
        </Jumbotron>
    </Container>
}

export default Layout;