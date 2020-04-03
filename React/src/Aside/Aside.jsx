import React from "react";
import "./Aside.css";
import Link from "../shared/Link/Link"

const Aside = () => {
    return <aside className="Aside">
        <ul>
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
    </aside>
}

export default Aside;