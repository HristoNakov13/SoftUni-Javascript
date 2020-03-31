import React from "react";
import "./Footer.css";
import Link from "../shared/Link/Link";
import footerLogo from "../static/blue-origami-bird-flipped.png";

const Footer = () => {
    return <footer className="Footer">
        <Link url="#">
            Going 1
        </Link>
        <Link url="#">
            Going 2
        </Link>
        <Link url="#">
            Going 3
        </Link>
        <Link url="#">
            Going 4
        </Link>
        <Link url="#">
            Going 5
        </Link>
        <Link url="#">
            Going 6
        </Link>
        <Link url="#">
            Going 7
        </Link>
        <Link url="#">
            Going 8
        </Link>
        <Link url="#">
            Going 9
        </Link>
        <Link url="#">
            Going 10
        </Link>
        <Link url="#">
            Going 11
        </Link>
        <img id="footerLogo" src={footerLogo} alt="footer-logo"></img>
        <p>Software University © 2019</p>
    </footer>
}

export default Footer;