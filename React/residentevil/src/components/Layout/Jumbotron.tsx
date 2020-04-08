import React from "react";
import { Jumbotron as Jumbo } from "react-bootstrap";

const Jumbotron: React.FC = ({ children }) => {
    return <Jumbo fluid={true}>
        {children}
    </Jumbo>
}

export default Jumbotron;