import React, { Fragment, useContext } from "react";

import Link from "../Link/Link";
import IsLoggedContext from "../Context/IsLoggedContext";

const NavLinks = () => {
    const isLogged = useContext(IsLoggedContext);

    return <Fragment>
        <Link url="/">Posts </Link>
        {isLogged && <Link url="/posts/create">New Post</Link>}
        {!isLogged && <Link url="/users/register">Register</Link>}
        {!isLogged && <Link url="/users/login">Login</Link>}
        {isLogged && <Link url="/users/profile">Profile</Link>}
        {isLogged && <Link url="/users/logout">Logout</Link>}
    </Fragment>
}

export default NavLinks;