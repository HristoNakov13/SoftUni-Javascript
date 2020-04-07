import React from "react";
import "./Aside.css";

import NavLinks from "../shared/NavLinks/NavLinks";

const Aside = () => {
    return <aside className="Aside">
        <ul>
            <NavLinks />
        </ul>
    </aside>
}

export default Aside;