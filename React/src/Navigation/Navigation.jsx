import React from "react";
import "./Navigation.css";
import logo from "../static/white-origami-bird.png";

import Link from "../shared/Link/Link"
import NavLinks from "../shared/NavLinks/NavLinks";

const Navigation = () => {
    return <nav className="Navigation">
        <ul>
            <Link url="/">
                <img id="logo" src={logo} alt="logo"></img>
            </Link>
            <NavLinks />
        </ul>
    </nav>
}

export default Navigation;