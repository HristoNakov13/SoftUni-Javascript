import React from "react";
import "./Author.css";

const Author = ({ author }) => {
    return <div className="Author">
        <span>
            <small>Author: </small>
            {author}
        </span>
    </div>
}

export default Author;