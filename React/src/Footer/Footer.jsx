import React from "react";
import "./Footer.css";
import Link from "../shared/Link/Link";
import footerLogo from "../static/blue-origami-bird-flipped.png";

const Footer = () => {
    return <footer className="Footer">
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
        <img id="footerLogo" src={footerLogo} alt="footer-logo" />
        <p>Software University © 2019</p>
    </footer>
}

export default Footer;