import React from "react";
import "./Posts.css";
import Post from "../Post";
import postService from "../../../services/post-service/post-service";


class Posts extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: null
        }
    }

    componentDidMount() {
        postService.load()
            .then(posts =>
                this.setState({ posts })
            );
    }


    render() {
        const { posts } = this.state;

        return posts ? <div className="Posts">
                {posts.map(post => {
                    return <Post key={post.id} description={post.body} author={post.userId} />
                })}
            </div>
    : <div>Loading...</div>
    }
}

export default Posts;