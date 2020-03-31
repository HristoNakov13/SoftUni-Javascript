import React from "react";
import "./Link.css";

const Link = ({ children, url }) => {
    return <li className="listItem">
        <a href={url}>{children}</a>
    </li>
}

export default Link;