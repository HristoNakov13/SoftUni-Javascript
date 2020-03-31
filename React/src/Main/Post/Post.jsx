import React from "react";
import "./Post.css";
import Author from "./Author/Author";
import postImg from "../../static/blue-origami-bird.png";

const Post = ({description, author }) => {
    return <div className="Post">
        <img id="postLogo" src={postImg} alt="post-origami-logo" />
        <p className="description">
            {description}
        </p>
        <Author author={author} />
    </div>
}

export default Post;