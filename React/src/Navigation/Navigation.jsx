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
            <Link url="/">
                Posts
            </Link>
            <Link url="/posts/create">
                New Post
            </Link>
            <Link url="/users/register">
                Register
            </Link>
            <Link url="/users/login">
                Login
            </Link>
            <Link url="/users/profile">
                Profile
            </Link>
        </ul>
    </nav>
}

export default Navigation;