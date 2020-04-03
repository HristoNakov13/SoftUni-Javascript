import React from "react";
import "./Link.css";
import { Link as ReactRouterLink } from "react-router-dom";

const Link = ({ children, url }) => {
    return <li className="listItem">
        <ReactRouterLink to={url}>{children}</ReactRouterLink>
    </li>
}

export default Link;