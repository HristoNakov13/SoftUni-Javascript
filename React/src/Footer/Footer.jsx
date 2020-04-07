import React from "react";
import "./Footer.css";
import footerLogo from "../static/blue-origami-bird-flipped.png";

import NavLinks from "../shared/NavLinks/NavLinks";

const Footer = () => {
    return <footer className="Footer">
        <NavLinks />
        <img id="footerLogo" src={footerLogo} alt="footer-logo" />
        <p>Software University © 2019</p>
    </footer>
}

export default Footer;