import React from "react";
import Link from "../shared/Link/Link"
import "./Navigation.css";
import logo from "../static/white-origami-bird.png";

const Navigation = () => {
    return <nav className="Navigation">
        <ul>
            <Link url="/">
                <img id="logo" src={logo} alt="logo"></img>
            </Link>
            <Link url="#">
                Going to 1
            </Link>
            <Link url="#">
                Going to 2
            </Link>
            <Link url="#">
                Going to 3
            </Link>
            <Link url="#">
                Going to 4
            </Link>
            <Link url="#">
                Going to 5
            </Link>
        </ul>
    </nav>
}

export default Navigation;