import React from "react";
import "./Main.css";
import Post from "./Post/Post";
import postService from "../services/post-service/post-service";

class Main extends React.Component {
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

        return posts ? <main className="Main">
            <h1>Posts</h1>
            <div className="Posts">
                {posts.map(post => {
                    return <Post key={post.id} description={post.body} author={post.userId} />
                })}
            </div>
        </main>
            : <div>Loading...</div>
    }
}

export default Main;